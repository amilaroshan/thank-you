import Image from "next/image";

const partners = [
  { src: "/partners/nhs.png", alt: "NHS" },
  { src: "/partners/gig.png", alt: "GIG Cymru / NHS Wales" },
  { src: "/partners/monash.jpg", alt: "Monash Health" },
  { src: "/partners/western-health.png", alt: "Western Health" },
  { src: "/partners/nsw.jpg", alt: "NSW Health" },
  { src: "/partners/genesiscare.png", alt: "GenesisCare" },
  { src: "/partners/kettering.jpg", alt: "Kettering General Hospital" },
  { src: "/partners/nottingham.jpg", alt: "Nottingham University Hospitals" },
  { src: "/partners/north.jpg", alt: "Northern Health" },
  { src: "/partners/sunshine-coast.png", alt: "Sunshine Coast Health" },
  { src: "/partners/illawarra.jpg", alt: "Illawarra Shoalhaven Local Health District" },
  { src: "/partners/greenfield.png", alt: "Greenfield Medical Centre" },
  { src: "/partners/oran-park.png", alt: "Oran Park Medical" },
  { src: "/partners/kearns.png", alt: "Kearns Medical Centre" },
  { src: "/partners/appin.png", alt: "Appin Medical Centre" },
  { src: "/partners/emerald.png", alt: "Emerald Medical" },
  { src: "/partners/gore.png", alt: "Gore Street Medical" },
  { src: "/partners/st-marks.png", alt: "St Marks Medical" },
  { src: "/partners/my-family-health.png", alt: "My Family Health" },
  { src: "/partners/the-medical-hub.png", alt: "The Medical Hub" },
  { src: "/partners/doctor-house.png", alt: "Doctor House" },
];

export function PartnersStrip() {
  return (
    <section aria-label="Healthcare partners" className="bg-white py-6">
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <ul className="partners-marquee items-center" aria-hidden="false">
          {[...partners, ...partners].map(({ src, alt }, i) => (
            <li
              key={`${src}-${i}`}
              className="flex shrink-0 items-center justify-center px-6 sm:px-9"
            >
              <Image
                src={src}
                alt={i < partners.length ? alt : ""}
                width={196}
                height={80}
                className="h-11 sm:h-15 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
