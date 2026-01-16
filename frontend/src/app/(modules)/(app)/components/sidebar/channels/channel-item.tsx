"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/common/button";
import { Skeleton } from "@/components/ui/common/skeleton";
import { ChannelAvatar } from "@/components/ui/custom/channel-avatar";
import { ChannelVerified } from "@/components/ui/custom/channel-verified";
import { Hint } from "@/components/ui/custom/hint";
import { LiveBadge } from "@/components/ui/custom/live-badge";
import type { FindRecommendedChannelsQuery } from "@/gql/graphql";
import { cn } from "@/utils/tw-merge";
import { useSidebar } from "../../../hooks/sidebar";

interface ChannelItemProps {
  channel: FindRecommendedChannelsQuery["findRecommendedChannels"][0];
}

export function ChannelItem({ channel }: ChannelItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === `/${channel.username}`;

  return isCollapsed ? (
    <Hint asChild label={channel.username} side="right">
      <Link
        className="mt-3 flex w-full items-center justify-center"
        href={`/${channel.username}`}
      >
        <ChannelAvatar channel={channel} isLive={channel.stream.isLive} />
      </Link>
    </Hint>
  ) : (
    <Button
      asChild
      className={cn("mt-2 h-11 w-full justify-start", isActive && "bg-accent")}
      variant="ghost"
    >
      <Link className="flex w-full items-center" href={`/${channel.username}`}>
        <ChannelAvatar
          channel={channel}
          isLive={channel.stream.isLive}
          size="sm"
        />
        <div className="truncate pl-3">{channel.username}</div>
        {channel.isVerified && <ChannelVerified size="sm" />}
        {channel.stream.isLive && (
          <div className="absolute right-5">
            <LiveBadge />
          </div>
        )}
      </Link>
    </Button>
  );
}

export function ChannelItemSkeleton() {
  return <Skeleton className="mt-3 h-11 w-full rounded-full" />;
}
