import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -------- Pure Composition Data --------
interface AssetOption {
  name: string;
  meta: string;
  colorHex: string;
}

interface InnovationItem {
  id: string;
  label: string;
  detail: string;
}

const WOODS: AssetOption[] = [
  { name: "Raw Walnut", meta: "Heartwood / Deep Grain", colorHex: "#5c3a21" },
  { name: "Smoked Oak", meta: "Fumed / Charred Tone", colorHex: "#7a5c43" },
  { name: "Obsidian Ebony", meta: "Monolith / Dark Satin", colorHex: "#222222" },
];

const STONES: AssetOption[] = [
  { name: "Calacatta Marble", meta: "Bold Veining / Honed", colorHex: "#F5F2EB" },
  { name: "Pietra Grey", meta: "Calcite Lines / Matte", colorHex: "#4A4947" },
  { name: "Travertine Gold", meta: "Porous Bedding / Raw", colorHex: "#D1C2A5" },
];

const STORAGE_SYSTEMS: InnovationItem[] = [
  { id: "01", label: "Servo-Assist Glides", detail: "Electronic touch-to-open framework engineered to vanish into cabinet profiles seamlessly." },
  { id: "02", label: "Corner Pivot Matrix", detail: "Interlocking rotational trays designed to maximize deep structural blind corner voids." },
  { id: "03", label: "Vertical Pantry Arrays", detail: "Full-extension vertical storage arrays equipped with premium soft-close fluid dampers." },
];

export function Configurator() {
  const [selectedWood, setSelectedWood] = useState<AssetOption>(WOODS[0]);
  const [selectedStone, setSelectedStone] = useState<AssetOption>(STONES[0]);
  const [activeStorage, setActiveStorage] = useState<InnovationItem>(STORAGE_SYSTEMS[0]);

  return (
    <div className="bg-[#000000] text-[#FAF9F5] font-sans antialiased selection:bg-[#C58345]/30">
      
      {/* SECTION 03: ARCHITECTURAL MATRIX */}
      <section id="configurator" className="relative py-24 md:py-32 px-8 md:px-16 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header Indicator */}
          <div className="text-[11px] tracking-[0.4em] uppercase text-white/50 font-semibold mb-16 flex items-center gap-3">
            <span className="text-[#C58345]">03</span> <span className="w-8 h-[1px] bg-white/20" /> <span>Material Composition</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
            
            {/* Left Column: High-Visibility Dynamic Architectural Plate Preview */}
            <div className="relative aspect-square max-h-[500px] w-full bg-radial-[at_50%_40%] from-[#161616] to-[#050505] border border-white/[0.08] p-8 flex flex-col justify-between overflow-hidden shadow-2xl rounded-xl">
              <div className="absolute top-4 right-4 font-mono text-[9px] text-white/30 tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-0.5 rounded-sm">
                SYSTEM_PREVIEW_V4.0
              </div>

              {/* Composition Workspace */}
              <div className="w-full h-full flex flex-col justify-center gap-6 relative z-10 pt-4">
                
                {/* Stone Plate Slab Overlay */}
                <motion.div 
                  animate={{ backgroundColor: selectedStone.colorHex }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-4/5 h-20 mx-auto rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/20 flex items-center justify-center"
                >
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-black drop-shadow-sm px-4 text-center">
                    {selectedStone.name}
                  </span>
                </motion.div>

                {/* Base Cabinet Inlay Plate */}
                <motion.div 
                  animate={{ backgroundColor: selectedWood.colorHex }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-48 rounded-md shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 flex items-center justify-center relative overflow-hidden"
                >
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-white bg-black/40 px-3 py-1 rounded-sm backdrop-blur-xs border border-white/5">
                    {selectedWood.name} Base
                  </span>
                  
                  {/* Highlighted Micro Hardware Track Line Accent */}
                  <div className="absolute top-8 inset-x-12 h-[2px] bg-[#C58345] shadow-[0_0_10px_rgba(197,131,69,0.5)]" />
                </motion.div>
              </div>

              {/* Structural Footer Metrics */}
              <div className="border-t border-white/[0.08] pt-4 flex justify-between text-[10px] font-mono tracking-widest text-white/50 uppercase">
                <span>Viewport Layers</span>
                <span className="text-[#C58345] font-semibold">Active Balance</span>
              </div>
            </div>

            {/* Right Column: High-Contrast Option Row List Controls */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight font-serif text-white mb-4 italic">
                  Material Realism
                </h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                  Pair premium organic wood grains with dynamic architectural slabs to discover your perfect layout texture balance.
                </p>
              </div>

              {/* Selectors Mapping Arrays */}
              <div className="space-y-10">
                <EditorialSelector label="Cabinet Core Timber" active={selectedWood} data={WOODS} onSelect={setSelectedWood} />
                <RouteDivider />
                <EditorialSelector label="Countertop Mass Block" active={selectedStone} data={STONES} onSelect={setSelectedStone} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 04: STORAGE CONSTRAINTS */}
      <section id="storage" className="relative py-24 md:py-32 px-8 md:px-16 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header Indicator */}
          <div className="text-[11px] tracking-[0.4em] uppercase text-white/50 font-semibold mb-16 flex items-center gap-3">
            <span className="text-[#C58345]">04</span> <span className="w-8 h-[1px] bg-white/20" /> <span>Internal Architecture</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-center">
            
            {/* Left Structural Pitch Typography */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-white mb-6 leading-tight">
                Calculated <br /> Space Efficiency.
              </h2>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                True premium luxury design functions effortlessly from within. Select a performance utility block to review its geometric blueprints.
              </p>
            </div>

            {/* Right Segmented Interactive Control Slate */}
            <div className="space-y-8 bg-[#080808] border border-white/[0.06] p-8 rounded-xl shadow-xl">
              <div className="flex gap-4 border-b border-white/[0.08] pb-4">
                {STORAGE_SYSTEMS.map((item) => {
                  const isCurrent = activeStorage.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveStorage(item)}
                      className={`text-[11px] font-mono tracking-widest uppercase transition-all duration-300 flex-1 text-left py-2 px-1 relative outline-none
                        ${isCurrent ? "text-[#C58345] font-bold" : "text-white/40 hover:text-white/80"}`}
                    >
                      {item.id} // {item.label.split(' ')[0]}
                      {isCurrent && (
                        <motion.div 
                          layoutId="editorialIndicator" 
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C58345]" 
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Readout Box Panel Container */}
              <div className="min-h-[80px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStorage.id}
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C58345] font-semibold block">
                      {activeStorage.label} Specification Blueprint
                    </span>
                    <p className="text-xs text-white/70 font-light leading-relaxed max-w-xl">
                      {activeStorage.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

// -------- Internal UI Subcomponents Components --------
interface EditorialSelectorProps {
  label: string;
  active: AssetOption;
  data: AssetOption[];
  onSelect: (item: AssetOption) => void;
}

function EditorialSelector({ label, active, data, onSelect }: EditorialSelectorProps) {
  return (
    <div className="space-y-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block font-semibold">
        {label}
      </span>
      <div className="space-y-3">
        {data.map((item) => {
          const isCurrent = active.name === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full text-left flex items-center justify-between py-4 px-5 border transition-all duration-300 rounded-lg outline-none group
                ${isCurrent 
                  ? "border-[#C58345] bg-[#C58345]/5 shadow-[0_0_20px_rgba(197,131,69,0.05)]" 
                  : "border-white/[0.05] bg-[#060606] hover:border-white/20 hover:bg-[#0A0A0A]"
                }`}
            >
              <div className="flex items-center gap-4">
                {/* Clear Swatch Indicator Box Circle with contrast ring */}
                <span 
                  className={`w-4 h-4 rounded-full border transition-transform duration-300 shrink-0
                    ${isCurrent ? 'scale-110 border-white/40 shadow-md' : 'border-white/10 group-hover:scale-105'}`} 
                  style={{ backgroundColor: item.colorHex }} 
                />
                <div>
                  <span className={`text-xs block tracking-wide transition-colors font-medium
                    ${isCurrent ? "text-[#C58345]" : "text-white/80 group-hover:text-white"}`}>
                    {item.name}
                  </span>
                  <span className={`text-[9px] tracking-normal block font-mono transition-colors mt-0.5
                    ${isCurrent ? "text-white/40" : "text-white/20 group-hover:text-white/30"}`}>
                    {item.meta}
                  </span>
                </div>
              </div>
              
              <span className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-300 px-2 py-1 rounded-xs
                ${isCurrent 
                  ? "opacity-100 text-white bg-[#C58345]/20 border border-[#C58345]/30 font-semibold" 
                  : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-white/50 text-[9px]"
                }`}
              >
                {isCurrent ? "Active" : "Select"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RouteDivider() {
  return <div className="h-[1px] w-full bg-white/[0.04] my-2" />;
}