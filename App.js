import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Login } from "./src/Page/Login/Login";

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <Login />
    </View>
  );
}
