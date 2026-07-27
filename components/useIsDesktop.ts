'use client'

import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint = 1024) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
        setIsDesktop(mql.matches);
        const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [breakpoint]);

    return isDesktop;
}
