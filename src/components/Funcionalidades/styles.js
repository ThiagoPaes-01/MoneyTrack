import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;
const { width } = Dimensions.get("window");

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

// Helper para determinar dispositivo
const isMobile = width < BREAKPOINTS.tablet;
const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
const isDesktop = width >= BREAKPOINTS.desktop;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141820",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    padding: 15,
    height: "20%",
    width: isDesktop ? "48%" : "88%", 
    flexWrap: isDesktop ? "wrap" : "nowrap",
  },

  iconWrapper: {
    width: 66,
    height: 66,
    borderRadius: 16,
    backgroundColor: "rgba(58,201,126,0.12)",
    marginRight: 15,
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
    width: "75%",
  },
});
