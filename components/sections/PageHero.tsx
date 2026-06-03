import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  bgImage?: string;
};

export function PageHero({ title, subtitle, bgImage = "/images/hero-bg.jpg" }: Props) {
  return (
    <section
      aria-label="Page hero"
      className="relative overflow-hidden py-8 sm:py-0 sm:h-[120px]"
    >
      {/* Background hospital photo */}
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* Teal overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(237, 251, 251, 0.92)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center text-center px-4">
        <h1
          className="font-bold tracking-[-0.96px] text-[22px] sm:text-[32px]"
          style={{ color: "#091f48" }}
        >
          {title}
        </h1>
        <p
          className="font-medium max-w-[672px] text-sm sm:text-[16px]"
          style={{ lineHeight: "20px", color: "#091f48" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
