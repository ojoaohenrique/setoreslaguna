# Chat de Atendimento Digital - Prefeitura de Laguna

Sistema de chat inteligente para atendimento ao cidadão, desenvolvido para a Prefeitura Municipal de Laguna - SC.

## Sobre o Projeto

Este chat de atendimento digital utiliza inteligência artificial para:
- Responder dúvidas frequentes da população
- Direcionar corretamente o cidadão ao setor responsável
- Reduzir atendimentos presenciais desnecessários
- Melhorar a comunicação entre a Prefeitura e a população

## Setores Atendidos

- Guarda Municipal
- Secretaria de Saúde
- Secretaria de Educação
- Secretaria de Assistência Social
- Secretaria de Obras
- Secretaria da Fazenda
- Protocolo Geral
- Recursos Humanos
- Trânsito e Mobilidade Urbana
- Meio Ambiente
- Turismo
- Esporte e Cultura

## Como Usar

### Opção 1: Abrir diretamente no navegador
1. Abra o arquivo `index.html` no seu navegador (Chrome, Firefox, Edge, etc.)
2. Comece a digitar suas perguntas no campo de texto
3. Use os botões de acesso rápido para informações sobre setores específicos

### Opção 2: Usar um servidor local
Para desenvolvimento, você pode usar qualquer servidor HTTP local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (npx)
npx serve .

# Com PHP
php -S localhost:8000
```

## Estrutura do Projeto

```
chat-laguna/
├── index.html          # Página principal
├── styles.css          # Estilos visuais
├── chat.js             # Lógica do chat
├── knowledge-base.js   # Base de conhecimento dos setores
├── assets/             # Logos e imagens
│   └── logo-laguna.png
└── README.md           # Este arquivo
```

## Personalização

### Adicionar Logos
Coloque os logos da Prefeitura na pasta `assets/`:
- `logo-laguna.png` - Logo principal

### Atualizar Informações de Contato
Edite o arquivo `knowledge-base.js` para atualizar:
- Telefones de cada setor
- Endereços
- Horários de funcionamento

### Adicionar Novos Setores
No arquivo `knowledge-base.js`, adicione um novo objeto seguindo o padrão:

```javascript
novoSetor: {
    nome: "Nome do Setor",
    icone: "fas fa-icon",
    descricao: "Descrição do setor...",
    atribuicoes: ["Atribuição 1", "Atribuição 2"],
    servicos: ["Serviço 1", "Serviço 2"],
    quandoProcurar: ["Situação 1", "Situação 2"],
    contato: {
        telefone: "XX XXXX-XXXX",
        endereco: "Endereço completo",
        horario: "Segunda a Sexta, 8h às 17h"
    },
    palavrasChave: ["palavra1", "palavra2"]
}
```

## Limitações

- O chat é apenas informativo e orientador
- Não substitui o atendimento humano
- Não realiza protocolos ou solicitações formais
- Funciona offline (não requer conexão com internet para o básico)

## Futuras Integrações

Este projeto pode ser integrado a:
- Site oficial da Prefeitura
- Aplicativo móvel
- WhatsApp Business API
- Sistemas de protocolo

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (Vanilla JS)
- Font Awesome (ícones)
- Google Fonts (Inter)

## Cores Institucionais

- Verde Principal: `#1B7A34`
- Verde Escuro: `#145A27`
- Amarelo/Dourado: `#F5C518`
- Branco: `#FFFFFF`

---

Desenvolvido para a Prefeitura Municipal de Laguna - SC
