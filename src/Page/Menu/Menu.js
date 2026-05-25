// src/Page/Menu/Menu.js
import {
  View, Text, TouchableOpacity, useWindowDimensions,
  ActivityIndicator, ScrollView, Modal, TextInput,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { useState } from "react";
import { useMenuStyles } from "./styles";
import { useFinancas } from "../../hooks/useFinancas";

const NAV_ITEMS = [
  { label: "Dashboard",  route: "Dashboard"  },
  { label: "Extrato",    route: "Extrato"    },
  { label: "Relatórios", route: "Relatorios" },
  { label: "Perfil",     route: "Perfil"     },
];

const MOBILE_ITEMS = [
  { label: "Início",     route: "Dashboard"  },
  { label: "Extrato",    route: "Extrato"    },
  { label: "Relatórios", route: "Relatorios" },
  { label: "Perfil",     route: "Perfil"     },
];

function formatarValor(valor) {
  if (valor === null || valor === undefined) return "—";
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarValorCurto(valor) {
  if (!valor || valor === 0) return "R$0";
  if (valor >= 1000) return `R$${(valor / 1000).toFixed(1)}k`;
  return `R$${Math.round(valor)}`;
}

function formatarData(data) {
  if (!data) return "";
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function primeiroNome(nome) {
  if (!nome) return "";
  return nome.split(" ")[0];
}

// ── Gráfico de Colunas Customizado ───────────────────────────────
function GraficoColunas({ dados }) {
  if (!dados || dados.length === 0) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          Sem dados suficientes para o gráfico
        </Text>
      </View>
    );
  }

  const todosValores = dados.flatMap(d => [d.receitas || 0, d.despesas || 0]);
  const maxValor = Math.max(...todosValores, 1);
  const alturaMaxima = 140;

  return (
    <View>
      {/* Área do gráfico */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", height: alturaMaxima + 40, gap: 4 }}>
        {dados.map((d, i) => {
          const alturaReceita = maxValor > 0 ? (d.receitas / maxValor) * alturaMaxima : 0;
          const alturaDespesa = maxValor > 0 ? (d.despesas / maxValor) * alturaMaxima : 0;

          return (
            <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
              {/* Barras */}
              <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2, marginBottom: 6 }}>
                {/* Receita */}
                <View style={{ width: 10 }}>
                  {alturaReceita > 0 ? (
                    <View style={{
                      height: Math.max(alturaReceita, 3),
                      backgroundColor: "#3ac97e",
                      borderRadius: 3,
                    }} />
                  ) : (
                    <View style={{ height: 3, backgroundColor: "rgba(58,201,126,0.2)", borderRadius: 3 }} />
                  )}
                </View>
                {/* Despesa */}
                <View style={{ width: 10 }}>
                  {alturaDespesa > 0 ? (
                    <View style={{
                      height: Math.max(alturaDespesa, 3),
                      backgroundColor: "#e85555",
                      borderRadius: 3,
                    }} />
                  ) : (
                    <View style={{ height: 3, backgroundColor: "rgba(232,85,85,0.2)", borderRadius: 3 }} />
                  )}
                </View>
              </View>
              {/* Label do mês */}
              <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, textAlign: "center" }}>
                {d.mes}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Legenda */}
      <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#3ac97e" }} />
          <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Receitas</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#e85555" }} />
          <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Despesas</Text>
        </View>
      </View>
    </View>
  );
}

// ── Gastos por Categoria 
function GraficoCategoria({ gastos }) {
  if (!gastos || gastos.length === 0) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center" }}>
          Nenhuma despesa categorizada{"\n"}este mês
        </Text>
      </View>
    );
  }

  return (
    <View style={{ gap: 12 }}>
      {gastos.map((g, i) => (
        <View key={i} style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }} numberOfLines={1}>
              {g.nome}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                {formatarValor(g.valor)}
              </Text>
              <Text style={{ color: g.cor, fontSize: 13, fontWeight: "700", minWidth: 36, textAlign: "right" }}>
                {g.percentual}%
              </Text>
            </View>
          </View>
          <View style={{ height: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
            <View style={{
              height: 6,
              width: `${g.percentual}%`,
              backgroundColor: g.cor,
              borderRadius: 3,
            }} />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Modal Receita
function SalarioModal({ visivel, onFechar, onSalvar, styles }) {
  const [valor, setValor] = useState("");

  function handleSalvar() {
    const num = parseFloat(valor.replace(",", "."));
    if (!isNaN(num) && num > 0) {
      onSalvar(num);
      onFechar();
      setValor("");
    }
  }

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Definir Salário:</Text>
              <TouchableOpacity onPress={onFechar}>
                <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Informe seu salário mensal</Text>
            <View style={styles.modalInputRow}>
              <Text style={styles.modalInputPrefix}>R$</Text>
              <TextInput
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
                placeholder="0,00"
                placeholderTextColor="rgba(255,255,255,0.2)"
                style={styles.modalInput}
              />
            </View>
            <TouchableOpacity onPress={handleSalvar} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ── Dashboard Content ─────────────────────────────────────────────
function DashboardContent({
  styles, saldoTotal, salario, salvarSalario,
  transacoes, carregando, nomeUsuario,
  dadosGrafico, gastosPorCategoria, totalDespesas,
}) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Saudação */}
      <View style={styles.dashboardGreeting}>
        <Text style={styles.dashboardGreetingSubtitle}>Bem-vindo de volta,</Text>
        <Text style={styles.dashboardGreetingTitle}>
          {primeiroNome(nomeUsuario) || "usuário"} 👋
        </Text>
      </View>

      {/* Cards: Saldo + Salário + Despesas */}
      <View style={styles.cardsRow}>
        <View style={styles.cardSaldo}>
          <Text style={styles.cardSaldoLabel}>SALDO TOTAL</Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#0d1321" />
          ) : (
            <Text style={styles.cardSaldoValor}>{formatarValor(saldoTotal)}</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => setModalVisivel(true)} style={styles.cardSalario}>
          <View style={styles.cardSalarioHeader}>
            <Text style={styles.cardSalarioLabel}>Receita: </Text>
            <Text style={{ color: "rgba(58,201,126,0.6)", fontSize: 12 }}>✎</Text>
          </View>
          <Text style={styles.cardSalarioValor}>
            {salario ? formatarValor(salario) : "Definir"}
          </Text>
          <Text style={styles.cardSalarioHint}>Toque para editar</Text>
        </TouchableOpacity>

        <View style={styles.cardDespesas}>
          <Text style={styles.cardDespesasLabel}>DESPESAS (MÊS)</Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#e85555" />
          ) : (
            <Text style={styles.cardDespesasValor}>{formatarValor(totalDespesas)}</Text>
          )}
        </View>
      </View>

      {/* Gráficos */}
      <View style={[
        { marginBottom: 24 },
        isDesktop && { flexDirection: "row", gap: 16 },
      ]}>
        {/* Gráfico de Colunas */}
        <View style={[
          styles.transacoesCard,
          { padding: 18 },
          isDesktop && { flex: 2 },
          !isDesktop && { marginBottom: 16 },
        ]}>
          <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>
            Receitas vs Despesas
          </Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#3ac97e" />
          ) : (
            <GraficoColunas dados={dadosGrafico} />
          )}
        </View>

        {/* Gastos por Categoria */}
        <View style={[
          styles.transacoesCard,
          { padding: 18 },
          isDesktop && { flex: 1, minWidth: 240 },
        ]}>
          <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>
            Gastos por categoria
          </Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#3ac97e" />
          ) : (
            <GraficoCategoria gastos={gastosPorCategoria} />
          )}
        </View>
      </View>

      {/* Últimas Transações */}
      <View style={styles.transacoesCard}>
        <View style={styles.transacoesCardHeader}>
          <Text style={styles.transacoesCardTitle}>Últimas transações</Text>
        </View>

        {carregando ? (
          <View style={styles.transacoesCardVazio}>
            <ActivityIndicator size="small" color="#3ac97e" />
          </View>
        ) : transacoes.length === 0 ? (
          <View style={styles.transacoesCardVazio}>
            <Text style={styles.transacoesCardVazioText}>Nenhuma transação encontrada</Text>
          </View>
        ) : (
          transacoes.map((t, index) => (
            <View
              key={t.id}
              style={[
                styles.transacoesCardItem,
                index < transacoes.length - 1 && styles.transacoesCardItemBorder,
              ]}
            >
              <View style={t.tipo === "DEBIT" ? styles.transacoesCardIconeDebito : styles.transacoesCardIconeCredito}>
                <Text style={{ color: t.tipo === "DEBIT" ? "#e85555" : "#3ac97e", fontSize: 14 }}>
                  {t.tipo === "DEBIT" ? "↓" : "↑"}
                </Text>
              </View>
              <View style={styles.transacoesCardInfo}>
                <Text style={styles.transacoesCardDescricao} numberOfLines={1}>
                  {t.descricao || t.categoria || "—"}
                </Text>
                <Text style={styles.transacoesCardMeta}>
                  {t.categoria || ""}{t.categoria && t.data ? "  ·  " : ""}{formatarData(t.data)}
                </Text>
              </View>
              <Text style={t.tipo === "DEBIT" ? styles.transacoesCardValorDebito : styles.transacoesCardValorCredito}>
                {t.tipo === "DEBIT" ? "-" : "+"}{formatarValor(Math.abs(t.valor))}
              </Text>
            </View>
          ))
        )}
      </View>

      <SalarioModal
        visivel={modalVisivel}
        onFechar={() => setModalVisivel(false)}
        onSalvar={salvarSalario}
        styles={styles}
      />
    </ScrollView>
  );
}

// ── Menu principal ────────────────────────────────────────────────
export function Menu({ navigation, activeRoute = "Dashboard", children }) {
  const styles = useMenuStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const {
    saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario,
    dadosGrafico, gastosPorCategoria, totalDespesas,
  } = useFinancas();

  const dashboardProps = {
    styles, saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario,
    dadosGrafico, gastosPorCategoria, totalDespesas,
  };

  if (isDesktop) {
    return (
      <View style={styles.desktopRoot}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarLogo}>
            <Text style={styles.logoText}>
              Money<Text style={styles.logoTrack}>Track</Text>
            </Text>
          </View>

          <View style={styles.sidebarGreeting}>
            <View style={styles.greetingAvatar}>
              <Text style={styles.greetingAvatarText}>
                {nomeUsuario ? nomeUsuario[0].toUpperCase() : "?"}
              </Text>
            </View>
            <View>
              <Text style={styles.greetingName}>{primeiroNome(nomeUsuario)}</Text>
              <Text style={styles.greetingPlan}>Dashboard</Text>
            </View>
          </View>

          <View style={styles.sidebarNav}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <TouchableOpacity
                  key={item.route}
                  style={[styles.navItem, isActive && styles.navItemActive]}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.sidebarSignOut}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signOutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.desktopContent}>
          {children ? children : <DashboardContent {...dashboardProps} />}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mobileRoot}>
      <View style={styles.mobileContent}>
        {children ? children : <DashboardContent {...dashboardProps} />}
      </View>

      <View style={styles.bottomNav}>
        {MOBILE_ITEMS.map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={styles.bottomNavItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={[styles.bottomNavLabel, isActive && styles.bottomNavLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}