import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

// Escala baseada em tela de referência (375px = iPhone padrão)
const scale = width / 375;
const rs = (size) => Math.round(size * scale); // responsive size

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2a3a",
  },

  // ── Header ──────────────────────────────────────────
  header: {
    backgroundColor: "#1a2a3a",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: rs(48),
    paddingBottom: rs(24),
    paddingHorizontal: rs(20),
  },

  logo: {
    height: rs(60),
    width: rs(200),
    resizeMode: "contain",
  },

  slogan: {
    fontSize: rs(13),
    color: "#c0ccd8",
    marginTop: rs(6),
    textAlign: "center",
  },

  // ── Container branco ────────────────────────────────
  containerMid: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: rs(28),
    borderTopRightRadius: rs(28),
    paddingHorizontal: rs(24),
    paddingTop: rs(28),
    paddingBottom: rs(32),
  },

  // ── Bem-vindo ────────────────────────────────────────
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

  // ── Formulário ───────────────────────────────────────
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

  // ── Divisor ──────────────────────────────────────────
  divider: {
    alignItems: "center",
    marginVertical: rs(16),
  },

  continueCom: {
    fontSize: rs(13),
    color: "#9ca3af",
  },

  // ── Login social ─────────────────────────────────────
  outrosLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: rs(12),
  },

  // ── Cadastre-se ──────────────────────────────────────
  cadastre: {
    textAlign: "center",
    marginTop: rs(20),
    fontSize: rs(13),
    color: "#6b7280",
  },
});