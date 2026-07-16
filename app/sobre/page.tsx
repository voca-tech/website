import Link from "next/link";
import { HeartHandshake, Users, LineChart, ShieldCheck, type LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";

interface Value {
    icon: LucideIcon;
    title: string;
    description: string;
}

const values: Value[] = [
    {
        icon: HeartHandshake,
        title: "Pessoas em primeiro lugar",
        description: "Construímos tecnologia para gestão de pessoas pensando primeiro nas pessoas — não só nos processos.",
    },
    {
        icon: Users,
        title: "Tecnologia com atendimento humano",
        description: "Usamos inteligência artificial para gerar insights, mas quem acompanha sua empresa é sempre um time de verdade.",
    },
    {
        icon: LineChart,
        title: "Dados a serviço de decisões melhores",
        description: "Acreditamos que boas decisões de gestão de pessoas vêm de dados claros, não de achismo.",
    },
    {
        icon: ShieldCheck,
        title: "Segurança e transparência",
        description: "Tratamos os dados que nossos clientes confiam a nós com responsabilidade, em conformidade com a LGPD.",
    },
];

const founders = [
    {
        name: "Ronaldo Palermo",
        role: "CEO e Co-fundador",
        bio: [
            "Executivo comercial do mercado financeiro por mais de 20 anos.",
            "Liderança de equipes multidisciplinares de mais de 200 pessoas.",
            "MBA em Gestão Estratégica de Pessoas.",
            "Empreendedor há 10 anos, na sua 2ª startup de modelo SaaS.",
        ],
    },
    {
        name: "Cristiano Paranhos",
        role: "COO e Co-fundador",
        bio: [
            "Mais de 15 anos de experiência com analytics para B2B.",
            "Gestão de projetos, negócios e desenvolvimento de produtos.",
            "Empreendedor há 15 anos, na sua 2ª startup de modelo SaaS.",
            "Empreendedor Global no IBM SmartCamp, Califórnia.",
        ],
    },
    {
        name: "Thiago Junqueira",
        role: "CTO e Sócio",
        bio: [
            "Engenheiro de dados, desenvolvedor full stack e arquiteto cloud.",
            "Experiência na gestão e excelência de times ágeis.",
            "Formação em Engenharia de Controle e Automação.",
            "Atua há 5 anos com projetos de tecnologia internacionais.",
        ],
    },
];

function initials(name: string) {
    return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

export default function SobrePage() {
    return (
        <div className="relative bg-white">
            <div className="relative py-16 sm:py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.3]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Sobre a VOCA</p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                        Cuidamos de pessoas para que elas possam cuidar das empresas
                    </h1>
                    <p className="text-lg text-slate-500 mt-4">
                        A VOCA nasceu para dar voz aos colaboradores e, ao mesmo tempo, entregar aos times de RH e liderança os dados que precisam para agir antes que os problemas cresçam.
                    </p>
                </div>
            </div>

            <div className="bg-voca-green py-14 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                        O <span className="font-bold text-white">ERP</span> organizou todos os processos da empresa.
                        O <span className="font-bold text-white">CRM</span> organizou a jornada dos clientes.
                    </p>
                    <p className="text-xl sm:text-2xl font-extrabold text-white mt-3">
                        O VOCA veio para organizar as pessoas da empresa.
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 py-16 sm:py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">No que acreditamos</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            Os princípios por trás da plataforma
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                        {values.map((value) => (
                            <div key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-voca-green/10 text-voca-green mb-4">
                                    <value.icon size={22} />
                                </div>
                                <h3 className="font-bold text-slate-900">{value.title}</h3>
                                <p className="text-sm text-slate-500 mt-2">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Quem faz</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            Time executivo
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        {founders.map((founder) => (
                            <div key={founder.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <Avatar className="h-14 w-14 mb-4">
                                    <AvatarFallback className="text-voca-green font-bold bg-voca-green/10">
                                        {initials(founder.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-slate-900">{founder.name}</h3>
                                <p className="text-sm text-voca-green font-semibold">{founder.role}</p>
                                <ul className="mt-3 flex flex-col gap-1.5">
                                    {founder.bio.map((line) => (
                                        <li key={line} className="text-xs text-slate-500">{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pb-16 px-6">
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
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
