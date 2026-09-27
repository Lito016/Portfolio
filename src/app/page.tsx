import { Hero } from '@/components/sections/hero';
import { Work } from '@/components/sections/work';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';

/** Single-page composition, canvas §architecture order: Hero -> Work -> Story -> Close. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
