import { cva, type VariantProps } from "class-variance-authority";
import type { Query } from "@/gql/graphql";
import { getMediaSource } from "@/utils/get-media-source";
import { cn } from "@/utils/tw-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../common/avatar";

const avatarSizes = cva("", {
  variants: {
    size: {
      sm: "size-7",
      default: "size-9",
      lg: "size-14",
      xl: "size-32",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
  channel: Pick<Query["findProfile"], "username" | "avatar">;
  isLive?: boolean;
}

export function ChannelAvatar({ size, channel, isLive }: ChannelAvatarProps) {
  return (
    <div className="relative">
      <Avatar
        className={cn(avatarSizes({ size }), isLive && "ring-2 ring-red-600")}
      >
        <AvatarImage
          className="object-cover"
          src={getMediaSource(channel.avatar)}
        />
        <AvatarFallback
          className={cn(
            "text-xl",
            size === "xl" && "text-4xl",
            size === "lg" && "text-2xl"
          )}
        >
          <span className="-mt-0.5">{channel.username[0]}</span>
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
