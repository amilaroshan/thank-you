import { ImageResponse } from "next/og";

// Required for `output: export` — generate this image at build time.
export const dynamic = "force-static";

export const alt =
  "ShareGratitude — Thank the healthcare staff who cared for you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (see CLAUDE.md §3 / globals.css)
const NAVY = "#091f48";
const TEAL = "#00CCCC";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 85% 15%, ${TEAL}33, transparent 45%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 34,
            fontWeight: 600,
            color: TEAL,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              backgroundColor: TEAL,
            }}
          />
          ShareGratitude
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Thank the healthcare staff who cared for you
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#c7d2e0",
            maxWidth: 820,
          }}
        >
          Scan a QR code in your hospital and send a thank-you message directly
          to the people who made a difference.
        </div>
      </div>
    ),
    { ...size },
  );
}
