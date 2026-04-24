// components/Button/button.js
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { color } from "../../Global/color";

export function Button({
  title = "Entrar",
  onPress,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {leftIcon && leftIcon}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.colors.brandBlue,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  text: {
    color: color.colors.textInverse,
    fontSize: 18,
    fontWeight: "600",
  },
});
