"use client";

import { LiveKitRoom } from "@livekit/components-react";

import type { Query } from "@/gql/graphql";
import { useStreamToken } from "../hooks/stream-token";
import { AboutChannel, AboutChannelSkeleton } from "./about-channel";
import { ChannelSponsors } from "./channel-sponsors";
import { LiveChat, LiveChatSkeleton } from "./live-chat/live-chat";
import { StreamVideo, StreamVideoSkeleton } from "./player/stream-video";
import { StreamInfo, StreamInfoSkeleton } from "./stream-info";

interface StreamOverviewProps {
  channel: Query["findChannelByUsername"];
}

export function StreamOverview({ channel }: StreamOverviewProps) {
  const { token, name, identity } = useStreamToken(channel.id);

  if (!(token && name && identity)) {
    return <StreamOverviewSkeleton />;
  }

  return (
    <LiveKitRoom
      className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 pr-4 lg:grid-cols-7"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      token={token}
    >
      <div className="order-1 col-span-1 flex flex-col lg:col-span-5">
        <StreamVideo channel={channel} />
        <StreamInfo channel={channel} />
        <AboutChannel channel={channel} />
        <ChannelSponsors channel={channel} />
      </div>
      <div className="order-2 col-span-1 flex h-[500px] flex-col gap-y-6 lg:col-span-2">
        <LiveChat
          channel={channel}
          isChatEnabled={channel.stream.isChatEnabled}
          isChatFollowersOnly={channel.stream.isChatFollowersOnly}
          isChatPremiumFollowersOnly={channel.stream.isChatPremiumFollowersOnly}
        />
      </div>
    </LiveKitRoom>
  );
}

export function StreamOverviewSkeleton() {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7">
      <div className="order-1 col-span-1 flex flex-col lg:col-span-5">
        <StreamVideoSkeleton />
        <StreamInfoSkeleton />
        <AboutChannelSkeleton />
      </div>
      <div className="order-2 col-span-1 flex h-[500px] flex-col gap-y-6 lg:col-span-2">
        <LiveChatSkeleton />
      </div>
    </div>
  );
}
