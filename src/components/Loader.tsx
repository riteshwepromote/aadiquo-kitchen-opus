import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* spotlight */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--gradient-spotlight)" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* horizon floor */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{ background: "linear-gradient(to top, oklch(0.18 0.01 55), transparent)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          />
          {/* kitchen island silhouette */}
          <motion.div
            className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[420px] h-[120px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute inset-x-4 top-2 bottom-0 bg-gradient-to-b from-walnut/40 to-black/80 border-x border-primary/10" />
            <div className="absolute inset-x-0 -top-1 h-px bg-primary/40 blur-[1px]" />
          </motion.div>

          {/* logo */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ delay: 1.0, duration: 1.4, ease: "easeOut" }}
          >
            <div className="font-display text-6xl md:text-7xl brass-text tracking-[0.35em]">
              AADIQUO
            </div>
            <motion.div
              className="hairline mt-6 mx-auto w-40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            />
            <motion.p
              className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Entering the Showroom
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
