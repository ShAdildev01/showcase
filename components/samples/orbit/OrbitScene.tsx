"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const satelliteCount = 28;

function Sculpture() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const swarm = useRef<THREE.Group>(null);

  const satellites = useMemo(
    () =>
      Array.from({ length: satelliteCount }, (_, i) => {
        const angle = (i / satelliteCount) * Math.PI * 2;
        const radius = 2.7 + (i % 3) * 0.28;
        return {
          position: [Math.cos(angle) * radius, Math.sin(i * 1.7) * 0.9, Math.sin(angle) * radius] as [number, number, number],
          size: 0.035 + (i % 4) * 0.018,
        };
      }),
    []
  );

  useFrame((state, dt) => {
    if (!group.current || !ringA.current || !ringB.current || !swarm.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.9, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.5, 3, dt);
    ringA.current.rotation.z += dt * 0.28;
    ringB.current.rotation.x += dt * 0.2;
    swarm.current.rotation.y -= dt * 0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#1A1815" metalness={0.8} roughness={0.3} flatShading />
      </mesh>
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#E2541B" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.85, 0.022, 16, 180]} />
        <meshStandardMaterial color="#E2541B" emissive="#E2541B" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.25, 0.014, 16, 180]} />
        <meshStandardMaterial color="#1A1815" metalness={0.9} roughness={0.25} />
      </mesh>
      <group ref={swarm}>
        {satellites.map((s, i) => (
          <mesh key={i} position={s.position}>
            <sphereGeometry args={[s.size, 16, 16]} />
            <meshStandardMaterial color={i % 5 === 0 ? "#E2541B" : "#1A1815"} metalness={0.6} roughness={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function OrbitScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.4], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#fff4e2", "#8a8272", 0.8]} />
      <directionalLight position={[4, 5, 3]} intensity={2.6} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#E2541B" />
      <Sculpture />
    </Canvas>
  );
}
