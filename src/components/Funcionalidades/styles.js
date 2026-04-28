import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;
const { width } = Dimensions.get("window");


export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141820",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: 22,
    gap: 14,
    flexBasis: "48%",
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(58,201,126,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    tintColor: c.success,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: c.white,
  },

  description: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.67)",
    lineHeight: 20,
  },
});
