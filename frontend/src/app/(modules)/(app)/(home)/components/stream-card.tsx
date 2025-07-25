import Link from 'next/link';

import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/custom/channel-avatar';
import { ChannelVerified } from '@/components/ui/custom/channel-verified';

import type { FindRandomStreamsQuery } from '@/graphql/_generated/output';

import { StreamThumbnail } from './stream-thumbnail';

interface StreamCardProps {
  stream: FindRandomStreamsQuery['findRandomStreams'][0];
}

export function StreamCard({ stream }: StreamCardProps) {
  return (
    <div className="h-full w-full">
      <Link href={`/${stream.user.username}`}>
        <StreamThumbnail
          isLive={stream.isLive}
          url={stream.thumbnailUrl}
          user={stream.user}
        />
        <h2 className='mt-3 truncate font-semibold text-base text-foreground hover:opacity-80'>
          {stream.title}
        </h2>
      </Link>
      <div className="mt-3 flex gap-x-3">
        <ChannelAvatar channel={stream.user} isLive={stream.isLive} />
        <div className="flex flex-col overflow-hidden text-sm">
          <h2 className="flex items-center gap-x-2 font-semibold text-foreground">
            {stream.user.username}
            {stream.user.isVerified && <ChannelVerified size="sm" />}
          </h2>
          {stream.category && (
            <Link
              className="text-muted-foreground"
              href={`/categories/${stream.category.slug}`}
            >
              {stream.category.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function StreamCardSkeleton() {
  return (
    <div className="h-full w-full">
      <Skeleton className="relative aspect-video rounded-xl" />
      <Skeleton className="mt-3 h-4 w-full" />
      <div className="flex gap-x-4">
        <Skeleton className="mt-3 size-10 rounded-full" />
        <div className="mt-3.5 flex flex-col gap-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}
