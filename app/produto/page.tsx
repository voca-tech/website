'use client'

import { useEffect, useRef, useState, type ForwardRefExoticComponent, type RefAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Check, X, Megaphone, Gauge, Sparkles, LayoutDashboard,
    Smile, Users, ThumbsUp, Gift, Lightbulb, MessageCircle, ShieldAlert,
    Award, ClipboardCheck, MessageSquare, GraduationCap,
    BarChart3, TrendingDown, UserCircle, Brain, PieChart,
    FolderOpen, CreditCard, ShoppingBag, Plug,
    Search, Rocket, Milestone,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { SearchIcon } from "@/components/ui/search";
import { GraduationCapIcon } from "@/components/ui/graduation-cap";
import { RocketIcon } from "@/components/ui/rocket";
import { BarChart3Icon } from "@/components/ui/bar-chart-3";
import { MilestoneIcon } from "@/components/ui/milestone";
import { cn } from "@/lib/utils";

type AnimatedIconHandle = { startAnimation: () => void; stopAnimation: () => void };

interface Feature {
    name: string;
    description: string;
    icon: LucideIcon;
}

interface Pillar {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    features: Feature[];
}

const pillars: Pillar[] = [
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
        description: "Avaliação, feedback e aprendizado — tudo conectado para orientar o crescimento das pessoas.",
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
        description: "Dados que viram decisão — para toda a empresa ou segmentados por área.",
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

const journey = [
    { icon: Search, title: "Kickoff estratégico", description: "Alinhamento com RH e liderança: fluxos, desafios e configurações iniciais mapeados.", badge: "Sem impacto operacional" },
    { icon: GraduationCap, title: "Capacitação das lideranças", description: "Treinamento do time de RH e gestores, com suporte da VOCA até o Go Live.", badge: "Foco nas prioridades" },
    { icon: Rocket, title: "Onboarding (Go Live)", description: "Entrada dos colaboradores, com suporte ativo do VOCA e acompanhamento das lideranças.", badge: "Equipe VOCA presente" },
    { icon: BarChart3, title: "Primeiros dados gerados", description: "Interações semanais com o time VOCA para acompanhar os primeiros indicadores.", badge: "Primeiros resultados visíveis" },
    { icon: Milestone, title: "Revisão e evolução", description: "Reunião trimestral com report estratégico e ajustes com a liderança.", badge: "Parceria contínua" },
];

const versusPoints = [
    { voca: "Atendimento 100% humano", market: "Chatbot e triagem automática" },
    { voca: "Resposta direta, sem fila de ticket", market: "Fila de suporte e tempo de espera" },
    { voca: "Time te acompanha até a revisão trimestral", market: "Suporte só durante a implementação" },
    { voca: "Equipe dedicada te ajuda a implementar", market: "Você configura tudo sozinho" },
    { voca: "Fala com quem já conhece sua empresa", market: "Atendimento genérico, do zero toda vez" },
];

// Animated version of each step's own icon (Search, GraduationCap, Rocket, BarChart3, Milestone).
const journeyAnimatedIcons: Array<ForwardRefExoticComponent<{ size?: number } & RefAttributes<AnimatedIconHandle>>> = [
    SearchIcon,
    GraduationCapIcon,
    RocketIcon,
    BarChart3Icon,
    MilestoneIcon,
];

export default function ProdutoPage() {
    const [activeId, setActiveId] = useState(pillars[0].id);
    const [displayedId, setDisplayedId] = useState(activeId);

    const [journeyActive, setJourneyActive] = useState(0);
    const [journeyDisplayed, setJourneyDisplayed] = useState(0);
    const [togetherVisible, setTogetherVisible] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const journeyPanelRef = useRef<HTMLDivElement>(null);
    const journeyIconRefs = useRef<Array<AnimatedIconHandle | null>>([]);
    const togetherSectionRef = useRef<HTMLDivElement>(null);

    const active = pillars.find((p) => p.id === activeId)!;
    const displayed = pillars.find((p) => p.id === displayedId)!;

    // Deep links from the nav ("/produto#cultura") should open straight into that pillar's tab.
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (pillars.some((p) => p.id === hash)) {
            setActiveId(hash);
            setDisplayedId(hash);
            tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Entrance for the whole showcase as it scrolls into view — no pinning, no scroll-jacking.
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.from(tabsRef.current, {
                opacity: 0,
                y: 24,
                duration: 0.6,
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

    // Staggered content swap: pieces of the old pillar fall away, then the new one rises in.
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

    // Same stagger-swap technique, applied to the journey step panel.
    useEffect(() => {
        if (journeyActive === journeyDisplayed || !journeyPanelRef.current) return;
        const pieces = journeyPanelRef.current.querySelectorAll(".stagger-item");
        gsap.to(pieces, {
            opacity: 0,
            y: -14,
            duration: 0.18,
            stagger: 0.03,
            ease: "power1.in",
            onComplete: () => setJourneyDisplayed(journeyActive),
        });
    }, [journeyActive, journeyDisplayed]);

    useEffect(() => {
        if (!journeyPanelRef.current) return;
        const pieces = journeyPanelRef.current.querySelectorAll(".stagger-item");
        gsap.fromTo(
            pieces,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
        journeyIconRefs.current[journeyDisplayed]?.startAnimation();
    }, [journeyDisplayed]);

    // "Você nunca estará sozinho" reveal.
    useEffect(() => {
        const el = togetherSectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTogetherVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="relative bg-white">
            <div className="relative py-16 sm:py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.3]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.id}
                            className="absolute rounded-full blur-3xl transition-opacity duration-700"
                            style={{
                                backgroundColor: pillar.color,
                                opacity: pillar.id === activeId ? 0.5 : 0.28,
                                width: index % 2 === 0 ? "30rem" : "26rem",
                                height: index % 2 === 0 ? "30rem" : "26rem",
                                top: index < 2 ? "-8rem" : "18rem",
                                left: index % 2 === 0 ? "-8rem" : "auto",
                                right: index % 2 !== 0 ? "-8rem" : "auto",
                                animation: `${["drift-a", "drift-b", "drift-c", "drift-a"][index]} ${24 + index * 3}s ease-in-out infinite`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="flex justify-center mb-5">
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
                            style={{ animation: "pulse-glow-voca 2.5s ease-in-out infinite" }}
                        >
                            <Image
                                src="/voca-symbol.png"
                                alt="VOCA"
                                width={26}
                                height={32}
                                style={{ animation: "logo-breathe 2.5s ease-in-out infinite" }}
                            />
                        </div>
                    </div>
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Produto</p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                        18 funcionalidades, 1 sistema só
                    </h1>
                </div>

                <div className="relative max-w-6xl mx-auto mt-14 scroll-mt-24" ref={tabsRef}>
                    <div
                        className="relative rounded-[2.5rem] border border-white/60 bg-white/40 shadow-xl overflow-hidden"
                        style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none transition-colors duration-700"
                            style={{ background: `linear-gradient(135deg, ${active.color}22, transparent 55%)` }}
                        />
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                        />

                        <div className="relative flex flex-wrap gap-2 p-5 border-b border-white/60">
                            {pillars.map((pillar) => {
                                const isActive = pillar.id === activeId;
                                return (
                                    <button
                                        key={pillar.id}
                                        onClick={() => setActiveId(pillar.id)}
                                        style={{ backgroundColor: isActive ? pillar.color : "transparent" }}
                                        className={cn(
                                            "flex-1 min-w-[45%] sm:min-w-[13rem] flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300",
                                            isActive ? "shadow-md" : "hover:bg-white/50"
                                        )}
                                    >
                                        <div
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                                            style={{
                                                backgroundColor: isActive ? "rgba(255,255,255,0.25)" : `${pillar.color}1A`,
                                                color: isActive ? "white" : pillar.color,
                                            }}
                                        >
                                            <pillar.icon size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={cn("text-sm font-bold leading-snug", isActive ? "text-white" : "text-slate-700")}>
                                                {pillar.title}
                                            </p>
                                            <p className={cn("text-xs mt-0.5", isActive ? "text-white/75" : "text-slate-400")}>
                                                {pillar.features.length} funcionalidades
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div ref={contentRef} className="relative min-h-[36rem] p-8 sm:p-12">
                            <div className="flex flex-col lg:flex-row items-start gap-10">
                                <div className="flex-1">
                                    <p className="stagger-item text-sm font-bold uppercase tracking-widest" style={{ color: displayed.color }}>
                                        {displayed.title}
                                    </p>
                                    <p className="stagger-item text-slate-600 text-lg mt-3 max-w-2xl">{displayed.description}</p>

                                    <div className="stagger-item grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
                                        {displayed.features.slice(0, 3).map((feature) => (
                                            <div key={feature.name} className="rounded-2xl overflow-hidden border border-white/70 bg-white shadow-sm">
                                                <div
                                                    className="aspect-[4/3] relative flex items-center justify-center"
                                                    style={{ background: `linear-gradient(135deg, ${displayed.color}26, ${displayed.color}08)` }}
                                                >
                                                    <div className="absolute top-0 inset-x-0 h-7 flex items-center px-3 gap-1.5" style={{ backgroundColor: displayed.color }}>
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                    </div>
                                                    <feature.icon size={48} strokeWidth={1.25} style={{ color: displayed.color }} className="opacity-70" />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-slate-900 text-sm">{feature.name}</h3>
                                                    <p className="text-slate-500 text-sm mt-1">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="stagger-item text-xs text-slate-400 mt-6">
                                        Imagens ilustrativas — em breve com telas reais da plataforma.
                                    </p>
                                </div>

                                <div className="stagger-item lg:w-64 shrink-0">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                        Todas as {displayed.features.length} funcionalidades
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        {displayed.features.map((feature, index) => (
                                            <div
                                                key={feature.name}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
                                                    index < 3 && "bg-slate-100"
                                                )}
                                            >
                                                <div
                                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                                    style={{ backgroundColor: `${displayed.color}1A`, color: displayed.color }}
                                                >
                                                    <feature.icon size={15} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{feature.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16">

                <div
                    ref={togetherSectionRef}
                    className={cn(
                        "relative mt-16 rounded-[2.5rem] overflow-hidden transition-all duration-700",
                        togetherVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                    style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
                >
                    <Image
                        src="/voca-symbol.png"
                        alt=""
                        width={280}
                        height={344}
                        className="absolute -right-8 -bottom-16 opacity-[0.07] brightness-0 invert select-none pointer-events-none"
                    />
                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />

                    <div className="relative px-8 py-12 sm:px-14 sm:py-16">
                        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70 uppercase tracking-widest">
                                Do primeiro dia em diante
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                                Você nunca estará sozinho
                            </h2>
                            <p className="text-white/60 mt-3">
                                Enquanto boa parte do mercado te entrega um manual e um chatbot, a gente manda gente de verdade, a todo instante.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto mt-10 pt-8 border-t border-white/10">
                            <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] gap-6 mb-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-voca-green">
                                        <Check size={10} />
                                    </span>
                                    Com a VOCA
                                </p>
                                <span />
                                <p className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-white/40">
                                        <X size={10} />
                                    </span>
                                    Do jeito tradicional
                                </p>
                            </div>
                            {versusPoints.map(({ voca, market }) => (
                                <div
                                    key={voca}
                                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-6 py-3 border-b border-white/10 last:border-b-0"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-voca-green">
                                            <Check size={12} />
                                        </span>
                                        <span className="text-sm font-medium text-white">{voca}</span>
                                    </div>
                                    <span className="hidden sm:flex text-[10px] font-bold text-white/30 uppercase justify-self-center">
                                        vs
                                    </span>
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/40">
                                            <X size={12} />
                                        </span>
                                        <span className="text-sm text-white/40">{market}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div
                        className="relative rounded-[2.5rem] border border-white/60 bg-white/40 shadow-xl overflow-hidden"
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
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Metodologia VOCA</p>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                                    A jornada de implementação
                                </h2>
                            </div>

                            <div className="relative">
                                <div className="absolute top-[22px] sm:top-[27px] left-[10%] right-[10%] h-0.5 bg-slate-200/80 rounded-full">
                                    <div
                                        className="h-full bg-voca-green rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${(journeyActive / (journey.length - 1)) * 100}%` }}
                                    />
                                </div>

                                <div className="relative flex items-start justify-between">
                                    {journey.map((step, index) => {
                                        const isActive = index === journeyActive;
                                        return (
                                            <button
                                                key={step.title}
                                                onClick={() => setJourneyActive(index)}
                                                className="group flex flex-1 flex-col items-center gap-2 text-center px-1"
                                            >
                                                <span
                                                    className={cn(
                                                        "flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all duration-300",
                                                        isActive
                                                            ? "bg-voca-green text-white scale-110 shadow-lg"
                                                            : "bg-white text-voca-green shadow-sm group-hover:bg-voca-green/10"
                                                    )}
                                                >
                                                    <step.icon size={20} />
                                                </span>
                                                <span
                                                    className={cn(
                                                        "text-[11px] sm:text-xs font-bold leading-tight max-w-[5.5rem] sm:max-w-[7rem] transition-colors duration-300",
                                                        isActive ? "text-slate-900" : "text-slate-400"
                                                    )}
                                                >
                                                    {step.title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div ref={journeyPanelRef} className="mt-10 pt-8 border-t border-white/60">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                                    <div className="stagger-item flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-voca-green text-white">
                                        {(() => {
                                            const AnimatedStepIcon = journeyAnimatedIcons[journeyDisplayed];
                                            return (
                                                <AnimatedStepIcon
                                                    ref={(el) => { journeyIconRefs.current[journeyDisplayed] = el; }}
                                                    size={26}
                                                />
                                            );
                                        })()}
                                    </div>
                                    <div className="stagger-item flex-1">
                                        <h3 className="font-bold text-slate-900 text-lg">{journey[journeyDisplayed].title}</h3>
                                        <p className="text-slate-500 text-sm mt-1.5 max-w-2xl">{journey[journeyDisplayed].description}</p>
                                    </div>
                                    <span className="stagger-item shrink-0 rounded-full bg-voca-green/10 text-voca-green text-xs font-semibold px-3 py-1.5 whitespace-nowrap">
                                        {journey[journeyDisplayed].badge}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-voca-green px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left mt-16">
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

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-16">
                    <Link href="/contact">
                        <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base font-semibold">
                            <Check className="mr-2" size={18} />
                            Agendar demonstração
                        </Button>
                    </Link>
                    <WhatsappLink variant="text" />
                </div>
            </div>
        </div>
    )
}
