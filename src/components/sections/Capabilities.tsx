import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../../constants";

export default function Capabilities() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-8 left-8 font-mono text-[10px] text-tertiary tracking-widest z-20">
        CHAPTER_02 // THE CORE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-[#FBBF24] drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            Strategic Prowess
          </h2>
          <p className="font-mono text-tertiary/70 tracking-widest mt-4 text-xs">
            CORE CAPABILITIES //
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PORTFOLIO_DATA.strategicProwess.map((prowess, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-black/40 backdrop-blur-xl border border-tertiary/20 p-8 overflow-hidden interactive hover:border-tertiary/50 transition-all duration-500"
              style={{ perspective: '1000px' }}
            >
              {/* Number watermark */}
              <div className="absolute -right-4 -top-4 text-[8rem] font-headline font-black text-tertiary/5 pointer-events-none select-none leading-none group-hover:text-tertiary/10 transition-colors duration-500">
                {prowess.num}
              </div>

              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-tertiary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_10px_#F59E0B]" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-6 group-hover:bg-tertiary group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                  <prowess.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-headline font-bold tracking-tight mb-4 text-white group-hover:text-tertiary transition-colors duration-300">
                  {prowess.title}
                </h3>
                <p className="text-white/60 font-mono text-sm leading-relaxed">
                  {prowess.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-tertiary/0 group-hover:border-tertiary/30 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
