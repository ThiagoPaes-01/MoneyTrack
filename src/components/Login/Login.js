import { styles } from "./styles";
import { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { Linking } from "react-native";
import { Button } from "../Button/button";
import { LinkText } from "../Link/link";
import Logo from "../../assets/Logo.png";

export function Login({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      {/*Header*/}
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.slogan}>
          Controle fianceiro na palma da sua mão
        </Text>
      </View>
      {/*Seção Bem-Vindo*/}
      <View style={styles.bem_vindo}>
        <Text>Bem-vindo de volta</Text>
        <Text>Acesse sua conta para continuar</Text>
      </View>
      {/*Form*/}
      <View style={styles.form}>
        <Text>E-mail</Text>
        <View>
          <TextInput
            onChangeText={setUserName}
            value={username}
            placeholder="Seu melhor e-mail"
          />
        </View>

        <Text>Senha</Text>
        <View>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Sua melhor senha"
          />
        </View>

        <LinkText
          style={styles.esqueceuSenha}
          title="Esqueceu a senha?"
          onPress={() => console.log("Ir para recuperação de senha")}
        />
        <Button />

        <Text style={styles.continueCom}>Continue com</Text>

        {/*Outros Logins*/}
        <View style={styles.outrosLogin}>
          <Button title="Google"></Button>
          <Button title="Apple"></Button>
        </View>

        {/*Ir para página de Cadastro*/}
        <Text style={styles.cadastre}>
          Não tem conta?
          <LinkText
            title=" Cadastre-se"
            onPress={() => navigation.navigate("Cadastro")}
          />
        </Text>
      </View>
    </View>
  );
}
