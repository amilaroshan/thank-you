import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TypeformEmbed } from "@/components/sections/TypeformEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the ShareGratitude team. We'd love to hear from hospitals, practices, and partners interested in bringing HUMAN by ShareGratitude to their staff.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Have a question or want to bring ShareGratitude to your team? Send us a message and we'll be in touch."
      />

      {/* Typeform embed */}
      <section aria-label="Contact form" className="px-4 py-12">
        <div className="mx-auto max-w-[1200px]">
          <TypeformEmbed formId="01JNM9SCSPHXF06NHKTK5Z13V2" />
        </div>
      </section>
    </>
  );
}
