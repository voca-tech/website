import {
    Lock, Ear, FileCheck, GraduationCap, KeyRound, UserCheck, Radar, Layers, RefreshCw, Zap, EyeOff, Brain, TrendingUp, BadgeCheck, Building2,
    FileSpreadsheet, TrendingDown, AlertCircle, ShieldAlert, Search, BarChart3, Shield, Users, type LucideIcon,
} from "lucide-react";

export interface SecurityFeature {
    icon: LucideIcon;
    title: string;
    description: string;
    short: string;
    color: string;
}

export const securityFeatures: SecurityFeature[] = [
    {
        icon: Lock,
        title: "Conformidade com a LGPD",
        description: "Dados protegidos e tratados em conformidade com a legislação brasileira de proteção de dados, desde o primeiro dia.",
        short: "Em conformidade com a LGPD desde o dia 1.",
        color: "#007980",
    },
    {
        icon: Ear,
        title: "Ouvidoria anônima",
        description: "Canal de denúncia e escuta com anonimato garantido, com relatórios prontos para auditoria externa.",
        short: "Denúncias anônimas, prontas para auditoria.",
        color: "#5f7480",
    },
    {
        icon: GraduationCap,
        title: "Trilhas com certificação",
        description: "Treinamentos obrigatórios com certificação automática e histórico rastreável de conclusão.",
        short: "Certificação automática e histórico rastreável.",
        color: "#85568a",
    },
    {
        icon: FileCheck,
        title: "Relatórios de auditoria",
        description: "Histórico rastreável de treinamentos, políticas internas e interações, pronto para ESG e reguladores.",
        short: "Tudo rastreável, pronto pra ESG e reguladores.",
        color: "#a5760f",
    },
];

export interface ComplianceBadge {
    icon: LucideIcon;
    title: string;
    short: string;
    color: string;
}

export const complianceBadges: ComplianceBadge[] = [
    {
        icon: Lock,
        title: "Conformidade com a LGPD",
        short: "Segurança e compliance desde a implantação.",
        color: "#007980",
    },
    {
        icon: EyeOff,
        title: "Privacidade por padrão",
        short: "Dados protegidos e confidenciais.",
        color: "#5f7480",
    },
    {
        icon: Brain,
        title: "Uso responsável de IA",
        short: "Governança alinhada às diretrizes da LGPD e às recomendações da ANPD.",
        color: "#2f6690",
    },
    {
        icon: FileCheck,
        title: "Relatórios de auditoria",
        short: "Rastreabilidade completa para fiscalização e prestação de contas.",
        color: "#a5760f",
    },
];

export const nr1Problems = [
    {
        icon: FileSpreadsheet,
        label: "Processos fragmentados de clima, feedback e saúde mental",
    },
    {
        icon: TrendingDown,
        label: "Dependência de planilhas e pesquisas pontuais",
    },
    {
        icon: AlertCircle,
        label: "Falta de indicadores contínuos e auditáveis",
    },
    {
        icon: ShieldAlert,
        label: "Insegurança jurídica e desgaste da liderança",
    },
];

export const nr1Requirements = [
    "Diagnóstico recorrente de riscos psicossociais",
    "Monitoramento contínuo do clima e da saúde emocional",
    "Evidências documentadas e prontas para auditoria",
    "Planos de ação claros e executáveis",
    "Capacitação das lideranças",
];

export const nr1SolutionPillars = [
    {
        icon: Search,
        title: "Identificar",
        items: ["Termômetro de Humor", "Pesquisas de clima", "Análise de sentimento (IA)"],
    },
    {
        icon: BarChart3,
        title: "Monitorar & Comprovar",
        items: ["Dashboards por área", "Relatórios auditáveis", "Histórico rastreável"],
    },
    {
        icon: Zap,
        title: "Agir",
        items: ["Trilhas para líderes", "Feedback e Ouvidoria", "Comunicação estruturada"],
    },
];

export const nr1Outcomes = [
    { icon: Shield, label: "Reduzir riscos" },
    { icon: Users, label: "Dar clareza à liderança" },
    { icon: TrendingUp, label: "Crescer com tranquilidade" },
];

export const digitalShieldLayers = [
    {
        icon: KeyRound,
        title: "Criptografia de dados",
        description: "Dados protegidos em trânsito e em repouso, do primeiro ao último byte.",
    },
    {
        icon: UserCheck,
        title: "Controle de acesso por perfil",
        description: "Cada pessoa só acessa o que é relevante pra sua função: RH, liderança ou colaborador.",
    },
    {
        icon: Radar,
        title: "Monitoramento contínuo",
        description: "Vigilância constante contra acessos indevidos e comportamentos fora do padrão.",
    },
];

export const awsPillars = [
    {
        icon: Layers,
        title: "Infraestrutura de nível global",
        description: "A mesma nuvem que sustenta empresas do mundo inteiro, com os padrões de segurança de um provedor líder de mercado.",
    },
    {
        icon: RefreshCw,
        title: "Redundância",
        description: "Dados replicados, sem depender de um único ponto de falha.",
    },
    {
        icon: Zap,
        title: "Alta disponibilidade",
        description: "Plataforma no ar quando sua empresa precisar dela.",
    },
    {
        icon: TrendingUp,
        title: "Escalabilidade sob demanda",
        description: "A estrutura acompanha o crescimento da empresa, sem migração nem reconfiguração pelo caminho.",
    },
    {
        icon: BadgeCheck,
        title: "Certificações internacionais",
        description: "Os data centers da AWS mantêm as principais certificações de segurança do mercado global.",
    },
    {
        icon: Building2,
        title: "Segurança física",
        description: "Controle de acesso, vigilância e redundância elétrica sob responsabilidade da própria AWS.",
    },
];
