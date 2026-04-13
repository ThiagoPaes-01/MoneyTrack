import { StyleSheet } from "react-native";
import { color } from "../../Global/color";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: color.colors.brandDark,
    alignItems: "center", // centraliza horizontalmente
    justifyContent: "center", // centraliza verticalmente no header
    paddingTop: 48,
    paddingBottom: 16, // reduzi um pouco
    paddingHorizontal: 20,
  },

  logo: {
    height: 300,
    width: 500,
    marginTop: -50,
  },

  slogan: {
    fontSize: 18,
    color: color.colors.gray200,
    marginTop: -100,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  containerMid: {
    flex: 1,
    backgroundColor: color.colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 24,
    marginBottom: -10,
  },
});
