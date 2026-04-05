import { motion } from "motion/react";
import { DATA } from "../../constants";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="mb-12">
          <p className="hud-label mb-3">// IDENTITY_CORE</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-3 glass-card p-8 interactive relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-text-muted leading-relaxed text-base md:text-lg">{DATA.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["AI Systems", "Full-Stack", "ML Pipelines", "Data Analytics", "Automation", "Enterprise AI"].map(s => (
                <span key={s} className="badge interactive">{s}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-8 interactive relative overflow-hidden">
            <div className="hud-label mb-6">SYSTEM STATUS</div>
            <div className="space-y-5">
              <StatusRow label="Focus" value="AI Engineering" color="#6366f1" width={92} />
              <StatusRow label="Education" value="M.S. UWM" color="#06b6d4" width={100} />
              <StatusRow label="Projects" value="6+ Active" color="#22c55e" width={85} />
              <StatusRow label="Availability" value="Open" color="#f59e0b" width={100} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatusRow({ label, value, color, width }: { label: string; value: string; color: string; width: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-text-muted">{label}</span>
        <span className="text-foreground font-medium">{value}</span>
      </div>
      <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}40` }}
        />
      </div>
    </div>
  );
}
