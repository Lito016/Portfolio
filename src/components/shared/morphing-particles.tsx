'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  amplitudeX: number;
  amplitudeY: number;
}

/**
 * Canvas-based morphing particle blobs.
 * Large soft circles drift with sine-wave motion and visually merge/blend
 * when they overlap, creating organic blob-like clusters.
 * Inspired by the Solutions section of antigravity.google.
 */
export function MorphingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);
  const isDarkRef = useRef(true);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initBlobs(rect.width, rect.height);
    };

    const initBlobs = (width: number, height: number) => {
      // Fewer, larger blobs for organic feel
      const count = Math.max(6, Math.min(Math.floor((width * height) / 25000), 18));
      const blobs: Blob[] = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        blobs.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: Math.random() * 30 + 15,
          opacity: Math.random() * 0.06 + 0.02,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          speedX: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
          speedY: (Math.random() * 0.2 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
          amplitudeX: Math.random() * 60 + 30,
          amplitudeY: Math.random() * 40 + 20,
        });
      }
      blobsRef.current = blobs;
    };

    let time = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / 30; // throttle to 30fps for Firefox compatibility

    const animate = (timestamp: number) => {
      // Skip frames to maintain 30fps
      if (timestamp - lastFrame < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Use lighter composite for blending effect when blobs overlap
      ctx.globalCompositeOperation = 'lighter';

      for (const b of blobsRef.current) {
        // Sine-wave drift for organic motion
        const targetX = b.baseX + Math.sin(time * b.speedX + b.phaseX) * b.amplitudeX;
        const targetY = b.baseY + Math.cos(time * b.speedY + b.phaseY) * b.amplitudeY;

        // Mouse repulsion
        const mouse = mouseRef.current;
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          b.vx += (dx / dist) * force * 0.6;
          b.vy += (dy / dist) * force * 0.6;
        }

        // Spring back toward sine-wave target
        b.vx += (targetX - b.x) * 0.03;
        b.vy += (targetY - b.y) * 0.03;

        // Damping
        b.vx *= 0.92;
        b.vy *= 0.92;

        // Update position
        b.x += b.vx;
        b.y += b.vy;

        // Draw soft radial gradient blob — color adapts to theme
        const isDark = isDarkRef.current;
        const color = isDark ? '255, 255, 255' : '59, 130, 246';
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.radius,
        );
        gradient.addColorStop(0, `rgba(${color}, ${b.opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(${color}, ${b.opacity * 0.25})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Detect theme and react to changes
    const updateTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    resize();
    animate(0);

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
