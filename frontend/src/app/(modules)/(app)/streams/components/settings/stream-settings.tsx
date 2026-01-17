import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Button } from "@/components/ui/common/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/dialog";
import type { Query } from "@/gql/graphql";
import { ChangeStreamInfoForm } from "./change-stream-info-form";
import { ChangeThumbnailForm } from "./change-thumbnail-form";

interface StreamSettingsProps {
  channel: Query["findChannelByUsername"];
}

export function StreamSettings({ channel }: StreamSettingsProps) {
  const t = useTranslations("streams.stream.settings");

  const { user } = useCurrentAccount();

  const isOwnerChannel = user?.id === channel.id;

  if (!isOwnerChannel) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("heading")}</DialogTitle>
        </DialogHeader>
        <ChangeThumbnailForm stream={channel.stream} />
        <ChangeStreamInfoForm stream={channel.stream} />
      </DialogContent>
    </Dialog>
  );
}
