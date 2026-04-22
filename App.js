import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Login } from "./src/Page/Login/Login";
import { Cadastro } from "./src/Page/Cadastro/Cadastro";

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="auto" />
      <Cadastro />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});