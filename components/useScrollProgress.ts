'use client'

import { useEffect, useRef, type RefObject } from "react";

export function useScrollProgress(sectionRef: RefObject<HTMLElement>) {
    const progress = useRef(0);

    useEffect(() => {
        function update() {
            const el = sectionRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const scrolled = -rect.top;

            progress.current = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        }

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [sectionRef]);

    return progress;
}
