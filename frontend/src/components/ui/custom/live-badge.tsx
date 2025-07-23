'use client';

import { useTranslations } from 'next-intl';

export function LiveBadge() {
  const t = useTranslations('common.liveBadge');

  return (
    <div className="rounded-full bg-rose-500 p-0.5 px-2 text-center font-semibold text-white text-xs uppercase tracking-wide">
      {t('text')}
    </div>
  );
}
