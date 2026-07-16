'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Check, Search, GraduationCap, Rocket, BarChart3, Milestone,
    Megaphone, Gauge, LayoutDashboard, FolderOpen,
    type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { cn } from "@/lib/utils";
import { cases, PILLARS, type PillarId } from "./data";

const PILLAR_ICONS: Record<PillarId, LucideIcon> = {
    cultura: Megaphone,
    performance: Gauge,
    inteligencia: LayoutDashboard,
    operacoes: FolderOpen,
};

const journey = [
    { icon: Search, title: "Kickoff estratégico", description: "Alinhamento com RH e liderança, mapeamento dos fluxos, desafios e configurações iniciais." },
    { icon: GraduationCap, title: "Capacitação das lideranças", description: "Treinamento do time de RH e gestores, com foco nas prioridades do cliente." },
    { icon: Rocket, title: "Onboarding (Go Live)", description: "Entrada dos colaboradores com suporte ativo do VOCA e acompanhamento das lideranças." },
    { icon: BarChart3, title: "Primeiros dados gerados", description: "Interações semanais com o time VOCA e direcionamento de uso a partir dos primeiros indicadores." },
    { icon: Milestone, title: "Revisão e evolução", description: "Reunião trimestral com report estratégico e definição de novas frentes." },
];

const statWall = [
    { value: "1.670", label: "avaliações de desempenho", company: "Grant Thornton" },
    { value: "100%", label: "conformidade para auditoria", company: "Credi10" },
    { value: "96%", label: "engajamento de líderes", company: "SP Engenharia" },
    { value: "95%", label: "taxa de resposta às pesquisas", company: "Woodbridge" },
];

function initials(name: string) {
    return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

function parseStatValue(raw: string) {
    const isPercent = raw.endsWith("%");
    const digits = raw.replace(/[.%]/g, "");
    const target = parseInt(digits, 10) || 0;
    return { target, suffix: isPercent ? "%" : "" };
}

function CountUpStat({ value, className, trigger }: { value: string; className?: string; trigger?: unknown }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        const wrapper = wrapperRef.current;
        if (!el || !wrapper) return;
        const { target, suffix } = parseStatValue(value);

        // If this instance re-renders because its underlying case changed (trigger),
        // animate immediately instead of waiting on IntersectionObserver again.
        if (trigger !== undefined) {
            const counter = { val: 0 };
            gsap.to(counter, {
                val: target,
                duration: 0.9,
                ease: "power2.out",
                onUpdate: () => {
                    el.textContent = Math.round(counter.val).toLocaleString("pt-BR") + suffix;
                },
            });
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const counter = { val: 0 };
                gsap.to(counter, {
                    val: target,
                    duration: 1.6,
                    ease: "power2.out",
                    onUpdate: () => {
                        el.textContent = Math.round(counter.val).toLocaleString("pt-BR") + suffix;
                    },
                });
                observer.disconnect();
            },
            { threshold: 0.4 }
        );
        observer.observe(wrapper);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, trigger]);

    return (
        <div ref={wrapperRef}>
            <p ref={ref} className={className ?? "text-3xl sm:text-4xl font-extrabold text-white"}>0</p>
        </div>
    );
}

export default function CasosDeSucessoPage() {
    const [activeSlug, setActiveSlug] = useState(cases.find((c) => c.slug === "grant-thornton")!.slug);
    const [displayedSlug, setDisplayedSlug] = useState(activeSlug);

    const sectionRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const panelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const active = cases.find((c) => c.slug === activeSlug)!;
    const displayed = cases.find((c) => c.slug === displayedSlug)!;
    const color = PILLARS[displayed.pillar].color;

    // Entrance for the whole showcase as it scrolls into view — no pinning, no scroll-jacking.
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.from([listRef.current, panelRef.current], {
                opacity: 0,
                y: 24,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Slide the highlight pill behind whichever item in the list is active.
    useEffect(() => {
        const activeButton = itemRefs.current[activeSlug];
        if (!activeButton || !pillRef.current) return;

        gsap.to(pillRef.current, {
            y: activeButton.offsetTop,
            height: activeButton.offsetHeight,
            backgroundColor: `${PILLARS[active.pillar].color}14`,
            duration: 0.4,
            ease: "power2.out",
        });
    }, [activeSlug, active.pillar]);

    // Staggered content swap: pieces of the old case fall away, then the new case rises in.
    useEffect(() => {
        if (activeSlug === displayedSlug || !contentRef.current) return;

        const pieces = contentRef.current.querySelectorAll(".stagger-item");
        gsap.to(pieces, {
            opacity: 0,
            y: -14,
            duration: 0.18,
            stagger: 0.04,
            ease: "power1.in",
            onComplete: () => setDisplayedSlug(activeSlug),
        });
    }, [activeSlug, displayedSlug]);

    useEffect(() => {
        if (!contentRef.current) return;
        const pieces = contentRef.current.querySelectorAll(".stagger-item");
        gsap.fromTo(
            pieces,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }
        );
    }, [displayedSlug]);

    return (
        <div ref={sectionRef} className="relative bg-white">
            <div className="relative py-16 sm:py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.3]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <Image
                        src="/voca-symbol.png"
                        alt=""
                        width={800}
                        height={983}
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 w-64 sm:w-80 h-auto opacity-[0.05]"
                    />
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Cases de sucesso</p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
                        Empresas que fazem do VOCA uma extensão delas
                    </h1>
                </div>
            </div>

            {/* Stat wall — numbers count up as they enter view */}
            <div className="bg-slate-900 py-12 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
                    {statWall.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <CountUpStat value={stat.value} />
                            <p className="text-xs text-white/60 mt-2 leading-snug">{stat.label}</p>
                            <p className="text-[11px] text-voca-green font-bold mt-1 uppercase tracking-wide">{stat.company}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Showcase: a company list on one side, its story on the other — always side by side */}
            <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
                    <div
                        ref={listRef}
                        className="relative flex flex-col gap-0.5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div ref={pillRef} className="absolute left-0 right-0 rounded-lg -z-0" style={{ top: 0, height: 0 }} />

                        {cases.map((item) => {
                            const isActive = item.slug === activeSlug;
                            const pillarColor = PILLARS[item.pillar].color;
                            return (
                                <button
                                    key={item.slug}
                                    ref={(el) => { itemRefs.current[item.slug] = el }}
                                    onClick={() => setActiveSlug(item.slug)}
                                    className="relative z-10 flex items-center gap-2.5 text-left px-3 py-2 rounded-lg transition-colors duration-150"
                                >
                                    <span
                                        className="h-1.5 w-1.5 rounded-full shrink-0 transition-transform duration-300"
                                        style={{ backgroundColor: pillarColor, transform: isActive ? "scale(1.6)" : "scale(1)" }}
                                    />
                                    <div className="min-w-0 flex items-baseline gap-1.5">
                                        <p
                                            className={cn("text-sm truncate", isActive ? "font-bold" : "font-medium text-slate-500")}
                                            style={isActive ? { color: pillarColor } : undefined}
                                        >
                                            {item.company}
                                        </p>
                                        <p className="text-[11px] text-slate-400 truncate">{item.theme}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div ref={panelRef} className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <div ref={contentRef}>
                        <div className="stagger-item relative overflow-hidden p-6 sm:p-10 transition-colors duration-500" style={{ backgroundColor: color }}>
                            <div className="absolute -right-8 -bottom-10 pointer-events-none select-none">
                                {displayed.logo ? (
                                    <Image
                                        src={displayed.logo}
                                        alt=""
                                        width={220}
                                        height={220}
                                        className="object-contain opacity-[0.14] brightness-0 invert"
                                    />
                                ) : (
                                    (() => {
                                        const PillarIcon = PILLAR_ICONS[displayed.pillar];
                                        return <PillarIcon size={200} strokeWidth={1} className="text-white opacity-[0.14]" />;
                                    })()
                                )}
                            </div>

                            <span className="relative inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
                                {displayed.theme}
                            </span>

                            <p className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mt-5">
                                &ldquo;{displayed.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-3 mt-6">
                                {displayed.name && (
                                    <Avatar className="h-11 w-11 ring-2 ring-white/40">
                                        {displayed.avatar && <AvatarImage src={displayed.avatar} />}
                                        <AvatarFallback className="font-bold" style={{ color }}>
                                            {initials(displayed.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div>
                                    <p className="font-bold text-white">{displayed.name ?? displayed.company}</p>
                                    {displayed.role && <p className="text-white/70 text-sm">{displayed.role} · {displayed.company}</p>}
                                </div>
                            </div>

                            {displayed.metrics.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                                    {displayed.metrics.map((metric) => (
                                        <div key={metric.label} className="rounded-xl bg-white/10 p-3">
                                            <CountUpStat value={metric.value} trigger={displayedSlug} className="text-2xl font-extrabold text-white" />
                                            <p className="text-[11px] text-white/70 mt-1">{metric.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {(displayed.objective || displayed.solution) && (
                            <div className="stagger-item p-6 sm:p-10 bg-white">
                                {displayed.objective && (
                                    <>
                                        <p className="text-sm font-bold tracking-widest uppercase" style={{ color }}>Objetivo</p>
                                        <p className="text-slate-700 mt-2">{displayed.objective}</p>
                                    </>
                                )}
                                {displayed.solution && (
                                    <>
                                        <p className="text-sm font-bold tracking-widest uppercase mt-6" style={{ color }}>Solução</p>
                                        <ul className="mt-3 flex flex-col gap-2">
                                            {displayed.solution.map((point) => (
                                                <li key={point} className="text-sm text-slate-600 flex gap-2">
                                                    <Check size={16} className="shrink-0 mt-0.5" style={{ color }} />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 px-6 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase text-center">Como trabalhamos</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 text-center">
                        A mesma jornada de implementação, em todos os cases
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                        {journey.map((step, index) => (
                            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-voca-green text-white text-xs font-bold shrink-0">
                                        {index + 1}
                                    </span>
                                    <step.icon size={18} className="text-voca-green" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mt-2">{step.title}</h3>
                                <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                            </div>
                        ))}
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
        </div>
    )
}
