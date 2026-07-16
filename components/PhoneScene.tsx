'use client'

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const SCREEN_MESH_NAME = "baf05346569e3be49c2a";

// The original screen mesh's UVs are unusable for a single decal (they were authored
// for a tiling pattern, spanning several tiles instead of one 0-1 rectangle). Instead
// of fighting that mapping, we attach a plain plane sized from the mesh's own local
// bounding box — giving the screenshot its own clean, correctly proportioned surface.
const SCREEN_MARGIN = 0.95;

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

interface PhoneModelProps {
    progressRef: MutableRefObject<number>;
    travelEnd: number;
}

const TILT_START = THREE.MathUtils.degToRad(-14);
const TILT_END = THREE.MathUtils.degToRad(14);

function PhoneModel({ progressRef, travelEnd }: PhoneModelProps) {
    const { scene } = useGLTF("/models/phone/scene.gltf");
    const screenTexture = useTexture("/screens/hero.png");
    const group = useRef<THREE.Group>(null!);
    const displayed = useRef(0);

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

        screenTexture.colorSpace = THREE.SRGBColorSpace;
        screenTexture.needsUpdate = true;

        screenMesh.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const plane = attachScreenPlane(screenMesh, screenTexture);

        return () => {
            screenMesh.remove(plane);
            plane.geometry.dispose();
            (plane.material as THREE.Material).dispose();
        };
    }, [clonedScene, screenTexture]);

    useFrame((state, delta) => {
        if (!group.current) return;

        const target = Math.min(1, progressRef.current / travelEnd);
        displayed.current = THREE.MathUtils.damp(displayed.current, target, 6, delta);
        const p = displayed.current;

        const { width, height } = state.viewport;

        const startX = width * 0.26;
        const endX = -width * 0.26;
        const startY = height * 0.08;
        const endY = -height * 0.11;

        // Idle float: present while resting at either end (p near 0 or 1),
        // fades out during the active travel so the crossing reads as deliberate.
        const restFactor = 1 - 4 * p * (1 - p);
        const bob = Math.sin(state.clock.elapsedTime * 1.1) * height * 0.012 * restFactor;

        group.current.position.x = THREE.MathUtils.lerp(startX, endX, p);
        group.current.position.y = THREE.MathUtils.lerp(startY, endY, p) + bob;
        group.current.rotation.z = THREE.MathUtils.lerp(TILT_START, TILT_END, p);
        group.current.rotation.y = p * Math.PI * 2;

        const targetHeight = height * 0.7;
        const scale = targetHeight / intrinsicHeight;
        group.current.scale.setScalar(scale);
    });

    return (
        <group ref={group}>
            <primitive object={clonedScene} />
        </group>
    );
}

useGLTF.preload("/models/phone/scene.gltf");

interface PhoneSceneProps {
    progressRef: MutableRefObject<number>;
    travelEnd?: number;
}

export function PhoneScene({ progressRef, travelEnd = 0.45 }: PhoneSceneProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 5, 5]} intensity={1.4} />
            <directionalLight position={[-3, -2, 4]} intensity={0.5} />
            <Suspense fallback={null}>
                <PhoneModel progressRef={progressRef} travelEnd={travelEnd} />
            </Suspense>
        </Canvas>
    );
}
