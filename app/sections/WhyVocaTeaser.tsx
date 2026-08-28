'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { reasons, whyVocaStats, type AnimatedIconHandle } from "@/app/por-que-voca/data";

const highlightStat = whyVocaStats[2];

export default function WhyVocaTeaser() {
    const iconRefs = useRef<Array<AnimatedIconHandle | null>>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                revealRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 30%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div data-nav-dark ref={sectionRef} className="relative py-16 sm:py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg, #012e31 0%, #016b72 100%)" }}>
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={420}
                    height={517}
                    aria-hidden="true"
                    className="absolute -right-16 -bottom-20 w-72 sm:w-96 h-auto opacity-[0.06] brightness-0 invert select-none"
                />
                <div
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-teal-300/10 blur-3xl"
                    style={{ animation: "drift-b 26s ease-in-out infinite" }}
                />
            </div>

            <div ref={revealRef} className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <Image
                        src="/voca-symbol.png"
                        alt="VOCA"
                        width={90}
                        height={111}
                        className="w-10 h-auto mx-auto mb-6 brightness-0 invert"
                    />
                    <h2 className="voca-title-invert text-3xl sm:text-4xl font-extrabold leading-tight">
                        Tecnologia forte. Time de verdade.
                    </h2>
                    <p className="text-lg text-white/70 mt-4">
                        A tecnologia é só metade da equação. A outra metade é um time que se importa com o que acontece depois da implementação.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    {reasons.map((reason, i) => {
                        const Icon = reason.icon;
                        return (
                            <div
                                key={reason.title}
                                className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-5 transition-colors duration-300 hover:bg-white/[0.1]"
                                onMouseEnter={() => iconRefs.current[i]?.startAnimation()}
                                onMouseLeave={() => iconRefs.current[i]?.stopAnimation()}
                            >
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-full mb-4"
                                    style={{ backgroundColor: `${reason.color}33`, color: "#ffffff" }}
                                >
                                    <Icon ref={(el) => { iconRefs.current[i] = el; }} size={18} />
                                </div>
                                <h3 className="font-bold text-white text-base">{reason.title}</h3>
                                <p className="text-white/70 text-sm mt-2 leading-relaxed">{reason.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div
                    className="relative mt-10 rounded-[2rem] border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 sm:gap-10"
                >
                    <div className="flex items-baseline gap-1 shrink-0">
                        <span className="text-5xl sm:text-6xl font-extrabold text-white">{highlightStat.value}</span>
                        <span className="text-3xl sm:text-4xl font-extrabold text-teal-300">{highlightStat.suffix}</span>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-white/80 text-lg leading-relaxed">{highlightStat.label}</p>
                        {highlightStat.source && <p className="text-white/40 text-sm mt-2">Fonte: {highlightStat.source}</p>}
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
                    <Link href="/por-que-voca">
                        <Button
                            variant="outline"
                            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-md px-6 h-12 text-base font-semibold"
                        >
                            Ver por que o VOCA
                            <ArrowRight className="ml-2" size={16} />
                        </Button>
                    </Link>
                    <Link href="/roi">
                        <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                            <Calculator className="mr-2" size={16} />
                            Calcular meu ROI
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
