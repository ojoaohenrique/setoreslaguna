const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

// Rate limiter para API geral
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX) || 50,
    message: {
        success: false,
        error: 'Muitas requisições deste IP. Tente novamente em 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('Rate limit excedido', {
            ip: req.ip,
            path: req.path
        });
        res.status(429).json({
            success: false,
            error: 'Muitas requisições. Por favor, aguarde alguns minutos.'
        });
    }
});

// Rate limiter mais restritivo para chat (evita abuso da API do ChatGPT)
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 10, // 10 mensagens por minuto
    message: {
        success: false,
        error: 'Você está enviando mensagens muito rapidamente. Aguarde um momento.'
    },
    skipSuccessfulRequests: false,
    handler: (req, res) => {
        logger.warn('Rate limit de chat excedido', {
            ip: req.ip,
            userAgent: req.get('user-agent')
        });
        res.status(429).json({
            success: false,
            error: 'Por favor, aguarde alguns segundos antes de enviar outra mensagem.'
        });
    }
});

module.exports = {
    apiLimiter,
    chatLimiter
};
