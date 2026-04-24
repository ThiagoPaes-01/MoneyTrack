// screens/Cadastro/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

export function useCadastroStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const scale = isDesktop ? 1 : width / 375;
  const rs = (size) => Math.round(size * scale);

  return StyleSheet.create({
    containerMain: {
      flex: 1,
      flexDirection: isDesktop ? "row" : "column",
      backgroundColor: color.colors.brandDark,
    },

    boxLogo: {
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
      height: 260,
      width: 280,
      marginTop: -80,
      resizeMode: "contain",
    },

    frase: {
      fontSize: rs(13),
      color: color.colors.gray200,
      marginTop: -90,
      textAlign: "center",
    },

    containerForm: {
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

    registre: {
      fontSize: isDesktop ? 28 : rs(22),
      fontWeight: "700",
      color: color.colors.textPrimary,
      marginBottom: rs(30),
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
      marginTop: rs(14),
    },

    boxInput: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.colors.background,
      borderWidth: 1,
      borderColor: color.colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 48,
    },

    btnCriar: {
      backgroundColor: color.colors.brandGreen,
      borderRadius: 12,
      height: 52,
      marginTop: rs(16),
    },

    btnCriarText: {
      fontSize: 15,
      fontWeight: "700",
    },

    jaTemConta: {
      textAlign: "center",
      fontSize: rs(13),
      color: color.colors.textSecondary,
      marginTop: rs(20),
    },
  });
}
