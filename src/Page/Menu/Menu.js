import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import { useMenuStyles } from "./styles";
import { useFinancas } from "../../hooks/useFinancas";
import { usePatrimonio } from "../../hooks/usePatrimonio";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NAV_ITEMS = [
  { label: "Dashboard",  route: "Dashboard"  },
  { label: "Extrato",    route: "Extrato"    },
  { label: "Relatórios", route: "Relatorios" },
  { label: "Patrimônio", route: "Patrimonio" },
  { label: "Perfil",     route: "Perfil"     },
];

const MOBILE_ITEMS = [
  { label: "Início",     route: "Dashboard"  },
  { label: "Extrato",    route: "Extrato"    },
  { label: "Relatórios", route: "Relatorios" },
  { label: "Patrimônio", route: "Patrimonio" },
  { label: "Perfil",     route: "Perfil"     },
];

function formatarValor(valor) {
  if (valor === null || valor === undefined) return "—";
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(data) {
  if (!data) return "";
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function primeiroNome(nome) {
  if (!nome) return "";
  return nome.split(" ")[0];
}

// ── Gráfico de Colunas
function GraficoColunas({ dados }) {
  if (!dados || dados.length === 0)
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          Sem dados suficientes
        </Text>
      </View>
    );

  const max = Math.max(
    ...dados.flatMap((d) => [d.receitas || 0, d.despesas || 0]),
    1,
  );
  const altMax = 140;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          height: altMax + 40,
          gap: 4,
        }}
      >
        {dados.map((d, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 2,
                marginBottom: 6,
              }}
            >
              <View style={{ width: 10 }}>
                <View
                  style={{
                    height: Math.max((d.receitas / max) * altMax, 3),
                    backgroundColor: "#3ac97e",
                    borderRadius: 3,
                  }}
                />
              </View>
              <View style={{ width: 10 }}>
                <View
                  style={{
                    height: Math.max((d.despesas / max) * altMax, 3),
                    backgroundColor: "#e85555",
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {d.mes}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: "#3ac97e",
            }}
          />
          <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
            Receitas
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: "#e85555",
            }}
          />
          <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
            Despesas
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── Gastos por Categoria
function GraficoCategoria({ gastos }) {
  if (!gastos || gastos.length === 0)
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          Nenhuma despesa categorizada este mês
        </Text>
      </View>
    );

  return (
    <View style={{ gap: 12 }}>
      {gastos.map((g, i) => (
        <View key={i} style={{ gap: 6 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}
              numberOfLines={1}
            >
              {g.nome}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                {formatarValor(g.valor)}
              </Text>
              <Text
                style={{
                  color: g.cor,
                  fontSize: 13,
                  fontWeight: "700",
                  minWidth: 36,
                  textAlign: "right",
                }}
              >
                {g.percentual}%
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 6,
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: 3,
            }}
          >
            <View
              style={{
                height: 6,
                width: `${g.percentual}%`,
                backgroundColor: g.cor,
                borderRadius: 3,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Modal Salário
function SalarioModal({ visivel, onFechar, onSalvar, styles }) {
  const [valor, setValor] = useState("");

  function handleSalvar() {
    const num = parseFloat(valor.replace(",", "."));
    if (!isNaN(num) && num > 0) {
      onSalvar(num);
      onFechar();
      setValor("");
    }
  }

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onFechar}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Definir salário</Text>
              <TouchableOpacity onPress={onFechar}>
                <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Informe seu salário mensal</Text>
            <View style={styles.modalInputRow}>
              <Text style={styles.modalInputPrefix}>R$</Text>
              <TextInput
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
                placeholder="0,00"
                placeholderTextColor="rgba(255,255,255,0.2)"
                style={styles.modalInput}
              />
            </View>
            <TouchableOpacity onPress={handleSalvar} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ── Dashboard
function DashboardContent({
  styles,
  saldoTotal,
  salario,
  salvarSalario,
  transacoes,
  carregando,
  nomeUsuario,
  dadosGrafico,
  gastosPorCategoria,
  totalReceitas,
  totalDespesas,
}) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.dashboardGreeting}>
        <Text style={styles.dashboardGreetingSubtitle}>
          Bem-vindo de volta,
        </Text>
        <Text style={styles.dashboardGreetingTitle}>
          {primeiroNome(nomeUsuario) || "usuário"} 👋
        </Text>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.cardSaldo}>
          <Text style={styles.cardSaldoLabel}>SALDO TOTAL</Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#0d1321" />
          ) : (
            <Text style={styles.cardSaldoValor}>
              {formatarValor(saldoTotal)}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setModalVisivel(true)}
          style={styles.cardSalario}
        >
          <View style={styles.cardSalarioHeader}>
            <Text style={styles.cardSalarioLabel}>SALÁRIO</Text>
            <Text style={{ color: "rgba(58,201,126,0.6)", fontSize: 12 }}>
              ✎
            </Text>
          </View>
          <Text style={styles.cardSalarioValor}>
            {salario ? formatarValor(salario) : "Definir"}
          </Text>
          <Text style={styles.cardSalarioHint}>Toque para editar</Text>
        </TouchableOpacity>
        <View style={styles.cardDespesas}>
          <Text style={styles.cardDespesasLabel}>DESPESAS (MÊS)</Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#e85555" />
          ) : (
            <Text style={styles.cardDespesasValor}>
              {formatarValor(totalDespesas)}
            </Text>
          )}
        </View>
      </View>

      <View
        style={[
          { marginBottom: 24 },
          isDesktop && { flexDirection: "row", gap: 16 },
        ]}
      >
        <View
          style={[
            styles.transacoesCard,
            { padding: 18 },
            isDesktop && { flex: 2 },
            !isDesktop && { marginBottom: 16 },
          ]}
        >
          <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>
            Receitas vs Despesas
          </Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#3ac97e" />
          ) : (
            <GraficoColunas dados={dadosGrafico} />
          )}
        </View>
        <View
          style={[
            styles.transacoesCard,
            { padding: 18 },
            isDesktop && { flex: 1, minWidth: 240 },
          ]}
        >
          <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>
            Gastos por categoria
          </Text>
          {carregando ? (
            <ActivityIndicator size="small" color="#3ac97e" />
          ) : (
            <GraficoCategoria gastos={gastosPorCategoria} />
          )}
        </View>
      </View>

      <View style={styles.transacoesCard}>
        <View style={styles.transacoesCardHeader}>
          <Text style={styles.transacoesCardTitle}>Últimas transações</Text>
        </View>
        {carregando ? (
          <View style={styles.transacoesCardVazio}>
            <ActivityIndicator size="small" color="#3ac97e" />
          </View>
        ) : transacoes.length === 0 ? (
          <View style={styles.transacoesCardVazio}>
            <Text style={styles.transacoesCardVazioText}>
              Nenhuma transação encontrada
            </Text>
          </View>
        ) : (
          transacoes.map((t, index) => (
            <View
              key={t.id}
              style={[
                styles.transacoesCardItem,
                index < transacoes.length - 1 &&
                  styles.transacoesCardItemBorder,
              ]}
            >
              <View
                style={
                  t.tipo === "DEBIT"
                    ? styles.transacoesCardIconeDebito
                    : styles.transacoesCardIconeCredito
                }
              >
                <Text
                  style={{
                    color: t.tipo === "DEBIT" ? "#e85555" : "#3ac97e",
                    fontSize: 14,
                  }}
                >
                  {t.tipo === "DEBIT" ? "↓" : "↑"}
                </Text>
              </View>
              <View style={styles.transacoesCardInfo}>
                <Text style={styles.transacoesCardDescricao} numberOfLines={1}>
                  {t.descricao || t.categoria || "—"}
                </Text>
                <Text style={styles.transacoesCardMeta}>
                  {t.categoria || ""}
                  {t.categoria && t.data ? "  ·  " : ""}
                  {formatarData(t.data)}
                </Text>
              </View>
              <Text
                style={
                  t.tipo === "DEBIT"
                    ? styles.transacoesCardValorDebito
                    : styles.transacoesCardValorCredito
                }
              >
                {t.tipo === "DEBIT" ? "-" : "+"}
                {formatarValor(Math.abs(t.valor))}
              </Text>
            </View>
          ))
        )}
      </View>

      <SalarioModal
        visivel={modalVisivel}
        onFechar={() => setModalVisivel(false)}
        onSalvar={salvarSalario}
        styles={styles}
      />
    </ScrollView>
  );
}

// ── Extrato
function ExtratoContent({
  styles,
  transacoes,
  carregando,
  totalReceitas,
  totalDespesas,
  saldoTotal,
  salario,
}) {
  const [filtro, setFiltro] = useState("Todos");
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const categorias = [
    "Todos",
    "Receitas",
    "Despesas",
    ...new Set(transacoes.map((t) => t.categoria).filter(Boolean)),
  ];

  const transacoesFiltradas = transacoes.filter((t) => {
    if (filtro === "Todos") return true;
    if (filtro === "Receitas") return t.tipo === "CREDIT";
    if (filtro === "Despesas") return t.tipo === "DEBIT";
    return t.categoria === filtro;
  });

  // saldo REAL da conta
  const saldoPeriodo = saldoTotal;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.extratoTitulo}>Extrato</Text>

      <View style={[styles.cardsRow, { marginBottom: 24 }]}>
        <View style={styles.extratoCardSaldo}>
          <Text style={styles.extratoCardLabel}>SALDO ATUAL</Text>

          {carregando ? (
            <ActivityIndicator size="small" color="#f59e0b" />
          ) : (
            <>
              <Text style={styles.extratoCardValorAmarelo}>
                {formatarValor(saldoPeriodo)}
              </Text>

              <Text style={styles.extratoCardSub}>
                {saldoPeriodo >= 0 ? "✓ positivo" : "⚠ negativo"}
              </Text>
            </>
          )}
        </View>

        <View style={styles.extratoCardReceitas}>
          <Text style={styles.extratoCardLabel}>RECEITAS (MÊS)</Text>

          {carregando ? (
            <ActivityIndicator size="small" color="#3ac97e" />
          ) : (
            <>
              <Text style={styles.extratoCardValorVerde}>
                {formatarValor(salario || 0)}
              </Text>

              <Text style={styles.extratoCardSub}>
                Salário mensal
              </Text>
            </>
          )}
        </View>

        <View style={styles.extratoCardDespesas}>
          <Text style={styles.extratoCardLabel}>DESPESAS (MÊS)</Text>

          {carregando ? (
            <ActivityIndicator size="small" color="#e85555" />
          ) : (
            <>
              <Text style={styles.extratoCardValorVermelho}>
                {formatarValor(totalDespesas)}
              </Text>

              <Text style={styles.extratoCardSub}>
                {transacoes.filter((t) => t.tipo === "DEBIT").length} transações
              </Text>
            </>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            paddingVertical: 4,
          }}
        >
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFiltro(cat)}
              style={[
                styles.filtroBtn,
                filtro === cat && styles.filtroBtnAtivo,
              ]}
            >
              <Text
                style={[
                  styles.filtroBtnText,
                  filtro === cat && styles.filtroBtnTextAtivo,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.transacoesCard}>
        {isDesktop && (
          <View style={[styles.extratoTableHeader]}>
            <Text style={[styles.extratoTableHeaderText, { flex: 2 }]}>
              DESCRIÇÃO
            </Text>

            <Text style={[styles.extratoTableHeaderText, { flex: 1 }]}>
              CATEGORIA
            </Text>

            <Text style={[styles.extratoTableHeaderText, { flex: 1 }]}>
              DATA
            </Text>

            <Text
              style={[
                styles.extratoTableHeaderText,
                {
                  flex: 1,
                  textAlign: "right",
                },
              ]}
            >
              VALOR
            </Text>
          </View>
        )}

        {carregando ? (
          <View style={styles.transacoesCardVazio}>
            <ActivityIndicator size="small" color="#3ac97e" />
          </View>
        ) : transacoesFiltradas.length === 0 ? (
          <View style={styles.transacoesCardVazio}>
            <Text style={styles.transacoesCardVazioText}>
              Nenhuma transação encontrada
            </Text>
          </View>
        ) : (
          transacoesFiltradas.map((t, index) => (
            <View
              key={t.id}
              style={[
                styles.transacoesCardItem,
                index < transacoesFiltradas.length - 1 &&
                  styles.transacoesCardItemBorder,
              ]}
            >
              <View
                style={
                  t.tipo === "DEBIT"
                    ? styles.transacoesCardIconeDebito
                    : styles.transacoesCardIconeCredito
                }
              >
                <Text
                  style={{
                    color: t.tipo === "DEBIT" ? "#e85555" : "#3ac97e",
                    fontSize: 14,
                  }}
                >
                  {t.tipo === "DEBIT" ? "↓" : "↑"}
                </Text>
              </View>

              <View
                style={[
                  styles.transacoesCardInfo,
                  {
                    flex: isDesktop ? 2 : 1,
                  },
                ]}
              >
                <Text style={styles.transacoesCardDescricao} numberOfLines={1}>
                  {t.descricao || "—"}
                </Text>

                {!isDesktop && (
                  <Text style={styles.transacoesCardMeta}>
                    {t.categoria || ""}
                    {t.categoria && t.data ? "  ·  " : ""}
                    {formatarData(t.data)}
                  </Text>
                )}
              </View>

              {isDesktop && (
                <View style={{ flex: 1 }}>
                  {t.categoria ? (
                    <View
                      style={[
                        styles.categoriaTag,
                        {
                          backgroundColor:
                            getCategoriaColor(t.categoria) + "22",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoriaTagText,
                          {
                            color: getCategoriaColor(t.categoria),
                          },
                        ]}
                      >
                        {t.categoria}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: "rgba(255,255,255,0.2)",
                        fontSize: 12,
                      }}
                    >
                      —
                    </Text>
                  )}
                </View>
              )}

              {isDesktop && (
                <Text
                  style={{
                    flex: 1,
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 13,
                  }}
                >
                  {formatarData(t.data)}
                </Text>
              )}

              <Text
                style={[
                  t.tipo === "DEBIT"
                    ? styles.transacoesCardValorDebito
                    : styles.transacoesCardValorCredito,
                  {
                    minWidth: 90,
                    textAlign: "right",
                  },
                ]}
              >
                {t.tipo === "DEBIT" ? "-" : "+"}
                {formatarValor(Math.abs(t.valor))}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
function getCategoriaColor(categoria) {
  const cores = {
    Alimentação: "#f59e0b",
    Transporte: "#3b82f6",
    Moradia: "#8b5cf6",
    Entretenimento: "#ec4899",
    Saúde: "#10b981",
    Renda: "#3ac97e",
    Salary: "#3ac97e",
    Housing: "#8b5cf6",
    Electricity: "#f59e0b",
    "Music streaming": "#ec4899",
    "Video streaming": "#ec4899",
    "Gyms and fitness centers": "#10b981",
    Telecommunications: "#3b82f6",
    "Transfer - Bank Slip": "#6b7280",
  };
  return cores[categoria] || "#6b7280";
}

// ── Perfil
function PerfilContent({
  styles,
  nomeUsuario,
  saldoTotal,
  totalReceitas,
  totalDespesas,
  transacoes,
  navigation,
}) {
  async function handleSair() {
    await AsyncStorage.removeItem("usuarioId");
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.extratoTitulo}>Perfil</Text>

      {/* Avatar e nome */}
      <View style={styles.perfilAvatarContainer}>
        <View style={styles.perfilAvatar}>
          <Text style={styles.perfilAvatarText}>
            {nomeUsuario ? nomeUsuario[0].toUpperCase() : "?"}
          </Text>
        </View>
        <Text style={styles.perfilNome}>{nomeUsuario || "Usuário"}</Text>
        <Text style={styles.perfilSubtitle}>Conta gratuita</Text>
      </View>

      {/* Cards resumo financeiro */}
      <Text style={styles.perfilSecaoTitulo}>Resumo financeiro</Text>
      <View style={styles.cardsRow}>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>SALDO TOTAL</Text>
          <Text style={styles.perfilCardValorVerde}>
            {formatarValor(saldoTotal)}
          </Text>
        </View>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>TRANSAÇÕES</Text>
          <Text style={styles.perfilCardValor}>{transacoes.length}</Text>
        </View>
      </View>
      <View style={styles.cardsRow}>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>RECEITAS (MÊS)</Text>
          <Text style={styles.perfilCardValorVerde}>
            {formatarValor(totalReceitas)}
          </Text>
        </View>
        <View style={styles.perfilCard}>
          <Text style={styles.perfilCardLabel}>DESPESAS (MÊS)</Text>
          <Text style={styles.perfilCardValorVermelho}>
            {formatarValor(totalDespesas)}
          </Text>
        </View>
      </View>

      {/* Botão sair */}
      <TouchableOpacity onPress={handleSair} style={styles.perfilBotaoSair}>
        <Text style={styles.perfilBotaoSairText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Relatórios ───────────────────────────────────────────────────
function RelatoriosContent({ styles, transacoes, dadosGrafico, gastosPorCategoria, totalReceitas, totalDespesas, carregando, saldoTotal }) {
  const { width } = useWindowDimensions();

  const TRADUCOES = {
    "Salary": "Salário", "Housing": "Moradia", "Electricity": "Energia Elétrica",
    "Music streaming": "Streaming de Música", "Video streaming": "Streaming de Vídeo",
    "Gyms and fitness centers": "Academia", "Telecommunications": "Telecomunicações",
    "Transfer - Bank Slip": "Pagamento de Boleto", "Food and beverage": "Alimentação",
    "Transport": "Transporte", "Health": "Saúde", "Entertainment": "Entretenimento",
    "Shopping": "Compras", "Credit card payment": "Pagamento de Fatura", "Clothing": "Vestuário",
  };
  function traduzir(cat) { return TRADUCOES[cat] || cat || "—"; }
  function fmtValor(v) {
    if (v === null || v === undefined) return "—";
    return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  // Seletor de mês — por padrão mês atual
  const agora = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(agora.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(agora.getFullYear());

  // Gera lista dos últimos 12 meses para o seletor
  const mesesDisponiveis = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
    mesesDisponiveis.push({
      mes: d.getMonth(),
      ano: d.getFullYear(),
      label: d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      labelCurto: d.toLocaleDateString("pt-BR", { month: "short" }),
    });
  }

  // Filtra transações do mês selecionado
  const txMesSelecionado = transacoes.filter(t => {
    if (!t.data) return false;
    const d = new Date(t.data + "T00:00:00");
    return d.getMonth() === mesSelecionado && d.getFullYear() === anoSelecionado;
  });

  const CATEGORIAS_IGNORAR = ["credit card payment", "pagamento fatura", "pagamento cartao"];

  const receitasMes = txMesSelecionado
    .filter(t => (t.tipo||"").toUpperCase() === "CREDIT" && !CATEGORIAS_IGNORAR.some(c => (t.categoria||"").toLowerCase().includes(c)))
    .reduce((acc, t) => acc + Math.abs(Number(t.valor||0)), 0);

  const despesasMes = txMesSelecionado
    .filter(t => (t.tipo||"").toUpperCase() === "DEBIT")
    .reduce((acc, t) => acc + Math.abs(Number(t.valor||0)), 0);

  const saldoPeriodo = receitasMes - despesasMes;

  // Gastos por categoria do mês selecionado
  const catMap = {};
  const cores = ["#3ac97e","#f59e0b","#3b82f6","#8b5cf6","#e85555","#06b6d4"];
  txMesSelecionado.filter(t => (t.tipo||"").toUpperCase() === "DEBIT" && t.categoria).forEach(t => {
    catMap[t.categoria] = (catMap[t.categoria] || 0) + Math.abs(Number(t.valor||0));
  });
  const totalCat = Object.values(catMap).reduce((a,b) => a+b, 0);
  const gastosCat = Object.entries(catMap)
    .sort((a,b) => b[1]-a[1]).slice(0,5)
    .map(([nome, valor], i) => ({ nome, valor, percentual: totalCat > 0 ? Math.round((valor/totalCat)*100) : 0, cor: cores[i%cores.length] }));

  // Movimentações por categoria do mês selecionado
  const resumoCategorias = {};
  txMesSelecionado.forEach(t => {
    if (!t.categoria) return;
    if (!resumoCategorias[t.categoria]) resumoCategorias[t.categoria] = { receitas: 0, despesas: 0 };
    const val = Math.abs(Number(t.valor||0));
    if ((t.tipo||"").toUpperCase() === "CREDIT") resumoCategorias[t.categoria].receitas += val;
    else resumoCategorias[t.categoria].despesas += val;
  });
  const topCategorias = Object.entries(resumoCategorias)
    .sort((a,b) => (b[1].receitas+b[1].despesas)-(a[1].receitas+a[1].despesas))
    .slice(0, 8);

  // Gráfico — 6 meses centrados no mês selecionado (3 antes, o próprio, 2 depois ou o que houver)
  const graficoDados = [];
  for (let i = -3; i <= 2; i++) {
    const d = new Date(anoSelecionado, mesSelecionado + i, 1);
    const m = d.getMonth();
    const a = d.getFullYear();
    const nomeMes = d.toLocaleDateString("pt-BR", { month: "short" });
    const txMes = transacoes.filter(t => {
      if (!t.data) return false;
      const td = new Date(t.data + "T00:00:00");
      return td.getMonth() === m && td.getFullYear() === a;
    });
    const IGNORAR = ["credit card payment", "pagamento fatura", "pagamento cartao"];
    const r = txMes.filter(t => (t.tipo||"").toUpperCase() === "CREDIT" && !IGNORAR.some(c => (t.categoria||"").toLowerCase().includes(c)))
      .reduce((acc, t) => acc + Math.abs(Number(t.valor||0)), 0);
    const d2 = txMes.filter(t => (t.tipo||"").toUpperCase() === "DEBIT")
      .reduce((acc, t) => acc + Math.abs(Number(t.valor||0)), 0);
    graficoDados.push({ mes: nomeMes, receitas: r, despesas: d2, ativo: i === 0 });
  }

  const melhorMes = graficoDados.length > 0
    ? graficoDados.reduce((best, m) => (m.receitas - m.despesas) > (best.receitas - best.despesas) ? m : best, graficoDados[0])
    : null;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* Título + Seletor de mês */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <Text style={styles.extratoTitulo}>Relatórios</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxWidth: "60%" }}>
          <View style={{ flexDirection: "row", gap: 8, paddingVertical: 4 }}>
            {mesesDisponiveis.map((m, i) => {
              const ativo = m.mes === mesSelecionado && m.ano === anoSelecionado;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => { setMesSelecionado(m.mes); setAnoSelecionado(m.ano); }}
                  style={[styles.filtroBtn, ativo && styles.filtroBtnAtivo]}
                >
                  <Text style={[styles.filtroBtnText, ativo && styles.filtroBtnTextAtivo]}>
                    {m.labelCurto}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Cards resumo */}
      <View style={[styles.cardsRow, { marginBottom: 24 }]}>
        <View style={styles.extratoCardSaldo}>
          <Text style={styles.extratoCardLabel}>SALDO ATUAL</Text>
          {carregando ? <ActivityIndicator size="small" color="#f59e0b" /> : (
            <>
              <Text style={[styles.extratoCardValorAmarelo, saldoTotal < 0 && { color: "#e85555" }]}>{fmtValor(saldoTotal)}</Text>
              <Text style={styles.extratoCardSub}>{saldoTotal >= 0 ? "✓ positivo" : "⚠ negativo"}</Text>
            </>
          )}
        </View>
        <View style={styles.extratoCardReceitas}>
          <Text style={styles.extratoCardLabel}>RECEITAS</Text>
          {carregando ? <ActivityIndicator size="small" color="#3ac97e" /> : (
            <>
              <Text style={styles.extratoCardValorVerde}>{fmtValor(receitasMes)}</Text>
              <Text style={styles.extratoCardSub}>{txMesSelecionado.filter(t => (t.tipo||"").toUpperCase()==="CREDIT").length} entradas</Text>
            </>
          )}
        </View>
        <View style={styles.extratoCardDespesas}>
          <Text style={styles.extratoCardLabel}>DESPESAS</Text>
          {carregando ? <ActivityIndicator size="small" color="#e85555" /> : (
            <>
              <Text style={styles.extratoCardValorVermelho}>{fmtValor(despesasMes)}</Text>
              <Text style={styles.extratoCardSub}>{txMesSelecionado.filter(t => (t.tipo||"").toUpperCase()==="DEBIT").length} saídas</Text>
            </>
          )}
        </View>
      </View>

      {/* Gráfico de colunas */}
      <View style={[styles.transacoesCard, { padding: 18, marginBottom: 20 }]}>
        <Text style={[styles.transacoesCardTitle, { marginBottom: 4 }]}>Receitas vs Despesas — 6 meses</Text>
        {melhorMes && (
          <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 16 }}>
            Melhor mês: {melhorMes.mes} (+{fmtValor(melhorMes.receitas - melhorMes.despesas)})
          </Text>
        )}
        {carregando ? <ActivityIndicator size="small" color="#3ac97e" /> : (() => {
          const max = Math.max(...graficoDados.flatMap(d => [d.receitas||0, d.despesas||0]), 1);
          const altMax = 120;
          return (
            <View>
              <View style={{ flexDirection: "row", alignItems: "flex-end", height: altMax + 70, gap: 4 }}>
                {graficoDados.map((d, i) => {
                  const hR = Math.max((d.receitas / max) * altMax, 3);
                  const hD = Math.max((d.despesas / max) * altMax, 3);
                  const saldo = d.receitas - d.despesas;
                  return (
                    <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                      {/* Valor do saldo acima das barras */}
                      <Text style={{
                        color: d.ativo ? (saldo >= 0 ? "#3ac97e" : "#e85555") : "rgba(255,255,255,0.2)",
                        fontSize: d.ativo ? 10 : 8,
                        fontWeight: d.ativo ? "700" : "400",
                        marginBottom: 4,
                        textAlign: "center",
                      }}>
                        {saldo >= 0 ? "+" : ""}{(saldo/1000).toFixed(1)}k
                      </Text>
                      {/* Barras */}
                      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2, marginBottom: 6 }}>
                        <View style={{
                          width: d.ativo ? 14 : 10,
                          height: hR,
                          backgroundColor: d.ativo ? "#3ac97e" : "rgba(58,201,126,0.35)",
                          borderRadius: 3,
                          ...(d.ativo && { shadowColor: "#3ac97e", shadowOpacity: 0.6, shadowRadius: 6, elevation: 4 }),
                        }} />
                        <View style={{
                          width: d.ativo ? 14 : 10,
                          height: hD,
                          backgroundColor: d.ativo ? "#e85555" : "rgba(232,85,85,0.35)",
                          borderRadius: 3,
                          ...(d.ativo && { shadowColor: "#e85555", shadowOpacity: 0.6, shadowRadius: 6, elevation: 4 }),
                        }} />
                      </View>
                      {/* Label do mês */}
                      <Text style={{
                        color: d.ativo ? "#ffffff" : "rgba(255,255,255,0.3)",
                        fontSize: d.ativo ? 11 : 10,
                        fontWeight: d.ativo ? "700" : "400",
                        textAlign: "center",
                      }}>
                        {d.mes}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#3ac97e" }} />
                  <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Receitas</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#e85555" }} />
                  <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Despesas</Text>
                </View>
              </View>
            </View>
          );
        })()}
      </View>

      {/* Gastos por categoria */}
      <View style={[styles.transacoesCard, { padding: 18, marginBottom: 20 }]}>
        <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>Gastos por categoria</Text>
        {carregando ? <ActivityIndicator size="small" color="#3ac97e" /> : gastosCat.length === 0 ? (
          <Text style={[styles.transacoesCardVazioText, { padding: 16 }]}>Sem dados de categorias</Text>
        ) : (
          <View style={{ gap: 12 }}>
            {gastosCat.map((g, i) => (
              <View key={i} style={{ gap: 6 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }} numberOfLines={1}>{traduzir(g.nome)}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{fmtValor(g.valor)}</Text>
                    <Text style={{ color: g.cor, fontSize: 13, fontWeight: "700", minWidth: 36, textAlign: "right" }}>{g.percentual}%</Text>
                  </View>
                </View>
                <View style={{ height: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
                  <View style={{ height: 6, width: `${g.percentual}%`, backgroundColor: g.cor, borderRadius: 3 }} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Transações do mês */}
      <View style={[styles.transacoesCard, { marginBottom: 20 }]}>
        <View style={styles.transacoesCardHeader}>
          <Text style={styles.transacoesCardTitle}>Transações do mês</Text>
        </View>
        {txMesSelecionado.length === 0 ? (
          <View style={styles.transacoesCardVazio}>
            <Text style={styles.transacoesCardVazioText}>Nenhuma transação neste mês</Text>
          </View>
        ) : txMesSelecionado.map((t, i) => (
          <View key={t.id} style={[styles.transacoesCardItem, i < txMesSelecionado.length - 1 && styles.transacoesCardItemBorder]}>
            <View style={t.tipo === "DEBIT" ? styles.transacoesCardIconeDebito : styles.transacoesCardIconeCredito}>
              <Text style={{ color: t.tipo === "DEBIT" ? "#e85555" : "#3ac97e", fontSize: 14 }}>
                {t.tipo === "DEBIT" ? "↓" : "↑"}
              </Text>
            </View>
            <View style={styles.transacoesCardInfo}>
              <Text style={styles.transacoesCardDescricao} numberOfLines={1}>{t.descricao || "—"}</Text>
              <Text style={styles.transacoesCardMeta}>{traduzir(t.categoria)}{t.categoria && t.data ? "  ·  " : ""}{t.data ? new Date(t.data+"T00:00:00").toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}) : ""}</Text>
            </View>
            <Text style={t.tipo === "DEBIT" ? styles.transacoesCardValorDebito : styles.transacoesCardValorCredito}>
              {t.tipo === "DEBIT" ? "-" : "+"}{fmtValor(Math.abs(t.valor))}
            </Text>
          </View>
        ))}
      </View>

      {/* Resumo por categoria */}
      <View style={styles.transacoesCard}>
        <View style={styles.transacoesCardHeader}>
          <Text style={styles.transacoesCardTitle}>Movimentações por categoria</Text>
        </View>
        {topCategorias.length === 0 ? (
          <View style={styles.transacoesCardVazio}><Text style={styles.transacoesCardVazioText}>Sem dados</Text></View>
        ) : topCategorias.map(([cat, vals], i) => (
          <View key={cat} style={[styles.transacoesCardItem, i < topCategorias.length - 1 && styles.transacoesCardItemBorder]}>
            <View style={styles.transacoesCardInfo}>
              <Text style={styles.transacoesCardDescricao} numberOfLines={1}>{traduzir(cat)}</Text>
              <Text style={styles.transacoesCardMeta}>
                {vals.receitas > 0 ? `+${fmtValor(vals.receitas)}` : ""}
                {vals.receitas > 0 && vals.despesas > 0 ? "  ·  " : ""}
                {vals.despesas > 0 ? `-${fmtValor(vals.despesas)}` : ""}
              </Text>
            </View>
            <Text style={vals.despesas > vals.receitas ? styles.transacoesCardValorDebito : styles.transacoesCardValorCredito}>
              {fmtValor(vals.receitas + vals.despesas)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


// ── Patrimônio
function PatrimonioContent({ styles }) {
  const {
    patrimonios,
    loans,
    contasCredito,
    carregando,
    totalPatrimonio,
    totalDividas,
    saldoLiquido,
    status,
    adicionarPatrimonio,
    removerPatrimonio,
  } = usePatrimonio();

  const [nomeItem, setNomeItem] = useState("");
  const [valorItem, setValorItem] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleAdicionar() {
    const val = parseFloat(valorItem.replace(",", "."));
    if (!nomeItem.trim() || isNaN(val) || val <= 0) return;
    setSalvando(true);
    const { error } = await adicionarPatrimonio(nomeItem.trim(), val);
    if (!error) {
      setNomeItem("");
      setValorItem("");
    }
    setSalvando(false);
  }

  const statusConfig = {
    azul: {
      cor: "#3ac97e",
      bg: "rgba(58,201,126,0.1)",
      borda: "rgba(58,201,126,0.3)",
      emoji: "\u2705",
      texto: "Ficaria no azul! Sobrariam",
    },
    zero: {
      cor: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      borda: "rgba(245,158,11,0.3)",
      emoji: "\u2696\uFE0F",
      texto: "Ficaria no zero. Saldo de",
    },
    vermelho: {
      cor: "#e85555",
      bg: "rgba(232,85,85,0.1)",
      borda: "rgba(232,85,85,0.3)",
      emoji: "\u26A0\uFE0F",
      texto: "Ficaria no vermelho. Faltariam",
    },
  };
  const cfg = statusConfig[status];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.extratoTitulo}>Patrimônio</Text>

      <View style={[styles.transacoesCard, { padding: 18, marginBottom: 20 }]}>
        <Text style={[styles.transacoesCardTitle, { marginBottom: 16 }]}>
          Adicionar item
        </Text>
        <TextInput
          value={nomeItem}
          onChangeText={setNomeItem}
          placeholder="Nome do item (ex: Carro, Casa)"
          placeholderTextColor="rgba(255,255,255,0.2)"
          style={styles.patrimonioInput}
        />
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <View style={[styles.modalInputRow, { flex: 1, marginBottom: 0 }]}>
            <Text style={styles.modalInputPrefix}>R$</Text>
            <TextInput
              value={valorItem}
              onChangeText={setValorItem}
              keyboardType="numeric"
              placeholder="0,00"
              placeholderTextColor="rgba(255,255,255,0.2)"
              style={[styles.modalInput, { paddingVertical: 10 }]}
            />
          </View>
          <TouchableOpacity
            onPress={handleAdicionar}
            disabled={salvando}
            style={[
              styles.modalButton,
              {
                paddingHorizontal: 20,
                paddingVertical: 0,
                justifyContent: "center",
              },
            ]}
          >
            {salvando ? (
              <ActivityIndicator size="small" color="#0d1321" />
            ) : (
              <Text style={styles.modalButtonText}>+ Adicionar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.cardsRow, { marginBottom: 20 }]}>
        <View
          style={[styles.perfilCard, { borderColor: "rgba(58,201,126,0.2)" }]}
        >
          <Text style={styles.perfilCardLabel}>TOTAL PATRIMÔNIO</Text>
          <Text style={styles.perfilCardValorVerde}>
            {formatarValor(totalPatrimonio)}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 11,
              marginTop: 4,
            }}
          >
            {patrimonios.length} itens
          </Text>
        </View>
        <View
          style={[styles.perfilCard, { borderColor: "rgba(232,85,85,0.2)" }]}
        >
          <Text style={styles.perfilCardLabel}>TOTAL DÍVIDAS</Text>
          <Text style={styles.perfilCardValorVermelho}>
            {formatarValor(totalDividas)}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 11,
              marginTop: 4,
            }}
          >
            {loans.length} empréstimos + cartão
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: cfg.bg,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: cfg.borda,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          {cfg.emoji} SE VENDESSE TUDO
        </Text>
        <Text style={{ color: cfg.cor, fontSize: 26, fontWeight: "800" }}>
          {formatarValor(Math.abs(saldoLiquido))}
        </Text>
        <Text
          style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 6 }}
        >
          {cfg.texto} {formatarValor(Math.abs(saldoLiquido))} após quitar todas
          as dívidas.
        </Text>
      </View>

      <View style={[styles.transacoesCard, { marginBottom: 20 }]}>
        <View style={styles.transacoesCardHeader}>
          <Text style={styles.transacoesCardTitle}>Meus patrimônios</Text>
        </View>
        {carregando ? (
          <View style={styles.transacoesCardVazio}>
            <ActivityIndicator size="small" color="#3ac97e" />
          </View>
        ) : patrimonios.length === 0 ? (
          <View style={styles.transacoesCardVazio}>
            <Text style={styles.transacoesCardVazioText}>
              Nenhum item cadastrado ainda
            </Text>
          </View>
        ) : (
          patrimonios.map((p, i) => (
            <View
              key={p.id}
              style={[
                styles.transacoesCardItem,
                i < patrimonios.length - 1 && styles.transacoesCardItemBorder,
              ]}
            >
              <View style={styles.transacoesCardInfo}>
                <Text style={styles.transacoesCardDescricao}>{p.nome}</Text>
                <Text style={styles.transacoesCardMeta}>
                  {formatarData(p.criado_em)}
                </Text>
              </View>
              <Text
                style={[styles.transacoesCardValorCredito, { marginRight: 12 }]}
              >
                {formatarValor(p.valor)}
              </Text>
              <TouchableOpacity onPress={() => removerPatrimonio(p.id)}>
                <Text style={{ color: "#e85555", fontSize: 18 }}>x</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
        

      {contasCredito.filter((c) => c.saldo < 0).length > 0 && (
        <View style={styles.transacoesCard}>
          <View style={styles.transacoesCardHeader}>
            <Text style={styles.transacoesCardTitle}>Cartão de Crédito</Text>
          </View>
          {contasCredito
            .filter((c) => c.saldo < 0)
            .map((c, i) => (
              <View
                key={c.id}
                style={[
                  styles.transacoesCardItem,
                  i < contasCredito.length - 1 &&
                    styles.transacoesCardItemBorder,
                ]}
              >
                <View style={styles.transacoesCardInfo}>
                  <Text style={styles.transacoesCardDescricao}>{c.nome}</Text>
                  {c.numero && (
                    <Text style={styles.transacoesCardMeta}>
                      Final {c.numero}
                    </Text>
                  )}
                </View>
                <Text style={styles.transacoesCardValorDebito}>
                  -{formatarValor(Math.abs(c.saldo))}
                </Text>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
}

// ── Menu principal
export function Menu({ navigation, activeRoute = "Dashboard", children }) {
  const styles = useMenuStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [telaAtiva, setTelaAtiva] = useState("Dashboard");

  const {
    saldoTotal,
    salario,
    salvarSalario,
    transacoes,
    carregando,
    nomeUsuario,
    dadosGrafico,
    gastosPorCategoria,
    totalReceitas,
    totalDespesas,
  } = useFinancas();

  function renderConteudo() {
    if (children) return children;
    switch (telaAtiva) {
      case "Extrato":
        return (
          <ExtratoContent
            styles={styles}
            transacoes={transacoes}
            carregando={carregando}
            totalReceitas={totalReceitas}
            totalDespesas={totalDespesas}
            saldoTotal={saldoTotal}
            salario={salario}
          />
        );
      case "Relatorios":
        return (
          <RelatoriosContent
            styles={styles}
            transacoes={transacoes}
            dadosGrafico={dadosGrafico}
            gastosPorCategoria={gastosPorCategoria}
            totalReceitas={totalReceitas}
            totalDespesas={totalDespesas}
            carregando={carregando}
            saldoTotal={saldoTotal}
          />
        );
      case "Patrimonio":
        return <PatrimonioContent styles={styles} />;
      case "Perfil":
        return (
          <PerfilContent
            styles={styles}
            nomeUsuario={nomeUsuario}
            saldoTotal={saldoTotal}
            totalReceitas={totalReceitas}
            totalDespesas={totalDespesas}
            transacoes={transacoes}
            navigation={navigation}
          />
        );
      default:
        return (
          <DashboardContent
            styles={styles}
            saldoTotal={saldoTotal}
            salario={salario}
            salvarSalario={salvarSalario}
            transacoes={transacoes}
            carregando={carregando}
            nomeUsuario={nomeUsuario}
            dadosGrafico={dadosGrafico}
            gastosPorCategoria={gastosPorCategoria}
            totalReceitas={totalReceitas}
            totalDespesas={totalDespesas}
          />
        );
    }
  }

  const navItems = isDesktop ? NAV_ITEMS : MOBILE_ITEMS;

  if (isDesktop) {
    return (
      <View style={styles.desktopRoot}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarLogo}>
            <Text style={styles.logoText}>
              Money<Text style={styles.logoTrack}>Track</Text>
            </Text>
          </View>
          <View style={styles.sidebarGreeting}>
            <View style={styles.greetingAvatar}>
              <Text style={styles.greetingAvatarText}>
                {nomeUsuario ? nomeUsuario[0].toUpperCase() : "?"}
              </Text>
            </View>
            <View>
              <Text style={styles.greetingName}>
                {primeiroNome(nomeUsuario)}
              </Text>
              <Text style={styles.greetingPlan}>{telaAtiva}</Text>
            </View>
          </View>
          <View style={styles.sidebarNav}>
            {NAV_ITEMS.map((item) => {
              const isActive = telaAtiva === item.route;
              return (
                <TouchableOpacity
                  key={item.route}
                  style={[styles.navItem, isActive && styles.navItemActive]}
                  onPress={() => setTelaAtiva(item.route)}
                >
                  <Text
                    style={[styles.navLabel, isActive && styles.navLabelActive]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.sidebarSignOut}
            onPress={async () => {
              await AsyncStorage.removeItem("usuarioId");
              await AsyncStorage.removeItem("token");
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signOutText}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.desktopContent}>{renderConteudo()}</View>
      </View>
    );
  }

  return (
    <View style={styles.mobileRoot}>
      <View style={styles.mobileContent}>{renderConteudo()}</View>
      <View style={styles.bottomNav}>
        {MOBILE_ITEMS.map((item) => {
          const isActive = telaAtiva === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={styles.bottomNavItem}
              onPress={() => setTelaAtiva(item.route)}
            >
              <Text
                style={[
                  styles.bottomNavLabel,
                  isActive && styles.bottomNavLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}