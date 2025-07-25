'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/custom/heading';
import { ToggleCardSkeleton } from '@/components/ui/custom/toggle-card';

import {
  useFindCurrentSessionQuery,
  useFindSessionsByUserQuery,
} from '@/graphql/_generated/output';

import { SessionItem } from './session-item';

export function SessionsList() {
  const t = useTranslations('dashboard.settings.sessions');

  const { data: sessionData, loading: isLoadingCurrent } =
    useFindCurrentSessionQuery();
  const currentSession = sessionData?.findCurrentSession;

  const { data: sessionsData, loading: isLoadingSessions } =
    useFindSessionsByUserQuery();
  const sessions = sessionsData?.findSessionsByUser ?? [];

  return (
    <div className="flex flex-col gap-y-6">
      <Heading size="sm" title={t('info.current')} />
      {isLoadingCurrent ? (
        <ToggleCardSkeleton />
      ) : (
        currentSession && <SessionItem isCurrentSession session={currentSession} />
      )}

      <Heading size="sm" title={t('info.active')} />

      {isLoadingSessions ? (
        Array.from({ length: 3 }).map((_, index) => (
          <ToggleCardSkeleton key={index} />
        ))
      ) : sessions.length ? (
        sessions.map((session, index) => (
          <SessionItem key={index} session={session} />
        ))
      ) : (
        <div className="text-muted-foreground">{t('info.notFound')}</div>
      )}
    </div>
  );
}
