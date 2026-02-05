// ===== CHAT DE ATENDIMENTO - PREFEITURA DE LAGUNA =====

// Estado do chat
let chatStarted = false;
let messageHistory = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

function initializeChat() {
    // Adiciona mensagem inicial de boas-vindas ao histórico
    const welcomeMessage = "Olá! Sou o assistente virtual da Prefeitura de Laguna. Estou aqui para ajudar você a encontrar informações sobre nossos setores e serviços municipais. Como posso ajudar?";
    addBotMessage(welcomeMessage, true);
}

// Função para enviar mensagem
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Mostra a seção do chat se ainda não estiver visível
    if (!chatStarted) {
        chatStarted = true;
    }
    
    // Adiciona mensagem do usuário
    addUserMessage(message);
    
    // Limpa input
    input.value = '';
    
    // Mostra indicador de digitação
    showTypingIndicator();
    
    // Processa a mensagem após um pequeno delay (simula processamento)
    setTimeout(() => {
        hideTypingIndicator();
        const response = processMessage(message);
        addBotMessage(response);
    }, 800 + Math.random() * 700);
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
    
    messageHistory.push({ type: 'user', content: message });
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
    
    if (!isInitial) {
        messageHistory.push({ type: 'bot', content: message });
    }
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

// Função principal de processamento de mensagens
function processMessage(message) {
    const messageLower = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Verifica saudação
    if (isSaudacao(messageLower)) {
        return getRandomResponse(defaultResponses.saudacao);
    }
    
    // Verifica despedida
    if (isDespedida(messageLower)) {
        return getRandomResponse(defaultResponses.despedida);
    }
    
    // Verifica agradecimento
    if (isAgradecimento(messageLower)) {
        return getRandomResponse(defaultResponses.agradecimento);
    }
    
    // Verifica perguntas frequentes
    const faqResponse = checkFAQ(messageLower);
    if (faqResponse) {
        return faqResponse;
    }
    
    // Identifica setor relacionado
    const setor = identificarSetor(messageLower);
    if (setor) {
        return gerarRespostaSetor(setor, messageLower);
    }
    
    // Verifica se é uma pergunta sobre serviços gerais
    if (isPerguntaServicos(messageLower)) {
        return gerarRespostaServicosGerais();
    }
    
    // Resposta padrão quando não entende
    return gerarRespostaNaoEntendi();
}

// Verifica se é saudação
function isSaudacao(message) {
    return palavrasSaudacao.some(palavra => {
        const palavraNorm = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return message.includes(palavraNorm) || message === palavraNorm;
    });
}

// Verifica se é despedida
function isDespedida(message) {
    return palavrasDespedida.some(palavra => {
        const palavraNorm = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return message.includes(palavraNorm);
    });
}

// Verifica se é agradecimento
function isAgradecimento(message) {
    return palavrasAgradecimento.some(palavra => {
        const palavraNorm = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return message.includes(palavraNorm);
    });
}

// Verifica FAQ
function checkFAQ(message) {
    for (const item of faq) {
        const perguntaNorm = item.pergunta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const palavras = perguntaNorm.split(' ').filter(p => p.length > 3);
        const matches = palavras.filter(p => message.includes(p));
        
        if (matches.length >= 3) {
            const setor = knowledgeBase[item.setor];
            return `${item.resposta}
            
            <div class="sector-highlight">
                <strong><i class="${setor.icone}"></i> Setor responsável: ${setor.nome}</strong>
            </div>`;
        }
    }
    return null;
}

// Identifica o setor baseado nas palavras-chave
function identificarSetor(message) {
    let melhorMatch = null;
    let maiorScore = 0;
    
    for (const [key, setor] of Object.entries(knowledgeBase)) {
        let score = 0;
        
        // Verifica palavras-chave
        for (const palavra of setor.palavrasChave) {
            const palavraNorm = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if (message.includes(palavraNorm)) {
                score += 2;
            }
        }
        
        // Verifica nome do setor
        const nomeNorm = setor.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (message.includes(nomeNorm)) {
            score += 5;
        }
        
        // Verifica atribuições
        for (const atrib of setor.atribuicoes) {
            const atribNorm = atrib.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const palavras = atribNorm.split(' ').filter(p => p.length > 3);
            for (const palavra of palavras) {
                if (message.includes(palavra)) {
                    score += 1;
                }
            }
        }
        
        if (score > maiorScore) {
            maiorScore = score;
            melhorMatch = setor;
        }
    }
    
    return maiorScore >= 2 ? melhorMatch : null;
}

// Gera resposta sobre um setor
function gerarRespostaSetor(setor, message) {
    // Verifica se quer saber o que o setor faz
    if (message.includes('faz') || message.includes('funcao') || message.includes('atribuic') || 
        message.includes('responsavel') || message.includes('saber sobre') || message.includes('quero saber')) {
        return `<strong><i class="${setor.icone}"></i> ${setor.nome}</strong>

${setor.descricao}

<strong>Principais atribuições:</strong>
<ul>
${setor.atribuicoes.slice(0, 5).map(a => `<li>${a}</li>`).join('')}
</ul>

<div class="sector-highlight">
    <strong>Horário de atendimento:</strong> ${setor.contato.horario}
</div>

Posso ajudar com mais alguma informação sobre este setor?`;
    }
    
    // Verifica se quer saber serviços
    if (message.includes('servico') || message.includes('servicos') || message.includes('oferece') || message.includes('disponivel')) {
        return `<strong><i class="${setor.icone}"></i> Serviços - ${setor.nome}</strong>

<strong>Serviços disponíveis:</strong>
<ul>
${setor.servicos.map(s => `<li>${s}</li>`).join('')}
</ul>

<div class="contact-info">
    <i class="fas fa-clock"></i> Horário: ${setor.contato.horario}
</div>`;
    }
    
    // Verifica quando procurar
    if (message.includes('quando') || message.includes('preciso') || message.includes('devo') || message.includes('procurar')) {
        return `<strong><i class="${setor.icone}"></i> Quando procurar a ${setor.nome}?</strong>

Você deve procurar este setor nas seguintes situações:
<ul>
${setor.quandoProcurar.map(q => `<li>${q}</li>`).join('')}
</ul>

<div class="sector-highlight">
    <strong>Atendimento:</strong> ${setor.contato.horario}
</div>`;
    }
    
    // Resposta geral sobre o setor
    return `<strong><i class="${setor.icone}"></i> ${setor.nome}</strong>

${setor.descricao}

<strong>Principais serviços:</strong>
<ul>
${setor.servicos.slice(0, 4).map(s => `<li>${s}</li>`).join('')}
</ul>

<div class="sector-highlight">
    <strong>Horário de atendimento:</strong> ${setor.contato.horario}
</div>

<div class="suggested-questions">
    <button class="suggested-btn" onclick="askQuestion('Quais os serviços da ${setor.nome}?')">Ver todos os serviços</button>
    <button class="suggested-btn" onclick="askQuestion('Quando procurar a ${setor.nome}?')">Quando procurar?</button>
</div>`;
}

// Função para perguntas sugeridas
function askQuestion(question) {
    const input = document.getElementById('userInput');
    input.value = question;
    sendMessage();
}

// Verifica se é pergunta sobre serviços gerais
function isPerguntaServicos(message) {
    return message.includes('servico') || message.includes('setores') || message.includes('secretaria') || 
           message.includes('ajuda') || message.includes('funciona') || message.includes('prefeitura');
}

// Gera resposta sobre serviços gerais
function gerarRespostaServicosGerais() {
    return `<strong>Setores da Prefeitura de Laguna</strong>

A Prefeitura Municipal de Laguna conta com diversos setores para atender você:

<ul>
    <li><strong>Guarda Municipal</strong> - Segurança e proteção patrimonial</li>
    <li><strong>Secretaria de Saúde</strong> - Atendimento médico e programas de saúde</li>
    <li><strong>Secretaria de Educação</strong> - Escolas, matrículas e transporte escolar</li>
    <li><strong>Assistência Social</strong> - Programas sociais e CadÚnico</li>
    <li><strong>Secretaria de Obras</strong> - Infraestrutura e manutenção urbana</li>
    <li><strong>Secretaria da Fazenda</strong> - Impostos, certidões e alvarás</li>
    <li><strong>Protocolo Geral</strong> - Entrada de documentos e requerimentos</li>
    <li><strong>Recursos Humanos</strong> - Assuntos de servidores públicos</li>
    <li><strong>Trânsito e Mobilidade</strong> - Sinalização e transporte</li>
    <li><strong>Meio Ambiente</strong> - Licenciamento e fiscalização ambiental</li>
    <li><strong>Turismo</strong> - Informações turísticas e eventos</li>
    <li><strong>Esporte e Cultura</strong> - Atividades esportivas e culturais</li>
</ul>

Sobre qual setor você gostaria de saber mais?`;
}

// Gera resposta quando não entende
function gerarRespostaNaoEntendi() {
    const sugestoes = `
<div class="suggested-questions">
    <button class="suggested-btn" onclick="askQuestion('Quais são os setores da Prefeitura?')">Ver setores</button>
    <button class="suggested-btn" onclick="askQuestion('Como tirar cartão do SUS?')">Cartão do SUS</button>
    <button class="suggested-btn" onclick="askQuestion('Como fazer matrícula escolar?')">Matrícula escolar</button>
    <button class="suggested-btn" onclick="askQuestion('Como pagar IPTU?')">Pagar IPTU</button>
</div>`;
    
    return `${getRandomResponse(defaultResponses.naoEntendi)}

Você pode clicar em uma das opções abaixo ou perguntar sobre um setor específico:

${sugestoes}`;
}

// Obtém resposta aleatória de um array
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
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
