import { Text, StyleSheet } from "react-native";
import { color } from "../../Global/color";

export function LinkText({ title, onPress, style }) {
  return (
    <Text style={[styles.link, style]} onPress={onPress}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: color.colors.brandBlue,
    fontWeight: "600",
  },
});
