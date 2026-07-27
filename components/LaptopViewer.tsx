'use client'

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function LaptopModel() {
    const { scene } = useGLTF("/models/laptop/scene.glb");
    const group = useRef<THREE.Group>(null!);

    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        clone.position.sub(center);
        const scale = 2.1 / (size.y || 1);
        clone.scale.setScalar(scale);
        return clone;
    }, [scene]);

    useFrame((state) => {
        if (!group.current) return;
        group.current.position.y = -0.55 + Math.sin(state.clock.elapsedTime * 1.1) * 0.06;
    });

    return (
        <group ref={group}>
            <primitive object={clonedScene} />
        </group>
    );
}

useGLTF.preload("/models/laptop/scene.glb");

interface LaptopViewerProps {
    interactive?: boolean;
}

export function LaptopViewer({ interactive = true }: LaptopViewerProps) {
    return (
        <Canvas camera={{ position: [0, 2.2, 6.8], fov: 32 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 5, 5]} intensity={1.4} />
            <directionalLight position={[-3, -2, 4]} intensity={0.5} />
            <Suspense fallback={null}>
                <LaptopModel />
            </Suspense>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={interactive}
                minPolarAngle={THREE.MathUtils.degToRad(30)}
                maxPolarAngle={THREE.MathUtils.degToRad(85)}
                autoRotate
                autoRotateSpeed={0.7}
            />
        </Canvas>
    );
}
