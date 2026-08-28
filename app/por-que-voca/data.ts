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
        title: "Método VOCA: DNA do Engajamento",
        description: "Onboarding assistido e evolução cultural contínua. Pessoas no centro, dados como guia, cultura como resultado.",
        color: "#5f7480",
    },
    {
        icon: ShieldCheckIcon,
        title: "Segurança e Compliance",
        description: "Dados protegidos e em conformidade com a LGPD desde o primeiro dia.",
        color: "#2f6690",
        href: "/seguranca",
        linkLabel: "Ver segurança e compliance",
    },
    {
        icon: EarthIcon,
        title: "21 funcionalidades. 1 plataforma",
        description: "O lucro mais barato do seu negócio está na economia alcançada com a eficiência na operação de pessoas.",
        color: "#85568a",
    },
];

export const whyVocaStats: { value: string; suffix: string; label: string; source?: string }[] = [
    { value: "60", suffix: "%", label: "das pessoas estão insatisfeitas no trabalho. As 3 principais causas se relacionam à comunicação." },
    { value: "17", suffix: "%", label: "a mais produz um funcionário engajado, com 87% menos chance de sair da empresa.", source: "Gallup" },
    { value: "47", suffix: "%", label: "de incremento financeiro médio em empresas com comunicação eficiente e propositiva.", source: "Towers Watson" },
];
