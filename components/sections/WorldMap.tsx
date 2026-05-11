"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Geometry } from "geojson";
import type { CountryStatus } from "@/lib/types";

const GEO_URL = "/maps/world-110m.json";
const WIDTH = 800;
const HEIGHT = 420;

/* ISO 3166-1 numeric → { alpha2, name } */
const COUNTRY_DATA: Record<string, { alpha2: string; name: string }> = {
  "004": { alpha2: "AF", name: "Afghanistan" },
  "008": { alpha2: "AL", name: "Albania" },
  "012": { alpha2: "DZ", name: "Algeria" },
  "024": { alpha2: "AO", name: "Angola" },
  "032": { alpha2: "AR", name: "Argentina" },
  "036": { alpha2: "AU", name: "Australia" },
  "040": { alpha2: "AT", name: "Austria" },
  "050": { alpha2: "BD", name: "Bangladesh" },
  "056": { alpha2: "BE", name: "Belgium" },
  "068": { alpha2: "BO", name: "Bolivia" },
  "076": { alpha2: "BR", name: "Brazil" },
  "100": { alpha2: "BG", name: "Bulgaria" },
  "104": { alpha2: "MM", name: "Myanmar" },
  "116": { alpha2: "KH", name: "Cambodia" },
  "120": { alpha2: "CM", name: "Cameroon" },
  "124": { alpha2: "CA", name: "Canada" },
  "140": { alpha2: "CF", name: "Central African Republic" },
  "144": { alpha2: "LK", name: "Sri Lanka" },
  "148": { alpha2: "TD", name: "Chad" },
  "152": { alpha2: "CL", name: "Chile" },
  "156": { alpha2: "CN", name: "China" },
  "170": { alpha2: "CO", name: "Colombia" },
  "178": { alpha2: "CG", name: "Congo" },
  "180": { alpha2: "CD", name: "DR Congo" },
  "188": { alpha2: "CR", name: "Costa Rica" },
  "191": { alpha2: "HR", name: "Croatia" },
  "192": { alpha2: "CU", name: "Cuba" },
  "196": { alpha2: "CY", name: "Cyprus" },
  "203": { alpha2: "CZ", name: "Czech Republic" },
  "208": { alpha2: "DK", name: "Denmark" },
  "214": { alpha2: "DO", name: "Dominican Republic" },
  "218": { alpha2: "EC", name: "Ecuador" },
  "818": { alpha2: "EG", name: "Egypt" },
  "222": { alpha2: "SV", name: "El Salvador" },
  "232": { alpha2: "ER", name: "Eritrea" },
  "233": { alpha2: "EE", name: "Estonia" },
  "231": { alpha2: "ET", name: "Ethiopia" },
  "246": { alpha2: "FI", name: "Finland" },
  "250": { alpha2: "FR", name: "France" },
  "266": { alpha2: "GA", name: "Gabon" },
  "276": { alpha2: "DE", name: "Germany" },
  "288": { alpha2: "GH", name: "Ghana" },
  "300": { alpha2: "GR", name: "Greece" },
  "320": { alpha2: "GT", name: "Guatemala" },
  "324": { alpha2: "GN", name: "Guinea" },
  "624": { alpha2: "GW", name: "Guinea-Bissau" },
  "328": { alpha2: "GY", name: "Guyana" },
  "332": { alpha2: "HT", name: "Haiti" },
  "340": { alpha2: "HN", name: "Honduras" },
  "348": { alpha2: "HU", name: "Hungary" },
  "356": { alpha2: "IN", name: "India" },
  "360": { alpha2: "ID", name: "Indonesia" },
  "364": { alpha2: "IR", name: "Iran" },
  "368": { alpha2: "IQ", name: "Iraq" },
  "372": { alpha2: "IE", name: "Ireland" },
  "376": { alpha2: "IL", name: "Israel" },
  "380": { alpha2: "IT", name: "Italy" },
  "388": { alpha2: "JM", name: "Jamaica" },
  "392": { alpha2: "JP", name: "Japan" },
  "400": { alpha2: "JO", name: "Jordan" },
  "404": { alpha2: "KE", name: "Kenya" },
  "408": { alpha2: "KP", name: "North Korea" },
  "410": { alpha2: "KR", name: "South Korea" },
  "414": { alpha2: "KW", name: "Kuwait" },
  "418": { alpha2: "LA", name: "Laos" },
  "428": { alpha2: "LV", name: "Latvia" },
  "422": { alpha2: "LB", name: "Lebanon" },
  "426": { alpha2: "LS", name: "Lesotho" },
  "430": { alpha2: "LR", name: "Liberia" },
  "434": { alpha2: "LY", name: "Libya" },
  "440": { alpha2: "LT", name: "Lithuania" },
  "450": { alpha2: "MG", name: "Madagascar" },
  "454": { alpha2: "MW", name: "Malawi" },
  "458": { alpha2: "MY", name: "Malaysia" },
  "466": { alpha2: "ML", name: "Mali" },
  "478": { alpha2: "MR", name: "Mauritania" },
  "484": { alpha2: "MX", name: "Mexico" },
  "496": { alpha2: "MN", name: "Mongolia" },
  "504": { alpha2: "MA", name: "Morocco" },
  "508": { alpha2: "MZ", name: "Mozambique" },
  "516": { alpha2: "NA", name: "Namibia" },
  "524": { alpha2: "NP", name: "Nepal" },
  "528": { alpha2: "NL", name: "Netherlands" },
  "554": { alpha2: "NZ", name: "New Zealand" },
  "558": { alpha2: "NI", name: "Nicaragua" },
  "562": { alpha2: "NE", name: "Niger" },
  "566": { alpha2: "NG", name: "Nigeria" },
  "578": { alpha2: "NO", name: "Norway" },
  "512": { alpha2: "OM", name: "Oman" },
  "586": { alpha2: "PK", name: "Pakistan" },
  "591": { alpha2: "PA", name: "Panama" },
  "598": { alpha2: "PG", name: "Papua New Guinea" },
  "600": { alpha2: "PY", name: "Paraguay" },
  "604": { alpha2: "PE", name: "Peru" },
  "608": { alpha2: "PH", name: "Philippines" },
  "616": { alpha2: "PL", name: "Poland" },
  "620": { alpha2: "PT", name: "Portugal" },
  "634": { alpha2: "QA", name: "Qatar" },
  "642": { alpha2: "RO", name: "Romania" },
  "643": { alpha2: "RU", name: "Russia" },
  "682": { alpha2: "SA", name: "Saudi Arabia" },
  "686": { alpha2: "SN", name: "Senegal" },
  "694": { alpha2: "SL", name: "Sierra Leone" },
  "706": { alpha2: "SO", name: "Somalia" },
  "710": { alpha2: "ZA", name: "South Africa" },
  "724": { alpha2: "ES", name: "Spain" },
  "729": { alpha2: "SD", name: "Sudan" },
  "728": { alpha2: "SS", name: "South Sudan" },
  "752": { alpha2: "SE", name: "Sweden" },
  "756": { alpha2: "CH", name: "Switzerland" },
  "760": { alpha2: "SY", name: "Syria" },
  "762": { alpha2: "TJ", name: "Tajikistan" },
  "764": { alpha2: "TH", name: "Thailand" },
  "768": { alpha2: "TG", name: "Togo" },
  "795": { alpha2: "TM", name: "Turkmenistan" },
  "792": { alpha2: "TR", name: "Turkey" },
  "800": { alpha2: "UG", name: "Uganda" },
  "804": { alpha2: "UA", name: "Ukraine" },
  "784": { alpha2: "AE", name: "United Arab Emirates" },
  "826": { alpha2: "GB", name: "United Kingdom" },
  "840": { alpha2: "US", name: "United States" },
  "858": { alpha2: "UY", name: "Uruguay" },
  "860": { alpha2: "UZ", name: "Uzbekistan" },
  "862": { alpha2: "VE", name: "Venezuela" },
  "704": { alpha2: "VN", name: "Vietnam" },
  "887": { alpha2: "YE", name: "Yemen" },
  "894": { alpha2: "ZM", name: "Zambia" },
  "716": { alpha2: "ZW", name: "Zimbabwe" },
  "740": { alpha2: "SR", name: "Suriname" },
};

/* Exact colours from Figma legend */
const FILL = {
  available:     "#00CCCC",
  "coming-soon": "#99EBEB",
  default:       "#091f48",
} as const;

const HOVER_FILL = {
  available:     "#00A6A6",
  "coming-soon": "#77DEDE",
  default:       "#1a3a6b",
} as const;

type TooltipState = {
  x: number;
  y: number;
  name: string;
  status: CountryStatus | null;
} | null;

type Props = {
  countryStatuses: Record<string, CountryStatus>;
};

type WorldTopology = Topology<{ countries: GeometryCollection }>;

const projection = geoMercator().scale(147).center([10, 20]).translate([WIDTH / 2, HEIGHT / 2]);
const pathGenerator = geoPath(projection);

export function WorldMap({ countryStatuses }: Props) {
  const [topology, setTopology] = useState<WorldTopology | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then(setTopology)
      .catch(console.error);
  }, []);

  const statusByNumeric = useMemo(() => {
    const map: Record<string, CountryStatus> = {};
    for (const [numeric, { alpha2 }] of Object.entries(COUNTRY_DATA)) {
      if (countryStatuses[alpha2]) map[numeric] = countryStatuses[alpha2];
    }
    return map;
  }, [countryStatuses]);

  const countries = useMemo<Feature<Geometry>[]>(() => {
    if (!topology) return [];
    return feature(topology, topology.objects.countries).features;
  }, [topology]);

  const availableNames = useMemo(
    () =>
      Object.entries(countryStatuses)
        .filter(([, s]) => s === "available")
        .map(([a2]) => Object.values(COUNTRY_DATA).find((d) => d.alpha2 === a2)?.name ?? a2),
    [countryStatuses]
  );

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative mx-auto max-w-[789px]">
        <svg
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto"
          role="img"
          aria-label="World map showing ShareGratitude availability by country"
        >
          {countries.map((geo, index) => {
            const id = geo.id != null ? String(geo.id) : null;
            const key = id ?? `no-id-${index}`;
            const info = id ? COUNTRY_DATA[id] : undefined;
            const status = id ? statusByNumeric[id] : undefined;
            const countryName = info?.name ?? (geo.properties?.name as string | undefined) ?? "Country";
            const isHovered = hoveredKey === key;
            const fill = isHovered ? HOVER_FILL[status ?? "default"] : FILL[status ?? "default"];
            const d = pathGenerator(geo) ?? "";

            return (
              <path
                key={key}
                d={d}
                fill={fill}
                stroke="#FFFFFF"
                strokeWidth={0.5}
                tabIndex={status ? 0 : -1}
                role="img"
                aria-label={`${countryName}${status ? `, ${status === "coming-soon" ? "coming soon" : "available"}` : ""}`}
                style={{ outline: "none", cursor: status ? "pointer" : "default" }}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseMove={(evt) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top,
                    name: countryName,
                    status: status ?? null,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredKey(null);
                  setTooltip(null);
                }}
                onFocus={(evt) => {
                  if (!status) return;
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  const bbox = (evt.currentTarget as SVGGraphicsElement).getBBox();
                  setTooltip({ x: bbox.x + bbox.width / 2, y: bbox.y, name: countryName, status });
                }}
                onBlur={() => setTooltip(null)}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md px-3 py-2 text-sm text-white shadow-lg"
            style={{ left: tooltip.x, top: tooltip.y - 8, backgroundColor: "#091f48" }}
          >
            <p className="font-semibold">{tooltip.name}</p>
            {tooltip.status && (
              <p className="text-xs opacity-75">
                {tooltip.status === "coming-soon" ? "Coming Soon" : "Available"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend — exact from Figma */}
      <div className="mt-4 flex items-center gap-6 justify-start pl-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-[16px] w-[16px] rounded-full"
            style={{ backgroundColor: "#00CCCC" }}
            aria-hidden="true"
          />
          <span className="text-[14px]" style={{ color: "#091f48" }}>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-[16px] w-[16px] rounded-full"
            style={{ backgroundColor: "#99EBEB" }}
            aria-hidden="true"
          />
          <span className="text-[14px]" style={{ color: "#091f48" }}>Coming Soon</span>
        </div>
      </div>

      {/* Screen-reader list */}
      <div className="sr-only">
        <h3>Countries where ShareGratitude is available:</h3>
        <ul>{availableNames.map((n) => <li key={n}>{n}</li>)}</ul>
      </div>
    </div>
  );
}
