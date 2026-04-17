import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import iconBancoDoBrasil from "../../assets/iconBancoDoBrasil.png";
import iconBradesco from "../../assets/iconBradesco.png";
import iconC6Bank from "../../assets/iconC6Bank.png";
import iconCaixa from "../../assets/iconCaixa.png";
import iconInter from "../../assets/iconInter.png";
import iconItau from "../../assets/iconItau.jpg";
import iconNubank from "../../assets/iconNubank.jpg";
import iconPicPay from "../../assets/iconPicPay.png";
import iconSantander from "../../assets/iconSantander.png";
import { styles } from "./styles";

export function Bancos() {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerHeader}>
        <Text style={styles.textConect}>Conecte o seu banco</Text>
        <Text style={styles.textDados}>
          Seus dados chegam automaticamente, sem precisar digitar nada
        </Text>
      </View>

      <View style={styles.containerMid}>
        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconNubank} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Nubank</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconItau} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Itaú</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconBradesco} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Bradesco</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconBancoDoBrasil} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Banco do Brasil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconSantander} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Santander</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconInter} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Inter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconPicPay} style={styles.logoBanco} />
          <Text style={styles.textBanco}>PicPay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconC6Bank} style={styles.logoBanco} />
          <Text style={styles.textBanco}>C6 Bank</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBanco}>
          <Image source={iconCaixa} style={styles.logoBanco} />
          <Text style={styles.textBanco}>Caixa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonConectar}>
        <Text>Conectar e entrar no app</Text>
      </TouchableOpacity>
    </View>
  );
}
