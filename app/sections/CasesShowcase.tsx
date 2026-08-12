'use client'

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Playfair_Display_SC } from "next/font/google";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cases, PILLARS } from "@/app/casos-de-sucesso/data";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700", "800"], style: ["normal", "italic"], display: "swap" });
const playfairSC = Playfair_Display_SC({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap" });

const featuredSlugs = ["engeform", "credi10-compliance", "sp-engenharia"];

const featuredCases = featuredSlugs.map((slug) => {
    const data = cases.find((c) => c.slug === slug)!;
    return { data, photo: data.photo!, hero: data.metrics[data.homeMetricIndex ?? data.heroMetricIndex ?? 0] };
});

const otherCases = cases.filter((item) => !featuredSlugs.includes(item.slug));
const deckPhotos = otherCases.filter((item) => item.photo).slice(0, 2);
const bubblePhotos = otherCases.filter((item) => item.photo).slice(0, 4);
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
    const selectedColor = selected ? PILLARS[selected.data.pillar].color : "#007980";

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
        <div ref={sectionRef} id="cases" className="relative bg-white py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-52 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-voca-green/30 blur-3xl"
                    style={{ animation: "drift-b 26s ease-in-out infinite" }}
                />
                <div
                    className="absolute -top-24 right-[8%] w-[34rem] h-[34rem] rounded-full blur-3xl"
                    style={{ backgroundColor: "rgba(232,178,61,0.25)", animation: "drift-a 30s ease-in-out infinite" }}
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
                    <p className="text-base sm:text-lg font-bold tracking-widest text-voca-green uppercase">
                        Cases de sucesso
                    </p>
                    <h2 className={cn(playfair.className, "text-2xl sm:text-4xl lg:text-5xl font-normal text-slate-900 leading-tight mt-4")}>
                        Empresas que fazem do{" "}
                        <span className="font-sans font-extrabold text-voca-green">VOCA</span>{" "}
                        uma extensão delas
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-14">
                    {featuredCases.map((item) => (
                        <button
                            key={item.data.slug}
                            onClick={() => setOpenSlug(item.data.slug)}
                            className="group relative h-[480px] sm:h-[520px] w-full rounded-3xl overflow-hidden text-left"
                        >
                            <Image
                                src={item.photo}
                                alt={item.data.company}
                                fill
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black from-15% via-black/85 via-55% to-transparent" />

                            <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
                                <div>
                                    <p className={cn(playfairSC.className, "text-5xl font-bold text-white tracking-tight leading-none drop-shadow-md")}>
                                        {item.hero.value}
                                    </p>
                                    <p className="text-white text-base font-semibold mt-2 max-w-[10rem] leading-snug drop-shadow-md">
                                        {item.hero.label}
                                    </p>
                                </div>
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:bg-voca-green group-hover:text-white">
                                    <ArrowUpRight size={17} />
                                </span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-sm font-normal leading-relaxed line-clamp-2 drop-shadow-sm">
                                    &ldquo;{item.data.quote}&rdquo;
                                </p>
                                <p className="text-white/70 text-[11px] tracking-wide uppercase mt-3">
                                    {item.data.name} · {item.data.company}
                                </p>
                            </div>
                        </button>
                    ))}

                    <Link href="/casos-de-sucesso" className="group relative h-[480px] sm:h-[520px] w-full">
                        {deckPhotos[1] && (
                            <div className="absolute inset-0 origin-bottom rounded-3xl overflow-hidden shadow-lg rotate-[-4deg] scale-[0.92] transition-transform duration-500 ease-out group-hover:rotate-[-7deg] group-hover:scale-[0.93]">
                                <Image
                                    src={deckPhotos[1].photo!}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-voca-green/90" />
                                <div
                                    className="absolute inset-0 opacity-[0.10]"
                                    style={{
                                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                                        backgroundSize: "24px 24px",
                                        animation: "dot-drift 9s linear infinite",
                                    }}
                                />
                            </div>
                        )}

                        {deckPhotos[0] && (
                            <div className="absolute inset-0 origin-bottom rounded-3xl overflow-hidden shadow-lg rotate-[3deg] scale-[0.96] transition-transform duration-500 ease-out group-hover:rotate-[5.5deg] group-hover:scale-[0.97]">
                                <Image
                                    src={deckPhotos[0].photo!}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-voca-green/80" />
                                <div
                                    className="absolute inset-0 opacity-[0.12]"
                                    style={{
                                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                                        backgroundSize: "24px 24px",
                                        animation: "dot-drift 7s linear infinite",
                                    }}
                                />
                            </div>
                        )}

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
                                    {bubblePhotos.map((item, index) => (
                                        <div
                                            key={item.slug}
                                            style={{
                                                marginLeft: index === 0 ? 0 : "-0.85rem",
                                                zIndex: bubblePhotos.length - index,
                                                transitionDelay: `${index * 50}ms`,
                                                "--fan": `${index * 0.28}rem`,
                                            } as CSSProperties}
                                            className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden ring-[3px] ring-voca-green shadow-md transition-transform duration-500 ease-out group-hover:translate-x-[var(--fan)] group-hover:scale-105"
                                        >
                                            <Image src={item.photo!} alt="" fill sizes="44px" className="object-cover" />
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
                <DialogContent className="w-[95vw] max-w-4xl max-h-[88vh] p-0 rounded-3xl border-none flex flex-col overflow-hidden">
                    {selected && (
                        <>
                            <DialogTitle className="sr-only">{selected.data.company}</DialogTitle>

                            <div className="relative h-56 sm:h-72 shrink-0">
                                <Image
                                    src={selected.photo}
                                    alt=""
                                    fill
                                    sizes="90vw"
                                    className="object-cover rounded-t-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent rounded-t-3xl" />
                                <div className="absolute bottom-5 left-6 right-6">
                                    <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
                                        {selected.data.theme}
                                    </span>
                                    <p className="text-3xl sm:text-4xl font-extrabold text-white mt-3">{selected.hero.value}</p>
                                    <p className="text-white/80 text-sm">{selected.hero.label}</p>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-10">
                                <p className={cn(playfair.className, "italic text-xl sm:text-2xl font-bold text-slate-900 leading-snug")}>
                                    &ldquo;{selected.data.quote}&rdquo;
                                </p>
                                <div className="mt-4">
                                    <p className="font-bold text-slate-900">{selected.data.name}</p>
                                    <p className="text-slate-500 text-sm">{selected.data.role} · {selected.data.company}</p>
                                </div>

                                {selected.data.metrics.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                                        {selected.data.metrics.map((metric) => (
                                            <div key={metric.label} className="rounded-xl p-3" style={{ backgroundColor: `${selectedColor}0D` }}>
                                                <p className="text-xl font-extrabold" style={{ color: selectedColor }}>{metric.value}</p>
                                                <p className="text-xs text-slate-500 mt-1">{metric.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {selected.data.objective && (
                                    <>
                                        <p className="text-sm font-bold tracking-widest uppercase mt-8" style={{ color: selectedColor }}>Objetivo</p>
                                        <p className="text-slate-600 mt-2">{selected.data.objective}</p>
                                    </>
                                )}

                                {selected.data.solution && (
                                    <>
                                        <p className="text-sm font-bold tracking-widest uppercase mt-6" style={{ color: selectedColor }}>Solução</p>
                                        <ul className="mt-3 flex flex-col gap-2">
                                            {selected.data.solution.map((point) => (
                                                <li key={point} className="text-sm text-slate-600 flex gap-2">
                                                    <Check size={16} className="shrink-0 mt-0.5" style={{ color: selectedColor }} />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
