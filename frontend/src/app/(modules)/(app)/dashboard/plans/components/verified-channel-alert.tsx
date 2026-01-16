import { ShieldAlertIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function VerifiedChannelAlert() {
  const t = useTranslations("dashboard.plans.alert");

  return (
    <div className="flex h-[75vh] w-full flex-col items-center justify-center">
      <ShieldAlertIcon className="size-20 text-muted-foreground" />
      <h1 className="mt-6 font-semibold text-2xl">{t("heading")}</h1>
      <p className="mt-3 max-w-xl items-center text-center text-muted-foreground lg:w-[60%]">
        {t("description")}
      </p>
    </div>
  );
}
