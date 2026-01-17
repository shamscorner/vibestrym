import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphql } from "@/gql";
import { useGraphQL } from "@/gql/execute";
import type { UserModel } from "@/gql/graphql";
import { getMediaSource } from "@/utils/get-media-source";
import { StreamOverview } from "../../streams/components/stream-overview";

const findChannelByUsername = graphql(`
query FindChannelByUsername($username: String!) {
  findChannelByUsername(username: $username) {
    id
    username
    displayName
    avatar
    bio
    isVerified
    socialLinks {
      title
      url
    }
    stream {
      id
      title
      thumbnailUrl
      isLive
      isChatEnabled
      isChatFollowersOnly
      isChatPremiumFollowersOnly
      category {
        id
        title
      }
    }
    sponsorshipPlans {
      id
      title
      description
      price
    }
    followings {
      id
    }
  }
}
`);

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { data: channelData } = useGraphQL(findChannelByUsername, {
    username: params.username,
  });
  const channel = channelData?.data?.findChannelByUsername;

  if (!channel) {
    return notFound();
  }

  return {
    title: channel.displayName,
    description: channel.bio ?? channel.displayName,
    openGraph: {
      images: [
        {
          url: getMediaSource(channel.avatar),
          alt: channel.displayName,
        },
      ],
    },
  };
}

export default async function ChannelPage(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;

  const { data: channelData } = useGraphQL(findChannelByUsername, {
    username: params.username,
  });

  const channel = channelData?.data?.findChannelByUsername;

  if (!channel) {
    return notFound();
  }

  return <StreamOverview channel={channel as UserModel} />;
}
