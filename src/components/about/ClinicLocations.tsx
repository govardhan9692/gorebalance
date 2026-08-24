import * as React from "react";
import { MapPin, Clock, Phone, Navigation, Video } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { brand, clinics, clinicsCopy } from "@/data/content";

export function ClinicLocations() {
  return (
    <SectionWrapper id="locations" bg="base" labelledBy="locations-heading">
      <SectionHeading
        align="center"
        eyebrow={clinicsCopy.eyebrow}
        title={clinicsCopy.title}
        subtitle={clinicsCopy.subtitle}
      />

      <Reveal
        as="ul"
        stagger={0.07}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 items-stretch list-none p-0 m-0"
      >
        {clinics.map((clinic) => (
          <li key={clinic.id} className="h-full">
            <article className="group h-full flex flex-col bg-surface border border-border rounded-[24px] overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-[0.22,1,0.36,1] hover:hover:-translate-y-1 hover:hover:border-primary/30 hover:hover:shadow-[0_16px_40px_rgba(31,77,61,0.10)]">
              {/* City image strip */}
              <div className="relative h-[110px] md:h-[140px] overflow-hidden">
                <img
                  src={clinic.image.src}
                  alt={clinic.image.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-[0.22,1,0.36,1] group-hover:scale-105 motion-reduce:transform-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(14,21,18,0.72) 0%, rgba(14,21,18,0) 70%)" }}
                />
                <h3
                  className="absolute bottom-0 left-0 p-5 font-fraunces font-medium text-[#F4F8F5]"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                >
                  {clinic.city}
                </h3>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-grow p-5 sm:p-[26px_24px]">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent mb-[14px]">
                  {clinic.state}
                </p>

                <div className="flex flex-col gap-[14px] flex-grow">
                  {/* NOTE FOR CLIENT: exact street addresses to be supplied by the client. */}
                  <div className="flex gap-3">
                    <MapPin size={17} className="text-primary shrink-0 mt-[2px]" aria-hidden="true" />
                    <span className="text-[14.5px] leading-[1.6] text-text-muted">{clinic.address}</span>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={17} className="text-primary shrink-0 mt-[2px]" aria-hidden="true" />
                    <span className="text-[14.5px] leading-[1.6] text-text-muted">{clinic.hours}</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={17} className="text-primary shrink-0 mt-[2px]" aria-hidden="true" />
                    <a
                      href={`tel:+${brand.phoneRaw}`}
                      aria-label={`Call ${brand.phone}`}
                      className="text-[14.5px] leading-[1.6] font-medium text-text hover:text-accent transition-colors"
                    >
                      {brand.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-[22px] flex flex-col min-[480px]:flex-row gap-[10px]">
                  <a
                    href={clinicsCopy.bookHref}
                    className="h-12 flex-grow inline-flex items-center justify-center rounded-pill bg-accent text-white text-[14.5px] font-semibold px-5 transition-opacity hover:opacity-90"
                  >
                    {clinicsCopy.bookLabel}
                  </a>
                  {/* NOTE FOR CLIENT: replace with the exact Google Maps pin for each clinic. */}
                  <a
                    href={clinic.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to the ${clinic.city} clinic (opens in a new tab)`}
                    className="h-12 inline-flex items-center justify-center gap-2 rounded-pill border-[1.5px] border-border text-text text-[14.5px] font-semibold px-5 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Navigation size={16} aria-hidden="true" />
                    {clinicsCopy.directionsLabel}
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </Reveal>

      {/* Online strip */}
      <Reveal>
        <div className="mt-7 rounded-[22px] border border-border bg-surface/70 backdrop-blur-[16px] p-5 sm:p-[26px_30px] flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div
              aria-hidden="true"
              className="w-12 h-12 shrink-0 rounded-full bg-primary-soft flex items-center justify-center"
            >
              <Video size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-fraunces font-medium text-text" style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.1875rem)" }}>
                {clinicsCopy.online.title}
              </p>
              <p className="text-[14px] leading-[1.6] text-text-muted mt-[6px]">
                {clinicsCopy.online.body}
              </p>
            </div>
          </div>
          <a
            href={clinicsCopy.online.ctaHref}
            className="h-[50px] w-full md:w-auto shrink-0 inline-flex items-center justify-center rounded-pill border-[1.5px] border-primary text-primary text-[14.5px] font-semibold px-[26px] transition-colors hover:bg-primary-soft"
          >
            {clinicsCopy.online.ctaLabel}
          </a>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
