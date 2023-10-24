import { AlarmCheck, HeartPulse, Lightbulb, MessagesSquare } from "lucide-react";

export default function KPIsSection() {
    return (
        <div className="px-8 py-6 shadow-2xl shadow-teal-900 bg-gradient-to-tl from-teal-500 to-teal-800 text-zinc-200 rounded">
            <h3 className="px-6 py-2 bg-teal-100 shadow rounded-full text-teal-800 w-fit mx-auto font-bold text-center">
                Resultados já alcançados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <Section icon={<HeartPulse size={38} />} value={65} description="De aumento no engajamento com pesquisas recorrentes de clima organizacional" />
                <Section icon={<Lightbulb size={38} />} value={47} description="De contribuição em espaços reservados para inovação" />
                <Section icon={<MessagesSquare size={38} />} value={78} description="No aumento da comunicação interna entre times" />
                <Section icon={<AlarmCheck size={38} />} value={48} description="De tempo economizado em avaliações de desempenho" />
            </div>
        </div>
    )
}

interface SectionProps {
    icon: React.ReactNode,
    value: number,
    description: string,
}

function Section({ icon, value, description }: SectionProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="text-teal-100">
                {icon}
            </div>
            <div className="flex flex-col gap-1 h-full">
                <h2 className="text-4xl text-white font-bold">{value}%</h2>
                <p className="text-teal-50">{description}</p>
            </div>
        </div>
    )
}