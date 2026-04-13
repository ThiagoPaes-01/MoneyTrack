import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Login } from "./src/Page/Login/Login";

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="auto" />
      <Login />
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