'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

/**
 * Canvas-based interactive particle background.
 * Particles float gently and repel from the mouse cursor (antigravity effect).
 * Lightweight — no dependencies, pure canvas + requestAnimationFrame.
 */
export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isDarkRef = useRef(true);

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
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      // Density: roughly 1 particle per 8000px², capped
      const area = width * height;
      const count = Math.min(Math.floor(area / 8000), 120);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.3 + 0.1), // gentle upward drift (antigravity)
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      particlesRef.current = particles;
    };

    let lastFrame = 0;
    const frameInterval = 1000 / 30; // throttle to 30fps for Firefox compatibility

    const animate = (timestamp: number) => {
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

      const mouse = mouseRef.current;
      const repelRadius = 120;
      const repelStrength = 0.08;

      for (const p of particlesRef.current) {
        // Mouse repulsion (antigravity)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          p.vx += (dx / dist) * force * repelStrength;
          p.vy += (dy / dist) * force * repelStrength;
        }

        // Gentle return to base position
        p.vx += (p.baseX - p.x) * 0.001;
        p.vy += (p.baseY - p.y) * 0.001;

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle — color adapts to theme
        const isDark = isDarkRef.current;
        const color = isDark ? '255, 255, 255' : '59, 130, 246';
        const sizeMultiplier = isDark ? 1 : 1.5;
        const opacityMultiplier = isDark ? 1 : 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * sizeMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.min(p.opacity * opacityMultiplier, 0.5)})`;
        ctx.fill();
      }

      // Draw subtle connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const isDark = isDarkRef.current;
            const lineColor = isDark ? '255, 255, 255' : '59, 130, 246';
            const lineOpacity = isDark ? 0.04 : 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity * (1 - dist / 100)})`;
            ctx.lineWidth = isDark ? 0.5 : 0.8;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

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

    // Listen on parent element so mouse events work even when content overlays the canvas
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
