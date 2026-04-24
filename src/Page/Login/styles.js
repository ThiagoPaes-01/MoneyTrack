// screens/Login/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

export function useLoginStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const scale = isDesktop ? 1 : width / 375;
  const rs = (size) => Math.round(size * scale);

  return StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: color.colors.brandDark,
    },

    container: {
      flexGrow: 1,
      flexDirection: isDesktop ? "row" : "column",
    },

    header: {
      backgroundColor: color.colors.brandDark,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: rs(20),
      height: isDesktop ? "100vh" : undefined,
      width: isDesktop ? "45%" : "100%",
      paddingTop: isDesktop ? 0 : rs(38),
      paddingBottom: isDesktop ? 0 : rs(14),
    },

    logo: {
      marginTop: rs(-40),
      height: isDesktop ? 260 : rs(250),
      width: isDesktop ? 400 : rs(320),
      resizeMode: "contain",
    },

    slogan: {
      fontSize: isDesktop ? 15 : rs(13),
      color: color.colors.gray200,
      marginTop: rs(-80),
      textAlign: "center",
    },

    containerMid: {
      flex: 1,
      backgroundColor: color.colors.white,
      borderTopLeftRadius: isDesktop ? 0 : rs(28),
      borderTopRightRadius: isDesktop ? 0 : rs(28),
      paddingHorizontal: isDesktop ? 48 : rs(24),
      paddingTop: isDesktop ? 60 : rs(28),
      paddingBottom: isDesktop ? 60 : rs(32),
      justifyContent: isDesktop ? "center" : "flex-start",
      alignItems: isDesktop ? "center" : "flex-start",
    },

    bemVindo: {
      marginLeft: rs(20),
      marginBottom: rs(24),
    },

    bemVindoTitulo: {
      fontSize: isDesktop ? 28 : rs(22),
      fontWeight: "700",
      color: color.colors.textPrimary,
      marginBottom: rs(4),
    },

    bemVindoSubtitulo: {
      fontSize: isDesktop ? 15 : rs(13),
      color: color.colors.textSecondary,
    },

    form: {
      width: "100%",
      maxWidth: 400,
      alignSelf: "center",
    },

    label: {
      fontSize: rs(13),
      fontWeight: "600",
      color: color.colors.textPrimary,
      marginBottom: rs(6),
      marginTop: rs(12),
    },

    boxInput: {
      backgroundColor: color.colors.blue50,
      borderRadius: rs(10),
      paddingHorizontal: rs(14),
      paddingVertical: rs(12),
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },

    esqueceuSenha: {
      alignSelf: "flex-end",
      marginTop: rs(10),
      marginBottom: rs(20),
      fontSize: rs(13),
    },

    divider: {
      alignItems: "center",
      marginVertical: rs(16),
    },

    continueCom: {
      fontSize: rs(13),
      color: color.colors.textSecondary,
    },

    outrosLogin: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: rs(12),
    },

    botaoSocial: {
      flex: 1,
    },

    cadastre: {
      textAlign: "center",
      marginTop: rs(20),
      fontSize: rs(13),
      color: color.colors.textSecondary,
    },
  });
}
