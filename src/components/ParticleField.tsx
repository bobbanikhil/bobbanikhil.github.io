import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;
    let mx = -9999, my = -9999;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR for perf
    // Fewer particles = WAY faster. 60 is plenty for ambiance.
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 60);
    const cursorRadius = 140;

    interface P { x: number; y: number; vx: number; vy: number; size: number; alpha: number; cr: number; cg: number; cb: number }
    const particles: P[] = [];

    const colorSets = [
      [99, 102, 241],  // indigo
      [6, 182, 212],   // cyan
      [139, 92, 246],  // violet
    ];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const c = colorSets[i % 3];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.25 + 0.08,
          cr: c[0], cg: c[1], cb: c[2],
        });
      }
    };

    resize();
    init();

    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    let resizeTimer: any;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { resize(); init(); }, 200); };
    window.addEventListener("resize", onResize);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor repulsion (O(n) only)
        const dx = mx - p.x;
        const dy = my - p.y;
        const distSq = dx * dx + dy * dy;
        const rSq = cursorRadius * cursorRadius;

        if (distSq < rSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (cursorRadius - dist) / cursorRadius;
          p.vx -= (dx / dist) * force * 0.08;
          p.vy -= (dy / dist) * force * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap
        if (p.x < -5) p.x = w + 5;
        else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        else if (p.y > h + 5) p.y = -5;

        // Glow near cursor
        const proximity = distSq < rSq ? 1 - Math.sqrt(distSq) / cursorRadius : 0;
        const drawAlpha = p.alpha + proximity * 0.4;
        const drawSize = p.size + proximity * 1.5;

        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${drawAlpha})`;
        ctx.fillRect(p.x - drawSize, p.y - drawSize, drawSize * 2, drawSize * 2);
      }

      // Cursor spotlight (single draw op)
      if (mx > 0 && my > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        glow.addColorStop(0, "rgba(99, 102, 241, 0.03)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(mx - 200, my - 200, 400, 400);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
