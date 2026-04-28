import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";
import { Input } from "../../components/Input/input";

const c = color.colors;

export function useLoginStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return StyleSheet.create({
    // ─── SCROLL / ROOT ───────────────────────────────────────
    scrollView: {
      flex: 1,
      backgroundColor: "#0a0d0f",
    },

    container: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: isDesktop ? "center" : "center",
      backgroundColor: "#0a0d0f",
      paddingVertical: isDesktop ? 48 : 0,
      minHeight: isDesktop ? "100vh" : undefined,
    },

    // ─── PHONE FRAME ─────────────────────────────────────────
    phoneFrame: {
      width: isDesktop ? 390 : "100%",
      backgroundColor: isDesktop ? "#111318" : "#0a0d0f",
      borderRadius: isDesktop ? 48 : 0,
      borderWidth: isDesktop ? 1.5 : 0,
      borderColor: "rgba(255,255,255,0.1)",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: 0.6,
      shadowRadius: 48,
      elevation: 24,
    },

    // ─── NOTCH ───────────────────────────────────────────────
    notch: {
      width: 120,
      height: 28,
      backgroundColor: "#0a0d0f",
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      alignSelf: "center",
      display: isDesktop ? "flex" : "none",
    },

    // ─── STATUS BAR ──────────────────────────────────────────
    statusBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingTop: isDesktop ? 8 : 48,
      paddingBottom: 4,
      display: isDesktop ? "flex" : "none",
    },

    statusTime: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.5)",
    },

    statusSignal: {
      fontSize: 12,
      color: "rgba(255,255,255,0.5)",
    },

    // ─── HEADER — logo + slogan ───────────────────────────────
    header: {
      alignItems: "center",
      paddingTop: isDesktop ? 20 : 56,
      paddingBottom: 16,
      paddingHorizontal: 24,
    },

    // Logo sem nenhum container por volta — imagem direta
    logo: {
      width: 280,
      height: 220,
      resizeMode: "contain",
      marginBottom: 0,
    },

    slogan: {
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
      textAlign: "center",
      marginTop: -30,
    },

    // ─── FORMULÁRIO ──────────────────────────────────────────
    containerMid: {
      paddingHorizontal: 24,
      paddingBottom: isDesktop ? 36 : 40,
    },

    bemVindo: {
      marginBottom: 22,
    },

    bemVindoTitulo: {
      fontSize: 22,
      fontWeight: "800",
      color: c.white,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 4,
    },

    bemVindoSubtitulo: {
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
    },

    form: {
      width: "100%",
    },

    // ─── BOTÕES SOCIAIS ───────────────────────────────────────
    outrosLogin: {
      gap: 10,
      marginBottom: 20,
    },

    botaoSocial: {
      backgroundColor: "#1e2330",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.08)",
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    // ─── DIVISOR ─────────────────────────────────────────────
    divider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 20,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: "rgba(255,255,255,0.08)",
    },

    continueCom: {
      fontSize: 12,
      color: "rgba(255,255,255,0.3)",
    },

    // ─── LABELS ──────────────────────────────────────────────
    label: {
      fontSize: 11,
      fontWeight: "700",
      color: "rgba(255,255,255,0.5)",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 8,
      marginTop: 14,
    },

    // ─── INPUTS ──────────────────────────────────────────────
    boxInput: {
      backgroundColor: "#1e2330",
      color: c.white,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.08)",
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
    },

    Input: {
      color: c.white,
    },

    // ─── ESQUECEU SENHA ───────────────────────────────────────
    esqueceuSenha: {
      alignSelf: "flex-end",
      marginTop: 10,
      marginBottom: 22,
      fontSize: 13,
      color: c.success,
      fontWeight: "600",
    },

    // ─── RODAPÉ ──────────────────────────────────────────────
    cadastre: {
      textAlign: "center",
      marginTop: 18,
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
    },

    cadastreLink: {
      color: c.success,
      fontWeight: "700",
    },

    // ─── HOME INDICATOR ───────────────────────────────────────
    homeIndicator: {
      width: 100,
      height: 5,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 3,
      alignSelf: "center",
      marginBottom: 12,
      marginTop: 8,
      display: isDesktop ? "flex" : "none",
    },
  });
}
