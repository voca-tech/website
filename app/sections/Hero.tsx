'use client'

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { DeviceScene } from "@/components/DeviceScene";
import { useScrollProgress } from "@/components/useScrollProgress";
import { useIsDesktop } from "@/components/useIsDesktop";

const FADE_START = 0.25;
const FADE_END = 0.5;

export default function HeroSection() {
    const rigRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(rigRef as RefObject<HTMLElement>);
    const [heroOpacity, setHeroOpacity] = useState(1);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        let raf: number;
        function tick() {
            const p = progress.current;
            const t = 1 - Math.min(1, Math.max(0, (p - FADE_START) / (FADE_END - FADE_START)));
            setHeroOpacity(t);
            raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [progress]);

    const turnoverOpacity = 1 - heroOpacity;

    return (
        <div ref={rigRef} className="relative bg-white lg:h-[150vh]">
            <div className="hidden lg:block sticky top-0 h-screen w-full overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div
                        className="absolute -top-24 -right-24 w-[36rem] h-[36rem] bg-voca-green/20 rounded-full blur-3xl"
                        style={{ animation: "drift-a 22s ease-in-out infinite" }}
                    />
                    <div
                        className="absolute -bottom-32 -left-24 w-[32rem] h-[32rem] bg-teal-300/25 rounded-full blur-3xl"
                        style={{ animation: "drift-b 26s ease-in-out infinite" }}
                    />
                    <div
                        className="absolute top-1/3 left-1/2 w-[24rem] h-[24rem] bg-voca-yellow/20 rounded-full blur-3xl"
                        style={{ animation: "drift-c 30s ease-in-out infinite" }}
                    />
                </div>

                <div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    style={{
                        opacity: turnoverOpacity,
                        background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)",
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <Image
                        src="/illustrations/dashboardsPreview.png"
                        alt=""
                        width={658}
                        height={640}
                        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[42rem] h-auto opacity-[0.14]"
                    />
                </div>

                <div
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6"
                    style={{ opacity: heroOpacity, pointerEvents: heroOpacity > 0.5 ? "auto" : "none" }}
                >
                    <div className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-start animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <p className="text-base text-slate-500">
                            <span className="text-xl font-extrabold tracking-tight text-voca-green">DHO</span>
                            {' '}na palma da mão
                            <span className="mx-2.5 text-slate-300">·</span>
                            21 funcionalidades
                        </p>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                            Centralize a jornada na{' '}
                            <span className="relative whitespace-nowrap text-voca-green">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 100 12"
                                    className="absolute left-0 top-full -mt-2 h-3 w-full fill-none stroke-voca-green/60"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M1 8c20-7 60-7 98 1" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                <span className="relative">mesma plataforma</span>
                            </span>
                            : pessoas mais conectadas, engajadas e produtivas.
                        </h1>

                        <p className="text-lg text-slate-500 max-w-lg">
                            Transforme insights de pessoas em resultados do negócio. Inteligência nos dados, atendimento ágil por humanos.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-2">
                            <Link href="/contact">
                                <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base">
                                    VOCA em ação
                                </Button>
                            </Link>
                            <WhatsappLink variant="text" />
                        </div>
                    </div>

                    <div className="hidden lg:block" />
                </div>

                <div
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6"
                    style={{ opacity: turnoverOpacity, pointerEvents: turnoverOpacity > 0.5 ? "auto" : "none" }}
                >
                    <div className="hidden lg:block" />

                    <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-start max-w-md">
                        <p className="text-sm font-bold tracking-widest text-teal-200 uppercase">
                            Inteligência preditiva
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                            <span className="text-white">Turnover não avisa.</span>
                            <br />
                            <span className="text-teal-300">Seus dados, sim.</span>
                        </h2>

                        <p className="text-base text-white/70">
                            Um &ldquo;Waze&rdquo; para o RH e lideranças: dashboards em tempo real com indicadores de clima, engajamento, comunicação, capacitação e performance.
                        </p>

                        <div className="w-full grid grid-cols-2 gap-3 mt-1">
                            <div className="rounded-2xl bg-white shadow-lg p-4 text-left">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Engajamento</p>
                                <div className="flex items-baseline gap-1.5 mt-1">
                                    <span className="text-2xl font-extrabold text-slate-900">96%</span>
                                    <span className="text-[11px] font-bold text-voca-green">▲ 8%</span>
                                </div>
                                <div className="relative h-9 w-full mt-2 rounded-md overflow-hidden">
                                    <Image src="/illustrations/chart-trend.png" alt="" fill className="object-cover" />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white shadow-lg p-4 text-left">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Nota de clima</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-2xl font-extrabold text-slate-900">8.5</span>
                                    <span className="text-[11px] font-bold text-slate-400">/10</span>
                                </div>
                                <div className="h-9 flex items-center mt-2">
                                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                        <div className="h-full rounded-full bg-voca-green" style={{ width: "85%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-4 flex items-center justify-between gap-4 text-left">
                            <div>
                                <p className="text-[10px] font-bold text-white/50 uppercase tracking-wide">Performance · engajamento</p>
                                <p className="text-sm text-white mt-1 leading-snug">
                                    Uso diário da plataforma chega a <span className="font-extrabold">62%</span> dos colaboradores
                                </p>
                            </div>
                            <div className="relative h-10 w-20 shrink-0 rounded-md overflow-hidden bg-white">
                                <Image src="/illustrations/chart-dots.png" alt="" fill className="object-cover" />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-1">
                            <Link href="/contact">
                                <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                    Ver como funciona
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 pointer-events-none hidden lg:block z-10">
                    {isDesktop && <DeviceScene progressRef={progress} />}
                </div>
            </div>

            <div className="lg:hidden relative overflow-hidden px-6 py-16">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div
                        className="absolute -top-16 -right-16 w-72 h-72 bg-voca-green/20 rounded-full blur-3xl"
                        style={{ animation: "drift-a 22s ease-in-out infinite" }}
                    />
                    <div
                        className="absolute -bottom-20 -left-16 w-64 h-64 bg-teal-300/25 rounded-full blur-3xl"
                        style={{ animation: "drift-b 26s ease-in-out infinite" }}
                    />
                </div>

                <div className="relative flex flex-col items-center text-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-base text-slate-500">
                        <span className="text-xl font-extrabold tracking-tight text-voca-green">DHO</span>
                        {' '}na palma da mão
                        <span className="mx-2.5 text-slate-300">·</span>
                        21 funcionalidades
                    </p>

                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        Centralize a jornada na{' '}
                        <span className="relative whitespace-nowrap text-voca-green">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 100 12"
                                className="absolute left-0 top-full -mt-2 h-3 w-full fill-none stroke-voca-green/60"
                                preserveAspectRatio="none"
                            >
                                <path d="M1 8c20-7 60-7 98 1" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                            <span className="relative">mesma plataforma</span>
                        </span>
                        : pessoas mais conectadas, engajadas e produtivas.
                    </h1>

                    <p className="text-lg text-slate-500 max-w-lg">
                        Transforme insights de pessoas em resultados do negócio. Inteligência nos dados, atendimento ágil por humanos.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                        <Link href="/contact">
                            <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base">
                                VOCA em ação
                            </Button>
                        </Link>
                        <WhatsappLink variant="text" />
                    </div>

                    <div className="relative mt-4 w-full max-w-[230px]">
                        <div className="relative rounded-[2.25rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden aspect-[618/1294]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-b-xl z-10" />
                            <Image
                                src="/screens/hero.png"
                                alt="Tela do aplicativo VOCA"
                                fill
                                sizes="230px"
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
