import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://scorecareapp.com";

const routes = [
  "",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
  "/account-deletion",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: "monthly",
    priority: route ? 0.7 : 1,
  }));
}
