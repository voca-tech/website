'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Rocket, BookOpenCheck, Trophy, ArrowRight, type LucideIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { quotes } from "@/lib/testimonials";

const stats: { icon: LucideIcon; value: string; description: string }[] = [
    { icon: Users, value: '62%', description: "dos colaboradores utilizam a plataforma diariamente" },
    { icon: Rocket, value: '96%', description: "de engajamento nas pesquisas customizadas" },
    { icon: BookOpenCheck, value: '54%', description: "de ganho de produtividade no onboarding de colaboradores" },
    { icon: Trophy, value: '100%', description: "das interações com análise de emoção e sentimento" },
];

function parseStatValue(raw: string) {
    const isPercent = raw.endsWith('%');
    const digits = raw.replace(/[.%]/g, '');
    const target = parseInt(digits, 10) || 0;
    return { target, suffix: isPercent ? '%' : '' };
}

export default function SocialProofSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const statRefs = useRef<Array<HTMLHeadingElement | null>>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".kpi-item",
                { opacity: 0, y: 70 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 20%",
                        scrub: 0.8,
                        onUpdate: (self) => {
                            stats.forEach((stat, i) => {
                                const el = statRefs.current[i];
                                if (!el) return;
                                const { target, suffix } = parseStatValue(stat.value);
                                el.textContent = Math.round(self.progress * target) + suffix;
                            });
                        },
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative bg-white py-16 sm:py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div
                    className="absolute -top-32 right-[8%] w-[30rem] h-[30rem] rounded-full bg-voca-green/10 blur-3xl"
                    style={{ animation: "drift-b 26s ease-in-out infinite" }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Clientes &amp; Parceiros</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                        Empresas e instituições que confiam no VOCA
                    </h2>
                    <p className="text-slate-500 mt-3">
                        De indústrias a instituições de ensino, times de RH usam o VOCA pra transformar comunicação em dados.
                    </p>
                </div>

                <div className="mt-10">
                    <ClientLogoMarquee
                        caption={
                            <>
                                <span className="font-medium text-slate-500">Comunicação, cultura e dados,</span>{" "}
                                <span className="font-bold text-voca-green">sob a mesma plataforma.</span>
                            </>
                        }
                    />
                </div>

                <div
                    className="relative mt-14 rounded-[2.5rem] border border-white/60 bg-white/70 overflow-hidden"
                    style={{
                        backdropFilter: "blur(28px)",
                        WebkitBackdropFilter: "blur(28px)",
                        boxShadow: "0 30px 70px -25px rgba(0,121,128,0.45), 0 15px 45px -15px rgba(0,121,128,0.3), 0 4px 20px rgba(15,23,42,0.06)",
                    }}
                >
                    <div
                        className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 p-8 sm:p-10">
                        {quotes.map((q) => (
                            <Link
                                key={q.name}
                                href={`/casos-de-sucesso#${q.caseSlug}`}
                                className="kpi-item group flex flex-col gap-4 rounded-2xl bg-white/60 border border-white/70 p-6 transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:-translate-y-1"
                            >
                                <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{q.text}&rdquo;</p>
                                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/70">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                            <AvatarImage src={q.avatar} />
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{q.name}</p>
                                            <p className="text-slate-500 text-xs">{q.role}</p>
                                        </div>
                                    </div>
                                    {q.logo && (
                                        <Image
                                            src={q.logo}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="object-contain grayscale opacity-70"
                                        />
                                    )}
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-voca-green">
                                    Ver case completo
                                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="relative h-px mx-8 sm:mx-10 bg-slate-200/70" />

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 text-slate-800">
                        {stats.map(({ icon: Icon, value, description }, i) => (
                            <div key={value + description} className="kpi-item flex flex-col items-center gap-3 py-8 px-8">
                                <div className="text-voca-green">
                                    <Icon size={40} />
                                </div>
                                <h3
                                    ref={(el) => { statRefs.current[i] = el; }}
                                    className="text-4xl text-slate-900 font-extrabold"
                                >
                                    0{parseStatValue(value).suffix}
                                </h3>
                                <p className="text-slate-500 text-center">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
