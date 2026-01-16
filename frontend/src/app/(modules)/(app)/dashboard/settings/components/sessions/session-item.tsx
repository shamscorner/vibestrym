import { useMutation, useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/common/button";
import { CardContainer } from "@/components/ui/custom/card-container";
import type { Query } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/confirm-dialog";
import { graphql } from "../../../../../../../gql";
import { SessionModal } from "./session-dialog";
import { getBrowserIcon } from "./utils/get-browser-icon";

const RemoveSessionDoc = graphql(`
mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
`);

const FindSessionsByUserDoc = graphql(`
query FindSessionsByUser {
  findSessionsByUser {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
`);

interface SessionItemProps {
  session: Query["findSessionsByUser"][0];
  isCurrentSession?: boolean;
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
  const t = useTranslations("dashboard.settings.sessions.sessionItem");
  const { confirm: confirmDelete } = useConfirmDialog();

  const { refetch } = useQuery(FindSessionsByUserDoc);

  const [remove, { loading: isLoadingRemove }] = useMutation(RemoveSessionDoc, {
    onCompleted() {
      refetch();
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const Icon = getBrowserIcon(session.metadata.device.browser);

  return (
    <CardContainer
      description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
      heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
      Icon={Icon}
      rightContent={
        <div className="flex items-center gap-x-4">
          {!isCurrentSession && (
            <Button
              disabled={isLoadingRemove}
              onClick={async () =>
                await confirmDelete({
                  title: t("confirmDialog.heading"),
                  description: t("confirmDialog.message"),
                  actionType: "destructive",
                  action: async () => {
                    await remove({ variables: { id: session.id } });
                    return true;
                  },
                })
              }
              variant="destructive"
            >
              {t("deleteButton")}
            </Button>
          )}
          <SessionModal session={session}>
            <Button>{t("detailsButton")}</Button>
          </SessionModal>
        </div>
      }
    />
  );
}
