import { useEffect, useRef, useState } from "react";

export default function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const clicking = useRef(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rid = useRef(0);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering.current = !!el.closest('a, button, [role="button"], .interactive, input, textarea, select');
    };

    const onDown = () => {
      clicking.current = true;
      const id = ++rid.current;
      setRipples(prev => [...prev, { id, x: pos.current.x, y: pos.current.y }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 500);
    };
    const onUp = () => { clicking.current = false; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf: number;
    const animate = () => {
      // Smooth lerp for ring
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        const s = clicking.current ? 0.5 : 1;
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${s})`;
      }

      if (ringRef.current) {
        const scale = hovering.current ? 2.2 : clicking.current ? 0.7 : 1;
        const opacity = hovering.current ? 0.5 : 0.3;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = opacity.toString();
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window)) return null;

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          border: '1.5px solid rgba(99, 102, 241, 0.35)',
          transition: 'opacity 0.25s ease',
          mixBlendMode: 'difference',
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000]"
        style={{
          willChange: 'transform',
          background: '#6366f1',
          boxShadow: '0 0 6px rgba(99, 102, 241, 0.5)',
        }}
      />

      {/* Click ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            animation: 'ripple-out 0.5s ease-out forwards',
          }}
        />
      ))}

      <style>{`
        @keyframes ripple-out {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 60px; height: 60px; opacity: 0; }
        }
      `}</style>
    </>
  );
}
