'use client';

import dynamic from 'next/dynamic';

// Lazy-load particles for better initial page load
const ParticlesBackground = dynamic(
  () => import('@/components/shared/particles').then((mod) => ({ default: mod.ParticlesBackground })),
  { ssr: false }
);

export function LazyParticles() {
  return <ParticlesBackground />;
}
