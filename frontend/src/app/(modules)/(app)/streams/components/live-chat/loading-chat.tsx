import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/common/card";

export function LoadingChat() {
  const t = useTranslations("streams.chat");

  return (
    <Card className="flex h-[82%] w-full flex-col items-center justify-center overflow-y-auto lg:fixed lg:w-[21.5%] xl:mt-0">
      <Loader className="size-10 animate-spin text-muted-foreground" />
      <p className="mt-3 text-lg text-muted-foreground">{t("loading")}</p>
    </Card>
  );
}
