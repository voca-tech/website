'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { complianceBadges } from "@/app/seguranca/data";

export default function ComplianceSecurity() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 0.8,
                },
            });
            tl.fromTo(
                ".compliance-row",
                { opacity: 0, x: -12 },
                { opacity: 1, x: 0, stagger: 0.15, ease: "none" }
            ).fromTo(
                ".compliance-stamp",
                { opacity: 0, scale: 0.6, borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.25)" },
                { opacity: 1, scale: 1, borderColor: "#2dd4bf", color: "#2dd4bf", stagger: 0.15, ease: "none" },
                "-=0.5"
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative py-20 sm:py-28 px-6 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1800&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            />
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(115deg, rgba(1,20,22,0.94) 30%, rgba(1,46,49,0.86) 55%, rgba(1,70,74,0.55) 100%)" }}
            />
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
            />
            <div
                className="absolute -bottom-24 -left-20 w-[26rem] h-[26rem] rounded-full bg-teal-300/10 blur-3xl pointer-events-none"
                style={{ animation: "drift-a 28s ease-in-out infinite" }}
            />

            <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                        Segurança & Compliance
                    </span>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mt-5">
                        Segurança não é detalhe. É a base de tudo.
                    </h2>
                    <p className="text-xl text-white/70 mt-6 max-w-lg">
                        Dados protegidos, processos auditáveis e ferramentas que apoiam o RH na gestão de riscos, inclusive os psicossociais, exigidos pela NR-1.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link href="/seguranca">
                            <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                Ver segurança e compliance
                                <ArrowRight className="ml-2" size={16} />
                            </Button>
                        </Link>
                        <Link href="/seguranca#nr1">
                            <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-md px-6 h-12 text-base font-semibold">
                                <MessageCircle className="mr-2" size={16} />
                                Falar sobre NR-1
                            </Button>
                        </Link>
                    </div>
                </div>

                <div
                    className="rounded-[1.75rem] border border-white/15 bg-white/[0.07] shadow-2xl"
                    style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
                >
                    <div className="flex items-center justify-between px-6 sm:px-7 py-5 rounded-t-[1.75rem] bg-white/[0.05] border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck size={20} className="text-teal-300" />
                            <p className="font-bold text-white text-base">Conformidade VOCA</p>
                        </div>
                        <span className="text-xs font-bold text-teal-300 uppercase tracking-wide">Em dia</span>
                    </div>

                    <div>
                        {complianceBadges.map((feature, i) => {
                            const Icon = feature.icon;
                            const isLast = i === complianceBadges.length - 1;
                            return (
                                <div
                                    key={feature.title}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={cn(
                                        "compliance-row relative px-6 sm:px-7 py-5 border-b border-white/10 last:border-b-0",
                                        isLast && "rounded-b-[1.75rem]"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: feature.color }}
                                        >
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-white text-lg leading-snug">{feature.title}</p>
                                        </div>

                                        <div className="compliance-stamp relative shrink-0 flex h-11 w-11 items-center justify-center rounded-full border-2">
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                    </div>

                                    <div
                                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                                        style={{ gridTemplateRows: hoveredIndex === i ? "1fr" : "0fr" }}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-white/70 leading-relaxed pl-[3.75rem] pt-3">
                                                {feature.short}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
