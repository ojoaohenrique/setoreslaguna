require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./config/logger');
const { apiLimiter } = require('./middleware/rateLimiter');
const chatRoutes = require('./routes/chat.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES DE SEGURANÇA =====

// Helmet - Headers de segurança
app.use(helmet());

// CORS - Permite apenas origens autorizadas
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback) {
        // Permite requisições sem origin (mobile apps, Postman, etc)
        if (!origin) return callback(null, true);

        // Permite Origin "null" quando o frontend é aberto via file:// (somente em development)
        if (origin === 'null' && (process.env.NODE_ENV || 'development') !== 'production') {
            return callback(null, true);
        }
        
        if (allowedOrigins.indexOf(origin) === -1) {
            logger.warn('Origem bloqueada por CORS', { origin });
            return callback(new Error('Não permitido por CORS'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Body parser
app.use(express.json({ limit: '10kb' })); // Limita tamanho do body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting geral
app.use('/api/', apiLimiter);

// Logging de requisições
app.use((req, res, next) => {
    logger.info('Requisição recebida', {
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
});

// ===== ROTAS =====

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Chat Laguna - Prefeitura Municipal',
        version: '1.0.0',
        endpoints: {
            chat: '/api/chat/message',
            setores: '/api/chat/setores',
            health: '/api/chat/health'
        }
    });
});

// Rotas do chat
app.use('/api/chat', chatRoutes);

// ===== TRATAMENTO DE ERROS =====

// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Rota não encontrada'
    });
});

// Handler de erros global
app.use((err, req, res, next) => {
    logger.error('Erro não tratado', {
        error: err.message,
        stack: err.stack,
        path: req.path
    });

    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? 'Erro interno do servidor' 
            : err.message
    });
});

// ===== INICIALIZAÇÃO DO SERVIDOR =====

app.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
    logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🏛️  Chat Laguna API - Prefeitura Municipal        ║
║                                                       ║
║   🚀 Servidor: http://localhost:${PORT}                ║
║   📚 Docs: http://localhost:${PORT}/api/chat/health    ║
║   🔒 Ambiente: ${process.env.NODE_ENV || 'development'}                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection', { error: err.message, stack: err.stack });
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
    process.exit(1);
});

module.exports = app;
