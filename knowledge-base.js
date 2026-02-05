// ===== BASE DE CONHECIMENTO DOS SETORES DA PREFEITURA DE LAGUNA =====

const knowledgeBase = {
    guardaMunicipal: {
        nome: "Guarda Municipal",
        icone: "fas fa-shield-alt",
        descricao: "A Guarda Municipal de Laguna é responsável pela proteção dos bens, serviços e instalações do município, além de atuar na segurança pública em parceria com outros órgãos.",
        atribuicoes: [
            "Proteção do patrimônio público municipal",
            "Rondas ostensivas em prédios públicos",
            "Apoio em eventos municipais",
            "Fiscalização do trânsito em apoio ao setor de Trânsito",
            "Atendimento a ocorrências que envolvam o patrimônio público",
            "Segurança em escolas municipais",
            "Apoio à Defesa Civil em situações de emergência"
        ],
        servicos: [
            "Ronda escolar",
            "Segurança em eventos públicos",
            "Atendimento de emergência patrimonial",
            "Fiscalização de posturas municipais"
        ],
        quandoProcurar: [
            "Vandalismo em prédios públicos",
            "Invasão de áreas públicas",
            "Perturbação em praças e espaços públicos",
            "Segurança em eventos municipais",
            "Problemas de segurança em escolas municipais"
        ],
        contato: {
            telefone: "Telefone da Guarda Municipal",
            endereco: "Endereço da Guarda Municipal",
            horario: "24 horas"
        },
        palavrasChave: ["guarda", "segurança", "patrimônio", "vandalismo", "ronda", "escolta", "proteção", "invasão", "depredação", "segurança pública"]
    },

    saude: {
        nome: "Secretaria de Saúde",
        icone: "fas fa-heartbeat",
        descricao: "A Secretaria de Saúde é responsável por coordenar e executar as políticas públicas de saúde no município, garantindo atendimento à população através do SUS.",
        atribuicoes: [
            "Coordenação do Sistema Único de Saúde (SUS) no município",
            "Gestão das Unidades Básicas de Saúde (UBS)",
            "Programas de vacinação",
            "Vigilância sanitária e epidemiológica",
            "Atendimento médico e de enfermagem",
            "Distribuição de medicamentos",
            "Programas de saúde da família",
            "Agendamento de consultas e exames"
        ],
        servicos: [
            "Consultas médicas nas UBS",
            "Vacinação",
            "Exames laboratoriais",
            "Distribuição de medicamentos",
            "Atendimento de emergência (UPA)",
            "Programas de prevenção",
            "Saúde bucal",
            "Atendimento psicológico"
        ],
        quandoProcurar: [
            "Agendar consultas médicas",
            "Informações sobre vacinação",
            "Retirada de medicamentos",
            "Cartão do SUS",
            "Informações sobre programas de saúde",
            "Denúncias de vigilância sanitária",
            "Atestados e declarações de saúde"
        ],
        contato: {
            telefone: "Telefone da Secretaria de Saúde",
            endereco: "Endereço da Secretaria de Saúde",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["saúde", "médico", "hospital", "ubs", "posto de saúde", "vacina", "vacinação", "remédio", "medicamento", "consulta", "exame", "sus", "cartão sus", "farmácia", "dentista", "psicólogo", "emergência", "upa", "doença", "tratamento"]
    },

    educacao: {
        nome: "Secretaria de Educação",
        icone: "fas fa-graduation-cap",
        descricao: "A Secretaria de Educação é responsável pela gestão da rede municipal de ensino, incluindo educação infantil e ensino fundamental, além de programas educacionais.",
        atribuicoes: [
            "Gestão das escolas municipais",
            "Educação infantil (creches e pré-escolas)",
            "Ensino fundamental",
            "Transporte escolar",
            "Merenda escolar",
            "Programas de alfabetização",
            "Capacitação de professores",
            "Gestão do material didático"
        ],
        servicos: [
            "Matrículas escolares",
            "Transferência de alunos",
            "Transporte escolar",
            "Merenda escolar",
            "Declarações e históricos escolares",
            "Programas de reforço escolar",
            "Educação de Jovens e Adultos (EJA)"
        ],
        quandoProcurar: [
            "Matrícula em escola municipal",
            "Vaga em creche",
            "Transporte escolar",
            "Transferência de escola",
            "Histórico escolar",
            "Informações sobre calendário escolar",
            "Problemas com merenda ou transporte"
        ],
        contato: {
            telefone: "Telefone da Secretaria de Educação",
            endereco: "Endereço da Secretaria de Educação",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["educação", "escola", "matrícula", "creche", "vaga", "professor", "aluno", "estudante", "ensino", "transporte escolar", "merenda", "histórico", "transferência", "eja", "alfabetização", "infantil"]
    },

    assistenciaSocial: {
        nome: "Secretaria de Assistência Social",
        icone: "fas fa-hands-helping",
        descricao: "A Secretaria de Assistência Social desenvolve políticas públicas de proteção social, atendendo famílias em situação de vulnerabilidade e promovendo a inclusão social.",
        atribuicoes: [
            "Cadastro Único (CadÚnico)",
            "Programas de transferência de renda",
            "Proteção Social Básica e Especial",
            "CRAS e CREAS",
            "Atendimento a famílias em vulnerabilidade",
            "Programas para idosos",
            "Programas para pessoas com deficiência",
            "Acolhimento institucional"
        ],
        servicos: [
            "Cadastro Único para programas sociais",
            "Bolsa Família / Auxílio Brasil",
            "BPC (Benefício de Prestação Continuada)",
            "Atendimento no CRAS",
            "Atendimento no CREAS",
            "Cesta básica (situações emergenciais)",
            "Encaminhamento para abrigos",
            "Atendimento psicossocial"
        ],
        quandoProcurar: [
            "Cadastro no CadÚnico",
            "Bolsa Família / Auxílio Brasil",
            "BPC para idosos ou pessoas com deficiência",
            "Situação de vulnerabilidade social",
            "Violência doméstica",
            "Trabalho infantil",
            "Pessoas em situação de rua",
            "Idosos em situação de risco"
        ],
        contato: {
            telefone: "Telefone da Assistência Social",
            endereco: "Endereço da Secretaria de Assistência Social",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["assistência social", "cras", "creas", "bolsa família", "auxílio brasil", "cadunico", "cadastro único", "benefício", "bpc", "vulnerabilidade", "cesta básica", "abrigo", "idoso", "deficiente", "violência", "social"]
    },

    obras: {
        nome: "Secretaria de Obras",
        icone: "fas fa-hard-hat",
        descricao: "A Secretaria de Obras é responsável pela execução e fiscalização de obras públicas, manutenção urbana e infraestrutura do município.",
        atribuicoes: [
            "Execução de obras públicas",
            "Manutenção de vias e estradas",
            "Pavimentação",
            "Drenagem e saneamento",
            "Construção e reforma de prédios públicos",
            "Iluminação pública",
            "Manutenção de praças e espaços públicos",
            "Fiscalização de obras"
        ],
        servicos: [
            "Tapa-buraco",
            "Manutenção de calçadas",
            "Limpeza de bueiros",
            "Iluminação pública",
            "Poda de árvores em vias públicas",
            "Manutenção de praças",
            "Obras de infraestrutura"
        ],
        quandoProcurar: [
            "Buracos nas ruas",
            "Problemas com iluminação pública",
            "Bueiros entupidos",
            "Calçadas danificadas",
            "Manutenção de vias",
            "Problemas em praças públicas",
            "Alagamentos",
            "Obras públicas em andamento"
        ],
        contato: {
            telefone: "Telefone da Secretaria de Obras",
            endereco: "Endereço da Secretaria de Obras",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["obras", "buraco", "rua", "asfalto", "pavimentação", "calçada", "iluminação", "poste", "luz", "bueiro", "esgoto", "praça", "construção", "reforma", "infraestrutura", "drenagem"]
    },

    fazenda: {
        nome: "Secretaria da Fazenda",
        icone: "fas fa-coins",
        descricao: "A Secretaria da Fazenda é responsável pela administração tributária, arrecadação e gestão financeira do município.",
        atribuicoes: [
            "Arrecadação de tributos municipais",
            "IPTU e ITBI",
            "ISS (Imposto sobre Serviços)",
            "Taxas municipais",
            "Emissão de certidões",
            "Parcelamento de débitos",
            "Cadastro imobiliário",
            "Gestão financeira do município"
        ],
        servicos: [
            "Emissão de IPTU",
            "Parcelamento de impostos",
            "Certidão Negativa de Débitos",
            "Certidão de Valor Venal",
            "ITBI (transferência de imóveis)",
            "Alvará de funcionamento",
            "Cadastro de empresas",
            "Nota Fiscal Eletrônica"
        ],
        quandoProcurar: [
            "Pagar ou parcelar IPTU",
            "Emissão de certidões",
            "ITBI para compra/venda de imóvel",
            "Alvará de funcionamento",
            "Dúvidas sobre tributos",
            "Cadastro de empresa",
            "Nota fiscal eletrônica"
        ],
        contato: {
            telefone: "Telefone da Secretaria da Fazenda",
            endereco: "Endereço da Secretaria da Fazenda",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["fazenda", "iptu", "imposto", "tributo", "taxa", "certidão", "débito", "parcelamento", "itbi", "imóvel", "alvará", "empresa", "nota fiscal", "iss", "cadastro", "valor venal", "dívida"]
    },

    protocolo: {
        nome: "Protocolo Geral",
        icone: "fas fa-file-alt",
        descricao: "O Protocolo Geral é responsável pelo recebimento, registro e encaminhamento de documentos e requerimentos dos cidadãos aos setores competentes.",
        atribuicoes: [
            "Recebimento de documentos e requerimentos",
            "Protocolo de processos",
            "Encaminhamento aos setores responsáveis",
            "Acompanhamento de processos",
            "Fornecimento de número de protocolo",
            "Certidões e cópias de processos"
        ],
        servicos: [
            "Abertura de processos administrativos",
            "Protocolo de requerimentos",
            "Consulta de processos",
            "Cópia de documentos protocolados",
            "Encaminhamento de solicitações"
        ],
        quandoProcurar: [
            "Dar entrada em qualquer requerimento",
            "Acompanhar andamento de processo",
            "Protocolar documentos oficiais",
            "Solicitar cópia de processos",
            "Entrada de recursos ou pedidos"
        ],
        contato: {
            telefone: "Telefone do Protocolo Geral",
            endereco: "Endereço do Protocolo Geral",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["protocolo", "processo", "requerimento", "documento", "entrada", "solicitação", "pedido", "certidão", "andamento", "número", "acompanhar"]
    },

    recursosHumanos: {
        nome: "Recursos Humanos",
        icone: "fas fa-users",
        descricao: "O setor de Recursos Humanos é responsável pela gestão de pessoal da Prefeitura, incluindo servidores efetivos, comissionados e contratados.",
        atribuicoes: [
            "Gestão de pessoal",
            "Folha de pagamento",
            "Concursos públicos",
            "Contratações e nomeações",
            "Férias e licenças",
            "Aposentadorias",
            "Contracheques",
            "Certidões funcionais"
        ],
        servicos: [
            "Emissão de contracheque",
            "Certidão de tempo de serviço",
            "Declaração funcional",
            "Informações sobre concursos",
            "Férias de servidores",
            "Licenças e afastamentos",
            "Aposentadoria"
        ],
        quandoProcurar: [
            "Dúvidas sobre contracheque",
            "Certidões funcionais",
            "Informações sobre concursos",
            "Férias ou licenças",
            "Aposentadoria de servidor",
            "Problemas com pagamento"
        ],
        contato: {
            telefone: "Telefone do RH",
            endereco: "Endereço do RH",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["rh", "recursos humanos", "servidor", "funcionário", "concurso", "contracheque", "salário", "pagamento", "férias", "licença", "aposentadoria", "nomeação", "contratação"]
    },

    transito: {
        nome: "Trânsito e Mobilidade Urbana",
        icone: "fas fa-traffic-light",
        descricao: "O setor de Trânsito e Mobilidade Urbana é responsável pela organização, sinalização e fiscalização do trânsito no município.",
        atribuicoes: [
            "Sinalização de trânsito",
            "Fiscalização de trânsito",
            "Educação para o trânsito",
            "Análise de projetos viários",
            "Ordenamento do tráfego",
            "Estacionamento regulamentado",
            "Transporte público"
        ],
        servicos: [
            "Solicitação de sinalização",
            "Denúncias de trânsito",
            "Educação para o trânsito",
            "Autorização para eventos em vias públicas",
            "Análise de projetos de trânsito",
            "Informações sobre transporte público"
        ],
        quandoProcurar: [
            "Falta de sinalização",
            "Semáforo com defeito",
            "Faixa de pedestre apagada",
            "Estacionamento irregular",
            "Autorização para interdição de via",
            "Problemas com transporte público"
        ],
        contato: {
            telefone: "Telefone do Trânsito",
            endereco: "Endereço do setor de Trânsito",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["trânsito", "semáforo", "sinalização", "placa", "faixa", "pedestre", "estacionamento", "multa", "transporte", "ônibus", "mobilidade", "via", "rua", "lombada"]
    },

    meioAmbiente: {
        nome: "Meio Ambiente",
        icone: "fas fa-leaf",
        descricao: "A Secretaria de Meio Ambiente é responsável pela política ambiental do município, fiscalização e licenciamento ambiental.",
        atribuicoes: [
            "Licenciamento ambiental",
            "Fiscalização ambiental",
            "Educação ambiental",
            "Arborização urbana",
            "Controle de poluição",
            "Proteção de áreas verdes",
            "Coleta seletiva"
        ],
        servicos: [
            "Licença ambiental",
            "Autorização para corte de árvores",
            "Denúncias ambientais",
            "Coleta de resíduos especiais",
            "Educação ambiental nas escolas",
            "Informações sobre reciclagem"
        ],
        quandoProcurar: [
            "Licença ambiental para atividades",
            "Autorização para corte ou poda de árvore",
            "Denúncia de crime ambiental",
            "Poluição sonora ou do ar",
            "Descarte irregular de lixo",
            "Animais silvestres"
        ],
        contato: {
            telefone: "Telefone do Meio Ambiente",
            endereco: "Endereço da Secretaria de Meio Ambiente",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["meio ambiente", "ambiental", "árvore", "poda", "corte", "licença", "poluição", "lixo", "reciclagem", "coleta", "animal", "silvestre", "desmatamento", "queimada", "rio", "praia", "natureza"]
    },

    turismo: {
        nome: "Turismo",
        icone: "fas fa-umbrella-beach",
        descricao: "A Secretaria de Turismo promove e desenvolve o turismo no município, divulgando os atrativos e apoiando o setor turístico local.",
        atribuicoes: [
            "Promoção turística do município",
            "Apoio ao trade turístico",
            "Eventos turísticos",
            "Informações aos turistas",
            "Sinalização turística",
            "Parcerias com setor hoteleiro e gastronômico"
        ],
        servicos: [
            "Informações turísticas",
            "Calendário de eventos",
            "Roteiros turísticos",
            "Apoio a eventos",
            "Material promocional"
        ],
        quandoProcurar: [
            "Informações sobre pontos turísticos",
            "Eventos na cidade",
            "Roteiros de visitação",
            "Apoio para eventos turísticos",
            "Parcerias turísticas"
        ],
        contato: {
            telefone: "Telefone do Turismo",
            endereco: "Endereço da Secretaria de Turismo",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["turismo", "turista", "praia", "evento", "festa", "visitação", "ponto turístico", "hotel", "pousada", "restaurante", "roteiro", "passeio", "farol", "centro histórico"]
    },

    esporteCultura: {
        nome: "Esporte e Cultura",
        icone: "fas fa-futbol",
        descricao: "A Secretaria de Esporte e Cultura promove atividades esportivas e culturais, gerencia equipamentos públicos e desenvolve programas para a comunidade.",
        atribuicoes: [
            "Programas esportivos",
            "Eventos culturais",
            "Gestão de ginásios e quadras",
            "Escolas de esporte",
            "Biblioteca municipal",
            "Museus e centros culturais",
            "Apoio a artistas locais"
        ],
        servicos: [
            "Escolinhas de esporte",
            "Reserva de quadras e ginásios",
            "Eventos esportivos",
            "Biblioteca pública",
            "Eventos culturais",
            "Apoio a projetos culturais"
        ],
        quandoProcurar: [
            "Inscrição em escolinhas de esporte",
            "Reserva de espaços esportivos",
            "Eventos esportivos e culturais",
            "Biblioteca municipal",
            "Apoio para projetos culturais",
            "Informações sobre museus"
        ],
        contato: {
            telefone: "Telefone de Esporte e Cultura",
            endereco: "Endereço da Secretaria de Esporte e Cultura",
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["esporte", "cultura", "futebol", "quadra", "ginásio", "escolinha", "natação", "biblioteca", "livro", "museu", "teatro", "show", "evento", "arte", "artista", "dança"]
    }
};

// ===== RESPOSTAS PADRÃO =====
const defaultResponses = {
    saudacao: [
        "Olá! Sou o assistente virtual da Prefeitura de Laguna. Como posso ajudar você hoje?",
        "Bem-vindo ao atendimento digital da Prefeitura de Laguna! Em que posso auxiliar?",
        "Olá! Estou aqui para ajudar com informações sobre os serviços da Prefeitura. Qual é sua dúvida?"
    ],
    despedida: [
        "Foi um prazer ajudar! Se precisar de mais alguma informação, estarei à disposição.",
        "Obrigado pelo contato! Estamos sempre à disposição para ajudar.",
        "Até mais! Qualquer dúvida, é só voltar aqui."
    ],
    naoEntendi: [
        "Desculpe, não consegui entender completamente sua pergunta. Poderia reformular ou ser mais específico sobre o que precisa?",
        "Não encontrei informações específicas sobre isso. Tente perguntar sobre um setor específico ou descreva melhor sua necessidade.",
        "Hmm, não tenho certeza sobre isso. Você poderia detalhar melhor sua dúvida?"
    ],
    agradecimento: [
        "Por nada! Estou aqui para ajudar. Precisa de mais alguma informação?",
        "Disponha! Se tiver outras dúvidas, é só perguntar.",
        "De nada! Fico feliz em poder ajudar."
    ]
};

// ===== PERGUNTAS FREQUENTES =====
const faq = [
    {
        pergunta: "Como faço para tirar o cartão do SUS?",
        resposta: "Para tirar o Cartão do SUS, você deve procurar uma Unidade Básica de Saúde (UBS) mais próxima da sua residência. Leve documento de identidade (RG), CPF e comprovante de residência. O atendimento é gratuito.",
        setor: "saude"
    },
    {
        pergunta: "Como faço matrícula na escola municipal?",
        resposta: "As matrículas na rede municipal de ensino são realizadas na própria escola ou na Secretaria de Educação. O período de matrículas geralmente ocorre no final do ano para o ano seguinte. Leve documentos do responsável e da criança, comprovante de residência e histórico escolar (se transferência).",
        setor: "educacao"
    },
    {
        pergunta: "Como me cadastrar no CadÚnico?",
        resposta: "Para se cadastrar no Cadastro Único (CadÚnico), procure o CRAS mais próximo da sua residência. Leve documento de identidade, CPF, comprovante de residência e renda de todos os membros da família. O cadastro é necessário para acesso a programas sociais como Bolsa Família.",
        setor: "assistenciaSocial"
    },
    {
        pergunta: "Como pagar o IPTU?",
        resposta: "O IPTU pode ser pago em cota única (com desconto) ou parcelado. O boleto é enviado para o endereço do imóvel ou pode ser emitido na Secretaria da Fazenda ou pelo site da Prefeitura. Para dúvidas sobre valores ou parcelamento, procure a Secretaria da Fazenda.",
        setor: "fazenda"
    },
    {
        pergunta: "Como solicitar tapa-buraco?",
        resposta: "Para solicitar serviço de tapa-buraco ou manutenção em vias públicas, você pode entrar em contato com a Secretaria de Obras informando o endereço completo do local que precisa de reparo. Também é possível protocolar a solicitação no Protocolo Geral da Prefeitura.",
        setor: "obras"
    }
];

// ===== PALAVRAS DE SAUDAÇÃO =====
const palavrasSaudacao = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "hey", "e aí", "eai", "opa", "olá!", "oi!"];

// ===== PALAVRAS DE DESPEDIDA =====
const palavrasDespedida = ["tchau", "até mais", "até logo", "adeus", "obrigado", "obrigada", "valeu", "agradeço", "flw", "falou"];

// ===== PALAVRAS DE AGRADECIMENTO =====
const palavrasAgradecimento = ["obrigado", "obrigada", "agradeço", "valeu", "thanks", "grato", "grata"];
