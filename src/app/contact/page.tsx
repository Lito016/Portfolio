'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { Mail, Send } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SiGithub as GithubIcon } from 'react-icons/si';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    const mailtoLink = `mailto:${siteConfig.email.replace('mailto:', '')}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`)}`;
    window.location.assign(mailtoLink);
    setSubmitted(true);
    reset();
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Contact" description="Get in touch with me" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            {submitted ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">&#10003;</div>
                <h3 className="text-lg font-semibold">Message Sent!</h3>
                <p className="text-sm text-muted-foreground mt-2">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-primary hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input {...register('name')} id="name" className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.name && <p role="alert" className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input {...register('email')} id="email" type="email" className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.email && <p role="alert" className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <input {...register('subject')} id="subject" className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.subject && <p role="alert" className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea {...register('message')} id="message" rows={5} className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  {errors.message && <p role="alert" className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  <Send className="h-4 w-4" />Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-3">
                <a href={siteConfig.email} className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><Mail className="h-4 w-4" />manolitoalmadenjr@gmail.com</a>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><GithubIcon className="h-4 w-4" />github.com/Lito016</a>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-2">Let&apos;s Collaborate</h3>
              <p className="text-sm text-muted-foreground">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
