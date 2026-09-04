'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { Mail, Send, AlertCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SiGithub as GithubIcon } from 'react-icons/si';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const WEB3FORMS_API = 'https://api.web3forms.com/submit';

const isConfigured = !!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY && process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY !== 'your-access-key-here';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    setError(null);

    if (!isConfigured) {
      setError('Contact form is currently unavailable. Please reach out directly.');
      setLoading(false);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    try {
      const res = await fetch(WEB3FORMS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: siteConfig.displayName,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setSubmitted(true);
        reset();
      } else {
        setError(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Contact" description="Get in touch with me" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            {!isConfigured ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">&#9993;</div>
                <h3 className="text-lg font-semibold">Get in Touch</h3>
                <p className="text-sm text-muted-foreground mt-2">The contact form is currently unavailable. Please reach out directly via email or GitHub.</p>
                <div className="mt-4 space-y-2">
                  <a href={siteConfig.email} className="block text-sm text-primary hover:underline">{siteConfig.email.replace('mailto:', '')}</a>
                  <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">github.com/Lito016</a>
                </div>
              </div>
            ) : submitted ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">&#10003;</div>
                <h3 className="text-lg font-semibold">Message Sent!</h3>
                <p className="text-sm text-muted-foreground mt-2">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-primary hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <p>{error}</p>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input {...register('name')} id="name" aria-describedby={errors.name ? 'name-error' : undefined} className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.name && <p id="name-error" role="alert" className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input {...register('email')} id="email" type="email" aria-describedby={errors.email ? 'email-error' : undefined} className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.email && <p id="email-error" role="alert" className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <input {...register('subject')} id="subject" aria-describedby={errors.subject ? 'subject-error' : undefined} className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.subject && <p id="subject-error" role="alert" className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea {...register('message')} id="message" rows={5} aria-describedby={errors.message ? 'message-error' : undefined} className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  {errors.message && <p id="message-error" role="alert" className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-3">
                <a href={siteConfig.email} className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><Mail className="h-4 w-4" aria-hidden="true" />manolitoalmadenjr@gmail.com</a>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><GithubIcon className="h-4 w-4" aria-hidden="true" />github.com/Lito016<span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-2">Collaborate</h3>
              <p className="text-sm text-muted-foreground">Whether it&apos;s an AI integration, a full-stack build, or an open-source effort — I&apos;m interested in work that solves real problems.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
