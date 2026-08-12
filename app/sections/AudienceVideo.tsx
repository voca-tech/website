'use client'

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Check, ArrowRight, LayoutGrid, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsDesktop } from "@/components/useIsDesktop";
import { personas } from "@/app/publico-alvo/data";
import { cn } from "@/lib/utils";
import { getLenisInstance } from "@/lib/lenis";

function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });

function PersonaTeaser() {
    const [activeId, setActiveId] = useState(personas[0].id);
    const active = personas.find((p) => p.id === activeId)!;
    const sectionRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-item",
                { opacity: 0, y: 44 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    stagger: 0.18,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 82%",
                        end: "top 32%",
                        scrub: 0.8,
                    },
                }
            );

            gsap.fromTo(
                parallaxRef.current,
                { yPercent: -6 },
                {
                    yPercent: 6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative py-16 sm:py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div
                    className="absolute -bottom-28 -left-20 w-[28rem] h-[28rem] rounded-full bg-voca-green/10 blur-3xl"
                    style={{ animation: "drift-a 24s ease-in-out infinite" }}
                />
            </div>

            <div ref={revealRef} className="relative max-w-6xl mx-auto">
                <div className="reveal-item text-center max-w-2xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Público-alvo</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                        Um VOCA diferente para cada pessoa na sua empresa
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        A plataforma se adapta a quem está usando, do C-level ao colaborador da ponta.
                    </p>
                </div>

                <div className="reveal-item flex flex-wrap justify-center gap-2 mt-10">
                    {personas.map((persona) => {
                        const isActive = persona.id === activeId;
                        return (
                            <button
                                key={persona.id}
                                onClick={() => setActiveId(persona.id)}
                                style={{
                                    backgroundColor: isActive ? persona.color : "transparent",
                                    borderColor: isActive ? persona.color : undefined,
                                }}
                                className={cn(
                                    "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300 ease-out",
                                    isActive
                                        ? "text-white shadow-lg -translate-y-0.5 scale-105"
                                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:-translate-y-0.5"
                                )}
                            >
                                <persona.icon
                                    size={16}
                                    className={cn("transition-transform duration-500 ease-out", isActive && "scale-110 rotate-[-8deg]")}
                                />
                                {persona.title}
                            </button>
                        );
                    })}
                </div>

                <div
                    className="reveal-item relative mt-8 rounded-[2.5rem] border border-white/60 bg-white/40 shadow-xl overflow-hidden"
                    style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none transition-colors duration-700"
                        style={{ background: `linear-gradient(135deg, ${active.color}22, transparent 55%)` }}
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-stretch">
                        <div className="grid order-2 lg:order-1">
                            {personas.map((persona) => {
                                const isActive = persona.id === activeId;
                                const step = (order: number): CSSProperties => ({
                                    opacity: isActive ? 1 : 0,
                                    transform: isActive ? "translateY(0)" : "translateY(14px)",
                                    transition: "opacity 450ms ease-out, transform 450ms ease-out",
                                    transitionDelay: isActive ? `${100 + order * 70}ms` : "0ms",
                                });
                                return (
                                    <div
                                        key={persona.id}
                                        className="[grid-area:1/1] p-8 sm:p-10 flex flex-col justify-center transition-opacity duration-200"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            pointerEvents: isActive ? "auto" : "none",
                                        }}
                                        aria-hidden={isActive ? undefined : true}
                                    >
                                        <p
                                            className="text-sm font-bold uppercase tracking-widest"
                                            style={{ color: persona.color, ...step(0) }}
                                        >
                                            {persona.title}
                                        </p>
                                        <p className="text-lg font-semibold text-slate-900 mt-3 max-w-md leading-snug" style={step(1)}>
                                            {persona.headline}
                                        </p>
                                        <p className="text-slate-500 text-sm mt-2 max-w-md" style={step(2)}>
                                            {persona.description}
                                        </p>
                                        <ul className="flex flex-col gap-2 mt-5">
                                            {persona.points.slice(0, 3).map((point, index) => (
                                                <li
                                                    key={point}
                                                    className="text-sm text-slate-600 flex gap-2.5"
                                                    style={step(3 + index)}
                                                >
                                                    <Check size={16} className="shrink-0 mt-0.5" style={{ color: persona.color }} />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/casos-de-sucesso#${persona.stat.caseSlug}`}
                                            className="group/stat flex items-center gap-3 rounded-2xl p-4 mt-6 w-full sm:w-fit hover:shadow-md hover:-translate-y-0.5"
                                            style={{ backgroundColor: `${persona.color}0D`, ...step(6) }}
                                        >
                                            <p className="text-3xl font-extrabold shrink-0" style={{ color: persona.color }}>{persona.stat.value}</p>
                                            <div>
                                                <p className="text-xs text-slate-500 leading-snug">{persona.stat.label}</p>
                                                <p className="flex items-center gap-1 text-[11px] font-bold mt-1" style={{ color: persona.color }}>
                                                    Caso real · {persona.stat.source}
                                                    <ArrowRight size={11} className="transition-transform group-hover/stat:translate-x-0.5" />
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative order-1 lg:order-2 h-48 lg:h-auto overflow-hidden">
                            <div ref={parallaxRef} className="absolute -top-[8%] -bottom-[8%] inset-x-0">
                                {personas.map((persona) => {
                                    const isActive = persona.id === activeId;
                                    return (
                                        <div
                                            key={persona.id}
                                            className="absolute inset-0 transition-opacity duration-700 ease-out"
                                            style={{ opacity: isActive ? 1 : 0 }}
                                            aria-hidden={isActive ? undefined : true}
                                        >
                                            <Image
                                                src={persona.image}
                                                alt={isActive ? persona.title : ""}
                                                fill
                                                sizes="(min-width: 1024px) 40vw, 100vw"
                                                className={cn(
                                                    "object-cover transition-transform ease-out",
                                                    isActive ? "scale-105 [transition-duration:4000ms]" : "scale-100 duration-700"
                                                )}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                className="absolute inset-0 transition-colors duration-700"
                                style={{ background: `linear-gradient(0deg, ${active.color}CC 0%, transparent 55%)` }}
                            />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                                    <active.icon size={16} />
                                </div>
                                <p className="text-white font-bold text-sm">{active.title}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    href="/publico-alvo"
                    className="reveal-item group relative mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 sm:px-8 py-6 hover:border-voca-green/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green transition-all duration-500 ease-out group-hover:bg-voca-green group-hover:text-white group-hover:rotate-[-8deg] group-hover:scale-110">
                            <LayoutGrid size={22} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Dados completos de todos os públicos</p>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Pontos, funcionalidades e próximos passos detalhados para cada perfil, em uma página própria.
                            </p>
                        </div>
                    </div>
                    <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-voca-green text-white pl-5 pr-4 py-2.5 text-sm font-semibold whitespace-nowrap shadow-md transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-voca-green/30">
                        Ver página completa
                        <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                            <ArrowRight
                                size={14}
                                className="transition-transform duration-500 ease-out group-hover:translate-x-6"
                            />
                            <ArrowRight
                                size={14}
                                className="absolute -translate-x-6 transition-transform duration-500 ease-out group-hover:translate-x-0"
                            />
                        </span>
                    </span>
                </Link>
            </div>
        </div>
    );
}

function VideoShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressTrackRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [soundHintDone, setSoundHintDone] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

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

            gsap.fromTo(
                frameRef.current,
                { scale: 0.92 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: frameRef.current,
                        start: "top 90%",
                        end: "top 45%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const video = videoRef.current;
        if (!video) return;

        function play() {
            video?.play().catch(() => {});
            setIsPlaying(true);
        }
        function pause() {
            video?.pause();
            setIsPlaying(false);
        }

        const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: play,
            onEnterBack: play,
            onLeave: pause,
            onLeaveBack: pause,
        });

        function onLoadedMetadata() { setDuration(video?.duration || 0); }
        function onTimeUpdate() { setCurrentTime(video?.currentTime || 0); }
        function onEnded() { setIsPlaying(false); }
        video.addEventListener("loadedmetadata", onLoadedMetadata);
        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("ended", onEnded);

        return () => {
            st.kill();
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("ended", onEnded);
        };
    }, []);

    function togglePlay() {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => {});
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    }

    function toggleMute() {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
        setSoundHintDone(true);
    }

    function restart() {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        setIsPlaying(true);
    }

    function seek(event: React.MouseEvent<HTMLDivElement>) {
        const track = progressTrackRef.current;
        const video = videoRef.current;
        if (!track || !video || !duration) return;
        const rect = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        video.currentTime = ratio * duration;
        setCurrentTime(video.currentTime);
    }

    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={sectionRef}
            className="relative py-20 sm:py-28 px-6 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
        >
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
            />
            <div
                className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(45,212,191,0.14)", animation: "drift-a 26s ease-in-out infinite" }}
            />
            <div
                className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(45,212,191,0.1)", animation: "drift-b 30s ease-in-out infinite" }}
            />

            <div ref={revealRef} className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                    <p className="text-sm font-bold tracking-widest text-white/70 uppercase">Conheça o VOCA</p>
                    <h2 className={cn(playfair.className, "italic text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-snug mt-3")}>
                        Cada colaborador, uma voz que importa.
                    </h2>
                    <p className="text-white/70 mt-4 max-w-xl mx-auto">
                        Dados que viram decisões. Decisões que viram cultura.
                    </p>
                </div>

                <div ref={frameRef} className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video">
                    <video
                        ref={videoRef}
                        src="/videos/institucional.mp4"
                        playsInline
                        muted={isMuted}
                        preload="auto"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {!isPlaying && (
                        <button
                            onClick={togglePlay}
                            aria-label="Reproduzir vídeo"
                            className="group/play absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
                        >
                            <span className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                                <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-voca-green shadow-xl transition-transform duration-300 group-hover/play:scale-110">
                                    <Play size={30} className="ml-1" fill="currentColor" />
                                </span>
                            </span>
                        </button>
                    )}

                    {isPlaying && isMuted && !soundHintDone && (
                        <button
                            onClick={toggleMute}
                            className="absolute top-4 right-4 sm:top-5 sm:right-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-bold text-voca-green shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 animate-in fade-in slide-in-from-top-2 duration-500"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inset-0 rounded-full bg-voca-green/60 animate-ping" />
                                <span className="relative h-2 w-2 rounded-full bg-voca-green" />
                            </span>
                            Ativar som
                        </button>
                    )}

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 sm:px-6 pb-4 pt-14">
                        <div
                            ref={progressTrackRef}
                            onClick={seek}
                            className="relative h-1.5 rounded-full bg-white/25 cursor-pointer mb-3 group"
                        >
                            <div
                                className="absolute inset-y-0 left-0 rounded-full bg-white"
                                style={{ width: `${progressPct}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow scale-0 group-hover:scale-100 transition-transform"
                                style={{ left: `${progressPct}%`, marginLeft: -6 }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <button onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Reproduzir"} className="hover:text-white/70 transition-colors">
                                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                </button>
                                <button onClick={restart} aria-label="Reiniciar vídeo" className="hover:text-white/70 transition-colors">
                                    <RotateCcw size={16} />
                                </button>
                                <span className="text-xs text-white/70 tabular-nums">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>
                            <button onClick={toggleMute} aria-label={isMuted ? "Ativar som" : "Silenciar"} className="hover:text-white/70 transition-colors">
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto text-center mt-12">
                    <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                        Cuidamos de pessoas para que elas possam cuidar das empresas.
                    </p>
                    <p className="text-white/70 mt-4 leading-relaxed">
                        Não é só tecnologia. É um time que se importa com o que acontece com sua empresa durante e depois da implementação.
                    </p>

                    <Link
                        href="/sobre"
                        className="group/cta inline-flex items-center gap-2 mt-8 rounded-md bg-white text-voca-green pl-6 pr-5 h-12 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Conheça nossa história
                        <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-500 ease-out group-hover/cta:translate-x-6"
                            />
                            <ArrowRight
                                size={16}
                                className="absolute -translate-x-6 transition-transform duration-500 ease-out group-hover/cta:translate-x-0"
                            />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function VideoMobileCard() {
    return (
        <div className="px-6 pb-16 sm:pb-20">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Conheça o VOCA</p>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-3">Assista ao nosso vídeo institucional</h2>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl bg-black relative aspect-video">
                    <video src="/videos/institucional.mp4" controls playsInline preload="metadata" className="h-full w-full object-cover" />
                </div>

                <div className="text-center mt-8">
                    <p className="text-lg font-semibold text-slate-900 leading-snug">
                        Cuidamos de pessoas para que elas possam cuidar das empresas.
                    </p>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                        Não é só tecnologia. É um time que se importa com o que acontece com sua empresa durante e depois da implementação.
                    </p>

                    <Link
                        href="/sobre"
                        className="inline-flex items-center gap-2 mt-6 rounded-md bg-voca-green text-white px-6 h-12 text-base font-semibold shadow-md"
                    >
                        Conheça nossa história
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function AudienceVideo() {
    const isDesktop = useIsDesktop();

    useEffect(() => {
        if (window.location.hash !== "#video") return;
        const el = document.getElementById("video");
        if (!el) return;

        let attempts = 0;
        function tryScroll() {
            const lenis = getLenisInstance();
            if (lenis) {
                lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.2 });
                return;
            }
            if (attempts++ < 60) {
                requestAnimationFrame(tryScroll);
            } else {
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        tryScroll();
    }, []);

    return (
        <div className="relative bg-white">
            <PersonaTeaser />
            <div id="video" className="scroll-mt-20">
                {isDesktop ? <VideoShowcase /> : <VideoMobileCard />}
            </div>
        </div>
    );
}
