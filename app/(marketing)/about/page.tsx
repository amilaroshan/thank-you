import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "About | ShareGratitude",
  description:
    "ShareGratitude was born from the extraordinary acts of care witnessed during COVID-19. Learn about our founders and our mission to make every healthcare worker feel seen.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About us"
        subtitle="From a global movement of gratitude to a personal, real-time connection transforming healthcare from within"
        bgImage="/images/about-hero-bg.png"
      />

      {/* Content */}
      <section
        aria-label="About ShareGratitude"
        className="py-12 px-4"
      >
        <div
          className="mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[92px]"
          style={{ maxWidth: "1200px" }}
        >
          {/* Left: Our Story */}
          <div className="flex-1 min-w-0">
            <h2
              className="font-semibold text-[20px] sm:text-[24px]"
              style={{ lineHeight: "28px", color: "#000" }}
            >
              Our Story
            </h2>
            <div
              className="mt-6 space-y-4 font-normal text-sm sm:text-[16px]"
              style={{ lineHeight: "22px", color: "#000" }}
            >
              <p>
                ShareGratitude was born from the extraordinary acts of care witnessed during the
                COVID-19 pandemic and from the lived experiences of our founders, Don Amal Francis
                and NHS surgeon Dr Janindra Warusavitarne, both as a clinician and as patients.
              </p>
              <p>
                Moved by the public&apos;s desire to show appreciation, they self-funded a global
                initiative that reached over three million people across eighteen countries, but soon
                realised that broad public positivity, while powerful, rarely reached the individual
                staff who needed it most. Real impact required something more focused, more personal,
                and sustainably embedded into everyday healthcare.
              </p>
              <p>
                Working with staff, patients, and system leaders, they designed HUMAN by
                ShareGratitude: a safe, turnkey, and scalable programme that delivers real time
                one-to-one appreciation directly to staff mobile phones, restoring the
                patient-to-staff connection and driving psychological safety.
              </p>
              <p>
                What began as a public movement has evolved into a globally adopted workforce
                intervention, transforming morale and wellbeing by putting human appreciation back
                at the heart of healthcare.
              </p>
            </div>
          </div>

          {/* Right: Our Raison-D'être */}
          <div className="w-full lg:w-[545px] lg:shrink-0 flex flex-col items-start lg:items-end text-left lg:text-right">
            <h2
              className="font-semibold text-[20px] sm:text-[24px]"
              style={{ lineHeight: "28px", color: "#000" }}
            >
              Our Raison-D&apos;être
            </h2>
            <div
              className="mt-6 space-y-4 font-normal text-sm sm:text-[16px]"
              style={{ lineHeight: "22px", color: "#000" }}
            >
              <p>
                We believe that when staff feel valued, they thrive, and when staff thrive, care and
                safety improve. Our purpose is simple: Ensure every healthcare professional feels
                appreciated, supported and seen, every single day.
              </p>
              <p>This remains at the core of everything we do.</p>
            </div>
            <p
              className="mt-6 font-semibold text-sm sm:text-[16px]"
              style={{ lineHeight: "22px", color: "#000" }}
            >
              Dr Janindra Warusavitarne &amp; Don Amal Francis
            </p>
            <div className="mt-4">
              <Image
                src="/images/about-signatures.png"
                alt="Signatures of Dr Janindra Warusavitarne and Don Amal Francis"
                width={314}
                height={76}
                className="h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
