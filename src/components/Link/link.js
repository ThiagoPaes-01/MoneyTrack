import { Text } from "react-native";

export function LinkText({ title, onPress }) {
  return (
    <Text style={{ color: "#2B6CB0", fontWeight: "600" }} onPress={onPress}>
      {title}
    </Text>
  );
}
