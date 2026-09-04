'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { Code, Brain, Rocket, BookOpen } from 'lucide-react';

const timeline = [
  {
    year: '2021',
    title: 'Started IT Studies',
    description: 'Began Bachelor of Science in Information Technology, focusing on web development fundamentals.',
    icon: BookOpen,
  },
  {
    year: '2023',
    title: 'Joined GitHub',
    description: 'Started contributing to open source and building personal projects.',
    icon: Code,
  },
  {
    year: '2024',
    title: 'AI Specialization',
    description: 'Completed Bayanaihan AI, Agentic AI Bootcamp, and AI Intensive Workshop programs.',
    icon: Brain,
  },
  {
    year: '2024',
    title: 'OJT Internship',
    description: 'Developed a digital journaling platform with AI-powered insights for students.',
    icon: Rocket,
  },
  {
    year: '2025',
    title: 'AI Solution Developer',
    description: 'Building AI-integrated web platforms with agentic workflows and RAG architectures.',
    icon: Brain,
  },
  {
    year: '2026',
    title: 'IT Specialist Certified',
    description: 'Earned IT Specialist - HTML & CSS certification from Certiport / Pearson VUE.',
    icon: BookOpen,
  },
];

export function AboutPageClient() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading
          title="About"
          description="Background and what drives my work"
        />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-none mb-12 space-y-4"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m Manolito Almaden Jr. — I go by Lito_016 online. I build AI-integrated
            web platforms: RAG pipelines, agentic workflows, and the occasional open-source
            tool that makes a developer&apos;s life easier.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I studied Information Technology and picked up practical AI skills through
            the Bayanaihan AI program, an Agentic AI Bootcamp, and a Generative AI
            Intensive. My OJT project — a digital journaling platform with AI-powered
            insights — was where theory met production constraints.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            These days I&apos;m focused on LLM integration, fine-tuning, and shipping
            software that people actually use. I care about clean code, but I care
            more about whether the thing works for the person clicking the button.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <SectionHeading title="My Journey" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 z-10" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-sm font-medium text-primary">{item.year}</span>
                  <h3 className="text-lg font-semibold mt-1 flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
