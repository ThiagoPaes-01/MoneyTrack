// src/Page/Menu/Menu.js
import {
  View, Text, TouchableOpacity, useWindowDimensions,
  ActivityIndicator, ScrollView, Modal, TextInput,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { useState } from "react";
import { useMenuStyles } from "./styles";
import { useFinancas } from "../../hooks/useFinancas";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NAV_ITEMS = [
  { label: "Dashboard", route: "Dashboard" },
  { label: "Extrato",   route: "Extrato"   },
  { label: "Relatórios",route: "Relatorios"},
  { label: "Perfil",    route: "Perfil"    },
];

const MOBILE_ITEMS = [
  { label: "Início",    route: "Dashboard" },
  { label: "Extrato",   route: "Extrato"   },
  { label: "Relatórios",route: "Relatorios"},
  { label: "Perfil",    route: "Perfil"    },
];

function formatarValor(valor) {
  if (valor === null || valor === undefined) return "—";
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(data) {
  if (!data) return "";
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function primeiroNome(nome) {
  if (!nome) return "";
  return nome.split(" ")[0];
}

// ── Gráfico de Colunas ────────────────────────────────────────────
function GraficoColunas({ dados }) {
  if (!dados || dados.length === 0) return (
    <View style={{ alignItems: "center", paddingVertical: 32 }}>
      <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Sem dados suficientes</Text>
    </View>
  );

  const max = Math.max(...dados.flatMap(d => [d.receitas || 0, d.despesas || 0]), 1);
  const altMax = 140;

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "flex-end", height: altMax + 40, gap: 4 }}>
        {dados.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2, marginBottom: 6 }}>
              <View style={{ width: 10 }}>
                <View style={{ height: Math.max((d.receitas / max) * altMax, 3), backgroundColor: "#3ac97e", borderRadius: 3 }} />
              </View>
              <View style={{ width: 10 }}>
                <View style={{ height: Math.max((d.despesas / max) * altMax, 3), backgroundColor: "#e85555", borderRadius: 3 }} />
              </View>
            </View>
            <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, textAlign: "center" }}>{d.mes}</Text>
          </View>
        ))}
      </View>
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

// ── Gastos por Categoria ──────────────────────────────────────────
function GraficoCategoria({ gastos }) {
  if (!gastos || gastos.length === 0) return (
    <View style={{ alignItems: "center", paddingVertical: 32 }}>
      <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center" }}>
        Nenhuma despesa categorizada este mês
      </Text>
    </View>
  );

  return (
    <View style={{ gap: 12 }}>
      {gastos.map((g, i) => (
        <View key={i} style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }} numberOfLines={1}>{g.nome}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{formatarValor(g.valor)}</Text>
              <Text style={{ color: g.cor, fontSize: 13, fontWeight: "700", minWidth: 36, textAlign: "right" }}>{g.percentual}%</Text>
            </View>
          </View>
          <View style={{ height: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
            <View style={{ height: 6, width: `${g.percentual}%`, backgroundColor: g.cor, borderRadius: 3 }} />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Modal Salário ─────────────────────────────────────────────────
function SalarioModal({ visivel, onFechar, onSalvar, styles }) {
  const [valor, setValor] = useState("");

  function handleSalvar() {
    const num = parseFloat(valor.replace(",", "."));
    if (!isNaN(num) && num > 0) { onSalvar(num); onFechar(); setValor(""); }
  }

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Definir salário</Text>
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

// ── Dashboard ─────────────────────────────────────────────────────
function DashboardContent({ styles, saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario, dadosGrafico, gastosPorCategoria, totalDespesas }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={styles.dashboardGreeting}>
        <Text style={styles.dashboardGreetingSubtitle}>Bem-vindo de volta,</Text>
        <Text style={styles.dashboardGreetingTitle}>{primeiroNome(nomeUsuario) || "usuário"} 👋</Text>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.cardSaldo}>
          <Text style={styles.cardSaldoLabel}>SALDO TOTAL</Text>
          {carregando ? <ActivityIndicator size="small" color="#0d1321" /> : <Text style={styles.cardSaldoValor}>{formatarValor(saldoTotal)}</Text>}
        </View>
        <TouchableOpacity onPress={() => setModalVisivel(true)} style={styles.cardSalario}>
          <View style={styles.cardSalarioHeader}>
            <Text style={styles.cardSalarioLabel}>SALÁRIO</Text>
            <Text style={{ color: "rgba(58,201,126,0.6)", fontSize: 12 }}>✎</Text>
          </View>
          <Text style={styles.cardSalarioValor}>{salario ? formatarValor(salario) : "Definir"}</Text>
          <Text style={styles.cardSalarioHint}>Toque para editar</Text>
        </TouchableOpacity>
        <View style={styles.cardDespesas}>
          <Text style={styles.cardDespesasLabel}>DESPESAS (MÊS)</Text>
          {carregando ? <ActivityIndicator size="small" color="#e85555" /> : <Text style={styles.cardDespesasValor}>{formatarValor(totalDespesas)}</Text>}
        </View>
      </View>

      <View style={[{ marginBottom: 24 }, isDesktop && { flexDirection: "row", gap: 16 }]}>
        <View style={[styles.transacoesCard, { padding: 18 }, isDesktop && { flex: 2 }, !isDesktop && { marginBottom: 16 }]}>
          <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>Receitas vs Despesas</Text>
          {carregando ? <ActivityIndicator size="small" color="#3ac97e" /> : <GraficoColunas dados={dadosGrafico} />}
        </View>
        <View style={[styles.transacoesCard, { padding: 18 }, isDesktop && { flex: 1, minWidth: 240 }]}>
          <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>Gastos por categoria</Text>
          {carregando ? <ActivityIndicator size="small" color="#3ac97e" /> : <GraficoCategoria gastos={gastosPorCategoria} />}
        </View>
      </View>

      <View style={styles.transacoesCard}>
        <View style={styles.transacoesCardHeader}>
          <Text style={styles.transacoesCardTitle}>Últimas transações</Text>
        </View>
        {carregando ? (
          <View style={styles.transacoesCardVazio}><ActivityIndicator size="small" color="#3ac97e" /></View>
        ) : transacoes.length === 0 ? (
          <View style={styles.transacoesCardVazio}><Text style={styles.transacoesCardVazioText}>Nenhuma transação encontrada</Text></View>
        ) : transacoes.map((t, index) => (
          <View key={t.id} style={[styles.transacoesCardItem, index < transacoes.length - 1 && styles.transacoesCardItemBorder]}>
            <View style={t.tipo === "DEBIT" ? styles.transacoesCardIconeDebito : styles.transacoesCardIconeCredito}>
              <Text style={{ color: t.tipo === "DEBIT" ? "#e85555" : "#3ac97e", fontSize: 14 }}>{t.tipo === "DEBIT" ? "↓" : "↑"}</Text>
            </View>
            <View style={styles.transacoesCardInfo}>
              <Text style={styles.transacoesCardDescricao} numberOfLines={1}>{t.descricao || t.categoria || "—"}</Text>
              <Text style={styles.transacoesCardMeta}>{t.categoria || ""}{t.categoria && t.data ? "  ·  " : ""}{formatarData(t.data)}</Text>
            </View>
            <Text style={t.tipo === "DEBIT" ? styles.transacoesCardValorDebito : styles.transacoesCardValorCredito}>
              {t.tipo === "DEBIT" ? "-" : "+"}{formatarValor(Math.abs(t.valor))}
            </Text>
          </View>
        ))}
      </View>

      <SalarioModal visivel={modalVisivel} onFechar={() => setModalVisivel(false)} onSalvar={salvarSalario} styles={styles} />
    </ScrollView>
  );
}

// ── Extrato
function ExtratoContent({ styles, transacoes, carregando, totalReceitas, totalDespesas }) {
  const [filtro, setFiltro] = useState("Todos");
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // Categorias únicas para filtros
  const categorias = ["Todos", "Receitas", "Despesas", ...new Set(transacoes.map(t => t.categoria).filter(Boolean))];

  const transacoesFiltradas = transacoes.filter(t => {
    if (filtro === "Todos") return true;
    if (filtro === "Receitas") return t.tipo === "CREDIT";
    if (filtro === "Despesas") return t.tipo === "DEBIT";
    return t.categoria === filtro;
  });

  const saldoPeriodo = totalReceitas - totalDespesas;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

      {/* Título */}
      <Text style={styles.extratoTitulo}>Extrato</Text>

      {/* Cards resumo — mesmos valores do Dashboard (mês atual) */}
      <View style={[styles.cardsRow, { marginBottom: 24 }]}>
        <View style={styles.extratoCardReceitas}>
          <Text style={styles.extratoCardLabel}>RECEITAS (MÊS)</Text>
          {carregando ? <ActivityIndicator size="small" color="#3ac97e" /> : (
            <>
              <Text style={styles.extratoCardValorVerde}>{formatarValor(totalReceitas)}</Text>
              <Text style={styles.extratoCardSub}>{transacoes.filter(t => t.tipo === "CREDIT").length} transações</Text>
            </>
          )}
        </View>
        <View style={styles.extratoCardDespesas}>
          <Text style={styles.extratoCardLabel}>DESPESAS (MÊS)</Text>
          {carregando ? <ActivityIndicator size="small" color="#e85555" /> : (
            <>
              <Text style={styles.extratoCardValorVermelho}>{formatarValor(totalDespesas)}</Text>
              <Text style={styles.extratoCardSub}>{transacoes.filter(t => t.tipo === "DEBIT").length} transações</Text>
            </>
          )}
        </View>
        <View style={styles.extratoCardSaldo}>
          <Text style={styles.extratoCardLabel}>SALDO DO PERÍODO</Text>
          {carregando ? <ActivityIndicator size="small" color="#f59e0b" /> : (
            <>
              <Text style={styles.extratoCardValorAmarelo}>{formatarValor(saldoPeriodo)}</Text>
              <Text style={styles.extratoCardSub}>{saldoPeriodo >= 0 ? "✓ positivo" : "⚠ negativo"}</Text>
            </>
          )}
        </View>
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row", gap: 8, paddingVertical: 4 }}>
          {categorias.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFiltro(cat)}
              style={[styles.filtroBtn, filtro === cat && styles.filtroBtnAtivo]}
            >
              <Text style={[styles.filtroBtnText, filtro === cat && styles.filtroBtnTextAtivo]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Lista de transações */}
      <View style={styles.transacoesCard}>
        {/* Header da tabela — só desktop */}
        {isDesktop && (
          <View style={[styles.extratoTableHeader]}>
            <Text style={[styles.extratoTableHeaderText, { flex: 2 }]}>DESCRIÇÃO</Text>
            <Text style={[styles.extratoTableHeaderText, { flex: 1 }]}>CATEGORIA</Text>
            <Text style={[styles.extratoTableHeaderText, { flex: 1 }]}>DATA</Text>
            <Text style={[styles.extratoTableHeaderText, { flex: 1, textAlign: "right" }]}>VALOR</Text>
          </View>
        )}

        {carregando ? (
          <View style={styles.transacoesCardVazio}><ActivityIndicator size="small" color="#3ac97e" /></View>
        ) : transacoesFiltradas.length === 0 ? (
          <View style={styles.transacoesCardVazio}><Text style={styles.transacoesCardVazioText}>Nenhuma transação encontrada</Text></View>
        ) : transacoesFiltradas.map((t, index) => (
          <View key={t.id} style={[styles.transacoesCardItem, index < transacoesFiltradas.length - 1 && styles.transacoesCardItemBorder]}>
            {/* Ícone */}
            <View style={t.tipo === "DEBIT" ? styles.transacoesCardIconeDebito : styles.transacoesCardIconeCredito}>
              <Text style={{ color: t.tipo === "DEBIT" ? "#e85555" : "#3ac97e", fontSize: 14 }}>{t.tipo === "DEBIT" ? "↓" : "↑"}</Text>
            </View>

            {/* Descrição */}
            <View style={[styles.transacoesCardInfo, { flex: isDesktop ? 2 : 1 }]}>
              <Text style={styles.transacoesCardDescricao} numberOfLines={1}>{t.descricao || "—"}</Text>
              {!isDesktop && <Text style={styles.transacoesCardMeta}>{t.categoria || ""}{t.categoria && t.data ? "  ·  " : ""}{formatarData(t.data)}</Text>}
            </View>

            {/* Categoria — só desktop */}
            {isDesktop && (
              <View style={{ flex: 1 }}>
                {t.categoria ? (
                  <View style={[styles.categoriaTag, { backgroundColor: getCategoriaColor(t.categoria) + "22" }]}>
                    <Text style={[styles.categoriaTagText, { color: getCategoriaColor(t.categoria) }]}>{t.categoria}</Text>
                  </View>
                ) : <Text style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>—</Text>}
              </View>
            )}

            {/* Data — só desktop */}
            {isDesktop && (
              <Text style={{ flex: 1, color: "rgba(255,255,255,0.35)", fontSize: 13 }}>{formatarData(t.data)}</Text>
            )}

            {/* Valor */}
            <Text style={[t.tipo === "DEBIT" ? styles.transacoesCardValorDebito : styles.transacoesCardValorCredito, { minWidth: 90, textAlign: "right" }]}>
              {t.tipo === "DEBIT" ? "-" : "+"}{formatarValor(Math.abs(t.valor))}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function getCategoriaColor(categoria) {
  const cores = {
    "Alimentação": "#f59e0b",
    "Transporte": "#3b82f6",
    "Moradia": "#8b5cf6",
    "Entretenimento": "#ec4899",
    "Saúde": "#10b981",
    "Renda": "#3ac97e",
    "Salary": "#3ac97e",
    "Housing": "#8b5cf6",
    "Electricity": "#f59e0b",
    "Music streaming": "#ec4899",
    "Video streaming": "#ec4899",
    "Gyms and fitness centers": "#10b981",
    "Telecommunications": "#3b82f6",
    "Transfer - Bank Slip": "#6b7280",
  };
  return cores[categoria] || "#6b7280";
}

// ── Perfil
function PerfilContent({ styles, nomeUsuario, saldoTotal, totalReceitas, totalDespesas, transacoes, navigation }) {
  async function handleSair() {
    await AsyncStorage.removeItem("usuarioId");
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

      <Text style={styles.extratoTitulo}>Perfil</Text>

      {/* Avatar e nome */}
      <View style={styles.perfilAvatarContainer}>
        <View style={styles.perfilAvatar}>
          <Text style={styles.perfilAvatarText}>{nomeUsuario ? nomeUsuario[0].toUpperCase() : "?"}</Text>
        </View>
        <Text style={styles.perfilNome}>{nomeUsuario || "Usuário"}</Text>
        <Text style={styles.perfilSubtitle}>Conta gratuita</Text>
      </View>

      {/* Cards resumo financeiro */}
      <Text style={styles.perfilSecaoTitulo}>Resumo financeiro</Text>
      <View style={styles.cardsRow}>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>SALDO TOTAL</Text>
          <Text style={styles.perfilCardValorVerde}>{formatarValor(saldoTotal)}</Text>
        </View>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>TRANSAÇÕES</Text>
          <Text style={styles.perfilCardValor}>{transacoes.length}</Text>
        </View>
      </View>
      <View style={styles.cardsRow}>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>RECEITAS (MÊS)</Text>
          <Text style={styles.perfilCardValorVerde}>{formatarValor(totalReceitas)}</Text>
        </View>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>DESPESAS (MÊS)</Text>
          <Text style={styles.perfilCardValorVermelho}>{formatarValor(totalDespesas)}</Text>
        </View>
      </View>

      {/* Botão sair */}
      <TouchableOpacity onPress={handleSair} style={styles.perfilBotaoSair}>
        <Text style={styles.perfilBotaoSairText}>Sair da conta</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

// ── Relatórios (placeholder) ──────────────────────────────────────
function RelatoriosContent({ styles }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 40, marginBottom: 16 }}>📊</Text>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 8 }}>Em breve</Text>
      <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, textAlign: "center" }}>
        A tela de relatórios avançados está sendo desenvolvida.
      </Text>
    </View>
  );
}

// ── Menu principal ────────────────────────────────────────────────
export function Menu({ navigation, activeRoute = "Dashboard", children }) {
  const styles = useMenuStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [telaAtiva, setTelaAtiva] = useState("Dashboard");

  const {
    saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario,
    dadosGrafico, gastosPorCategoria, totalReceitas, totalDespesas,
  } = useFinancas();

  function renderConteudo() {
    if (children) return children;
    switch (telaAtiva) {
      case "Extrato":
        return <ExtratoContent styles={styles} transacoes={transacoes} carregando={carregando} totalReceitas={totalReceitas} totalDespesas={totalDespesas} />;
      case "Perfil":
        return <PerfilContent styles={styles} nomeUsuario={nomeUsuario} saldoTotal={saldoTotal} totalReceitas={totalReceitas} totalDespesas={totalDespesas} transacoes={transacoes} navigation={navigation} />;
      case "Relatorios":
        return <RelatoriosContent styles={styles} />;
      default:
        return (
          <DashboardContent
            styles={styles} saldoTotal={saldoTotal} salario={salario} salvarSalario={salvarSalario}
            transacoes={transacoes} carregando={carregando} nomeUsuario={nomeUsuario}
            dadosGrafico={dadosGrafico} gastosPorCategoria={gastosPorCategoria} totalDespesas={totalDespesas}
          />
        );
    }
  }

  const navItems = isDesktop ? NAV_ITEMS : MOBILE_ITEMS;

  if (isDesktop) {
    return (
      <View style={styles.desktopRoot}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarLogo}>
            <Text style={styles.logoText}>Money<Text style={styles.logoTrack}>Track</Text></Text>
          </View>
          <View style={styles.sidebarGreeting}>
            <View style={styles.greetingAvatar}>
              <Text style={styles.greetingAvatarText}>{nomeUsuario ? nomeUsuario[0].toUpperCase() : "?"}</Text>
            </View>
            <View>
              <Text style={styles.greetingName}>{primeiroNome(nomeUsuario)}</Text>
              <Text style={styles.greetingPlan}>{telaAtiva}</Text>
            </View>
          </View>
          <View style={styles.sidebarNav}>
            {NAV_ITEMS.map(item => {
              const isActive = telaAtiva === item.route;
              return (
                <TouchableOpacity key={item.route} style={[styles.navItem, isActive && styles.navItemActive]} onPress={() => setTelaAtiva(item.route)}>
                  <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={styles.sidebarSignOut} onPress={async () => { await AsyncStorage.removeItem("usuarioId"); await AsyncStorage.removeItem("token"); navigation.navigate("Login"); }}>
            <Text style={styles.signOutText}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.desktopContent}>{renderConteudo()}</View>
      </View>
    );
  }

  return (
    <View style={styles.mobileRoot}>
      <View style={styles.mobileContent}>{renderConteudo()}</View>
      <View style={styles.bottomNav}>
        {MOBILE_ITEMS.map(item => {
          const isActive = telaAtiva === item.route;
          return (
            <TouchableOpacity key={item.route} style={styles.bottomNavItem} onPress={() => setTelaAtiva(item.route)}>
              <Text style={[styles.bottomNavLabel, isActive && styles.bottomNavLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}