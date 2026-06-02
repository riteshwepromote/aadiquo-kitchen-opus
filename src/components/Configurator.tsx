import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { SectionLabel } from "./Materials";

// -------- Configurator --------
const WOODS = [
  { name: "Walnut", color: "#3a2418" },
  { name: "Smoked Oak", color: "#5b3f28" },
  { name: "Ebony", color: "#1a1410" },
];
const TOPS = [
  { name: "Calacatta", color: "#ece6d8" },
  { name: "Pietra Grey", color: "#3b3a37" },
  { name: "Travertine", color: "#c6b294" },
];
const ACCENTS = [
  { name: "Brass", color: "#c9a36b" },
  { name: "Chrome", color: "#d6d6d6" },
  { name: "Bronze", color: "#6b4a2a" },
];

function ConfigKitchen({ wood, top, accent, warm }: { wood: string; top: string; accent: string; warm: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.4; });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[3, 1, 1.2]} /><meshStandardMaterial color={wood} roughness={0.55} metalness={0.15} /></mesh>
      <mesh position={[0, 1.05, 0]}><boxGeometry args={[3.2, 0.08, 1.35]} /><meshStandardMaterial color={top} roughness={0.3} metalness={0.05} /></mesh>
      <mesh position={[-0.7, 0.65, 0.61]}><boxGeometry args={[1.2, 0.03, 0.02]} /><meshStandardMaterial color={accent} roughness={0.2} metalness={0.9} /></mesh>
      <mesh position={[0.7, 0.65, 0.61]}><boxGeometry args={[1.2, 0.03, 0.02]} /><meshStandardMaterial color={accent} roughness={0.2} metalness={0.9} /></mesh>
      <pointLight position={[0, 0.95, 0.8]} color="#ffb968" intensity={warm} distance={3} />
      <rectAreaLight position={[0, 2, -0.2]} width={2.5} height={0.2} intensity={warm * 1.5} color="#ffd9a8" rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

export function Configurator() {
  const [wood, setWood] = useState(WOODS[0]);
  const [top, setTop] = useState(TOPS[0]);
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [warm, setWarm] = useState(2);

  return (
    <section id="configurator" className="relative py-[18vh] px-6 md:px-14 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="03" label="Configurator" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="relative h-[70vh] glass">
            <Canvas camera={{ position: [4, 2.5, 4.5], fov: 35 }} dpr={[1, 1.6]} shadows>
              <color attach="background" args={["#0d0c0b"]} />
              <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                <spotLight position={[5, 6, 3]} intensity={1.5} angle={0.4} penumbra={0.8} color="#ffd9a8" castShadow />
                <ConfigKitchen wood={wood.color} top={top.color} accent={accent.color} warm={warm} />
                <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#0a0908" roughness={0.7} metalness={0.4} /></mesh>
              </Suspense>
            </Canvas>
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-2">Compose <em className="brass-text not-italic">your kitchen</em>.</h2>
            <p className="text-sm text-muted-foreground mb-10">Live preview. Every surface reacts in real time.</p>
            <OptionRow label="Wood" options={WOODS} value={wood.name} onChange={(o) => setWood(o)} />
            <OptionRow label="Countertop" options={TOPS} value={top.name} onChange={(o) => setTop(o)} />
            <OptionRow label="Hardware" options={ACCENTS} value={accent.name} onChange={(o) => setAccent(o)} />
            <div className="py-6 border-t border-border/40">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Ambient lighting</div>
              <input type="range" min={0} max={6} step={0.1} value={warm}
                onChange={(e) => setWarm(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OptionRow<T extends { name: string; color: string }>({ label, options, value, onChange }:
  { label: string; options: T[]; value: string; onChange: (o: T) => void; }) {
  return (
    <div className="py-6 border-t border-border/40">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{label}</div>
      <div className="flex gap-3">
        {options.map((o) => (
          <button key={o.name} onClick={() => onChange(o)}
            className={`group flex items-center gap-3 text-left transition-opacity ${value === o.name ? "opacity-100" : "opacity-50 hover:opacity-100"}`}>
            <span className="block w-10 h-10 rounded-sm border border-border" style={{ background: o.color, boxShadow: value === o.name ? "0 0 0 1px var(--brass)" : undefined }} />
            <span className="text-xs">{o.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// -------- Storage Innovation --------
export function Storage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25%" });
  const items = [
    { t: "Soft-glide drawers", w: 90 },
    { t: "Rotating corner units", w: 75 },
    { t: "Tall pantry pull-outs", w: 95 },
    { t: "Motorised appliance lifts", w: 60 },
  ];
  return (
    <section ref={ref} className="relative py-[20vh] px-6 md:px-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-warm)" }} />
      <div className="max-w-7xl mx-auto relative">
        <SectionLabel index="04" label="Storage Innovation" />
        <h2 className="font-display text-4xl md:text-7xl leading-[1] max-w-4xl text-balance">
          Every centimetre, <em className="brass-text not-italic">considered</em>.
        </h2>
        <div className="mt-20 space-y-10">
          {items.map((it, i) => (
            <div key={it.t} className="grid grid-cols-1 md:grid-cols-[1fr_3fr_auto] gap-6 items-center border-t border-border/40 pt-6">
              <div className="font-display text-2xl md:text-3xl">{it.t}</div>
              <div className="h-px bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${it.w}%` } : { width: 0 }}
                  transition={{ duration: 1.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{it.w}% efficiency</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
