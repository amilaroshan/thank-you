import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/where-we-are`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/charities`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
