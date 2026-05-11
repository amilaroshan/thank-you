import Image from "next/image";

const partners = [
  { src: "/partners/partner-1.png", alt: "NHS Manchester University Foundation Trust" },
  { src: "/partners/partner-2.png", alt: "Oran Park Medical" },
  { src: "/partners/partner-3.png", alt: "Golborne Medical" },
  { src: "/partners/partner-4.png", alt: "Kearns Medical Centre" },
  { src: "/partners/partner-5.png", alt: "Sunshine Coast Health" },
  { src: "/partners/partner-6.png", alt: "Greenfield Medical Centre" },
];

export function PartnersStrip() {
  return (
    <section aria-label="Healthcare partners" className="bg-white py-6 px-4">
      <ul className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
        {partners.map(({ src, alt }) => (
          <li key={src} className="shrink-0">
            <Image
              src={src}
              alt={alt}
              width={196}
              height={80}
              className="h-[64px] w-auto object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
