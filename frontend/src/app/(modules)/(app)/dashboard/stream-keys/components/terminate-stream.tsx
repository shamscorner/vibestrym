import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/common/button";
import { CardContainer } from "@/components/ui/custom/card-container";
import { useConfirmDialog } from "@/hooks/confirm-dialog";
import { graphql } from "../../../../../../gql";

const ResetIngressesDoc = graphql(`
mutation ResetIngresses {
  resetIngresses
}
`);

export function TerminateStream() {
  const t = useTranslations("streams.stream.settings.terminate");

  const { confirm } = useConfirmDialog();

  const [reset] = useMutation(ResetIngressesDoc, {
    onCompleted() {
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  return (
    <CardContainer
      className="mt-10"
      description={t("description")}
      heading={t("heading")}
      rightContent={
        <Button
          onClick={async () =>
            await confirm({
              title: t("confirmDialog.heading"),
              description: t("confirmDialog.message"),
              actionType: "destructive",
              confirmText: t("confirmDialog.confirmButton"),
              action: async () => {
                await reset();
                return true;
              },
            })
          }
          type="button"
          variant="destructive"
        >
          {t("buttonText")}
        </Button>
      }
    />
  );
}
