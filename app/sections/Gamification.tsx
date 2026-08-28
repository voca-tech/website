'use client'

import { useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
    Trophy, Zap, Medal, Target, TrendingUp, Users, Flame, Award,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "#e8b23d";
const MAROON_BG = "#3d0f18";
const MAROON_LIGHT = "#5c1a26";

interface Achievement {
    icon: LucideIcon;
    title: string;
    description: string;
}

const achievements: Achievement[] = [
    { icon: Target, title: "Engajamento com foco", description: "Participação sem perder o foco no que importa." },
    { icon: Zap, title: "Aprendizado divertido", description: "Trilhas dinâmicas que prendem a atenção." },
    { icon: Trophy, title: "Reconhecimento instantâneo", description: "Feedback imediato pelas conquistas." },
    { icon: Medal, title: "Desafios em equipe", description: "Recompensas que unem times por metas." },
    { icon: TrendingUp, title: "Progresso visível", description: "Evolução acompanhada pelos dados." },
    { icon: Users, title: "Times mais conectados", description: "Rankings que aproximam equipes inteiras." },
    { icon: Flame, title: "Consistência vira hábito", description: "Sequências que mantêm o time engajado." },
    { icon: Award, title: "Trilhas de aprendizado", description: "Conquistas que guiam o desenvolvimento." },
];

const BAND_WIDTH = 1200;
const BAND_HEIGHT = 320;
const ANCHOR_Y = [20, 55, 20, 55, 20, 55, 20, 55];
const DROP = [40, 90, 50, 100, 40, 90, 50, 100];

const anchors = achievements.map((_, i) => ({
    x: 50 + i * ((BAND_WIDTH - 100) / (achievements.length - 1)),
    y: ANCHOR_Y[i],
}));

function buildStringPath(points: { x: number; y: number }[]) {
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midX = (p0.x + p1.x) / 2;
        d += ` C${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
}

const stringPath = buildStringPath(anchors);

const MARQUEE_TEXT = "🎪 CONQUISTAS  •  RANKINGS  •  DESAFIOS  •  RECOMPENSAS  •  PROGRESSO  •  ";

function burstConfetti(originX: number, originY: number) {
    confetti({
        particleCount: 60,
        spread: 70,
        startVelocity: 32,
        colors: [GOLD, "#ffffff", "#c9432f"],
        origin: { x: originX, y: originY },
    });
}

export default function Gamification() {
    const sectionRef = useRef<HTMLDivElement>(null);

    function handleBadgeClick(event: React.MouseEvent<HTMLButtonElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        burstConfetti(
            (rect.left + rect.width / 2) / window.innerWidth,
            (rect.top + rect.height / 2) / window.innerHeight
        );
    }

    return (
        <div
            id="gamification"
            ref={sectionRef}
            className="relative overflow-hidden animate-in fade-in duration-700"
            style={{ backgroundColor: MAROON_BG }}
        >
            <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${GOLD} 0, ${GOLD} 24px, transparent 24px, transparent 48px)`,
                }}
            />
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl"
                    style={{ backgroundColor: "rgba(232,178,61,0.12)", animation: "drift-a 22s ease-in-out infinite" }}
                />
                <div
                    className="absolute -bottom-28 -right-16 w-[30rem] h-[30rem] rounded-full blur-3xl"
                    style={{ backgroundColor: "rgba(232,178,61,0.1)", animation: "drift-b 26s ease-in-out infinite" }}
                />
            </div>

            <div className="relative py-3 overflow-hidden" style={{ backgroundColor: MAROON_LIGHT }}>
                <div className="flex w-max whitespace-nowrap" style={{ animation: "marquee-right 20s linear infinite" }}>
                    {[0, 1].map((rep) => (
                        <span key={rep} className="font-extrabold uppercase tracking-widest text-sm px-2" style={{ color: GOLD }}>
                            {MARQUEE_TEXT.repeat(6)}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative px-6 py-14 sm:py-16 w-full">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="font-bold tracking-widest uppercase text-sm mb-3" style={{ color: GOLD }}>
                        Modo Gamificação
                    </p>
                    <h2
                        className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight"
                        style={{ textShadow: `0 0 40px ${GOLD}55` }}
                    >
                        Uma experiência gamificada
                    </h2>
                    <p className="text-white/70 text-lg mt-4 max-w-lg mx-auto">
                        Engajamento em alta escala para seus colaboradores.
                    </p>
                </div>

                <div className="hidden lg:block relative max-w-6xl mx-auto mt-4" style={{ height: BAND_HEIGHT }}>
                    <svg
                        viewBox={`0 0 ${BAND_WIDTH} ${BAND_HEIGHT}`}
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                    >
                        <path d={stringPath} fill="none" stroke={`${GOLD}90`} strokeWidth="3" />
                        {anchors.map((a, i) => (
                            <line key={`cord-${i}`} x1={a.x} y1={a.y} x2={a.x} y2={a.y + DROP[i] - 12} stroke={`${GOLD}60`} strokeWidth="2" />
                        ))}
                        {anchors.map((a, i) => (
                            <circle
                                key={`bulb-${i}`}
                                cx={a.x}
                                cy={a.y}
                                r="7"
                                fill={GOLD}
                                style={{ animation: "blink 1.8s ease-in-out infinite", animationDelay: `${i * 0.25}s` }}
                            />
                        ))}
                    </svg>

                    {achievements.map((item, index) => (
                        <button
                            key={item.title}
                            onClick={handleBadgeClick}
                            style={{
                                left: `${(anchors[index].x / BAND_WIDTH) * 100}%`,
                                top: anchors[index].y + DROP[index],
                                animationDelay: `${index * 90}ms`,
                            }}
                            className="group absolute flex flex-col items-center -translate-x-1/2 animate-in fade-in slide-in-from-top-2 fill-mode-both duration-500"
                        >
                            <div
                                className="flex items-center justify-center rounded-full border-[3px] transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    width: 68,
                                    height: 68,
                                    borderColor: GOLD,
                                    backgroundColor: MAROON_LIGHT,
                                    color: GOLD,
                                    boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
                                }}
                            >
                                <item.icon size={26} />
                            </div>
                            <div
                                className="mt-2 rounded-md px-2 py-1 text-center max-w-[8.5rem] transition-colors duration-200"
                                style={{ backgroundColor: `${MAROON_LIGHT}cc` }}
                            >
                                <p className="text-white text-[11px] font-bold leading-snug">{item.title}</p>
                                <p className="text-white/0 group-hover:text-white/60 text-[10px] mt-0.5 leading-snug transition-colors duration-200 max-h-0 group-hover:max-h-12 overflow-hidden">
                                    {item.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-10">
                    {achievements.map((item, index) => (
                        <button
                            key={item.title}
                            onClick={handleBadgeClick}
                            style={{ animationDelay: `${index * 60}ms` }}
                            className="group flex flex-col items-center text-center animate-in fade-in zoom-in-50 fill-mode-both duration-500"
                        >
                            <div
                                className="flex items-center justify-center rounded-full border-2"
                                style={{ width: 68, height: 68, borderColor: GOLD, backgroundColor: MAROON_LIGHT, color: GOLD }}
                            >
                                <item.icon size={26} />
                            </div>
                            <p className="text-white text-xs font-bold mt-2 leading-snug">{item.title}</p>
                        </button>
                    ))}
                </div>

                <div className="flex justify-center mt-8 lg:mt-4">
                    <Link href="/contact">
                        <Button
                            className="rounded-full px-8 h-12 text-base font-extrabold hover:scale-105 transition-transform"
                            style={{ backgroundColor: GOLD, color: MAROON_BG }}
                        >
                            Agendar demonstração
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
