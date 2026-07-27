import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { HeartHandshakeIcon } from "@/components/ui/heart-handshake";
import { RocketIcon } from "@/components/ui/rocket";
import { ShieldCheckIcon } from "@/components/ui/shield-check";
import { EarthIcon } from "@/components/ui/earth";

export type AnimatedIconHandle = { startAnimation: () => void; stopAnimation: () => void };
export type AnimatedIcon = ForwardRefExoticComponent<{ size?: number } & RefAttributes<AnimatedIconHandle>>;

export interface Reason {
    icon: AnimatedIcon;
    title: string;
    description: string;
    color: string;
    href?: string;
    linkLabel?: string;
}

export const reasons: Reason[] = [
    {
        icon: HeartHandshakeIcon,
        title: "Atendimento humano",
        description: "Sem robôs, sem tickets perdidos. Um time de verdade acompanha sua implementação e o seu dia a dia.",
        color: "#007980",
    },
    {
        icon: RocketIcon,
        title: "Implementação assistida",
        description: "Onboarding guiado pela nossa equipe, sem meses de configuração até ver resultado.",
        color: "#5f7480",
    },
    {
        icon: ShieldCheckIcon,
        title: "Segurança e LGPD",
        description: "Dados protegidos e em conformidade com a legislação brasileira desde o primeiro dia.",
        color: "#2f6690",
        href: "/seguranca",
        linkLabel: "Ver segurança e compliance",
    },
    {
        icon: EarthIcon,
        title: "Pronto para crescer com você",
        description: "Da operação local à expansão internacional, a plataforma evolui junto com a sua empresa.",
        color: "#85568a",
    },
];

export const whyVocaStats = [
    { value: "72", suffix: "%", label: "dos funcionários estão insatisfeitos no trabalho. As 3 principais causas se relacionam à comunicação.", source: "ISMA Brasil / About.com" },
    { value: "20", suffix: "%", label: "a mais produz um funcionário engajado, com 87% menos chance de sair da empresa.", source: "Trampos.com" },
    { value: "47", suffix: "%", label: "de incremento financeiro médio em empresas com comunicação eficiente e propositiva.", source: "Towers Watson" },
];
