import { useMutation, useQuery } from "@apollo/client/react";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureException } from "@sentry/nextjs";
import { GripVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/common/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/common/form";
import { Input } from "@/components/ui/common/input";
import { graphql } from "@/gql";
import type { SocialLinkModel } from "@/gql/graphql";
import { useConfirmDialog } from "@/hooks/confirm-dialog";
import {
  type SocialLinksSchema,
  socialLinksSchema,
} from "./social-links.schema";

const UpdateSocialLinkDoc = graphql(`
mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {
  updateSocialLink(id: $id, data: $data)
}
`);

const RemoveSocialLinkDoc = graphql(`
mutation RemoveSocialLink($id: String!) {
  removeSocialLink(id: $id)
}
`);

const FindSocialLinksDoc = graphql(`
query FindSocialLinks {
  findSocialLinks {
    id
    title
    url
    position
  }
}
`);

interface SocialLinkItemProps {
  socialLink: SocialLinkModel;
  provided: DraggableProvided;
}

export function SocialLinkItem({ socialLink, provided }: SocialLinkItemProps) {
  const t = useTranslations("dashboard.settings.profile.socialLinks.editForm");

  const [editingId, setIsEditingId] = useState<string | null>(null);

  const { confirm: confirmDelete } = useConfirmDialog();
  const { refetch } = useQuery(FindSocialLinksDoc);

  const form = useForm<SocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    values: {
      title: socialLink.title ?? "",
      url: socialLink.url ?? "",
    },
  });

  const { isValid, isDirty } = form.formState;

  function toggleEditing(id: string | null) {
    setIsEditingId(id);
  }

  const [update, { loading: isLoadingUpdate }] = useMutation(
    UpdateSocialLinkDoc,
    {
      onCompleted() {
        toggleEditing(null);
        refetch();
        toast.success(t("updateMessage.success"));
      },
      onError(error) {
        captureException(error, {
          extra: {
            socialLinkId: socialLink.id,
            action: "SocialLinkItem.update",
          },
        });
        toast.error(t("updateMessage.error"));
      },
    }
  );

  const [remove, { loading: isLoadingRemove }] = useMutation(
    RemoveSocialLinkDoc,
    {
      onCompleted() {
        refetch();
        toast.success(t("removeMessage.success"));
      },
      onError(error) {
        captureException(error, {
          extra: {
            socialLinkId: socialLink.id,
            action: "SocialLinkItem.remove",
          },
        });
        toast.error(t("removeMessage.error"));
      },
    }
  );

  function onSubmit(data: SocialLinksSchema) {
    update({ variables: { id: socialLink.id, data } });
  }

  return (
    <div
      className="relative mb-4 flex items-center gap-x-2 overflow-hidden rounded-md border border-border bg-background text-sm"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        className="absolute top-0 bottom-0 left-0 flex w-10 items-center justify-center border-r border-r-border text-foreground transition"
        {...provided.dragHandleProps}
      >
        <GripVerticalIcon className="size-5" />
      </div>
      <div className="ml-12 flex flex-1 flex-col gap-y-1 px-2 py-3">
        {editingId === socialLink.id ? (
          <Form {...form}>
            <form
              className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-[3fr_1fr]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-8"
                          disabled={isLoadingUpdate || isLoadingRemove}
                          placeholder="YouTube"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-8"
                          disabled={isLoadingUpdate || isLoadingRemove}
                          placeholder="https://youtube.com/@TeaCoder52"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-4">
                <Button
                  onClick={() => toggleEditing(null)}
                  size="sm"
                  variant="secondary"
                >
                  {t("cancelButton")}
                </Button>
                <Button
                  disabled={
                    !(isDirty && isValid) || isLoadingUpdate || isLoadingRemove
                  }
                  size="sm"
                >
                  {t("submitButton")}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <h2 className="font-semibold text-[17px] text-foreground">
              {socialLink.title}
            </h2>
            <p className="text-muted-foreground">{socialLink.url}</p>
          </>
        )}
      </div>
      <div className="ml-auto flex items-center gap-x-2 pr-4">
        {editingId !== socialLink.id && (
          <Button
            onClick={() => toggleEditing(socialLink.id)}
            size="icon"
            variant="ghost"
          >
            <PencilIcon className="size-4 text-muted-foreground" />
          </Button>
        )}
        <Button
          className="hover:opacity-80"
          onClick={async () =>
            await confirmDelete({
              title: t("deleteConfirmDialog.heading"),
              description: t("deleteConfirmDialog.message"),
              confirmText: t("deleteConfirmDialog.confirmButton"),
              cancelText: t("deleteConfirmDialog.cancelButton"),
              actionType: "destructive",
              action: async () => {
                await remove({ variables: { id: socialLink.id } });
                return true;
              },
            })
          }
          size="icon"
          variant="destructive"
        >
          <Trash2Icon className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
