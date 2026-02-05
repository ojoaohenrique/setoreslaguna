const OpenAI = require('openai');
const logger = require('../config/logger');

class ChatGPTService {
    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY não configurada no arquivo .env');
        }

        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        this.model = 'gpt-4-turbo-preview'; // Pode usar gpt-3.5-turbo para economia
    }

    /**
     * Gera o prompt do sistema com contexto da Prefeitura de Laguna
     */
    getSystemPrompt(setor = null) {
        let basePrompt = `Você é o assistente virtual oficial da Prefeitura Municipal de Laguna, Santa Catarina.

DIRETRIZES IMPORTANTES:
- Seja educado, claro e objetivo
- Use linguagem institucional mas acessível
- Responda APENAS sobre serviços e setores da Prefeitura de Laguna
- NÃO invente informações - se não souber, oriente a procurar o setor presencialmente
- NÃO realize solicitações formais - apenas informe como fazer
- Sempre indique horários de atendimento quando relevante
- Seja empático e prestativo

SETORES DA PREFEITURA:
1. Guarda Municipal - Segurança e proteção patrimonial
2. Secretaria de Saúde - Atendimento SUS, vacinação, medicamentos
3. Secretaria de Educação - Matrículas, escolas, transporte escolar
4. Assistência Social - CadÚnico, Bolsa Família, CRAS, CREAS
5. Secretaria de Obras - Infraestrutura, tapa-buraco, iluminação
6. Secretaria da Fazenda - IPTU, impostos, certidões, alvarás
7. Protocolo Geral - Entrada de documentos e processos
8. Recursos Humanos - Assuntos de servidores públicos
9. Trânsito e Mobilidade - Sinalização, fiscalização
10. Meio Ambiente - Licenciamento, fiscalização ambiental
11. Turismo - Informações turísticas e eventos
12. Esporte e Cultura - Atividades esportivas e culturais

HORÁRIO PADRÃO: Segunda a Sexta, 8h às 17h (exceto Guarda Municipal: 24h)`;

        if (setor) {
            basePrompt += `\n\nCONTEXTO ADICIONAL DO SETOR:\n${JSON.stringify(setor, null, 2)}`;
        }

        return basePrompt;
    }

    /**
     * Envia mensagem para o ChatGPT e retorna resposta
     */
    async sendMessage(userMessage, conversationHistory = [], setorContext = null) {
        try {
            logger.info('Enviando mensagem para ChatGPT', {
                messageLength: userMessage.length,
                historyLength: conversationHistory.length
            });

            // Prepara as mensagens
            const messages = [
                {
                    role: 'system',
                    content: this.getSystemPrompt(setorContext)
                }
            ];

            // Adiciona histórico (limitado aos últimos 10 para economia)
            const recentHistory = conversationHistory.slice(-10);
            messages.push(...recentHistory);

            // Adiciona mensagem atual
            messages.push({
                role: 'user',
                content: userMessage
            });

            // Chama a API do OpenAI
            const completion = await this.openai.chat.completions.create({
                model: this.model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            });

            const response = completion.choices[0].message.content;

            logger.info('Resposta recebida do ChatGPT', {
                responseLength: response.length,
                tokensUsed: completion.usage.total_tokens
            });

            return {
                success: true,
                response: response,
                tokensUsed: completion.usage.total_tokens
            };

        } catch (error) {
            logger.error('Erro ao comunicar com ChatGPT', {
                error: error.message,
                stack: error.stack
            });

            // Tratamento de erros específicos
            if (error.code === 'insufficient_quota') {
                return {
                    success: false,
                    error: 'Cota da API excedida. Entre em contato com o administrador.'
                };
            }

            if (error.code === 'rate_limit_exceeded') {
                return {
                    success: false,
                    error: 'Muitas requisições. Aguarde um momento e tente novamente.'
                };
            }

            return {
                success: false,
                error: 'Erro ao processar sua mensagem. Tente novamente.'
            };
        }
    }

    /**
     * Identifica o setor baseado na mensagem do usuário
     */
    async identifySetor(userMessage, knowledgeBase) {
        try {
            const prompt = `Analise a seguinte mensagem e identifique qual setor da Prefeitura de Laguna é mais adequado.

Mensagem: "${userMessage}"

Setores disponíveis:
${Object.keys(knowledgeBase).map(key => `- ${key}: ${knowledgeBase[key].nome}`).join('\n')}

Responda APENAS com a chave do setor (ex: "saude", "educacao", etc.) ou "nenhum" se não identificar.`;

            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3,
                max_tokens: 50
            });

            const setorKey = completion.choices[0].message.content.trim().toLowerCase();
            
            return knowledgeBase[setorKey] || null;

        } catch (error) {
            logger.error('Erro ao identificar setor', { error: error.message });
            return null;
        }
    }
}

module.exports = new ChatGPTService();
