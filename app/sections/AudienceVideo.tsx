'use client'

import { useEffect, useRef, useState } from "react";
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

    return (
        <div className="relative py-16 sm:py-20 px-6 overflow-hidden">
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

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Público-alvo</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                        Um VOCA diferente para cada pessoa na sua empresa
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        A plataforma se adapta a quem está usando, do C-level ao colaborador da ponta.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-10">
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
                                    "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors duration-300",
                                    isActive ? "text-white shadow-md" : "border-slate-200 text-slate-600 hover:border-slate-300"
                                )}
                            >
                                <persona.icon size={16} />
                                {persona.title}
                            </button>
                        );
                    })}
                </div>

                <div
                    className="relative mt-8 rounded-[2.5rem] border border-white/60 bg-white/40 shadow-xl overflow-hidden"
                    style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none transition-colors duration-700"
                        style={{ background: `linear-gradient(135deg, ${active.color}22, transparent 55%)` }}
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-stretch">
                        <div className="grid order-2 lg:order-1">
                            {personas.map((persona) => (
                                <div
                                    key={persona.id}
                                    className="[grid-area:1/1] p-8 sm:p-10 flex flex-col justify-center transition-opacity duration-300"
                                    style={{
                                        opacity: persona.id === activeId ? 1 : 0,
                                        pointerEvents: persona.id === activeId ? "auto" : "none",
                                    }}
                                    aria-hidden={persona.id === activeId ? undefined : true}
                                >
                                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: persona.color }}>
                                        {persona.title}
                                    </p>
                                    <p className="text-slate-600 mt-3 max-w-md">{persona.description}</p>
                                    <ul className="flex flex-col gap-2 mt-5">
                                        {persona.points.slice(0, 3).map((point) => (
                                            <li key={point} className="text-sm text-slate-600 flex gap-2.5">
                                                <Check size={16} className="shrink-0 mt-0.5" style={{ color: persona.color }} />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center gap-3 rounded-2xl p-4 mt-6 w-full sm:w-fit" style={{ backgroundColor: `${persona.color}0D` }}>
                                        <p className="text-3xl font-extrabold shrink-0" style={{ color: persona.color }}>{persona.stat.value}</p>
                                        <p className="text-xs text-slate-500 leading-snug">{persona.stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative order-1 lg:order-2 h-48 lg:h-auto">
                            <Image src={active.image} alt={active.title} fill className="object-cover" />
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
                    className="group relative mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 sm:px-8 py-6 hover:border-voca-green/40 hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                            <LayoutGrid size={22} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Dados completos de todos os públicos</p>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Pontos, funcionalidades e próximos passos detalhados para cada perfil, em uma página própria.
                            </p>
                        </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-voca-green text-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap group-hover:gap-2.5 transition-all">
                        Ver página completa
                        <ArrowRight size={14} />
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
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
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

                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video">
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
                            className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
                        >
                            <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white text-voca-green shadow-xl transition-transform hover:scale-105">
                                <Play size={30} className="ml-1" fill="currentColor" />
                            </span>
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
