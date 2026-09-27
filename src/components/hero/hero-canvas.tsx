'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

const DOT_COLOR = { r: 0x3c, g: 0x40, b: 0x43 }; // --ink-3, decorative only
const ACCENT_COLOR = { r: 0x1a, g: 0x73, b: 0xe8 }; // --accent (graphic role)
const BG_COLOR = '#F8F9FC'; // --bg-canvas

/** 2D lattice canvas (ADR-3.3): DPR<=2, rAF only while in view + reduced-motion
 * off (background-tab rAF throttling is browser-native), pointer lag <=3vw via
 * useSpring(100/10). aria-hidden; coarse pointer and reduced motion get the
 * static sunk panel (no rAF ever mounted). */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 100, damping: 10 });
  const sy = useSpring(py, { stiffness: 100, damping: 10 });
  const shiftX = useTransform(sx, (v) => v * 24); // 24px = 1.67vw at 1440; <=3vw law with shiftY
  const shiftY = useTransform(sy, (v) => v * 18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.dataset.static = 'true'; // static until the loop is proven capable
    const finePointer = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduced.matches) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    delete canvas.dataset.static; // loop takes over painting

    let width = 0;
    let height = 0;
    let visible = true;
    // document.hasFocus() is unreliable in headless harnesses; assume focused
    // until an explicit blur, per window focus/blur events.
    let focused = true;
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const ox = shiftX.get();
      const oy = shiftY.get();
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);
      const gap = 46;
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const fx = (ox / 24) * gap;
      const fy = (oy / 18) * gap;
      const pxPx = ((ox / 24 + 1) / 2) * width;
      const pyPx = ((oy / 18 + 1) / 2) * height;
      for (let c = 0; c < cols; c += 1) {
        for (let r = 0; r < rows; r += 1) {
          const x = c * gap - gap + (r % 2 === 0 ? 0 : gap / 2) + Math.sin(t / 2600 + r * 0.55) * 2.5 + fx;
          const y = r * gap - gap + oy * 0.25 + fy * 0.4;
          const dist = Math.hypot(x - pxPx, y - pyPx);
          const near = dist < 150 && (px.get() !== 0 || py.get() !== 0);
          const k = 1 - dist / 150;
          const col = near ? ACCENT_COLOR : DOT_COLOR;
          const alpha = near ? 0.18 + k * 0.55 : 0.14;
          const radius = near ? 1.2 + k * 1.8 : 1.1 + Math.sin(t / 1800 + c * 0.7 + r * 1.3) * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`;
          ctx.fill();
        }
      }
    };

    const isActive = () => visible && focused && !reduced.matches;

    const frame = (t: number) => {
      raf = 0;
      if (!isActive()) return;
      draw(t);
      raf = requestAnimationFrame(frame);
    };
    const schedule = () => {
      if (isActive() && !raf) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(parent);
    resize();
    draw(performance.now());

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        schedule();
      },
      { threshold: 0 },
    );
    io.observe(parent);

    const onPointer = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onFocus = () => {
      focused = true;
      schedule();
    };
    const onBlur = () => {
      focused = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onReducedChange = () => {
      if (reduced.matches && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    reduced.addEventListener('change', onReducedChange);
    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      reduced.removeEventListener('change', onReducedChange);
    };
  }, [px, py, shiftX, shiftY]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-canvas block h-full w-full"
    />
  );
}
