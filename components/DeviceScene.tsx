'use client'

import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const SCREEN_MESH_NAME = "baf05346569e3be49c2a";
const SCREEN_MARGIN = 0.95;

const PHONE_EXIT_START = 0.08;
const PHONE_EXIT_END = 0.5;
const LAPTOP_ENTER_START = 0.32;
const LAPTOP_ENTER_END = 0.8;

const PHONE_TILT_START = THREE.MathUtils.degToRad(-14);
const PHONE_TILT_END = THREE.MathUtils.degToRad(14);

const LAPTOP_ATLAS_SIZE = 4096;
const LAPTOP_TEXTURE_SIZE = 2048;
const LAPTOP_SCREEN_RECT = { x: 26, y: 1445, w: 2015, h: 1294 };
const LAPTOP_SCREEN_SOURCE = { x: 150, y: 150, w: 1310, h: 845 };

const LAPTOP_TILT_X = THREE.MathUtils.degToRad(16);
const LAPTOP_YAW_END = THREE.MathUtils.degToRad(-12);
const LAPTOP_YAW_SWING = THREE.MathUtils.degToRad(150);
const LAPTOP_ROLL_IN = THREE.MathUtils.degToRad(-6);

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

function attachScreenPlane(screenMesh: THREE.Mesh, texture: THREE.Texture) {
    const geometry = screenMesh.geometry;
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const material = new THREE.MeshBasicMaterial({ map: texture });
    let plane: THREE.Mesh;

    if (size.z <= size.x && size.z <= size.y) {
        plane = new THREE.Mesh(new THREE.PlaneGeometry(size.x * SCREEN_MARGIN, size.y * SCREEN_MARGIN), material);
        plane.position.set(center.x, center.y, center.z + Math.sign(center.z || 1) * (size.z / 2 + 0.002));
    } else if (size.x <= size.y && size.x <= size.z) {
        plane = new THREE.Mesh(new THREE.PlaneGeometry(size.z * SCREEN_MARGIN, size.y * SCREEN_MARGIN), material);
        plane.rotation.y = Math.PI / 2;
        plane.position.set(center.x + Math.sign(center.x || 1) * (size.x / 2 + 0.002), center.y, center.z);
    } else {
        plane = new THREE.Mesh(new THREE.PlaneGeometry(size.x * SCREEN_MARGIN, size.z * SCREEN_MARGIN), material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(center.x, center.y + Math.sign(center.y || 1) * (size.y / 2 + 0.002), center.z);
    }

    screenMesh.add(plane);
    return plane;
}

interface ModelProps {
    progressRef: MutableRefObject<number>;
}

function PhoneModel({ progressRef }: ModelProps) {
    const { scene } = useGLTF("/models/phone/scene.gltf");
    const [screenTextureFront, screenTextureBack] = useTexture(["/screens/hero.png", "/screens/hero-dashboard-example.jpg"]);
    const group = useRef<THREE.Group>(null!);
    const planeRef = useRef<THREE.Mesh | null>(null);
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
        const screenMesh = clonedScene.getObjectByName(SCREEN_MESH_NAME) as THREE.Mesh | undefined;
        if (!screenMesh) return;

        screenTextureFront.colorSpace = THREE.SRGBColorSpace;
        screenTextureFront.needsUpdate = true;
        screenTextureBack.colorSpace = THREE.SRGBColorSpace;
        screenTextureBack.needsUpdate = true;

        screenMesh.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const plane = attachScreenPlane(screenMesh, screenTextureFront);
        planeRef.current = plane;
        showingBack.current = false;

        return () => {
            screenMesh.remove(plane);
            plane.geometry.dispose();
            (plane.material as THREE.Material).dispose();
            planeRef.current = null;
        };
    }, [clonedScene, screenTextureFront, screenTextureBack]);

    useFrame((state, delta) => {
        if (!group.current) return;

        const target = range(progressRef.current, PHONE_EXIT_START, PHONE_EXIT_END);
        displayed.current = THREE.MathUtils.damp(displayed.current, target, 5, delta);
        const p = displayed.current;

        const { width, height } = state.viewport;

        const move = THREE.MathUtils.lerp(p, easeInCubic(p), 0.35);
        const spin = easeInOutCubic(p);

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

        const wantsBack = p >= 0.45;
        const isHidden = Math.cos(group.current.rotation.y) < -0.1;
        if (wantsBack !== showingBack.current && isHidden && planeRef.current) {
            const material = planeRef.current.material as THREE.MeshBasicMaterial;
            material.map = wantsBack ? screenTextureBack : screenTextureFront;
            material.needsUpdate = true;
            showingBack.current = wantsBack;
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
    const screenTexture = useTexture("/screens/laptop-screen-placeholder.jpg");
    const group = useRef<THREE.Group>(null!);
    const displayed = useRef(0);

    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    useEffect(() => {
        let target: THREE.Mesh | null = null;
        clonedScene.traverse((object) => {
            if (!target && (object as THREE.Mesh).isMesh) target = object as THREE.Mesh;
        });
        if (!target) return;

        const material = (target as THREE.Mesh).material as THREE.MeshStandardMaterial;
        const base = material.map;
        const source = screenTexture.image as CanvasImageSource | undefined;
        if (!base?.image || !source) return;

        const canvas = document.createElement("canvas");
        canvas.width = LAPTOP_TEXTURE_SIZE;
        canvas.height = LAPTOP_TEXTURE_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scale = LAPTOP_TEXTURE_SIZE / LAPTOP_ATLAS_SIZE;
        ctx.drawImage(base.image, 0, 0, LAPTOP_TEXTURE_SIZE, LAPTOP_TEXTURE_SIZE);
        ctx.drawImage(
            source,
            LAPTOP_SCREEN_SOURCE.x, LAPTOP_SCREEN_SOURCE.y, LAPTOP_SCREEN_SOURCE.w, LAPTOP_SCREEN_SOURCE.h,
            LAPTOP_SCREEN_RECT.x * scale, LAPTOP_SCREEN_RECT.y * scale,
            LAPTOP_SCREEN_RECT.w * scale, LAPTOP_SCREEN_RECT.h * scale
        );

        const composed = new THREE.CanvasTexture(canvas);
        composed.flipY = base.flipY;
        composed.wrapS = base.wrapS;
        composed.wrapT = base.wrapT;
        composed.colorSpace = THREE.SRGBColorSpace;

        material.map = composed;
        material.needsUpdate = true;

        return () => {
            material.map = base;
            material.needsUpdate = true;
            composed.dispose();
        };
    }, [clonedScene, screenTexture]);

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
        displayed.current = THREE.MathUtils.damp(displayed.current, target, 5, delta);
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
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 5, 5]} intensity={1.4} />
            <directionalLight position={[-3, -2, 4]} intensity={0.5} />
            <Suspense fallback={null}>
                <PhoneModel progressRef={progressRef} />
            </Suspense>
            <DeferredLaptop progressRef={progressRef} />
        </Canvas>
    );
}
