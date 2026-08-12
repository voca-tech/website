import { Lock, Ear, FileCheck, GraduationCap, KeyRound, UserCheck, Radar, Layers, RefreshCw, Zap, EyeOff, Brain, TrendingUp, BadgeCheck, Building2, type LucideIcon } from "lucide-react";

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

export const nr1Support = [
    "Termômetro de Humor: sinal diário do bem-estar dos times",
    "Leitura de sentimento por IA nas interações da plataforma",
    "Pesquisas customizadas para mapear riscos psicossociais por área",
    "Ouvidoria anônima para escuta segura de qualquer colaborador",
    "Indicadores e relatórios para embasar o plano de ação do RH",
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
