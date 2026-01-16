import { Skeleton } from "@/components/ui/common/skeleton";

import type { Query } from "@/gql/graphql";

import { FollowButton } from "./actions/follow-button";
import { ShareActions } from "./actions/share-actions";
import { SupportButton } from "./actions/support-button";
import { StreamSettings } from "./settings/stream-settings";

interface StreamActionsProps {
  channel: Query["findChannelByUsername"];
}

export function StreamActions({ channel }: StreamActionsProps) {
  return (
    <div className="mt-5 flex items-center gap-x-3">
      <FollowButton channel={channel} />
      {channel.isVerified && channel.sponsorshipPlans.length > 0 && (
        <SupportButton channel={channel} />
      )}
      <StreamSettings channel={channel} />
      <ShareActions channel={channel} />
    </div>
  );
}

export function StreamActionsSkeleton() {
  return (
    <div className="mt-5 flex items-center gap-x-3">
      <Skeleton className="h-10 w-44 rounded-full" />
      <Skeleton className="size-10 rounded-full" />
    </div>
  );
}
