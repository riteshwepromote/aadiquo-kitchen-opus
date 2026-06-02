import { motion } from "framer-motion";

export function Nav() {
  const links = ["Collection", "Craft", "Configurator", "Projects", "Contact"];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-6 flex items-center justify-between mix-blend-difference"
    >
      <a href="#top" className="font-display text-xl tracking-[0.4em] text-foreground">DC INTERIORS</a>
      <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] text-foreground/80">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">{l}</a>
        ))}
      </nav>
      <a
        href="#contact"
        className="text-[11px] uppercase tracking-[0.3em] text-foreground/90 border border-foreground/30 px-4 py-2 hover:border-foreground transition-colors"
      >
        Book Visit
      </a>
    </motion.header>
  );
}
