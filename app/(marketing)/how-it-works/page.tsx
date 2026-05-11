import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { ThankYouCallout } from "@/components/sections/ThankYouCallout";

export const metadata: Metadata = {
  title: "How It Works | ShareGratitude",
  description:
    "See how easy it is to send a thank-you message to NHS and healthcare staff. No account needed. Scan a QR code, write a message, and it's delivered directly.",
};

const steps = [
  {
    number: "01",
    title: "Scan a QR code",
    description: "Scan a QR code in your hospital or click here to search",
    illustration: "/images/hiw-step1.svg",
    illustrationWidth: 151,
    illustrationHeight: 113,
    alt: "Hospital building illustration",
  },
  {
    number: "02",
    title: "Choose a staff member",
    description: "Scroll through or search for the person you want to thank",
    illustration: "/images/hiw-step2.svg",
    illustrationWidth: 125,
    illustrationHeight: 125,
    alt: "Doctor illustration",
  },
  {
    number: "03",
    title: "Write your message",
    description: "Your words will be delivered directly to the their mobile phone",
    illustration: "/images/hiw-step3.svg",
    illustrationWidth: 141,
    illustrationHeight: 141,
    alt: "Person on phone illustration",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How it works"
        subtitle="Safe and Secure.  No account needed. No registraion required."
      />

      {/* Steps section */}
      <section
        aria-label="How it works steps"
        className="py-10 px-4"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-center sm:gap-12">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center gap-2 text-center"
                style={{ width: "239px", maxWidth: "100%" }}
              >
                {/* Illustration */}
                <div className="flex items-end justify-center" style={{ height: "141px" }}>
                  <Image
                    src={step.illustration}
                    alt={step.alt}
                    width={step.illustrationWidth}
                    height={step.illustrationHeight}
                    className="h-auto"
                  />
                </div>

                {/* Step number */}
                <p
                  className="font-normal mt-2"
                  style={{
                    fontSize: "45.684px",
                    color: "#00CCCC",
                    letterSpacing: "-2.2842px",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </p>

                {/* Title */}
                <p
                  className="font-semibold"
                  style={{ fontSize: "16px", color: "#091f48" }}
                >
                  {step.title}
                </p>

                {/* Description */}
                <p
                  className="font-normal"
                  style={{ fontSize: "14px", color: "#091f48" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <ThankYouCallout
        title="Have someone to thank?"
        description="No account needed. It takes less than 2 minutes."
        buttonText="How to say Thank You"
        href="/say-thank-you"
      />
    </>
  );
}
