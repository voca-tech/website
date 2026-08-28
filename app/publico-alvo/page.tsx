'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import {
    Check,
    Calculator, Gauge, Trophy, MessageCircle, ArrowRight,
    TrendingDown, Database, Workflow, Unplug, RotateCw,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { cn } from "@/lib/utils";
import { personas } from "./data";

const challenges = [
    {
        id: "turnover",
        icon: TrendingDown,
        label: "Rotatividade alta",
        solution: "Termômetro de Humor e Análise de Turnover identificam os sinais antes da saída. O PDI vinculado à avaliação mostra que a empresa investe no desenvolvimento.",
        proof: { text: "Woodbridge: 95% de participação nas pesquisas de clima", slug: "woodbridge-pesquisa" },
    },
    {
        id: "dados",
        icon: Database,
        label: "Dados dispersos em planilhas",
        solution: "Dashboards em tempo real com indicadores de clima, engajamento e performance, sem exportar nem consolidar nada na mão.",
        proof: { text: "SP Engenharia: 100% das avaliações centralizadas", slug: "sp-engenharia" },
    },
    {
        id: "processo",
        icon: Workflow,
        label: "Processo manual e lento",
        solution: "Implementação assistida pelo time VOCA em semanas, não em meses, com trilhas e relatórios de auditoria rodando sozinhos.",
        proof: { text: "Credi10: 100% dos aprendizes na trilha nos 5 primeiros dias", slug: "credi10-treinamentos" },
    },
    {
        id: "comunicacao",
        icon: Unplug,
        label: "Comunicação fragmentada",
        solution: "Rede Social Corporativa, 6 canais de voz e notificações push, reunindo a empresa toda no mesmo lugar.",
        proof: { text: "Grant Thornton: 261.560 visualizações em 60 dias", slug: "grant-thornton" },
    },
];

const beforeAfter = [
    {
        personaId: "decisores",
        before: "Decisões estratégicas baseadas em intuição e relatórios manuais que já nascem desatualizados.",
        after: "Indicadores da empresa toda em tempo real, com risco de turnover sinalizado antes de virar perda de talento.",
    },
    {
        personaId: "gestores",
        before: "Só descobre que alguém do time está infeliz quando a carta de demissão já chegou.",
        after: "Alertas de risco de saída por colaborador, com antecedência suficiente pra agir, e PDI direcionado a partir do resultado da avaliação.",
    },
    {
        personaId: "colaboradores",
        before: "Feedback que nunca chega e conquistas que ninguém reconhece de verdade.",
        after: "Canais de escuta com anonimato garantido, reconhecimento público, gamificação com conquistas e uma plataforma com a cara da própria empresa.",
    },
    {
        personaId: "time-rh",
        before: "Cinco ferramentas separadas, tickets perdidos e configuração que nunca termina.",
        after: "Implementação assistida por um time humano, num sistema só pra tudo.",
    },
];

const featureMatrix: { feature: string; views: Record<string, string> }[] = [
    {
        feature: "Avaliação de Desempenho",
        views: {
            decisores: "Visão agregada de performance por área e por período",
            gestores: "Trilhas de desenvolvimento direcionadas pro time",
            colaboradores: "Feedback claro sobre o próprio crescimento",
            "time-rh": "Histórico auditável, pronto pra compliance",
        },
    },
    {
        feature: "Pesquisas",
        views: {
            decisores: "Indicadores da empresa toda, em tempo real",
            gestores: "Clima do time, segmentado por área",
            colaboradores: "Espaço seguro pra opinar, com anonimato garantido",
            "time-rh": "200 perguntas prontas, sem montar do zero",
        },
    },
    {
        feature: "Termômetro de Humor",
        views: {
            decisores: "Alertas de risco antes de virar problema",
            gestores: "Sinal diário de como o time está",
            colaboradores: "Registrar o dia em segundos, sem burocracia",
            "time-rh": "Dados de bem-estar pra embasar ações do RH",
        },
    },
];

const nextSteps = [
    { personaId: "decisores", icon: Calculator, cta: "Calcular o ROI", description: "Veja quanto sua empresa pode economizar migrando pro VOCA.", href: "/roi" },
    { personaId: "gestores", icon: Gauge, cta: "Ver o produto", description: "Conheça as funcionalidades de performance e desenvolvimento.", href: "/produto" },
    { personaId: "colaboradores", icon: Trophy, cta: "Ver cases reais", description: "Veja o que mudou em empresas que já usam o VOCA.", href: "/casos-de-sucesso" },
    { personaId: "time-rh", icon: MessageCircle, cta: "Falar com especialista", description: "Tire dúvidas sobre implementação direto com o time VOCA.", href: "/contact" },
];

export default function PublicoAlvoPage() {
    const [activeId, setActiveId] = useState(personas[0].id);
    const [displayedId, setDisplayedId] = useState(activeId);
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedChallenges, setSelectedChallenges] = useState<Set<string>>(new Set());
    const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
    const beforeAfterRef = useRef<HTMLDivElement>(null);
    const matrixRef = useRef<HTMLDivElement>(null);
    const [focusedPersona, setFocusedPersona] = useState<string | null>(null);

    const active = personas.find((p) => p.id === activeId)!;
    const displayed = personas.find((p) => p.id === displayedId)!;

    function toggleChallenge(id: string) {
        setSelectedChallenges((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function toggleFlip(id: string) {
        setFlippedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    useEffect(() => {
        const el = beforeAfterRef.current;
        if (!el) return;
        const firstId = beforeAfter[0].personaId;
        let timeouts: ReturnType<typeof setTimeout>[] = [];
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                timeouts = [
                    setTimeout(() => toggleFlip(firstId), 700),
                    setTimeout(() => toggleFlip(firstId), 2200),
                ];
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            timeouts.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (activeId === displayedId || !contentRef.current) return;
        const pieces = contentRef.current.querySelectorAll(".stagger-item");
        gsap.to(pieces, {
            opacity: 0,
            y: -14,
            duration: 0.18,
            stagger: 0.03,
            ease: "power1.in",
            onComplete: () => setDisplayedId(activeId),
        });
    }, [activeId, displayedId]);

    useEffect(() => {
        if (!contentRef.current) return;
        const pieces = contentRef.current.querySelectorAll(".stagger-item");
        gsap.fromTo(
            pieces,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }, [displayedId]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".matrix-row",
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: matrixRef.current,
                        start: "top 82%",
                        end: "bottom 75%",
                        scrub: 0.8,
                    },
                }
            );
        }, matrixRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative bg-white py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="voca-title text-3xl sm:text-4xl font-extrabold">
                        Um VOCA diferente para cada pessoa na sua empresa
                    </h1>
                    <p className="text-lg text-slate-500 mt-4">
                        A plataforma se adapta a quem está usando, do C-level ao colaborador da ponta.
                    </p>
                </div>

                <div className="relative mt-12">
                    <div className="absolute -inset-10 pointer-events-none" aria-hidden="true">
                        <div
                            className="absolute left-8 top-4 h-72 w-72 rounded-full blur-3xl opacity-25 transition-colors duration-700"
                            style={{ backgroundColor: active.color }}
                        />
                        <div
                            className="absolute right-8 bottom-4 h-72 w-72 rounded-full blur-3xl opacity-20 transition-colors duration-700"
                            style={{ backgroundColor: active.color }}
                        />
                    </div>

                    <div
                        className="relative rounded-[2.5rem] border border-white/60 bg-white/40 overflow-hidden transition-shadow duration-700"
                        style={{
                            backdropFilter: "blur(28px)",
                            WebkitBackdropFilter: "blur(28px)",
                            boxShadow: `0 30px 80px -24px ${active.color}66`,
                        }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none transition-colors duration-700"
                            style={{ background: `linear-gradient(135deg, ${active.color}22, transparent 55%)` }}
                        />
                        <div
                            className="absolute inset-x-0 top-0 h-px pointer-events-none"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                        />

                        <div className="relative grid grid-cols-2 sm:flex sm:flex-wrap gap-2 p-3 sm:p-5 border-b border-white/60">
                            {personas.map((persona) => {
                                const isActive = persona.id === activeId;
                                return (
                                    <button
                                        key={persona.id}
                                        onClick={() => setActiveId(persona.id)}
                                        className={cn(
                                            "relative min-w-0 sm:flex-1 sm:min-w-[11rem] flex items-center gap-2 sm:gap-3 rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 text-left overflow-hidden",
                                            !isActive && "hover:bg-white/50 transition-colors duration-300"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="persona-tab-highlight"
                                                className="absolute inset-0 rounded-2xl shadow-md"
                                                style={{ backgroundColor: persona.color }}
                                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            />
                                        )}
                                        <div
                                            className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                                            style={{
                                                backgroundColor: isActive ? "rgba(255,255,255,0.25)" : `${persona.color}1A`,
                                                color: isActive ? "white" : persona.color,
                                            }}
                                        >
                                            <persona.icon size={16} className="sm:hidden" />
                                            <persona.icon size={18} className="hidden sm:block" />
                                        </div>
                                        <p className={cn("relative text-xs sm:text-sm font-bold truncate", isActive ? "text-white" : "text-slate-700")}>
                                            {persona.title}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        <div ref={contentRef} className="relative lg:min-h-[30rem] p-6 sm:p-10">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                <div className="flex-1 order-2 lg:order-1">
                                    <p className="stagger-item text-sm font-bold uppercase tracking-widest" style={{ color: displayed.color }}>
                                        {displayed.title}
                                    </p>
                                    <p className="stagger-item text-slate-600 text-lg mt-3 max-w-md">{displayed.description}</p>

                                    <ul className="stagger-item flex flex-col gap-2.5 mt-6">
                                        {displayed.points.map((point) => (
                                            <li key={point} className="text-sm text-slate-600 flex gap-2.5">
                                                <Check size={16} className="shrink-0 mt-0.5" style={{ color: displayed.color }} />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/casos-de-sucesso#${displayed.stat.caseSlug}`}
                                        className="group stagger-item flex items-start gap-3 rounded-2xl p-4 mt-6 transition-colors duration-200 hover:bg-black/[0.03]"
                                        style={{ backgroundColor: `${displayed.color}0D` }}
                                    >
                                        <p className="text-2xl font-extrabold shrink-0" style={{ color: displayed.color }}>
                                            {displayed.stat.value}
                                        </p>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            {displayed.stat.label}
                                            <span
                                                className="flex items-center gap-1 font-bold mt-1 group-hover:underline underline-offset-2"
                                                style={{ color: displayed.color }}
                                            >
                                                Caso real · {displayed.stat.source}
                                                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                                            </span>
                                        </p>
                                    </Link>

                                    <div className="stagger-item flex flex-wrap gap-2 mt-5">
                                        {displayed.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="rounded-full border px-3 py-1 text-xs font-medium"
                                                style={{ borderColor: `${displayed.color}33`, color: displayed.color }}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="stagger-item relative flex-1 order-1 lg:order-2 w-full pb-6 pl-6">
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                                        <Image
                                            src={displayed.image}
                                            alt={displayed.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: `linear-gradient(180deg, transparent 50%, ${displayed.color}55)` }}
                                        />
                                    </div>

                                    <div className="absolute bottom-0 left-0 flex items-center gap-2.5 rounded-2xl bg-white pl-2.5 pr-4 py-2.5 shadow-lg">
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: `${displayed.color}1A`, color: displayed.color }}
                                        >
                                            <displayed.icon size={16} />
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 whitespace-nowrap">
                                            Feito pra {displayed.title.toLowerCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                    {personas.map((persona) => (
                        <button
                            key={persona.id}
                            onClick={() => setActiveId(persona.id)}
                            className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition-colors duration-200 hover:border-slate-300"
                        >
                            <p className="text-xl font-extrabold" style={{ color: persona.color }}>{persona.stat.value}</p>
                            <p className="text-xs text-slate-500 mt-1 leading-snug">{persona.stat.label}</p>
                            <p className="text-[10px] text-slate-400 mt-2">
                                {persona.title} ·{" "}
                                <Link
                                    href={`/casos-de-sucesso#${persona.stat.caseSlug}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-bold hover:underline underline-offset-2"
                                    style={{ color: persona.color }}
                                >
                                    {persona.stat.source}
                                </Link>
                            </p>
                        </button>
                    ))}
                </div>

                <div className="relative mt-24 py-20">
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-slate-50" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen opacity-[0.35] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div className="relative">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                            A mesma funcionalidade, um valor diferente pra cada pessoa
                        </h2>
                        <p className="text-slate-500 mt-4">
                            Ninguém usa o VOCA do mesmo jeito. Veja como 3 funcionalidades reais mudam de significado conforme quem está olhando.
                        </p>
                        <p className="hidden sm:block text-xs text-slate-400 mt-3">
                            Passe o mouse sobre um perfil para isolar a leitura dele.
                        </p>
                    </div>

                    <div ref={matrixRef} className="relative mt-10 rounded-[2.5rem] border border-slate-200 bg-white overflow-hidden">
                        <div className="hidden sm:grid grid-cols-[1.2fr_repeat(4,1fr)] bg-slate-50 border-b border-slate-200">
                            <div className="p-4" />
                            {personas.map((persona) => {
                                const isFocused = focusedPersona === persona.id;
                                return (
                                    <div
                                        key={persona.id}
                                        onMouseEnter={() => setFocusedPersona(persona.id)}
                                        onMouseLeave={() => setFocusedPersona(null)}
                                        style={{ backgroundColor: isFocused ? `${persona.color}14` : undefined }}
                                        className="p-4 flex flex-col items-center gap-1.5 text-center transition-all duration-300"
                                    >
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300"
                                            style={{
                                                backgroundColor: isFocused ? persona.color : `${persona.color}1A`,
                                                color: isFocused ? "#ffffff" : persona.color,
                                                transform: isFocused ? "scale(1.12)" : "scale(1)",
                                            }}
                                        >
                                            <persona.icon size={16} />
                                        </div>
                                        <span className="text-xs font-bold" style={{ color: persona.color }}>{persona.title}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {featureMatrix.map((row) => (
                            <div
                                key={row.feature}
                                className="matrix-row grid grid-cols-1 sm:grid-cols-[1.2fr_repeat(4,1fr)] border-b border-slate-100 last:border-b-0"
                            >
                                <div className="p-4 sm:p-5 font-bold text-sm text-slate-900 bg-slate-50 sm:bg-transparent flex items-center">
                                    {row.feature}
                                </div>
                                {personas.map((persona) => (
                                    <div
                                        key={persona.id}
                                        style={{
                                            backgroundColor: focusedPersona === persona.id ? `${persona.color}0A` : undefined,
                                            opacity: focusedPersona && focusedPersona !== persona.id ? 0.35 : 1,
                                        }}
                                        className="matrix-cell p-4 sm:p-5 text-sm text-slate-600 border-t sm:border-t-0 sm:border-l border-slate-100 leading-snug transition-all duration-300"
                                    >
                                        <span className="sm:hidden text-xs font-bold" style={{ color: persona.color }}>
                                            {persona.title}:{" "}
                                        </span>
                                        {row.views[persona.id]}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="mt-24">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                            Qual é o seu próximo passo?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                        {nextSteps.map((step) => {
                            const persona = personas.find((p) => p.id === step.personaId)!;
                            return (
                                <Link
                                    key={step.personaId}
                                    href={step.href}
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div
                                        className="flex h-11 w-11 items-center justify-center rounded-full mb-4"
                                        style={{ backgroundColor: `${persona.color}1A`, color: persona.color }}
                                    >
                                        <step.icon size={20} />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: persona.color }}>
                                        {persona.title}
                                    </p>
                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{step.description}</p>
                                    <span
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4 group-hover:gap-2.5 transition-all"
                                        style={{ color: persona.color }}
                                    >
                                        {step.cta}
                                        <ArrowRight size={14} />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="relative mt-24 py-20">
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-slate-50" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen opacity-[0.35] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div className="relative">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                            Qual desafio mais bate na sua rotina?
                        </h2>
                        <p className="text-slate-500 mt-4">Selecione um ou mais e veja como o VOCA resolve.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                        {challenges.map((challenge) => {
                            const isActive = selectedChallenges.has(challenge.id);
                            return (
                                <button
                                    key={challenge.id}
                                    onClick={() => toggleChallenge(challenge.id)}
                                    className={cn(
                                        "flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200",
                                        isActive
                                            ? "border-voca-green bg-voca-green/10 text-voca-green"
                                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    )}
                                >
                                    <challenge.icon size={17} />
                                    {challenge.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="max-w-2xl mx-auto mt-8">
                        <AnimatePresence mode="popLayout">
                            {selectedChallenges.size === 0 ? (
                                <motion.p
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center text-sm text-slate-400 italic py-6"
                                >
                                    Escolha pelo menos um desafio acima pra ver a solução.
                                </motion.p>
                            ) : (
                                challenges
                                    .filter((challenge) => selectedChallenges.has(challenge.id))
                                    .map((challenge) => (
                                        <motion.div
                                            key={challenge.id}
                                            layout
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 mb-3 last:mb-0"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                                                <challenge.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{challenge.label}</p>
                                                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{challenge.solution}</p>
                                                <Link
                                                    href={`/casos-de-sucesso#${challenge.proof.slug}`}
                                                    className="group/proof inline-flex items-center gap-1.5 text-xs font-bold text-voca-green mt-2.5"
                                                >
                                                    {challenge.proof.text}
                                                    <ArrowRight size={12} className="transition-transform group-hover/proof:translate-x-0.5" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))
                            )}
                        </AnimatePresence>
                    </div>
                    </div>
                </div>

                <div className="mt-24">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                            O que muda no dia a dia de cada perfil
                        </h2>
                        <p className="text-slate-500 mt-4">Clique num card pra virar e ver o antes e o depois.</p>
                    </div>

                    <div
                        ref={beforeAfterRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10"
                        style={{ perspective: 1200 }}
                    >
                        {beforeAfter.map((item) => {
                            const persona = personas.find((p) => p.id === item.personaId)!;
                            const isFlipped = flippedIds.has(item.personaId);
                            return (
                                <motion.button
                                    key={item.personaId}
                                    onClick={() => toggleFlip(item.personaId)}
                                    className="relative h-64 w-full text-left"
                                    style={{ transformStyle: "preserve-3d" }}
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                >
                                    <div
                                        className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <persona.icon
                                            size={100}
                                            strokeWidth={1}
                                            className="absolute -right-5 -top-5 opacity-[0.06]"
                                            style={{ color: persona.color }}
                                        />
                                        <div className="relative flex items-center justify-between">
                                            <div
                                                className="flex h-10 w-10 items-center justify-center rounded-full"
                                                style={{ backgroundColor: `${persona.color}1A`, color: persona.color }}
                                            >
                                                <persona.icon size={18} />
                                            </div>
                                            <motion.div
                                                animate={{ rotate: [0, -14, 14, 0] }}
                                                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
                                            >
                                                <RotateCw size={14} className="text-slate-300" />
                                            </motion.div>
                                        </div>
                                        <p className="relative text-xs font-bold uppercase tracking-wide text-slate-400 mt-4">
                                            {persona.title} · hoje
                                        </p>
                                        <div className="relative flex flex-1 items-center">
                                            <p className="text-base text-slate-700 leading-snug">{item.before}</p>
                                        </div>
                                        <p className="relative text-[10px] text-slate-400">Clique pra ver com o VOCA</p>
                                    </div>

                                    <div
                                        className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl p-5 text-white shadow-sm"
                                        style={{ backgroundColor: persona.color, transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                                    >
                                        <div
                                            className="absolute inset-0 opacity-[0.08]"
                                            style={{
                                                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                                                backgroundSize: "14px 14px",
                                            }}
                                        />
                                        <persona.icon size={100} strokeWidth={1} className="absolute -right-5 -top-5 text-white opacity-[0.12]" />
                                        <div className="relative flex items-center justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                                <persona.icon size={18} />
                                            </div>
                                            <RotateCw size={14} className="text-white/60" />
                                        </div>
                                        <p className="relative text-xs font-bold uppercase tracking-wide text-white/70 mt-4">
                                            {persona.title} · com VOCA
                                        </p>
                                        <div className="relative flex flex-1 items-center">
                                            <p className="text-base leading-snug">{item.after}</p>
                                        </div>
                                        <p className="relative text-[10px] text-white/60">Clique pra voltar</p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-14">
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
