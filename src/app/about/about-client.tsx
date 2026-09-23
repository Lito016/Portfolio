'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { FlowDiagram } from '@/components/projects/flow-diagram';

const workflowSteps = [
  { id: 'understand', label: 'Understand', detail: 'Map the real workflow, its constraints, and who uses the system before any code.' },
  { id: 'model', label: 'Model', detail: 'Design the data model first — entities, relations, and states mirror the business.' },
  { id: 'design', label: 'Design', detail: 'Set system boundaries and interfaces: clear flows for users, clear contracts for services.' },
  { id: 'build', label: 'Build', detail: 'Ship in verifiable slices on a real stack, from schema to deployment config.' },
  { id: 'test', label: 'Test', detail: 'Cover edge cases and failure paths, not only the happy path.' },
  { id: 'deploy', label: 'Deploy', detail: 'Reproducible builds and environments — no snowflake releases.' },
  { id: 'monitor', label: 'Monitor', detail: 'Watch production behavior: errors, performance, and actual usage.' },
  { id: 'improve', label: 'Improve', detail: 'Feed what the system learned back into the next iteration.' },
];

export function AboutPageClient() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading
          title="About"
          description="What I build and how I work"
        />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 max-w-none space-y-4"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m Manolito Almaden Jr. — I go by Lito_016 online. I&apos;m an AI
            solution developer and full-stack systems developer: business &amp;
            management systems, AI &amp; developer tools, and computer-vision
            automation — delivered end to end, from data model to deployment.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            My AI practice runs through MCP servers, retrieval pipelines, and
            agentic workflows — anchored by the Bayanihan AI program, an Agentic
            AI Bootcamp, and a Generative AI Intensive. My OJT project — a
            digital journaling platform with AI-powered insights — is where
            theory met production constraints.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The problems I solve are operational: records that must stay
            consistent, workflows that replace paper, detection that replaces
            manual watching, and tooling that makes developers faster. I care
            about clean code, but more about whether the thing works for the
            person clicking the button.
          </p>
        </motion.div>

        {/* Engineering workflow */}
        <SectionHeading
          title="How I Work"
          description="One loop for every system I build"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <FlowDiagram kind="workflow" title="Engineering workflow" steps={workflowSteps} />
        </motion.div>
      </div>
    </PageTransition>
  );
}
