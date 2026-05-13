import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/Button/button";
import { LinkText } from "../../components/Link/link";
import { Input } from "../../components/Input/input";
import Logo from "../../assets/LogoMoneyTrack.png";
import { useCadastroStyles } from "./styles";

export function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const styles = useCadastroStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const handleCadastro = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      const resposta = await fetch("http://localhost:3000/auth/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }
      // Salva o token e o id do usuário para uso posterior (ex: Pluggy)
      await AsyncStorage.setItem("token", dados.token);
      await AsyncStorage.setItem("usuarioId", dados.usuario.id);
      navigation.navigate("Bancos");
    } catch (e) {
      alert("Não foi possível conectar ao servidor");
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.phoneFrame}>
        {/* ── Header — logo + frase ── */}
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.frase}>Crie sua conta gratuitamente</Text>
        </View>

        {/* ── Formulário ── */}
        <View style={styles.containerForm}>
          <View style={styles.bemVindo}>
            <Text style={styles.registre}>Registre-se</Text>
            <Text style={styles.registreSubtitulo}>
              Crie uma conta para continuar
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nome completo</Text>
            <View style={styles.boxInput}>
              <Input
                style={styles.Inputs}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome completo"
                autoCapitalize="words"
              />
            </View>

            <Text style={styles.label}>E-mail</Text>
            <View style={styles.boxInput}>
              <Input
                style={styles.Inputs}
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Senha</Text>
            <View style={styles.boxInput}>
              <Input
                style={styles.Inputs}
                value={password}
                onChangeText={setPassword}
                placeholder="Crie uma senha"
                secureTextEntry
              />
            </View>

            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.boxInput}>
              <Input
                style={styles.Inputs}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirme a senha"
                secureTextEntry
              />
            </View>

            <Button
              title="Criar conta e conectar banco"
              onPress={handleCadastro}
              style={styles.button}
            />

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
    </ScrollView>
  );
}
