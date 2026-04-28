// screens/Cadastro/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;

export function useCadastroStyles() {
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
      justifyContent: isDesktop ? "center" : "flex-start",
      backgroundColor: "#0a0d0f",
      paddingVertical: isDesktop ? 48 : 0,
    },

    // ─── PHONE FRAME ─────────────────────────────────────────
    phoneFrame: {
      width: isDesktop ? 390 : "100%",
      backgroundColor: "#111318",
      borderRadius: isDesktop ? 48 : 0,
      borderWidth: isDesktop ? 1.5 : 0,
      borderColor: "rgba(255,255,255,0.1)",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: isDesktop ? 0.6 : 0,
      shadowRadius: 48,
      elevation: isDesktop ? 24 : 0,
    },

    // ─── NOTCH ───────────────────────────────────────────────
    notch: {
      width: 120,
      height: 28,
      backgroundColor: "#0a0d0f",
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      alignSelf: "center",
    },

    // ─── STATUS BAR ──────────────────────────────────────────
    statusBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 4,
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

    // ─── HEADER — logo + frase ────────────────────────────────
    header: {
      alignItems: "center",
      paddingTop: isDesktop ? 20 : 56,
      paddingBottom: 16,
      paddingHorizontal: 24,
    },

    logo: {
      width: 120,
      height: 120,
      resizeMode: "contain",
      marginBottom: 10,
    },

    frase: {
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
      textAlign: "center",
    },

    // ─── FORMULÁRIO ──────────────────────────────────────────
    containerForm: {
      paddingHorizontal: 24,
      paddingBottom: isDesktop ? 36 : 40,
    },

    bemVindo: {
      marginBottom: 22,
    },

    registre: {
      fontSize: 22,
      fontWeight: "800",
      color: c.white,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 2,
    },

    registreSubtitulo: {
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
    },

    form: {
      width: "100%",
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
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.08)",
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
    },
    Inputs: {
      color: c.white,
    },

    // ─── RODAPÉ ──────────────────────────────────────────────
    jaTemConta: {
      textAlign: "center",
      marginTop: 18,
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
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
    },
  });
}
