'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpenCheck, Rocket, Trophy, Users } from "lucide-react";

export default function KPIsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".kpi-item", {
                opacity: 0,
                y: 70,
                duration: 1,
                stagger: 0.25,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative bg-white py-16 sm:py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={800}
                    height={983}
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-64 h-auto opacity-[0.06]"
                />
            </div>

            <div className="relative max-w-7xl m-auto text-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-200">
                    <Section icon={<Users size={40} />} value='62%' description="dos colaboradores utilizam a plataforma diariamente" />
                    <Section icon={<Rocket size={40} />} value='96%' description="de engajamento nas pesquisas customizadas" />
                    <Section icon={<BookOpenCheck size={40} />} value='54%' description="de ganho de produtividade no onboarding de colaboradores" />
                    <Section icon={<Trophy size={40} />} value='100%' description="das interações com análise de emoção e sentimento" />
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
        <div className="kpi-item flex flex-col items-center gap-4 py-8 lg:py-0 px-8">
            <div className="text-voca-green">
                {icon}
            </div>
            <h2 className="text-4xl text-slate-900 font-extrabold">{value}</h2>
            <p className="text-slate-500 text-center">{description}</p>
        </div>
    )
}
