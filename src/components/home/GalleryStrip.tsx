import * as React from "react";
import { Maximize2 } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { galleryItems } from "@/data/content";
import { Lightbox } from "@/components/shared/Lightbox";
import { cn } from "@/lib/utils";

export function GalleryStrip() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const nextItem = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
  const prevItem = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));

  return (
    <SectionWrapper id="gallery" bg="alt" labelledBy="gallery-heading" className="relative">
      <div className="mb-[44px] lg:mb-[56px]">
        <SectionHeading
          eyebrow="INSIDE GOREBALANCE"
          title="Moments from the *practice*."
          subtitle="Consultations, meal plans, workshops and the everyday work of rebuilding gut health — across our Hyderabad and Kakinada clinics."
          align="center"
        />
      </div>

      <Reveal stagger={0.08} className="w-full">
        <ul className="grid gap-[12px] md:gap-[16px] lg:gap-[20px] 
          grid-cols-2 md:grid-cols-2 lg:grid-cols-4
          lg:grid-rows-[260px_200px_260px] 2xl:grid-rows-[300px_230px_300px]
          list-none p-0 m-0">
          
          {galleryItems.map((item, index) => {
            const isHero = index === 0;
            const gridPlacements = [
              "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3 md:col-span-2 md:row-span-2 col-span-2 row-span-2", // Item 1
              "lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2", // Item 2
              "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4", // Item 3
              "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3", // Item 4
              "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4 md:col-span-2", // Item 5
              "lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-4 col-span-2 md:col-span-1", // Item 6 (span 2 on mobile to complete row)
            ];

            return (
              <li key={item.id} className={cn("relative overflow-hidden group", gridPlacements[index])}>
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="block w-full h-full relative overflow-hidden rounded-[16px] md:rounded-[20px] bg-surface p-0 border-none cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all"
                  aria-label={`${item.caption} — open larger image`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    loading={isHero ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-focus-visible:scale-[1.07]"
                  />
                  
                  {/* Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1512]/72 via-[#0e1512]/20 to-transparent opacity-100 md:opacity-35 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  
                  {/* Caption Block */}
                  <div className="absolute bottom-0 left-0 right-0 p-[14px] md:p-[20px] text-left transition-all duration-400 transform translate-y-0 md:translate-y-2 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {/* Hide category chip on small squares below 768px - actually handled by specific logic or just size */}
                    <div className="hidden md:inline-flex items-center px-[10px] py-[4px] bg-white/16 backdrop-blur-md rounded-full text-[11px] font-semibold text-white uppercase tracking-wider mb-2">
                      {item.category}
                    </div>
                    <div className="text-[13px] md:text-[15px] font-semibold text-white leading-[1.35] shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
                      {item.caption}
                    </div>
                  </div>

                  {/* Expand Affordance */}
                  <div className="absolute top-[14px] right-[14px] w-[34px] h-[34px] bg-white/16 backdrop-blur-[10px] border border-white/24 rounded-full flex items-center justify-center text-white transition-all duration-400 transform scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 hidden md:flex">
                    <Maximize2 size={16} />
                  </div>
                  
                  {/* Inset ring on hover */}
                  <div className="absolute inset-0 pointer-events-none transition-all duration-400 group-hover:shadow-[inset_0_0_0_1.5px_var(--accent)] group-focus-visible:shadow-[inset_0_0_0_1.5px_var(--accent)]" />
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mt-[40px] md:mt-[48px] flex justify-center">
        <a
          href="/gallery"
          className="h-[52px] px-[30px] rounded-full border-[1.5px] border-primary text-primary text-[15px] font-semibold flex items-center gap-2 transition-all hover:bg-primary-soft hover:-translate-y-[2px] group"
        >
          View Full Gallery
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <Lightbox
        items={galleryItems}
        selectedIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={closeLightbox}
        onNext={nextItem}
        onPrev={prevItem}
      />
    </SectionWrapper>
  );
}
