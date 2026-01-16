import { Maximize, Minimize } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/common/button";
import { Hint } from "@/components/ui/custom/hint";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenControl({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) {
  const t = useTranslations("streams.stream.video.player.fullscreen");

  const Icon = isFullscreen ? Minimize : Maximize;

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint asChild label={isFullscreen ? t("exit") : t("open")}>
        <Button
          className="text-white hover:bg-white/10"
          onClick={onToggle}
          size="icon"
          variant="ghost"
        >
          <Icon className="size-6" />
        </Button>
      </Hint>
    </div>
  );
}
