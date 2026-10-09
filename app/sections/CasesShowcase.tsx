'use client'

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Playfair_Display_SC } from "next/font/google";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CaseCard } from "@/components/cases/CaseCard";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { cases } from "@/app/casos-de-sucesso/data";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700", "800"], style: ["normal", "italic"], display: "swap" });
const playfairSC = Playfair_Display_SC({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap" });

const featuredSlugs = ["grant-thornton", "credi10-compliance", "sp-engenharia"];

const featuredCases = featuredSlugs.map((slug) => {
    const data = cases.find((c) => c.slug === slug)!;
    return { data, hero: data.metrics[data.homeMetricIndex ?? data.heroMetricIndex ?? 0] };
});

const otherCases = cases.filter((item) => !featuredSlugs.includes(item.slug));
const bubbleAvatars = otherCases
    .filter((item) => item.avatar)
    .filter((item, index, list) => list.findIndex((other) => other.avatar === item.avatar) === index)
    .slice(0, 4);
const otherThemes = Array.from(new Set(otherCases.map((item) => item.theme)));

export default function CasesShowcase() {
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const [themeIndex, setThemeIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (otherThemes.length < 2) return;
        const id = setInterval(() => {
            setThemeIndex((current) => (current + 1) % otherThemes.length);
        }, 2600);
        return () => clearInterval(id);
    }, []);

    const selected = openSlug ? featuredCases.find((c) => c.data.slug === openSlug) ?? null : null;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.from(revealRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} id="cases" className="relative bg-white py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-voca-green/18 blur-2xl" />
                <div
                    className="absolute -top-16 right-[8%] w-[22rem] h-[22rem] rounded-full blur-2xl"
                    style={{ backgroundColor: "rgba(232,178,61,0.14)" }}
                />
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={340}
                    height={419}
                    aria-hidden="true"
                    className="absolute left-0 bottom-0 w-48 sm:w-64 h-auto opacity-[0.18] select-none"
                />
                <div className="absolute inset-x-0 top-0 h-56 sm:h-72 bg-gradient-to-b from-white via-white/60 to-transparent" />
            </div>

            <div ref={revealRef} className="relative max-w-6xl mx-auto">
                <div>
                    <h2 className={cn(playfair.className, "voca-title text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight")}>
                        Empresas que fazem do{" "}
                        <span className="font-sans font-extrabold text-voca-green">VOCA</span>{" "}
                        uma extensão delas
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-14">
                    {featuredCases.map((item) => (
                        <CaseCard
                            key={item.data.slug}
                            item={item.data}
                            metric={item.hero}
                            onClick={() => setOpenSlug(item.data.slug)}
                            className="min-h-[440px] sm:min-h-[480px] rounded-3xl"
                        />
                    ))}

                    <Link href="/casos-de-sucesso" className="group relative h-[440px] sm:h-[480px] w-full">
                        <div className="absolute inset-0 origin-bottom rounded-3xl overflow-hidden shadow-lg rotate-[-4deg] scale-[0.92] bg-[#01585d] transition-transform duration-500 ease-out group-hover:rotate-[-7deg] group-hover:scale-[0.93]">
                            <div
                                className="absolute inset-0 opacity-[0.10]"
                                style={{
                                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                    animation: "dot-drift 9s linear infinite",
                                }}
                            />
                        </div>

                        <div className="absolute inset-0 origin-bottom rounded-3xl overflow-hidden shadow-lg rotate-[3deg] scale-[0.96] bg-voca-green/80 transition-transform duration-500 ease-out group-hover:rotate-[5.5deg] group-hover:scale-[0.97]">
                            <div
                                className="absolute inset-0 opacity-[0.12]"
                                style={{
                                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                    animation: "dot-drift 7s linear infinite",
                                }}
                            />
                        </div>

                        <div className="absolute inset-0 flex flex-col justify-between rounded-3xl overflow-hidden bg-voca-green p-7 shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-voca-green/40">
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(155deg, rgba(255,255,255,0.14) 0%, transparent 42%, rgba(1,46,49,0.5) 100%)",
                                }}
                            />
                            <div
                                className="absolute inset-0 opacity-[0.14] pointer-events-none"
                                style={{
                                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                    animation: "dot-drift 6s linear infinite",
                                }}
                            />
                            <Image
                                src="/voca-symbol.png"
                                alt=""
                                width={220}
                                height={270}
                                aria-hidden="true"
                                className="absolute -right-12 top-1/3 w-44 h-auto opacity-[0.09] brightness-0 invert select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6"
                            />
                            <div
                                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150"
                                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                            />

                            <div className="relative flex flex-col gap-4">
                                <span className="self-start rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                                    Mais histórias
                                </span>

                                <div className="flex items-center">
                                    {bubbleAvatars.map((item, index) => (
                                        <div
                                            key={item.slug}
                                            style={{
                                                marginLeft: index === 0 ? 0 : "-0.85rem",
                                                zIndex: bubbleAvatars.length - index,
                                                transitionDelay: `${index * 50}ms`,
                                                "--fan": `${index * 0.28}rem`,
                                            } as CSSProperties}
                                            className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden ring-[3px] ring-voca-green shadow-md transition-transform duration-500 ease-out group-hover:translate-x-[var(--fan)] group-hover:scale-105"
                                        >
                                            <Image src={item.avatar!} alt="" fill sizes="44px" className="object-cover object-top" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <p className={cn(playfairSC.className, "text-6xl font-bold text-white leading-none")}>
                                    +{otherCases.length}
                                </p>
                                <p className="text-white text-lg font-semibold mt-2 leading-snug">
                                    cases reais para explorar
                                </p>

                                <div className="h-5 mt-5 overflow-hidden">
                                    <p
                                        key={themeIndex}
                                        className="text-white/70 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-3 duration-500 truncate"
                                    >
                                        {otherThemes[themeIndex]}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/20">
                                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-voca-green overflow-hidden">
                                        <ArrowRight
                                            size={19}
                                            className="transition-transform duration-500 ease-out group-hover:translate-x-10"
                                        />
                                        <ArrowRight
                                            size={19}
                                            className="absolute -translate-x-10 transition-transform duration-500 ease-out group-hover:translate-x-0"
                                        />
                                    </span>
                                    <span className="text-white font-bold">Ver todos os cases</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <Dialog open={!!openSlug} onOpenChange={(open) => !open && setOpenSlug(null)}>
                <DialogContent className="w-[95vw] max-w-4xl max-h-[88vh] p-0 rounded-3xl flex flex-col overflow-hidden">
                    {selected && <CaseDetail item={selected.data} heroMetric={selected.hero} />}
                </DialogContent>
            </Dialog>
        </div>
    );
}
