import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(value: Lenis | null) {
    instance = value;
}

export function getLenisInstance() {
    return instance;
}
