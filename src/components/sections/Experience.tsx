import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { DATA } from "../../constants";

const levelColors = ["#6366f1", "#06b6d4", "#f59e0b", "#22c55e"];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="mb-14">
          <p className="hud-label mb-3">// LEVEL_PROGRESSION</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/50 via-border to-transparent hidden md:block" />

          <div className="flex flex-col gap-4">
            {DATA.experiences.map((exp, i) => {
              const color = levelColors[i % levelColors.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative flex gap-5 interactive"
                >
                  {/* Level dot */}
                  <div className="hidden md:flex flex-col items-center pt-3 flex-shrink-0">
                    <div className="relative w-[11px] h-[11px] rounded-full z-10" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}>
                      {exp.current && <span className="absolute -inset-1.5 rounded-full border animate-pulse-dot" style={{ borderColor: `${color}50` }} />}
                    </div>
                  </div>

                  <div className="flex-1 glass-card p-6 group-hover:border-border-hover relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" style={{ backgroundColor: color }} />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}20`, color }}>
                          L{i + 1}
                        </span>
                        <div>
                          <h3 className="text-base font-display font-semibold text-foreground group-hover:text-accent transition-colors">{exp.role}</h3>
                          <p className="text-sm text-text-muted flex items-center gap-1">{exp.company} <span className="text-text-subtle">·</span> <MapPin className="w-3 h-3 inline" /> {exp.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {exp.current && <span className="px-2 py-0.5 text-[10px] font-mono rounded-full" style={{ backgroundColor: `${color}15`, color }}>Active</span>}
                        <span className="text-xs font-mono text-text-subtle whitespace-nowrap">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 ml-10">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-sm text-text-muted leading-relaxed flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="mt-16">
          <p className="hud-label mb-6">// EDUCATION</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATA.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 interactive"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-display font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-sm text-text-muted">{edu.school}</p>
                  </div>
                  {edu.gpa && <span className="badge text-accent">{edu.gpa}</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-subtle font-mono">
                  <span>{edu.period}</span>
                  <span>·</span>
                  <span>{edu.focus}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
