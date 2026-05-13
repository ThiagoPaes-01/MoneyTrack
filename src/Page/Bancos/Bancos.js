// screens/Bancos/Bancos.js
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/Button/button";
import iconBancoDoBrasil from "../../assets/iconBancoDoBrasil.png";
import iconBradesco from "../../assets/iconBradesco.png";
import iconC6Bank from "../../assets/iconC6Bank.png";
import iconCaixa from "../../assets/iconCaixa.png";
import iconInter from "../../assets/iconInter.png";
import iconItau from "../../assets/iconItau.jpg";
import iconNubank from "../../assets/iconNubank.jpg";
import iconPicPay from "../../assets/iconPicPay.png";
import iconSantander from "../../assets/iconSantander.png";
import { useBancosStyles } from "./styles";

// Imports condicionais por plataforma — evita erros de módulo
let WebView = null;
let PluggyConnect = null;
if (Platform.OS === "web") {
  PluggyConnect = require("react-pluggy-connect").PluggyConnect;
} else {
  WebView = require("react-native-webview").WebView;
}

const BANCOS = [
  { nome: "Nubank", icon: iconNubank },
  { nome: "Itaú", icon: iconItau },
  { nome: "Bradesco", icon: iconBradesco },
  { nome: "Banco do Brasil", icon: iconBancoDoBrasil },
  { nome: "Santander", icon: iconSantander },
  { nome: "Inter", icon: iconInter },
  { nome: "PicPay", icon: iconPicPay },
  { nome: "C6 Bank", icon: iconC6Bank },
  { nome: "Caixa", icon: iconCaixa },
];

const API_URL = "http://localhost:3000";

// Widget WEB: usa o SDK oficial react-pluggy-connect 
function PluggyWidgetWeb({ connectToken, onSuccess, onClose, onError }) {
  return (
    <PluggyConnect
      connectToken={connectToken}
      onSuccess={(itemData) => onSuccess(itemData.item.id)}
      onError={(error) => onError(error.message)}
      onClose={onClose}
    />
  );
}

// Widget MOBILE: usa WebView fullscreen 
function PluggyWidgetMobile({ connectToken, onSuccess, onClose, onError }) {
  const handleMessage = (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.event === "SUCCESS") onSuccess(msg.data.itemId);
      if (msg.event === "CLOSE") onClose();
      if (msg.event === "ERROR") onError(msg.error);
    } catch {
      
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        source={{ uri: `https://connect.pluggy.ai/?connectToken=${connectToken}` }}
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator style={StyleSheet.absoluteFill} size="large" />
        )}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
      />
    </View>
  );
}

// ── Tela principal ─────────────────────────────────────────────────
export function Bancos({ navigation }) {
  const styles = useBancosStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [connectToken, setConnectToken] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Pede o connectToken ao backend e abre o widget
  const abrirWidget = async () => {
    try {
      setCarregando(true);
      const res = await fetch(`${API_URL}/pluggy/connect-token`, {
        method: "POST",
      });
      const dados = await res.json();
      if (!res.ok) throw new Error(dados.erro || "Erro ao gerar token");
      setConnectToken(dados.connectToken);
    } catch (e) {
      Alert.alert("Erro", e.message || "Não foi possível conectar à Pluggy");
    } finally {
      setCarregando(false);
    }
  };

  // Salva contas e transações no backend após conexão bem-sucedida
  const salvarItem = async (itemId) => {
    const usuarioId = await AsyncStorage.getItem("usuarioId");
    const res = await fetch(`${API_URL}/pluggy/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, usuarioId }),
    });
    if (!res.ok) {
      const dados = await res.json();
      throw new Error(dados.erro || "Erro ao salvar dados do banco");
    }
  };

  const onSuccess = async (itemId) => {
    setConnectToken(null);
    try {
      await salvarItem(itemId);
      navigation.navigate("Home");
    } catch (e) {
      Alert.alert("Erro", e.message);
    }
  };

  const onClose = () => setConnectToken(null);

  const onError = (msg) => {
    setConnectToken(null);
    Alert.alert("Erro na conexão", msg || "Tente novamente");
  };

  // Renderiza o widget correto conforme plataforma
  if (connectToken) {
    if (Platform.OS === "web") {
      return (
        <PluggyWidgetWeb
          connectToken={connectToken}
          onSuccess={onSuccess}
          onClose={onClose}
          onError={onError}
        />
      );
    }
    return (
      <PluggyWidgetMobile
        connectToken={connectToken}
        onSuccess={onSuccess}
        onClose={onClose}
        onError={onError}
      />
    );
  }

  // ── Conteúdo principal da tela ─────────────────────────────────
  const content = (
    <>
      {/* ── Header ── */}
      <View style={styles.containerHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔒 Open Finance · Banco Central</Text>
        </View>
        <Text style={styles.textConect}>Conecte o seu banco</Text>
        <Text style={styles.textDados}>
          Seus dados chegam automaticamente, sem precisar digitar nada
        </Text>
      </View>

      {/* ── Grid de bancos ── */}
      <ScrollView
        contentContainerStyle={styles.containerMid}
        showsVerticalScrollIndicator={false}
      >
        {BANCOS.map((banco) => (
          <TouchableOpacity key={banco.nome} style={styles.buttonBanco}>
            <Image source={banco.icon} style={styles.logoBanco} />
            <Text style={styles.textBanco}>{banco.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Botão conectar ── */}
      <View style={styles.containerFooter}>
        <Button
          title={carregando ? "Conectando..." : "Conectar e entrar no app"}
          onPress={abrirWidget}
          disabled={carregando}
        />
        <Text style={styles.pularText}>
          Prefiro adicionar manualmente ·{" "}
          <Text
            style={styles.pularLink}
            onPress={() => navigation.navigate("Home")}
          >
            Pular por agora
          </Text>
        </Text>
      </View>
    </>
  );

  if (isDesktop) {
    return (
      <View style={styles.desktopBg}>
        <View style={styles.phoneFrame}>{content}</View>
      </View>
    );
  }

  return <View style={styles.containerMain}>{content}</View>;
}