import { motion } from "framer-motion";
import { Brain, Cloud, Shield } from "lucide-react";

type Phase = { weeks: string; title: string };
type Track = {
  icon: typeof Brain;
  emoji: string;
  title: string;
  tint: string;
  dotClass: string;
  lineClass: string;
  phases: Phase[];
};

const tracks: Track[] = [
  {
    icon: Brain,
    emoji: "🤖",
    title: "AI / ML",
    tint: "tint-ai",
    dotClass: "bg-[hsl(var(--tint-ai))]",
    lineClass: "from-[hsl(var(--tint-ai))]/60",
    phases: [
      { weeks: "Wk 1–4", title: "Foundations" },
      { weeks: "Wk 5–10", title: "Core ML" },
      { weeks: "Wk 11–16", title: "Deep Learning · NLP · LLMs" },
      { weeks: "Wk 17–22", title: "MLOps & Engineering" },
      { weeks: "Wk 23–26", title: "Capstone" },
    ],
  },
  {
    icon: Cloud,
    emoji: "☁️",
    title: "DevOps",
    tint: "tint-devops",
    dotClass: "bg-[hsl(var(--tint-devops))]",
    lineClass: "from-[hsl(var(--tint-devops))]/60",
    phases: [
      { weeks: "Wk 1–4", title: "Foundations" },
      { weeks: "Wk 5–10", title: "Containers & Automation" },
      { weeks: "Wk 11–16", title: "Cloud Platforms" },
      { weeks: "Wk 17–22", title: "Kubernetes & Advanced" },
      { weeks: "Wk 23–26", title: "Certs · AWS SA · CKA · Terraform" },
    ],
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Cybersecurity",
    tint: "tint-security",
    dotClass: "bg-[hsl(var(--tint-security))]",
    lineClass: "from-[hsl(var(--tint-security))]/60",
    phases: [
      { weeks: "Wk 1–4", title: "Foundations" },
      { weeks: "Wk 5–10", title: "Offensive Security" },
      { weeks: "Wk 11–16", title: "Defensive Security" },
      { weeks: "Wk 17–22", title: "Advanced Specializations" },
      { weeks: "Wk 23–26", title: "Certs · CEH · Security+ · OSCP" },
    ],
  },
];

export const Roadmap = () => {
  return (
    <section id="roadmap" className="relative py-28 px-6">
      <div className="container relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="glass-chip mx-auto">Roadmap · 2026</div>
          <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-tight">
            Three parallel <span className="text-shimmer">26-week</span> journeys
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto font-light">
            A self-directed curriculum running across AI, DevOps, and Security — from foundations to certifications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 50, damping: 18 }}
          className="glass-card p-6 sm:p-10"
        >
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-6">
            {tracks.map((t, ti) => (
              <div key={t.title} className={`${t.tint} rounded-2xl p-6 border border-white/60 relative`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl glass-strong grid place-items-center text-xl">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Track {ti + 1}</p>
                    <h3 className="font-display font-semibold text-2xl">{t.title}</h3>
                  </div>
                </div>

                <div className="relative pl-6">
                  {/* Vertical line */}
                  <div className={`absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b ${t.lineClass} to-transparent`} />

                  <ul className="space-y-5">
                    {t.phases.map((p, i) => (
                      <motion.li
                        key={p.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 16, delay: i * 0.08 }}
                        className="relative"
                      >
                        <span className="absolute -left-6 top-1.5 flex items-center justify-center">
                          <span className={`absolute w-4 h-4 rounded-full ${t.dotClass} opacity-30 blur-md`} />
                          <span className={`relative w-3 h-3 rounded-full ${t.dotClass} border-2 border-white shadow-[0_0_10px_currentColor]`} />
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                            {p.weeks}
                          </p>
                          <p className="text-sm font-medium text-foreground/90 leading-snug">{p.title}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
