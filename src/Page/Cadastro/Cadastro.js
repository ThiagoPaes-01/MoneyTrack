// screens/Cadastro/Cadastro.js
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "../../components/Button/button";
import { LinkText } from "../../components/Link/link";
import { Input } from "../../components/Input/input";
import Logo from "../../assets/Logo.png";
import { useCadastroStyles } from "./styles";

export function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const styles = useCadastroStyles();

  return (
    <View style={styles.containerMain}>
      {/* Header com logo */}
      <View style={styles.boxLogo}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.frase}>Crie sua conta gratuitamente</Text>
      </View>

      {/* Formulário */}
      <View style={styles.containerForm}>
        <Text style={styles.registre}>Registre-se para continuar</Text>

        <View style={styles.form}>
          {/* Nome */}
          <Text style={styles.label}>Nome completo</Text>
          <View style={styles.boxInput}>
            <Input
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome completo"
              autoCapitalize="words"
            />
          </View>

          {/* E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.boxInput}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.boxInput}>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Crie uma senha"
              secureTextEntry
            />
          </View>

          {/* Confirmar senha */}
          <Text style={styles.label}>Confirmar senha</Text>
          <View style={styles.boxInput}>
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme a senha"
              secureTextEntry
            />
          </View>

          {/* Botão criar conta */}
          <Button
            title="Criar conta e conectar banco"
            style={styles.btnCriar}
            textStyle={styles.btnCriarText}
            onPress={() => navigation.navigate("Banco")}
          />

          {/* Link login */}
          <Text style={styles.jaTemConta}>
            Já tem conta?{" "}
            <LinkText
              title="Entrar"
              onPress={() => navigation.navigate("Login")}
            />
          </Text>
        </View>
      </View>
    </View>
  );
}
