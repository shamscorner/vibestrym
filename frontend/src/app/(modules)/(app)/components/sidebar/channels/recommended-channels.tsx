"use client";

import { useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/common/separator";
import { graphql } from "@/gql";
import { useSidebar } from "../../../hooks/sidebar";
import { ChannelItem, ChannelItemSkeleton } from "./channel-item";

const FindRecommendedChannelsDoc = graphql(`
query FindRecommendedChannels {
  findRecommendedChannels {
    username
    avatar
    isVerified
    stream {
      isLive
    }
  }
}
`);

export function RecommendedChannels() {
  const t = useTranslations("app.sidebar.recommended");

  const { isCollapsed } = useSidebar();

  const { data, loading: isLoadingRecommended } = useQuery(
    FindRecommendedChannelsDoc
  );
  const channels = data?.findRecommendedChannels ?? [];

  return (
    <div>
      <Separator className="mb-3" />
      {!isCollapsed && (
        <h2 className="mb-2 px-2 font-semibold text-muted-foreground">
          {t("heading")}
        </h2>
      )}
      {isLoadingRecommended
        ? Array.from({ length: 7 }).map((_, index) => (
            <ChannelItemSkeleton key={index} />
          ))
        : channels.map((channel, index) => (
            <ChannelItem channel={channel} key={index} />
          ))}
    </div>
  );
}
