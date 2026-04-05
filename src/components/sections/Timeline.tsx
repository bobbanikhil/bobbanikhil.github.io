import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PORTFOLIO_DATA } from "../../constants";

export default function Timeline() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute top-8 left-8 font-mono text-[10px] text-pink tracking-widest z-20">
        CHAPTER_03 // THE JOURNEY
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink to-[#F472B6]">
            Career Timeline
          </h2>
        </motion.div>

        {/* Vertical Timeline Line */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-pink/50 via-pink/20 to-transparent hidden md:block" />

          {PORTFOLIO_DATA.experiences.map((exp, index) => (
            <TimelineCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ exp, index }: { exp: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -60 : 60, 0]);

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`relative flex items-center mb-16 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-2 flex items-center justify-center z-10 shadow-[0_0_20px_currentColor] hidden md:flex" style={{ borderColor: exp.color, color: exp.color }}>
        <exp.icon className="w-5 h-5" />
      </div>

      {/* Card */}
      <div className={`w-full md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
        <motion.div
          className="group relative bg-black/40 backdrop-blur-xl border p-8 overflow-hidden interactive hover:shadow-[0_0_30px_currentColor] transition-all duration-500"
          style={{ borderColor: `${exp.color}30`, color: exp.color }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Decorative sidebar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" style={{ backgroundColor: exp.color, boxShadow: `0 0 15px ${exp.color}` }} />

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: exp.color }}>{exp.period}</span>
            <div className="h-[1px] w-8" style={{ backgroundColor: `${exp.color}50` }} />
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">{exp.type}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-2 group-hover:text-current transition-colors duration-300">
            {exp.role}
          </h3>
          <p className="font-mono text-sm tracking-widest mb-4" style={{ color: `${exp.color}90` }}>{exp.company}</p>
          <p className="text-white/60 text-base leading-relaxed">{exp.description}</p>

          {/* Corner accent */}
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: exp.color }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
