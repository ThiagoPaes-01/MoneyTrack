// screens/Menu/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;

export function useMenuStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return StyleSheet.create({

    // ════════════════════════════════════════
    // DESKTOP
    // ════════════════════════════════════════

    desktopRoot: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#0a0d0f",
    },

    sidebar: {
      width: 240,
      backgroundColor: "#111318",
      borderRightWidth: 1,
      borderRightColor: "rgba(255,255,255,0.06)",
      paddingTop: 28,
      paddingBottom: 24,
      flexDirection: "column",
    },

    sidebarLogo: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.06)",
      marginBottom: 20,
    },

    logoText: {
      fontSize: 20,
      fontWeight: "800",
      color: "#ffffff",
      letterSpacing: 2,
      textTransform: "uppercase",
    },

    logoTrack: {
      color: c.warning,
    },

    sidebarGreeting: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 14,
      marginHorizontal: 12,
      marginBottom: 16,
      backgroundColor: "#1a1f2e",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.06)",
    },

    greetingAvatar: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: c.success,
      alignItems: "center",
      justifyContent: "center",
    },

    greetingAvatarText: {
      fontSize: 16,
      fontWeight: "800",
      color: "#ffffff",
    },

    greetingName: {
      fontSize: 13,
      fontWeight: "700",
      color: "#ffffff",
    },

    greetingPlan: {
      fontSize: 11,
      color: c.warning,
      marginTop: 1,
    },

    saldoCard: {
      marginHorizontal: 12,
      marginBottom: 16,
      backgroundColor: "rgba(58,201,126,0.08)",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(58,201,126,0.18)",
      paddingHorizontal: 20,
      paddingVertical: 14,
    },

    saldoLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: "rgba(255,255,255,0.45)",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 4,
    },

    saldoValor: {
      fontSize: 22,
      fontWeight: "800",
      color: c.success,
    },

    sidebarNav: {
      paddingHorizontal: 12,
      gap: 2,
      marginBottom: 16,
      flex: 1,
    },

    navItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderRadius: 12,
      borderLeftWidth: 2,
      borderLeftColor: "transparent",
    },

    navItemActive: {
      backgroundColor: "rgba(58,201,126,0.08)",
      borderLeftColor: c.success,
    },

    navLabel: {
      flex: 1,
      fontSize: 13,
      fontWeight: "500",
      color: "rgba(255,255,255,0.45)",
    },

    navLabelActive: {
      color: c.success,
      fontWeight: "700",
    },

    transacoesContainer: {
      flex: 1,
      paddingHorizontal: 12,
      marginBottom: 8,
    },

    transacoesTitle: {
      fontSize: 11,
      fontWeight: "600",
      color: "rgba(255,255,255,0.35)",
      textTransform: "uppercase",
      letterSpacing: 1,
      paddingHorizontal: 8,
      marginBottom: 8,
    },

    transacoesVazio: {
      fontSize: 12,
      color: "rgba(255,255,255,0.25)",
      paddingHorizontal: 8,
      paddingVertical: 4,
    },

    transacaoItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      marginBottom: 2,
    },

    transacaoIcone: {
      width: 26,
      height: 26,
      borderRadius: 8,
      backgroundColor: "rgba(255,255,255,0.06)",
      alignItems: "center",
      justifyContent: "center",
    },

    transacaoInfo: {
      flex: 1,
    },

    transacaoDescricao: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.8)",
    },

    transacaoData: {
      fontSize: 10,
      color: "rgba(255,255,255,0.3)",
      marginTop: 1,
    },

    transacaoValor: {
      fontSize: 12,
      fontWeight: "700",
    },

    valorDebito: {
      color: "#e85555",
    },

    valorCredito: {
      color: c.success,
    },

    sidebarSignOut: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 26,
      paddingVertical: 14,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.06)",
    },

    signOutText: {
      fontSize: 13,
      fontWeight: "600",
      color: "rgba(232,85,85,0.7)",
    },

    desktopContent: {
      flex: 1,
      backgroundColor: "#0a0d0f",
    },

    // ════════════════════════════════════════
    // MOBILE
    // ════════════════════════════════════════

    mobileRoot: {
      flex: 1,
      backgroundColor: "#0a0d0f",
    },

    mobileContent: {
      flex: 1,
    },

    bottomNav: {
      flexDirection: "row",
      backgroundColor: "#111318",
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.07)",
      paddingBottom: 20,
      paddingTop: 10,
    },

    bottomNavItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },

    bottomNavLabel: {
      fontSize: 10,
      fontWeight: "500",
      color: "rgba(255,255,255,0.35)",
    },

    bottomNavLabelActive: {
      color: c.success,
      fontWeight: "700",
    },

    // ════════════════════════════════════════
    // DASHBOARD
    // ════════════════════════════════════════

    dashboardGreeting: {
      marginBottom: 24,
    },

    dashboardGreetingSubtitle: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 14,
    },

    dashboardGreetingTitle: {
      color: "#fff",
      fontSize: 26,
      fontWeight: "800",
      marginTop: 2,
    },

    cardsRow: {
      flexDirection: "row",
      gap: 14,
      marginBottom: 14,
    },

    // ─── Card Saldo ──────────────────────────
    cardSaldo: {
      flex: 1,
      backgroundColor: "#3ac97e",
      borderRadius: 16,
      padding: 20,
    },

    cardSaldoLabel: {
      color: "rgba(0,0,0,0.55)",
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 8,
    },

    cardSaldoValor: {
      color: "#0d1321",
      fontSize: 22,
      fontWeight: "800",
    },

    // ─── Card Salário ─────────────────────────
    cardSalario: {
      flex: 1,
      backgroundColor: "#1a2235",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: "rgba(58,201,126,0.15)",
    },

    cardSalarioHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },

    cardSalarioLabel: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 12,
      fontWeight: "600",
    },

    cardSalarioValor: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "800",
      marginTop: 8,
    },

    cardSalarioHint: {
      color: "rgba(255,255,255,0.25)",
      fontSize: 11,
      marginTop: 12,
    },

    // ─── Card Receitas ────────────────────────
    cardReceitas: {
      flex: 1,
      backgroundColor: "#1a2235",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: "rgba(58,201,126,0.15)",
    },

    cardReceitasLabel: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 8,
    },

    cardReceitasValor: {
      color: "#3ac97e",
      fontSize: 20,
      fontWeight: "800",
    },

    // ─── Card Despesas ────────────────────────
    cardDespesas: {
      flex: 1,
      backgroundColor: "#1a2235",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: "rgba(232,85,85,0.15)",
    },

    cardDespesasLabel: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 8,
    },

    cardDespesasValor: {
      color: "#e85555",
      fontSize: 20,
      fontWeight: "800",
    },

    // ─── Lista de transações ─────────────────
    transacoesCard: {
      backgroundColor: "#1a2235",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.06)",
      overflow: "hidden",
    },

    transacoesCardHeader: {
      padding: 18,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.05)",
    },

    transacoesCardTitle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },

    transacoesCardVazio: {
      padding: 32,
      alignItems: "center",
    },

    transacoesCardVazioText: {
      color: "rgba(255,255,255,0.3)",
      fontSize: 14,
    },

    transacoesCardItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      paddingHorizontal: 18,
    },

    transacoesCardItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.04)",
    },

    transacoesCardIconeDebito: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(232,85,85,0.12)",
      marginRight: 14,
    },

    transacoesCardIconeCredito: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(58,201,126,0.12)",
      marginRight: 14,
    },

    transacoesCardInfo: {
      flex: 1,
    },

    transacoesCardDescricao: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },

    transacoesCardMeta: {
      color: "rgba(255,255,255,0.35)",
      fontSize: 12,
      marginTop: 2,
    },

    transacoesCardValorDebito: {
      fontSize: 15,
      fontWeight: "700",
      color: "#e85555",
    },

    transacoesCardValorCredito: {
      fontSize: 15,
      fontWeight: "700",
      color: "#3ac97e",
    },

    // ─── Modal ───────────────────────────────
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },

    modalBox: {
      backgroundColor: "#1a2235",
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 360,
      borderWidth: 1,
      borderColor: "rgba(58,201,126,0.2)",
    },

    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    modalTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },

    modalSubtitle: {
      color: "rgba(255,255,255,0.5)",
      fontSize: 13,
      marginBottom: 12,
    },

    modalInputRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.06)",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(58,201,126,0.3)",
      paddingHorizontal: 14,
      marginBottom: 20,
    },

    modalInputPrefix: {
      color: "#3ac97e",
      fontSize: 16,
      marginRight: 8,
    },

    modalInput: {
      flex: 1,
      color: "#fff",
      fontSize: 20,
      fontWeight: "600",
      paddingVertical: 14,
    },

    modalButton: {
      backgroundColor: "#3ac97e",
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: "center",
    },

    modalButtonText: {
      color: "#0d1321",
      fontSize: 15,
      fontWeight: "700",
    },
  });
}