'use client'

import { useEffect, useRef, useState, type ForwardRefExoticComponent, type RefAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Check, X,
    Search, GraduationCap, Rocket, BarChart3, Milestone, Smartphone, Monitor, Wifi, Calculator, ArrowRight, ShieldCheck, Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { WhatsappLink } from "@/components/WhatsappLink";
import { SearchIcon } from "@/components/ui/search";
import { GraduationCapIcon } from "@/components/ui/graduation-cap";
import { RocketIcon } from "@/components/ui/rocket";
import { BarChart3Icon } from "@/components/ui/bar-chart-3";
import { MilestoneIcon } from "@/components/ui/milestone";
import { cn } from "@/lib/utils";
import { PERCENT_SAVINGS } from "@/app/roi/constants";
import { pillars, type Feature } from "./data";

type AnimatedIconHandle = { startAnimation: () => void; stopAnimation: () => void };

const journey = [
    {
        icon: Search,
        title: "Kickoff estratégico",
        description: "Alinhamento com RH e liderança: fluxos, desafios e configurações iniciais mapeados.",
        badge: "Sem impacto operacional",
        stakeholders: ["RH", "Liderança", "Time VOCA"],
        checklist: [
            { action: "Mapeamento dos desafios e prioridades da empresa", benefit: "Nada de solução genérica: a implementação já nasce focada no que sua empresa mais precisa." },
            { action: "Configuração inicial da plataforma", benefit: "Você começa a usar com tudo já ajustado pro seu jeito de trabalhar." },
            { action: "Alinhamento de expectativas com RH e liderança", benefit: "Todo mundo sai da mesma página, sem surpresa no meio do caminho." },
        ],
    },
    {
        icon: GraduationCap,
        title: "Capacitação das lideranças",
        description: "Treinamento do time de RH e gestores, com foco nas prioridades mapeadas no kickoff. O VOCA capacita as lideranças para tirarem o máximo da plataforma desde o Go Live.",
        badge: "Foco nas prioridades",
        stakeholders: ["RH", "Gestores", "Time VOCA"],
        checklist: [
            { action: "Treinamento prático do time de RH e gestores", benefit: "Quem vai usar no dia a dia chega no Go Live sem insegurança." },
            { action: "Simulações de uso antes do lançamento", benefit: "Os erros acontecem no teste, não na frente dos colaboradores." },
            { action: "Suporte direto do VOCA em cada dúvida", benefit: "Ninguém fica tentando descobrir sozinho como usar." },
        ],
    },
    {
        icon: Rocket,
        title: "Onboarding (Go Live)",
        description: "Entrada dos colaboradores na plataforma com suporte ativo do time VOCA: comunicação de lançamento, primeiros conteúdos e endomarketing de adoção.",
        badge: "Equipe VOCA presente",
        stakeholders: ["Colaboradores", "Liderança", "Time VOCA"],
        checklist: [
            { action: "Liberação de acesso para todos os colaboradores", benefit: "Todo mundo entra ao mesmo tempo, sem gente ficando de fora." },
            { action: "Comunicação de lançamento apoiada pelo time VOCA", benefit: "A adesão começa forte, porque o lançamento não passa despercebido." },
            { action: "Acompanhamento ativo nos primeiros dias de uso", benefit: "Qualquer dificuldade é resolvida na hora, antes de virar desistência." },
        ],
    },
    {
        icon: BarChart3,
        title: "Primeiros dados gerados",
        description: "Acompanhamento semanal do uso e dos primeiros indicadores gerados. O time VOCA orienta a liderança sobre o que os dados estão mostrando e o que fazer com isso.",
        badge: "Primeiros resultados visíveis",
        stakeholders: ["RH", "Time VOCA"],
        checklist: [
            { action: "Leitura dos primeiros indicadores de uso e engajamento", benefit: "Você já sabe, com dados, o que está funcionando e o que não está." },
            { action: "Reuniões semanais de acompanhamento com o time VOCA", benefit: "Ajuste de rota rápido, sem esperar meses pra perceber um problema." },
            { action: "Ajustes finos na configuração, se necessário", benefit: "A plataforma se adapta a vocês, não o contrário." },
        ],
    },
    {
        icon: Milestone,
        title: "Revisão e evolução",
        description: "Reunião trimestral com relatório estratégico: o que funcionou, o que pode melhorar e quais novas funcionalidades faz sentido ativar.",
        badge: "Parceria contínua",
        stakeholders: ["Liderança", "Time VOCA"],
        checklist: [
            { action: "Relatório estratégico com os resultados do trimestre", benefit: "Dado concreto pra mostrar o retorno da parceria pra liderança." },
            { action: "Reunião com a liderança para revisar prioridades", benefit: "A relação evolui junto com as necessidades da empresa, não fica parada." },
            { action: "Plano de evolução para o próximo ciclo", benefit: "Sempre um passo à frente, em vez de só manter o que já existe." },
        ],
    },
];

const platformCapabilities: Array<{ label: string; platforms: Array<"app" | "web"> }> = [
    { label: "Pesquisas, feedback e reconhecimento", platforms: ["app", "web"] },
    { label: "Notificações em tempo real, sem depender de e-mail", platforms: ["app"] },
    { label: "Crachá digital de acesso", platforms: ["app"] },
    { label: "Dashboards completos de people analytics", platforms: ["web"] },
    { label: "Configuração de fluxos e permissões por área", platforms: ["web"] },
    { label: "Relatórios exportáveis para Excel", platforms: ["app", "web"] },
];

const versusPoints = [
    { voca: "Atendimento 100% humano", market: "Chatbot e triagem automática" },
    { voca: "Resposta direta, sem fila de ticket", market: "Fila de suporte e tempo de espera" },
    { voca: "Time te acompanha até a revisão trimestral", market: "Suporte só durante a implementação" },
    { voca: "Equipe dedicada te ajuda a implementar", market: "Você configura tudo sozinho" },
    { voca: "Fala com quem já conhece sua empresa", market: "Atendimento genérico, do zero toda vez" },
];

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
    const [selectedFeatureNames, setSelectedFeatureNames] = useState(
        () => pillars[0].features.slice(0, 3).map((f) => f.name)
    );

    const [detailFeature, setDetailFeature] = useState<Feature | null>(null);

    const [journeyActive, setJourneyActive] = useState(0);
    const [journeyDisplayed, setJourneyDisplayed] = useState(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const journeyPanelRef = useRef<HTMLDivElement>(null);
    const journeyIconRefs = useRef<Array<AnimatedIconHandle | null>>([]);
    const togetherSectionRef = useRef<HTMLDivElement>(null);
    const platformsSectionRef = useRef<HTMLDivElement>(null);

    const active = pillars.find((p) => p.id === activeId)!;
    const displayed = pillars.find((p) => p.id === displayedId)!;

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (pillars.some((p) => p.id === hash)) {
            setActiveId(hash);
            setDisplayedId(hash);
            tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                tabsRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: tabsRef.current,
                        start: "top 85%",
                        end: "top 45%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
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
        setSelectedFeatureNames(displayed.features.slice(0, 3).map((f) => f.name));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayedId]);

    function toggleFeatureSelection(name: string) {
        setSelectedFeatureNames((current) => {
            if (current.includes(name)) return current;
            return [...current.slice(1), name];
        });
    }

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

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                togetherSectionRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: togetherSectionRef.current,
                        start: "top 85%",
                        end: "top 45%",
                        scrub: 0.8,
                    },
                }
            );
        }, togetherSectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                platformsSectionRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: platformsSectionRef.current,
                        start: "top 85%",
                        end: "top 45%",
                        scrub: 0.8,
                    },
                }
            );
        }, platformsSectionRef);
        return () => ctx.revert();
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
                    {pillars.map((pillar, index) => {
                        const isActive = pillar.id === activeId;
                        const baseSize = index % 2 === 0 ? 30 : 26;
                        const size = isActive ? baseSize + 8 : baseSize - 6;
                        return (
                            <div
                                key={pillar.id}
                                className="absolute rounded-full blur-3xl"
                                style={{
                                    backgroundColor: pillar.color,
                                    opacity: isActive ? 0.65 : 0.12,
                                    width: `${size}rem`,
                                    height: `${size}rem`,
                                    top: index < 2 ? "-8rem" : "18rem",
                                    left: index % 2 === 0 ? "-8rem" : "auto",
                                    right: index % 2 !== 0 ? "-8rem" : "auto",
                                    transition: "opacity 0.6s ease, width 0.6s ease, height 0.6s ease",
                                    animation: `${["drift-a", "drift-b", "drift-c", "drift-a"][index]} ${24 + index * 3}s ease-in-out infinite`,
                                }}
                            />
                        );
                    })}
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="flex justify-center mb-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                            <Image src="/voca-symbol.png" alt="VOCA" width={26} height={32} />
                        </div>
                    </div>
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Produto</p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                        <span className="text-voca-green">21</span> funcionalidades.{" "}
                        <span className="text-voca-green">1</span> única plataforma
                    </h1>
                </div>

                <div className="relative max-w-6xl mx-auto mt-14 scroll-mt-24" ref={tabsRef}>
                    <div
                        className="relative rounded-[2.5rem] border bg-white/40 shadow-xl overflow-hidden transition-[border-color,box-shadow] duration-500"
                        style={{
                            backdropFilter: "blur(28px)",
                            WebkitBackdropFilter: "blur(28px)",
                            borderColor: `${active.color}3D`,
                            boxShadow: `0 30px 80px -30px ${active.color}80`,
                        }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none transition-colors duration-500"
                            style={{ background: `linear-gradient(135deg, ${active.color}38, transparent 70%)` }}
                        />
                        <div
                            className="absolute inset-0 pointer-events-none transition-colors duration-500"
                            style={{ background: `radial-gradient(circle at 100% 100%, ${active.color}26, transparent 60%)` }}
                        />
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                        />

                        <div className="relative grid grid-cols-2 sm:flex sm:flex-wrap gap-2 p-3 sm:p-5 border-b border-white/60">
                            {pillars.map((pillar) => {
                                const isActive = pillar.id === activeId;
                                return (
                                    <button
                                        key={pillar.id}
                                        onClick={() => setActiveId(pillar.id)}
                                        style={{ backgroundColor: isActive ? pillar.color : "transparent" }}
                                        className={cn(
                                            "min-w-0 sm:flex-1 sm:min-w-[13rem] flex items-center gap-2 sm:gap-3 rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voca-green/50 focus-visible:ring-offset-2",
                                            isActive ? "shadow-md" : "hover:bg-white/50"
                                        )}
                                    >
                                        <div
                                            className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                                            style={{
                                                backgroundColor: isActive ? "rgba(255,255,255,0.25)" : `${pillar.color}1A`,
                                                color: isActive ? "white" : pillar.color,
                                            }}
                                        >
                                            <pillar.icon size={16} className="sm:hidden" />
                                            <pillar.icon size={20} className="hidden sm:block" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={cn("text-xs sm:text-sm font-bold leading-snug", isActive ? "text-white" : "text-slate-700")}>
                                                {pillar.title}
                                            </p>
                                            <p className={cn("text-[10px] sm:text-xs mt-0.5", isActive ? "text-white/75" : "text-slate-400")}>
                                                {pillar.features.length} funcionalidades
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative h-1 w-full transition-colors duration-500" style={{ backgroundColor: active.color }} />

                        <div ref={contentRef} className="relative lg:min-h-[36rem] p-6 sm:p-12">
                            <div className="flex flex-col lg:flex-row items-start gap-10">
                                <div className="flex-1">
                                    <p className="stagger-item text-sm font-bold uppercase tracking-widest" style={{ color: displayed.color }}>
                                        {displayed.title}
                                    </p>
                                    <p className="stagger-item text-slate-600 text-lg mt-3 max-w-2xl">{displayed.description}</p>

                                    <div className="stagger-item grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
                                        {selectedFeatureNames
                                            .map((name) => displayed.features.find((f) => f.name === name))
                                            .filter((feature): feature is (typeof displayed.features)[number] => !!feature)
                                            .map((feature) => (
                                            <button
                                                key={feature.name}
                                                type="button"
                                                onClick={() => feature.details && setDetailFeature(feature)}
                                                disabled={!feature.details}
                                                className="group flex flex-col animate-in fade-in duration-300 rounded-2xl overflow-hidden border border-white/70 bg-white shadow-sm text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voca-green/50 focus-visible:ring-offset-2"
                                            >
                                                <div
                                                    className="aspect-[4/3] relative flex flex-col overflow-hidden"
                                                    style={{ background: `linear-gradient(135deg, ${displayed.color}26, ${displayed.color}08)` }}
                                                >
                                                    <div className="h-7 shrink-0 flex items-center px-3 gap-1.5" style={{ backgroundColor: displayed.color }}>
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                    </div>

                                                    {feature.details ? (
                                                        <div className="flex-1 min-h-0 flex flex-col justify-center gap-2 px-4 py-3">
                                                            <feature.icon
                                                                size={30}
                                                                strokeWidth={1.4}
                                                                style={{ color: displayed.color }}
                                                                className="opacity-80 transition-transform duration-300 group-hover:scale-110 shrink-0"
                                                            />
                                                            {feature.details.slice(0, 2).map((item) => (
                                                                <div key={item} className="flex items-start gap-1.5">
                                                                    <span
                                                                        className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                                                                        style={{ backgroundColor: displayed.color }}
                                                                    />
                                                                    <span className="text-[10px] leading-snug text-slate-500 line-clamp-2">
                                                                        {item}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 flex items-center justify-center">
                                                            <feature.icon size={48} strokeWidth={1.25} style={{ color: displayed.color }} className="opacity-70 transition-transform duration-300 group-hover:scale-110" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-slate-900 text-sm">{feature.name}</h3>
                                                    <p className="text-slate-500 text-sm mt-1">{feature.description}</p>
                                                    {feature.details && (
                                                        <span
                                                            className="inline-flex items-center gap-1 text-xs font-bold mt-3 transition-all group-hover:gap-1.5"
                                                            style={{ color: displayed.color }}
                                                        >
                                                            Ver o que ela faz
                                                            <ArrowRight size={12} />
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <p className="stagger-item text-xs text-slate-400 mt-6">
                                        Imagens ilustrativas, em breve com telas reais da plataforma.
                                    </p>

                                    {displayed.id === "cultura" && (
                                        <Link
                                            href="/seguranca#nr1"
                                            className="stagger-item group mt-6 flex items-center gap-4 rounded-2xl border border-voca-green/15 bg-voca-green/5 p-5 transition-colors duration-300 hover:bg-voca-green/10"
                                        >
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                                                <ShieldCheck size={20} />
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-900">
                                                    Esses canais também apoiam a gestão de riscos psicossociais (NR-1)
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Veja como o VOCA ajuda sua empresa a se adequar à nova norma
                                                </p>
                                            </div>
                                            <ArrowRight size={16} className="shrink-0 text-voca-green transition-transform group-hover:translate-x-0.5" />
                                        </Link>
                                    )}
                                </div>

                                <div className="stagger-item lg:w-64 shrink-0">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                        Todas as {displayed.features.length} funcionalidades
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        {displayed.features.map((feature) => {
                                            const isSelected = selectedFeatureNames.includes(feature.name);
                                            return (
                                                <button
                                                    key={feature.name}
                                                    onClick={() => toggleFeatureSelection(feature.name)}
                                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voca-green/50 focus-visible:ring-offset-2"
                                                    style={isSelected ? { backgroundColor: `${displayed.color}14` } : undefined}
                                                >
                                                    <div
                                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                                        style={{ backgroundColor: `${displayed.color}1A`, color: displayed.color }}
                                                    >
                                                        <feature.icon size={15} />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700">{feature.name}</span>
                                                </button>
                                            );
                                        })}
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
                    className="relative mt-16 rounded-[2.5rem] overflow-hidden"
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
                                Enquanto boa parte do mercado te entrega um manual e um chatbot, nós somos gente de verdade e próxima, a todo instante.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto mt-10 pt-8 border-t border-white/10">
                            <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] gap-6 mb-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-voca-green">
                                        <Check size={10} />
                                    </span>
                                    Com o VOCA
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
            </div>

            <div className="relative py-16 sm:py-24 px-6 overflow-hidden bg-slate-50">
                <div
                    className="absolute inset-0 opacity-[0.5] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div className="relative max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Metodologia VOCA</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                            A jornada de implementação
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute top-[18px] sm:top-[27px] left-[10%] right-[10%] h-0.5 bg-slate-200 rounded-full">
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
                                        className="group flex flex-1 flex-col items-center gap-1.5 sm:gap-2 text-center px-0.5 sm:px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voca-green/50 focus-visible:ring-offset-2 rounded-xl"
                                    >
                                        <span
                                            className={cn(
                                                "flex h-9 w-9 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all duration-300",
                                                isActive
                                                    ? "bg-voca-green text-white scale-110 shadow-lg"
                                                    : "bg-white text-voca-green shadow-sm group-hover:shadow-md group-hover:scale-105"
                                            )}
                                        >
                                            <step.icon size={16} className="sm:hidden" />
                                            <step.icon size={20} className="hidden sm:block" />
                                        </span>
                                        <span
                                            className={cn(
                                                "text-[9px] sm:text-xs font-bold leading-tight max-w-[3.75rem] sm:max-w-[7rem] transition-colors duration-300",
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

                    <div ref={journeyPanelRef} className="mt-10 pt-8 border-t border-slate-200">
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
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                    Etapa {journeyDisplayed + 1} de {journey.length}
                                </p>
                                <h3 className="font-bold text-slate-900 text-lg mt-1">{journey[journeyDisplayed].title}</h3>
                                <p className="text-slate-500 text-sm mt-1.5 max-w-2xl">{journey[journeyDisplayed].description}</p>
                            </div>
                            <span className="stagger-item shrink-0 rounded-full bg-voca-green/10 text-voca-green text-xs font-semibold px-3 py-1.5 whitespace-nowrap">
                                {journey[journeyDisplayed].badge}
                            </span>
                        </div>

                        <div className="stagger-item mt-6 pt-6 border-t border-slate-200">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    O que acontece
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {journey[journeyDisplayed].stakeholders.map((role) => (
                                        <span key={role} className="rounded-full bg-white text-slate-600 text-[11px] font-semibold px-2.5 py-1 whitespace-nowrap shadow-sm">
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {journey[journeyDisplayed].checklist.map((item) => (
                                    <div key={item.action} className="rounded-2xl bg-white shadow-sm p-4">
                                        <div className="flex items-start gap-2.5">
                                            <Check size={15} className="shrink-0 mt-0.5 text-voca-green" />
                                            <p className="text-sm font-bold text-slate-800 leading-snug">{item.action}</p>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2 leading-relaxed pl-[1.6rem]">{item.benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center">
                        <Link
                            href="/casos-de-sucesso#credi10-treinamentos"
                            className="group inline-flex items-center gap-1.5 text-sm font-bold text-voca-green text-center"
                        >
                            Veja essa metodologia na prática: -40% no tempo de integração na Credi10
                            <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16">
                <div ref={platformsSectionRef}>
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
                                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Web & App</p>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                                    Um só VOCA, em qualquer tela.
                                </h2>
                                <p className="text-slate-500 mt-3 max-w-xl mx-auto">
                                    App e web sincronizados em tempo real, cada um pensado pra um momento do dia, não pra uma pessoa diferente. RH, liderança e colaboradores usam os dois.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="group relative rounded-[1.75rem] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg aspect-[16/11]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80"
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(0deg, rgba(1,20,22,0.75) 0%, transparent 55%)" }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center gap-2">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                                            <Smartphone size={15} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-white leading-tight">No bolso, o dia a dia</p>
                                            <p className="text-xs text-white/70">iOS e Android</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="group relative rounded-[1.75rem] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg aspect-[16/11]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80"
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(0deg, rgba(1,20,22,0.75) 0%, transparent 55%)" }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center gap-2">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                                            <Monitor size={15} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-white leading-tight">No computador, a visão completa</p>
                                            <p className="text-xs text-white/70">Qualquer navegador</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 rounded-[1.75rem] border border-white/60 bg-white/60 divide-y divide-slate-100">
                                {platformCapabilities.map((item) => (
                                    <div key={item.label} className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5">
                                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            {item.platforms.includes("app") && (
                                                <span className="flex items-center gap-1 rounded-full bg-voca-green/10 text-voca-green text-[11px] font-bold px-2 py-1">
                                                    <Smartphone size={11} />
                                                    App
                                                </span>
                                            )}
                                            {item.platforms.includes("web") && (
                                                <span className="flex items-center gap-1 rounded-full bg-voca-green/10 text-voca-green text-[11px] font-bold px-2 py-1">
                                                    <Monitor size={11} />
                                                    Web
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                <Wifi size={14} />
                                Dados sincronizados em tempo real entre as duas plataformas
                            </div>
                        </div>
                    </div>
                </div>

                <a
                    href="/#video"
                    className="group relative mt-16 flex flex-col sm:flex-row items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <div
                        className="relative w-full sm:w-64 shrink-0 aspect-video rounded-2xl overflow-hidden shadow-lg"
                        style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.15] pointer-events-none"
                            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-voca-green shadow-xl transition-transform duration-300 group-hover:scale-110">
                                <Play size={22} className="ml-0.5" fill="currentColor" />
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Conheça o VOCA</p>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                            Assista ao vídeo institucional
                        </h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto sm:mx-0">
                            Veja em poucos minutos como as 21 funcionalidades se conectam no dia a dia de quem usa o VOCA.
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-voca-green mt-4 group-hover:gap-2.5 transition-all">
                            Assistir agora
                            <ArrowRight size={14} />
                        </span>
                    </div>
                </a>

                <div
                    className="relative rounded-[2.5rem] overflow-hidden mt-16"
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

                    <div className="relative px-8 py-12 sm:px-14 sm:py-14 flex flex-col lg:flex-row items-center gap-10">
                        <div className="flex-1 text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70 uppercase tracking-widest">
                                <Calculator size={13} />
                                Calculadora de ROI
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 max-w-md mx-auto lg:mx-0">
                                Quanto sua empresa pode economizar com o VOCA?
                            </h2>
                            <p className="text-white/60 mt-3 max-w-md mx-auto lg:mx-0">
                                Simule com o número real de colaboradores da sua empresa e veja a economia estimada em segundos.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-5 shrink-0">
                            <div className="text-center">
                                <p className="text-4xl sm:text-5xl font-extrabold text-white">Até {PERCENT_SAVINGS}%</p>
                                <p className="text-xs text-white/60 uppercase tracking-widest font-bold mt-1.5">
                                    mais barato que o mercado
                                </p>
                            </div>
                            <Link href="/roi">
                                <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-7 h-12 text-base font-semibold">
                                    Calcular agora
                                    <ArrowRight className="ml-2" size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
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

            <Dialog open={!!detailFeature} onOpenChange={(open) => !open && setDetailFeature(null)}>
                <DialogContent className="w-[95vw] max-w-lg max-h-[85vh] p-0 rounded-3xl border-none flex flex-col overflow-hidden">
                    {detailFeature && (
                        <>
                            <div
                                className="shrink-0 px-6 sm:px-8 pt-8 pb-6"
                                style={{ background: `linear-gradient(135deg, ${displayed.color}1F, ${displayed.color}08)` }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: displayed.color, color: "#ffffff" }}
                                >
                                    <detailFeature.icon size={26} />
                                </div>
                                <DialogTitle className="text-2xl font-extrabold text-slate-900 mt-4">
                                    {detailFeature.name}
                                </DialogTitle>
                                <p className="text-slate-500 mt-1.5">{detailFeature.description}</p>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                    O que ela faz
                                </p>
                                <ul className="flex flex-col gap-3">
                                    {detailFeature.details?.map((item, index) => (
                                        <li
                                            key={item}
                                            style={{ animationDelay: `${index * 45}ms` }}
                                            className="flex gap-2.5 text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500"
                                        >
                                            <Check size={16} className="shrink-0 mt-0.5" style={{ color: displayed.color }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
