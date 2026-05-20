// src/Page/Menu/Menu.js
import {
  View, Text, TouchableOpacity, useWindowDimensions,
  ActivityIndicator, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform,
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

function formatarData(data) {
  if (!data) return "";
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function primeiroNome(nome) {
  if (!nome) return "";
  return nome.split(" ")[0];
}

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

function DashboardContent({ styles, saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario }) {
  const [modalVisivel, setModalVisivel] = useState(false);

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

      {/* Cards: Saldo + Salário */}
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
            <Text style={styles.cardSalarioLabel}>SALÁRIO</Text>
            <Text style={{ color: "rgba(58,201,126,0.6)", fontSize: 12 }}>✎</Text>
          </View>
          <Text style={styles.cardSalarioValor}>
            {salario ? formatarValor(salario) : "Definir"}
          </Text>
          <Text style={styles.cardSalarioHint}>Toque para editar</Text>
        </TouchableOpacity>

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

export function Menu({ navigation, activeRoute = "Dashboard", children }) {
  const styles = useMenuStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const { saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario } = useFinancas();

  const dashboardProps = { styles, saldoTotal, salario, salvarSalario, transacoes, carregando, nomeUsuario };

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