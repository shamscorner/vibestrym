import { useLazyQuery, useQuery } from "@apollo/client/react";
import { captureException } from "@sentry/nextjs";
import parse from "html-react-parser";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { Separator } from "@/components/ui/common/separator";
import { graphql } from "@/gql";
import { getNotificationIcon } from "./get-notification-icon";

const FindUnreadNotificationsCountDoc = graphql(`
  query FindUnreadNotificationsCount {
    findUnreadNotificationsCount
  }
`);

const FindNotificationsByUserDoc = graphql(`
  query FindNotificationsByUser {
    findNotificationsByUser {
      id
      message
      type
    }
  }
`);

interface Props {
  unreadCount?: number;
}

export async function NotificationsList({ unreadCount }: Props) {
  const t = useTranslations("app.header.menu.profile.notifications");

  const { refetch } = useQuery(FindUnreadNotificationsCountDoc);

  const [loadNotifications, { data, loading: isLoadingNotifications }] =
    useLazyQuery(FindNotificationsByUserDoc);

  try {
    await loadNotifications();
    refetch();
  } catch (error) {
    captureException(error);
  }

  const notifications = data?.findNotificationsByUser ?? [];

  return (
    <>
      <h2 className="flex items-center justify-between font-medium text-lg">
        {t("heading")}
        {typeof unreadCount === "number" && unreadCount > 0 && (
          <span className="font-normal text-muted-foreground text-sm">
            {unreadCount} {t("unreadCount", { count: unreadCount })}
          </span>
        )}
      </h2>
      <Separator className="my-3" />
      {isLoadingNotifications ? (
        <div className="flex items-center justify-center gap-x-2 text-foreground text-sm">
          <Loader2Icon className="size-5 animate-spin" />
          {t("loading")}
        </div>
      ) : notifications.length ? (
        notifications.map((notification, index) => {
          const Icon = getNotificationIcon(notification.type);

          return (
            <Fragment key={index}>
              <div className="flex items-start gap-x-3 text-sm">
                <div className="rounded-full bg-foreground p-2">
                  <Icon className="size-6 text-secondary" />
                </div>
                <div>{parse(notification.message || "")}</div>
              </div>
              {index < notifications.length - 1 && (
                <Separator className="my-3" />
              )}
            </Fragment>
          );
        })
      ) : (
        <div className="text-center text-muted-foreground">{t("empty")}</div>
      )}
    </>
  );
}
