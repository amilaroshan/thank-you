const stats = [
  { value: "63+", label: "Hospitals" },
  { value: "402+", label: "Practices and Centres" },
  { value: "170,780", label: "Clinical and Non-Clinical Staff" },
  { value: "13,846,900", label: "Population Reach" },
];

export function StatsBar() {
  return (
    <section aria-label="Key statistics" className="bg-white py-5 px-4">
      <dl className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-x-12 gap-y-6 sm:flex-nowrap sm:gap-x-0 sm:divide-x sm:divide-[#e3e3e3]">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center sm:flex-1 sm:px-6"
          >
            <dt
              className="text-[24px] font-bold tracking-[-0.48px] leading-none"
              style={{ color: "#00CCCC" }}
            >
              {value}
            </dt>
            <dd
              className="mt-1 text-[14px] font-semibold"
              style={{ color: "rgba(9,31,72,0.78)" }}
            >
              {label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
