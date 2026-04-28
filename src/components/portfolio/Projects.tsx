import { motion } from "framer-motion";
import { Brain, Cloud, Shield, Cpu } from "lucide-react";

const projects = [
  {
    icon: Brain,
    title: "RAG-Powered Knowledge Engine",
    description: "LangChain + FastAPI pipeline indexing technical docs with semantic retrieval and a transformer reranker.",
    tag: "AI / ML",
    tint: "tint-ai",
  },
  {
    icon: Cloud,
    title: "Self-Healing K8s Platform",
    description: "Terraform-provisioned cluster with ArgoCD GitOps, Prometheus/Grafana observability, and auto-remediation.",
    tag: "DevOps",
    tint: "tint-devops",
  },
  {
    icon: Shield,
    title: "Red-Team Lab Suite",
    description: "Active Directory home lab with curated CTF chains — recon, exploitation, privesc, and post-exploitation.",
    tag: "Security",
    tint: "tint-security",
  },
  {
    icon: Cpu,
    title: "LLM-Driven SOC Assistant",
    description: "Fine-tuned model parsing SIEM alerts into prioritized incident summaries with playbook recommendations.",
    tag: "AI × Security",
    tint: "tint-ai",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="glass-chip mx-auto">In the Works</div>
          <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-tight">
            Selected <span className="text-shimmer">projects</span>
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto font-light">
            Real builds across the three tracks. Live demos & write-ups arriving through 2026.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 60, damping: 18, delay: i * 0.1 }}
              className={`glass-card ${p.tint} p-7 space-y-4 shimmer-overlay`}
            >
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl glass-strong grid place-items-center">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="glass-chip text-[10px] uppercase tracking-widest">{p.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-2xl leading-tight relative z-10">{p.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed font-light relative z-10">
                {p.description}
              </p>
              <div className="pt-2 relative z-10">
                <span className="glass-chip text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
