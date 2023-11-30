import { AlarmCheck, BookOpenCheck, HeartPulse, Lightbulb, MessagesSquare, Rocket, Trophy, Users } from "lucide-react";

export default function KPIsSection() {
    return (
        <div className="bg-voca-yellow bg-zig-zag py-11 px-6">
            <div className="max-w-7xl m-auto text-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    <Section icon={<Users  size={40} />} value='62%' description="dos colaboradores utilizam a plataforma diariamente" />
                    <Section icon={<Rocket size={40} />} value='96%' description="Taxa de resposta nas pesquisas customizadas" />
                    <Section icon={<BookOpenCheck size={40} />} value='54%' description="De ganho de produtividade no onboarding de colaboradores" />
                    <Section icon={<Trophy size={40} />} value='100%' description="Das interações com análise de emoção e sentimento" />
                </div>
            </div>
        </div>
    )
}

interface SectionProps {
    icon: React.ReactNode,
    value: string,
    description: string,
}

function Section({ icon, value, description }: SectionProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-voca-green">
                {icon}
            </div>
            <h2 className="text-4xl text-slate-800 font-bold">{value}</h2>
            <p className="text-slate-600 text-center">{description}</p>
        </div>
    )
}