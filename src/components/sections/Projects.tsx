import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, Github, ExternalLink } from "lucide-react";
import Card3D from "../Card3D";
import MagneticButton from "../MagneticButton";
import { DATA } from "../../constants";

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="work" className="section">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="mb-14">
          <p className="hud-label mb-3">// MISSION_HUB</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Selected Projects</h2>
          <p className="text-text-muted mt-3">Click any project to explore the details.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DATA.projects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <Card3D>
                <div className="glass-card p-6 md:p-8 h-full flex flex-col interactive group relative overflow-hidden cursor-none" onClick={() => setSelected(i)}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: p.color }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(600px circle at 50% 0%, ${p.color}08, transparent)` }} />

                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-mono rounded-lg border" style={{ color: p.color, borderColor: `${p.color}30`, backgroundColor: `${p.color}10` }}>
                      {p.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-text-subtle group-hover:text-foreground group-hover:bg-surface-3 transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1.5">{p.title}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: p.color }}>{p.tagline}</p>
                  <p className="text-sm text-text-muted leading-relaxed mb-6 flex-1">{p.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(t => <span key={t} className="px-2 py-0.5 text-[10px] font-mono text-text-subtle bg-surface-2 rounded-md">{t}</span>)}
                    </div>
                    <span className="text-xs font-mono whitespace-nowrap ml-3 font-semibold" style={{ color: p.color }}>{p.impact}</span>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && <ProjectDetail project={DATA.projects[selected]} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectDetail({ project, onClose }: { project: typeof DATA.projects[0]; onClose: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] command-backdrop" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-4 md:inset-[10%] z-[101] bg-surface border border-border rounded-2xl overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: `linear-gradient(180deg, ${project.color}10, transparent)` }} />
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-foreground hover:border-border-hover transition-all interactive">
          <X className="w-4 h-4" />
        </button>

        <div className="flex-1 overflow-y-auto p-8 md:p-16">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 text-xs font-mono rounded-lg border mb-6" style={{ color: project.color, borderColor: `${project.color}30`, backgroundColor: `${project.color}10` }}>
              {project.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-3">{project.title}</h2>
            <p className="text-lg md:text-xl font-medium mb-8" style={{ color: project.color }}>{project.tagline}</p>
            <p className="text-text-muted text-lg leading-relaxed mb-10">{project.description}</p>

            <div className="glass-card p-6 mb-10">
              <div className="hud-label mb-3">IMPACT METRIC</div>
              <div className="text-3xl font-display font-bold" style={{ color: project.color }}>{project.impact}</div>
              <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden mt-4">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full" style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}60` }} />
              </div>
            </div>

            <div className="mb-10">
              <div className="hud-label mb-4">TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => <span key={t} className="skill-node interactive">{t}</span>)}
              </div>
            </div>

            <div className="flex gap-3">
              <MagneticButton href={project.github} target="_blank" rel="noreferrer"
                className="px-6 py-3 border border-border bg-surface-2 text-foreground text-sm rounded-xl hover:border-border-hover flex items-center gap-2">
                <Github className="w-4 h-4" /> Repository
              </MagneticButton>
              <MagneticButton className="px-6 py-3 text-white text-sm rounded-xl flex items-center gap-2" style={{ backgroundColor: project.color, boxShadow: `0 0 20px ${project.color}40` }}>
                <ExternalLink className="w-4 h-4" /> Live Demo
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
