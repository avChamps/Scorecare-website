import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://scorecareapp.com/sitemap.xml",
    host: "https://scorecareapp.com",
  };
}
