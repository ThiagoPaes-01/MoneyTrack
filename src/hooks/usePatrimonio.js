// src/hooks/usePatrimonio.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

export function usePatrimonio() {
  const [patrimonios, setPatrimonios] = useState([]);
  const [loans, setLoans] = useState([]);
  const [contasCredito, setContasCredito] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioId");
      if (!usuarioId) return;

      // Busca patrimônios cadastrados
      const { data: pats } = await supabase
        .from("patrimonios")
        .select("*")
        .eq("usuario_id", usuarioId)
        .order("criado_em", { ascending: false });

      if (pats) setPatrimonios(pats);

      // Busca empréstimos/financiamentos
      const { data: loansData } = await supabase
        .from("loans")
        .select("*")
        .eq("usuario_id", usuarioId);

      if (loansData) setLoans(loansData);

      // Busca contas de crédito (cartão) — saldo negativo = dívida
      const { data: contas } = await supabase
        .from("accounts")
        .select("id, nome, tipo, saldo, numero")
        .eq("usuario_id", usuarioId)
        .eq("tipo", "CREDIT");

      if (contas) setContasCredito(contas);
    } catch (e) {
      console.error("Erro ao carregar patrimônio:", e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarPatrimonio(nome, valor) {
    const usuarioId = await AsyncStorage.getItem("usuarioId");
    if (!usuarioId) return;

    const { data, error } = await supabase
      .from("patrimonios")
      .insert({ usuario_id: usuarioId, nome, valor })
      .select()
      .single();

    if (!error && data) {
      setPatrimonios((prev) => [data, ...prev]);
    }
    return { error };
  }

  async function removerPatrimonio(id) {
    const { error } = await supabase.from("patrimonios").delete().eq("id", id);
    if (!error) setPatrimonios((prev) => prev.filter((p) => p.id !== id));
    return { error };
  }

  // Cálculos
  const totalPatrimonio = patrimonios.reduce(
    (acc, p) => acc + (p.valor || 0),
    0,
  );
  const totalLoans = loans.reduce((acc, l) => acc + (l.saldo_devedor || 0), 0);
  const totalCartao = contasCredito.reduce(
    (acc, c) => acc + Math.abs(Math.min(c.saldo || 0, 0)),
    0,
  );
  const totalDividas = totalLoans + totalCartao;
  const saldoLiquido = totalPatrimonio - totalDividas;

  // Status: azul (sobra), zero (empata), vermelho (falta)
  const status =
    saldoLiquido > 100 ? "azul" : saldoLiquido >= -100 ? "zero" : "vermelho";

  return {
    patrimonios,
    loans,
    contasCredito,
    carregando,
    totalPatrimonio,
    totalLoans,
    totalCartao,
    totalDividas,
    saldoLiquido,
    status,
    adicionarPatrimonio,
    removerPatrimonio,
    recarregar: carregar,
  };
}
