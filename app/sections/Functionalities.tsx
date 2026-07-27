'use client'

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smile, MessageSquare, BarChart3, Users, GraduationCap, Award, ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Feature {
    name: string;
    color: string;
    icon: LucideIcon;
}

const features: Feature[] = [
    { name: "Termômetro de Humor", color: "#47ad7f", icon: Smile },
    { name: "Voz para os Colaboradores", color: "#007980", icon: MessageSquare },
    { name: "Pesquisas em Tempo Real", color: "#c77924", icon: BarChart3 },
    { name: "Rede Social Corporativa", color: "#798f4f", icon: Users },
    { name: "Treinamentos e Gamificação", color: "#85568a", icon: GraduationCap },
    { name: "Avaliação de Desempenho", color: "#5f7480", icon: Award },
];

export default function Functionalities() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".feature-chip", {
                opacity: 0,
                y: 16,
                duration: 0.5,
                stagger: 0.06,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="functionalities" ref={sectionRef} className="relative bg-white py-16 sm:py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-4xl mx-auto text-center">
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Funcionalidades</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                    18 funcionalidades, 1 sistema só
                </h2>
                <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                    Da comunicação do dia a dia até os dados que orientam suas decisões, tudo em uma plataforma.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-10">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="feature-chip flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
                        >
                            <span
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                                style={{ backgroundColor: `${feature.color}1A`, color: feature.color }}
                            >
                                <feature.icon size={14} />
                            </span>
                            <span className="text-sm font-medium text-slate-700">{feature.name}</span>
                        </div>
                    ))}
                    <Link
                        href="/produto"
                        className="feature-chip flex items-center gap-1 rounded-full bg-voca-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-voca-green/90"
                    >
                        +12 mais
                    </Link>
                </div>

                <div className="mt-10">
                    <Link href="/produto">
                        <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base font-semibold">
                            Ver produto completo
                            <ArrowRight className="ml-2" size={16} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
