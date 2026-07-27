"use client"

import { useState } from "react";
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
    MessageSquarePlus,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Solution {
    id: string;
    title: string;
    icon: LucideIcon;
    color: string;
    points: string[];
}

interface Problem {
    id: string;
    label: string;
    stat: string;
    solutionId: string;
}

const solutions: Solution[] = [
    {
        id: "termometro",
        title: "Termômetro de Humor",
        icon: Smile,
        color: "#47ad7f",
        points: [
            "Captura ativa e passiva do sentimento diário",
            "Alertas automáticos para RH e lideranças",
            "Relatórios de clima segmentados em tempo real",
        ],
    },
    {
        id: "voz",
        title: "Voz para os Colaboradores",
        icon: MessageSquare,
        color: "#007980",
        points: [
            "5 canais customizados de escuta e reconhecimento",
            "Cultura de feedback contínuo com anonimato garantido",
            "Potencialize ideias inovadoras da equipe",
        ],
    },
    {
        id: "pesquisas",
        title: "Pesquisas em Tempo Real",
        icon: BarChart3,
        color: "#c77924",
        points: [
            "Crie pesquisas customizadas em poucos cliques",
            "Insights da empresa toda ou segmentados por área",
            "Dispare pesquisas automáticas nos processos da empresa",
        ],
    },
    {
        id: "rede-social",
        title: "Rede Social Corporativa",
        icon: Users,
        color: "#798f4f",
        points: [
            "Integre times distantes e potencialize a comunicação interna",
            "Dissemine a cultura corporativa pela gamificação",
            "Facilite o engajamento entre colaboradores e empresa",
        ],
    },
    {
        id: "treinamentos",
        title: "Treinamentos e Gamificação",
        icon: GraduationCap,
        color: "#85568a",
        points: [
            "Onboarding mais escalável para novos times",
            "Trilhas de desenvolvimento individuais ou por equipe",
            "Aprendizado potencializado por gamificação",
        ],
    },
    {
        id: "avaliacao",
        title: "Avaliação de Desempenho",
        icon: Award,
        color: "#5f7480",
        points: [
            "Avalie o colaborador em poucos cliques",
            "Identifique gaps de habilidade e direcione trilhas",
            "Entenda os motivos por trás da perda de talentos",
        ],
    },
    {
        id: "dashboards",
        title: "Dashboards & Inteligência de Dados",
        icon: LineChart,
        color: "#2f6690",
        points: [
            "Compile indicadores de toda a empresa em tempo real",
            "Receba insights e sugestões de ação automáticas",
            "Entenda o impacto das ações entre os times",
        ],
    },
    {
        id: "compliance",
        title: "Governança & Compliance",
        icon: ShieldCheck,
        color: "#a5760f",
        points: [
            "Trilhas obrigatórias com certificação automática",
            "Relatórios de auditoria prontos para ESG e reguladores",
            "Histórico rastreável de treinamentos e políticas internas",
        ],
    },
];

const problems: Problem[] = [
    { id: "feedback", label: "Baixa frequência de feedbacks", stat: "60% dos funcionários desejam feedback diário ou semanal. (PwC)", solutionId: "pesquisas" },
    { id: "saude-emocional", label: "Fragilidade na saúde emocional dos times", stat: "Cada US$1 investido na saúde do colaborador retorna US$4 em lucro. (World Economic Forum)", solutionId: "termometro" },
    { id: "clima", label: "Desconhecimento do clima organizacional", stat: "89% dos profissionais de RH veem o clima como essencial. (SHRM)", solutionId: "termometro" },
    { id: "dados", label: "Transformar dados em recomendações", stat: "Líderes que usam dados têm até 22% mais lucratividade. (Capgemini)", solutionId: "dashboards" },
    { id: "experiencia", label: "Melhorar a experiência do colaborador", stat: "Boa experiência do colaborador supera concorrentes em até 82%. (Glassdoor)", solutionId: "voz" },
    { id: "distancia", label: "Equipes espalhadas / distância entre gestor e time", stat: "Equipes bem conectadas têm até 25% mais produtividade. (Harvard Business Review)", solutionId: "rede-social" },
    { id: "escuta", label: "Falta de escuta ativa e reconhecimento", stat: "Escuta ativa gera até 4,6x mais retenção de talentos. (i4cp)", solutionId: "voz" },
    { id: "turnover", label: "Avaliações de desempenho, experiência e desligamento", stat: "Avaliações consistentes elevam em 14% a satisfação do cliente. (Gallup)", solutionId: "avaliacao" },
    { id: "gamificacao", label: "Treinamento de equipes e gamificação", stat: "87% dizem que gamificação torna o ambiente mais produtivo. (TalentLMS)", solutionId: "treinamentos" },
    { id: "compliance", label: "Compliance, ESG e auditorias", stat: "93% dos investidores pagariam mais por práticas ESG sólidas. (IFC)", solutionId: "compliance" },
    { id: "cultura", label: "Desalinhamento da cultura corporativa", stat: "94% dos executivos veem cultura como fundamental. (Deloitte)", solutionId: "rede-social" },
];

const problemGroups: { label: string; ids: string[] }[] = [
    { label: "Clima & bem-estar", ids: ["saude-emocional", "clima", "escuta", "experiencia"] },
    { label: "Comunicação & cultura", ids: ["distancia", "cultura"] },
    { label: "Dados & performance", ids: ["feedback", "dados", "turnover"] },
    { label: "Desenvolvimento & governança", ids: ["gamificacao", "compliance"] },
];

export default function ProblemSolutionSelector() {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [otherText, setOtherText] = useState("");

    function toggleProblem(id: string) {
        setSelectedIds((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    }

    function handleSendOther() {
        if (!otherText.trim()) return;
        const params = new URLSearchParams({ source: "other-challenge", message: otherText.trim() });
        router.push(`/contact?${params.toString()}`);
    }

    const selectedSolutionIds = new Set(
        problems.filter((problem) => selectedIds.includes(problem.id)).map((problem) => problem.solutionId)
    );
    const resultSolutions = solutions.filter((solution) => selectedSolutionIds.has(solution.id));
    const solutionsById = new Map(solutions.map((solution) => [solution.id, solution]));

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

                <div className="flex flex-col gap-7 mt-10">
                    {(() => {
                        let cardIndex = 0;
                        return problemGroups.map((group) => (
                            <div key={group.label}>
                                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 pl-1">
                                    {group.label}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {group.ids.map((id) => {
                                        const problem = problems.find((p) => p.id === id)!;
                                        const isSelected = selectedIds.includes(problem.id);
                                        const solution = solutionsById.get(problem.solutionId)!;
                                        const Icon = solution.icon;
                                        const delayMs = cardIndex * 40;
                                        cardIndex += 1;
                                        return (
                                            <button
                                                key={problem.id}
                                                onClick={() => toggleProblem(problem.id)}
                                                style={{
                                                    animationDelay: `${delayMs}ms`,
                                                    borderColor: isSelected ? solution.color : undefined,
                                                    backgroundColor: isSelected ? `${solution.color}0D` : undefined,
                                                }}
                                                className={cn(
                                                    "min-h-[132px] flex flex-col justify-center text-left rounded-xl border-2 px-4 py-3 transition-all duration-150 animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
                                                    isSelected ? "shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span
                                                        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-150"
                                                        style={{
                                                            backgroundColor: `${solution.color}1A`,
                                                            color: solution.color,
                                                            transform: isSelected ? "scale(1.08)" : "scale(1)",
                                                        }}
                                                    >
                                                        <Icon size={16} />
                                                        {isSelected && (
                                                            <span
                                                                className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white text-white"
                                                                style={{ backgroundColor: solution.color }}
                                                            >
                                                                <Check size={9} strokeWidth={3} />
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium pt-1.5"
                                                        style={{ color: isSelected ? solution.color : "#334155" }}
                                                    >
                                                        {problem.label}
                                                    </span>
                                                </div>

                                                <div
                                                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                                                    style={{ gridTemplateRows: isSelected ? "1fr" : "0fr" }}
                                                >
                                                    <div className="overflow-hidden">
                                                        <p className="text-xs text-slate-400 pt-2 pl-11">
                                                            {problem.stat}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ));
                    })()}

                    <button
                        onClick={() => setIsOtherOpen((current) => !current)}
                        className={cn(
                            "self-start flex items-center gap-3 text-left rounded-xl border-2 border-dashed px-4 py-3 transition-all duration-150",
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
                </div>

                {isOtherOpen && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-2 duration-300">
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

                <div className="mt-12">
                    {resultSolutions.length === 0 ? (
                        <div className="rounded-2xl border-2 border-dashed border-slate-300 py-14 px-6 text-center">
                            <p className="text-slate-400">
                                Selecione os desafios acima para ver como o VOCA ajuda a resolver cada um deles.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm font-bold tracking-widest text-voca-green uppercase text-center mb-6">
                                Como o VOCA resolve isso
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {resultSolutions.map((solution) => {
                                    const Icon = solution.icon;
                                    return (
                                        <div
                                            key={solution.id}
                                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
                                            style={{ borderTopColor: solution.color, borderTopWidth: 3 }}
                                        >
                                            <div
                                                className="flex h-11 w-11 items-center justify-center rounded-full mb-4"
                                                style={{ backgroundColor: `${solution.color}1A`, color: solution.color }}
                                            >
                                                <Icon size={22} />
                                            </div>
                                            <h3 className="font-bold text-slate-900">{solution.title}</h3>
                                            <ul className="mt-3 flex flex-col gap-2">
                                                {solution.points.map((point) => (
                                                    <li key={point} className="text-sm text-slate-500 flex gap-2">
                                                        <Check size={16} className="shrink-0 mt-0.5" style={{ color: solution.color }} />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center mt-10">
                                <Link href="/contact">
                                    <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base font-semibold">
                                        Agendar demonstração
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
