import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/common/card';
import { ChannelAvatar } from '@/components/ui/custom/channel-avatar';

import {
  type FindChannelByUsernameQuery,
  useFindSponsorsByChannelQuery,
} from '@/graphql/_generated/output';

interface ChannelSponsorsProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function ChannelSponsors({ channel }: ChannelSponsorsProps) {
  const t = useTranslations('streams.stream.sponsors');

  const { data, loading: isLoadingSponsors } = useFindSponsorsByChannelQuery({
    variables: {
      channelId: channel.id,
    },
  });
  const sponsors = data?.findSponsorsByChannel ?? [];

  if (!sponsors.length || isLoadingSponsors) return null;

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <CardTitle className="text-xl">
          {t('heading')} {channel.displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-12 px-4">
        {sponsors.map((sponsor, index) => (
          <Link href={`/${sponsor.user.username}`} key={index}>
            <ChannelAvatar channel={sponsor.user} size="lg" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
