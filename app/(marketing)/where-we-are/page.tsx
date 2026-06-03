import { getLocationData } from "@/lib/api";
import { HeroSearch } from "@/components/sections/HeroSearch";
import { StatsBar } from "@/components/sections/StatsBar";
import { WorldMap } from "@/components/sections/WorldMap";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Where We Are",
  description:
    "ShareGratitude is live in hospitals across the UK and Australia, with more countries coming soon. See where you can use our platform.",
  path: "/where-we-are",
});

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
        className="w-full"
        aria-hidden="true"
      />

      {/* World map section */}
      <section
        aria-label="World map of ShareGratitude availability"
        className="py-0 px-4 bg-[#F5FDFD]"
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
