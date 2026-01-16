"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Button } from "@/components/ui/common/button";
import { Card } from "@/components/ui/common/card";
import { Form, FormField } from "@/components/ui/common/form";
import { ChannelAvatar } from "@/components/ui/custom/channel-avatar";
import type { Query } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/confirm-dialog";
import {
  type UploadFileSchema,
  uploadFileSchema,
} from "@/schemas/upload-file.schema";
import { getMediaSource } from "@/utils/get-media-source";
import { graphql } from "../../../../../../gql";

const RemoveStreamThumbnailDoc = graphql(`
mutation RemoveStreamThumbnail {
  removeStreamThumbnail
}
`);

const ChangeStreamThumbnailDoc = graphql(`
mutation ChangeStreamThumbnail($thumbnail: Upload!) {
  changeStreamThumbnail(thumbnail: $thumbnail)
}
`);

interface ChangeThumbnailFormProps {
  stream: Query["findChannelByUsername"]["stream"];
}

export function ChangeThumbnailForm({ stream }: ChangeThumbnailFormProps) {
  const t = useTranslations("streams.stream.settings.thumbnail");

  const { user } = useCurrentAccount();
  const { confirm: confirmRemove } = useConfirmDialog();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: getMediaSource(stream?.thumbnailUrl),
    },
  });

  const [update, { loading: isLoadingUpdate }] = useMutation(
    ChangeStreamThumbnailDoc,
    {
      onCompleted() {
        toast.success(t("updateMessage.success"));
      },
      onError() {
        toast.error(t("updateMessage.error"));
      },
    }
  );

  const [remove, { loading: isLoadingRemove }] = useMutation(
    RemoveStreamThumbnailDoc,
    {
      onCompleted() {
        toast.success(t("removeMessage.success"));
      },
      onError() {
        toast.error(t("removeMessage.error"));
      },
    }
  );

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      form.setValue("file", file);
      update({ variables: { thumbnail: file } });
    }
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <>
            <div className="flex items-center gap-x-6">
              {stream.thumbnailUrl && field.value ? (
                <Image
                  alt={stream.title}
                  className="aspect-video rounded-lg"
                  height={80}
                  src={
                    field.value instanceof File
                      ? URL.createObjectURL(field.value)
                      : field.value
                  }
                  width={190}
                />
              ) : (
                user && (
                  <Card className="flex h-28 w-full flex-col items-center justify-center rounded-lg">
                    <ChannelAvatar channel={user} />
                  </Card>
                )
              )}
              <div className="flex w-full items-center gap-x-3">
                <input
                  className="hidden"
                  onChange={handleImageChange}
                  ref={inputRef}
                  type="file"
                />
                <Button
                  disabled={isLoadingUpdate || isLoadingRemove}
                  onClick={() => inputRef.current?.click()}
                  variant="secondary"
                >
                  {t("updateButton")}
                </Button>
                {stream.thumbnailUrl && (
                  <Button
                    disabled={isLoadingUpdate || isLoadingRemove}
                    onClick={async () =>
                      await confirmRemove({
                        title: t("confirmDialog.heading"),
                        description: t("confirmDialog.message"),
                        actionType: "destructive",
                        action: async () => {
                          await remove();
                          return true;
                        },
                      })
                    }
                    size="icon"
                    variant="ghost"
                  >
                    <Trash className="size-4" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{t("info")}</p>
          </>
        )}
      />
    </Form>
  );
}
