import type { Metadata } from "next";
import Image from "next/image";
import { getMessages } from "@/lib/api";
import { MessageCard } from "@/components/sections/MessageCard";

export const metadata: Metadata = {
  title: "Community Messages | ShareGratitude",
  description:
    "Read thank-you messages sent by patients to the healthcare staff who cared for them. Real appreciation, delivered directly.",
};

export const revalidate = 60;

export default async function HomePage() {
  const messages = await getMessages(8);

  return (
    <>
      {/* Hero */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden py-6 sm:py-0 sm:h-[120px]"
      >
        <Image
          src="/images/home-hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(237, 251, 251, 0.92)" }}
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center px-4 gap-1">
          <h1
            className="font-bold tracking-[-0.96px] text-[18px] sm:text-[22px] lg:text-[26px]"
            style={{ color: "#091f48" }}
          >
            We ensure your appreciation reaches the people who cared for you
          </h1>
          <p className="text-sm sm:text-[16px]" style={{ lineHeight: "20px", color: "#091f48" }}>
            <span className="font-semibold">
              Real thank-you messages delivered directly to healthcare staff :{" "}
            </span>
            <span className="font-normal">100,000+ messages</span>
          </p>
        </div>
      </section>

      {/* Community messages — desktop: sticky sidebar + scrollable feed; mobile: stacked */}
      <section
        aria-label="Community messages"
        className="overflow-hidden px-4 lg:sticky lg:h-[calc(100vh-98px)]"
        style={{ top: "98px" }}
      >
        <div
          className="mx-auto flex flex-col gap-3 py-4 lg:flex-row lg:h-full lg:gap-[13px]"
          style={{ maxWidth: "1199px" }}
        >
          {/* Left sidebar */}
          <div className="flex flex-col gap-3 lg:shrink-0 lg:w-[328px]">
            {/* Nurse photo — desktop only */}
            <div
              className="hidden lg:block relative overflow-hidden rounded-[6px]"
              style={{ height: "354px" }}
            >
              <Image
                src="/images/home-nurse.jpg"
                alt="Healthcare worker"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Teal callout card */}
            <div
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-[9px] px-6 pb-6 pt-6 text-center"
              style={{ backgroundColor: "#00CCCC" }}
            >
              <Image
                src="/images/heart-pin-vector.svg"
                alt=""
                width={19}
                height={23}
                className="mb-3"
              />
              <p
                className="font-bold tracking-[-0.4px] leading-6 text-[18px] sm:text-[20px]"
                style={{ color: "#091f48" }}
              >
                Have someone to thank?
              </p>
              <p
                className="mt-1 text-sm sm:text-[14px]"
                style={{ lineHeight: "20px", color: "#091f48" }}
              >
                It takes less than 2 minutes.
              </p>
              <a
                href="https://web.humansofsharegratitude.com/?category=global"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-[40px] w-full lg:w-[279px] items-center justify-center rounded-[6px] bg-white font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
                style={{ fontSize: "14px", color: "#091f48" }}
              >
                How to say Thank You
              </a>
            </div>
          </div>

          {/* Right: message feed */}
          <div className="flex flex-col gap-3 lg:flex-1 lg:overflow-y-auto pb-4">
            {messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
