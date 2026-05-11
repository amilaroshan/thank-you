import Image from "next/image";
import type { Message } from "@/lib/types";

type Props = { message: Message };

export function MessageCard({ message }: Props) {
  const timeAgo = formatTimeAgo(message.createdAt);

  return (
    <article
      className="relative flex flex-col rounded-[6px] border bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]"
      style={{ borderColor: "#ddd" }}
    >
      {/* Header: avatar + title/city + timestamp */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0 size-[43px]">
            <Image
              src="/images/hospital-circle.svg"
              alt=""
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/hospital-icon-frame.svg"
                alt=""
                width={24}
                height={24}
              />
            </div>
          </div>
          <div>
            <p
              className="font-bold leading-tight"
              style={{ fontSize: "14px", color: "#091f48" }}
            >
              To a {message.recipientRole} at {message.hospitalName},
            </p>
            <p
              className="mt-0"
              style={{ fontSize: "14px", color: "#6c7070" }}
            >
              {message.city}
            </p>
          </div>
        </div>
        <p
          className="shrink-0"
          style={{ fontSize: "12px", color: "#6c7070" }}
        >
          {/* {timeAgo} */}
        </p>
      </div>

      {/* Body with quote mark */}
      <div className="mt-4 flex gap-2">
        {/* <Image
          src="/images/quote-mark.svg"
          alt=""
          width={21}
          height={17}
          className="shrink-0 mt-1 h-fit"
        /> */}
        <p
          className="text-[#484747] text-sm sm:text-[16px]"
          style={{ lineHeight: "24px" }}
        >
          {message.body}
        </p>
      </div>

      {/* From label */}
      <p
        className="mt-4 text-right font-semibold"
        style={{ fontSize: "14px", color: "#091f48" }}
      >
        – {message.fromLabel}
      </p>
    </article>
  );
}

function formatTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}
