'use client'

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { PhoneScene } from "@/components/PhoneScene";
import { useScrollProgress } from "@/components/useScrollProgress";

const FADE_START = 0.25;
const FADE_END = 0.5;
const TRAVEL_END = 0.45;

export default function HeroSection() {
    const rigRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(rigRef as RefObject<HTMLElement>);
    const [heroOpacity, setHeroOpacity] = useState(1);

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
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6"
                    style={{ opacity: heroOpacity, pointerEvents: heroOpacity > 0.5 ? "auto" : "none" }}
                >
                    <div className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-start animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                            A plataforma de{' '}
                            <span className="relative whitespace-nowrap text-voca-green">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 100 12"
                                    className="absolute left-0 top-full -mt-2 h-3 w-full fill-none stroke-voca-green/60"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M1 8c20-7 60-7 98 1" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                <span className="relative">DHO</span>
                            </span>
                            {' '}completa para gestão, comunicação e inteligência de dados
                        </h1>

                        <p className="text-lg text-slate-500 max-w-lg">
                            Transforme o engajamento dos colaboradores em insights que direcionam as decisões estratégicas do seu negócio.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-2">
                            <Link href="/contact">
                                <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base">
                                    Agendar demonstração
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

                    <div className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-start">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">
                            Inteligência preditiva
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                            <span className="text-slate-900">Turnover não avisa.</span>
                            <br />
                            <span className="text-voca-green">Seus dados, sim.</span>
                        </h2>

                        <p className="text-lg text-slate-500 max-w-lg">
                            Acompanhe o clima da sua empresa em tempo real e aja antes que o talento vá embora.
                        </p>

                        <ul className="flex flex-col gap-2 text-slate-600 text-base">
                            <li>✓ Alertas de risco de saída por colaborador</li>
                            <li>✓ Histórico de clima por equipe e liderança</li>
                            <li>✓ Recomendações automáticas de ação</li>
                        </ul>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-2">
                            <Link href="/contact">
                                <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base">
                                    Ver como funciona
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <PhoneScene progressRef={progress} travelEnd={TRAVEL_END} />
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
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        A plataforma de{' '}
                        <span className="relative whitespace-nowrap text-voca-green">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 100 12"
                                className="absolute left-0 top-full -mt-2 h-3 w-full fill-none stroke-voca-green/60"
                                preserveAspectRatio="none"
                            >
                                <path d="M1 8c20-7 60-7 98 1" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                            <span className="relative">DHO</span>
                        </span>
                        {' '}completa para gestão, comunicação e inteligência de dados
                    </h1>

                    <p className="text-lg text-slate-500 max-w-lg">
                        Transforme o engajamento dos colaboradores em insights que direcionam as decisões estratégicas do seu negócio.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                        <Link href="/contact">
                            <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base">
                                Agendar demonstração
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
