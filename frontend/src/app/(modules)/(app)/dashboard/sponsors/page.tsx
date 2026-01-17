import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { SponsorsTable } from "./components/sponsors-table";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard.sponsors");
  return {
    title: t("title"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function SponsorsPage() {
  return <SponsorsTable />;
}
