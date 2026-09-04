import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { TechStackMarquee } from '@/components/sections/tech-stack-marquee';
import { ContactCTA } from '@/components/sections/contact-cta';
import type { Metadata } from 'next';
import { PageTransition } from '@/components/shared/page-transition';

export const metadata: Metadata = {
  title: 'Home',
  description: 'AI Solution Developer - Portfolio of Manolito Almaden Jr. (Lito_016)',
};

export default async function HomePage() {
  return (
    <PageTransition>
      <div className="space-y-0">
        <Hero />
        <TechStackMarquee />
        <FeaturedProjects />
        <ContactCTA />
      </div>
    </PageTransition>
  );
}
