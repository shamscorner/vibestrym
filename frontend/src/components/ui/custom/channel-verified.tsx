import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

import { cn } from "@/utils/tw-merge";

const channelVerifiedSizes = cva("", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelVerifiedProps
  extends VariantProps<typeof channelVerifiedSizes> {}

export function ChannelVerified({ size }: ChannelVerifiedProps) {
  return (
    <span className="flex items-center justify-center rounded-full border border-emerald-600">
      <CheckIcon
        className={cn(
          "stroke-[4px] p-[3px] text-emerald-600 dark:text-emerald-500",
          size === "sm" ? "size-4" : "size-6"
        )}
      />
    </span>
  );
}
