const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');

// Cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, password } = req.body;
  try {
    const jaExiste = await User.findOne({ email });
    if (jaExiste) return res.status(400).json({ erro: 'E-mail já cadastrado' });

    const senhaCriptografada = await bcrypt.hash(password, 10);
    const user = await User.create({ nome, email, senha: senhaCriptografada });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, usuario: { nome, email } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ erro: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(password, user.senha);
    if (!senhaCorreta) return res.status(400).json({ erro: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, usuario: { nome: user.nome, email } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;