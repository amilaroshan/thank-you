import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Charities | ShareGratitude",
  description:
    "ShareGratitude partners with leading healthcare charities. Every message of gratitude helps support the people who support our healthcare heroes.",
};

const charities = [
  {
    name: "NHS Charities Together",
    logo: "/charities/charity-nhs.png",
    bg: null,
    border: null,
    display: "cover" as const,
  },
  {
    name: "IMA World Health",
    logo: "/charities/charity-ima.png",
    bg: "white",
    border: "#bababa",
    display: "contain" as const,
  },
  {
    name: "Marie Curie",
    logo: "/charities/charity-mariecurie.png",
    bg: "white",
    border: "#c4c4c4",
    display: "contain" as const,
  },
  {
    name: "Chafrity",
    logo: "/charities/charity-chafrity.png",
    bg: "#007045",
    border: null,
    display: "centered" as const,
  },
  {
    name: "Red Cross",
    logo: "/charities/charity-redcross.png",
    bg: "white",
    border: "#bababa",
    display: "contain" as const,
  },
  {
    name: "Project C.U.R.E.",
    logo: "/charities/charity-projectcure.png",
    bg: "#c71e30",
    border: null,
    display: "contain" as const,
  },
];

export default function CharitiesPage() {
  return (
    <>
      <PageHero
        title="Charities"
        subtitle="Turn everyday moments of appreciation into a powerful movement of support—for staff, for teams, and for the charity that stands behind them"
      />

      {/* Charity grid */}
      <section aria-label="Partner charities" className="py-10 px-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
            {charities.map((charity) => (
              <div
                key={charity.name}
                className="relative overflow-hidden rounded-[6px]"
                style={{
                  height: "268px",
                  backgroundColor: charity.bg ?? undefined,
                  border: charity.border ? `1px solid ${charity.border}` : "none",
                }}
              >
                {charity.display === "cover" ? (
                  <Image
                    src={charity.logo}
                    alt={charity.name}
                    fill
                    className="object-cover"
                  />
                ) : charity.display === "centered" ? (
                  <div className="absolute inset-0 flex items-center justify-center px-[15%]">
                    <Image
                      src={charity.logo}
                      alt={charity.name}
                      width={270}
                      height={270}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                ) : (
                  <Image
                    src={charity.logo}
                    alt={charity.name}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
