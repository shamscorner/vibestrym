import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/common/input";
import { CardContainer } from "@/components/ui/custom/card-container";
import { CopyButton } from "@/components/ui/custom/copy-button";

interface StreamURLProps {
  value?: string | null;
}

export function StreamURL({ value }: StreamURLProps) {
  const t = useTranslations("dashboard.streamKeys.url");

  return (
    <CardContainer
      heading={t("heading")}
      isRightContentFull
      rightContent={
        <div className="flex w-full items-center gap-x-4">
          <Input disabled placeholder={t("heading")} value={value ?? ""} />
          {value && <CopyButton value={value} />}
        </div>
      }
    />
  );
}
