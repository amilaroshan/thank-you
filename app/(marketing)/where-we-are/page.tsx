import type { Metadata } from "next";
import { getLocationData } from "@/lib/api";
import { HeroSearch } from "@/components/sections/HeroSearch";
import { StatsBar } from "@/components/sections/StatsBar";
import { WorldMap } from "@/components/sections/WorldMap";
import { PartnersStrip } from "@/components/sections/PartnersStrip";

export const metadata: Metadata = {
  title: "Where We Are",
  description:
    "ShareGratitude is live in hospitals across the UK and Australia, with more countries coming soon. See where you can use our platform.",
};

export const revalidate = 3600;

export default async function WhereWeArePage() {
  const { countries } = await getLocationData();

  const countryStatuses = Object.fromEntries(
    Object.entries(countries).map(([code, { status }]) => [code, status])
  );

  return (
    <>
      {/* Hero with hospital background + search bar */}
      <HeroSearch />

      {/* Stats: 63+, 402+, 170,780, 13,846,900 */}
      <StatsBar />

      {/* Teal accent stripe — Figma Rectangle 17 */}
      <div
        className="h-[39px] w-full"
        style={{ backgroundColor: "#00CCCC" }}
        aria-hidden="true"
      />

      {/* World map section */}
      <section
        aria-label="World map of ShareGratitude availability"
        className="py-10 px-4"
        style={{ backgroundColor: "rgba(0, 204, 204, 0.04)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <WorldMap countryStatuses={countryStatuses} />
        </div>
      </section>

      {/* Partner logos */}
      <PartnersStrip />
    </>
  );
}
