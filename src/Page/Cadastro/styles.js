import { StyleSheet } from "react-native";
import { color } from "../../Global/color";

export const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: color.colors.brandDark,
  },

  boxLogo: {
    backgroundColor: color.colors.brandDark,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
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

  containerForm: {
    flex: 1,
    backgroundColor: color.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 5,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
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
    color: color.colors.white,
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