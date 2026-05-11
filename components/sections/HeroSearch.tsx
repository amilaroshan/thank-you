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
      <div className="relative flex flex-col items-center justify-center px-4 py-10 sm:py-14 gap-5">
        <p
          className="text-center font-semibold text-[16px] leading-[20px]"
          style={{ color: "#091f48" }}
        >
          Look for a QR code in your local hospital or practice, or search below
        </p>

        {/* Search bar */}
        <div className="relative w-full max-w-[555px]">
          <div
            className="flex items-center h-[40px] rounded-full border bg-white pr-[5px] pl-4"
            style={{ borderColor: "#e3e3e3" }}
          >
            {/* Icon + placeholder */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Image
                src="/images/search-icon.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0 h-[24px] w-[24px]"
              />
              <input
                type="text"
                placeholder="Search by location or hospital name or ward"
                className="flex-1 min-w-0 bg-transparent text-[14px] outline-none placeholder:text-[#9a9a9a]"
                style={{ color: "#091f48" }}
                aria-label="Search by location or hospital name or ward"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="shrink-0 h-[35px] rounded-full px-5 text-[14px] font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
              style={{
                background:
                  "linear-gradient(129.37deg, #00CCCC 11.36%, #00A6A6 60.90%)",
              }}
              aria-label="Search"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
