// screens/Bancos/Bancos.js
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
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

export function Bancos({ navigation }) {
  const styles = useBancosStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

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
          title="Conectar e entrar no app"
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.pularText}>
          Prefiro adicionar manualmente ·{" "}
          <Text style={styles.pularLink}>Pular por agora</Text>
        </Text>
      </View>
    </>
  );

  // Desktop: envolve em frame de celular centralizado
  if (isDesktop) {
    return (
      <View style={styles.desktopBg}>
        <View style={styles.phoneFrame}>
          {content}
          <View style={styles.homeIndicator} />
        </View>
      </View>
    );
  }

  // Mobile: tela normal
  return <View style={styles.containerMain}>{content}</View>;
}
