import type { Metadata } from 'next';
import ContactPageClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch about business systems, AI integrations, computer-vision automation, or full-stack builds.',
};

export default function ContactPage() {
  return (<>
      <h1 className="sr-only">Contact</h1>
      <ContactPageClient />
    </>);
}
