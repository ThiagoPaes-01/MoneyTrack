import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicial } from "./src/Page/Inicial/Inicial";
import { Login } from "./src/Page/Login/Login";
import { Cadastro } from "./src/Page/Cadastro/Cadastro";
import { Bancos } from "./src/Page/Bancos/Bancos"
import { Menu } from "./src/Page/Menu/Menu"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Bancos" component={Bancos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
