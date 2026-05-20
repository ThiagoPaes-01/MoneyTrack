// src/hooks/useFinancas.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

export function useFinancas() {
  const [saldoTotal, setSaldoTotal] = useState(null);
  const [salario, setSalario] = useState(null);
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
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

        console.log("usuarioId:", usuarioId);
        console.log("contas:", contas);
        console.log("erro:", contasError);

        if (contas) {
          const total = contas.reduce((acc, c) => acc + (c.saldo || 0), 0);
          setSaldoTotal(total);
        }

        // Busca salário salvo localmente
        const salarioSalvo = await AsyncStorage.getItem(`salario_${usuarioId}`);
        if (salarioSalvo) setSalario(parseFloat(salarioSalvo));

        // Busca últimas 10 transações
        const { data: txns } = await supabase
          .from("transactions")
          .select("id, descricao, valor, data, categoria, tipo")
          .eq("usuario_id", usuarioId)
          .order("data", { ascending: false })
          .limit(10);

        if (txns) setTransacoes(txns);
      } catch (e) {
        console.error("Erro ao carregar finanças:", e.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

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
  };
}
