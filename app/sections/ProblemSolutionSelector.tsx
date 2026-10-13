"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLenisInstance } from "@/lib/lenis";
import {
    Check,
    Smile,
    MessageSquare,
    BarChart3,
    Users,
    GraduationCap,
    Award,
    LineChart,
    ShieldCheck,
    Sparkles,
    Megaphone,
    Network,
    ClipboardCheck,
    MessageSquarePlus,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ArrowDown,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Challenge {
    id: string;
    label: string;
    stat?: string;
    icon: LucideIcon;
    solutionTitle: string;
    solutionPoints: string[];
}

interface ChallengeGroup {
    label: string;
    color: string;
    challenges: Challenge[];
}

const challengeGroups: ChallengeGroup[] = [
    {
        label: "Clima & bem-estar",
        color: "#007980",
        challenges: [
            {
                id: "saude-emocional",
                label: "Fragilidade na saúde emocional dos times",
                stat: "Cada US$1 investido na saúde do colaborador retorna US$4 em lucro. (World Economic Forum)",
                icon: Smile,
                solutionTitle: "Termômetro de Humor",
                solutionPoints: [
                    "Termômetro de Humor capta o sentimento do time todos os dias.",
                    "A liderança recebe alertas automáticos quando o clima cai, antes que o problema vire absenteísmo e saída.",
                    "Canais privados para dar voz e segurança psicológica aos colaboradores.",
                ],
            },
            {
                id: "clima",
                label: "Desconhecimento do clima organizacional",
                stat: "89% dos profissionais de RH veem o clima como essencial. (SHRM)",
                icon: BarChart3,
                solutionTitle: "Pesquisas de clima com IA",
                solutionPoints: [
                    "Pesquisas de clima customizadas com análise de sentimento por IA.",
                    "Resultados compilados ou segmentados por áreas e grupos.",
                ],
            },
            {
                id: "escuta",
                label: "Falta de escuta ativa e reconhecimento",
                stat: "Escuta ativa gera até 4,6x mais retenção de talentos. (i4cp)",
                icon: MessageSquare,
                solutionTitle: "6 canais de voz",
                solutionPoints: [
                    "Ouvidoria, Feedbacks, Fale com a Liderança, Caixa de Ideias, Mural de Elogios e Aniversários.",
                    "Anônimos ou identificados.",
                ],
            },
            {
                id: "experiencia",
                label: "Melhorar a experiência do colaborador",
                stat: "Boa experiência do colaborador supera concorrentes em até 82%. (Glassdoor)",
                icon: Sparkles,
                solutionTitle: "Plataforma white-label",
                solutionPoints: [
                    "Plataforma white-label com a cara da empresa, no web e no app, e super fácil de usar.",
                    "Experiência que engaja desde o primeiro acesso.",
                    "Comunicação humanizada, com gamificação, reconhecimento, notificações e marketplace.",
                ],
            },
        ],
    },
    {
        label: "Comunicação & cultura",
        color: "#798f4f",
        challenges: [
            {
                id: "distancia",
                label: "Equipes espalhadas / distância entre gestor e time",
                stat: "Equipes bem conectadas têm até 25% mais produtividade. (Harvard Business Review)",
                icon: Users,
                solutionTitle: "Rede Social Corporativa",
                solutionPoints: [
                    "Rede Social Corporativa com canais temáticos, notificações push e reports de alcance por área.",
                    "O gestor vira um líder conectado, mesmo a distância.",
                    "Canal customizável, Fale com a Liderança e PDI com chat entre gestor e liderado.",
                ],
            },
            {
                id: "comunicacao",
                label: "Ineficiência da comunicação interna",
                icon: Network,
                solutionTitle: "Comunicação que chega e é medida",
                solutionPoints: [
                    "Rede Social Corporativa com canais temáticos, organizando o fluxo e o perfil da comunicação na palma da mão do time.",
                    "Notificações que puxam ação por parte dos usuários.",
                    "Relatórios em tempo real com a eficácia da comunicação por área.",
                ],
            },
            {
                id: "cultura",
                label: "Desalinhamento da cultura corporativa",
                stat: "94% dos executivos veem cultura como fundamental. (Deloitte)",
                icon: Megaphone,
                solutionTitle: "Cultura que vira comportamento",
                solutionPoints: [
                    "Campanhas gamificadas sobre a cultura, desafios coletivos e reconhecimento público pela Rede Social do VOCA.",
                    "Cultura vira comportamento visível.",
                ],
            },
        ],
    },
    {
        label: "Dados & performance",
        color: "#2f6690",
        challenges: [
            {
                id: "feedback",
                label: "Baixa frequência de feedbacks",
                stat: "60% dos funcionários desejam feedback diário ou semanal. (PwC)",
                icon: ClipboardCheck,
                solutionTitle: "Feedbacks e PDI",
                solutionPoints: [
                    "Módulo de Feedbacks estruturado, com envio e solicitação em poucos cliques.",
                    "PDI vinculado aos resultados de desempenho, com chat entre gestor e liderado.",
                ],
            },
            {
                id: "dados",
                label: "Transformar dados em recomendações",
                stat: "Líderes que usam dados têm até 22% mais lucratividade. (Capgemini)",
                icon: LineChart,
                solutionTitle: "Relatórios e report estratégico",
                solutionPoints: [
                    "Relatórios online em tempo real para cada módulo, compilados ou segmentados por áreas e períodos, com base de dados exportável.",
                    "Relatórios offline customizados, com flexibilidade para atender aos desafios de cada cliente.",
                    "Reunião trimestral e report estratégico com indicadores, pontos de atenção, oportunidades e recomendações de ação.",
                ],
            },
            {
                id: "turnover",
                label: "Avaliações de desempenho, experiência e desligamento",
                stat: "Avaliações consistentes elevam em 14% a satisfação do cliente. (Gallup)",
                icon: Award,
                solutionTitle: "Avaliação de Desempenho",
                solutionPoints: [
                    "Avaliação de desempenho 90/180/360º consistente e customizável para o fluxo do cliente, integrada ao PDI.",
                    "Formulário de desligamento customizável, com relatório e indicadores de turnover em tempo real.",
                    "Avaliação de experiência flexível e histórico rastreável para auditoria.",
                ],
            },
        ],
    },
    {
        label: "Desenvolvimento & governança",
        color: "#85568a",
        challenges: [
            {
                id: "gamificacao",
                label: "Treinamento de equipes e gamificação",
                stat: "87% dizem que gamificação torna o ambiente mais produtivo. (TalentLMS)",
                icon: GraduationCap,
                solutionTitle: "LMS e Gamificação",
                solutionPoints: [
                    "LMS robusto com trilhas em vários formatos, certificado de conclusão, quiz e streaming próprio da plataforma.",
                    "Base com 100 treinamentos introdutórios disponíveis.",
                    "Gamificação complementar, com trilhas e conteúdos customizáveis.",
                ],
            },
            {
                id: "compliance",
                label: "Compliance, ESG e auditorias",
                stat: "93% dos investidores pagariam mais por práticas ESG sólidas. (IFC)",
                icon: ShieldCheck,
                solutionTitle: "Governança e Compliance",
                solutionPoints: [
                    "Ouvidoria anônima, relatórios rastreáveis e trilhas com certificação.",
                    "Cobertura dos principais requisitos da NR-1 e conformidade com a LGPD.",
                ],
            },
        ],
    },
];

const allChallenges = challengeGroups.flatMap((group) =>
    group.challenges.map((challenge) => ({ ...challenge, color: group.color }))
);

export default function ProblemSolutionSelector() {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [otherText, setOtherText] = useState("");
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelInView, setPanelInView] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeGroupLabel, setActiveGroupLabel] = useState(challengeGroups[0].label);

    const selected = allChallenges.filter((challenge) => selectedIds.includes(challenge.id));
    const safeIndex = Math.min(activeIndex, Math.max(0, selected.length - 1));
    const active = selected[safeIndex];

    function toggleChallenge(id: string) {
        setSelectedIds((current) => {
            if (current.includes(id)) {
                const next = current.filter((item) => item !== id);
                setActiveIndex((index) => Math.max(0, Math.min(index, next.length - 1)));
                return next;
            }

            const next = [...current, id];

            setActiveIndex(allChallenges.filter((c) => next.includes(c.id)).findIndex((c) => c.id === id));
            return next;
        });
    }

    function handleSendOther() {
        if (!otherText.trim()) return;
        const params = new URLSearchParams({ source: "other-challenge", message: otherText.trim() });
        router.push(`/contact?${params.toString()}`);
    }

    function focusSolution(index: number) {
        const total = selected.length;
        if (total === 0) return;

        const next = ((index % total) + total) % total;
        setActiveIndex(next);

        const group = challengeGroups.find((g) =>
            g.challenges.some((c) => c.id === selected[next].id)
        );
        if (group) setActiveGroupLabel(group.label);
    }

    useEffect(() => {
        const element = panelRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setPanelInView(entry.isIntersecting),
            { rootMargin: "0px 0px -30% 0px" }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const scrollToPanel = useCallback(() => {
        const element = panelRef.current;
        if (!element) return;

        const lenis = getLenisInstance();
        if (lenis) {
            lenis.scrollTo(element, { offset: -96, duration: 1.1 });
        } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    return (
        <>

        <div
            id="challenges"
            className="relative py-16 sm:py-24 px-6 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 15%, #f8fafc 85%, #ffffff 100%)",
            }}
        >
            <div className="absolute inset-0 pointer-events-none">

                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background: [
                            "radial-gradient(46rem 24rem at 16% 26%, rgba(0,121,128,0.14), transparent 62%)",
                            "radial-gradient(38rem 22rem at 86% 16%, rgba(94,234,212,0.18), transparent 60%)",
                            "radial-gradient(32rem 20rem at 62% 78%, rgba(232,178,61,0.10), transparent 64%)",
                        ].join(", "),
                        maskImage: "linear-gradient(180deg, transparent 0%, #000 16%, #000 80%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 16%, #000 80%, transparent 100%)",
                        animation: "aurora-drift 34s ease-in-out infinite",
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="relative text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[46rem] max-w-[130vw] -translate-x-1/2 -translate-y-1/2"
                        style={{
                            background: "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 45%, transparent 100%)",
                        }}
                    />

                    <h2 className="voca-title text-3xl sm:text-4xl font-extrabold leading-tight">
                        Quais desafios sua empresa enfrenta?
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Selecione um ou mais problemas abaixo e veja, na hora, como o VOCA resolve cada um deles.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-10 mt-10 items-start">
                    <div className="flex flex-col gap-4">

                        <div className="flex flex-wrap gap-2">
                            {challengeGroups.map((group) => {
                                const isActive = group.label === activeGroupLabel;
                                const count = group.challenges.filter((c) => selectedIds.includes(c.id)).length;
                                return (
                                    <button
                                        key={group.label}
                                        type="button"
                                        onClick={() => setActiveGroupLabel(group.label)}
                                        aria-pressed={isActive}
                                        style={{
                                            borderColor: isActive ? group.color : undefined,
                                            backgroundColor: isActive ? group.color : undefined,
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-all duration-300 ease-out",
                                            isActive
                                                ? "text-white shadow-md -translate-y-0.5"
                                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:-translate-y-0.5"
                                        )}
                                    >
                                        {group.label}
                                        {count > 0 && (
                                            <span
                                                className="flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px]"
                                                style={{
                                                    backgroundColor: isActive ? "rgba(255,255,255,0.28)" : `${group.color}1F`,
                                                    color: isActive ? "#ffffff" : group.color,
                                                }}
                                            >
                                                {count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {challengeGroups.filter((group) => group.label === activeGroupLabel).map((group) => (
                            <div key={group.label}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {group.challenges.map((challenge) => {
                                        const isSelected = selectedIds.includes(challenge.id);
                                        const Icon = challenge.icon;
                                        const orderIndex = allChallenges.findIndex((item) => item.id === challenge.id);
                                        return (
                                            <button
                                                key={challenge.id}
                                                onClick={() => toggleChallenge(challenge.id)}
                                                aria-pressed={isSelected}
                                                style={{
                                                    animationDelay: `${orderIndex * 45}ms`,
                                                    borderColor: isSelected ? group.color : undefined,
                                                    backgroundColor: isSelected ? `${group.color}0D` : undefined,
                                                }}
                                                className={cn(
                                                    "group flex items-start gap-2.5 text-left rounded-xl border-2 px-3.5 py-3 transition-all duration-150 animate-in fade-in slide-in-from-bottom-2 fill-mode-both focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voca-green/50 focus-visible:ring-offset-2",
                                                    isSelected
                                                        ? "shadow-sm -translate-y-0.5"
                                                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5"
                                                )}
                                            >
                                                <span
                                                    className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-150"
                                                    style={{
                                                        backgroundColor: `${group.color}1A`,
                                                        color: group.color,
                                                        transform: isSelected ? "scale(1.08)" : "scale(1)",
                                                    }}
                                                >
                                                    <Icon size={14} />
                                                    {isSelected && (
                                                        <span
                                                            className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white text-white"
                                                            style={{ backgroundColor: group.color }}
                                                        >
                                                            <Check size={8} strokeWidth={3} />
                                                        </span>
                                                    )}
                                                </span>
                                                <span
                                                    className="text-sm font-medium leading-snug"
                                                    style={{ color: isSelected ? group.color : "#334155" }}
                                                >
                                                    {challenge.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div>
                            <button
                                onClick={() => setIsOtherOpen((current) => !current)}
                                className={cn(
                                    "w-full sm:w-auto flex items-center gap-3 text-left rounded-xl border-2 border-dashed px-3.5 py-3 transition-all duration-150",
                                    isOtherOpen
                                        ? "border-voca-green bg-voca-green/5"
                                        : "border-slate-300 bg-white hover:border-voca-green/40"
                                )}
                            >
                                <MessageSquarePlus size={18} className={isOtherOpen ? "text-voca-green" : "text-slate-400"} />
                                <span className={cn("text-sm font-medium", isOtherOpen ? "text-voca-green" : "text-slate-700")}>
                                    Outro desafio não listado
                                </span>
                            </button>

                            {isOtherOpen && (
                                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-sm font-medium text-slate-700 mb-2">
                                        Conte em poucas palavras qual desafio você não encontrou acima:
                                    </p>
                                    <Textarea
                                        value={otherText}
                                        onChange={(event) => setOtherText(event.target.value)}
                                        placeholder="Ex.: Precisamos melhorar a comunicação entre matriz e filiais..."
                                        className="bg-white"
                                    />
                                    <div className="flex justify-end mt-3">
                                        <Button
                                            onClick={handleSendOther}
                                            disabled={!otherText.trim()}
                                            className="bg-voca-green hover:bg-voca-green/90 font-semibold"
                                        >
                                            Enviar para nossa equipe
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24">
                        <div ref={panelRef} className="relative">
                        {selected.length === 0 ? (
                            <div className="flex min-h-[20rem] sm:min-h-[22rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center">
                                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                                    <Check size={22} />
                                </div>
                                <p className="text-slate-500 font-medium mt-4">
                                    <span className="lg:hidden">Selecione um desafio acima</span>
                                    <span className="hidden lg:inline">Selecione um desafio ao lado</span>
                                </p>
                                <p className="text-slate-400 text-sm mt-1">
                                    A solução do VOCA aparece aqui, sem sair da tela.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-voca-green uppercase">
                                        Como o VOCA resolve
                                        <span
                                            key={selected.length}
                                            className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-voca-green px-1.5 text-[11px] font-bold text-white animate-in zoom-in-50 duration-300"
                                        >
                                            {selected.length}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() => setSelectedIds([])}
                                        className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        Limpar seleção
                                    </button>
                                </div>

                                <div className="relative">
                                    {selected.slice(0, 3).map((_, depth) => {
                                        if (depth === 0) return null;
                                        return (
                                            <div
                                                key={`peek-${depth}`}
                                                aria-hidden="true"
                                                className="absolute inset-x-0 top-0 h-full rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 ease-out"
                                                style={{
                                                    transform: `translateY(${depth * 9}px) scale(${1 - depth * 0.035})`,
                                                    opacity: 1 - depth * 0.35,
                                                    zIndex: -depth,
                                                }}
                                            />
                                        );
                                    })}

                                    {active && (() => {
                                        const Icon = active.icon;
                                        return (
                                            <div
                                                key={active.id}

                                                className="relative flex min-h-[20rem] sm:min-h-[22rem] flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md animate-in fade-in slide-in-from-right-4 duration-500"
                                                style={{ borderTopColor: active.color, borderTopWidth: 3 }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span
                                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                                        style={{ backgroundColor: `${active.color}1A`, color: active.color }}
                                                    >
                                                        <Icon size={18} />
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-slate-900 leading-snug">
                                                            {active.label}
                                                        </p>
                                                        {active.stat && (
                                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                                {active.stat}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="relative mt-5 flex items-center gap-3">
                                                    <span className="h-px flex-1 bg-slate-100" />
                                                    <span
                                                        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                                                        style={{ color: active.color }}
                                                    >
                                                        <ArrowDown size={13} />
                                                        O VOCA resolve assim
                                                    </span>
                                                    <span className="h-px flex-1 bg-slate-100" />
                                                </div>

                                                <div
                                                    className="mt-4 flex items-center gap-2.5 rounded-xl px-3.5 py-3 animate-in fade-in zoom-in-95 duration-500"
                                                    style={{
                                                        backgroundColor: `${active.color}12`,
                                                        animationDelay: "80ms",
                                                        animationFillMode: "both",
                                                    }}
                                                >
                                                    <span
                                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                                                        style={{ backgroundColor: active.color }}
                                                    >
                                                        <Icon size={16} />
                                                    </span>
                                                    <p className="text-sm font-bold" style={{ color: active.color }}>
                                                        {active.solutionTitle}
                                                    </p>
                                                </div>

                                                <ol className="relative mt-5 flex flex-col gap-4">
                                                    {active.solutionPoints.map((point, i) => {
                                                        const isLast = i === active.solutionPoints.length - 1;
                                                        return (
                                                            <li
                                                                key={point}
                                                                className="relative flex gap-3.5 animate-in fade-in slide-in-from-bottom-1 duration-500"
                                                                style={{ animationDelay: `${200 + i * 90}ms`, animationFillMode: "both" }}
                                                            >
                                                                {!isLast && (
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="absolute left-[11px] top-7 bottom-[-14px] w-px"
                                                                        style={{ backgroundColor: `${active.color}33` }}
                                                                    />
                                                                )}
                                                                <span
                                                                    className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold"
                                                                    style={{ borderColor: active.color, color: active.color }}
                                                                >
                                                                    {i + 1}
                                                                </span>
                                                                <p className="text-sm leading-relaxed text-slate-600 pt-0.5">
                                                                    {point}
                                                                </p>
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {selected.length > 1 && (
                                    <div className="flex items-center justify-center gap-3 pt-1" style={{ marginTop: 8 + Math.min(selected.length - 1, 2) * 9 }}>
                                        <button
                                            type="button"
                                            onClick={() => focusSolution(safeIndex - 1)}
                                            aria-label="Solução anterior"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-voca-green/40 hover:text-voca-green"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        <div className="flex items-center gap-1.5">
                                            {selected.map((challenge, i) => (
                                                <button
                                                    key={challenge.id}
                                                    type="button"
                                                    onClick={() => focusSolution(i)}
                                                    aria-label={challenge.label}
                                                    className="rounded-full transition-all duration-300"
                                                    style={{
                                                        height: 7,
                                                        width: i === safeIndex ? 22 : 7,
                                                        backgroundColor: i === safeIndex ? challenge.color : "#cbd5e1",
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => focusSolution(safeIndex + 1)}
                                            aria-label="Próxima solução"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-voca-green/40 hover:text-voca-green"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}

                                <Link href="/contact" className="mt-2">
                                    <Button className="w-full bg-voca-green hover:bg-voca-green/90 rounded-md h-12 text-base font-semibold">
                                        Agendar demonstração
                                        <ArrowRight className="ml-2" size={16} />
                                    </Button>
                                </Link>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <button
                type="button"
                onClick={scrollToPanel}
                aria-hidden={panelInView || selected.length === 0}
                tabIndex={panelInView || selected.length === 0 ? -1 : 0}
                className={cn(
                    "lg:hidden fixed bottom-5 left-1/2 z-40 flex items-center gap-2 rounded-full bg-voca-green py-3 pl-3 pr-4 text-sm font-bold text-white shadow-xl shadow-voca-green/30 transition-all duration-500 ease-out",
                    panelInView || selected.length === 0
                        ? "pointer-events-none -translate-x-1/2 translate-y-8 opacity-0"
                        : "-translate-x-1/2 translate-y-0 opacity-100"
                )}
            >
                <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/25 px-1.5 text-[11px]">
                    {selected.length}
                </span>
                {selected.length === 1 ? "Ver a solução" : "Ver as soluções"}
                <ChevronDown size={16} className="animate-bounce" />
            </button>
        </>
    );
}
