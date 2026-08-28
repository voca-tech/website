'use client'

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { DeviceScene } from "@/components/DeviceScene";
import { useScrollProgress } from "@/components/useScrollProgress";
import { useIsDesktop } from "@/components/useIsDesktop";
import { getLenisInstance } from "@/lib/lenis";

const FADE_START = 0.16;
const FADE_END = 0.46;

const PHONE_TRAVEL_END = 0.44;

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const BRAND_GRADIENT = "linear-gradient(100deg, #0d9a9f 0%, #007980 100%)";

function easeInOutCubic(value: number) {
    return value < 0.5 ? 4 * value ** 3 : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function CountUp({ value, decimals = 0, active, duration = 1600 }: {
    value: number;
    decimals?: number;
    active: boolean;
    duration?: number;
}) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!active) {
            setDisplay(0);
            return;
        }

        let raf = 0;
        const start = performance.now();

        function tick(now: number) {
            const t = Math.min(1, (now - start) / duration);
            setDisplay(value * (1 - Math.pow(1 - t, 4)));
            if (t < 1) raf = requestAnimationFrame(tick);
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, value, duration]);

    return <>{display.toFixed(decimals)}</>;
}

function Sparkline({ active }: { active: boolean }) {
    const line = "M2 34 L14 29 L26 31 L38 21 L50 24 L62 13 L74 15 L86 4";

    return (
        <svg viewBox="0 0 88 38" preserveAspectRatio="none" fill="none" className="h-full w-full">
            <defs>
                <linearGradient id="hero-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#007980" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#007980" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d={`${line} L86 38 L2 38 Z`}
                fill="url(#hero-spark)"
                style={{
                    opacity: active ? 1 : 0,
                    transition: `opacity 900ms ease-out 600ms`,
                }}
            />
            <path
                d={line}
                stroke="#007980"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                    strokeDasharray: 1,
                    strokeDashoffset: active ? 0 : 1,
                    transition: `stroke-dashoffset 1400ms ${EASE_OUT} 200ms`,
                }}
            />
        </svg>
    );
}

export default function HeroSection() {
    const rigRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(rigRef as RefObject<HTMLElement>);
    const [heroOpacity, setHeroOpacity] = useState(1);
    const [actTwo, setActTwo] = useState(false);
    const isDesktop = useIsDesktop();
    const mobileDeviceRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf: number;

        function tick() {
            const p = progress.current;
            const linear = 1 - Math.min(1, Math.max(0, (p - FADE_START) / (FADE_END - FADE_START)));
            const eased = easeInOutCubic(linear);

            setHeroOpacity((prev) => (Math.abs(prev - eased) < 0.002 ? prev : eased));
            setActTwo((prev) => {
                const turnover = 1 - eased;
                if (!prev && turnover > 0.55) return true;
                if (prev && turnover < 0.15) return false;
                return prev;
            });

            if (glowRef.current) {
                const travel = Math.min(1, p / PHONE_TRAVEL_END);
                glowRef.current.style.transform = `translate3d(${(travel * 42).toFixed(1)}vw, 0, 0) scale(${(1 - travel * 0.3).toFixed(3)})`;
                glowRef.current.style.opacity = (1 - travel * 0.85).toFixed(3);
            }

            raf = requestAnimationFrame(tick);
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [progress]);

    useEffect(() => {
        const element = mobileDeviceRef.current;
        if (!element) return;

        let raf = 0;

        function update() {
            raf = 0;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            if (!rect.height) return;

            const center = rect.top + rect.height / 2;
            const offset = (window.innerHeight / 2 - center) / (window.innerHeight / 2);
            const t = Math.max(-1, Math.min(1, offset));

            element.style.transform =
                `perspective(1400px) rotateX(${(t * 6).toFixed(2)}deg) rotateY(${(t * -4).toFixed(2)}deg) translateY(${(t * -14).toFixed(1)}px)`;
        }

        function onScroll() {
            if (!raf) raf = requestAnimationFrame(update);
        }

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const scrollToVideo = useCallback(() => {
        const target = document.getElementById("video");
        if (!target) return;

        const lenis = getLenisInstance();
        if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const turnoverOpacity = 1 - heroOpacity;

    const enter = (delay: number) => ({
        animationDelay: `${delay}ms`,
        animationFillMode: "both" as const,
    });

    return (
        <div ref={rigRef} className="relative bg-white lg:h-[190vh]">
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
                        ref={glowRef}
                        className="absolute top-1/2 left-[52%] h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-voca-green/25 blur-[100px] will-change-transform"
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

                    data-nav-dark={actTwo ? "" : undefined}
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
                    <div className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-start">
                        <p
                            className="text-base text-slate-500 animate-in fade-in slide-in-from-bottom-3 duration-700"
                            style={enter(80)}
                        >
                            <span className="text-xl font-extrabold tracking-tight text-voca-green">DHO</span>
                            {' '}na palma da mão
                            <span className="mx-2.5 text-slate-300">·</span>
                            21 funcionalidades
                        </p>

                        <h1
                            className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
                            style={enter(200)}
                        >
                            Centralize a jornada na{' '}
                            <span className="relative whitespace-nowrap text-voca-green">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 100 12"
                                    className="absolute left-0 top-full -mt-2 h-3 w-full fill-none stroke-voca-green/60"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M1 8c20-7 60-7 98 1"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        pathLength={1}
                                        style={{
                                            strokeDasharray: 1,
                                            animation: `hero-underline 900ms ${EASE_OUT} 900ms both`,
                                        }}
                                    />
                                </svg>
                                <span className="relative">mesma plataforma</span>
                            </span>
                            : pessoas mais conectadas, engajadas e produtivas.
                        </h1>

                        <p
                            className="text-lg text-slate-500 max-w-lg animate-in fade-in slide-in-from-bottom-3 duration-700"
                            style={enter(340)}
                        >
                            Transforme insights de pessoas em resultados do negócio. Inteligência nos dados, atendimento ágil por humanos.
                        </p>

                        <div
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-2 animate-in fade-in slide-in-from-bottom-3 duration-700"
                            style={enter(460)}
                        >
                            <Button
                                onClick={scrollToVideo}
                                className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base"
                            >
                                VOCA em ação
                            </Button>
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
                        <span className="block overflow-hidden pb-1 -mb-1">
                            <span
                                className="block text-sm font-bold tracking-widest text-teal-200 uppercase"
                                style={{
                                    transform: actTwo ? "translateY(0)" : "translateY(115%)",
                                    transition: `transform 800ms ${EASE_OUT}`,
                                }}
                            >
                                Inteligência preditiva
                            </span>
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                            <span className="block overflow-hidden pb-1.5 -mb-1.5">
                                <span
                                    className="block text-white"
                                    style={{
                                        transform: actTwo ? "translateY(0)" : "translateY(115%)",
                                        transition: `transform 900ms ${EASE_OUT} 110ms`,
                                    }}
                                >
                                    Turnover não avisa.
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-1.5 -mb-1.5">
                                <span
                                    className="block text-teal-300"
                                    style={{
                                        transform: actTwo ? "translateY(0)" : "translateY(115%)",
                                        transition: `transform 900ms ${EASE_OUT} 230ms`,
                                    }}
                                >
                                    Seus dados, sim.
                                </span>
                            </span>
                        </h2>

                        <p className="text-base text-white/70">
                            Um &ldquo;Waze&rdquo; para o RH e lideranças: dashboards em tempo real com indicadores de clima, engajamento, comunicação, capacitação e performance.
                        </p>

                        <div className="w-full grid grid-cols-2 gap-3 mt-1">
                            <div
                                className="rounded-2xl border border-white/50 bg-white/75 p-4 text-left shadow-xl backdrop-blur-xl backdrop-saturate-150"
                                style={{
                                    opacity: actTwo ? 1 : 0,
                                    transform: actTwo ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                                    transition: `opacity 700ms ${EASE_OUT} 60ms, transform 700ms ${EASE_OUT} 60ms`,
                                }}
                            >
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Engajamento</p>
                                <div className="flex items-baseline gap-1.5 mt-1">
                                    <span className="voca-title text-3xl font-extrabold tabular-nums leading-none">
                                        <CountUp value={96} active={actTwo} />%
                                    </span>
                                    <span
                                        className="text-[11px] font-bold text-voca-green"
                                        style={{
                                            opacity: actTwo ? 1 : 0,
                                            transition: "opacity 500ms ease-out 1100ms",
                                        }}
                                    >
                                        ▲ 8%
                                    </span>
                                </div>
                                <div className="relative h-9 w-full mt-2 overflow-hidden rounded-md">
                                    <Sparkline active={actTwo} />
                                </div>
                            </div>

                            <div
                                className="rounded-2xl border border-white/50 bg-white/75 p-4 text-left shadow-xl backdrop-blur-xl backdrop-saturate-150"
                                style={{
                                    opacity: actTwo ? 1 : 0,
                                    transform: actTwo ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                                    transition: `opacity 700ms ${EASE_OUT} 180ms, transform 700ms ${EASE_OUT} 180ms`,
                                }}
                            >
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nota de clima</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="voca-title text-3xl font-extrabold tabular-nums leading-none">
                                        <CountUp value={8.5} decimals={1} active={actTwo} />
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-400">/10</span>
                                </div>
                                <div className="h-9 flex items-center mt-2">
                                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: actTwo ? "85%" : "0%",
                                                backgroundImage: BRAND_GRADIENT,
                                                transition: `width 1300ms ${EASE_OUT} 300ms`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="w-full rounded-2xl border border-white/20 bg-white/[0.08] p-4 text-left backdrop-blur-md backdrop-saturate-150"
                            style={{
                                opacity: actTwo ? 1 : 0,
                                transform: actTwo ? "translateY(0)" : "translateY(20px)",
                                transition: `opacity 700ms ${EASE_OUT} 300ms, transform 700ms ${EASE_OUT} 300ms`,
                            }}
                        >
                            <p className="flex items-center gap-2 text-[11px] font-bold text-white/60 uppercase tracking-widest">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span
                                        className="absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"
                                        style={{ animation: "hero-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
                                    />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
                                </span>
                                Performance · engajamento
                            </p>

                            <div className="mt-2.5 flex items-baseline gap-2.5">
                                <span className="text-3xl font-extrabold leading-none tabular-nums text-teal-300">
                                    <CountUp value={62} active={actTwo} duration={1800} />%
                                </span>
                                <span className="text-sm leading-snug text-white/75">
                                    de uso diário da plataforma
                                </span>
                            </div>

                            <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: actTwo ? "62%" : "0%",
                                        backgroundImage: "linear-gradient(90deg, #5eead4 0%, #ffffff 100%)",
                                        transition: `width 1600ms ${EASE_OUT} 500ms`,
                                    }}
                                />
                            </div>
                        </div>

                        <div
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-1"
                            style={{
                                opacity: actTwo ? 1 : 0,
                                transform: actTwo ? "translateY(0)" : "translateY(16px)",
                                transition: `opacity 700ms ${EASE_OUT} 420ms, transform 700ms ${EASE_OUT} 420ms`,
                            }}
                        >
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

                <div className="relative flex flex-col items-center text-center gap-6">
                    <p
                        className="text-base text-slate-500 animate-in fade-in slide-in-from-bottom-3 duration-700"
                        style={enter(80)}
                    >
                        <span className="text-xl font-extrabold tracking-tight text-voca-green">DHO</span>
                        {' '}na palma da mão
                        <span className="mx-2.5 text-slate-300">·</span>
                        21 funcionalidades
                    </p>

                    <h1
                        className="text-4xl font-extrabold text-slate-900 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
                        style={enter(200)}
                    >
                        Centralize a jornada na{' '}
                        <span className="relative whitespace-nowrap text-voca-green">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 100 12"
                                className="absolute left-0 top-full -mt-2 h-3 w-full fill-none stroke-voca-green/60"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M1 8c20-7 60-7 98 1"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    pathLength={1}
                                    style={{
                                        strokeDasharray: 1,
                                        animation: `hero-underline 900ms ${EASE_OUT} 900ms both`,
                                    }}
                                />
                            </svg>
                            <span className="relative">mesma plataforma</span>
                        </span>
                        : pessoas mais conectadas, engajadas e produtivas.
                    </h1>

                    <p
                        className="text-lg text-slate-500 max-w-lg animate-in fade-in slide-in-from-bottom-3 duration-700"
                        style={enter(340)}
                    >
                        Transforme insights de pessoas em resultados do negócio. Inteligência nos dados, atendimento ágil por humanos.
                    </p>

                    <div
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700"
                        style={enter(460)}
                    >
                        <Button
                            onClick={scrollToVideo}
                            className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base"
                        >
                            VOCA em ação
                        </Button>
                        <WhatsappLink variant="text" />
                    </div>

                    <div
                        ref={mobileDeviceRef}
                        className="relative mt-4 w-full max-w-[230px] will-change-transform animate-in fade-in zoom-in-95 duration-1000"
                        style={enter(600)}
                    >
                        <div className="absolute -inset-8 -z-10 rounded-full bg-voca-green/15 blur-3xl" />

                        <div className="relative rounded-[2.25rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden aspect-[618/1294]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-b-xl z-10" />
                            <Image
                                src="/screens/hero.png"
                                alt="Tela do aplicativo VOCA"
                                fill
                                sizes="230px"
                                className="object-cover object-top"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                                style={{ animation: "device-shine 6.5s ease-in-out infinite 1.2s" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
