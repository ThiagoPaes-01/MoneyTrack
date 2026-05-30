const express = require("express");
const router = express.Router();

const pluggy = require("../pluggy");
const supabase = require("../../supabase");

// Gera o connectToken
router.post("/connect-token", async (req, res) => {
  try {
    const token = await pluggy.createConnectToken();
    console.log("TOKEN GERADO:", token);
    res.json({ connectToken: token.accessToken || token.connectToken });
  } catch (err) {
    console.error("ERRO CONNECT TOKEN:", err.response?.body || err);
    res.status(500).json({ erro: err.message });
  }
});

// Recebe o itemId e salva contas, transações e empréstimos
router.post("/item", async (req, res) => {
  const { itemId, usuarioId } = req.body;

  if (!itemId || !usuarioId) {
    return res
      .status(400)
      .json({ erro: "itemId e usuarioId são obrigatórios" });
  }

  try {
    // ── Contas e Transações ───────────────────────────────────────
    const { results: accounts } = await pluggy.fetchAccounts(itemId);

    for (const account of accounts) {
      const { error: accError } = await supabase.from("accounts").upsert({
        id: account.id,
        usuario_id: usuarioId,
        item_id: itemId,
        nome: account.name,
        tipo: account.type,
        saldo: account.balance,
        numero: account.number,
      });

      if (accError) {
        console.error("Erro ao salvar conta:", accError.message);
        continue;
      }

      const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const { results: txns } = await pluggy.fetchTransactions(account.id, {
        from,
      });

      if (txns && txns.length > 0) {
        const rows = txns.map((t) => ({
          id: t.id,
          account_id: account.id,
          usuario_id: usuarioId,
          descricao: t.description,
          valor: t.amount,
          data: t.date,
          categoria: t.category,
          tipo: t.type,
        }));

        const { error: txnError } = await supabase
          .from("transactions")
          .upsert(rows);
        if (txnError)
          console.error("Erro ao salvar transações:", txnError.message);
      }
    }

    // ── Empréstimos / Financiamentos ──────────────────────────────
    let totalLoans = 0;
    try {
      const { results: loans } = await pluggy.fetchLoans(itemId);

      if (loans && loans.length > 0) {
        totalLoans = loans.length;

        const loanRows = loans.map((loan) => ({
          id: loan.id,
          usuario_id: usuarioId,
          item_id: itemId,
          nome: loan.name || loan.type || "Empréstimo",
          tipo: loan.type || "LOAN",
          valor_contrato: loan.contractAmount || loan.totalAmount || 0,
          saldo_devedor: loan.outstandingBalance || loan.remainingAmount || 0,
          parcelas: loan.installments
            ? `${loan.installments.paidCount || 0}/${loan.installments.totalCount || 0}`
            : null,
        }));

        const { error: loanError } = await supabase
          .from("loans")
          .upsert(loanRows);
        if (loanError)
          console.error("Erro ao salvar empréstimos:", loanError.message);
      }
    } catch (loanErr) {
      // Pluggy Sandbox pode não ter fetchLoans — não quebra o fluxo
      console.warn("Empréstimos não disponíveis:", loanErr.message);
    }

    res.json({ ok: true, contas: accounts.length, emprestimos: totalLoans });
  } catch (err) {
    console.error("Erro no /pluggy/item:", err.message);
    res.status(500).json({ erro: err.message });
  }
});

// Busca empréstimos do usuário
router.get("/loans/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("usuario_id", usuarioId);

    if (error) return res.status(500).json({ erro: error.message });
    res.json({ loans: data || [] });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
