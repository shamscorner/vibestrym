import { useQuery } from "@apollo/client/react";
import {
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { MessageSquareOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/app/(modules)/(auth)/hooks";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";
import { Skeleton } from "@/components/ui/common/skeleton";
import type { Query } from "@/gql/graphql";
import { graphql } from "../../../../../../gql";
import { ChatInfo } from "./chat-info";
import { LoadingChat } from "./loading-chat";
import { MessagesList } from "./messages-list";
import { SendMessageForm } from "./send-message-form";

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

const FindMyFollowingsDoc = graphql(`
query FindMyFollowings {
  findMyFollowings {
    createdAt
    followingId
  }
}
`);

interface LiveChatProps {
  channel: Query["findChannelByUsername"];
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatPremiumFollowersOnly: boolean;
}

export function LiveChat({
  channel,
  isChatEnabled,
  isChatFollowersOnly,
  isChatPremiumFollowersOnly,
}: LiveChatProps) {
  const t = useTranslations("streams.chat");

  const { isAuthenticated } = useAuth();
  const { user, isLoadingProfile } = useCurrentAccount();

  const { data: followingsData, loading: isLoadingFollowings } = useQuery(
    FindMyFollowingsDoc,
    {
      skip: !isAuthenticated,
    }
  );
  const followings = followingsData?.findMyFollowings ?? [];

  const { data: sponsorsData, loading: isLoadingSponsors } = useQuery(
    FindSponsorsByChannelDoc,
    {
      variables: {
        channelId: channel.id,
      },
    }
  );
  const sponsors = sponsorsData?.findSponsorsByChannel ?? [];

  const isOwnerChannel = user?.id === channel.id;
  const isFollower = followings.some(
    (following) => following.followingId === channel.id
  );
  const isSponsor = sponsors.some((sponsor) => sponsor.user.id === user?.id);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(channel.id);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isDisabled =
    !(isOnline && isAuthenticated && isChatEnabled) ||
    (isChatFollowersOnly && !isFollower && !isOwnerChannel) ||
    (isChatPremiumFollowersOnly && !isSponsor && !isOwnerChannel);

  if (
    connectionState === ConnectionState.Connecting ||
    isLoadingProfile ||
    isLoadingFollowings ||
    isLoadingSponsors
  ) {
    return <LoadingChat />;
  }

  return (
    <Card className="flex h-[82%] w-full flex-col overflow-y-auto lg:fixed lg:w-[21.5%] xl:mt-0">
      <CardHeader className="border-b pb-0">
        <CardTitle>{t("heading")}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col overflow-y-auto px-4">
        {isOnline ? (
          <>
            <MessagesList channel={channel} />
            <ChatInfo
              isChatEnabled={isChatEnabled}
              isChatFollowersOnly={isChatFollowersOnly}
              isChatPremiumFollowersOnly={isChatPremiumFollowersOnly}
              isFollower={isFollower}
              isOwnerChannel={isOwnerChannel}
              isSponsor={isSponsor}
            />
            <SendMessageForm channel={channel} isDisabled={isDisabled} />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <MessageSquareOff className="size-10 text-muted-foreground" />
            <h2 className="mt-3 font-medium text-xl">{t("unavailable")}</h2>
            <p className="mt-1 w-full text-center text-muted-foreground">
              {t("unavailableMessage")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function LiveChatSkeleton() {
  return (
    <Skeleton className="flex h-[82%] w-full flex-col overflow-y-auto lg:fixed lg:w-[21.5%] xl:mt-0" />
  );
}
