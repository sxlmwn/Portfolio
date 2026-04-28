import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import avatar3d from "@/assets/avatar-3d.png";

export const Hero = () => {
  const [src, setSrc] = useState<string>(avatar3d);

  useEffect(() => {
    const stored = localStorage.getItem("salman_avatar_image_v1");
    if (stored) setSrc(stored);
    const refresh = () => {
      const s = localStorage.getItem("salman_avatar_image_v1");
      setSrc(s || avatar3d);
    };
    window.addEventListener("avatar-updated", refresh);
    return () => window.removeEventListener("avatar-updated", refresh);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 pb-24 px-6 overflow-hidden flex items-center"
    >
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-primary blur-2xl opacity-40" />
            <div className="glass-strong relative w-32 h-32 rounded-full p-1.5 overflow-hidden">
              <img
                src={src}
                alt="Salman Younus 3D avatar"
                width={256}
                height={256}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 80, damping: 18 }}
            className="glass-chip"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Open to Opportunities
          </motion.div>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 60, damping: 18 }}
              className="font-display font-semibold text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
            >
              <span className="block text-foreground">Salman</span>
              <span className="block text-shimmer">Younus</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg font-medium tracking-wide text-muted-foreground"
            >
              AI Engineer · DevOps Engineer · Security Researcher
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Building intelligent systems. Automating infrastructure. Breaking things ethically.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 80, damping: 18 }}
            className="flex flex-wrap gap-3 justify-center pt-2"
          >
            <a href="#projects" className="glass-button-primary group">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#contact" className="glass-button">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
