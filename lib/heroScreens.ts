/** Screenshots shown on the hero phone/laptop. Add paths here as you drop files in /public/screens. */
export const PHONE_SCREEN_SLIDES = [
    "/screens/App/app-1.jpeg",
    "/screens/App/app-2.jpeg",
    "/screens/App/app-3.jpeg",
    // "/screens/App/app-4.jpeg",
    // "/screens/App/app-5.jpeg",
    "/screens/App/app-6.jpeg",
] as const;

export const LAPTOP_SCREEN_SLIDES = [
    "/screens/Web/web-1.jpg",
    // "/screens/Web/web-2.jpg",
    "/screens/Web/web-3.jpg",
    "/screens/Web/web-4.jpg",
    // "/screens/Web/web-5.jpg",
] as const;

export const SCREEN_SLIDE_MS = 2600;
export const SCREEN_CROSSFADE_MS = 550;
/** Laptop slideshow — a bit snappier than the phone. */
export const LAPTOP_SCREEN_SLIDE_MS = 2000;
export const LAPTOP_SCREEN_CROSSFADE_MS = 400;
/** Light haze — details soft, layout still clear. Set to 0 to show screens sharp. */
export const SCREEN_BLUR_PX = 0;
export const SCREEN_FROST = "rgba(255, 255, 255, 0)";

type FitMode = "cover" | "contain";
type AlignY = "top" | "center" | "bottom";

function sourceSize(source: CanvasImageSource) {
    const srcW = "videoWidth" in source && source.videoWidth
        ? source.videoWidth
        : (source as HTMLImageElement | ImageBitmap).width;
    const srcH = "videoHeight" in source && source.videoHeight
        ? source.videoHeight
        : (source as HTMLImageElement | ImageBitmap).height;
    return { srcW: srcW || 0, srcH: srcH || 0 };
}

export function drawFitted(
    ctx: CanvasRenderingContext2D,
    source: CanvasImageSource,
    destW: number,
    destH: number,
    fit: FitMode = "cover",
    alignY: AlignY = "top",
) {
    const { srcW, srcH } = sourceSize(source);

    if (!srcW || !srcH) {
        ctx.drawImage(source as CanvasImageSource, 0, 0, destW, destH);
        return;
    }

    const scale = fit === "cover"
        ? Math.max(destW / srcW, destH / srcH)
        : Math.min(destW / srcW, destH / srcH);
    const drawW = srcW * scale;
    const drawH = srcH * scale;
    const dx = (destW - drawW) / 2;
    const dy = alignY === "top"
        ? 0
        : alignY === "bottom"
            ? destH - drawH
            : (destH - drawH) / 2;

    ctx.drawImage(source, dx, dy, drawW, drawH);
}

/** @deprecated prefer drawFitted */
export function drawCover(
    ctx: CanvasRenderingContext2D,
    source: CanvasImageSource,
    destW: number,
    destH: number,
) {
    drawFitted(ctx, source, destW, destH, "cover", "center");
}

let blurSlab: HTMLCanvasElement | null = null;
let blurSlabCtx: CanvasRenderingContext2D | null = null;

function getBlurSlab(destW: number, destH: number) {
    if (!blurSlab) {
        blurSlab = document.createElement("canvas");
        blurSlabCtx = blurSlab.getContext("2d");
    }
    if (blurSlab.width !== destW || blurSlab.height !== destH) {
        blurSlab.width = destW;
        blurSlab.height = destH;
    }
    return blurSlabCtx;
}

export function drawBlurredScreen(
    ctx: CanvasRenderingContext2D,
    source: CanvasImageSource,
    destW: number,
    destH: number,
    options?: {
        blurPx?: number;
        frost?: string;
        fit?: FitMode;
        alignY?: AlignY;
    },
) {
    const blurPx = options?.blurPx ?? SCREEN_BLUR_PX;
    const frost = options?.frost ?? SCREEN_FROST;
    const fit = options?.fit ?? "cover";
    const alignY = options?.alignY ?? "top";

    // Hot path: no blur — paint straight to the target (avoids per-frame canvas alloc).
    if (blurPx <= 0) {
        drawFitted(ctx, source, destW, destH, fit, alignY);
        if (frost && frost !== "transparent" && frost !== "rgba(255, 255, 255, 0)") {
            ctx.fillStyle = frost;
            ctx.fillRect(0, 0, destW, destH);
        }
        return;
    }

    // Paint at exact size first so framing stays stable across slides,
    // then re-blit with a light blur (tiny pad only to hide filter edges).
    const slabCtx = getBlurSlab(destW, destH);
    if (!slabCtx || !blurSlab) {
        drawFitted(ctx, source, destW, destH, fit, alignY);
        return;
    }

    slabCtx.clearRect(0, 0, destW, destH);
    drawFitted(slabCtx, source, destW, destH, fit, alignY);

    ctx.save();
    const pad = Math.ceil(blurPx * 2);
    ctx.filter = `blur(${blurPx}px)`;
    ctx.drawImage(blurSlab, -pad, -pad, destW + pad * 2, destH + pad * 2);
    ctx.restore();

    if (frost && frost !== "transparent" && frost !== "rgba(255, 255, 255, 0)") {
        ctx.fillStyle = frost;
        ctx.fillRect(0, 0, destW, destH);
    }
}
