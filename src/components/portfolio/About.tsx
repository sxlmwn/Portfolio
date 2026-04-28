import { motion } from "framer-motion";
import { GraduationCap, Brain, Cloud, Shield } from "lucide-react";

const pillars = [
  { icon: Brain, label: "AI / ML Engineering", tint: "tint-ai" },
  { icon: Cloud, label: "Cloud-Native DevOps", tint: "tint-devops" },
  { icon: Shield, label: "Offensive Cybersecurity", tint: "tint-security" },
];

const coursework = ["Data Structures & Algorithms", "Object-Oriented Programming", "Databases", "Software Engineering"];

export const About = () => {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="container relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="glass-chip mx-auto">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            About
          </div>
          <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-tight">
            Three paths, <span className="text-shimmer">one engineer</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.1 }}
          className="glass-card p-8 sm:p-12 space-y-8"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 font-light">
            I'm a <span className="font-medium text-foreground">BSE student at COMSATS University Islamabad</span>,
            pursuing software engineering with an obsession for systems that think, scale, and survive. My focus runs
            three parallel tracks — and I'm building deeply in each.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.2 + i * 0.1 }}
                className={`${p.tint} rounded-2xl p-5 border border-white/60 backdrop-blur-xl flex items-center gap-3`}
              >
                <div className="w-10 h-10 rounded-xl glass-strong grid place-items-center">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-sm text-foreground/90">{p.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 pt-2">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
              Currently studying
            </p>
            <div className="flex flex-wrap gap-2">
              {coursework.map((c) => (
                <span key={c} className="glass-chip">{c}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Alongside an intensive self-directed technical education running through 2026.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
