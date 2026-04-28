import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/sxlmwn" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sxlmwn/" },
];

export const Contact = () => {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="container relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="glass-card p-10 sm:p-14 text-center space-y-7"
        >
          <div className="glass-chip mx-auto">Let's Connect</div>
          <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-tight">
            Let's build <span className="text-shimmer">something</span>
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto font-light text-lg">
            Open to internships, research, and ambitious side-projects across AI, DevOps, and Security.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.1 + i * 0.08 }}
                className="glass-button group"
              >
                <l.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                {l.label}
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground pt-6">
            © {new Date().getFullYear()} Salman Younus · Crafted with iOS 26 liquid glass.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
