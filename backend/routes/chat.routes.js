const express = require('express');
const router = express.Router();
const chatGPTService = require('../services/chatgpt.service');
const knowledgeBase = require('../data/knowledgeBase');
const { validateChatMessage } = require('../middleware/validator');
const { chatLimiter } = require('../middleware/rateLimiter');
const logger = require('../config/logger');

/**
 * POST /api/chat/message
 * Envia mensagem do usuário e retorna resposta do ChatGPT
 */
router.post('/message', chatLimiter, validateChatMessage, async (req, res) => {
    try {
        const { message, conversationHistory } = req.body;

        logger.info('Nova mensagem recebida', {
            ip: req.ip,
            messageLength: message.length
        });

        // Identifica o setor relacionado (opcional, para contexto)
        const setor = await chatGPTService.identifySetor(message, knowledgeBase);

        // Envia para o ChatGPT
        const result = await chatGPTService.sendMessage(
            message,
            conversationHistory || [],
            setor
        );

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: result.error
            });
        }

        // Retorna resposta
        res.json({
            success: true,
            response: result.response,
            setor: setor ? setor.nome : null,
            tokensUsed: result.tokensUsed
        });

    } catch (error) {
        logger.error('Erro no endpoint de chat', {
            error: error.message,
            stack: error.stack
        });

        res.status(500).json({
            success: false,
            error: 'Erro ao processar mensagem. Tente novamente.'
        });
    }
});

/**
 * GET /api/chat/setores
 * Retorna lista de setores disponíveis
 */
router.get('/setores', (req, res) => {
    try {
        const setores = Object.values(knowledgeBase).map(setor => ({
            nome: setor.nome,
            icone: setor.icone,
            descricao: setor.descricao
        }));

        res.json({
            success: true,
            setores
        });
    } catch (error) {
        logger.error('Erro ao buscar setores', { error: error.message });
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar setores'
        });
    }
});

/**
 * GET /api/chat/health
 * Verifica saúde da API
 */
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
