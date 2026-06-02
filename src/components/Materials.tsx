import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type * as React from "react";
import * as THREE from "three";
// Properly importing your local asset
import luxuryRetailer from "../assets/luxuryRetailer.mp4";
import commercialKitchen from "../assets/commerical.mp4"
import showroom from "../assets/showroom.mp4"
import turnkey from "../assets/turnkey.mp4"
import cabinetBg from "../assets/Modular-Indian-Kitchen-Designs-with-peach-tones_0_1200.jpg.webp";
import { useTexture } from "@react-three/drei";

import woodTexture from "../assets/walnut.jpg";
import marbleTexture from "../assets/marbel.jpg";
import blackTexture from "../assets/matte-black.jpg";
import brassTexture from "../assets/brass.jpg";

function Sample({ shape, color, roughness, metalness, position }: {
  shape: "box" | "sphere" | "cyl"; color: string; roughness: number; metalness: number; position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    // FIXED: Using state.clock.elapsedTime directly avoids the THREE.Clock initialization warning entirely
    const time = state.clock.elapsedTime;
    
    // Smooth, cinematic baseline movement
    ref.current.rotation.x = time * 0.2;
    ref.current.rotation.y = time * 0.25;
    ref.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.08;
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      {shape === "box" && <boxGeometry args={[1, 1, 1]} />}
      {shape === "sphere" && <sphereGeometry args={[0.6, 64, 64]} />}
      {shape === "cyl" && <cylinderGeometry args={[0.55, 0.55, 0.4, 64]} />}
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

const materials = [
  {
    id: 1,
    title: "Luxury Retail Interiors",
    description: "Premium fashion boutiques and flagship stores.",
    video: luxuryRetailer,
    shape: "box" as const,
    color: "#c9a36b",
    r: 0.2,
    m: 0.8,
  },
  {
    id: 2,
    title: "Commercial Spaces",
    description: "Workspaces crafted for productivity and brand identity.",
    video: commercialKitchen,
    shape: "sphere" as const,
    color: "#3a2418",
    r: 0.6,
    m: 0.1,
  },
  {
    id: 3,
    title: "Showroom Experiences",
    description: "Immersive environments designed to increase conversions.",
    video: showroom,
    shape: "cyl" as const,
    color: "#4a5568",
    r: 0.4,
    m: 0.5,
  },
  {
    id: 4,
    title: "Turnkey Solutions",
    description: "From concept to execution under one roof.",
    video: turnkey,
    shape: "box" as const,
    color: "#1a202c",
    r: 0.1,
    m: 0.9,
  },
];

export function Materials() {
  return (
    <section id="collection" className="relative py-[18vh] px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="01" label="Materiality" />
        <h2 className="font-display text-4xl md:text-7xl leading-[1] max-w-4xl text-balance">
          Materials that <em className="brass-text not-italic">age beautifully</em>.
        </h2>
        <p className="mt-6 max-w-md text-muted-foreground">
          Every surface is selected for the way it catches morning light, the way it feels under a fingertip,
          and the patina it earns over a decade of family dinners.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
          {materials.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background relative aspect-[3/4] group overflow-hidden border border-border/10 cursor-pointer"
            >
              {/* ThreeJS Background Canvas - Always visible up front, smoothly transitions out on hover */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                <Canvas camera={{ position: [0, 0, 3], fov: 35 }} dpr={[1, 1.5]}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <spotLight position={[3, 4, 2]} intensity={1.4} color="#ffd9a8" angle={0.4} penumbra={0.7} />
                    <pointLight position={[-2, -1, 2]} intensity={0.3} color="#7aa" />
                    <Sample shape={m.shape} color={m.color} roughness={m.r} metalness={m.m} position={[0, 0, 0]} />
                  </Suspense>
                </Canvas>
              </div>

              {/* Video Overlay - Switches into play cleanly behind a glass-dark veneer on hover */}
<div className="absolute inset-0 opacity-100 z-0">
                <video
                  key={m.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                >
                  <source src={m.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
              </div>

              {/* Content Card Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 pointer-events-none">
                <h3 className="text-xl font-display text-foreground group-hover:text-white transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground group-hover:text-zinc-300 transition-colors duration-300 line-clamp-2">
                  {m.description}
                </p>
              </div>
              
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-[10px] uppercase tracking-[0.5em] text-primary">{index}</span>
      <span className="w-16 h-px bg-primary/40" />
      <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">{label}</span>
    </div>
  );
}

// ---------- Engineering Section (exploded cabinet) ----------
function ExplodedCabinet({ progress }: { progress: React.MutableRefObject<number> }) {
  const top = useRef<THREE.Mesh>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const back = useRef<THREE.Mesh>(null);
  const shelf = useRef<THREE.Mesh>(null);
  const door = useRef<THREE.Mesh>(null);
  const handle = useRef<THREE.Mesh>(null);
  const grp = useRef<THREE.Group>(null);

  const woodMap = useTexture(woodTexture);
const marbleMap = useTexture(marbleTexture);
const blackMap = useTexture(blackTexture);
const brassMap = useTexture(brassTexture);



woodMap.wrapS = woodMap.wrapT = THREE.RepeatWrapping;
woodMap.repeat.set(2, 2);

  useFrame((s) => {
    const p = progress.current;
    if (grp.current) grp.current.rotation.y = s.clock.elapsedTime * 0.15;
    const lerp = THREE.MathUtils.lerp;
    if (top.current) top.current.position.y = lerp(top.current.position.y, 1 + p * 0.8, 0.08);
    if (left.current) left.current.position.x = lerp(left.current.position.x, -0.8 - p * 0.8, 0.08);
    if (right.current) right.current.position.x = lerp(right.current.position.x, 0.8 + p * 0.8, 0.08);
    if (back.current) back.current.position.z = lerp(back.current.position.z, -0.5 - p * 0.8, 0.08);
    if (shelf.current) shelf.current.position.y = lerp(shelf.current.position.y, 0 + p * 0.2, 0.08);
    if (door.current) door.current.position.z = lerp(door.current.position.z, 0.5 + p * 1.0, 0.08);
    if (handle.current) handle.current.position.z = lerp(handle.current.position.z, 0.55 + p * 1.0, 0.08);
  });

  const wood = <meshStandardMaterial color="#3a2418" roughness={0.55} metalness={0.1} />;
  const matte = <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.2} />;
  const brass = <meshStandardMaterial color="#c9a36b" roughness={0.2} metalness={0.95} />;

  return (
    <group ref={grp}>
      <mesh ref={top} position={[0, 1, 0]}>
  <boxGeometry args={[1.7, 0.06, 1]} />
  <meshStandardMaterial map={marbleMap} />
</mesh>

<mesh ref={left} position={[-0.8, 0, 0]}>
  <boxGeometry args={[0.06, 2, 1]} />
  <meshStandardMaterial map={woodMap} />
</mesh>

<mesh ref={right} position={[0.8, 0, 0]}>
  <boxGeometry args={[0.06, 2, 1]} />
  <meshStandardMaterial map={woodMap} />
</mesh>

<mesh ref={back} position={[0, 0, -0.5]}>
  <boxGeometry args={[1.7, 2, 0.04]} />
  <meshStandardMaterial map={woodMap} />
</mesh>

<mesh ref={door} position={[0, 0, 0.5]}>
  <boxGeometry args={[1.6, 1.9, 0.04]} />
  <meshStandardMaterial map={blackMap} />
</mesh>

<mesh ref={handle} position={[0.5, 0, 0.55]}>
  <boxGeometry args={[0.3, 0.02, 0.02]} />
  <meshStandardMaterial
    map={brassMap}
    metalness={1}
    roughness={0.15}
  />
</mesh>
    </group>
  );
}

export function Engineering() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useRef(0);
  useTransform(scrollYProgress, (v) => (progress.current = THREE.MathUtils.clamp((v - 0.2) * 1.6, 0, 1)));

  const features = [
    { t: "Soft-close hinges", n: "Blum® Aventos" },
    { t: "Hidden storage", n: "Push-to-open systems" },
    { t: "Modular construction", n: "18mm marine ply core" },
    { t: "Premium hardware", n: "Solid brass fittings" },
  ];

  return (
    <section ref={ref} id="craft" className="relative py-[18vh] px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel index="02" label="Engineering" />
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            Precision you can <em className="brass-text not-italic">feel</em> in the close of a drawer.
          </h2>
          <div className="mt-12 space-y-px bg-border/40">
            {features.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-background py-5 flex items-baseline justify-between"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">0{i + 1}</div>
                  <div className="font-display text-2xl">{f.t}</div>
                </div>
                <div className="text-xs text-muted-foreground">{f.n}</div>
              </motion.div>
            ))}
          </div>
        </div>
       <div className="relative h-[70vh] glass rounded-sm overflow-hidden">
  
  {/* Background Image */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `url(${cabinetBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50 z-[1]" />

  {/* ThreeJS Canvas */}
  <div className="absolute inset-0 z-10">
    <Canvas camera={{ position: [3.5, 2, 4], fov: 35 }} dpr={[1, 1.6]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 6, 3]}
          angle={0.5}
          penumbra={0.8}
          intensity={2}
          color="#ffd9a8"
        />
        <pointLight
          position={[-3, 1, 2]}
          intensity={1}
          color="#8ab"
        />
        <ExplodedCabinet progress={progress} />
      </Suspense>
    </Canvas>
  </div>

  <div className="absolute top-6 left-6 z-20 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
    Exploded view — scroll to assemble
  </div>

</div>
      </div>
    </section>
  );
}