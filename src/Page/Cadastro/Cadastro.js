// screens/Cadastro/Cadastro.js
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
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

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.phoneFrame}>
        {/* Notch e Status bar — só no desktop */}


        {/* ── Header — logo + frase ── */}
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.frase}>Crie sua conta gratuitamente</Text>
        </View>

        {/* ── Formulário ── */}
        <View style={styles.containerForm}>
          <View style={styles.bemVindo}>
            <Text style={styles.registre}>Registre-se</Text>
            <Text style={styles.registreSubtitulo}>Crie uma conta para continuar</Text>
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
              onPress={() => navigation.navigate("Banco")}
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
