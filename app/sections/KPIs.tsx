import { AlarmCheck, HeartPulse, Lightbulb, MessagesSquare } from "lucide-react";

export default function KPIsSection() {
    return (
        <div className="bg-voca-yellow bg-zig-zag">
            <div className="py-16 px-6 max-w-7xl m-auto text-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    <Section icon={<HeartPulse size={32} />} value='+60%' description="dos colaboradores utilizam a plataforma diariamente" />
                    <Section icon={<Lightbulb size={32} />} value='96%' description="Taxa de resposta em pesquisas pulso customizadas" />
                    <Section icon={<MessagesSquare size={32} />} value='50%' description="Onboarding de colaboradores mais rápido e eficiente" />
                    <Section icon={<AlarmCheck size={32} />} value='+1M' description="De leituras de emoção por texto na plataforma" />
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
            <h2 className="text-3xl text-slate-800 font-bold">{value}</h2>
            <p className="text-slate-600 text-center">{description}</p>
        </div>
    )
}