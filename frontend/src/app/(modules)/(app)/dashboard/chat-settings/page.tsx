import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { ChatSettingsForm } from "./components/chat-settings-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard.chatSettings");
  return {
    title: t("title"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function ChatSettingsPage() {
  return <ChatSettingsForm />;
}
