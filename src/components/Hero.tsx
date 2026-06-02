import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function KitchenIsland({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const drawer1 = useRef<THREE.Mesh>(null);
  const drawer2 = useRef<THREE.Mesh>(null);
  const cabinetL = useRef<THREE.Group>(null);
  const cabinetR = useRef<THREE.Group>(null);
  const underLight = useRef<THREE.PointLight>(null);
  const topLight = useRef<THREE.RectAreaLight>(null);

  useFrame((state) => {
    const p = scrollProgress.current;
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = -0.35 + Math.sin(t * 0.2) * 0.05 + p * 0.6;
      group.current.position.y = -0.2 + Math.sin(t * 0.4) * 0.02;
    }
    if (drawer1.current) drawer1.current.position.z = THREE.MathUtils.lerp(drawer1.current.position.z, 0.05 + p * 0.7, 0.08);
    if (drawer2.current) drawer2.current.position.z = THREE.MathUtils.lerp(drawer2.current.position.z, 0.05 + p * 0.5, 0.08);
    if (cabinetL.current) cabinetL.current.rotation.y = THREE.MathUtils.lerp(cabinetL.current.rotation.y, -p * 1.1, 0.08);
    if (cabinetR.current) cabinetR.current.rotation.y = THREE.MathUtils.lerp(cabinetR.current.rotation.y, p * 1.1, 0.08);
    if (underLight.current) underLight.current.intensity = 1.2 + p * 6;
    if (topLight.current) topLight.current.intensity = 2 + p * 8;
  });

  const wood = new THREE.MeshStandardMaterial({ color: "#3a2418", roughness: 0.55, metalness: 0.15 });
  const matte = new THREE.MeshStandardMaterial({ color: "#0c0c0c", roughness: 0.7, metalness: 0.2 });
  const marble = new THREE.MeshStandardMaterial({ color: "#e8e2d4", roughness: 0.25, metalness: 0.05 });
  const brass = new THREE.MeshStandardMaterial({ color: "#c9a36b", roughness: 0.2, metalness: 0.9 });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* island base */}
      <mesh position={[0, 0.5, 0]} material={wood}>
        <boxGeometry args={[3.6, 1, 1.4]} />
      </mesh>
      {/* matte black side panels */}
      <mesh position={[-1.81, 0.5, 0]} material={matte}><boxGeometry args={[0.02, 1, 1.4]} /></mesh>
      <mesh position={[1.81, 0.5, 0]} material={matte}><boxGeometry args={[0.02, 1, 1.4]} /></mesh>

      {/* marble countertop */}
      <mesh position={[0, 1.04, 0]} material={marble} castShadow>
        <boxGeometry args={[3.8, 0.08, 1.55]} />
      </mesh>

      {/* drawers */}
      <mesh ref={drawer1} position={[-1, 0.7, 0.05]} material={wood}>
        <boxGeometry args={[1.4, 0.25, 0.04]} />
      </mesh>
      <mesh ref={drawer2} position={[1, 0.7, 0.05]} material={wood}>
        <boxGeometry args={[1.4, 0.25, 0.04]} />
      </mesh>
      {/* brass handles */}
      <mesh position={[-1, 0.7, 0.08]} material={brass}><boxGeometry args={[0.7, 0.02, 0.02]} /></mesh>
      <mesh position={[1, 0.7, 0.08]} material={brass}><boxGeometry args={[0.7, 0.02, 0.02]} /></mesh>

      {/* tall cabinets */}
      <group ref={cabinetL} position={[-2.8, 1.3, -0.6]}>
        <mesh position={[0.4, 0, 0]} material={wood}>
          <boxGeometry args={[0.8, 2.6, 0.6]} />
        </mesh>
        <mesh position={[0.81, 0, 0]} material={brass}><boxGeometry args={[0.02, 0.3, 0.02]} /></mesh>
      </group>
      <group ref={cabinetR} position={[2.8, 1.3, -0.6]}>
        <mesh position={[-0.4, 0, 0]} material={wood}>
          <boxGeometry args={[0.8, 2.6, 0.6]} />
        </mesh>
        <mesh position={[-0.81, 0, 0]} material={brass}><boxGeometry args={[0.02, 0.3, 0.02]} /></mesh>
      </group>

      {/* overhead light strip */}
      <mesh position={[0, 2.4, -0.4]} material={matte}>
        <boxGeometry args={[3.2, 0.1, 0.4]} />
      </mesh>

      {/* lighting */}
      <pointLight ref={underLight} position={[0, 0.9, 0.9]} color="#ffb968" intensity={1.2} distance={4} />
      <rectAreaLight ref={topLight} position={[0, 2.35, -0.2]} width={3} height={0.3} intensity={2} color="#ffd9a8" rotation={[-Math.PI / 2, 0, 0]} />
      <pointLight position={[-3, 3, 2]} intensity={0.6} color="#9bb4cc" />
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial
        blur={[300, 100]} resolution={1024} mixBlur={1} mixStrength={40}
        roughness={0.85} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
        color="#0a0908" metalness={0.6} mirror={0.3}
      />
    </mesh>
  );
}

export function Hero() {
  const { scrollYProgress } = useScroll();
  const progress = useRef(0);
  useTransform(scrollYProgress, (v) => (progress.current = Math.min(1, v * 6)));

  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden grain">
      <div className="absolute inset-0" style={{ background: "var(--gradient-warm)" }} />

      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [4.5, 2.2, 5.5], fov: 35 }} dpr={[1, 1.6]}>
          <color attach="background" args={["#0a0908"]} />
          <fog attach="fog" args={["#0a0908", 8, 22]} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.15} />
            <spotLight position={[6, 8, 4]} angle={0.35} penumbra={0.8} intensity={1.2} color="#ffd9a8" castShadow />
            <KitchenIsland scrollProgress={progress} />
            <Floor />
            <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={14} blur={2.4} far={4} />
            <Environment preset="apartment" />
          </Suspense>
        </Canvas>
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.85)" }} />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-end pb-[12vh] px-6 text-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.5em] text-primary/80 mb-6"
        >
          Est. 2014 — Modular Atelier
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-8xl lg:text-[9rem] leading-[0.95] tracking-tight text-balance"
        >
          Where Luxury Meets <em className="brass-text not-italic">Functionality</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          className="mt-6 text-sm md:text-base text-muted-foreground max-w-xl"
        >
          Crafted modular kitchens for modern living. Designed in matte black, walnut and brass.
        </motion.p>
        <motion.a
          href="#collection"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.9, duration: 1 }}
          className="pointer-events-auto mt-10 group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-foreground"
        >
          <span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500" />
          Explore Collection
          <span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500" />
        </motion.a>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
      >
        Scroll — The kitchen awakens
      </motion.div>
    </section>
  );
}
