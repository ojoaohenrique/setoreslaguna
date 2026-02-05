// ===== API CLIENT PARA COMUNICAÇÃO COM BACKEND =====

class ChatAPI {
    constructor() {
        this.baseURL = 'http://localhost:3000/api/chat';
        this.conversationHistory = [];
    }

    /**
     * Envia mensagem para o backend e retorna resposta do ChatGPT
     */
    async sendMessage(message) {
        try {
            const response = await fetch(`${this.baseURL}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao enviar mensagem');
            }

            const data = await response.json();

            // Atualiza histórico
            this.conversationHistory.push({
                role: 'user',
                content: message
            });
            this.conversationHistory.push({
                role: 'assistant',
                content: data.response
            });

            // Limita histórico a 20 mensagens (10 pares)
            if (this.conversationHistory.length > 20) {
                this.conversationHistory = this.conversationHistory.slice(-20);
            }

            return {
                success: true,
                response: data.response,
                setor: data.setor
            };

        } catch (error) {
            console.error('Erro na API:', error);
            
            // Mensagens de erro amigáveis
            if (error.message.includes('Failed to fetch')) {
                return {
                    success: false,
                    error: 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
                };
            }

            if (error.message.includes('429')) {
                return {
                    success: false,
                    error: 'Você está enviando mensagens muito rapidamente. Aguarde alguns segundos.'
                };
            }

            return {
                success: false,
                error: error.message || 'Erro ao processar mensagem. Tente novamente.'
            };
        }
    }

    /**
     * Busca lista de setores disponíveis
     */
    async getSetores() {
        try {
            const response = await fetch(`${this.baseURL}/setores`);
            const data = await response.json();
            return data.setores || [];
        } catch (error) {
            console.error('Erro ao buscar setores:', error);
            return [];
        }
    }

    /**
     * Verifica saúde da API
     */
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            const data = await response.json();
            return data.status === 'online';
        } catch (error) {
            return false;
        }
    }

    /**
     * Limpa histórico de conversação
     */
    clearHistory() {
        this.conversationHistory = [];
    }
}

// Exporta instância global
const chatAPI = new ChatAPI();
