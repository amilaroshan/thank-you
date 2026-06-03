import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { SITE } from "@/lib/seo";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: "%s | ShareGratitude",
    default: "ShareGratitude — Thank the healthcare staff who cared for you",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  keywords: [
    "ShareGratitude",
    "thank healthcare staff",
    "thank NHS staff",
    "patient appreciation",
    "hospital thank you message",
    "healthcare worker recognition",
    "thank a nurse",
    "thank a doctor",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: "ShareGratitude — Thank the healthcare staff who cared for you",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareGratitude — Thank the healthcare staff who cared for you",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#00CCCC",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/logo512.png`,
      description: SITE.description,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // Structured data for search engines; static, trusted content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
