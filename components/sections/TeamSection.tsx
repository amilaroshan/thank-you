import Image from "next/image";

type TeamMember = {
  name: string;
  region: string;
  image: string;
};

const TEAM: TeamMember[] = [
  { name: "Naomi", region: "UK, Australia & NZ", image: "/images/team/naomi.jpg" },
  { name: "Hon. A/Prof Sarah", region: "Australia", image: "/images/team/sarah.jpg" },
  { name: "Dr/Mr Janindra", region: "UK, Australia & NZ", image: "/images/team/janindra.png" },
  { name: "Don", region: "UK, Australia & NZ", image: "/images/team/don.jpg" },
  { name: "Ross", region: "UK", image: "/images/team/ross.png" },
  { name: "Chad", region: "UK, Australia & NZ", image: "/images/team/chad.png" },
  { name: "Kokulan", region: "UK, Australia & NZ", image: "/images/team/kokulan.png" },
  { name: "Samaya", region: "Australia", image: "/images/team/samaya.png" },
  { name: "Wineza", region: "Philippines", image: "/images/team/wineza.png" },
  { name: "John", region: "Kenya", image: "/images/team/john.png" },
  { name: "Amila", region: "Sri Lanka", image: "/images/team/amila.png" },
  { name: "Ahmad", region: "Indonesia", image: "/images/team/ahmad.png" },
  { name: "Harshi", region: "UK, Australia & NZ", image: "/images/team/harshi.jpeg" },
  { name: "Taka", region: "Japan", image: "/images/team/taka.png" },
  { name: "Paul", region: "Australia & NZ", image: "/images/team/paul.jpeg" },
  { name: "Nico", region: "Europe, UK & Australia", image: "/images/team/nico.jpg" },
];

export function TeamSection() {
  return (
    <section
      aria-label="HUMAN™ Team"
      className="py-12 px-4"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <header className="text-center">
          <h2
            className="font-semibold text-[20px] sm:text-[24px]"
            style={{ lineHeight: "28px", color: "#000" }}
          >
            HUMAN™ Team
          </h2>
          <p
            className="mt-3 font-normal text-sm sm:text-[16px]"
            style={{ lineHeight: "22px", color: "var(--color-muted-text)" }}
          >
            Humans of ShareGratitude
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {TEAM.map((member) => (
            <li key={member.name} className="flex flex-col items-center text-center">
              <div className="relative aspect-square w-full max-w-50 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.region}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover"
                />
              </div>
              <h3
                className="mt-4 font-semibold text-[16px] sm:text-[18px]"
                style={{ lineHeight: "22px", color: "var(--color-navy)" }}
              >
                {member.name}
              </h3>
              <p
                className="mt-1 font-normal text-sm"
                style={{ lineHeight: "20px", color: "var(--color-muted-text)" }}
              >
                {member.region}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
