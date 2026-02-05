// Base de conhecimento dos setores da Prefeitura de Laguna
// Mesma estrutura do frontend, mas no backend para segurança

const knowledgeBase = {
    guardaMunicipal: {
        nome: "Guarda Municipal",
        icone: "fas fa-shield-alt",
        descricao: "A Guarda Municipal de Laguna é responsável pela proteção dos bens, serviços e instalações do município.",
        atribuicoes: [
            "Proteção do patrimônio público municipal",
            "Rondas ostensivas em prédios públicos",
            "Apoio em eventos municipais",
            "Fiscalização do trânsito em apoio ao setor de Trânsito",
            "Segurança em escolas municipais"
        ],
        servicos: [
            "Ronda escolar",
            "Segurança em eventos públicos",
            "Atendimento de emergência patrimonial"
        ],
        contato: {
            horario: "24 horas"
        },
        palavrasChave: ["guarda", "segurança", "patrimônio", "vandalismo", "ronda", "proteção"]
    },
    saude: {
        nome: "Secretaria de Saúde",
        icone: "fas fa-heartbeat",
        descricao: "Coordena e executa as políticas públicas de saúde no município através do SUS.",
        atribuicoes: [
            "Coordenação do SUS no município",
            "Gestão das UBS",
            "Programas de vacinação",
            "Vigilância sanitária",
            "Distribuição de medicamentos"
        ],
        servicos: [
            "Consultas médicas",
            "Vacinação",
            "Exames laboratoriais",
            "Distribuição de medicamentos",
            "Saúde bucal"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["saúde", "médico", "ubs", "vacina", "remédio", "consulta", "sus"]
    },
    educacao: {
        nome: "Secretaria de Educação",
        icone: "fas fa-graduation-cap",
        descricao: "Gestão da rede municipal de ensino, incluindo educação infantil e ensino fundamental.",
        atribuicoes: [
            "Gestão das escolas municipais",
            "Educação infantil",
            "Ensino fundamental",
            "Transporte escolar",
            "Merenda escolar"
        ],
        servicos: [
            "Matrículas escolares",
            "Transferência de alunos",
            "Transporte escolar",
            "Merenda escolar"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["educação", "escola", "matrícula", "creche", "transporte escolar"]
    },
    assistenciaSocial: {
        nome: "Secretaria de Assistência Social",
        icone: "fas fa-hands-helping",
        descricao: "Desenvolve políticas de proteção social e atende famílias em vulnerabilidade.",
        atribuicoes: [
            "Cadastro Único (CadÚnico)",
            "Programas de transferência de renda",
            "CRAS e CREAS",
            "Atendimento a famílias vulneráveis"
        ],
        servicos: [
            "Cadastro Único",
            "Bolsa Família / Auxílio Brasil",
            "BPC",
            "Atendimento no CRAS"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["assistência", "cras", "bolsa família", "cadunico", "vulnerabilidade"]
    },
    obras: {
        nome: "Secretaria de Obras",
        icone: "fas fa-hard-hat",
        descricao: "Execução e fiscalização de obras públicas e manutenção urbana.",
        atribuicoes: [
            "Execução de obras públicas",
            "Manutenção de vias",
            "Pavimentação",
            "Iluminação pública"
        ],
        servicos: [
            "Tapa-buraco",
            "Manutenção de calçadas",
            "Iluminação pública",
            "Poda de árvores"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["obras", "buraco", "asfalto", "iluminação", "calçada"]
    },
    fazenda: {
        nome: "Secretaria da Fazenda",
        icone: "fas fa-coins",
        descricao: "Administração tributária e gestão financeira do município.",
        atribuicoes: [
            "Arrecadação de tributos",
            "IPTU e ITBI",
            "ISS",
            "Emissão de certidões"
        ],
        servicos: [
            "Emissão de IPTU",
            "Parcelamento de impostos",
            "Certidão Negativa",
            "Alvará de funcionamento"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["fazenda", "iptu", "imposto", "certidão", "alvará"]
    },
    protocolo: {
        nome: "Protocolo Geral",
        icone: "fas fa-file-alt",
        descricao: "Recebimento e encaminhamento de documentos e requerimentos.",
        atribuicoes: [
            "Recebimento de documentos",
            "Protocolo de processos",
            "Encaminhamento aos setores"
        ],
        servicos: [
            "Abertura de processos",
            "Protocolo de requerimentos",
            "Consulta de processos"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["protocolo", "processo", "requerimento", "documento"]
    },
    recursosHumanos: {
        nome: "Recursos Humanos",
        icone: "fas fa-users",
        descricao: "Gestão de pessoal da Prefeitura.",
        atribuicoes: [
            "Gestão de pessoal",
            "Folha de pagamento",
            "Concursos públicos"
        ],
        servicos: [
            "Emissão de contracheque",
            "Certidão de tempo de serviço",
            "Informações sobre concursos"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["rh", "servidor", "concurso", "contracheque"]
    },
    transito: {
        nome: "Trânsito e Mobilidade",
        icone: "fas fa-traffic-light",
        descricao: "Organização e fiscalização do trânsito municipal.",
        atribuicoes: [
            "Sinalização de trânsito",
            "Fiscalização",
            "Educação para o trânsito"
        ],
        servicos: [
            "Solicitação de sinalização",
            "Denúncias de trânsito",
            "Educação para o trânsito"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["trânsito", "semáforo", "sinalização", "multa"]
    },
    meioAmbiente: {
        nome: "Meio Ambiente",
        icone: "fas fa-leaf",
        descricao: "Política ambiental e fiscalização.",
        atribuicoes: [
            "Licenciamento ambiental",
            "Fiscalização ambiental",
            "Educação ambiental"
        ],
        servicos: [
            "Licença ambiental",
            "Autorização para corte de árvores",
            "Denúncias ambientais"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["ambiente", "árvore", "licença", "poluição"]
    },
    turismo: {
        nome: "Turismo",
        icone: "fas fa-umbrella-beach",
        descricao: "Promoção e desenvolvimento do turismo.",
        atribuicoes: [
            "Promoção turística",
            "Apoio ao trade turístico",
            "Eventos turísticos"
        ],
        servicos: [
            "Informações turísticas",
            "Calendário de eventos",
            "Roteiros turísticos"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["turismo", "praia", "evento", "hotel"]
    },
    esporteCultura: {
        nome: "Esporte e Cultura",
        icone: "fas fa-futbol",
        descricao: "Atividades esportivas e culturais.",
        atribuicoes: [
            "Programas esportivos",
            "Eventos culturais",
            "Gestão de ginásios"
        ],
        servicos: [
            "Escolinhas de esporte",
            "Reserva de quadras",
            "Biblioteca pública"
        ],
        contato: {
            horario: "Segunda a Sexta, 8h às 17h"
        },
        palavrasChave: ["esporte", "cultura", "quadra", "biblioteca"]
    }
};

module.exports = knowledgeBase;
