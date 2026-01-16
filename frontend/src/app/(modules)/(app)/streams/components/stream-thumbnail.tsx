"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/common/card";
import { ChannelAvatar } from "@/components/ui/custom/channel-avatar";
import { LiveBadge } from "@/components/ui/custom/live-badge";

import type { Query } from "@/gql/graphql";

import { getRandomColor } from "@/utils/color";
import { getMediaSource } from "@/utils/get-media-source";

interface StreamThumbnailProps {
  url: string | null | undefined;
  user: Pick<Query["findProfile"], "username" | "avatar" | "isVerified">;
  isLive?: boolean;
}

export function StreamThumbnail({ url, user, isLive }: StreamThumbnailProps) {
  const [randomColor, setRandomColor] = useState("");

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  return (
    <div className="group relative aspect-video cursor-pointer rounded-xl">
      <div
        className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          backgroundColor: randomColor,
        }}
      />
      {url ? (
        <Image
          alt={user.username}
          className="rounded-xl object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
          fill
          sizes="(100vw - 2rem) / 3"
          src={getMediaSource(url)}
        />
      ) : (
        <Card className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
          <ChannelAvatar channel={user} isLive={isLive} />
        </Card>
      )}
      {isLive && (
        <div className="absolute top-2 right-2 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}
