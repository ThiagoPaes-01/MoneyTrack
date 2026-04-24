// screens/Bancos/Bancos.js
import { View, Text, Image, ScrollView } from "react-native";
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

  return (
    <View style={styles.containerMain}>
      {/* Header */}
      <View style={styles.containerHeader}>
        <Text style={styles.textConect}>Conecte o seu banco</Text>
        <Text style={styles.textDados}>
          Seus dados chegam automaticamente, sem precisar digitar nada
        </Text>
      </View>

      {/* Lista de bancos */}
      <ScrollView
        contentContainerStyle={styles.containerMid}
        showsVerticalScrollIndicator={false}
      >
        {BANCOS.map((banco) => (
          <Button
            key={banco.nome}
            title={banco.nome}
            style={styles.buttonBanco}
            textStyle={styles.textBanco}
            leftIcon={<Image source={banco.icon} style={styles.logoBanco} />}
            onPress={() => {}}
          />
        ))}
      </ScrollView>

      {/* Botão conectar */}
      <Button
        title="Conectar e entrar no app"
        style={styles.buttonConectar}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
