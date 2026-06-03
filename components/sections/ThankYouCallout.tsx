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
          className="relative flex flex-col sm:flex-row items-center gap-4 overflow-hidden rounded-[9px] px-6 sm:px-8 py-6 sm:py-0 sm:h-[128px]"
          style={{ backgroundColor: "#F5FDFD" }}
        >
          {/* Heart-pin icon */}
          {/* <Image
            src="/images/hiw-heart-pin.svg"
            alt=""
            width={42}
            height={51}
            className="shrink-0 h-[42px] w-auto sm:h-[51px]"
          /> */}

          {/* Text */}
          <div className="flex-1 text-center">
            <p
              className="font-medium leading-6 tracking-[-0.48px] text-[18px] sm:text-[20px]"
              style={{ color: "#000" }}
            >
              {title}
            </p>
            <p
              className="mt-1 text-sm sm:text-[16px]"
              style={{ color: "#000", lineHeight: "20px" }}
            >
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
