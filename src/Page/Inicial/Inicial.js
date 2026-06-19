import {
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Button } from "../../components/Button/button";
import Logo from "../../assets/LogoMoneyTrack.png";
import { Funcionalidade } from "../../components/Funcionalidades/func";
import alert from "../../assets/Funcionalidades/alert.svg";
import bank from "../../assets/Funcionalidades/bank.svg";
import chartBar from "../../assets/Funcionalidades/chartBar.svg";
import lock from "../../assets/Funcionalidades/lock.svg";
import robot from "../../assets/Funcionalidades/robot.svg";
import target from "../../assets/Funcionalidades/target.svg";
import FundoMenu from "../../assets/fundo_menu.png";
import { styles } from "./styles";

const fundoMenuSrc =
  Platform.OS === "web"
    ? typeof FundoMenu === "string"
      ? FundoMenu
      : FundoMenu?.uri ?? FundoMenu
    : null;

function MockupImage({ isDesktop }) {
  if (Platform.OS === "web") {
    return (
      <img
        src={fundoMenuSrc}
        alt="MoneyTrack app mockup"
        style={{
          width: isDesktop ? 860 : "85%",
          height: "auto",
          objectFit: "contain",
          mixBlendMode: "multiply",
          display: "block",
        }}
      />
    );
  }
  return (
    <Image
      source={FundoMenu}
      style={
        isDesktop
          ? { width: 560, height: 840 }
          : { width: "85%", aspectRatio: 0.67 }
      }
      resizeMode="contain"
    />
  );
}

export function Inicial({ navigation }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const passos = [
    { n: "1", title: "Crie sua conta", desc: "Cadastro em menos de um minuto. Sem cartão de crédito." },
    { n: "2", title: "Conecte seus bancos", desc: "Autorize via Open Finance regulado pelo Banco Central." },
    { n: "3", title: "Veja tudo junto", desc: "Saldos, extratos e análises de todas as contas em um painel." },
    { n: "4", title: "Alcance suas metas", desc: "Defina objetivos e acompanhe o progresso com a IA." },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerMain}>

        {/* ── Hero ── */}
        <View style={[
          styles.containerHero,
          isDesktop && { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
        ]}>
          <View style={isDesktop ? { flex: 1, maxWidth: "52%" } : {}}>
            <View style={styles.headerTop}>
              <Image source={Logo} style={styles.logo} resizeMode="contain" />
              <View style={styles.badgeOpenFinance}>
                <Text style={styles.badgeOpenFinanceText}>Open Finance · Banco Central</Text>
              </View>
            </View>

            <Text style={[styles.heroTitle, isDesktop && { maxWidth: "100%" }]}>
              ENTENDA{"\n"}PARA ONDE{"\n"}VAI SEU{" "}
              <Text style={styles.heroTitleSegredos}>DINHEIRO</Text>
            </Text>

            <Text style={[styles.heroSubtitle, isDesktop && { maxWidth: "100%" }]}>
              Conecte todos os seus bancos e veja saldos, gastos e metas
              em um só lugar — com a segurança do Open Finance.
            </Text>

            <View style={[styles.containerButtons, { paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>
              <Button title="Começar grátis" style={{ minWidth: 200 }} onPress={() => navigation.navigate("Cadastro")} />
              <Button title="Já tenho conta" style={{ minWidth: 160 }} onPress={() => navigation.navigate("Login")} />
            </View>
          </View>

          <View style={isDesktop
            ? { flex: 1, alignItems: "center", justifyContent: "center" }
            : { alignItems: "center", marginTop: 40 }
          }>
            <MockupImage isDesktop={isDesktop} />
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.containerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>47 mil</Text>
            <Text style={styles.statLabel}>usuários ativos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>R$ 2 bi</Text>
            <Text style={styles.statLabel}>monitorado todo mês</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4,9</Text>
            <Text style={styles.statLabel}>nota na App Store</Text>
          </View>
        </View>

        {/* ── Funcionalidades ── */}
        <View style={styles.containerSectionHeader}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>Funcionalidades</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Tudo que você precisa,{"\n"}
            <Text style={styles.sectionTitleHighlight}>sem o que não precisa</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Controle financeiro completo, sem planilhas, sem complicação.
          </Text>
        </View>

        <View style={styles.containerFuncionalidades}>
          <Funcionalidade image={bank} title="Multi-banco" func="Conecte Nubank, Itaú, Bradesco e +200 instituições via Open Finance." />
          <Funcionalidade image={chartBar} title="Relatórios visuais" func="Gráficos por categoria, período e conta. Entenda onde o dinheiro vai." />
          <Funcionalidade image={target} title="Metas" func="Defina objetivos, acompanhe o progresso e receba alertas." />
          <Funcionalidade image={alert} title="Alertas" func="Notificações de cada transação e de limites de gasto." />
          <Funcionalidade image={lock} title="Segurança" func="Criptografia ponta a ponta e conformidade total com a LGPD." />
          <Funcionalidade image={robot} title="IA financeira" func="Insights baseados no seu perfil. Economize sem esforço." />
        </View>

        {/* ── Como funciona ── */}
        <View style={styles.containerComoFuncionaHeader}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>Como funciona</Text>
          </View>
          <Text style={styles.sectionTitle}>
            4 passos para{" "}
            <Text style={styles.sectionTitleHighlight}>controle total</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Em menos de 3 minutos, todos os seus bancos centralizados.
          </Text>
        </View>

        <View style={styles.containerPassos}>
          {passos.map((p) => (
            <View key={p.n} style={styles.cardPasso}>
              <View style={styles.passoBadge}>
                <Text style={styles.passoText}>{p.n}</Text>
              </View>
              <View style={styles.passoContent}>
                <Text style={styles.passoTitle}>{p.title}</Text>
                <Text style={styles.passoDesc}>{p.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Planos ── */}
        <View style={styles.containerPlanosHeader}>
          <View style={styles.sectionTagCenter}>
            <Text style={styles.sectionTagText}>Planos</Text>
          </View>
          <Text style={styles.sectionTitleCenter}>Escolha seu plano</Text>
          <Text style={styles.sectionSubtitleCenter}>
            Comece grátis. Faça upgrade quando quiser. Cancele a qualquer momento.
          </Text>
        </View>

        <View style={styles.containerPlanos}>
          <View style={styles.cardPlano}>
            <Text style={styles.planoNome}>Gratuito</Text>
            <View style={styles.planoPrecoRow}>
              <Text style={styles.planoPrecoSimbolo}>R$</Text>
              <Text style={styles.planoPrecoValor}>0</Text>
            </View>
            <Text style={styles.planoPeriodo}>para sempre</Text>
            <View style={styles.planoDivisor} />
            <View style={styles.planoFeatures}>
              <Text style={styles.planoFeatureItem}>✓  2 bancos conectados</Text>
              <Text style={styles.planoFeatureItem}>✓  Histórico de 30 dias</Text>
              <Text style={styles.planoFeatureItem}>✓  Relatórios básicos</Text>
              <Text style={styles.planoFeatureItem}>✓  3 metas ativas</Text>
            </View>
            <Button title="Começar grátis" onPress={() => navigation.navigate("Cadastro")} />
          </View>

          <View style={styles.cardPlanoDestaque}>
            <View style={styles.planoMaisPopular}>
              <Text style={styles.planoMaisPopularText}>Mais popular</Text>
            </View>
            <Text style={styles.planoNome}>Pro</Text>
            <View style={styles.planoPrecoRow}>
              <Text style={styles.planoPrecoSimbolo}>R$</Text>
              <Text style={styles.planoPrecoValor}>19</Text>
              <Text style={styles.planoPrecoMes}>/mês</Text>
            </View>
            <Text style={styles.planoPeriodo}>cobrado mensalmente</Text>
            <View style={styles.planoDivisor} />
            <View style={styles.planoFeatures}>
              <Text style={styles.planoFeatureItemDestaque}>✓  Bancos ilimitados</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓  Histórico completo</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓  Relatórios avançados</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓  Metas ilimitadas</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓  IA financeira</Text>
            </View>
            <Button title="Assinar Pro" />
          </View>

          <View style={styles.cardPlano}>
            <Text style={styles.planoNome}>Família</Text>
            <View style={styles.planoPrecoRow}>
              <Text style={styles.planoPrecoSimbolo}>R$</Text>
              <Text style={styles.planoPrecoValor}>34</Text>
              <Text style={styles.planoPrecoMes}>/mês</Text>
            </View>
            <Text style={styles.planoPeriodo}>até 5 membros</Text>
            <View style={styles.planoDivisor} />
            <View style={styles.planoFeatures}>
              <Text style={styles.planoFeatureItem}>✓  Tudo do Pro</Text>
              <Text style={styles.planoFeatureItem}>✓  5 contas familiares</Text>
              <Text style={styles.planoFeatureItem}>✓  Orçamento familiar</Text>
              <Text style={styles.planoFeatureItem}>✓  Dashboard compartilhado</Text>
            </View>
            <Button title="Assinar Família" />
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={styles.containerFooter}>
          <Text style={styles.footerLogo}>
            Money<Text style={styles.footerLogoTrack}>Track</Text>
          </Text>
          <Text style={styles.footerCopyright}>
            © 2025 MoneyTrack. Todos os direitos reservados.
          </Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Privacidade</Text>
            <Text style={styles.footerLink}>Termos</Text>
            <Text style={styles.footerLink}>Suporte</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}