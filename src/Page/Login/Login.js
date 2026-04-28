import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "../../components/Button/button";
import { LinkText } from "../../components/Link/link";
import { Input } from "../../components/Input/input";
import { useLoginStyles } from "./styles";
import Logo from "../../assets/LogoMoneyTrack.png";

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
      <View style={styles.phoneFrame}>
        <View style={styles.notch} />

        {/* ── Header — logo + slogan ── */}
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.slogan}>Controle financeiro inteligente</Text>
        </View>

        {/* ── Formulário ── */}
        <View style={styles.containerMid}>
          <View style={styles.bemVindo}>
            <Text style={styles.bemVindoTitulo}>Bem-vindo!</Text>
            <Text style={styles.bemVindoSubtitulo}>Acesse sua conta</Text>
          </View>

          <View style={styles.form}>
            {/* Botões sociais */}
            <View style={styles.outrosLogin}>
              <TouchableOpacity style={styles.botaoSocial}>
                <Text
                  style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}
                >
                  Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoSocial}>
                <Text
                  style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}
                >
                  Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divisor */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.continueCom}>ou com e-mail</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* E-mail */}
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.boxInput}>
              <Input
                onChangeText={setUserName}
                value={username}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Senha */}
            <Text style={styles.label}>Senha</Text>
            <View style={styles.boxInput}>
              <Input
                onChangeText={setPassword}
                value={password}
                placeholder="*******"
                secureTextEntry
              />
            </View>

            {/* Esqueceu senha */}
            <LinkText
              style={styles.esqueceuSenha}
              title="Esqueceu a senha?"
              onPress={() => console.log("Recuperar senha")}
            />

            {/* Botão principal */}
            <Button title="Entrar na conta" onPress={() => {}} />

            {/* Cadastro */}
            <Text style={styles.cadastre}>
              Sem conta?{" "}
              <Text
                style={styles.cadastreLink}
                onPress={() => navigation.navigate("Cadastro")}
              >
                Cadastre-se
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
