"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    ClipboardCheck,
    MessageSquarePlus,
    ChevronDown,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Challenge {
    id: string;
    label: string;
    stat: string;
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
    const [edges, setEdges] = useState({ top: false, bottom: false });

    function toggleChallenge(id: string) {
        setSelectedIds((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    }

    function handleSendOther() {
        if (!otherText.trim()) return;
        const params = new URLSearchParams({ source: "other-challenge", message: otherText.trim() });
        router.push(`/contact?${params.toString()}`);
    }

    const selected = allChallenges.filter((challenge) => selectedIds.includes(challenge.id));

    useEffect(() => {
        const element = panelRef.current;
        if (!element) return;

        function update() {
            if (!element) return;
            const scrollable = element.scrollHeight > element.clientHeight + 1;
            setEdges({
                top: scrollable && element.scrollTop > 4,
                bottom: scrollable && element.scrollTop + element.clientHeight < element.scrollHeight - 4,
            });
        }

        update();
        element.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            element.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [selectedIds]);

    return (
        <div id="challenges" className="relative bg-slate-50 py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div
                    className="absolute -top-32 -left-24 w-[32rem] h-[32rem] bg-voca-green/10 rounded-full blur-3xl"
                    style={{ animation: "drift-b 24s ease-in-out infinite" }}
                />
                <div
                    className="absolute -bottom-40 -right-24 w-[28rem] h-[28rem] bg-teal-300/15 rounded-full blur-3xl"
                    style={{ animation: "drift-a 28s ease-in-out infinite" }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">
                        Dores que resolvemos
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                        Quais desafios sua empresa enfrenta?
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Selecione um ou mais problemas abaixo e veja, na hora, como o VOCA resolve cada um deles.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-10 mt-10 items-start">
                    <div className="flex flex-col gap-6">
                        {challengeGroups.map((group) => (
                            <div key={group.label}>
                                <p
                                    className="text-xs font-bold tracking-widest uppercase mb-2.5 pl-1"
                                    style={{ color: group.color }}
                                >
                                    {group.label}
                                </p>
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
                        <div className="relative">
                            <div
                                className={cn(
                                    "pointer-events-none absolute inset-x-0 top-0 h-12 z-10 bg-gradient-to-b from-slate-50 to-transparent transition-opacity duration-200",
                                    edges.top ? "opacity-100" : "opacity-0"
                                )}
                            />

                            <div
                                ref={panelRef}
                                data-lenis-prevent
                                className="voca-scroll lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-3 lg:pb-20"
                            >
                        {selected.length === 0 ? (
                            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 py-16 px-6 text-center">
                                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                                    <Check size={22} />
                                </div>
                                <p className="text-slate-500 font-medium mt-4">
                                    Selecione um desafio ao lado
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

                                {selected.map((challenge) => {
                                    const Icon = challenge.icon;
                                    return (
                                        <div
                                            key={challenge.id}
                                            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
                                            style={{ borderTopColor: challenge.color, borderTopWidth: 3 }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                                    style={{ backgroundColor: `${challenge.color}1A`, color: challenge.color }}
                                                >
                                                    <Icon size={18} />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                                        {challenge.label}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                        {challenge.stat}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-slate-100">
                                                <p
                                                    className="text-xs font-bold uppercase tracking-widest mb-2.5"
                                                    style={{ color: challenge.color }}
                                                >
                                                    {challenge.solutionTitle}
                                                </p>
                                                <ul className="flex flex-col gap-2">
                                                    {challenge.solutionPoints.map((point) => (
                                                        <li key={point} className="text-sm text-slate-600 flex gap-2 leading-relaxed">
                                                            <Check
                                                                size={15}
                                                                className="shrink-0 mt-1"
                                                                style={{ color: challenge.color }}
                                                            />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}

                                <Link href="/contact" className="lg:hidden mt-2">
                                    <Button className="w-full bg-voca-green hover:bg-voca-green/90 rounded-md h-12 text-base font-semibold">
                                        Agendar demonstração
                                    </Button>
                                </Link>
                            </div>
                        )}
                            </div>

                            {selected.length > 0 && (
                                <div className="hidden lg:flex pointer-events-none absolute inset-x-0 bottom-0 z-20 justify-center pt-16 pb-1 pr-3 bg-gradient-to-t from-slate-50 via-slate-50/85 to-transparent">
                                    <Link
                                        href="/contact"
                                        aria-label={edges.bottom ? "Role para ver mais soluções" : "Agendar demonstração"}
                                        onClick={(event) => {
                                            if (!edges.bottom) return;
                                            event.preventDefault();
                                            panelRef.current?.scrollTo({
                                                top: panelRef.current.scrollHeight,
                                                behavior: "smooth",
                                            });
                                        }}
                                        className={cn(
                                            "pointer-events-auto relative flex h-12 w-full items-center justify-center overflow-hidden font-bold shadow-md transition-all duration-500 ease-out",
                                            edges.bottom
                                                ? "max-w-[12rem] rounded-full bg-white text-voca-green ring-1 ring-voca-green/20 hover:ring-voca-green/40"
                                                : "max-w-full rounded-md bg-voca-green text-white shadow-voca-green/25 hover:bg-voca-green/90"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute flex items-center gap-1.5 text-xs whitespace-nowrap transition-all duration-300",
                                                edges.bottom ? "opacity-100 translate-y-0 delay-150" : "opacity-0 -translate-y-4"
                                            )}
                                        >
                                            Role para ver mais
                                            <ChevronDown size={13} className="animate-bounce" />
                                        </span>
                                        <span
                                            className={cn(
                                                "absolute flex items-center gap-2 text-base whitespace-nowrap transition-all duration-300",
                                                edges.bottom ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0 delay-150"
                                            )}
                                        >
                                            Agendar demonstração
                                            <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
