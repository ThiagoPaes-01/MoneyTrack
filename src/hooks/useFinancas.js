import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

function parseData(dataStr) {
  if (!dataStr) return new Date(0);
  return new Date(dataStr + "T00:00:00");
}

function isReceita(tipo) {
  return (tipo || "").toUpperCase() === "CREDIT";
}

function isDespesa(tipo) {
  return (tipo || "").toUpperCase() === "DEBIT";
}

export function useFinancas() {
  const [saldoTotal, setSaldoTotal] = useState(null);
  const [salario, setSalario] = useState(null);
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioId");
      console.log("usuarioId carregado:", usuarioId);
      if (!usuarioId) return;

      // Buscar usuário — sem .single() para evitar erro 406
      const { data: usuarios, error: userError } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("id", usuarioId)
        .limit(1);

      if (userError) console.error("Erro ao buscar usuário:", userError.message);
      if (usuarios && usuarios.length > 0) setNomeUsuario(usuarios[0].nome);

      // Buscar contas
      const { data: contas, error: contasError } = await supabase
        .from("accounts")
        .select("saldo, tipo")
        .eq("usuario_id", usuarioId);

      if (contasError) console.error("Erro ao buscar contas:", contasError.message);
      if (contas) {
        const total = contas
          .filter(c => {
            const tipo = (c.tipo || "").toUpperCase();
            return tipo === "BANK" || tipo === "CHECKING" || tipo === "SAVINGS";
          })
          .reduce((acc, c) => acc + Number(c.saldo || 0), 0);
        setSaldoTotal(total);
      }

      // Salário salvo
      const salarioSalvo = await AsyncStorage.getItem(`salario_${usuarioId}`);
      if (salarioSalvo) setSalario(parseFloat(salarioSalvo));

      // Buscar transações
      const { data: todasTxns, error: txnError } = await supabase
        .from("transactions")
        .select("id, descricao, valor, data, categoria, tipo")
        .eq("usuario_id", usuarioId)
        .order("data", { ascending: false });

      if (txnError) {
        console.error("Erro ao buscar transações:", txnError.message);
        return;
      }

      if (todasTxns && todasTxns.length > 0) {
        setTransacoes(todasTxns);

        // Encontrar mês com mais transações
        const agrupadoPorMes = {};
        todasTxns.forEach(t => {
          const d = parseData(t.data);
          const chave = `${d.getFullYear()}-${d.getMonth()}`;
          if (!agrupadoPorMes[chave]) agrupadoPorMes[chave] = { ano: d.getFullYear(), mes: d.getMonth(), quantidade: 0 };
          agrupadoPorMes[chave].quantidade++;
        });

        const mesesArray = Object.values(agrupadoPorMes).sort((a, b) =>
          a.ano !== b.ano ? b.ano - a.ano : b.mes - a.mes
        );

        const mesCompleto = mesesArray.find(m => m.quantidade > 2) || mesesArray[0];
        let anoAtual = mesCompleto.ano;
        let mesAtual = mesCompleto.mes - 1;
        if (mesAtual < 0) { mesAtual = 11; anoAtual -= 1; }

        const txMesAtual = todasTxns.filter(t => {
          const d = parseData(t.data);
          return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
        });

        const CATEGORIAS_IGNORAR = ["credit card payment", "pagamento fatura", "pagamento cartao"];

        const receitasTransacoes = txMesAtual
          .filter(t => isReceita(t.tipo) && !CATEGORIAS_IGNORAR.some(c => (t.categoria || "").toLowerCase().includes(c)))
          .reduce((acc, t) => acc + Math.abs(Number(t.valor || 0)), 0);

        const receitas = receitasTransacoes + Number(salarioSalvo || 0);
        const despesas = txMesAtual
          .filter(t => isDespesa(t.tipo))
          .reduce((acc, t) => acc + Math.abs(Number(t.valor || 0)), 0);

        setTotalReceitas(receitas);
        setTotalDespesas(despesas);

        // Gráfico últimos 6 meses
        const meses = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(anoAtual, mesAtual - i, 1);
          const m = d.getMonth();
          const a = d.getFullYear();
          const nomeMes = d.toLocaleDateString("pt-BR", { month: "short" });
          const txMes = todasTxns.filter(t => {
            const td = parseData(t.data);
            return td.getMonth() === m && td.getFullYear() === a;
          });
          const recMes = txMes
            .filter(t => isReceita(t.tipo) && !CATEGORIAS_IGNORAR.some(c => (t.categoria || "").toLowerCase().includes(c)))
            .reduce((acc, t) => acc + Math.abs(Number(t.valor || 0)), 0) + Number(salarioSalvo || 0);
          const despMes = txMes
            .filter(t => isDespesa(t.tipo))
            .reduce((acc, t) => acc + Math.abs(Number(t.valor || 0)), 0);
          meses.push({ mes: nomeMes, receitas: recMes, despesas: despMes });
        }
        setDadosGrafico(meses);

        // Gastos por categoria
        const categorias = {};
        txMesAtual.filter(t => isDespesa(t.tipo) && t.categoria).forEach(t => {
          categorias[t.categoria] = (categorias[t.categoria] || 0) + Math.abs(Number(t.valor || 0));
        });
        const totalGastos = Object.values(categorias).reduce((a, b) => a + b, 0);
        const cores = ["#3ac97e", "#f59e0b", "#3b82f6", "#8b5cf6", "#e85555", "#06b6d4"];
        setGastosPorCategoria(
          Object.entries(categorias).sort((a, b) => b[1] - a[1]).slice(0, 5)
            .map(([nome, valor], i) => ({
              nome, valor,
              percentual: totalGastos > 0 ? Math.round((valor / totalGastos) * 100) : 0,
              cor: cores[i % cores.length],
            }))
        );
      }
    } catch (e) {
      console.error("Erro ao carregar finanças:", e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function salvarSalario(valor) {
    const usuarioId = await AsyncStorage.getItem("usuarioId");
    if (!usuarioId) return;
    await AsyncStorage.setItem(`salario_${usuarioId}`, String(valor));
    setSalario(valor);
  }

  return {
    saldoTotal, salario, salvarSalario, transacoes, carregando,
    nomeUsuario, dadosGrafico, gastosPorCategoria,
    totalReceitas, totalDespesas, recarregar: carregar,
    isReceita, isDespesa,
  };
}