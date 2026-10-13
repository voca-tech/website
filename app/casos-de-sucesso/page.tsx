'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight, Search, GraduationCap, Rocket, BarChart3, Milestone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CaseCard, CaseLogo, CasePerson } from "@/components/cases/CaseCard";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { useIsDesktop } from "@/components/useIsDesktop";
import { cn } from "@/lib/utils";
import { cases, PILLARS, type PillarId } from "./data";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });

const spotlight = cases.find((c) => c.slug === "woodbridge-cracha")!;
const spotlightColor = PILLARS[spotlight.pillar].color;
const spotlightMetric = spotlight.metrics[spotlight.heroMetricIndex ?? 0];

const pillarFilters: Array<{ id: PillarId | "all"; label: string }> = [
    { id: "all", label: "Todos" },
    { id: "cultura", label: "Cultura" },
    { id: "performance", label: "Performance" },
    { id: "inteligencia", label: "Inteligência" },
    { id: "operacoes", label: "Operações" },
];

const journey = [
    { icon: Search, title: "Alinhamento estratégico", description: "Entendemos sua realidade, desafios e objetivos, com definição de metas e prioridades." },
    { icon: GraduationCap, title: "Capacitação dos embaixadores", description: "Treinamento do time de RH e gestores, com suporte do VOCA no setup até o Go Live." },
    { icon: Rocket, title: "Onboarding (Go Live)", description: "Entrada dos colaboradores com suporte ativo do VOCA e acompanhamento das lideranças." },
    { icon: BarChart3, title: "Primeiros dados gerados", description: "Interações semanais com o time VOCA e direcionamento de uso a partir dos primeiros indicadores." },
    { icon: Milestone, title: "Revisão e evolução contínua", description: "Revisão trimestral com relatório estratégico e alinhamentos com a liderança." },
];

function JourneyImmersive() {
    const pinRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const pinEl = pinRef.current;
        const track = trackRef.current;
        if (!pinEl || !track) return;

        const ctx = gsap.context(() => {
            const getScrollDistance = () => track.scrollWidth - pinEl.clientWidth;

            gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: pinEl,
                    start: "top top",
                    end: () => `+=${getScrollDistance()}`,
                    scrub: 0.6,
                    pin: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        setStepIndex(Math.min(journey.length - 1, Math.floor(self.progress * journey.length)));
                    },
                },
            });
        }, pinRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={pinRef}
            className="relative h-screen flex items-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
        >
            <div
                className="absolute -top-32 left-[15%] w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "#007980", opacity: 0.35, animation: "drift-a 24s ease-in-out infinite" }}
            />
            <div
                className="absolute -bottom-40 right-[10%] w-[30rem] h-[30rem] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "#2f6690", opacity: 0.3, animation: "drift-b 28s ease-in-out infinite" }}
            />
            <div
                className="absolute top-1/3 right-[35%] w-[20rem] h-[20rem] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "#85568a", opacity: 0.2, animation: "drift-c 32s ease-in-out infinite" }}
            />
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div ref={trackRef} className="relative flex items-center gap-8 pl-6 sm:pl-16 pr-[25vw] will-change-transform">
                <div className="shrink-0 w-64 sm:w-80">
                    <h2 className="voca-title-invert text-3xl sm:text-4xl font-extrabold leading-tight">
                        A mesma jornada, em todos os cases
                    </h2>
                    <p className="text-white/60 mt-3 text-sm">Continue rolando para conhecer as 5 etapas.</p>
                </div>

                {journey.map((step, index) => (
                    <div
                        key={step.title}
                        className="relative shrink-0 w-[20rem] sm:w-[24rem] h-[24rem] sm:h-[28rem] rounded-[2rem] bg-white/10 border border-white/15 p-8 flex flex-col justify-end overflow-hidden"
                        style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                    >
                        <step.icon size={240} strokeWidth={1} className="absolute -right-10 -top-10 text-white opacity-[0.08] pointer-events-none" />
                        <span className="text-6xl font-extrabold text-white/20">{String(index + 1).padStart(2, "0")}</span>
                        <h3 className="text-2xl font-bold text-white mt-4">{step.title}</h3>
                        <p className="text-white/70 mt-3 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {journey.map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === stepIndex ? "w-8 bg-white" : "w-1.5 bg-white/30"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

function JourneyDragCards() {
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                rowRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rowRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 0.8,
                    },
                }
            );
        }, rowRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-slate-50 py-16 sm:py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                            A mesma jornada de implementação, em todos os cases
                        </h2>
                    </div>
                    <p className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Arraste para o lado →
                    </p>
                </div>
            </div>

            <div className="relative mt-10">
                <div
                    ref={rowRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-6 max-w-6xl mx-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
                >
                    {journey.map((step, index) => (
                        <div
                            key={step.title}
                            className="snap-start shrink-0 w-64 sm:w-72 rounded-3xl border border-slate-200 bg-white p-6"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-voca-green text-white font-bold text-sm">
                                {index + 1}
                            </span>
                            <step.icon size={22} className="text-voca-green mt-5" />
                            <h3 className="font-bold text-slate-900 mt-3">{step.title}</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                    <div className="shrink-0 w-px" />
                </div>
                <div className="hidden sm:block absolute top-0 right-0 bottom-4 w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}

const statWall = [
    { value: "261.000", label: "visualizações do time", company: "Grant Thornton" },
    { value: "100%", label: "conformidade para auditoria", company: "Credi10" },
    { value: "96%", label: "engajamento de líderes", company: "SP Engenharia" },
    { value: "95%", label: "taxa de resposta às pesquisas", company: "Woodbridge" },
];

function parseStatValue(raw: string) {
    const isPercent = raw.endsWith("%");
    const digits = raw.replace(/[.%]/g, "");
    const target = parseInt(digits, 10) || 0;
    return { target, suffix: isPercent ? "%" : "" };
}

function CountUpStat({ value, className, trigger }: { value: string; className?: string; trigger?: unknown }) {
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;
        const { target, suffix } = parseStatValue(value);

        const counter = { val: 0 };
        const render = () => {
            el.textContent = Math.round(counter.val).toLocaleString("pt-BR") + suffix;
        };

        const ctx = gsap.context(() => {
            gsap.to(counter, {
                val: target,
                ease: "none",
                onUpdate: render,
                scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    end: "top 55%",
                    scrub: 0.6,
                    onRefresh: (self) => {
                        counter.val = self.progress * target;
                        render();
                    },
                },
            });
        });

        return () => ctx.revert();
    }, [value, trigger]);

    return <p ref={ref} className={className ?? "text-3xl sm:text-4xl font-extrabold text-white"}>0</p>;
}

export default function CasosDeSucessoPage() {
    const [activeSlug, setActiveSlug] = useState(cases.find((c) => c.slug === "grant-thornton")!.slug);
    const [displayedSlug, setDisplayedSlug] = useState(activeSlug);
    const [pillarFilter, setPillarFilter] = useState<PillarId | "all">("all");
    const [detailOpen, setDetailOpen] = useState(false);

    const filteredCases = pillarFilter === "all" ? cases : cases.filter((c) => c.pillar === pillarFilter);

    useEffect(() => {
        let second = 0;
        const first = requestAnimationFrame(() => {
            second = requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        return () => {
            cancelAnimationFrame(first);
            cancelAnimationFrame(second);
        };
    }, [pillarFilter]);

    const sectionRef = useRef<HTMLDivElement>(null);
    const showcaseRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const isDesktop = useIsDesktop();

    const displayed = cases.find((c) => c.slug === displayedSlug)!;

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (cases.some((c) => c.slug === hash)) {
            setActiveSlug(hash);
            setDisplayedSlug(hash);
            setDetailOpen(true);
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".case-card",
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.06,
                    ease: "none",
                    scrollTrigger: {
                        trigger: showcaseRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

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
                    <h1 className={cn(playfair.className, "voca-title italic text-3xl sm:text-5xl leading-tight")}>
                        Empresas que fazem do{" "}
                        <span className="font-sans not-italic font-extrabold text-voca-green">VOCA</span>{" "}
                        uma extensão delas
                    </h1>
                </div>
            </div>

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

            <div className="py-14 sm:py-16 px-6 bg-white">
                <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
                    Empresas e instituições que confiam no VOCA
                </p>
                <ClientLogoMarquee />
            </div>

            <div className="py-16 sm:py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <span
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                            style={{ backgroundColor: `${spotlightColor}14`, color: spotlightColor }}
                        >
                            Case em destaque
                        </span>
                        <p className={cn(playfair.className, "italic text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-snug mt-5")}>
                            &ldquo;{spotlight.quote}&rdquo;
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-4 sm:gap-x-8 mt-8">
                            {spotlight.metrics.filter((metric) => metric !== spotlightMetric).slice(0, 3).map((metric) => (
                                <div key={metric.label} className="text-center lg:text-left">
                                    <p className="text-2xl font-extrabold" style={{ color: spotlightColor }}>{metric.value}</p>
                                    <p className="text-xs text-slate-500 mt-1 max-w-[7rem]">{metric.label}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                setActiveSlug(spotlight.slug);
                                setDisplayedSlug(spotlight.slug);
                                setDetailOpen(true);
                            }}
                            className="group inline-flex items-center gap-1.5 text-sm font-bold mt-8"
                            style={{ color: spotlightColor }}
                        >
                            Ver a história completa
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>

                    <div
                        className="relative flex flex-col rounded-[2rem] overflow-hidden shadow-2xl max-w-sm mx-auto w-full min-h-[26rem] p-8"
                        style={{ background: `linear-gradient(135deg, rgba(1,20,25,0.55) 0%, rgba(1,20,25,0) 70%), ${spotlightColor}` }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.1] pointer-events-none"
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                        <Image
                            src="/voca-symbol.png"
                            alt=""
                            width={220}
                            height={270}
                            aria-hidden="true"
                            className="absolute -right-10 -bottom-12 w-48 h-auto opacity-[0.08] brightness-0 invert select-none pointer-events-none"
                        />

                        <div className="relative flex flex-wrap items-center gap-3">
                            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                                {spotlight.theme}
                            </span>
                            {spotlight.logo && (
                                <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
                                    <CaseLogo item={spotlight} className="h-5" />
                                </span>
                            )}
                        </div>

                        {spotlightMetric && (
                            <div className="relative mt-10">
                                <p className="text-6xl font-extrabold text-white leading-none">{spotlightMetric.value}</p>
                                <p className="text-white/80 mt-3 leading-snug max-w-[16rem]">{spotlightMetric.label}</p>
                            </div>
                        )}

                        <div className="relative mt-auto pt-8 border-t border-white/20">
                            <CasePerson item={spotlight} size="lg" tone="dark" />
                        </div>
                    </div>
                </div>
            </div>

            <div ref={showcaseRef} className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
                <div className="flex flex-wrap gap-2 mb-8">
                    {pillarFilters.map((filter) => {
                        const isActive = filter.id === pillarFilter;
                        const filterColor = filter.id === "all" ? "#0f172a" : PILLARS[filter.id].color;
                        const count = filter.id === "all" ? cases.length : cases.filter((c) => c.pillar === filter.id).length;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setPillarFilter(filter.id)}
                                aria-pressed={isActive}
                                style={{ backgroundColor: isActive ? filterColor : "transparent", borderColor: isActive ? filterColor : "#e2e8f0" }}
                                className={cn(
                                    "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors duration-150",
                                    isActive ? "text-white" : "text-slate-500 hover:border-slate-300"
                                )}
                            >
                                {filter.label} <span className={isActive ? "text-white/70" : "text-slate-400"}>({count})</span>
                            </button>
                        );
                    })}
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCases.map((item) => (
                        <CaseCard
                            key={item.slug}
                            item={item}
                            metric={item.metrics[item.heroMetricIndex ?? 0]}
                            onClick={() => {
                                setActiveSlug(item.slug);
                                setDisplayedSlug(item.slug);
                                setDetailOpen(true);
                            }}
                        />
                    ))}
                </div>
            </div>

            <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                <DialogContent className="w-[95vw] max-w-4xl max-h-[88vh] p-0 rounded-3xl flex flex-col overflow-hidden">
                    <CaseDetail item={displayed} />
                </DialogContent>
            </Dialog>

            <div className="px-6 py-20 sm:py-28 bg-white text-center">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Calculadora de ROI</p>
                <Link href="/roi" className="group inline-block">
                    <span className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight transition-colors duration-200 group-hover:text-voca-green">
                        Calcule quanto sua empresa
                        <br className="hidden sm:block" /> economiza com o VOCA
                    </span>
                    <span className="flex items-center justify-center gap-2 mt-5 text-voca-green font-bold text-lg">
                        Simular agora
                        <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1.5" />
                    </span>
                </Link>
            </div>

            {isDesktop ? <JourneyImmersive /> : <JourneyDragCards />}

            <div className="py-16 sm:py-20 px-6 bg-white">
                <div className="max-w-2xl mx-auto text-center">
                    <p className={cn(playfair.className, "italic text-2xl sm:text-4xl text-slate-900 leading-snug")}>
                        Você viu o resultado. Agora veja o porquê.
                    </p>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                        {cases.length} histórias como essas não acontecem por acaso. Conheça o que diferencia o VOCA de qualquer outra ferramenta de gestão de pessoas no mercado.
                    </p>
                    <Link href="/por-que-voca" className="inline-flex mt-7">
                        <span className="group inline-flex items-center gap-3 rounded-full bg-voca-green text-white pl-6 pr-2 py-2 text-base font-semibold shadow-lg shadow-voca-green/25 transition-shadow hover:shadow-xl">
                            Por que o VOCA
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-voca-green transition-transform group-hover:translate-x-1">
                                <ArrowRight size={16} />
                            </span>
                        </span>
                    </Link>
                </div>
            </div>

            <div
                className="relative py-20 sm:py-28 px-6 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
            >
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={300}
                    height={369}
                    aria-hidden="true"
                    className="absolute -right-10 -bottom-16 opacity-[0.07] brightness-0 invert select-none pointer-events-none"
                />
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="relative max-w-2xl mx-auto text-center">
                    <h2 className={cn(playfair.className, "voca-title-invert italic text-3xl sm:text-4xl leading-snug")}>
                        Pronto para ser o próximo case de sucesso?
                    </h2>
                    <p className="text-white/60 mt-4 max-w-md mx-auto">
                        Fale com o time VOCA e descubra como sua empresa também pode transformar comunicação em resultado.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-8">
                        <Link href="/contact">
                            <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                Agendar demonstração
                            </Button>
                        </Link>
                        <WhatsappLink variant="text" className="font-semibold text-white hover:underline underline-offset-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}
