import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

// Parse seguro de datas
function parseData(dataStr) {
  if (!dataStr) return new Date(0);

  return new Date(dataStr + "T00:00:00");
}

// Helpers
function isReceita(tipo) {
  return (tipo || "").toUpperCase() === "CREDIT";
}

function isDespesa(tipo) {
  return (tipo || "").toUpperCase() === "DEBIT";
}

export function useFinancas() {
  const [saldoTotal, setSaldoTotal] = useState(null);
  const [salario, setSalario] = useState(null);

  // TODAS as transações
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

      // Buscar usuário
      const { data: usuario } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("id", usuarioId)
        .single();

      if (usuario) {
        setNomeUsuario(usuario.nome);
      }

      // Buscar contas
      const { data: contas } = await supabase
        .from("accounts")
        .select("saldo, tipo")
        .eq("usuario_id", usuarioId);

      if (contas) {
        const total = contas
          .filter((c) => {
            const tipo = (c.tipo || "").toUpperCase();

            return (
              tipo === "BANK" ||
              tipo === "CHECKING" ||
              tipo === "SAVINGS"
            );
          })
          .reduce((acc, c) => acc + Number(c.saldo || 0), 0);

        setSaldoTotal(total);
      }

      // Salário salvo
      const salarioSalvo = await AsyncStorage.getItem(
        `salario_${usuarioId}`
      );

      if (salarioSalvo) {
        setSalario(parseFloat(salarioSalvo));
      }

      // Buscar transações
      const { data: todasTxns, error } = await supabase
        .from("transactions")
        .select("id, descricao, valor, data, categoria, tipo")
        .eq("usuario_id", usuarioId)
        .order("data", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      if (todasTxns && todasTxns.length > 0) {
        console.log("TRANSAÇÕES:", todasTxns);

        // SALVAR TODAS AS TRANSAÇÕES
        setTransacoes(todasTxns);

        // Encontrar último mês completo
        const agrupadoPorMes = {};

        todasTxns.forEach((t) => {
          const d = parseData(t.data);

          const ano = d.getFullYear();
          const mes = d.getMonth();

          const chave = `${ano}-${mes}`;

          if (!agrupadoPorMes[chave]) {
            agrupadoPorMes[chave] = {
              ano,
              mes,
              quantidade: 0,
            };
          }

          agrupadoPorMes[chave].quantidade++;
        });

        // transformar em array
        const mesesArray = Object.values(agrupadoPorMes);

        // ordenar corretamente
        mesesArray.sort((a, b) => {
          if (a.ano !== b.ano) {
            return b.ano - a.ano;
          }

          return b.mes - a.mes;
        });

        // pegar primeiro mês com mais de 2 transações
        const mesCompleto =
          mesesArray.find((m) => m.quantidade > 2) ||
          mesesArray[0];

        let anoAtual = mesCompleto.ano;
        let mesAtual = mesCompleto.mes - 1;

        // Se voltar de janeiro -> dezembro do ano anterior
        if (mesAtual < 0) {
          mesAtual = 11;
          anoAtual = anoAtual - 1;
        }

        console.log("MÊS ESCOLHIDO:", mesAtual + 1);
        console.log("ANO ESCOLHIDO:", anoAtual);

        // Transações do mês escolhido
        const txMesAtual = todasTxns.filter((t) => {
          const d = parseData(t.data);

          return (
            d.getMonth() === mesAtual &&
            d.getFullYear() === anoAtual
          );
        });

        console.log("TRANSAÇÕES DO MÊS:", txMesAtual);

        // Ignorar pagamentos de cartão em receita
        const CATEGORIAS_IGNORAR_RECEITA = [
          "credit card payment",
          "pagamento fatura",
          "pagamento cartao",
        ];

        // RECEITAS DAS TRANSAÇÕES
        const receitasTransacoes = txMesAtual
          .filter((t) => {
            if (!isReceita(t.tipo)) return false;

            const categoria = (t.categoria || "").toLowerCase();

            return !CATEGORIAS_IGNORAR_RECEITA.some((c) =>
              categoria.includes(c)
            );
          })
          .reduce(
            (acc, t) => acc + Math.abs(Number(t.valor || 0)),
            0
          );

        // SOMA O SALÁRIO MANUAL
        const receitas =
          receitasTransacoes +
          Number(salarioSalvo || 0);

        // DESPESA
        const despesas = txMesAtual
          .filter((t) => isDespesa(t.tipo))
          .reduce(
            (acc, t) => acc + Math.abs(Number(t.valor || 0)),
            0
          );

        console.log("RECEITAS:", receitas);
        console.log("DESPESAS:", despesas);

        setTotalReceitas(receitas);
        setTotalDespesas(despesas);

        // Gráfico últimos 6 meses
        const meses = [];

        for (let i = 5; i >= 0; i--) {
          const d = new Date(anoAtual, mesAtual - i, 1);

          const m = d.getMonth();
          const a = d.getFullYear();

          const nomeMes = d.toLocaleDateString("pt-BR", {
            month: "short",
          });

          const txMes = todasTxns.filter((t) => {
            const td = parseData(t.data);

            return (
              td.getMonth() === m &&
              td.getFullYear() === a
            );
          });

          const receitasTransacoesMes = txMes
            .filter((t) => {
              if (!isReceita(t.tipo)) return false;

              const categoria = (t.categoria || "").toLowerCase();

              return !CATEGORIAS_IGNORAR_RECEITA.some((c) =>
                categoria.includes(c)
              );
            })
            .reduce(
              (acc, t) => acc + Math.abs(Number(t.valor || 0)),
              0
            );

          const receitasMes =
            receitasTransacoesMes +
            Number(salarioSalvo || 0);

          const despesasMes = txMes
            .filter((t) => isDespesa(t.tipo))
            .reduce(
              (acc, t) => acc + Math.abs(Number(t.valor || 0)),
              0
            );

          meses.push({
            mes: nomeMes,
            receitas: receitasMes,
            despesas: despesasMes,
          });
        }

        setDadosGrafico(meses);

        // Gastos por categoria
        const categorias = {};

        txMesAtual
          .filter(
            (t) =>
              isDespesa(t.tipo) &&
              t.categoria
          )
          .forEach((t) => {
            categorias[t.categoria] =
              (categorias[t.categoria] || 0) +
              Math.abs(Number(t.valor || 0));
          });

        const totalGastos = Object.values(categorias).reduce(
          (a, b) => a + b,
          0
        );

        const cores = [
          "#3ac97e",
          "#f59e0b",
          "#3b82f6",
          "#8b5cf6",
          "#e85555",
          "#06b6d4",
        ];

        const gastosArr = Object.entries(categorias)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([nome, valor], i) => ({
            nome,
            valor,
            percentual:
              totalGastos > 0
                ? Math.round((valor / totalGastos) * 100)
                : 0,
            cor: cores[i % cores.length],
          }));

        setGastosPorCategoria(gastosArr);
      }
    } catch (e) {
      console.error(
        "Erro ao carregar finanças:",
        e.message
      );
    } finally {
      setCarregando(false);
    }
  }

  // Salvar salário
  async function salvarSalario(valor) {
    const usuarioId = await AsyncStorage.getItem("usuarioId");

    if (!usuarioId) return;

    await AsyncStorage.setItem(
      `salario_${usuarioId}`,
      String(valor)
    );

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

    // helpers
    isReceita,
    isDespesa,
  };
}