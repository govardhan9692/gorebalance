import * as React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { StorySection } from "@/components/about/StorySection";
import { WhoWeHelp } from "@/components/about/WhoWeHelp";
import { ClinicLocations } from "@/components/about/ClinicLocations";
import { AssessmentCTA } from "@/components/home/AssessmentCTA";
import { CurveDivider } from "@/components/shared/CurveDivider";
import { aboutCtaCopy } from "@/data/content";
import { Award, Users, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const aboutHeroProps = {
  eyebrow: "ABOUT GOREBALANCE",
  title: "The nutritionist who asks *why* first.",
  subtitle:
    "Dt. N. Sai Sowjanya has spent eight years treating the cause behind bloating, hormonal imbalance and fatigue — not the symptom sheet. This is how that practice works, and why it starts with your story.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000",
    alt: "Professional and warm consultation room with natural light",
    width: 2000,
    height: 1200,
  },
};

const MetaChip = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="inline-flex items-center gap-[7px] px-3.5 py-2 rounded-full bg-[rgba(244,248,245,0.10)] border border-[rgba(244,248,245,0.20)] backdrop-blur-md">
    <Icon size={15} className="text-accent" />
    <span className="text-[13px] font-medium text-[#F4F8F5]">{label}</span>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <PageHero {...aboutHeroProps}>
          <MetaChip icon={Award} label="8+ Years of Practice" />
          <MetaChip icon={Users} label="500+ Clients" />
          <MetaChip icon={MapPin} label="Hyderabad & Kakinada" />
        </PageHero>
        <StorySection />
        <CurveDivider fill="alt" />
        <WhoWeHelp />
        <CurveDivider fill="base" flip />
        <ClinicLocations />
        <AssessmentCTA 
          title={aboutCtaCopy.title} 
          subtitle={aboutCtaCopy.subtitle} 
        />
      </main>
      <Footer />
    </div>
  );
}