import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/app/(modules)/(auth)/hooks";

interface ChatInfoProps {
  isOwnerChannel: boolean;
  isFollower: boolean;
  isSponsor: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatPremiumFollowersOnly: boolean;
}

export function ChatInfo({
  isOwnerChannel,
  isFollower,
  isSponsor,
  isChatEnabled,
  isChatFollowersOnly,
  isChatPremiumFollowersOnly,
}: ChatInfoProps) {
  const t = useTranslations("streams.chat.info");

  const { isAuthenticated } = useAuth();

  let message = "";

  switch (true) {
    case !isAuthenticated:
      message = t("authRequired");
      break;
    case isOwnerChannel:
      return null;
    case !isChatEnabled:
      message = t("chatDisabled");
      break;
    case isChatPremiumFollowersOnly && !isSponsor:
      message = t("premiumFollowersOnly");
      break;
    case isChatFollowersOnly && !isFollower:
      message = t("followersOnly");
      break;
    default:
      return null;
  }

  return (
    <div className="mt-2 flex h-10 w-full items-center gap-x-2 rounded-md border bg-accent px-3 text-muted-foreground">
      <Info className="size-4" />
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
}
