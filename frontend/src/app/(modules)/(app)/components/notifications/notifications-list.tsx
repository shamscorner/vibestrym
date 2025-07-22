import parse from 'html-react-parser';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import { Separator } from '@/components/ui/common/separator';
import {
  useFindNotificationsByUserQuery,
  useFindUnreadNotificationsCountQuery,
} from '@/graphql/_generated/output';
import { getNotificationIcon } from './get-notification-icon';

interface Props {
  unreadCount?: number;
}

export function NotificationsList({ unreadCount }: Props) {
  const t = useTranslations('app.header.menu.profile.notifications');

  const { refetch } = useFindUnreadNotificationsCountQuery();

  const { data, loading: isLoadingNotifications } =
    useFindNotificationsByUserQuery({
      onCompleted() {
        refetch();
      },
    });
  const notifications = data?.findNotificationsByUser ?? [];

  return (
    <>
      <h2 className="flex items-center justify-between font-medium text-lg">
        {t('heading')}
        {unreadCount &&
          <span className="font-normal text-muted-foreground text-sm">
            {unreadCount} {t('unreadCount', { count: unreadCount })}
          </span>
        }
      </h2>
      <Separator className="my-3" />
      {isLoadingNotifications ? (
        <div className="flex items-center justify-center gap-x-2 text-foreground text-sm">
          <Loader2Icon className="size-5 animate-spin" />
          {t('loading')}
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
                <div>{parse(notification.message)}</div>
              </div>
              {index < notifications.length - 1 && (
                <Separator className="my-3" />
              )}
            </Fragment>
          );
        })
      ) : (
        <div className="text-center text-muted-foreground">{t('empty')}</div>
      )}
    </>
  );
}
