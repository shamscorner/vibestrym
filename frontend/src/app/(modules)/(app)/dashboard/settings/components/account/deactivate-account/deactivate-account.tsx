"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/common/button";
import { CardContainer } from "@/components/ui/custom/card-container";
import { useConfirmDialog } from "@/hooks/confirm-dialog";

export function DeactivateAccount() {
  const t = useTranslations("dashboard.settings.account.deactivation");

  const router = useRouter();
  const { confirm: confirmDeactivate } = useConfirmDialog();

  return (
    <CardContainer
      description={t("description")}
      heading={t("heading")}
      rightContent={
        <div className="flex items-center gap-x-4">
          <Button
            onClick={async () =>
              await confirmDeactivate({
                title: t("confirmDialog.heading"),
                description: t("confirmDialog.message"),
                actionType: "destructive",
                action: () => {
                  router.push("/account/deactivate");
                  return true;
                },
              })
            }
            variant="destructive"
          >
            {t("button")}
          </Button>
        </div>
      }
    />
  );
}
