import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { ContactMethods } from '@/components/contact/ContactMethods';
import { Clock, MapPin, Video } from 'lucide-react';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { AssessmentCTA } from '@/components/home/AssessmentCTA';
import { ClinicLocationsFull } from '@/components/contact/ClinicLocationsFull';
import { HoursAndFaq } from '@/components/contact/HoursAndFaq';

const Contact = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <PageHero
          variant="image"
          align="left"
          eyebrow="GET IN TOUCH"
          title="Ask first. Decide *after*."
          subtitle="Questions about a condition, the programs, timelines or fees — message the clinic directly. You'll get a real answer from Dt. Sai Sowjanya's practice, not an automated reply."
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' }
          ]}
          image={{ 
            src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1400",
            alt: "A calm, warm clinic reception space with natural light"
          }}
        >
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-[12px] font-semibold">
              <Clock className="w-4 h-4" /> Replies within 24 hours
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-[12px] font-semibold">
              <MapPin className="w-4 h-4" /> Hyderabad & Kakinada
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-[12px] font-semibold">
              <Video className="w-4 h-4" /> Online consultations
            </span>
          </div>
        </PageHero>

        <ContactMethods />
        
        <EnquiryForm />

        <ClinicLocationsFull />

        <HoursAndFaq />

        <AssessmentCTA 
          title="Skip the back-and-forth. Start the *assessment*."
          subtitle="It's the booking step and the first consultation rolled into one — your symptoms, history, lifestyle and food habits, reviewed personally before you're contacted."
        />
      </main>
      <Footer />
    </>
  );
};

export default Contact;