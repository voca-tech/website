'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeartHandshakeIcon } from "@/components/ui/heart-handshake";
import { RocketIcon } from "@/components/ui/rocket";
import { ShieldCheckIcon } from "@/components/ui/shield-check";
import { EarthIcon } from "@/components/ui/earth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconHandle = {
    startAnimation: () => void;
    stopAnimation: () => void;
};

const reasons = [
    {
        icon: HeartHandshakeIcon,
        title: "Atendimento humano",
        description: "Sem robôs, sem tickets perdidos: um time de verdade acompanha sua implementação e o seu dia a dia.",
    },
    {
        icon: RocketIcon,
        title: "Implementação assistida",
        description: "Onboarding guiado pela nossa equipe, sem meses de configuração até ver resultado.",
    },
    {
        icon: ShieldCheckIcon,
        title: "Segurança e LGPD",
        description: "Dados protegidos e em conformidade com a legislação brasileira de proteção de dados.",
    },
    {
        icon: EarthIcon,
        title: "Pronto para crescer com você",
        description: "Da operação local à expansão internacional, a plataforma evolui junto com a sua empresa.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<Array<IconHandle | null>>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="relative bg-white py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto text-center">
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">
                    Por que o VOCA
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                    Por que escolher a gente?
                </h2>
                <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                    Tecnologia forte, mas com gente de verdade por trás de cada implementação.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
                    {reasons.map(({ icon: Icon, title, description }, i) => (
                        <div
                            key={title}
                            className={cn(
                                "reason-card group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-voca-green/40 hover:shadow-lg hover:shadow-voca-green/10",
                                visible ? "animate-in fade-in slide-in-from-bottom-6" : "opacity-0"
                            )}
                            style={visible ? { animationDelay: `${i * 120}ms`, animationDuration: "600ms", animationFillMode: "both" } : undefined}
                            onMouseEnter={() => iconRefs.current[i]?.startAnimation()}
                            onMouseLeave={() => iconRefs.current[i]?.stopAnimation()}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-voca-green/10 text-voca-green mb-4 transition-colors duration-300 group-hover:bg-voca-green group-hover:text-white">
                                <Icon ref={(el: IconHandle | null) => { iconRefs.current[i] = el; }} size={22} />
                            </div>
                            <h3 className="font-bold text-slate-900">{title}</h3>
                            <p className="text-sm text-slate-500 mt-2">{description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Link href="/por-que-voca">
                        <Button variant="outline" className="border-voca-green/30 text-voca-green hover:bg-voca-green/5 rounded-md px-6 h-12 text-base font-semibold">
                            Ver comparativo completo
                            <ArrowRight className="ml-2" size={16} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
