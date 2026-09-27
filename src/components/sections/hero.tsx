import { HeroMotion } from '@/components/hero/hero-motion';
import { POSITIONING } from '@/config/site';
import { education } from '@/data/education';
import { nowData } from '@/data/now';

const heroLines = POSITIONING.split('|').map((line) => line.trim());
const heroLocation = education[0]?.location ?? 'Philippines';

/** Typographic hero: whitelisted positioning split server-side into whole-line
 * spans (ADR-3.2); the client island only animates them (FR-03 server-HTML rule). */
export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden border-b border-[var(--rule)] bg-[var(--bg-canvas)]">
      <HeroMotion
        lines={heroLines}
        valueLine="Systems that run operations — designed, built, tested, and deployed end to end."
        location={heroLocation}
        building={nowData.building}
      />
    </section>
  );
}
