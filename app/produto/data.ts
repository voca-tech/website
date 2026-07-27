import {
    Megaphone, Gauge, Sparkles, LayoutDashboard,
    Smile, Users, ThumbsUp, Gift, Lightbulb, MessageCircle, ShieldAlert,
    Award, ClipboardCheck, MessageSquare, GraduationCap,
    BarChart3, TrendingDown, UserCircle, Brain, PieChart,
    FolderOpen, CreditCard, ShoppingBag, Plug,
    type LucideIcon,
} from "lucide-react";

export interface Feature {
    name: string;
    description: string;
    icon: LucideIcon;
}

export interface Pillar {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    features: Feature[];
}

export const pillars: Pillar[] = [
    {
        id: "cultura",
        title: "Cultura & Engajamento",
        description: "Os canais que dão voz ao time e mantêm todo mundo conectado, mesmo à distância.",
        icon: Megaphone,
        color: "#007980",
        features: [
            { name: "Termômetro de Humor", description: "Sentimento do time, capturado todo dia.", icon: Smile },
            { name: "Rede Social Corporativa", description: "Comunicação com gamificação, time conectado.", icon: Users },
            { name: "Mural de Elogios", description: "Reconheça publicamente as pessoas do time.", icon: ThumbsUp },
            { name: "Aniversários", description: "Datas importantes, num mural visível a todos.", icon: Gift },
            { name: "Caixa de Ideias", description: "Canal digital pra captar ideias do time.", icon: Lightbulb },
            { name: "Fale com a Liderança", description: "Canal direto e privado com liderança ou RH.", icon: MessageCircle },
            { name: "Ouvidoria", description: "Denúncia e reclamação, anônima ou identificada.", icon: ShieldAlert },
        ],
    },
    {
        id: "performance",
        title: "Performance & Desenvolvimento",
        description: "Avaliação, feedback e aprendizado, tudo conectado para orientar o crescimento das pessoas.",
        icon: Gauge,
        color: "#5f7480",
        features: [
            { name: "Avaliação de Desempenho", description: "Avaliações 90º, 180º e 360º, com IA e direcionamento de PDI.", icon: Award },
            { name: "Plano de Desenvolvimento Individual", description: "Planos vinculados às competências identificadas.", icon: ClipboardCheck },
            { name: "Feedback", description: "Solicite ou dê feedbacks de forma contínua.", icon: MessageSquare },
            { name: "Treinamentos", description: "Academia corporativa com trilhas, quiz e certificado.", icon: GraduationCap },
            { name: "Gamificação", description: "Conquistas, rankings e desafios pra engajar o time.", icon: Sparkles },
        ],
    },
    {
        id: "inteligencia",
        title: "Inteligência & People Analytics",
        description: "Dados que viram decisão, para toda a empresa ou segmentados por área.",
        icon: LayoutDashboard,
        color: "#2f6690",
        features: [
            { name: "Pesquisas Customizadas", description: "200 perguntas prontas, customização ilimitada.", icon: BarChart3 },
            { name: "Análise de Turnover", description: "Formulários de desligamento e indicadores por área.", icon: TrendingDown },
            { name: "Perfil do Usuário 360º", description: "Visão completa cruzando dados da plataforma.", icon: UserCircle },
            { name: "Leitura de Sentimento (IA)", description: "Análise de sentimento em pesquisas e feedbacks.", icon: Brain },
            { name: "Indicadores e Relatórios", description: "Dados segmentados, exportáveis pra Excel.", icon: PieChart },
        ],
    },
    {
        id: "operacoes",
        title: "Operações & Serviços Internos",
        description: "O dia a dia operacional do RH, resolvido dentro da mesma plataforma.",
        icon: FolderOpen,
        color: "#85568a",
        features: [
            { name: "Repositório de Arquivos", description: "Manuais e processos num ambiente privado e seguro.", icon: FolderOpen },
            { name: "Crachá Digital", description: "Acesso via app, com bloqueio pra desligados.", icon: CreditCard },
            { name: "Classificados (Marketplace)", description: "Colaboradores compram e vendem entre si.", icon: ShoppingBag },
            { name: "Integração com Sistemas", description: "Conecte o VOCA ao que sua empresa já usa.", icon: Plug },
        ],
    },
];
