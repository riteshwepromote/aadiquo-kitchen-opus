import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/image-Photoroom.png";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links = ["Collection", "Craft", "Configurator", "Projects", "Contact"];

  // Monitor scroll height to transform layout aesthetics seamlessly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-14 flex items-center justify-between select-none font-sans transition-all duration-500
          ${isScrolled 
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/[0.04] py-3.5' 
            : 'bg-transparent border-b border-transparent py-5'
          }`}
      >
        {/* Brand Anchor Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img 
            src={logo} 
            alt="Aadiquo Luxury Kitchens" 
            className="h-19 w-auto object-contain brightness-0 invert transition-transform duration-300" 
          />
        </a>

        {/* Desktop Menu Links */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300 relative py-1 group"
            >
              {l}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Trigger Button */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="text-[11px] font-medium uppercase tracking-[0.25em] text-white border border-white/20 px-5 py-2.5 rounded-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Book Visit
          </a>

          {/* Minimalist Burger Trigger (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 flex flex-col justify-center items-end gap-1.5 z-50 outline-none group"
            aria-label="Toggle Navigation Screen"
          >
            <span className={`h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-[4px]' : 'w-6'}`} />
            <span className={`h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[4px]' : 'w-5'}`} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 md:hidden font-sans text-white"
          >
            <nav className="flex flex-col space-y-8 text-left max-w-xs mx-auto w-full">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 block mb-2 border-b border-white/10 pb-2">
                Menu Mapped Index
              </span>
              {links.map((l, idx) => (
                <motion.a
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  key={`mob-${l}`}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-light tracking-widest text-white/80 hover:text-white transition-colors duration-300 uppercase"
                >
                  {l}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}