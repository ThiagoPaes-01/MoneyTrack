const express = require("express");
const router = express.Router();

const pluggy = require("../pluggy");
const supabase = require("../../supabase");

// Gera o connectToken para abrir o widget no app
router.post("/connect-token", async (req, res) => {
  try {
    const token = await pluggy.createConnectToken();

    console.log("TOKEN GERADO:");
    console.log(token);

    res.json({
      connectToken: token.accessToken || token.connectToken,
    });
  } catch (err) {
    console.log("ERRO CONNECT TOKEN:");
    console.log(err.response?.body || err);

    res.status(500).json({
      erro: err.message,
    });
  }
});

// Recebe o itemId após o usuário conectar o banco no widget
router.post("/item", async (req, res) => {
  const { itemId, usuarioId } = req.body;

  if (!itemId || !usuarioId) {
    return res.status(400).json({
      erro: "itemId e usuarioId são obrigatórios",
    });
  }

  try {
    // Busca contas vinculadas ao item conectado
    const { results: accounts } = await pluggy.fetchAccounts(itemId);

    for (const account of accounts) {
      // Salva conta no Supabase
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

      // Busca transações dos últimos 30 dias
      const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const { results: txns } = await pluggy.fetchTransactions(account.id, {
        from,
      });

      if (txns.length > 0) {
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

        if (txnError) {
          console.error("Erro ao salvar transações:", txnError.message);
        }
      }
    }

    res.json({
      ok: true,
      contas: accounts.length,
    });
  } catch (err) {
    console.error("Erro no /pluggy/item:", err.message);

    res.status(500).json({
      erro: err.message,
    });
  }
});

module.exports = router;
