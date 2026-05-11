import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export function ThankYouCallout({ title, description, buttonText, href }: Props) {
  return (
    <section aria-label="Call to action" className="px-4 pb-10">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="relative flex items-center gap-6 overflow-hidden rounded-[9px] px-8"
          style={{ backgroundColor: "#00CCCC", height: "128px" }}
        >
          {/* Heart-pin icon */}
          <Image
            src="/images/hiw-heart-pin.svg"
            alt=""
            width={42}
            height={51}
            className="shrink-0 h-[51px] w-[42px]"
          />

          {/* Text */}
          <div className="flex-1">
            <p
              className="font-bold leading-6 tracking-[-0.48px]"
              style={{ fontSize: "24px", color: "#000" }}
            >
              {title}
            </p>
            <p
              className="mt-1"
              style={{ fontSize: "16px", color: "#000", lineHeight: "20px" }}
            >
              {description}
            </p>
          </div>

          {/* Button */}
          <Link
            href={href}
            className="shrink-0 inline-flex h-[40px] w-[192px] items-center justify-center rounded-[6px] bg-white font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
            style={{ fontSize: "14px", color: "#1e1e1e" }}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
