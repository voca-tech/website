import type { MetadataRoute } from "next";

const BASE = "https://www.voca.com.br";

const routes = [
  "/",
  "/produto",
  "/por-que-voca",
  "/casos-de-sucesso",
  "/roi",
  "/seguranca",
  "/publico-alvo",
  "/sobre",
  "/faq",
  "/blog",
  "/contact",
  "/privacyPolicy",
  "/termsOfUse",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
