import { StyleSheet } from "react-native";
import { color } from "../../Global/color";
import { useWindowDimensions } from "react-native";

export function useCadastroStyles() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 768;
  const scale = isDesktop ? 1 : width / 375;
  const rs = (size) => Math.round(size * scale);

  return StyleSheet.create({
    containerMain: {
      flexGrow: 1,
      flexDirection: isDesktop ? "row" : "column", // ← duas colunas no desktop
      width: "100%",
      backgroundColor: color.colors.brandDark,
    },

    boxLogo: {
      backgroundColor: "#1a2a3a",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: rs(20),
      // mobile: faixa no topo | desktop: coluna esquerda
      height: isDesktop ? "100vh" : undefined,
      width: isDesktop ? "45%" : "100%",
      paddingTop: isDesktop ? 0 : rs(38),
      paddingBottom: isDesktop ? 0 : rs(14),
    },

    logo: {
      height: 260,
      width: 280,
      marginTop: -80,
    },

    frase: {
      fontSize: 13,
      color: color.colors.gray200,
      marginTop: -90,
      textAlign: "center",
    },

    form: {
      width: rs(400),
      flex: 1,
      maxWidth: isDesktop ? undefined : "98%"
    },

    containerForm: {
      flex: 1,
      backgroundColor: "#ffffff",

      // mobile: arredonda topo | desktop: arredonda esquerda
      borderTopLeftRadius: isDesktop ? 0 : rs(28),
      borderTopRightRadius: isDesktop ? 0 : rs(28),
      borderBottomLeftRadius: isDesktop ? rs(28) : 0,  // não tem efeito mas fica semântico

      paddingHorizontal: isDesktop ? 48 : rs(24),
      paddingTop: isDesktop ? 60 : rs(28),
      paddingBottom: isDesktop ? 60 : rs(32),

      // desktop: centraliza o formulário verticalmente
      justifyContent: isDesktop ? "center" : "flex-start",
      alignItems: isDesktop ? "center" : "flex-start",
    },

    registre: {
      fontSize: isDesktop ? 28 : rs(22),
      fontWeight: "700", color: "#111827",
      marginBottom: rs(30)
    },

    label: {
      fontSize: 13,
      color: color.colors.textPrimary,
      marginBottom: 6,
      marginTop: 14,
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

    boxInputFocused: {
      borderColor: color.colors.brandBlue,
      backgroundColor: color.colors.blue50,
    },

    input: {
      flex: 1,
      fontSize: 14,
      color: color.colors.textPrimary,
    },

    btnCriar: {
      backgroundColor: color.colors.brandGreen,
      borderRadius: 12,
      height: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginTop: 16,
      padding: 20,
    },

    btnCriarText: {
      color: color.colors.gray50,
      fontSize: 15,
      fontWeight: "700",
    },

    jaTemConta: {
      textAlign: "center",
      fontSize: 13,
      color: color.colors.textSecondary,
      marginTop: 20,
    },

    jaTemContaLink: {
      color: color.colors.brandBlue,
      fontWeight: "600",
    },

  });
}