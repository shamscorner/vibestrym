import { BellIcon } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/common/popover';
import { useFindUnreadNotificationsCountQuery } from '@/graphql/_generated/output';
import { NotificationsList } from './NotificationsList';

export function Notifications() {
  const { data, loading: isLoadingCount } = useFindUnreadNotificationsCountQuery();
  const count = data?.findUnreadNotificationsCount ?? 0;
  const displayCount = count > 10 ? '+9' : count;

  if (isLoadingCount) return null;

  return (
    <Popover>
      <PopoverTrigger>
        {count !== 0 && (
          <div className="absolute top-5 right-[72px] rounded-full bg-primary px-[5px] font-semibold text-background text-xs">
            {displayCount}
          </div>
        )}
        <BellIcon className="size-5 text-foreground" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-h-[500px] w-[320px] overflow-y-auto"
      >
        <NotificationsList unreadCount={count} />
      </PopoverContent>
    </Popover>
  );
}
