import Link from "next/link";
import { Briefcase, Users, Smile, ClipboardList, Check, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";

interface Persona {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    points: string[];
}

const personas: Persona[] = [
    {
        id: "decisores",
        icon: Briefcase,
        title: "Decisores",
        description: "Para quem precisa enxergar a empresa toda e decidir com dados, não com achismo.",
        color: "#2f6690",
        points: [
            "Dados que antecipam risco de turnover antes que ele vire perda de talento",
            "Indicadores de toda a empresa reunidos em tempo real",
            "Decisões estratégicas apoiadas em evidência, não em intuição",
        ],
    },
    {
        id: "gestores",
        icon: Users,
        title: "Gestores",
        description: "Para quem lidera pessoas no dia a dia e precisa de sinais antes que os problemas cresçam.",
        color: "#798f4f",
        points: [
            "Alertas de risco de saída por colaborador",
            "Avaliações de desempenho rápidas, com trilhas de desenvolvimento direcionadas",
            "Times mais conectados, mesmo com equipes espalhadas",
        ],
    },
    {
        id: "colaboradores",
        icon: Smile,
        title: "Colaboradores",
        description: "Para quem quer ser ouvido e reconhecido — com segurança de que sua voz importa.",
        color: "#47ad7f",
        points: [
            "Canais de escuta e reconhecimento com anonimato garantido",
            "Aprendizado que parece jogo, não obrigação",
            "Conquistas, rankings e desafios que engajam de verdade",
        ],
    },
    {
        id: "time-rh",
        icon: ClipboardList,
        title: "Time de RH",
        description: "Para quem precisa operacionalizar tudo isso — com o mínimo de dor de cabeça possível.",
        color: "#85568a",
        points: [
            "Implementação assistida, sem meses de configuração",
            "Atendimento humano, sem tickets perdidos",
            "Trilhas obrigatórias com certificação e relatórios de auditoria automáticos",
        ],
    },
];

export default function PublicoAlvoPage() {
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
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Público-alvo</p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                        Um VOCA diferente para cada pessoa na sua empresa
                    </h1>
                    <p className="text-lg text-slate-500 mt-4">
                        A plataforma se adapta a quem está usando — do C-level ao colaborador da ponta.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                    {personas.map((persona) => (
                        <div key={persona.title} id={persona.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm scroll-mt-24">
                            <div
                                className="flex h-11 w-11 items-center justify-center rounded-full mb-4"
                                style={{ backgroundColor: `${persona.color}1A`, color: persona.color }}
                            >
                                <persona.icon size={22} />
                            </div>
                            <h2 className="text-xl font-extrabold text-slate-900">{persona.title}</h2>
                            <p className="text-sm text-slate-500 mt-2">{persona.description}</p>

                            <ul className="mt-4 flex flex-col gap-2">
                                {persona.points.map((point) => (
                                    <li key={point} className="text-sm text-slate-600 flex gap-2">
                                        <Check size={16} className="shrink-0 mt-0.5" style={{ color: persona.color }} />
                                        {point}
                                    </li>
                                ))}
                            </ul>
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
    )
}
