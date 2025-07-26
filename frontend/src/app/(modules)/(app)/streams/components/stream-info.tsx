import { useParticipants } from '@livekit/components-react';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/custom/channel-avatar';
import { ChannelVerified } from '@/components/ui/custom/channel-verified';

import type { FindChannelByUsernameQuery } from '@/graphql/_generated/output';

import { StreamActions, StreamActionsSkeleton } from './stream-actions';

interface StreamInfoProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamInfo({ channel }: StreamInfoProps) {
  const t = useTranslations('streams.stream.info');

  const participants = useParticipants();

  const participantCount = participants.length - 1;

  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="font-semibold text-xl">
        {channel.stream.title}{' '}
        {channel.stream.category && ` | ${channel.stream.category.title}`}
      </h1>
      <div className='flex flex-col items-start justify-between sm:flex-row'>
        <div className="flex items-center gap-x-3 px-1">
          <ChannelAvatar
            channel={channel}
            isLive={channel.stream.isLive}
            size="lg"
          />
          <div className="flex flex-col gap-y-1">
            <h2 className="flex items-center gap-x-2 font-semibold text-lg">
              {channel.displayName}
              {channel.isVerified && <ChannelVerified size="sm" />}
            </h2>
            {channel.stream.isLive ? (
              <div className="flex items-center gap-x-1 font-semibold text-rose-500 text-xs">
                <User className="size-4" />
                {participantCount} {t('viewers')}
              </div>
            ) : (
              <p className="font-semibold text-muted-foreground text-xs">
                {t('offline')}
              </p>
            )}
          </div>
        </div>
        <StreamActions channel={channel} />
      </div>
    </div>
  );
}

export function StreamInfoSkeleton() {
  return (
    <div className="flex flex-col gap-y-5">
      <Skeleton className="h-7 w-[60%]" />
      <div className="flex flex-col items-start justify-between sm:flex-row">
        <div className="flex items-center gap-x-3 px-1">
          <Skeleton className="size-14 rounded-full" />
          <div className="flex flex-col gap-y-2.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <StreamActionsSkeleton />
      </div>
    </div>
  );
}
