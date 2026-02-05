const { body, validationResult } = require('express-validator');
const logger = require('../config/logger');

// Validação para mensagens do chat
const validateChatMessage = [
    body('message')
        .trim()
        .notEmpty().withMessage('Mensagem não pode estar vazia')
        .isLength({ min: 1, max: 1000 }).withMessage('Mensagem deve ter entre 1 e 1000 caracteres')
        .escape(),
    
    body('conversationHistory')
        .optional()
        .isArray().withMessage('Histórico deve ser um array')
        .custom((history) => {
            if (history && history.length > 20) {
                throw new Error('Histórico muito longo');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validação falhou', {
                errors: errors.array(),
                ip: req.ip
            });
            return res.status(400).json({
                success: false,
                error: 'Dados inválidos',
                details: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    validateChatMessage
};
