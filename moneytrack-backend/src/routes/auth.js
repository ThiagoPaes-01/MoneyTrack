const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const supabase = require('../../supabase');

// Cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, password } = req.body;
  try {
    const { data: existe } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (existe) return res.status(400).json({ erro: 'E-mail já cadastrado' });

    const senha = await bcrypt.hash(password, 10);
    const { data: user, error } = await supabase
      .from('usuarios')
      .insert({ nome, email, senha })
      .select()
      .single();

    if (error) return res.status(500).json({ erro: error.message });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, usuario: { nome, email } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) return res.status(400).json({ erro: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(password, user.senha);
    if (!senhaCorreta) return res.status(400).json({ erro: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, usuario: { nome: user.nome, email } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;