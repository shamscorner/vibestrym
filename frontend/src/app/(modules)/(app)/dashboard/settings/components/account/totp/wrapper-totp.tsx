"use client";

import { useTranslations } from "next-intl";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Skeleton } from "@/components/ui/common/skeleton";
import { CardContainer } from "@/components/ui/custom/card-container";
import { DisableTotp } from "./disable-totp";
import { EnableTotp } from "./enable-totp";

export function WrapperTotp() {
  const t = useTranslations("dashboard.settings.account.twoFactor");

  const { user, isLoadingProfile } = useCurrentAccount();

  return isLoadingProfile ? (
    <WrapperTotpSkeleton />
  ) : (
    <CardContainer
      description={t("description")}
      heading={t("heading")}
      rightContent={
        <div className="flex items-center gap-x-4">
          {user?.isTotpEnabled ? <DisableTotp /> : <EnableTotp />}
        </div>
      }
    />
  );
}

export function WrapperTotpSkeleton() {
  return <Skeleton className="h-24 w-full" />;
}
