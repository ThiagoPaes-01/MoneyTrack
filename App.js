import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicial } from "./src/Page/Inicial/Inicial";
import { Login } from "./src/Page/Login/Login";
import { Cadastro } from './src/Page/Cadastro/Cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
