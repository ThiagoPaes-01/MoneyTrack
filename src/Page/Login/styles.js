// useLoginStyles.js
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

export function useLoginStyles() {
  const { width, height } = useWindowDimensions(); // ← reativo, atualiza automaticamente
  const scale = width / 375;
  const rs = (size) => Math.round(size * scale);

  return StyleSheet.create({
    container: {
      flexGrow: 1, // permite scroll mas ocupa tela toda quando não precisar
    },
    wrapper: {
      flex: 1,
      backgroundColor: "#1a2a3a",
    },

    scrollView: {
      flex: 1,
      backgroundColor: "#1a2a3a", // mesma cor do header
    },
    header: {
      backgroundColor: "#1a2a3a",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: rs(38),
      paddingBottom: rs(14),
      paddingHorizontal: rs(20),
      // sem height fixo — cresce com o conteúdo mas não empurra o containerMid
    },

    logo: {
      height: rs(240),
      width: rs(320),
      resizeMode: "contain",
    },

    slogan: {
      fontSize: rs(13),
      color: "#c0ccd8",
      marginTop: rs(6),
      textAlign: "center",
    },

    containerMid: {
      flex: 1,
      backgroundColor: "#ffffff",
      borderTopLeftRadius: rs(28),
      borderTopRightRadius: rs(28),
      paddingHorizontal: rs(24),
      paddingTop: rs(28),
      paddingBottom: rs(32),
    },

    containerMidContent: {
      paddingHorizontal: rs(24),
      paddingTop: rs(10),
      paddingBottom: rs(45),
      flexGrow: 1,
    },

    bem_vindo: {
      marginBottom: rs(24),
    },

    bemVindoTitulo: {
      fontSize: rs(22),
      fontWeight: "700",
      color: "#111827",
      marginBottom: rs(4),
    },

    bemVindoSubtitulo: {
      fontSize: rs(13),
      color: "#6b7280",
    },

    form: {
      flex: 1,
    },

    label: {
      fontSize: rs(13),
      fontWeight: "600",
      color: "#374151",
      marginBottom: rs(6),
      marginTop: rs(12),
    },

    boxInput: {
      backgroundColor: "#eef4fb",
      borderRadius: rs(10),
      paddingHorizontal: rs(14),
      paddingVertical: rs(12),
      flexDirection: "row",
      alignItems: "center",
    },

    input: {
      flex: 1,
      fontSize: rs(15),
      color: "#111827",
    },

    esqueceuSenha: {
      alignSelf: "flex-end",
      marginTop: rs(10),
      marginBottom: rs(20),
      color: "#2563eb",
      fontSize: rs(13),
      fontWeight: "600",
    },

    divider: {
      alignItems: "center",
      marginVertical: rs(16),
    },

    continueCom: {
      fontSize: rs(13),
      color: "#9ca3af",
    },

    outrosLogin: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: rs(12),
    },

    botaosocial: {
      flex: 1,
    },

    cadastre: {
      textAlign: "center",
      marginTop: rs(20),
      fontSize: rs(13),
      color: "#6b7280",
    },
  });
}