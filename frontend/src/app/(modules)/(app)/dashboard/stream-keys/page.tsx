import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { KeysSettings } from "./components/keys-settings";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard.streamKeys");
  return {
    title: t("title"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function StreamKeysPage() {
  return <KeysSettings />;
}
