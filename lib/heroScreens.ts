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
    "/screens/Web/web-1.png",
    // "/screens/Web/web-2.png",
    "/screens/Web/web-3.png",
    "/screens/Web/web-4.png",
    // "/screens/Web/web-5.png",
] as const;

export const SCREEN_SLIDE_MS = 4200;
export const SCREEN_CROSSFADE_MS = 900;
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

    // Paint at exact size first so framing stays stable across slides,
    // then re-blit with a light blur (tiny pad only to hide filter edges).
    const slab = document.createElement("canvas");
    slab.width = destW;
    slab.height = destH;
    const slabCtx = slab.getContext("2d");
    if (!slabCtx) {
        drawFitted(ctx, source, destW, destH, fit, alignY);
        return;
    }

    drawFitted(slabCtx, source, destW, destH, fit, alignY);

    ctx.save();
    if (blurPx > 0) {
        const pad = Math.ceil(blurPx * 2);
        ctx.filter = `blur(${blurPx}px)`;
        ctx.drawImage(slab, -pad, -pad, destW + pad * 2, destH + pad * 2);
    } else {
        ctx.drawImage(slab, 0, 0);
    }
    ctx.restore();

    ctx.fillStyle = frost;
    ctx.fillRect(0, 0, destW, destH);
}
