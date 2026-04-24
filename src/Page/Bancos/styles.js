// screens/Bancos/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

export function useBancosStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const scale = isDesktop ? 1 : width / 375;
  const rs = (size) => Math.round(size * scale);

  return StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: color.colors.background,
      paddingHorizontal: rs(20),
      paddingTop: rs(48),
      paddingBottom: rs(24),
    },

    containerHeader: {
      marginBottom: rs(24),
    },

    textConect: {
      fontSize: isDesktop ? 28 : rs(22),
      fontWeight: "700",
      color: color.colors.textPrimary,
      marginBottom: rs(6),
    },

    textDados: {
      fontSize: rs(13),
      color: color.colors.textSecondary,
    },

    containerMid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: rs(12),
      justifyContent: "space-between",
      paddingBottom: rs(16),
    },

    buttonBanco: {
      backgroundColor: color.colors.white,
      borderWidth: 1,
      borderColor: color.colors.border,
      borderRadius: 12,
      paddingVertical: rs(14),
      paddingHorizontal: rs(12),
      marginTop: 0,
      width: "47%",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: rs(10),
    },

    logoBanco: {
      width: rs(28),
      height: rs(28),
      borderRadius: 6,
      resizeMode: "contain",
    },

    textBanco: {
      color: color.colors.textPrimary,
      fontSize: rs(14),
      fontWeight: "500",
    },

    buttonConectar: {
      backgroundColor: color.colors.brandGreen,
      borderRadius: 14,
      paddingVertical: rs(16),
      marginTop: rs(8),
    },
  });
}
