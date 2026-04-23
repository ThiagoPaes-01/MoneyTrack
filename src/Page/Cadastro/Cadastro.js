import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { LinkText } from "../../components/Link/link";
import Logo from "../../assets/Logo.png";
import { Button } from "../../components/Button/button";
import { useCadastroStyles } from "./styles";

export function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = useCadastroStyles();

  return (
    <View style={styles.containerMain}>
      <View style={styles.boxLogo}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.frase}>Crie sua conta gratuitamente</Text>
      </View>


      <View style={styles.containerForm}>

        <Text style={styles.registre}>Registre-se para continuar</Text>
        <View style={styles.form}>
          {/* Nome */}
          <Text style={styles.label}>Nome completo</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#AAAAAA"
              autoCapitalize="words"
            />
          </View>

          {/* E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor="#AAAAAA"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Crie uma senha"
              placeholderTextColor="#AAAAAA"
              secureTextEntry
            />
          </View>
          <Text style={styles.label}>Confirmar senha</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Confirme a senha"
              placeholderTextColor="#AAAAAA"
              secureTextEntry
            />
            
          </View>

          {/* Botão criar conta */}
          <TouchableOpacity
            style={styles.btnCriar}
            onPress={() => navigation.navigate("Banco")}
          >
            <Text style={styles.btnCriarText}>Criar conta e conectar banco</Text>
          </TouchableOpacity>

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