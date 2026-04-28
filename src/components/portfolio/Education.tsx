import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarRange } from "lucide-react";

export const Education = () => {
  return (
    <section id="education" className="relative py-28 px-6">
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="glass-chip mx-auto">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            Education
          </div>
          <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-tight">
            Academic <span className="text-shimmer">journey</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.1 }}
          className="glass-card p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-16 h-16 rounded-2xl glass-strong grid place-items-center shrink-0">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="glass-chip">
                  <CalendarRange className="w-3.5 h-3.5 text-primary" />
                  2025 — 2029
                </span>
                <span className="glass-chip">In Progress</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">
                  BS Software Engineering
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 font-medium">
                  COMSATS University Islamabad
                </p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  Islamabad, Pakistan
                </p>
              </div>

              <p className="text-foreground/70 font-light leading-relaxed pt-2">
                Pursuing a four-year degree focused on software design, systems thinking, and engineering rigor —
                paired with a self-directed track in AI, DevOps, and Cybersecurity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
