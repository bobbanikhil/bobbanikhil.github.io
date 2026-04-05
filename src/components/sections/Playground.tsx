import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

export default function Playground() {
  return (
    <section id="playground" className="section">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="mb-14">
          <p className="hud-label mb-3">// SANDBOX_MODE</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Playground</h2>
          <p className="text-text-muted mt-3 max-w-lg">Interactive experiments &amp; creative coding. Click, drag, and play around.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}>
            <PhysicsDemo />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ delay: 0.1 }}>
            <WaveVisualizer />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ delay: 0.15 }}>
            <DrawingCanvas />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ delay: 0.2 }}>
            <TypingChallenge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ========== PHYSICS SANDBOX ========== */
function PhysicsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = container.clientWidth;
    const h = 280;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const balls: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const colors = ["#6366f1", "#06b6d4", "#a78bfa", "#ec4899", "#f59e0b", "#22c55e"];
    for (let i = 0; i < 12; i++) {
      balls.push({ x: 30 + Math.random() * (w - 60), y: 30 + Math.random() * (h - 60), vx: (Math.random() - 0.5) * 2.5, vy: (Math.random() - 0.5) * 2.5, r: 8 + Math.random() * 12, color: colors[i % colors.length] });
    }

    let mx = -999, my = -999, isDown = false;
    const onMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mx = e.clientX - rect.left; my = e.clientY - rect.top; };
    const onDown = () => { isDown = true; }; const onUp = () => { isDown = false; };
    const onLeave = () => { mx = -999; my = -999; isDown = false; };
    canvas.addEventListener("mousemove", onMove, { passive: true }); canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp); canvas.addEventListener("mouseleave", onLeave);

    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.25)"; ctx.fillRect(0, 0, w, h);
      for (const b of balls) {
        b.vy += 0.12;
        if (mx > 0) { const dx = mx - b.x, dy = my - b.y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { b.vx += (dx / dist) * (isDown ? 0.5 : -0.25); b.vy += (dy / dist) * (isDown ? 0.5 : -0.25); } }
        b.x += b.vx; b.y += b.vy; b.vx *= 0.995; b.vy *= 0.995;
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -0.8; } if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -0.8; }
        if (b.y - b.r < 0) { b.y = b.r; b.vy *= -0.8; } if (b.y + b.r > h) { b.y = h - b.r; b.vy *= -0.8; }
        for (const o of balls) { if (o === b) continue; const dx = o.x - b.x, dy = o.y - b.y, d = Math.sqrt(dx * dx + dy * dy), m = b.r + o.r; if (d < m && d > 0) { const nx = dx / d, ny = dy / d; b.x -= nx * (m - d) * 0.5; b.y -= ny * (m - d) * 0.5; o.x += nx * (m - d) * 0.5; o.y += ny * (m - d) * 0.5; const dvn = (b.vx - o.vx) * nx + (b.vy - o.vy) * ny; b.vx -= dvn * nx * 0.7; b.vy -= dvn * ny * 0.7; o.vx += dvn * nx * 0.7; o.vy += dvn * ny * 0.7; } }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fillStyle = b.color; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mousedown", onDown); canvas.removeEventListener("mouseup", onUp); canvas.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div ref={containerRef} className="glass-card overflow-hidden interactive">
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" /><span className="text-sm font-display font-semibold text-foreground">Physics Sandbox</span></div>
        <p className="text-xs text-text-subtle">Hover to repel · Click to attract · Watch them collide</p>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: 280 }} />
    </div>
  );
}

/* ========== WAVE VISUALIZER ========== */
function WaveVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current; const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = container.clientWidth; const h = 280;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let mx = w / 2, my = h / 2;
    const onMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mx = e.clientX - rect.left; my = e.clientY - rect.top; };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    let time = 0; let raf: number;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.07)"; ctx.fillRect(0, 0, w, h); time += 0.02;
      const waves = [
        { color: "rgba(99, 102, 241, 0.4)", amp: 30, freq: 0.02, speed: 1, offset: 0 },
        { color: "rgba(6, 182, 212, 0.3)", amp: 24, freq: 0.025, speed: 1.3, offset: 2 },
        { color: "rgba(139, 92, 246, 0.2)", amp: 18, freq: 0.03, speed: 0.8, offset: 4 },
      ];
      const cursorInfluence = (my / h - 0.5) * 40;
      for (const wave of waves) {
        ctx.beginPath(); ctx.moveTo(0, h / 2);
        for (let x = 0; x <= w; x += 3) { // step=3 for perf
          const boost = Math.max(0, 1 - Math.abs(x - mx) / 180) * 15;
          const y = h / 2 + Math.sin(x * wave.freq + time * wave.speed + wave.offset) * (wave.amp + boost) + cursorInfluence;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color; ctx.lineWidth = 2; ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div ref={containerRef} className="glass-card overflow-hidden interactive">
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot" /><span className="text-sm font-display font-semibold text-foreground">Wave Generator</span></div>
        <p className="text-xs text-text-subtle">Move cursor to modulate waves</p>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: 280 }} />
    </div>
  );
}

/* ========== DRAWING CANVAS / NEON PAINT ========== */
function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const hue = useRef(0);

  useEffect(() => {
    const container = containerRef.current; const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = container.clientWidth; const h = 280;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "rgba(10, 10, 15, 1)"; ctx.fillRect(0, 0, w, h);
    ctx.lineCap = "round"; ctx.lineJoin = "round";

    const getPos = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

    const onDown = (e: MouseEvent) => { drawing.current = true; last.current = getPos(e); };
    const onUp = () => { drawing.current = false; };
    const onMove = (e: MouseEvent) => {
      if (!drawing.current) return;
      const p = getPos(e);
      hue.current = (hue.current + 1) % 360;
      ctx.strokeStyle = `hsl(${hue.current}, 80%, 65%)`;
      ctx.lineWidth = 3;
      ctx.shadowColor = `hsl(${hue.current}, 80%, 65%)`;
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.shadowBlur = 0;
      last.current = p;
    };

    canvas.addEventListener("mousedown", onDown); canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onUp); canvas.addEventListener("mousemove", onMove, { passive: true });

    return () => { canvas.removeEventListener("mousedown", onDown); canvas.removeEventListener("mouseup", onUp); canvas.removeEventListener("mouseleave", onUp); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  const clear = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.fillStyle = "rgba(10, 10, 15, 1)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div ref={containerRef} className="glass-card overflow-hidden interactive">
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-rose animate-pulse-dot" /><span className="text-sm font-display font-semibold text-foreground">Neon Paint</span></div>
          <p className="text-xs text-text-subtle">Click &amp; drag to draw with rainbow neon</p>
        </div>
        <button onClick={clear} className="px-3 py-1 text-[10px] font-mono bg-surface-2 border border-border rounded-lg text-text-muted hover:text-foreground hover:border-accent/50 transition-all interactive">Clear</button>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: 280 }} />
    </div>
  );
}

/* ========== TYPING SPEED CHALLENGE ========== */
function TypingChallenge() {
  const phrases = [
    "const ai = new Intelligence();",
    "deploy production pipeline",
    "machine learning is the future",
    "build ship iterate repeat",
    "transform uncertainty into outcomes",
    "autonomous systems that learn",
  ];
  const [phrase, setPhrase] = useState(phrases[0]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const start = useCallback(() => {
    const p = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(p); setInput(""); setStarted(false); setDone(false); setWpm(0); setAccuracy(100);
  }, []);

  const onType = (v: string) => {
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    setInput(v);
    // Accuracy
    let correct = 0;
    for (let i = 0; i < v.length; i++) { if (v[i] === phrase[i]) correct++; }
    setAccuracy(v.length > 0 ? Math.round((correct / v.length) * 100) : 100);

    if (v.length >= phrase.length) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const words = phrase.split(" ").length;
      setWpm(Math.round(words / elapsed));
      setDone(true);
    }
  };

  return (
    <div className="glass-card p-6 interactive">
      <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-green animate-pulse-dot" /><span className="text-sm font-display font-semibold text-foreground">Typing Challenge</span></div>
      <p className="text-xs text-text-subtle mb-5">Type the phrase below as fast as you can</p>

      {/* Phrase display */}
      <div className="font-mono text-sm mb-4 p-4 bg-surface-2 rounded-xl border border-border min-h-[48px] leading-relaxed">
        {phrase.split("").map((char, i) => {
          let color = "text-text-subtle";
          if (i < input.length) color = input[i] === char ? "text-green" : "text-rose";
          if (i === input.length) color = "text-accent border-l border-accent animate-pulse";
          return <span key={i} className={`${color} transition-colors`}>{char}</span>;
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => !done && onType(e.target.value)}
        placeholder={done ? "Challenge complete!" : "Start typing..."}
        disabled={done}
        className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-subtle outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all font-mono interactive mb-4"
        autoComplete="off"
        spellCheck="false"
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-lg font-display font-bold text-foreground">{done ? wpm : "—"}</div>
            <div className="hud-label">WPM</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-display font-bold ${accuracy >= 90 ? 'text-green' : accuracy >= 70 ? 'text-warm' : 'text-rose'}`}>{accuracy}%</div>
            <div className="hud-label">Accuracy</div>
          </div>
        </div>
        <button onClick={start} className="px-4 py-2 text-xs font-mono bg-surface-2 border border-border rounded-lg text-text-muted hover:text-foreground hover:border-accent/50 transition-all interactive">
          {done ? "Try Again" : "New Phrase"}
        </button>
      </div>
    </div>
  );
}
