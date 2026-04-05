import { motion } from "motion/react";
import { DATA } from "../../constants";

const categoryMeta: Record<string, { color: string; icon: string }> = {
  "AI & Machine Learning": { color: "#6366f1", icon: "🧠" },
  "Full-Stack & Frontend": { color: "#06b6d4", icon: "🎨" },
  "Data & Cloud": { color: "#f59e0b", icon: "☁️" },
  "Analytics & BI": { color: "#ec4899", icon: "📊" },
  "QA & DevOps": { color: "#22c55e", icon: "🔧" },
};

export default function Skills() {
  const categories = Object.entries(DATA.skills);

  return (
    <section id="skills" className="section">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="mb-14">
          <p className="hud-label mb-3">// SKILL_TREE</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Tech Arsenal</h2>
          <p className="text-text-muted mt-3">{categories.reduce((acc, [, s]) => acc + s.length, 0)} skills across {categories.length} domains</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, skills], i) => {
            const meta = categoryMeta[category] || { color: "#6366f1", icon: "⚡" };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card p-6 interactive group relative overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${meta.color}10, transparent)` }} />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border" style={{ borderColor: `${meta.color}30`, backgroundColor: `${meta.color}10` }}>
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-foreground">{category}</h3>
                    <p className="text-[10px] font-mono text-text-subtle">{skills.length} skills</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ delay: i * 0.03 + j * 0.02, duration: 0.3 }}
                      className="skill-node interactive"
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = meta.color;
                        el.style.color = meta.color;
                        el.style.boxShadow = `0 0 12px ${meta.color}30`;
                        el.style.transform = `scale(1.08)`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = '';
                        el.style.color = '';
                        el.style.boxShadow = '';
                        el.style.transform = '';
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
