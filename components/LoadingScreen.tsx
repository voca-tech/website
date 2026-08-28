'use client'

import { useEffect, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { getLenisInstance } from "@/lib/lenis";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
});

const MIN_DURATION = 1100;

const MAX_DURATION = 3200;

const EXIT_DURATION = 900;

const symbolMask = {
    WebkitMaskImage: "url(/voca-symbol.png)",
    maskImage: "url(/voca-symbol.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
} as const;

export function LoadingScreen() {
    const [leaving, setLeaving] = useState(false);
    const [done, setDone] = useState(false);

    const numberRef = useRef<HTMLSpanElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const lenis = getLenisInstance();
        lenis?.stop();
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = "hidden";

        let raf = 0;
        let exitTimer = 0;
        let pageReady = document.readyState === "complete";
        let fontsReady = false;
        let value = 0;

        const start = performance.now();
        const floor = reduced ? 0 : MIN_DURATION;

        function markPageReady() {
            pageReady = true;
        }

        if (!pageReady) window.addEventListener("load", markPageReady, { once: true });

        if (document.fonts) document.fonts.ready.then(() => { fontsReady = true; });
        else fontsReady = true;

        const cap = window.setTimeout(() => {
            pageReady = true;
            fontsReady = true;
        }, MAX_DURATION);

        function release() {
            document.documentElement.style.overflow = "";
            lenis?.start();
        }

        function paint() {
            const rounded = Math.round(value);
            if (numberRef.current) numberRef.current.textContent = String(rounded).padStart(2, "0");
            if (fillRef.current) fillRef.current.style.height = `${value.toFixed(2)}%`;
            if (barRef.current) barRef.current.style.transform = `scaleX(${(value / 100).toFixed(4)})`;
        }

        function tick(now: number) {
            const canFinish = pageReady && fontsReady && now - start >= floor;
            const ceiling = canFinish ? 100 : 92;

            value += (ceiling - value) * 0.045;
            if (canFinish && ceiling - value < 0.4) value = 100;

            paint();

            if (value >= 100) {
                setLeaving(true);
                exitTimer = window.setTimeout(() => {
                    setDone(true);
                    release();
                }, reduced ? 260 : EXIT_DURATION);
                return;
            }

            raf = requestAnimationFrame(tick);
        }

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(cap);
            window.clearTimeout(exitTimer);
            window.removeEventListener("load", markPageReady);
            release();
        };
    }, []);

    if (done) return null;

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #012e31 0%, #016b72 100%)",
                transform: leaving ? "translateY(-101%)" : "translateY(0)",
                transition: `transform ${EXIT_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1) 180ms`,
            }}
        >
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
            />
            <div
                className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-teal-300/10 blur-3xl"
                style={{ animation: "drift-b 26s ease-in-out infinite" }}
            />

            <div
                className="relative flex flex-col items-center gap-9"
                style={{
                    opacity: leaving ? 0 : 1,
                    transform: leaving ? "scale(1.08)" : "scale(1)",
                    transition: "opacity 400ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >

                <div className="relative h-[7.1rem] w-[5.77rem]">
                    <div className="absolute inset-0 bg-white/[0.14]" style={symbolMask} />

                    <div className="absolute inset-0" style={symbolMask}>
                        <div
                            ref={fillRef}
                            className="absolute inset-x-0 bottom-0"
                            style={{
                                height: "0%",
                                background: "linear-gradient(180deg, #5eead4 0%, #ffffff 65%)",
                            }}
                        >
                            <span className="absolute inset-x-0 top-0 h-[2px] bg-white" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <p className={`${playfair.className} flex items-baseline text-white`}>
                        <span ref={numberRef} className="text-5xl font-medium tabular-nums tracking-tight">
                            00
                        </span>
                        <span className="ml-1.5 text-lg text-teal-300/80">%</span>
                    </p>

                    <div className="h-px w-40 overflow-hidden bg-white/15">
                        <div
                            ref={barRef}
                            className="h-full w-full origin-left bg-teal-300"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
