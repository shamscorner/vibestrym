import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";
import { ChannelAvatar } from "@/components/ui/custom/channel-avatar";
import { graphql } from "@/gql";
import type { Query } from "@/gql/graphql";

const FindSponsorsByChannelDoc = graphql(`
query FindSponsorsByChannel($channelId: String!) {
  findSponsorsByChannel(channelId: $channelId) {
    user {
      id
      username
      avatar
    }
  }
}
`);

interface ChannelSponsorsProps {
  channel: Query["findChannelByUsername"];
}

export function ChannelSponsors({ channel }: ChannelSponsorsProps) {
  const t = useTranslations("streams.stream.sponsors");

  const { data, loading: isLoadingSponsors } = useQuery(
    FindSponsorsByChannelDoc,
    {
      variables: {
        channelId: channel.id,
      },
    }
  );
  const sponsors = data?.findSponsorsByChannel ?? [];

  if (!sponsors.length || isLoadingSponsors) return null;

  return (
    <Card className="mt-6">
      <CardHeader className="px-4">
        <CardTitle>
          {t("heading")} {channel.displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 px-4">
        {sponsors.map((sponsor, index) => (
          <Link href={`/${sponsor.user.username}`} key={index}>
            <ChannelAvatar channel={sponsor.user} size="lg" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
