import {
    Briefcase, Users, Smile, ClipboardList,
    type LucideIcon,
} from "lucide-react";

export interface Persona {
    id: string;
    icon: LucideIcon;
    title: string;
    headline: string;
    description: string;
    color: string;
    image: string;
    points: string[];
    features: string[];
    stat: { value: string; label: string; source: string; caseSlug: string };
}

export const personas: Persona[] = [
    {
        id: "decisores",
        icon: Briefcase,
        title: "Decisores",
        headline: "Tenha os insights e recomendações de ação que você precisa para tomar decisões assertivas, baseadas em dados estratégicos.",
        description: "Para quem precisa enxergar a empresa toda e decidir com dados, não com achismo, do C-level à diretoria de RH.",
        color: "#2f6690",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&q=80",
        points: [
            "Dados que antecipam risco de turnover antes que ele vire perda de talento",
            "Indicadores de toda a empresa reunidos em tempo real, sem depender de planilha",
            "Decisões estratégicas apoiadas em evidência, não em intuição",
            "Visão comparativa entre áreas, filiais e períodos, num único painel",
        ],
        features: ["Indicadores e Relatórios", "Análise de Turnover", "Pesquisas"],
        stat: { value: "96%", label: "de engajamento de líderes com os dados de performance", source: "SP Engenharia", caseSlug: "sp-engenharia" },
    },
    {
        id: "gestores",
        icon: Users,
        title: "Gestores",
        headline: "Lidere times de alta performance, engajando as pessoas e retendo os talentos.",
        description: "Para quem lidera equipes no dia a dia e precisa de sinais antes que os problemas cresçam.",
        color: "#798f4f",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=80",
        points: [
            "Alertas de risco de saída por colaborador, com antecedência pra agir",
            "Avaliações de desempenho rápidas, com trilhas de desenvolvimento direcionadas",
            "Times mais conectados, mesmo com equipes espalhadas entre unidades",
            "Feedback contínuo, sem esperar o ciclo formal de avaliação",
        ],
        features: ["Avaliação de Desempenho", "Feedback", "Plano de Desenvolvimento (PDI)"],
        stat: { value: "95%", label: "de taxa de resposta às pesquisas de clima do time", source: "Woodbridge", caseSlug: "woodbridge-pesquisa" },
    },
    {
        id: "colaboradores",
        icon: Smile,
        title: "Colaboradores",
        headline: "Seja o dono do seu desenvolvimento e dos seus resultados.",
        description: "Para quem quer ser ouvido e reconhecido, com segurança de que sua voz importa, assumindo responsabilidades na empresa.",
        color: "#47ad7f",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80",
        points: [
            "Canais de escuta e reconhecimento com anonimato garantido",
            "Aprendizado que parece jogo, não obrigação",
            "Conquistas, rankings e desafios que engajam de verdade",
            "Espaço pra sugerir ideias e ver o que a empresa faz com elas",
        ],
        features: ["Mural de Elogios", "Gamificação", "Rede Social Corporativa"],
        stat: { value: "92%", label: "de confiança dos colaboradores nos canais de escuta", source: "Credi10", caseSlug: "credi10-compliance" },
    },
    {
        id: "time-rh",
        icon: ClipboardList,
        title: "Time de RH",
        headline: "Construa uma estratégia proativa em comunicação e pessoas.",
        description: "Para quem precisa operacionalizar tudo isso, com o mínimo de dor de cabeça possível.",
        color: "#85568a",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80",
        points: [
            "Implementação assistida, sem meses de configuração até ver resultado",
            "Atendimento humano, sem tickets perdidos no meio do caminho",
            "Trilhas obrigatórias com certificação e relatórios de auditoria automáticos",
            "Um sistema só pra tudo, em vez de 5 ferramentas separadas",
        ],
        features: ["Crachá Digital", "Repositório de Arquivos", "Integração com Sistemas"],
        stat: { value: "-40%", label: "no tempo de integração de novos colaboradores", source: "Credi10", caseSlug: "credi10-treinamentos" },
    },
];
