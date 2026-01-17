import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/common/card";

export function StreamLoading() {
  const t = useTranslations("streams.stream.video");

  return (
    <Card className="relative flex h-full flex-col items-center justify-center">
      <Loader className="size-12 animate-spin text-muted-foreground" />
      <p className="mt-3 text-lg text-muted-foreground">{t("loading")}</p>
    </Card>
  );
}
