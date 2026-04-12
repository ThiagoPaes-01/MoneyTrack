import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export function Button({ title = "Entrar", onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
