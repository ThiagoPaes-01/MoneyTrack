# 💸 MoneyTrack

Aplicativo de controle financeiro pessoal desenvolvido com React Native, Expo, Node.js e Supabase.

O objetivo do MoneyTrack é ajudar usuários a organizarem suas finanças, acompanharem gastos, visualizarem relatórios financeiros e integrarem contas bancárias utilizando Open Finance.

---

# 📱 Funcionalidades

- Cadastro e login de usuários
- Integração bancária com Pluggy (Open Finance)
- Visualização de contas bancárias
- Dashboard financeiro
- Histórico de movimentações
- Controle de receitas e despesas
- Interface responsiva para mobile e web
- Backend API REST
- Banco de dados Supabase

---

# 🛠️ Tecnologias Utilizadas

## Frontend

- React Native
- Expo
- React Navigation
- JavaScript

## Backend

- Node.js
- Express.js

## Banco de Dados

- Supabase
- PostgreSQL

## Integrações

- Pluggy API (Open Finance)

---

# 📂 Estrutura do Projeto

```txt
MONEYTRACK/
│
├── moneytrack-backend/
│   ├── src/
│   │   └── routes/
│   │       ├── index.js
│   │       └── pluggy.js
│   ├── .env
│   ├── package.json
│   └── supabase.js
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button/
│   │   ├── Funcionalidades/
│   │   ├── Input/
│   │   └── Link/
│   │
│   ├── hooks/
│   │   └── useFinancas.js
│   │
│   ├── lib/
│   │   └── supabase.js
│   │
│   ├── Global/
│   │   └── color.js
│   │
│   └── Page/
│       ├── Bancos/
│       ├── Cadastro/
│       ├── Inicial/
│       ├── Login/
│       └── Menu/
│
├── App.js
├── app.json
└── package.json
```

---

# ⚙️ Como executar o projeto

## 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/moneytrack.git
```

---

# 📦 Instalar dependências

## Frontend

```bash
npm install
```

## Backend

```bash
cd moneytrack-backend
npm install
```

---

# 🔐 Configuração das variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `moneytrack-backend`.

Exemplo:

```env
PLUGGY_CLIENT_ID=seu_client_id
PLUGGY_CLIENT_SECRET=seu_client_secret
SUPABASE_URL=sua_url
SUPABASE_KEY=sua_key
JWT_SECRET=seu_token
```

---

# ▶️ Executando o projeto

## Iniciar frontend

```bash
npx expo start
```

---

## Iniciar backend

```bash
cd moneytrack-backend
npm start
```

---

# 🗄️ Estrutura do Banco de Dados

## Tabela: accounts

```sql
create table accounts (
  id text primary key,
  usuario_id uuid references usuarios (id),
  item_id text,
  nome text,
  tipo text,
  saldo numeric,
  numero text,
  criado_em timestamptz default now()
);
```

---

## Tabela: transactions

```sql
create table transactions (
  id text primary key,
  account_id text references accounts (id),
  usuario_id uuid references usuarios (id),
  descricao text,
  valor numeric,
  data date,
  categoria text,
  tipo text
);
```

---

# 🔄 Fluxo do Sistema

1. Usuário realiza login ou cadastro
2. Usuário conecta banco pela Pluggy
3. Backend sincroniza contas e transações
4. Dados são armazenados no Supabase
5. Frontend exibe dashboard e relatórios

---

# 🚀 Sugestões de Deploy

## Frontend Web

- Vercel
- Netlify

## Frontend Mobile

- Expo EAS Build

## Backend

- Railway
- Render

## Banco de Dados

- Supabase

---

# 🔒 Segurança

- Autenticação JWT
- Variáveis sensíveis em `.env`
- Integração segura com Supabase
- Separação entre frontend e backend

---

# 📈 Próximas melhorias

- Importação de CSV
- Gráficos avançados
- Metas financeiras
- Alertas de gastos
- Relatórios exportáveis
- Inteligência financeira com IA

---

# 👨‍💻 Equipe

- Akon Nogueira Da Silva
- Eduardo Santos Lucio
- Thiago Paes Moreira
- Gabriel Gonçalves Ribeiro

---

# 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais.
