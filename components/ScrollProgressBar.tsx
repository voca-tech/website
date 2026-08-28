'use client'

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
    const trackRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let raf = 0;

        let width = trackRef.current?.offsetWidth ?? window.innerWidth;

        function update() {
            raf = 0;

            const doc = document.documentElement;
            const total = doc.scrollHeight - window.innerHeight;
            const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;

            if (fillRef.current) {
                fillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
            }

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${(progress * width - 3).toFixed(1)}px, -50%, 0)`;
                dotRef.current.style.opacity = progress > 0.004 ? "1" : "0";
            }
        }

        function onScroll() {
            if (!raf) raf = requestAnimationFrame(update);
        }

        function onResize() {
            width = trackRef.current?.offsetWidth ?? window.innerWidth;
            onScroll();
        }

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={trackRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full h-[3px]"
        >
            <div
                ref={fillRef}
                className="h-full w-full origin-left"
                style={{
                    transform: "scaleX(0)",
                    background: "linear-gradient(90deg, #007980 0%, #2dd4bf 100%)",
                }}
            />
            <span
                ref={dotRef}
                className="absolute left-0 top-1/2 h-1.5 w-1.5 rounded-full bg-teal-300 transition-opacity duration-300"
                style={{ opacity: 0, boxShadow: "0 0 10px 1px rgba(45,212,191,0.9)" }}
            />
        </div>
    );
}
