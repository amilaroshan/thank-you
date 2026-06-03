import Image from "next/image";

export function HeroSearch() {
  return (
    <section aria-label="Search hospitals" className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
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
      <div className="relative flex flex-col items-center justify-center px-4 py-11 sm:py-5 gap-0">
        <h1 className="font-bold" style={{fontSize:"24px"}}>
          Where to find us
        </h1>
        <p
          className="text-center font-medium text-[14px] leading-[20px]"
          style={{ color: "#091f48" }}
        >
        Hospitals across NHS Trusts, Health Boards, Local Health Districts, Local Health Network and Health Services
        </p>

   
      </div>
    </section>
  );
}
