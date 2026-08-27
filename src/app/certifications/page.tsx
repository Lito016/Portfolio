'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { certifications } from '@/data/certifications';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificationsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <SectionHeading title="Certifications" description="Professional certifications and training" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-primary/10 p-2"><Award className="h-5 w-5 text-primary" /></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-primary">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: {cert.date}</p>
                  {cert.description && <p className="text-sm text-muted-foreground mt-2">{cert.description}</p>}
                  {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">Verify<ExternalLink className="h-3 w-3" /></a>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
