import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

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
      if (!usuarioId) return;

      // Busca nome do usuário
      const { data: usuario } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("id", usuarioId)
        .single();

      if (usuario) setNomeUsuario(usuario.nome);

      // Busca contas e soma saldo
      const { data: contas, error: contasError } = await supabase
        .from("accounts")
        .select("saldo")
        .eq("usuario_id", usuarioId);

      if (contas) {
        const total = contas.reduce((acc, c) => acc + (c.saldo || 0), 0);
        setSaldoTotal(total);
      }

      // Busca salário salvo localmente
      const salarioSalvo = await AsyncStorage.getItem(`salario_${usuarioId}`);
      if (salarioSalvo) setSalario(parseFloat(salarioSalvo));

      // Busca todas as transações para gráficos
      const { data: todasTxns } = await supabase
        .from("transactions")
        .select("id, descricao, valor, data, categoria, tipo")
        .eq("usuario_id", usuarioId)
        .order("data", { ascending: false });

      if (todasTxns) {
        // Últimas 5 para o dashboard
        setTransacoes(todasTxns.slice(0, 10));

        // Total receitas e despesas do mês atual
        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        const txMesAtual = todasTxns.filter(t => {
          const d = new Date(t.data);
          return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
        });

        const receitas = txMesAtual
          .filter(t => t.tipo === "CREDIT")
          .reduce((acc, t) => acc + Math.abs(t.valor), 0);

        const despesas = txMesAtual
          .filter(t => t.tipo === "DEBIT")
          .reduce((acc, t) => acc + Math.abs(t.valor), 0);

        setTotalReceitas(receitas);
        setTotalDespesas(despesas);

        // Dados para gráfico de barras — últimos 6 meses
        const meses = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(anoAtual, mesAtual - i, 1);
          const m = d.getMonth();
          const a = d.getFullYear();
          const nomeMes = d.toLocaleDateString("pt-BR", { month: "short" });

          const txMes = todasTxns.filter(t => {
            const td = new Date(t.data);
            return td.getMonth() === m && td.getFullYear() === a;
          });

          const r = txMes.filter(t => t.tipo === "CREDIT").reduce((acc, t) => acc + Math.abs(t.valor), 0);
          const d2 = txMes.filter(t => t.tipo === "DEBIT").reduce((acc, t) => acc + Math.abs(t.valor), 0);

          meses.push({ mes: nomeMes, receitas: r, despesas: d2 });
        }
        setDadosGrafico(meses);

        // Gastos por categoria
        const categorias = {};
        txMesAtual
          .filter(t => t.tipo === "DEBIT" && t.categoria)
          .forEach(t => {
            categorias[t.categoria] = (categorias[t.categoria] || 0) + Math.abs(t.valor);
          });

        const totalGastos = Object.values(categorias).reduce((a, b) => a + b, 0);
        const cores = ["#3ac97e", "#f59e0b", "#3b82f6", "#8b5cf6", "#e85555", "#06b6d4"];

        const gastosArr = Object.entries(categorias)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([nome, valor], i) => ({
            nome,
            valor,
            percentual: totalGastos > 0 ? Math.round((valor / totalGastos) * 100) : 0,
            cor: cores[i % cores.length],
          }));

        setGastosPorCategoria(gastosArr);
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
    recarregar: carregar,
  };
}