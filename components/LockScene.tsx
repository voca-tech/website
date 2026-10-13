'use client'

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PadlockModelProps {
    progressRef?: MutableRefObject<number>;
}

function PadlockModel({ progressRef }: PadlockModelProps) {
    const { scene } = useGLTF("/models/lock/scene.glb");
    const group = useRef<THREE.Group>(null!);

    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        clone.position.sub(center);

        const targetSize = 2.4;
        const largestDimension = Math.max(size.x, size.y, size.z) || 1;
        clone.scale.setScalar(targetSize / largestDimension);

        return clone;
    }, [scene]);

    useFrame((state, delta) => {
        if (!group.current) return;
        const progress = progressRef?.current ?? 0;

        group.current.rotation.y += delta * (0.15 + progress * 0.9);
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
        group.current.position.x = (progress - 0.5) * 1.8;
    });

    return (
        <group ref={group} rotation={[0.3, 0, 0]}>
            <primitive object={clonedScene} />
        </group>
    );
}

useGLTF.preload("/models/lock/scene.glb");

interface LockSceneProps {
    progressRef?: MutableRefObject<number>;
}

export function LockScene({ progressRef }: LockSceneProps) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }} gl={{ alpha: true }} style={{ background: "transparent" }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[3, 4, 5]} intensity={1.1} />
            <directionalLight position={[-3, -2, 4]} intensity={0.4} />
            <pointLight position={[-2.5, 1, 2]} intensity={18} color="#8f7cff" />
            <pointLight position={[2.5, -1, 2]} intensity={14} color="#2dd4bf" />
            <Suspense fallback={null}>
                <PadlockModel progressRef={progressRef} />
            </Suspense>
        </Canvas>
    );
}
