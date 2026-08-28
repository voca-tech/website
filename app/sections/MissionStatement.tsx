'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/blur-text";

export default function MissionStatement() {
    const [showSubtitle, setShowSubtitle] = useState(false);

    return (
        <div data-nav-dark className="relative py-28 sm:py-36 px-6 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=1600&q=70)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            />
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, rgba(1,46,49,0.94) 20%, rgba(0,121,128,0.88) 100%)" }}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div
                    className="absolute -top-24 left-[15%] w-[30rem] h-[30rem] rounded-full bg-teal-300/10 blur-3xl"
                    style={{ animation: "drift-c 30s ease-in-out infinite" }}
                />
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={440}
                    height={541}
                    aria-hidden="true"
                    className="absolute -right-16 bottom-0 w-[22rem] sm:w-[28rem] h-auto opacity-[0.07] brightness-0 invert select-none"
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <BlurText
                    text="Cuidamos das pessoas, para que elas possam cuidar da empresa."
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1]"
                    animateBy="words"
                    direction="top"
                    delay={320}
                    stepDuration={0.6}
                    threshold={0.1}
                    rootMargin="-50px"
                    onAnimationComplete={() => setShowSubtitle(true)}
                />

                <div
                    className="mt-8 transition-all duration-700 ease-out"
                    style={{
                        opacity: showSubtitle ? 1 : 0,
                        transform: showSubtitle ? "translateY(0)" : "translateY(16px)",
                    }}
                >
                    <p className="text-lg sm:text-xl text-white/70 max-w-2xl">
                        Não somos apenas tecnologia, somos um time que se importa com o que acontece com sua empresa durante & depois da implementação.
                    </p>
                    <Link
                        href="/sobre"
                        className="group inline-flex items-center gap-1.5 text-sm font-bold text-teal-300 mt-5"
                    >
                        Conheça nossa história
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
