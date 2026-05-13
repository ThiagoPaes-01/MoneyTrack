require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const pluggyRoutes = require("./routes/pluggy");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/pluggy", pluggyRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`),
);
