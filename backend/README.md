# 🏛️ Chat Laguna - Backend API

Backend Node.js + Express para o Chat de Atendimento Digital da Prefeitura de Laguna, integrado com a API do ChatGPT (OpenAI).

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Segurança](#segurança)
- [Deploy](#deploy)

---

## 🏗️ Arquitetura

```
backend/
├── config/
│   └── logger.js           # Configuração de logs (Winston)
├── data/
│   └── knowledgeBase.js    # Base de conhecimento dos setores
├── middleware/
│   ├── rateLimiter.js      # Rate limiting
│   └── validator.js        # Validação de dados
├── routes/
│   └── chat.routes.js      # Rotas da API
├── services/
│   └── chatgpt.service.js  # Integração com ChatGPT
├── logs/                   # Logs do sistema (gerado automaticamente)
├── .env                    # Variáveis de ambiente (NÃO COMMITAR)
├── .env.example            # Exemplo de configuração
├── package.json
└── server.js               # Servidor principal
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Chave da API OpenAI** ([Obter aqui](https://platform.openai.com/api-keys))

### Passo a passo

1. **Navegue até a pasta backend:**
```bash
cd backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

4. **Edite o arquivo `.env`** e adicione sua chave da API:
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=3000
NODE_ENV=development
```

5. **Inicie o servidor:**
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

---

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `OPENAI_API_KEY` | Chave da API OpenAI | **OBRIGATÓRIO** |
| `PORT` | Porta do servidor | 3000 |
| `NODE_ENV` | Ambiente (development/production) | development |
| `ALLOWED_ORIGINS` | Origens permitidas (CORS) | http://localhost:3000 |
| `RATE_LIMIT_MAX` | Máx. requisições por 15min | 50 |
| `LOG_LEVEL` | Nível de log (info/warn/error) | info |

### Obter Chave da API OpenAI

1. Acesse: https://platform.openai.com/
2. Crie uma conta ou faça login
3. Vá em **API Keys** → **Create new secret key**
4. Copie a chave e cole no `.env`

⚠️ **IMPORTANTE:** Nunca compartilhe ou commite sua chave da API!

---

## 📡 Endpoints

### POST `/api/chat/message`

Envia mensagem do usuário e retorna resposta do ChatGPT.

**Request:**
```json
{
  "message": "Como faço para tirar o cartão do SUS?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Olá"
    },
    {
      "role": "assistant",
      "content": "Olá! Como posso ajudar?"
    }
  ]
}
```

**Response (sucesso):**
```json
{
  "success": true,
  "response": "Para tirar o Cartão do SUS, você deve procurar...",
  "setor": "Secretaria de Saúde",
  "tokensUsed": 245
}
```

**Response (erro):**
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

---

### GET `/api/chat/setores`

Retorna lista de setores da Prefeitura.

**Response:**
```json
{
  "success": true,
  "setores": [
    {
      "nome": "Secretaria de Saúde",
      "icone": "fas fa-heartbeat",
      "descricao": "Coordena e executa as políticas..."
    }
  ]
}
```

---

### GET `/api/chat/health`

Verifica se a API está online.

**Response:**
```json
{
  "success": true,
  "status": "online",
  "timestamp": "2024-01-09T20:00:00.000Z"
}
```

---

## 🔒 Segurança

### Medidas Implementadas

✅ **Rate Limiting**
- 50 requisições por IP a cada 15 minutos (geral)
- 10 mensagens por minuto no chat (evita abuso da API)

✅ **Validação de Dados**
- Validação de entrada com `express-validator`
- Sanitização contra XSS
- Limite de 1000 caracteres por mensagem

✅ **Headers de Segurança**
- Helmet.js configurado
- CORS restrito a origens autorizadas

✅ **Proteção da API Key**
- API Key nunca exposta ao frontend
- Armazenada em variável de ambiente
- Não commitada no Git

✅ **Logs de Segurança**
- Todas as requisições logadas
- Tentativas de abuso registradas
- Logs rotativos (máx 5MB por arquivo)

---

## 🚀 Deploy

### Opção 1: Servidor VPS (Recomendado para Prefeitura)

1. **Servidor Linux (Ubuntu/Debian):**
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar projeto
git clone <repositorio>
cd chat-laguna/backend

# Instalar dependências
npm install --production

# Configurar .env
nano .env

# Instalar PM2 (gerenciador de processos)
sudo npm install -g pm2

# Iniciar aplicação
pm2 start server.js --name chat-laguna

# Configurar para iniciar no boot
pm2 startup
pm2 save
```

2. **Configurar Nginx como proxy reverso:**
```nginx
server {
    listen 80;
    server_name chat.laguna.sc.gov.br;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Configurar SSL (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d chat.laguna.sc.gov.br
```

---

### Opção 2: Heroku (Desenvolvimento/Teste)

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

### Opção 3: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build
docker build -t chat-laguna-backend .

# Run
docker run -p 3000:3000 --env-file .env chat-laguna-backend
```

---

## 📊 Monitoramento

### Logs

Os logs são salvos em:
- `logs/combined.log` - Todos os logs
- `logs/error.log` - Apenas erros

Visualizar logs em tempo real:
```bash
# Com PM2
pm2 logs chat-laguna

# Diretamente
tail -f logs/combined.log
```

### Métricas Importantes

- **Taxa de erro**: Deve ser < 1%
- **Tempo de resposta**: Média < 3s
- **Tokens usados**: Monitorar custos na OpenAI
- **Rate limits atingidos**: Ajustar se necessário

---

## 💰 Custos (OpenAI)

**GPT-4 Turbo:**
- Input: $0.01 / 1K tokens
- Output: $0.03 / 1K tokens

**GPT-3.5 Turbo (mais econômico):**
- Input: $0.0005 / 1K tokens
- Output: $0.0015 / 1K tokens

**Estimativa para Prefeitura:**
- ~500 mensagens/dia
- ~250 tokens/mensagem
- **Custo mensal:** ~$15-50 (dependendo do modelo)

Para economizar, altere em `chatgpt.service.js`:
```javascript
this.model = 'gpt-3.5-turbo'; // Mais barato
```

---

## 🛠️ Troubleshooting

### Erro: "OPENAI_API_KEY não configurada"
✅ Verifique se o arquivo `.env` existe e contém a chave

### Erro: "Failed to fetch"
✅ Verifique se o backend está rodando
✅ Verifique CORS no `.env`

### Rate limit excedido
✅ Ajuste `RATE_LIMIT_MAX` no `.env`
✅ Implemente autenticação de usuários

### Custos muito altos
✅ Use GPT-3.5 ao invés de GPT-4
✅ Reduza `max_tokens` em `chatgpt.service.js`
✅ Implemente cache de respostas comuns

---

## 📞 Suporte

Para dúvidas ou problemas:
- Email: ti@laguna.sc.gov.br
- Documentação OpenAI: https://platform.openai.com/docs

---

## 📄 Licença

© 2024 Prefeitura Municipal de Laguna - SC
Uso restrito para fins institucionais.
