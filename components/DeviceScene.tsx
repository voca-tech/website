'use client'

import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
    PHONE_SCREEN_SLIDES,
    LAPTOP_SCREEN_SLIDES,
    SCREEN_SLIDE_MS,
    SCREEN_CROSSFADE_MS,
    drawBlurredScreen,
} from "@/lib/heroScreens";

const SCREEN_MESH_NAME = "baf05346569e3be49c2a";
const SCREEN_MARGIN = 0.95;
/** Corner radius as a fraction of the screen's shorter side — subtle, not pill-like. */
const PHONE_SCREEN_CORNER_RATIO = 0.055;

const PHONE_EXIT_START = 0;
const PHONE_EXIT_END = 0.44;
const LAPTOP_ENTER_START = 0.28;
const LAPTOP_ENTER_END = 0.76;

const PHONE_TILT_START = THREE.MathUtils.degToRad(-14);
const PHONE_TILT_END = THREE.MathUtils.degToRad(14);

const LAPTOP_ATLAS_SIZE = 4096;
/** Match atlas size so the screen region stays sharp (half-res looks soft on large laptop). */
const LAPTOP_TEXTURE_SIZE = 4096;
const LAPTOP_SCREEN_RECT = { x: 26, y: 1445, w: 2015, h: 1294 };

const LAPTOP_TILT_X = THREE.MathUtils.degToRad(16);
const LAPTOP_YAW_END = THREE.MathUtils.degToRad(-12);
const LAPTOP_YAW_SWING = THREE.MathUtils.degToRad(150);
const LAPTOP_ROLL_IN = THREE.MathUtils.degToRad(-6);

const PHONE_CANVAS_W = 1236;
const PHONE_CANVAS_H = 2588;
const PHONE_CANVAS_RADIUS = Math.min(PHONE_CANVAS_W, PHONE_CANVAS_H) * PHONE_SCREEN_CORNER_RATIO;

function clamp01(value: number) {
    return Math.min(1, Math.max(0, value));
}

function range(value: number, start: number, end: number) {
    return clamp01((value - start) / (end - start));
}

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
    return t * t * t;
}

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutBack(t: number) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/** Keep UI screenshots crisp on the 3D screen (mipmaps soften text/icons). */
function sharpenCanvasTexture(texture: THREE.CanvasTexture) {
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 1;
}

function clipRoundedRect(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    radius: number,
) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, width, height, r);
    } else {
        ctx.moveTo(r, 0);
        ctx.lineTo(width - r, 0);
        ctx.quadraticCurveTo(width, 0, width, r);
        ctx.lineTo(width, height - r);
        ctx.quadraticCurveTo(width, height, width - r, height);
        ctx.lineTo(r, height);
        ctx.quadraticCurveTo(0, height, 0, height - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
    }
    ctx.closePath();
    ctx.clip();
}

function attachScreenPlane(screenMesh: THREE.Mesh, texture: THREE.Texture) {
    const geometry = screenMesh.geometry;
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Keep PlaneGeometry so UVs stay correct; rounding comes from the canvas alpha mask.
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
    });
    let plane: THREE.Mesh;

    if (size.z <= size.x && size.z <= size.y) {
        plane = new THREE.Mesh(
            new THREE.PlaneGeometry(size.x * SCREEN_MARGIN, size.y * SCREEN_MARGIN),
            material,
        );
        plane.position.set(center.x, center.y, center.z + Math.sign(center.z || 1) * (size.z / 2 + 0.002));
    } else if (size.x <= size.y && size.x <= size.z) {
        plane = new THREE.Mesh(
            new THREE.PlaneGeometry(size.z * SCREEN_MARGIN, size.y * SCREEN_MARGIN),
            material,
        );
        plane.rotation.y = Math.PI / 2;
        plane.position.set(center.x + Math.sign(center.x || 1) * (size.x / 2 + 0.002), center.y, center.z);
    } else {
        plane = new THREE.Mesh(
            new THREE.PlaneGeometry(size.x * SCREEN_MARGIN, size.z * SCREEN_MARGIN),
            material,
        );
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(center.x, center.y + Math.sign(center.y || 1) * (size.y / 2 + 0.002), center.z);
    }

    screenMesh.add(plane);
    return plane;
}

function imageFromTexture(texture: THREE.Texture): CanvasImageSource | null {
    const image = texture.image as CanvasImageSource | undefined;
    if (!image) return null;
    if ("complete" in image && image instanceof HTMLImageElement && !image.complete) return null;
    return image;
}

function paintSlide(
    ctx: CanvasRenderingContext2D,
    textures: THREE.Texture[],
    index: number,
    width: number,
    height: number,
) {
    const source = imageFromTexture(textures[index]);
    if (!source) return;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    clipRoundedRect(ctx, width, height, PHONE_CANVAS_RADIUS);
    drawBlurredScreen(ctx, source, width, height, { fit: "cover", alignY: "top" });
    ctx.restore();
}

function paintSlideCrossfade(
    ctx: CanvasRenderingContext2D,
    textures: THREE.Texture[],
    fromIndex: number,
    toIndex: number,
    amount: number,
    width: number,
    height: number,
) {
    const from = imageFromTexture(textures[fromIndex]);
    const to = imageFromTexture(textures[toIndex]);
    if (!from) return;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    clipRoundedRect(ctx, width, height, PHONE_CANVAS_RADIUS);
    drawBlurredScreen(ctx, from, width, height, { fit: "cover", alignY: "top" });
    ctx.fillStyle = `rgba(255,255,255,${amount * 0.35})`;
    ctx.fillRect(0, 0, width, height);
    if (to) {
        ctx.globalAlpha = amount;
        drawBlurredScreen(ctx, to, width, height, { fit: "cover", alignY: "top" });
        ctx.globalAlpha = 1;
    }
    ctx.restore();
}

interface ModelProps {
    progressRef: MutableRefObject<number>;
}

function PhoneModel({ progressRef }: ModelProps) {
    const { scene } = useGLTF("/models/phone/scene.gltf");
    const slideTextures = useTexture([...PHONE_SCREEN_SLIDES]) as THREE.Texture[];
    const group = useRef<THREE.Group>(null!);
    const planeRef = useRef<THREE.Mesh | null>(null);
    const displayTextureRef = useRef<THREE.CanvasTexture | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const slideIndex = useRef(0);
    const fade = useRef(1);
    const fadingOut = useRef(false);
    const nextIndex = useRef(1 % PHONE_SCREEN_SLIDES.length);
    const lastSwap = useRef(0);
    const displayed = useRef(0);
    const showingBack = useRef(false);

    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    const intrinsicHeight = useMemo(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        clonedScene.position.sub(center);
        return size.y || 1;
    }, [clonedScene]);

    useEffect(() => {
        slideTextures.forEach((texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
        });

        const screenMesh = clonedScene.getObjectByName(SCREEN_MESH_NAME) as THREE.Mesh | undefined;
        if (!screenMesh) return;

        const canvas = document.createElement("canvas");
        canvas.width = PHONE_CANVAS_W;
        canvas.height = PHONE_CANVAS_H;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        paintSlide(ctx, slideTextures, 0, PHONE_CANVAS_W, PHONE_CANVAS_H);

        const displayTexture = new THREE.CanvasTexture(canvas);
        displayTexture.colorSpace = THREE.SRGBColorSpace;
        displayTexture.premultiplyAlpha = true;
        sharpenCanvasTexture(displayTexture);
        displayTexture.needsUpdate = true;

        canvasRef.current = canvas;
        displayTextureRef.current = displayTexture;

        screenMesh.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const plane = attachScreenPlane(screenMesh, displayTexture);
        planeRef.current = plane;
        showingBack.current = false;
        slideIndex.current = 0;
        nextIndex.current = 1 % PHONE_SCREEN_SLIDES.length;
        fade.current = 1;
        fadingOut.current = false;
        lastSwap.current = performance.now();

        return () => {
            screenMesh.remove(plane);
            plane.geometry.dispose();
            (plane.material as THREE.Material).dispose();
            displayTexture.dispose();
            planeRef.current = null;
            displayTextureRef.current = null;
            canvasRef.current = null;
        };
    }, [clonedScene, slideTextures]);

    useFrame((state, delta) => {
        if (!group.current) return;

        const target = range(progressRef.current, PHONE_EXIT_START, PHONE_EXIT_END);
        displayed.current = THREE.MathUtils.damp(displayed.current, target, 7, delta);
        const p = displayed.current;

        const { width, height } = state.viewport;

        const move = THREE.MathUtils.lerp(p, easeInCubic(p), 0.28);
        const spin = THREE.MathUtils.lerp(p, easeInOutCubic(p), 0.55);

        const startX = width * 0.26;
        const exitX = width * 1.3;
        const startY = height * 0.06;
        const endY = height * 0.1;

        const restFactor = 1 - 4 * p * (1 - p);
        const bob = Math.sin(state.clock.elapsedTime * 1.1) * height * 0.012 * restFactor;
        const arc = Math.sin(p * Math.PI) * height * 0.05;

        group.current.position.x = THREE.MathUtils.lerp(startX, exitX, move);
        group.current.position.y = THREE.MathUtils.lerp(startY, endY, move) + arc + bob;
        group.current.position.z = THREE.MathUtils.lerp(0, -2.2, move);

        group.current.rotation.y = spin * Math.PI * 2;
        group.current.rotation.z = THREE.MathUtils.lerp(PHONE_TILT_START, PHONE_TILT_END, spin);

        const targetHeight = height * 0.7;
        group.current.scale.setScalar(targetHeight / intrinsicHeight);

        const canvas = canvasRef.current;
        const displayTexture = displayTextureRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && displayTexture && PHONE_SCREEN_SLIDES.length > 1) {
            const now = performance.now();
            const wantsBack = p >= 0.45;
            const isHidden = Math.cos(group.current.rotation.y) < -0.1;

            // Mid-flip: jump to the next slide while the phone face is hidden
            if (wantsBack !== showingBack.current && isHidden) {
                slideIndex.current = (slideIndex.current + 1) % PHONE_SCREEN_SLIDES.length;
                nextIndex.current = (slideIndex.current + 1) % PHONE_SCREEN_SLIDES.length;
                paintSlide(ctx, slideTextures, slideIndex.current, PHONE_CANVAS_W, PHONE_CANVAS_H);
                displayTexture.needsUpdate = true;
                showingBack.current = wantsBack;
                fadingOut.current = false;
                fade.current = 1;
                lastSwap.current = now;
            } else if (p < 0.4) {
                // Idle / early scroll: timed crossfade between slides
                if (!fadingOut.current && now - lastSwap.current > SCREEN_SLIDE_MS) {
                    fadingOut.current = true;
                    nextIndex.current = (slideIndex.current + 1) % PHONE_SCREEN_SLIDES.length;
                }

                if (fadingOut.current) {
                    fade.current = Math.max(0, fade.current - delta * (1000 / SCREEN_CROSSFADE_MS));
                    if (fade.current <= 0) {
                        slideIndex.current = nextIndex.current;
                        paintSlide(ctx, slideTextures, slideIndex.current, PHONE_CANVAS_W, PHONE_CANVAS_H);
                        displayTexture.needsUpdate = true;
                        fade.current = 1;
                        fadingOut.current = false;
                        lastSwap.current = now;
                    } else {
                        paintSlideCrossfade(
                            ctx,
                            slideTextures,
                            slideIndex.current,
                            nextIndex.current,
                            1 - fade.current,
                            PHONE_CANVAS_W,
                            PHONE_CANVAS_H,
                        );
                        displayTexture.needsUpdate = true;
                    }
                }
            }
        }
    });

    return (
        <group ref={group}>
            <primitive object={clonedScene} />
        </group>
    );
}

function LaptopModel({ progressRef }: ModelProps) {
    const { scene } = useGLTF("/models/laptop/scene.glb");
    const slideTextures = useTexture([...LAPTOP_SCREEN_SLIDES]) as THREE.Texture[];
    const group = useRef<THREE.Group>(null!);
    const displayed = useRef(0);
    const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
    const baseMapRef = useRef<THREE.Texture | null>(null);
    const composedRef = useRef<THREE.CanvasTexture | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const slideIndex = useRef(0);
    const lastSwap = useRef(0);
    const fade = useRef(1);
    const fadingOut = useRef(false);
    const nextIndex = useRef(1 % LAPTOP_SCREEN_SLIDES.length);

    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    const paintLaptop = (index: number, mixNext?: { index: number; amount: number }) => {
        const canvas = canvasRef.current;
        const screenCanvas = screenCanvasRef.current;
        const composed = composedRef.current;
        const base = baseMapRef.current;
        const material = materialRef.current;
        if (!canvas || !screenCanvas || !composed || !base?.image || !material) return;

        const ctx = canvas.getContext("2d");
        const screenCtx = screenCanvas.getContext("2d");
        if (!ctx || !screenCtx) return;

        const scale = LAPTOP_TEXTURE_SIZE / LAPTOP_ATLAS_SIZE;
        const dx = LAPTOP_SCREEN_RECT.x * scale;
        const dy = LAPTOP_SCREEN_RECT.y * scale;
        const dw = LAPTOP_SCREEN_RECT.w * scale;
        const dh = LAPTOP_SCREEN_RECT.h * scale;

        ctx.clearRect(0, 0, LAPTOP_TEXTURE_SIZE, LAPTOP_TEXTURE_SIZE);
        ctx.drawImage(base.image, 0, 0, LAPTOP_TEXTURE_SIZE, LAPTOP_TEXTURE_SIZE);

        screenCtx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

        const current = imageFromTexture(slideTextures[index]);
        if (current) {
            drawBlurredScreen(screenCtx, current, screenCanvas.width, screenCanvas.height, { fit: "cover", alignY: "top" });
        }

        if (mixNext && mixNext.amount > 0) {
            const incoming = imageFromTexture(slideTextures[mixNext.index]);
            if (incoming) {
                screenCtx.globalAlpha = mixNext.amount;
                drawBlurredScreen(screenCtx, incoming, screenCanvas.width, screenCanvas.height, { fit: "cover", alignY: "top" });
                screenCtx.globalAlpha = 1;
            }
        }

        ctx.drawImage(screenCanvas, dx, dy, dw, dh);
        composed.needsUpdate = true;
        material.needsUpdate = true;
    };

    useEffect(() => {
        slideTextures.forEach((texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
        });

        let target: THREE.Mesh | null = null;
        clonedScene.traverse((object) => {
            if (!target && (object as THREE.Mesh).isMesh) target = object as THREE.Mesh;
        });
        if (!target) return;

        const material = (target as THREE.Mesh).material as THREE.MeshStandardMaterial;
        const base = material.map;
        if (!base?.image) return;

        const canvas = document.createElement("canvas");
        canvas.width = LAPTOP_TEXTURE_SIZE;
        canvas.height = LAPTOP_TEXTURE_SIZE;

        const scale = LAPTOP_TEXTURE_SIZE / LAPTOP_ATLAS_SIZE;
        const screenCanvas = document.createElement("canvas");
        screenCanvas.width = Math.round(LAPTOP_SCREEN_RECT.w * scale);
        screenCanvas.height = Math.round(LAPTOP_SCREEN_RECT.h * scale);

        const composed = new THREE.CanvasTexture(canvas);
        composed.flipY = base.flipY;
        composed.wrapS = base.wrapS;
        composed.wrapT = base.wrapT;
        composed.colorSpace = THREE.SRGBColorSpace;
        sharpenCanvasTexture(composed);

        materialRef.current = material;
        baseMapRef.current = base;
        canvasRef.current = canvas;
        screenCanvasRef.current = screenCanvas;
        composedRef.current = composed;
        material.map = composed;

        slideIndex.current = 0;
        nextIndex.current = 1 % LAPTOP_SCREEN_SLIDES.length;
        fade.current = 1;
        fadingOut.current = false;
        lastSwap.current = performance.now();
        paintLaptop(0);

        return () => {
            material.map = base;
            material.needsUpdate = true;
            composed.dispose();
            materialRef.current = null;
            baseMapRef.current = null;
            canvasRef.current = null;
            screenCanvasRef.current = null;
            composedRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clonedScene, slideTextures]);

    const intrinsicHeight = useMemo(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        clonedScene.position.sub(center);
        return size.y || 1;
    }, [clonedScene]);

    useFrame((state, delta) => {
        if (!group.current) return;

        const target = range(progressRef.current, LAPTOP_ENTER_START, LAPTOP_ENTER_END);
        displayed.current = THREE.MathUtils.damp(displayed.current, target, 7, delta);
        const p = displayed.current;

        const { width, height } = state.viewport;

        const move = easeOutCubic(p);
        const settle = easeOutBack(p);

        const startX = -width * 1.3;
        const endX = -width * 0.26;
        const endY = -height * 0.02;

        const bob = Math.sin(state.clock.elapsedTime * 1.1) * height * 0.01 * p;
        const arc = Math.sin((1 - p) * Math.PI) * height * 0.1;

        group.current.position.x = THREE.MathUtils.lerp(startX, endX, move);
        group.current.position.y = endY + arc + bob;
        group.current.position.z = THREE.MathUtils.lerp(-3.5, 0, move);

        group.current.rotation.y = LAPTOP_YAW_END - (1 - settle) * LAPTOP_YAW_SWING;
        group.current.rotation.x = THREE.MathUtils.lerp(LAPTOP_TILT_X * 1.3, LAPTOP_TILT_X, move);
        group.current.rotation.z = (1 - move) * LAPTOP_ROLL_IN;

        const targetHeight = height * 0.42;
        group.current.scale.setScalar(targetHeight / intrinsicHeight);

        if (LAPTOP_SCREEN_SLIDES.length < 2 || !composedRef.current) return;

        const now = performance.now();
        if (!fadingOut.current && now - lastSwap.current > SCREEN_SLIDE_MS) {
            fadingOut.current = true;
            nextIndex.current = (slideIndex.current + 1) % LAPTOP_SCREEN_SLIDES.length;
        }

        if (fadingOut.current) {
            fade.current = Math.max(0, fade.current - delta * (1000 / SCREEN_CROSSFADE_MS));
            if (fade.current <= 0) {
                slideIndex.current = nextIndex.current;
                paintLaptop(slideIndex.current);
                fade.current = 1;
                fadingOut.current = false;
                lastSwap.current = now;
            } else {
                paintLaptop(slideIndex.current, { index: nextIndex.current, amount: 1 - fade.current });
            }
        }
    });

    return (
        <group ref={group}>
            <primitive object={clonedScene} />
        </group>
    );
}

function DeferredLaptop({ progressRef }: ModelProps) {
    const [armed, setArmed] = useState(false);

    useFrame(() => {
        if (!armed && progressRef.current > LAPTOP_ENTER_START - 0.2) setArmed(true);
    });

    if (!armed) return null;

    return (
        <Suspense fallback={null}>
            <LaptopModel progressRef={progressRef} />
        </Suspense>
    );
}

useGLTF.preload("/models/phone/scene.gltf");

interface DeviceSceneProps {
    progressRef: MutableRefObject<number>;
}

export function DeviceScene({ progressRef }: DeviceSceneProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }} style={{ pointerEvents: "none" }}>
            <ambientLight intensity={1.15} />
            <directionalLight position={[3, 5, 5]} intensity={1.35} />
            <directionalLight position={[-3, -2, 4]} intensity={0.45} />

            <directionalLight position={[-5, 3, -4]} intensity={0.9} color="#5eead4" />
            <Suspense fallback={null}>
                <PhoneModel progressRef={progressRef} />
            </Suspense>
            <DeferredLaptop progressRef={progressRef} />
        </Canvas>
    );
}
