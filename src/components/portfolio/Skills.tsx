import { motion } from "framer-motion";
import { Brain, Cloud, Shield } from "lucide-react";

const tracks = [
  {
    icon: Brain,
    emoji: "🤖",
    title: "AI & ML Engineering",
    tint: "tint-ai",
    accentClass: "text-[hsl(var(--tint-ai))]",
    skills: [
      "Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn",
      "Neural Networks", "CNNs", "RNNs", "Transformers", "BERT",
      "GPT architectures", "LangChain", "RAG pipelines", "FastAPI",
      "MLOps", "Docker", "AWS / GCP",
    ],
  },
  {
    icon: Cloud,
    emoji: "☁️",
    title: "DevOps & Cloud",
    tint: "tint-devops",
    accentClass: "text-[hsl(var(--tint-devops))]",
    skills: [
      "Linux", "Git", "Docker", "GitHub Actions", "CI/CD",
      "Terraform", "Ansible", "Prometheus", "Grafana",
      "AWS", "GCP", "Azure", "Kubernetes", "Helm",
      "RBAC", "ArgoCD", "Flux", "GitOps", "SRE",
    ],
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Cybersecurity",
    tint: "tint-security",
    accentClass: "text-[hsl(var(--tint-security))]",
    skills: [
      "Kali Linux", "Wireshark", "OSINT", "Nmap", "OWASP Top 10",
      "Metasploit", "Privilege Escalation", "IDS / IPS", "SIEM",
      "Malware Analysis", "Incident Response", "Active Directory",
      "Wireless Security", "Reverse Engineering", "CTFs",
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="glass-chip mx-auto">Skills & Stack</div>
          <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-tight">
            The <span className="text-shimmer">toolkit</span>
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto font-light">
            Three disciplines, deeply intertwined. Each pillar built on real projects, labs, and certifications in motion.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tracks.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 60, damping: 18, delay: i * 0.12 }}
              className={`glass-card ${t.tint} p-7 space-y-5 flex flex-col`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl glass-strong grid place-items-center text-2xl">
                  {t.emoji}
                </div>
                <h3 className={`font-display font-semibold text-2xl ${t.accentClass}`}>{t.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {t.skills.map((s) => (
                  <span key={s} className="glass-chip">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
