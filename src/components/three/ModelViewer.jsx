"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model({ url }) {
    const { scene } = useGLTF(url);
    const ref = useRef();

    const clock = useRef(0);

    // Dao động cực nhẹ
    useFrame((_, delta) => {
        clock.current += delta;
        if (ref.current) {
            ref.current.rotation.y = Math.sin(clock.current * 0.3) * (Math.PI / 90);  // ±2°
            ref.current.rotation.x = Math.sin(clock.current * 0.2) * (Math.PI / 360); // ±0.5°
        }
    });

    return <primitive ref={ref} object={scene} />;
}

export default function ModelViewer({ url, className = "" }) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [2.47, -3.53, 16.97], fov: 35 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <Suspense fallback={null}>
                    <Model url={url} />
                    <Environment preset="studio" />
                </Suspense>
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    target={[5, 0, 0]}
                    onEnd={(e) => {
                        const cam = e.target.object;
                        const dist = cam.position.distanceTo(e.target.target);
                    }}
                />
            </Canvas>
        </div>
    );
}
