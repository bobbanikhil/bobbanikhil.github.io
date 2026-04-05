import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import MagneticButton from "../MagneticButton";
import { DATA } from "../../constants";

function GlitchText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text.split("").map((c, i) => (i < iteration ? c : chars[Math.floor(Math.random() * chars.length)])).join("")
        );
        iteration += 0.5;
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplay(text);
          setDone(true);
        }
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={done ? "" : "text-accent"}>{display || "\u00A0"}</span>;
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(numericPart * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [numericPart]);

  return <>{value.includes(".") ? count.toFixed(1) : Math.floor(count)}{suffix}</>;
}

export default function Hero() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="top" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)", top: "5%", left: "5%" }}
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", bottom: "5%", right: "5%" }}
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-main relative z-10 flex flex-col items-center text-center pt-16 pb-24">
        {/* HUD corners */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: entered ? 0.2 : 0 }} transition={{ delay: 1.5 }}
          className="absolute top-4 left-4 w-10 h-10 border-l border-t border-accent/20 pointer-events-none hidden md:block" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: entered ? 0.2 : 0 }} transition={{ delay: 1.5 }}
          className="absolute top-4 right-4 w-10 h-10 border-r border-t border-accent/20 pointer-events-none hidden md:block" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: entered ? 0.2 : 0 }} transition={{ delay: 1.5 }}
          className="absolute bottom-20 left-4 w-10 h-10 border-l border-b border-accent/20 pointer-events-none hidden md:block" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: entered ? 0.2 : 0 }} transition={{ delay: 1.5 }}
          className="absolute bottom-20 right-4 w-10 h-10 border-r border-b border-accent/20 pointer-events-none hidden md:block" />

        {/* Status */}
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3 }} className="badge mb-10">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-display font-bold tracking-tighter text-foreground leading-[0.9] mb-6">
          <GlitchText text="Vaasu Nikhil" delay={600} />
          <br />
          <span className="text-gradient"><GlitchText text="Bobba" delay={1200} /></span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
          className="text-lg md:text-xl text-text-muted max-w-lg mb-3 font-light">
          {DATA.tagline}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="hud-label mb-12">
          📍 {DATA.location} · {DATA.role}
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <MagneticButton href="#work" className="px-8 py-3.5 bg-accent text-white text-sm rounded-xl glow-accent flex items-center gap-2">
            Enter Arena →
          </MagneticButton>
          <MagneticButton href="#contact" className="px-8 py-3.5 bg-surface border border-border text-text text-sm rounded-xl hover:bg-surface-2 hover:border-border-hover">
            Get in Touch
          </MagneticButton>
          <MagneticButton href={DATA.social.github} target="_blank" rel="noreferrer"
            className="w-11 h-11 flex items-center justify-center bg-surface border border-border rounded-xl hover:bg-surface-2 hover:border-border-hover text-text-muted hover:text-foreground">
            <Github className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton href={DATA.social.linkedin} target="_blank" rel="noreferrer"
            className="w-11 h-11 flex items-center justify-center bg-surface border border-border rounded-xl hover:bg-surface-2 hover:border-border-hover text-text-muted hover:text-foreground">
            <Linkedin className="w-4 h-4" />
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }} className="flex items-center gap-8 md:gap-14">
          {DATA.stats.map((s) => (
            <div key={s.label} className="text-center group interactive">
              <div className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                <AnimatedCounter value={s.value} suffix={s.value.replace(/[0-9.]/g, "")} />
              </div>
              <div className="hud-label mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 3 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="w-4 h-4 text-text-subtle" />
        </motion.div>
      </motion.div>
    </section>
  );
}
