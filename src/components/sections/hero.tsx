import { HeroMotion } from '@/components/hero/hero-motion';
import { HeroCanvas } from '@/components/hero/hero-canvas';
import { ParallaxProfileImage } from '@/components/hero/parallax-profile';
import { POSITIONING } from '@/config/site';
import { education } from '@/data/education';

const heroLines = POSITIONING.split('|').map((line) => line.trim());
const heroLocation = education[0]?.location ?? 'Philippines';

/** Hero: full-bleed particle canvas background, content left, profile image right. */
export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-[var(--rule)] bg-[var(--bg-canvas)] section-band"
    >
      {/* Full-bleed particle canvas background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85dvh] w-full max-w-[var(--content-wide)] flex-col items-center gap-8 px-[var(--gutter)] pt-[calc(var(--nav-h)+24px)] md:flex-row md:items-center md:gap-12 md:pt-[calc(var(--nav-h)+32px)]">
        {/* Text content */}
        <div className="min-w-0 flex-1">
          <HeroMotion
            lines={heroLines}
            valueLine="Systems that run operations — designed, built, tested, and deployed end to end."
            location={heroLocation}
          />
        </div>

        {/* Profile image with parallax depth */}
        <ParallaxProfileImage />
      </div>
    </section>
  );
}
