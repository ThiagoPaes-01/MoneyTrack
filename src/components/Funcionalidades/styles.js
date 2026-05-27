import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;
const { width } = Dimensions.get("window");

const isMobile = width < 768;
const isDesktop = width >= 1024;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141820",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    width: isDesktop ? "48%" : "88%",
    // altura automática — quadrado pelo padding igual em todos os lados
    minHeight: isDesktop ? 120 : 100,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(58,201,126,0.12)",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  icon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    tintColor: c.success,
  },

  textWrapper: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: c.white,
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.67)",
    lineHeight: 20,
  },
});