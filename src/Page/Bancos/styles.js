// screens/Bancos/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;

export function useBancosStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const PHONE_WIDTH = 390;
  const PADDING = 16;
  const GAP = 8;
  const COLS = 3;

  const containerWidth = isDesktop ? PHONE_WIDTH : width;
  const cardWidth = (containerWidth - PADDING * 2 - GAP * (COLS - 0)) / COLS;

  return StyleSheet.create({
    // ─── DESKTOP BG ──────────────────────────────────────────
    desktopBg: {
      flex: 1,
      backgroundColor: "#0a0d0f",
      alignItems: "center",
      justifyContent: "center",
    },

    // ─── PHONE FRAME (desktop) ────────────────────────────────
    phoneFrame: {
      width: PHONE_WIDTH, // 390px — largura fixa de celular
      maxHeight: "93vh",
      backgroundColor: "#111318",
      borderRadius: 48,
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.12)",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 32 },
      shadowOpacity: 0.7,
      shadowRadius: 64,
      elevation: 30,
      paddingTop: 20,
    },

    // ─── HOME INDICATOR ───────────────────────────────────────
    homeIndicator: {
      width: 120,
      height: 5,
      backgroundColor: "rgba(255,255,255,0.18)",
      borderRadius: 3,
      alignSelf: "center",
      marginTop: 10,
      marginBottom: 14,
    },

    // ─── MOBILE ROOT ─────────────────────────────────────────
    containerMain: {
      flex: 1,
      backgroundColor: "#0a0d0f",
      paddingTop: 52,
    },

    // ─── HEADER ──────────────────────────────────────────────
    containerHeader: {
      paddingHorizontal: PADDING,
      paddingBottom: 18,
      paddingTop: isDesktop ? 4 : 0,
    },

    badge: {
      alignSelf: "flex-start",
      backgroundColor: "rgba(58,201,126,0.1)",
      borderWidth: 1,
      borderColor: "rgba(58,201,126,0.3)",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    badgeText: {
      fontSize: 11,
      fontWeight: "600",
      color: c.success,
    },

    textConect: {
      fontSize: 20,
      fontWeight: "800",
      color: "#ffffff",
      marginBottom: 5,
    },

    textDados: {
      fontSize: 12,
      color: "rgba(255,255,255,0.4)",
      lineHeight: 18,
    },

    // ─── GRID 3 COLUNAS ──────────────────────────────────────
    containerMid: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: PADDING,
      paddingBottom: 16,
      gap: GAP,
    },

    buttonBanco: {
      width: cardWidth,
      backgroundColor: "#1a1f2e",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.07)",
      paddingVertical: 16,
      paddingHorizontal: 4,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },

    logoBanco: {
      width: 46,
      height: 46,
      borderRadius: 12,
      resizeMode: "contain",
    },

    textBanco: {
      color: "rgba(255,255,255,0.75)",
      fontSize: 11,
      fontWeight: "600",
      textAlign: "center",
    },

    // ─── FOOTER ──────────────────────────────────────────────
    containerFooter: {
      paddingHorizontal: PADDING,
      paddingBottom: isDesktop ? 4 : 36,
      paddingTop: 8,
      gap: 12,
    },

    pularText: {
      textAlign: "center",
      fontSize: 12,
      color: "rgba(255,255,255,0.3)",
    },

    pularLink: {
      color: c.success,
      fontWeight: "600",
    },
  });
}
