import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { VideoHighlights } from "@/components/gallery/VideoHighlights";
import { AssessmentCTA } from "@/components/home/AssessmentCTA";
import { CurveDivider } from "@/components/shared/CurveDivider";
import { galleryCtaCopy } from "@/data/content";
import { Images, MapPin, Camera } from "lucide-react";

export default function Gallery() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <PageHero
          variant="image"
          align="left"
          eyebrow="GALLERY"
          title="Inside the *practice*."
          subtitle="The clinics, the consultations, the plans and the food that goes into them — across our Hyderabad and Kakinada spaces."
          breadcrumb={breadcrumb}
          image={{
            src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920",
            alt: "Warm, natural-light clinic interior consultation space",
          }}
        >
          <div className="flex flex-wrap gap-3">
            <MetaChip icon={Images} label="40+ Moments" />
            <MetaChip icon={MapPin} label="Two Clinics" />
            <MetaChip icon={Camera} label="Clinic & Community" />
          </div>
        </PageHero>

        <MasonryGallery />

        <CurveDivider fill="alt" />
        <VideoHighlights />

        <AssessmentCTA title={galleryCtaCopy.title} subtitle={galleryCtaCopy.subtitle} />
      </main>
      <Footer />
    </div>
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
