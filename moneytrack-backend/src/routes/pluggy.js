const express = require("express");
const router = express.Router();

const pluggy = require("../pluggy");
const supabase = require("../../supabase");

// ── Gera API Token via autenticação com Client ID e Secret ────────
async function getApiToken() {
  const resp = await fetch("https://api.pluggy.ai/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET,
    }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error("Erro ao gerar API token: " + (err.message || resp.status));
  }

  const data = await resp.json();
  return data.apiKey || data.accessToken || data.token;
}

// ── Busca transações usando API v2 com cursor pagination ──────────
async function fetchTransacoesV2(accountId, apiToken, from) {
  const allTxns = [];
  let cursor = null;

  do {
    const url = new URL("https://api.pluggy.ai/v2/transactions");
    url.searchParams.set("accountId", accountId);
    if (cursor) url.searchParams.set("cursor", cursor);

    const resp = await fetch(url.toString(), {
      headers: {
        "X-API-KEY": apiToken,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${resp.status}`);
    }

    const data = await resp.json();
    const results = data.results || data.data || data.transactions || [];
    allTxns.push(...results);
    cursor = data.nextCursor || data.cursor || data.next || null;

    // Para o loop se já passou da data limite
    const oldest = results.length > 0 ? results[results.length - 1] : null;
    if (oldest && oldest.date && oldest.date < from) break;

  } while (cursor);

  // Filtra só os últimos 90 dias
  return allTxns.filter(t => !t.date || t.date >= from);
}

// ── Normaliza o tipo da transação conforme o tipo da conta ────────
// Pluggy v2 para cartão de crédito: DEBIT = gasto (deve aparecer como DEBIT)
// Pluggy v2 para cartão de crédito: CREDIT = pagamento da fatura (receita)
// Pluggy v2 para conta corrente:    CREDIT = entrada, DEBIT = saída
// PORÉM na prática a Pluggy às vezes inverte para cartão de crédito,
// então usamos o sinal do amount como fonte da verdade quando disponível.
function normalizarTipo(transaction, accountType) {
  const tipoOriginal = (transaction.type || "").toUpperCase();
  const amount = transaction.amount;
  const isCartao = accountType === "CREDIT_CARD" || accountType === "CREDIT";

  // Se o amount tiver sinal, ele é a fonte da verdade
  if (typeof amount === "number" && amount !== 0) {
    if (isCartao) {
      // No cartão: amount negativo = gasto (DEBIT), positivo = pagamento (CREDIT)
      return amount < 0 ? "DEBIT" : "CREDIT";
    } else {
      // Na conta corrente: amount positivo = entrada (CREDIT), negativo = saída (DEBIT)
      return amount > 0 ? "CREDIT" : "DEBIT";
    }
  }

  // Fallback: usa o type da transação, mas inverte para cartão se necessário
  if (isCartao) {
    // Na Pluggy v2, gastos no cartão chegam como DEBIT → mantém como DEBIT
    // Pagamentos de fatura chegam como CREDIT → mantém como CREDIT
    return tipoOriginal === "CREDIT" ? "CREDIT" : "DEBIT";
  }

  return tipoOriginal === "CREDIT" ? "CREDIT" : "DEBIT";
}

// ── Gera o connectToken ───────────────────────────────────────────
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

// ── Recebe o itemId e salva contas, transações e empréstimos ──────
router.post("/item", async (req, res) => {
  const { itemId, usuarioId } = req.body;

  if (!itemId || !usuarioId) {
    return res.status(400).json({ erro: "itemId e usuarioId são obrigatórios" });
  }

  try {
    const apiToken = await getApiToken();
    console.log("API TOKEN gerado com sucesso");

    // ── Contas ────────────────────────────────────────────────────
    const { results: accounts } = await pluggy.fetchAccounts(itemId);
    console.log(`Contas encontradas: ${accounts.length}`);

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

      // ── Transações via API v2 ─────────────────────────────────
      const from = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      try {
        const txns = await fetchTransacoesV2(account.id, apiToken, from);
        console.log(`Transações encontradas para ${account.name} (${account.type}): ${txns.length}`);

        if (txns && txns.length > 0) {
          const rows = txns.map((t) => {
            // ✅ FIX: usa o tipo de conta para normalizar corretamente o CREDIT/DEBIT
            const tipo = normalizarTipo(t, account.type);

            return {
              id: t.id,
              account_id: account.id,
              usuario_id: usuarioId,
              descricao: t.description,
              valor: Math.abs(t.amount),
              data: t.date ? t.date.split("T")[0] : null,
              categoria: t.category,
              tipo,
            };
          });

          const { error: txnError } = await supabase
            .from("transactions")
            .upsert(rows);

          if (txnError) {
            console.error("Erro ao salvar transações:", txnError.message);
          } else {
            console.log(`✅ ${rows.length} transações salvas para ${account.name}`);
          }
        }
      } catch (txnErr) {
        console.error("Erro ao buscar transações v2:", txnErr.message);
      }
    }

    // ── Empréstimos ───────────────────────────────────────────────
    let totalLoans = 0;
    try {
      const { results: loans } = await pluggy.fetchLoans(itemId);

      if (loans && loans.length > 0) {
        totalLoans = loans.length;

        const loanRows = loans.map((loan) => {
          // ✅ FIX: campos corretos da API Pluggy para parcelas
          const paidQty =
            loan.installments?.paidQuantity ??
            loan.installments?.paidCount ??
            0;
          const totalQty =
            loan.installments?.quantity ??
            loan.installments?.totalCount ??
            loan.installments?.count ??
            0;

          // ✅ FIX: campos corretos para saldo devedor
          const saldoDevedor =
            loan.outstandingBalance ??
            loan.balance ??
            loan.remainingBalance ??
            loan.remainingAmount ??
            0;

          return {
            id: loan.id,
            usuario_id: usuarioId,
            item_id: itemId,
            nome: loan.name || loan.type || "Empréstimo",
            tipo: loan.type || "LOAN",
            valor_contrato:
              loan.contractAmount ?? loan.totalAmount ?? loan.amount ?? 0,
            saldo_devedor: saldoDevedor,
            parcelas: totalQty > 0 ? `${paidQty}/${totalQty}` : null,
          };
        });

        const { error: loanError } = await supabase.from("loans").upsert(loanRows);
        if (loanError) console.error("Erro ao salvar empréstimos:", loanError.message);
        else console.log(`✅ ${loanRows.length} empréstimos salvos`);
      }
    } catch (loanErr) {
      console.warn("Empréstimos não disponíveis:", loanErr.message);
    }

    res.json({ ok: true, contas: accounts.length, emprestimos: totalLoans });
  } catch (err) {
    console.error("Erro no /pluggy/item:", err.message);
    res.status(500).json({ erro: err.message });
  }
});

// ── Busca empréstimos do usuário ──────────────────────────────────
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