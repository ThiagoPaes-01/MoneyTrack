// screens/Login/Login.js
import { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "../../components/Button/button";
import { LinkText } from "../../components/Link/link";
import { Input } from "../../components/Input/input";
import Logo from "../../assets/Logo.png";
import { useLoginStyles } from "./styles";

export function Login({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const styles = useLoginStyles();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.slogan}>
          Controle financeiro na palma da sua mão
        </Text>
      </View>

      {/* Container branco */}
      <View style={styles.containerMid}>
        {/* Bem-vindo */}
        <View style={styles.bemVindo}>
          <Text style={styles.bemVindoTitulo}>Bem-vindo de volta</Text>
          <Text style={styles.bemVindoSubtitulo}>
            Acesse sua conta para continuar
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.boxInput}>
            <Input
              onChangeText={setUserName}
              value={username}
              placeholder="Seu melhor e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.boxInput}>
            <Input
              onChangeText={setPassword}
              value={password}
              placeholder="Sua senha"
              secureTextEntry
            />
          </View>

          <LinkText
            style={styles.esqueceuSenha}
            title="Esqueceu a senha?"
            onPress={() => console.log("Ir para recuperação de senha")}
          />

          <Button title="Entrar" onPress={() => {}} />

          <View style={styles.divider}>
            <Text style={styles.continueCom}>ou continue com</Text>
          </View>

          <View style={styles.outrosLogin}>
            <Button title="Google" style={styles.botaoSocial} />
            <Button title="Apple" style={styles.botaoSocial} />
          </View>

          <Text style={styles.cadastre}>
            Não tem conta?{" "}
            <LinkText
              title="Cadastre-se"
              onPress={() => navigation.navigate("Cadastro")}
            />
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
