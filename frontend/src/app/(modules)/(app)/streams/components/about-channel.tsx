import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/common/card';
import { Skeleton } from '@/components/ui/common/skeleton';

import type { FindChannelByUsernameQuery } from '@/graphql/_generated/output';
import { getSocialIcon } from '@/utils/get-social-icon';

interface AboutChannelProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function AboutChannel({ channel }: AboutChannelProps) {
  const t = useTranslations('streams.stream.aboutChannel');

  return (
    <Card className="mt-6">
      <CardHeader className="px-4 pt-0">
        <CardTitle>
          {t('heading')} {channel.displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-1 flex flex-col gap-y-4 px-4">
        <div className="text-[15px] text-foreground">
          <span className="font-semibold">{channel.followings.length}</span>{' '}
          {t('followersCount')}
        </div>
        <div className="text-[15px] text-muted-foreground">
          {channel.bio ?? t('noDescription')}
        </div>
        {channel.socialLinks.length ? (
          <div className='mt-5 flex flex-wrap gap-4'>
            {channel.socialLinks.map((socialLink, index) => {
              const Icon = getSocialIcon(socialLink.url);

              return (
                <Link
                  className="flex items-center pr-1 text-[15px] hover:opacity-80"
                  href={socialLink.url}
                  key={index}
                  target="_blank"
                >
                  <Icon className="mr-2 size-4 shrink-0" />
                  {socialLink.title}
                </Link>
              );
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AboutChannelSkeleton() {
  return <Skeleton className="mt-6 h-36 w-full" />;
}
