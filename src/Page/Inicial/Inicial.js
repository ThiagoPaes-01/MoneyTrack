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

// Resolve o caminho da imagem para uso no <img> HTML
const fundoMenuSrc =
  Platform.OS === "web"
    ? typeof FundoMenu === "string"
      ? FundoMenu
      : FundoMenu?.uri ?? FundoMenu
    : null;

function MockupImage({ isDesktop }) {
  // Na web usa <img> com mix-blend-mode para remover o fundo branco
  if (Platform.OS === "web") {
    return (
      <img
        src={fundoMenuSrc}
        alt="MoneyTrack app mockup"
        style={{
          width: isDesktop ? 560 : "85%",
          height: "auto",
          objectFit: "contain",
          mixBlendMode: "multiply",
          display: "block",
        }}
      />
    );
  }
  // No mobile usa Image normal (fundo já é escuro, sem problema)
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
    { n: "1", title: "Crie sua conta", desc: "Cadastro em 60 segundos com e-mail ou Google." },
    { n: "2", title: "Conecte bancos", desc: "Autorize acesso seguro via Open Finance." },
    { n: "3", title: "Visualize tudo", desc: "Saldos, extratos e análises em um só painel." },
    { n: "4", title: "Conquiste metas", desc: "Defina objetivos e receba suporte da IA para alcançá-los." },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerMain}>

        {/* ── Hero ── */}
        <View style={[
          styles.containerHero,
          isDesktop && { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
        ]}>
          {/* Texto */}
          <View style={isDesktop ? { flex: 1, maxWidth: "52%" } : {}}>
            <View style={styles.headerTop}>
              <Image source={Logo} style={styles.logo} resizeMode="contain" />
              <View style={styles.badgeOpenFinance}>
                <Text style={styles.badgeOpenFinanceText}>Open Finance · Banco Central</Text>
              </View>
            </View>

            <Text style={[styles.heroTitle, isDesktop && { maxWidth: "100%" }]}>
              SEU DINHEIRO{"\n"}COM CLAREZA{"\n"}E{" "}
              <Text style={styles.heroTitleSegredos}>CONTROLE</Text>
            </Text>

            <Text style={[styles.heroSubtitle, isDesktop && { maxWidth: "100%" }]}>
              Conecte todos os seus bancos, entenda seus gastos e conquiste
              metas reais — tudo em um só lugar, com segurança bancária.
            </Text>

            <View style={[styles.containerButtons, { paddingHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>
              <Button title="Começar agora — grátis" style={{ minWidth: 240 }} onPress={() => navigation.navigate("Cadastro")} />
              <Button title="Já tenho conta" style={{ minWidth: 160 }} onPress={() => navigation.navigate("Login")} />
            </View>
          </View>

          {/* Mockup */}
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
            <Text style={styles.statNumber}>47 mil+</Text>
            <Text style={styles.statLabel}>usuários ativos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>R$ 2 bi</Text>
            <Text style={styles.statLabel}>monitorado</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4,9</Text>
            <Text style={styles.statLabel}>nota na App Store</Text>
          </View>
        </View>

        {/* ── Header Funcionalidades ── */}
        <View style={styles.containerSectionHeader}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>Funcionalidades</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Tudo o que <Text style={styles.sectionTitleHighlight}>você precisa</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Controle financeiro completo, intuitivo e seguro — do extrato às metas.
          </Text>
        </View>

        {/* ── Grid Funcionalidades ── */}
        <View style={styles.containerFuncionalidades}>
          <Funcionalidade image={bank} title={"Multi-banco"} func={"Conecte Nubank, Itaú, Bradesco e +200 instituições via Open Finance regulado pelo Banco Central."} />
          <Funcionalidade image={chartBar} title={"Relatórios Visuais"} func={"Gráficos interativos por categoria, período e conta. Entenda onde seu dinheiro vai."} />
          <Funcionalidade image={target} title={"Metas Inteligentes"} func={"Defina objetivos, acompanhe progresso e receba alertas para manter o foco."} />
          <Funcionalidade image={alert} title={"Alertas em Tempo Real"} func={"Notificações de cada transação, limite de gasto e oportunidade de economia."} />
          <Funcionalidade image={lock} title={"Segurança Bancária"} func={"Criptografia ponta a ponta, biometria e conformidade total com a LGPD."} />
          <Funcionalidade image={robot} title={"IA Financeira"} func={"Insights personalizados baseados no seu perfil. Economize mais sem esforço."} />
        </View>

        {/* ── Header Como Funciona ── */}
        <View style={styles.containerComoFuncionaHeader}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>Como funciona</Text>
          </View>
          <Text style={styles.sectionTitle}>
            4 passos para o <Text style={styles.sectionTitleHighlight}>controle total</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Em menos de 3 minutos, você terá todos os seus bancos centralizados.
          </Text>
        </View>

        {/* ── Passos ── */}
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

        {/* ── Header Planos ── */}
        <View style={styles.containerPlanosHeader}>
          <View style={styles.sectionTagCenter}>
            <Text style={styles.sectionTagText}>Planos</Text>
          </View>
          <Text style={styles.sectionTitleCenter}>Escolha seu plano</Text>
          <Text style={styles.sectionSubtitleCenter}>
            Comece grátis. Upgrade quando quiser. Cancele a qualquer momento.
          </Text>
        </View>

        {/* ── Cards Planos ── */}
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
              <Text style={styles.planoFeatureItem}>✓ 2 bancos conectados</Text>
              <Text style={styles.planoFeatureItem}>✓ Histórico de 30 dias</Text>
              <Text style={styles.planoFeatureItem}>✓ Relatórios básicos</Text>
              <Text style={styles.planoFeatureItem}>✓ 3 metas ativas</Text>
            </View>
            <Button title="Começar grátis" />
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
              <Text style={styles.planoFeatureItemDestaque}>✓ Bancos ilimitados</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓ Histórico completo</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓ Relatórios avançados</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓ Metas ilimitadas</Text>
              <Text style={styles.planoFeatureItemDestaque}>✓ IA Financeira</Text>
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
              <Text style={styles.planoFeatureItem}>✓ Tudo do Pro</Text>
              <Text style={styles.planoFeatureItem}>✓ 5 contas familiares</Text>
              <Text style={styles.planoFeatureItem}>✓ Orçamento familiar</Text>
              <Text style={styles.planoFeatureItem}>✓ Dashboard compartilhado</Text>
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