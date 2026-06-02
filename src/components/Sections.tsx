import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SectionLabel } from "./Materials";

import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.webp";
import project3 from "../assets/project3.jpg";
import project4 from "../assets/project4.jpg";
import project5 from "../assets/project5.jpg";

// -------- Difference / Stats --------
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 2.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{Math.round(val)}{suffix}</span>;
}

export function Difference() {
  const stats = [
    { n: 10, s: "+", l: "Years of craft" },
    { n: 500, s: "+", l: "Kitchens delivered" },
    { n: 98, s: "%", l: "Client satisfaction" },
    { n: 24, s: "mo", l: "Warranty included" },
  ];
  return (
    <section className="relative py-[20vh] px-6 md:px-14 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="05" label="The DC INTERIORS Difference" />
        <h2 className="font-display text-5xl md:text-[8rem] leading-[0.9] tracking-tight text-balance max-w-5xl">
          A studio, not a <em className="brass-text not-italic">factory</em>.
        </h2>
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40">
          {stats.map((s) => (
            <div key={s.l} className="bg-background p-8 md:p-10">
              <div className="font-display text-5xl md:text-7xl brass-text">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- Projects horizontal scroll --------
const PROJECTS = [
  {
    name: "Bandra Penthouse",
    place: "Mumbai",
    year: "2024",
    image: project1,
  },
  {
    name: "Marine Drive Residence",
    place: "Mumbai",
    year: "2024",
    image: project2,
  },
  {
    name: "Pali Hill Villa",
    place: "Mumbai",
    year: "2023",
    image: project3,
  },
  {
    name: "Aamby Valley Retreat",
    place: "Lonavala",
    year: "2023",
    image: project4,
  },
  {
    name: "Lutyens Townhouse",
    place: "Delhi",
    year: "2022",
    image: project5,
  },
];

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section id="projects" ref={wrapRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-14 mb-10">
          <SectionLabel index="06" label="Projects" />
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-4xl md:text-6xl">Selected <em className="brass-text not-italic">work</em>.</h2>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to explore</div>
          </div>
        </div>
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-14 will-change-transform">
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="relative shrink-0 w-[80vw] md:w-[55vw] aspect-[4/5] overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.8 0.1 75 / 0.18), transparent 60%)" }} />
              
              {/* Architectural layout detailing lines */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 border-t border-primary/10" />
              <div className="absolute inset-x-12 bottom-12 top-1/3 border border-primary/15" />
              <div className="absolute inset-x-20 bottom-20 top-[45%] border border-primary/10" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-2">N°0{i + 1}</div>
                  <div className="font-display text-3xl md:text-5xl">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-2 uppercase tracking-[0.3em]">{p.place} · {p.year}</div>
                </div>
                <div className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-foreground/70 border border-foreground/30 px-4 py-2 group-hover:border-primary group-hover:text-primary transition-colors">
                  View Case
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// -------- Testimonials --------
const QUOTES = [
  { q: "It feels less like a kitchen and more like a piece of architecture we cook in.", a: "Anaya & Vikram K.", r: "Bandra Penthouse" },
  { q: "Every detail — from the hinge action to the brass — speaks of a different standard.", a: "Rohan M.", r: "Marine Drive" },
  { q: "Six months later it still feels brand new. The patina on the brass is gorgeous.", a: "Priya S.", r: "Pali Hill" },
];

export function Testimonials() {
  return (
    <section className="relative py-[20vh] px-6 md:px-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, oklch(0.25 0.05 55 / 0.5), transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative">
        <SectionLabel index="07" label="Voices" />
        <h2 className="font-display text-4xl md:text-6xl mb-20">Spoken by those who <em className="brass-text not-italic">live in them</em>.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map((qu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="glass p-10 relative"
              style={{ transformPerspective: 1000 }}
            >
              <div className="font-display text-5xl text-primary/40 leading-none mb-4">"</div>
              <p className="font-display text-xl leading-snug text-balance">{qu.q}</p>
              <div className="hairline my-6" />
              <div className="text-sm">{qu.a}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{qu.r}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- Contact --------
function Showroom() {
  const grp = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!grp.current) return;
    // FIXED: Access clock cleanly directly via state configuration
    const t = state.clock.getElapsedTime();
    state.camera.position.z = 5 - Math.sin(t * 0.15) * 1.2;
    state.camera.position.y = 2 + Math.sin(t * 0.1) * 0.3;
    state.camera.lookAt(0, 1, 0);
  });
  
  return (
    <group ref={grp}>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[4, 1, 1.4]} /><meshStandardMaterial color="#3a2418" roughness={0.55} /></mesh>
      <mesh position={[0, 1.05, 0]}><boxGeometry args={[4.2, 0.08, 1.55]} /><meshStandardMaterial color="#ece6d8" roughness={0.3} /></mesh>
      <mesh position={[-3, 1.3, -0.8]}><boxGeometry args={[1, 2.6, 0.6]} /><meshStandardMaterial color="#0a0a0a" roughness={0.8} /></mesh>
      <mesh position={[3, 1.3, -0.8]}><boxGeometry args={[1, 2.6, 0.6]} /><meshStandardMaterial color="#0a0a0a" roughness={0.8} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#0a0908" roughness={0.7} metalness={0.4} /></mesh>
      <pointLight position={[0, 1.5, 1]} color="#ffb968" intensity={3} distance={6} />
      <spotLight position={[0, 8, 2]} angle={0.5} penumbra={0.8} intensity={2} color="#ffd9a8" />
    </group>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen px-6 md:px-14 py-[15vh] overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [4, 2, 5], fov: 35 }} dpr={[1, 1.6]}>
          <color attach="background" args={["#0a0908"]} />
          <fog attach="fog" args={["#0a0908", 6, 18]} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.15} />
            <Showroom />
          </Suspense>
        </Canvas>
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.9)" }} />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[80vh] items-center">
        <div>
          <SectionLabel index="08" label="Visit" />
          <h2 className="font-display text-5xl md:text-7xl leading-[1] text-balance">
            Step into the <em className="brass-text not-italic">showroom</em>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            A private consultation, an espresso, and a slow walk through every surface.
            By appointment only.
          </p>
          <div className="mt-10 space-y-2 text-sm">
            <div>By appointment · Mon–Sat</div>
            <div className="text-muted-foreground">Studio 04, Worli · Mumbai</div>
            <div className="text-muted-foreground">hello@dcinteriors.com · +91 22 0000 0000</div>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="glass p-8 md:p-10 space-y-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary">Private Inquiry</div>
          {[
            { l: "Full name", t: "text" },
            { l: "Email", t: "email" },
            { l: "Project location", t: "text" },
          ].map((f) => (
            <div key={f.l}>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{f.l}</label>
              <input type={f.t} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-sm transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Tell us about your space</label>
            <textarea rows={3} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-sm transition-colors resize-none" />
          </div>
          <button className="group w-full mt-4 inline-flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.4em] py-4 border border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors">
            <span className="w-8 h-px bg-primary group-hover:w-14 transition-all duration-500" />
            Book Consultation
            <span className="w-8 h-px bg-primary group-hover:w-14 transition-all duration-500" />
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 px-6 md:px-14 py-12">
      <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="font-display text-3xl tracking-[0.3em] brass-text">DC INTERIORS</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">Modular Atelier · Est. 2014</div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} DC INTERIORS Design Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}