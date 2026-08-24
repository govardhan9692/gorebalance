import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ProgramsGrid } from "@/components/treatments/ProgramsGrid";
import { WhatsIncluded } from "@/components/treatments/WhatsIncluded";
import { ProgramJourney } from "@/components/treatments/ProgramJourney";
import { TreatmentsFaq } from "@/components/treatments/TreatmentsFaq";
import { AssessmentCTA } from "@/components/home/AssessmentCTA";
import { treatmentsCtaCopy } from "@/data/content";

import { Layers, UserCheck, Video } from "lucide-react";

export default function Treatments() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Treatments", href: "/treatments" },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero
          variant="image"
          align="left"
          eyebrow="OUR PROGRAMS"
          title="Nutrition built around your *condition*."
          subtitle="Six focused programs, each addressing a different root cause — but all starting from the same place: your gut, your history and your daily life. Most clients begin with one and find the others resolve alongside it."
          breadcrumb={breadcrumb}
          image={{
            src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920",
            alt: "A professional clinical nutrition consultation setup with fresh ingredients in warm natural light",
          }}
        >
          <div className="flex flex-wrap gap-3">
            <MetaChip icon={Layers} label="6 Focused Programs" />
            <MetaChip icon={UserCheck} label="Personalised, Never Templated" />
            <MetaChip icon={Video} label="In-Clinic & Online" />
          </div>
        </PageHero>

        <ProgramsGrid />
        <WhatsIncluded />
        <ProgramJourney />
        <TreatmentsFaq />
        <AssessmentCTA
          title={treatmentsCtaCopy.title}
          subtitle={treatmentsCtaCopy.subtitle}
        />
      </main>

      <Footer />
    </>
  );
}

function MetaChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[rgba(244,248,245,0.1)] border border-[rgba(244,248,245,0.2)] backdrop-blur-md">
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-[13px] font-medium text-[#F4F8F5]">{label}</span>
    </div>
  );
}
