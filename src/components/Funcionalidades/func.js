import { View, Text, Image } from "react-native";
import { styles } from "./styles";

export function Funcionalidade({ image, title, func }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Image source={image} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{func}</Text>
    </View>
  );
}
