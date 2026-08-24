import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ResultsStats } from "@/components/testimonials/ResultsStats";
import { TestimonialGrid } from "@/components/testimonials/TestimonialGrid";
import { FeaturedStories } from "@/components/testimonials/FeaturedStories";
import { ConsentNote } from "@/components/testimonials/ConsentNote";
import { AssessmentCTA } from "@/components/home/AssessmentCTA";
import { Users, Star, Repeat } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero
          variant="image"
          align="left"
          eyebrow="CLIENT STORIES"
          title="What changed, in their *own words*."
          subtitle="Clients who arrived after years of normal reports and unresolved symptoms. These are their accounts of what the process was actually like — including how long it took."
          breadcrumb={breadcrumb}
          image={{
            src: "https://images.unsplash.com/photo-1542372236-b0760f353683?auto=format&fit=crop&q=80&w=1920",
            alt: "A person cooking in a bright kitchen",
          }}
        >
          <MetaChip icon={Users} label="500+ Clients" />
          <MetaChip icon={Star} label="4.9 Average Rating" />
          <MetaChip icon={Repeat} label="Most Refer Someone" />
        </PageHero>

        <ResultsStats />
        <TestimonialGrid />
        <FeaturedStories />
        <ConsentNote />
        <AssessmentCTA 
          title="Their story started with one *form*."
          subtitle="Ten minutes covering your symptoms, history, lifestyle and food habits — reviewed personally by Dt. Sai Sowjanya, with a response within 24 hours."
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
