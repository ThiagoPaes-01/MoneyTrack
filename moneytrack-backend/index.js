require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const authRoutes = require('./src/routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () =>
  console.log('Servidor rodando na porta ' + process.env.PORT));
