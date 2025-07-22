'use client';

import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/common/button';
import { Hint } from '@/components/ui/custom/Hint';
import { useSidebar } from '../../hooks/sidebar';

export function SidebarHeader() {
  const t = useTranslations('protected.sidebar.header');

  const { isCollapsed, open, close } = useSidebar();

  const label = isCollapsed ? t('expand') : t('collapse');

  return isCollapsed ? (
    <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
      <Hint asChild label={label} side="right">
        <Button onClick={() => open()} size="icon" variant="ghost">
          <ArrowRightFromLineIcon className="size-4" />
        </Button>
      </Hint>
    </div>
  ) : (
    <div className="mb-2 flex w-full items-center justify-between p-3 pl-4">
      <h2 className="font-semibold text-muted-foreground">
        {t('explore')}
      </h2>
      <Hint asChild label={label} side="right">
        <Button onClick={() => close()} size="icon" variant="ghost">
          <ArrowLeftFromLineIcon className="size-4" />
        </Button>
      </Hint>
    </div>
  );
}
