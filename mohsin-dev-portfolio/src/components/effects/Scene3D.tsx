"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingCrystal({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleCloud() {
  const count = 120;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22d3ee" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function SceneContent({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.15,
      0.05,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * 0.08,
      0.05,
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#a855f7" />
      <Stars radius={80} depth={50} count={800} factor={3} saturation={0} fade speed={0.5} />
      <ParticleCloud />
      <FloatingCrystal position={[-3, 1, -2]} color="#22d3ee" scale={0.8} />
      <FloatingCrystal position={[4, -0.5, -3]} color="#a855f7" scale={1.1} />
      <FloatingCrystal position={[0, 2, -4]} color="#6366f1" scale={0.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[30, 30, 20, 20]} />
        <meshStandardMaterial
          color="#0a1628"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

type Scene3DProps = {
  mouseX?: number;
  mouseY?: number;
  className?: string;
};

export function Scene3D({ mouseX = 0, mouseY = 0, className }: Scene3DProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
