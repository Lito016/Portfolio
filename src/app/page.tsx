import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { WhatIBuild } from '@/components/sections/what-i-build';
import { ContactCTA } from '@/components/sections/contact-cta';
import { whatIBuildCategories } from '@/data/projects';

/** Single-page composition, canvas §architecture order: Hero -> Work -> Story -> Close. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="work">
        <FeaturedProjects />
      </div>
      <div id="about">
        <WhatIBuild items={whatIBuildCategories} />
      </div>
      <div id="contact">
        <ContactCTA />
      </div>
    </>
  );
}
