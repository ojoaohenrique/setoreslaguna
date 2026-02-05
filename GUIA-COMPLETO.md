# 🏛️ Chat de Atendimento Digital - Prefeitura de Laguna

## Sistema Completo com Backend + ChatGPT API

---

## 📚 Sumário Executivo

Este documento descreve a **arquitetura completa e profissional** do Chat de Atendimento Digital da Prefeitura de Laguna, integrado com a API do ChatGPT (OpenAI).

### ✅ O que foi implementado:

1. **Backend Node.js + Express** - API REST segura
2. **Integração com ChatGPT** - Respostas inteligentes via OpenAI
3. **Sistema de Segurança** - Rate limiting, validação, logs
4. **Frontend Atualizado** - Comunicação com backend via API
5. **Documentação Completa** - Guias de instalação e deploy

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    USUÁRIO CIDADÃO                      │
│              (Navegador Web / Mobile)                   │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (HTML/CSS/JS)                 │
│  - Interface visual moderna                             │
│  - Comunicação via fetch API                            │
│  - Validação de entrada                                 │
└────────────────────┬────────────────────────────────────┘
                     │ REST API (JSON)
                     ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Camada de Segurança                             │   │
│  │ - Rate Limiting (50 req/15min)                  │   │
│  │ - CORS (origens autorizadas)                    │   │
│  │ - Helmet (headers seguros)                      │   │
│  │ - Validação de dados                            │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Camada de Lógica                                │   │
│  │ - Identificação de setor                        │   │
│  │ - Contextualização da conversa                  │   │
│  │ - Histórico de mensagens                        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Camada de Logs                                  │   │
│  │ - Winston (logs rotativos)                      │   │
│  │ - Auditoria de requisições                      │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ API Key protegida
                     ▼
┌─────────────────────────────────────────────────────────┐
│              OPENAI API (ChatGPT)                       │
│  - GPT-4 Turbo ou GPT-3.5 Turbo                        │
│  - Respostas contextualizadas                          │
│  - Linguagem institucional                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Instalação Rápida

### 1. Backend

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
nano .env  # Adicionar OPENAI_API_KEY

# Iniciar servidor
npm run dev
```

### 2. Frontend

Abra o arquivo `index.html` no navegador ou use um servidor local:

```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (http-server)
npx http-server -p 8000

# Opção 3: VS Code Live Server
# Clique direito em index.html → Open with Live Server
```

Acesse: `http://localhost:8000`

---

## 🔑 Configuração da API OpenAI

### Passo 1: Criar Conta

1. Acesse: https://platform.openai.com/
2. Crie uma conta ou faça login
3. Adicione método de pagamento (necessário para usar a API)

### Passo 2: Obter API Key

1. Vá em **API Keys** no menu lateral
2. Clique em **Create new secret key**
3. Dê um nome (ex: "Chat Laguna")
4. Copie a chave (começa com `sk-proj-...`)

### Passo 3: Configurar no Backend

Edite o arquivo `backend/.env`:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:8000
```

⚠️ **NUNCA compartilhe ou commite sua API Key!**

---

## 📊 Estrutura de Arquivos

```
chat-laguna/
├── backend/                    # API Node.js
│   ├── config/
│   │   └── logger.js          # Configuração de logs
│   ├── data/
│   │   └── knowledgeBase.js   # Base de conhecimento
│   ├── middleware/
│   │   ├── rateLimiter.js     # Rate limiting
│   │   └── validator.js       # Validação
│   ├── routes/
│   │   └── chat.routes.js     # Rotas da API
│   ├── services/
│   │   └── chatgpt.service.js # Integração ChatGPT
│   ├── logs/                  # Logs (gerado auto)
│   ├── .env                   # Configurações (NÃO COMMITAR)
│   ├── .env.example           # Exemplo de config
│   ├── package.json
│   ├── server.js              # Servidor principal
│   └── README.md              # Documentação backend
│
├── frontend/                   # Interface do usuário
│   ├── js/
│   │   ├── chat-api.js        # Cliente da API
│   │   └── chat-ui.js         # Interface do chat
│   ├── assets/                # Imagens e logos
│   ├── index.html             # Página principal
│   └── styles.css             # Estilos
│
├── GUIA-COMPLETO.md           # Este arquivo
└── README.md                  # Documentação geral
```

---

## 🔒 Segurança Implementada

### 1. Proteção da API Key

✅ **API Key NUNCA exposta ao frontend**
- Armazenada apenas no backend (arquivo `.env`)
- Não commitada no Git (`.gitignore`)
- Requisições ao ChatGPT feitas apenas pelo servidor

### 2. Rate Limiting

✅ **Proteção contra abuso**
- 50 requisições por IP a cada 15 minutos (geral)
- 10 mensagens por minuto no chat
- Mensagens de erro amigáveis

### 3. Validação de Dados

✅ **Sanitização de entrada**
- Validação com `express-validator`
- Escape de HTML (proteção XSS)
- Limite de 1000 caracteres por mensagem
- Histórico limitado a 20 mensagens

### 4. Headers de Segurança

✅ **Helmet.js configurado**
- Proteção contra clickjacking
- XSS protection
- Content Security Policy
- CORS restrito a origens autorizadas

### 5. Logs de Auditoria

✅ **Rastreamento completo**
- Todas as requisições logadas
- IPs e user-agents registrados
- Tentativas de abuso identificadas
- Logs rotativos (máx 5MB)

---

## 💡 Como Funciona

### Fluxo de uma Mensagem

1. **Usuário digita mensagem** no frontend
2. **Frontend valida** e envia para backend via POST
3. **Backend recebe** e aplica rate limiting
4. **Backend valida** dados (tamanho, formato)
5. **Backend identifica setor** relacionado (opcional)
6. **Backend monta prompt** com contexto da Prefeitura
7. **Backend envia** para ChatGPT API
8. **ChatGPT processa** e retorna resposta
9. **Backend formata** resposta
10. **Backend retorna** JSON para frontend
11. **Frontend exibe** resposta ao usuário

### Exemplo de Prompt Enviado ao ChatGPT

```
SISTEMA:
Você é o assistente virtual oficial da Prefeitura Municipal de Laguna, SC.

DIRETRIZES:
- Seja educado, claro e objetivo
- Use linguagem institucional mas acessível
- Responda APENAS sobre serviços da Prefeitura
- NÃO invente informações
- Sempre indique horários de atendimento

SETORES:
1. Guarda Municipal - Segurança...
2. Secretaria de Saúde - Atendimento SUS...
[...]

USUÁRIO:
Como faço para tirar o cartão do SUS?

ASSISTENTE:
[Resposta contextualizada do ChatGPT]
```

---

## 💰 Custos e Otimização

### Modelos Disponíveis

| Modelo | Input | Output | Qualidade | Recomendação |
|--------|-------|--------|-----------|--------------|
| GPT-4 Turbo | $0.01/1K | $0.03/1K | ⭐⭐⭐⭐⭐ | Produção |
| GPT-3.5 Turbo | $0.0005/1K | $0.0015/1K | ⭐⭐⭐⭐ | Economia |

### Estimativa de Custos

**Cenário: Prefeitura de médio porte**
- 500 mensagens/dia
- 250 tokens médios/mensagem
- 30 dias/mês

**Com GPT-4 Turbo:**
- Custo mensal: ~$30-50

**Com GPT-3.5 Turbo:**
- Custo mensal: ~$2-5

### Dicas de Economia

1. **Use GPT-3.5** para economia (qualidade ainda excelente)
2. **Reduza max_tokens** em `chatgpt.service.js`
3. **Implemente cache** para perguntas frequentes
4. **Monitore uso** no dashboard da OpenAI

---

## 🚀 Deploy em Produção

### Opção 1: Servidor Próprio (Recomendado)

**Vantagens:**
- Controle total
- Sem custos de hospedagem externa
- Dados no Brasil

**Requisitos:**
- Servidor Linux (Ubuntu/Debian)
- 1GB RAM mínimo
- Node.js 16+
- Nginx (proxy reverso)

**Passos:**

```bash
# 1. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Clonar projeto
git clone <repositorio>
cd chat-laguna/backend

# 3. Instalar dependências
npm install --production

# 4. Configurar .env
nano .env

# 5. Instalar PM2
sudo npm install -g pm2

# 6. Iniciar
pm2 start server.js --name chat-laguna
pm2 startup
pm2 save

# 7. Configurar Nginx
sudo nano /etc/nginx/sites-available/chat-laguna
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name chat.laguna.sc.gov.br;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        root /var/www/chat-laguna/frontend;
        try_files $uri $uri/ /index.html;
    }
}
```

**SSL (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d chat.laguna.sc.gov.br
```

---

### Opção 2: Heroku (Teste/Desenvolvimento)

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create chat-laguna

# Configurar variáveis
heroku config:set OPENAI_API_KEY=sk-xxx
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

---

## 📈 Monitoramento

### Logs

```bash
# Ver logs em tempo real
pm2 logs chat-laguna

# Ver últimas 100 linhas
pm2 logs chat-laguna --lines 100

# Ver apenas erros
pm2 logs chat-laguna --err
```

### Métricas Importantes

1. **Taxa de erro**: < 1%
2. **Tempo de resposta**: < 3 segundos
3. **Tokens usados**: Monitorar custos
4. **Rate limits**: Ajustar se necessário

### Dashboard OpenAI

Acesse: https://platform.openai.com/usage

Monitore:
- Tokens consumidos
- Custos diários/mensais
- Erros de API

---

## 🛠️ Manutenção

### Atualizar Base de Conhecimento

Edite `backend/data/knowledgeBase.js`:

```javascript
saude: {
    nome: "Secretaria de Saúde",
    descricao: "Nova descrição...",
    servicos: [
        "Novo serviço aqui"
    ]
}
```

Reinicie o servidor:
```bash
pm2 restart chat-laguna
```

### Ajustar Comportamento do ChatGPT

Edite `backend/services/chatgpt.service.js`:

```javascript
// Alterar temperatura (0-2)
temperature: 0.7,  // Mais criativo: 1.5, Mais preciso: 0.3

// Alterar tokens máximos
max_tokens: 500,  // Respostas mais curtas: 300

// Alterar modelo
this.model = 'gpt-3.5-turbo';  // Mais econômico
```

---

## ❓ FAQ

### 1. Quanto custa rodar este sistema?

**Backend:** Grátis (servidor próprio) ou ~$7/mês (Heroku)
**OpenAI:** $2-50/mês (dependendo do uso e modelo)
**Total:** ~$10-60/mês

### 2. Preciso de conhecimento técnico?

Para **instalar**: Básico (seguir o guia)
Para **manter**: Intermediário (ajustar configurações)
Para **desenvolver**: Avançado (Node.js, APIs)

### 3. É seguro para uso institucional?

✅ **SIM!** Implementamos:
- Rate limiting
- Validação de dados
- Logs de auditoria
- API Key protegida
- Headers de segurança

### 4. Posso usar sem internet?

❌ **NÃO.** O sistema precisa de conexão com a API do ChatGPT.

### 5. Os dados dos cidadãos são armazenados?

Por padrão, **NÃO armazenamos conversas**. Apenas logs técnicos.
Para armazenar, você precisaria implementar um banco de dados.

### 6. Posso personalizar as respostas?

✅ **SIM!** Edite o prompt do sistema em `chatgpt.service.js`

---

## 📞 Suporte

**Documentação:**
- Backend: `backend/README.md`
- Este guia: `GUIA-COMPLETO.md`

**Links Úteis:**
- OpenAI Docs: https://platform.openai.com/docs
- Node.js Docs: https://nodejs.org/docs
- Express Docs: https://expressjs.com

**Contato:**
- Email: ti@laguna.sc.gov.br

---

## 📄 Licença

© 2024 Prefeitura Municipal de Laguna - SC
Uso restrito para fins institucionais.

---

## ✅ Checklist de Implementação

- [ ] Backend instalado e rodando
- [ ] API Key do OpenAI configurada
- [ ] Frontend conectado ao backend
- [ ] Teste de envio de mensagem funcionando
- [ ] Rate limiting testado
- [ ] Logs sendo gerados corretamente
- [ ] Deploy em servidor de produção
- [ ] SSL configurado (HTTPS)
- [ ] Monitoramento ativo
- [ ] Backup de configurações
- [ ] Documentação entregue à equipe

---

**Desenvolvido com ❤️ para a Prefeitura de Laguna**
