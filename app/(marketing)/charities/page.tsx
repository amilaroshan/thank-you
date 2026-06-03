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
    name: "Shrewsbury and Telford Hospital Charity",
    logo: "/charity/1.jpg",
    url: "https://www.justgiving.com/page/sharegratitude-sathcharity",
  },
  {
    name: "Wishlist Charity",
    logo: "/charity/8.png",
    url: "https://www.wishlist.org.au/how-you-can-help/sharegratitude-donate",
  },
  {
    name: "Gore & Districts Health Incorporated",
    logo: "/charity/5.png",
    url: "https://www.justgiving.com/campaign/gorehealthsharegratitude",
  },
  {
    name: "Hospice UK",
    logo: "/charity/4.png",
    url: "https://www.justgiving.com/page/sharegratitudeforhospiceuk",
  },
  {
    name: "St Mark's Hospital Foundation",
    logo: "/charity/3.png",
    url: "https://www.justgiving.com/campaign/stmarkssharegratitude",
  },
  {
    name: "University Hospital Coventry & Warwickshire Charity",
    logo: "/charity/2.png",
    url: "https://www.justgiving.com/uhcw",
  },
  {
    name: "St John Ambulance",
    logo: "/charity/9.png",
    url: "https://www.sja.org.uk/donate/",
  },
  {
    name: "Cancer Research UK",
    logo: "/charity/6.png",
    url: "https://www.cancerresearchuk.org/get-involved/donate",
  },
  {
    name: "Charity: Water",
    logo: "/charity/7.png",
    url: "https://www.charitywater.org/donate",
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[26px] lg:grid-cols-3">
            {charities.map((charity) => (
              <a
                key={charity.name}
                href={charity.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Donate to ${charity.name}`}
                className="relative block overflow-hidden rounded-[6px] bg-white transition-shadow hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]"
                style={{ height: "220px", border: "1px solid #ddd" }}
              >
                <Image
                  src={charity.logo}
                  alt={charity.name}
                  fill
                  className="object-contain p-8"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
