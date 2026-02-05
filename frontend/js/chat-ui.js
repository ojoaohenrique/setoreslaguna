// ===== INTERFACE DO CHAT (ATUALIZADO PARA USAR BACKEND) =====

let chatStarted = false;

// Inicialização
document.addEventListener('DOMContentLoaded', async function() {
    await initializeChat();
});

async function initializeChat() {
    // Verifica se backend está online
    const isOnline = await chatAPI.checkHealth();
    
    if (!isOnline) {
        console.warn('Backend offline - usando modo fallback');
        addBotMessage('⚠️ Sistema temporariamente indisponível. Por favor, tente novamente mais tarde ou entre em contato presencialmente.', true);
        return;
    }

    // Mensagem de boas-vindas
    const welcomeMessage = "Olá! Sou o assistente virtual da Prefeitura de Laguna, alimentado por inteligência artificial. Estou aqui para ajudar você com informações sobre nossos setores e serviços municipais. Como posso ajudar?";
    addBotMessage(welcomeMessage, true);
}

// Função para enviar mensagem
async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Mostra a seção do chat
    if (!chatStarted) {
        chatStarted = true;
    }
    
    // Adiciona mensagem do usuário
    addUserMessage(message);
    
    // Limpa input
    input.value = '';
    
    // Mostra indicador de digitação
    showTypingIndicator();
    
    // Envia para o backend
    const result = await chatAPI.sendMessage(message);
    
    // Remove indicador
    hideTypingIndicator();
    
    // Adiciona resposta
    if (result.success) {
        let response = result.response;
        
        // Adiciona badge do setor se identificado
        if (result.setor) {
            response = `<div class="sector-badge">📍 ${result.setor}</div>\n\n${response}`;
        }
        
        addBotMessage(response);
    } else {
        addBotMessage(`❌ ${result.error}\n\nPor favor, tente novamente ou entre em contato presencialmente.`);
    }
}

// Função para tratar tecla Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Função para perguntar sobre um setor específico
function askAboutSector(sectorName) {
    const input = document.getElementById('userInput');
    input.value = `Quero saber sobre ${sectorName}`;
    sendMessage();
    
    // Scroll para o chat
    document.getElementById('chatSection').scrollIntoView({ behavior: 'smooth' });
}

// Adiciona mensagem do usuário ao chat
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            ${escapeHtml(message)}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Adiciona mensagem do bot ao chat
function addBotMessage(message, isInitial = false) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Mostra indicador de digitação
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Esconde indicador de digitação
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Scroll para o final do chat
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escapa HTML para evitar XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle do chat em mobile
function toggleChat() {
    const welcomeSection = document.getElementById('welcomeSection');
    const chatSection = document.getElementById('chatSection');
    
    welcomeSection.classList.toggle('hidden');
    chatSection.classList.toggle('visible');
}

// Função para perguntas sugeridas
function askQuestion(question) {
    const input = document.getElementById('userInput');
    input.value = question;
    sendMessage();
}
