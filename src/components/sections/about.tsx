import { education } from '@/data/education';
import { experiences } from '@/data/experience';
import { nowData } from '@/data/now';
import { skillCategories } from '@/data/skills';
import { whatIBuildCategories } from '@/data/projects';
import { Reveal } from '@/components/shared/reveal';
import { formatMonthYear } from '@/lib/dates';

const [firstExperience] = experiences;
const [firstEducation] = education;

/**
 * About (FR-11/REQ-11): editorial large statement + concise metadata block.
 * Every sentence traces to the whitelist: statement = W21 positioning strings
 * verbatim; bio sentences restate W21 categories, W24 end-to-end framing, and
 * data-file facts (education.description, experience description lines);
 * metadata values are read from the typed arrays, never retyped.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-[var(--gutter)] py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[var(--content-wide)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <p className="label-mono">About</p>
            <h2
              id="about-heading"
              className="mt-4 font-medium leading-[0.9] tracking-[-0.03em] text-[var(--ink)] text-[clamp(2.5rem,7vw,7rem)]"
            >
              AI Solution Developer.
              <br />
              Full-Stack Systems Developer.
            </h2>
            <div className="mt-8 max-w-[56ch] space-y-4 text-[15px] leading-relaxed text-[var(--ink-3)]">
              {/* W21 categories + W24 end-to-end framing */}
              <p>
                I design and build end to end: operational systems that model real workflows, infrastructure that
                makes AI usable in production, and detection pipelines that turn raw video into events and clips.
              </p>
              {/* education.description + experience description lines */}
              <p>
                My foundation is a BS Information Technology program with coursework in web development, mobile
                development, database management, and software engineering, sharpened by an internship at{' '}
                {firstExperience.company} where AI-powered tools supported development tasks, including code
                generation, testing, debugging, and documentation.
              </p>
              {/* nowData.building verbatim (finding F1; no paraphrase) */}
              <p>Currently building: {nowData.building}.</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="border-t border-[var(--rule)]">
              <MetaRow label="Location" value={firstExperience.location} />
              <MetaRow
                label="Education"
                value={`${firstEducation.degree}, ${firstEducation.school} (${firstEducation.startDate}–${firstEducation.endDate})`}
              />
              <MetaRow
                label="Experience"
                value={`${firstExperience.role}, ${firstExperience.company} (${formatMonthYear(
                  firstExperience.startDate,
                )} – ${formatMonthYear(firstExperience.endDate)})`}
              />
              <MetaRow label="Specialties" value={whatIBuildCategories.map((item) => item.title).join(' · ')} />
              <MetaRow label="Technologies" value={skillCategories.map((domain) => domain.name).join(' · ')} />
              <MetaRow label="Current focus" value={nowData.building} />
              <MetaRow label="Learning" value={nowData.learning.join(' · ')} />
              <MetaRow label="Exploring" value={nowData.exploring} />
              <MetaRow label="Last updated" value={nowData.lastUpdated} />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-[var(--rule-deep)] py-4 sm:grid-cols-[minmax(0,14ch)_minmax(0,1fr)] sm:gap-4">
      <dt className="label-mono pt-0.5">{label}</dt>
      <dd className="text-[14px] leading-relaxed text-[var(--ink-3)]">{value}</dd>
    </div>
  );
}
