'use client'

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
            prevent: (node: HTMLElement) => node.closest("[data-lenis-prevent]") !== null,
        });
        setLenisInstance(lenis);

        lenis.on("scroll", ScrollTrigger.update);

        function onTick(time: number) {
            lenis.raf(time * 1000);
        }
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(onTick);
            lenis.destroy();
            setLenisInstance(null);
        };
    }, []);

    return <>{children}</>;
}
