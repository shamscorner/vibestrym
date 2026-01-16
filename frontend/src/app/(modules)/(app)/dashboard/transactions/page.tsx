import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { TransactionsTable } from "./components/transactions-table";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard.transactions");
  return {
    title: t("title"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function TransactionsPage() {
  return <TransactionsTable />;
}
