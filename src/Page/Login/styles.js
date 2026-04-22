// useLoginStyles.js
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

export function useLoginStyles() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 768;
  const scale = isDesktop ? 1 : width / 375;
  const rs = (size) => Math.round(size * scale);

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      flexDirection: isDesktop ? "row" : "column", // ← duas colunas no desktop
    },

    scrollView: {
      flex: 1,
      backgroundColor: "#1a2a3a",
    },

    header: {
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
      height: isDesktop ? 260 : rs(240),
      width: isDesktop ? 400 : rs(320),
      resizeMode: "contain",
    },

    slogan: {
      fontSize: isDesktop ? 15 : rs(13),
      color: "#c0ccd8",
      marginTop: rs(6),
      textAlign: "center",
    },

    containerMid: {
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


    wrapper: {
      flex: 1,
      backgroundColor: "#1a2a3a"
    },

    containerMidContent: {
      paddingHorizontal: rs(24),
      paddingTop: rs(10),
      paddingBottom: rs(45),
      flexGrow: 1
    },

    bem_vindo: {
      marginBottom: rs(24)
    },

    bemVindoTitulo: {
      fontSize: isDesktop ? 28 : rs(22),
      fontWeight: "700", color: "#111827",
      marginBottom: rs(4)
    },

    bemVindoSubtitulo: {
      fontSize: isDesktop ? 15 : rs(13),
      color: "#6b7280"
    },

    form: {
      width: rs(400),
      flex: 1,
      maxWidth: isDesktop ? undefined : undefined
    },
    // limita largura do form no desktop
    label: {
      fontSize: rs(13),
      fontWeight: "600",
      color: "#374151",
      marginBottom: rs(6),
      marginTop: rs(12)
    },

    boxInput: {
      backgroundColor: "#eef4fb",
      borderRadius: rs(10),
      paddingHorizontal: rs(14),
      paddingVertical: rs(12),
      flexDirection: "row",
      alignItems: "center"
    },

    input: {
      flex: 1,
      fontSize: rs(15),
      color: "#111827"
    },

    checkpassword: {
      display: "none",
      color: ""
    },

    esqueceuSenha: {
      alignSelf: "flex-end",
      marginTop: rs(10),
      marginBottom: rs(20),
      color: "#2563eb",
      fontSize: rs(13),
      fontWeight: "600"
    },

    divider: {
      alignItems: "center",
      marginVertical: rs(16)
    },

    continueCom: {
      fontSize: rs(13),
      color: "#9ca3af"
    },

    outrosLogin: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: rs(12)
    },

    botaosocial: {
      flex: 1
    },

    cadastre: {
      textAlign: "center",
      marginTop: rs(20),
      fontSize: rs(13),
      color: "#6b7280"
    },

  });
}