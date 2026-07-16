'use client'

import { useEffect, useRef, useState, type ForwardRefExoticComponent, type RefAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { HeartHandshakeIcon } from "@/components/ui/heart-handshake";
import { RocketIcon } from "@/components/ui/rocket";
import { ShieldCheckIcon } from "@/components/ui/shield-check";
import { EarthIcon } from "@/components/ui/earth";
import { cn } from "@/lib/utils";

type AnimatedIconHandle = { startAnimation: () => void; stopAnimation: () => void };
type AnimatedIcon = ForwardRefExoticComponent<{ size?: number } & RefAttributes<AnimatedIconHandle>>;

interface Reason {
    icon: AnimatedIcon;
    title: string;
    description: string;
    color: string;
}

const reasons: Reason[] = [
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
    },
    {
        icon: EarthIcon,
        title: "Pronto para crescer com você",
        description: "Da operação local à expansão internacional, a plataforma evolui junto com a sua empresa.",
        color: "#85568a",
    },
];

const stats = [
    { value: "72", suffix: "%", label: "dos funcionários estão insatisfeitos no trabalho. As 3 principais causas se relacionam à comunicação.", source: "ISMA Brasil / About.com" },
    { value: "20", suffix: "%", label: "a mais produz um funcionário engajado, com 87% menos chance de sair da empresa.", source: "Trampos.com" },
    { value: "47", suffix: "%", label: "de incremento financeiro médio em empresas com comunicação eficiente e propositiva.", source: "Towers Watson" },
];

const comparison = [
    { label: "Atendimento durante a implementação", voca: "Time humano dedicado", others: "Tickets e filas de suporte" },
    { label: "Tempo até o primeiro resultado", voca: "Onboarding assistido, sem meses de setup", others: "Configuração longa e técnica" },
    { label: "Gamificação", voca: "Nativa na plataforma", others: "Raramente incluída, ou como add-on" },
    { label: "Conformidade com a LGPD", voca: "Por padrão", others: "Varia de fornecedor pra fornecedor" },
    { label: "Evolução com a empresa", voca: "Acompanha do local ao internacional", others: "Geralmente pensada pra um único porte" },
];

// Illustrative UI mockups (fake data) for the feature showcase below — not real product
// screenshots. Dashed circles mark exactly where a real photo should go later.
function PlaceholderAvatar({ size = 32, label = "foto real" }: { size?: number; label?: string }) {
    return (
        <div
            className="shrink-0 rounded-full border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-center leading-none"
            style={{ width: size, height: size, fontSize: size / 3.4 }}
        >
            {label}
        </div>
    );
}

function HumanChatMockup({ color }: { color: string }) {
    return (
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <div className="flex items-center gap-1.5 pb-3 border-b border-slate-100">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="ml-2 text-xs font-medium text-slate-400">Chat com o time VOCA</span>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <div className="self-end max-w-[75%] rounded-2xl rounded-br-sm bg-slate-100 px-3 py-2 text-sm text-slate-600">
                    Consigo falar com alguém de verdade?
                </div>
                <div className="flex items-start gap-2 max-w-[85%]">
                    <PlaceholderAvatar size={32} />
                    <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-slate-700" style={{ backgroundColor: `${color}14` }}>
                        Claro! Sou eu mesma :) Como posso ajudar?
                        <span className="block mt-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
                            Humano · Time VOCA
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OnboardingMockup({ color }: { color: string }) {
    const steps = [
        { label: "Kickoff estratégico", done: true },
        { label: "Capacitação das lideranças", done: true },
        { label: "Onboarding (Go Live)", done: true },
        { label: "Primeiros dados gerados", done: false },
    ];
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Seu onboarding</p>
                <span className="text-xs font-bold" style={{ color }}>60%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: color }} />
            </div>
            <div className="flex flex-col gap-2.5 mt-4">
                {steps.map((step) => (
                    <div key={step.label} className="flex items-center gap-2 text-sm">
                        <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={step.done ? { backgroundColor: color, color: "white" } : { backgroundColor: "#f1f5f9", color: "#cbd5e1" }}
                        >
                            <Check size={12} />
                        </span>
                        <span className={step.done ? "text-slate-700" : "text-slate-400"}>{step.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-slate-100">
                <PlaceholderAvatar size={28} />
                <p className="text-xs text-slate-500">Especialista dedicado te acompanha nessa etapa</p>
            </div>
        </div>
    );
}

function SecurityMockup({ color }: { color: string }) {
    const items = ["Criptografia de dados", "Conformidade com a LGPD", "Controle de acesso por perfil"];
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <div className="flex items-center gap-2">
                <ShieldCheckIcon size={18} className="text-current" />
                <p className="text-sm font-bold text-slate-900">Conformidade e segurança</p>
            </div>
            <div className="flex flex-col gap-3.5 mt-4">
                {items.map((item) => (
                    <div key={item} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item}</span>
                        <span className="flex h-5 w-9 items-center rounded-full px-0.5" style={{ backgroundColor: color }}>
                            <span className="h-4 w-4 rounded-full bg-white ml-auto" />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GrowthMockup({ color }: { color: string }) {
    const scopes = ["Local", "Nacional", "Internacional"];
    const bars = [40, 65, 90];
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <p className="text-sm font-bold text-slate-900 mb-4">Sua operação, em qualquer escala</p>
            <div className="flex gap-2">
                {scopes.map((label, i) => (
                    <div
                        key={label}
                        className="flex-1 rounded-xl border p-2.5 text-center"
                        style={i === 1 ? { borderColor: color, backgroundColor: `${color}0D` } : { borderColor: "#e2e8f0" }}
                    >
                        <p className="text-xs font-bold" style={{ color: i === 1 ? color : "#94a3b8" }}>{label}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-end gap-2 h-20 mt-5">
                {bars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%`, backgroundColor: `${color}${i === bars.length - 1 ? "" : "B3"}` }} />
                ))}
            </div>
        </div>
    );
}

const mockups = [HumanChatMockup, OnboardingMockup, SecurityMockup, GrowthMockup];

function FeatureRow({ reason, mockup: Mockup, reversed, index }: { reason: Reason; mockup: (props: { color: string }) => JSX.Element; reversed: boolean; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<AnimatedIconHandle | null>(null);
    const [visible, setVisible] = useState(false);
    const Icon = reason.icon;

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    iconRef.current?.startAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={rowRef}
            className={cn(
                "flex flex-col lg:items-center gap-10 lg:gap-16",
                reversed ? "lg:flex-row-reverse" : "lg:flex-row"
            )}
        >
            <div
                className={cn(
                    "flex-1 transition-all duration-700",
                    visible ? "opacity-100 translate-x-0" : cn("opacity-0", reversed ? "lg:translate-x-6" : "lg:-translate-x-6")
                )}
            >
                <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${reason.color}14`, color: reason.color }}
                >
                    <Icon ref={iconRef} size={14} />
                    Motivo {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">{reason.title}</h2>
                <p className="text-slate-500 mt-4 max-w-md">{reason.description}</p>
            </div>

            <div
                className={cn(
                    "relative flex-1 flex justify-center transition-all duration-700 delay-150",
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
            >
                <div
                    className="absolute w-56 h-56 rounded-full blur-3xl opacity-[0.18] pointer-events-none"
                    style={{ backgroundColor: reason.color }}
                />
                <Mockup color={reason.color} />
            </div>
        </div>
    );
}

function CountUpStat({ target, suffix }: { target: number; suffix: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        const wrapper = wrapperRef.current;
        if (!el || !wrapper) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const counter = { val: 0 };
                gsap.to(counter, {
                    val: target,
                    duration: 1.4,
                    ease: "power2.out",
                    onUpdate: () => {
                        el.textContent = Math.round(counter.val) + suffix;
                    },
                });
                observer.disconnect();
            },
            { threshold: 0.4 }
        );
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, [target, suffix]);

    return (
        <div ref={wrapperRef}>
            <p ref={ref} className="text-4xl sm:text-5xl font-extrabold text-white">0{suffix}</p>
        </div>
    );
}

export default function PorQueVocaPage() {
    return (
        <div className="relative bg-white">
            <div className="relative py-16 sm:py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.3]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                </div>

                <div className="relative max-w-2xl mx-auto text-center">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Por que a VOCA</p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
                        Tecnologia forte. Time de verdade.
                    </h1>
                    <p className="text-lg text-slate-500 mt-5">
                        A tecnologia é só metade da equação. A outra metade é um time que se importa de verdade com o que acontece depois da implementação, todos os dias, não só no lançamento.
                    </p>
                </div>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20 flex flex-col gap-20 sm:gap-28">
                {reasons.map((reason, i) => (
                    <FeatureRow key={reason.title} reason={reason} mockup={mockups[i]} reversed={i % 2 === 1} index={i} />
                ))}
            </div>

            <div className="relative py-16 sm:py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}>
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={300}
                    height={369}
                    aria-hidden="true"
                    className="absolute -left-10 -bottom-16 opacity-[0.06] brightness-0 invert select-none pointer-events-none"
                />
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="relative max-w-4xl mx-auto text-center">
                    <p className="text-sm font-bold tracking-widest text-white/60 uppercase">Por que isso importa</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                        Comunicação ruim custa caro
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                    {stats.map((stat) => (
                        <div key={stat.source} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                            <CountUpStat target={Number(stat.value)} suffix={stat.suffix} />
                            <p className="text-sm text-white/70 mt-3 leading-relaxed">{stat.label}</p>
                            <p className="text-xs text-white/40 mt-3">Fonte: {stat.source}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-16 sm:py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Comparativo</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            VOCA vs. ferramentas tradicionais
                        </h2>
                        <p className="text-slate-500 mt-4">
                            Uma comparação geral com o que costuma ser padrão de mercado em ferramentas de gestão de pessoas.
                        </p>
                    </div>

                    <div
                        className="relative mt-10 rounded-[2.5rem] border border-white/60 bg-white/40 shadow-xl overflow-hidden"
                        style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.3] pointer-events-none"
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                            }}
                        />
                        <div
                            className="absolute inset-x-0 top-0 h-px pointer-events-none"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                        />

                        <div className="relative p-6 sm:p-10">
                            <div className="hidden sm:grid grid-cols-[1.1fr_1fr_1fr] gap-6 pb-4 border-b border-slate-200">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Critério</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-voca-green">Com a VOCA</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Ferramentas tradicionais</p>
                            </div>

                            {comparison.map((row) => (
                                <div
                                    key={row.label}
                                    className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr] gap-2 sm:gap-6 py-4 border-b border-slate-100 last:border-b-0 sm:items-center"
                                >
                                    <p className="text-sm font-bold text-slate-900">{row.label}</p>
                                    <p className="flex items-start gap-2 text-sm text-slate-600">
                                        <Check size={15} className="shrink-0 mt-0.5 text-voca-green" />
                                        {row.voca}
                                    </p>
                                    <p className="flex items-start gap-2 text-sm text-slate-400">
                                        <X size={15} className="shrink-0 mt-0.5 text-slate-300" />
                                        {row.others}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-16">
                <div className="max-w-4xl mx-auto rounded-2xl bg-voca-green px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-white/70 uppercase">Calculadora de ROI</p>
                        <h2 className="text-2xl font-extrabold text-white mt-2">
                            Quanto sua empresa pode economizar com o VOCA?
                        </h2>
                    </div>
                    <Link href="/roi" className="shrink-0">
                        <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                            Calcular agora
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="pb-16 px-6">
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
                    <Link href="/contact">
                        <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base font-semibold">
                            Agendar demonstração
                        </Button>
                    </Link>
                    <WhatsappLink variant="text" />
                </div>
            </div>
        </div>
    )
}
