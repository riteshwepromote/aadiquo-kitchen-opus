import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, Suspense } from "react";
import emailjs from "@emailjs/browser";
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
    const controls = animate(0, to, {
      duration: 2.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}

export function Difference() {
  const stats = [
    { n: 10, s: "+", l: "Years of craft" },
    { n: 500, s: "+", l: "Kitchens delivered" },
    { n: 98, s: "%", l: "Client satisfaction" },
    { n: 24, s: "mo", l: "Warranty included" },
  ];
  return (
    <section className="relative py-[20vh] px-6 md:px-14 bg-white/[0.02] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="05" label="The AADIQUO Difference" />
        <h2 className="font-display text-5xl md:text-[8rem] leading-[0.9] tracking-tight text-balance max-w-5xl text-white">
          A studio, not a <em className="text-[#E5A967] shadow-xs not-italic">factory</em>.
        </h2>
        
        {/* Adjusted Grid Borders for Stark Visual Breakdown */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15">
          {stats.map((s) => (
            <div key={s.l} className="bg-[#0A0A0A] p-8 md:p-10 border border-white/[0.03]">
              <div className="font-display text-5xl md:text-7xl text-[#E5A967] font-semibold tracking-tight">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- Projects horizontal scroll --------
const PROJECTS = [
  { name: "Bandra Penthouse", place: "Mumbai", year: "2024", image: project1 },
  { name: "Marine Drive Residence", place: "Mumbai", year: "2024", image: project2 },
  { name: "Pali Hill Villa", place: "Mumbai", year: "2023", image: project3 },
  { name: "Aamby Valley Retreat", place: "Lonavala", year: "2023", image: project4 },
  { name: "Lutyens Townhouse", place: "Delhi", year: "2022", image: project5 },
];

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section id="projects" ref={wrapRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-14 mb-10">
          <SectionLabel index="06" label="Projects" />
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-4xl md:text-6xl text-white">
              Selected <em className="text-[#E5A967] not-italic">work</em>.
            </h2>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-mono">
              Scroll to explore
            </div>
          </div>
        </div>
        
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-14 will-change-transform">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="relative shrink-0 w-[80vw] md:w-[55vw] aspect-[4/5] overflow-hidden group rounded-xl border border-white/[0.08] shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${p.image})` }}
              />

              {/* Enhanced Image Overlay Gradient for Crisp Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
              <div className="absolute inset-0 grain opacity-15" />
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 30% 20%, rgba(229, 169, 103, 0.22), transparent 70%)",
                }}
              />

              {/* High-Contrast Architectural Detailing Lines */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 border-t border-white/20" />
              <div className="absolute inset-x-12 bottom-12 top-1/3 border border-white/15" />
              <div className="absolute inset-x-20 bottom-20 top-[45%] border border-white/10" />

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between z-10">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-[#E5A967] font-bold mb-2">
                    N°0{i + 1}
                  </div>
                  <div className="font-display text-3xl md:text-5xl text-white drop-shadow-md">{p.name}</div>
                  <div className="text-xs text-white/80 mt-2 uppercase tracking-[0.3em] font-medium">
                    {p.place} · {p.year}
                  </div>
                </div>
                <div className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-white bg-black/60 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-xs transition-all duration-300 group-hover:border-[#E5A967] group-hover:text-[#E5A967] group-hover:bg-black/80 font-semibold tracking-widest">
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
  {
    q: "It feels less like a kitchen and more like a piece of architecture we cook in.",
    a: "Anaya & Vikram K.",
    r: "Bandra Penthouse",
  },
  {
    q: "Every detail — from the hinge action to the brass — speaks of a different standard.",
    a: "Rohan M.",
    r: "Marine Drive",
  },
  {
    q: "Six months later it still feels brand new. The patina on the brass is gorgeous.",
    a: "Priya S.",
    r: "Pali Hill",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-[20vh] px-6 md:px-14 overflow-hidden bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(229, 169, 103, 0.08), transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <SectionLabel index="07" label="Voices" />
        <h2 className="font-display text-4xl md:text-6xl mb-20 text-white">
          Spoken by those who <em className="text-[#E5A967] not-italic">live in them</em>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map((qu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, borderColor: "rgba(229,169,103,0.4)" }}
              className="bg-[#0F0F0F] border border-white/[0.08] p-10 relative rounded-xl shadow-xl transition-colors duration-300"
              style={{ transformPerspective: 1000 }}
            >
              <div className="font-display text-5xl text-[#E5A967]/60 leading-none mb-4">"</div>
              <p className="font-display text-xl leading-snug text-balance text-white">{qu.q}</p>
              <div className="h-[1px] w-full bg-white/[0.08] my-6" />
              <div className="text-sm text-white font-medium">{qu.a}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1 font-mono">
                {qu.r}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- Contact Showroom Scene --------
function Showroom() {
  const grp = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!grp.current) return;
    const t = state.clock.getElapsedTime();
    state.camera.position.z = 5 - Math.sin(t * 0.15) * 1.2;
    state.camera.position.y = 2 + Math.sin(t * 0.1) * 0.3;
    state.camera.lookAt(0, 1, 0);
  });

  return (
    <group ref={grp}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 1.4]} />
        {/* Increased color values inside WebGL surface nodes */}
        <meshStandardMaterial color="#5c3a26" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[4.2, 0.08, 1.55]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <mesh position={[-3, 1.3, -0.8]}>
        <boxGeometry args={[1, 2.6, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      <mesh position={[3, 1.3, -0.8]}>
        <boxGeometry args={[1, 2.6, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0c0b0a" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Amplified core scene light intensities */}
      <pointLight position={[0, 1.8, 1]} color="#ffcaa0" intensity={6} distance={8} />
      <spotLight position={[0, 8, 2]} angle={0.6} penumbra={0.7} intensity={5} color="#ffffff" />
    </group>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "service_1tuhqdi",
        "template_k7pukjf",
        formRef.current,
        "BpY2Q936TJKu8mktR"
      );
      alert("Inquiry submitted successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send inquiry");
    }
  };

  return (
    <section id="contact" className="relative min-h-screen px-6 md:px-14 py-[15vh] overflow-hidden bg-black">
      {/* 3D Viewport canvas container background setup */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [4, 2, 5], fov: 35 }} dpr={[1, 2]}>
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 5, 15]} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <Showroom />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Reduced dark shadow masking to prevent clipping UI layer fields */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 150px 50px rgba(0,0,0,0.7)" }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[80vh] items-center z-10">
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5 max-w-xl">
          <SectionLabel index="08" label="Visit" />
          <h2 className="font-display text-5xl md:text-7xl leading-[1] text-balance text-white">
            Step into the <em className="text-[#E5A967] not-italic">showroom</em>.
          </h2>
          <p className="mt-6 text-white/80 max-w-md font-light text-sm leading-relaxed">
            A private consultation, an espresso, and a slow walk through every surface. By
            appointment only.
          </p>
          <div className="mt-10 space-y-2 text-sm font-medium text-white">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A967]" />
              By appointment · Mon–Sat
            </div>
            <div className="text-white/70 pl-3.5">Studio 04, Worli · Mumbai</div>
            <div className="text-[#E5A967] pl-3.5 font-mono text-xs tracking-wide">hello@dcinteriors.com · +91 22 0000 0000</div>
          </div>
        </div>

        {/* Form panel with elevated readability grids */}
        <form ref={formRef} onSubmit={sendEmail} className="bg-[#0D0D0D]/90 border border-white/10 p-8 md:p-10 space-y-6 rounded-xl shadow-2xl backdrop-blur-lg">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#E5A967] font-bold">Private Inquiry Matrix</div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold mb-2">
              Full Name
            </label>
            <input
              name="full_name"
              type="text"
              required
              className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A967] text-white outline-none py-2 text-sm transition-colors font-light"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A967] text-white outline-none py-2 text-sm transition-colors font-light"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold mb-2">
              Project Location
            </label>
            <input
              name="project_location"
              type="text"
              required
              className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A967] text-white outline-none py-2 text-sm transition-colors font-light"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold mb-2">
              Tell us about your space
            </label>
            <textarea
              name="message"
              rows={3}
              required
              className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A967] text-white outline-none py-2 text-sm transition-colors resize-none font-light"
            />
          </div>

          <button
            type="submit"
            className="group w-full mt-4 inline-flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.4em] py-4 bg-white/5 border border-[#E5A967]/40 text-white font-bold tracking-widest rounded-md hover:border-[#E5A967] hover:bg-[#E5A967]/10 transition-all duration-300"
          >
            <span className="w-6 h-px bg-[#E5A967] group-hover:w-12 transition-all duration-500" />
            Book Consultation
            <span className="w-6 h-px bg-[#E5A967] group-hover:w-12 transition-all duration-500" />
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black px-6 md:px-14 py-12">
      <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="font-display text-3xl tracking-[0.3em] text-[#E5A967] font-bold">AADIQUO</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-2 font-medium">
            Modular Atelier · Est. 2014
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
          © {new Date().getFullYear()} AADIQUO Design Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}