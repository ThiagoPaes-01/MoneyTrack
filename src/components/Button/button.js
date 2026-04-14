// button.js
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export function Button({ title = "Entrar", onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}