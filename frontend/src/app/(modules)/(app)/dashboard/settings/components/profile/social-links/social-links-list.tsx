"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { captureException } from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/common/separator";
import { graphql } from "../../../../../../../../gql";
import { SocialLinkItem } from "./social-link-item";

const ReorderSocialLinksDoc = graphql(`
mutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {
  reorderSocialLinks(list: $list)
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

export function SocialLinksList() {
  const t = useTranslations("dashboard.settings.profile.socialLinks");

  const { data, refetch } = useQuery(FindSocialLinksDoc);
  const items = useMemo(
    () => data?.findSocialLinks ?? [],
    [data?.findSocialLinks]
  );

  const [socialLinks, setSocialLinks] = useState(items);

  useEffect(() => {
    setSocialLinks(items);
  }, [items]);

  const [reorder, { loading: isLoadingReorder }] = useMutation(
    ReorderSocialLinksDoc,
    {
      onCompleted() {
        refetch();
        toast.success(t("reorderMessage.success"));
      },
      onError(error) {
        captureException(error, {
          extra: {
            socialLinks,
            reorder,
            action: "SocialLinksList.reorder",
          },
        });
        toast.error(t("reorderMessage.error"));
      },
    }
  );

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const socialItems = Array.from(socialLinks);
    const [reorderItem] = socialItems.splice(result.source.index, 1);

    socialItems.splice(result.destination.index, 0, reorderItem);

    const bulkUpdateData = socialItems.map((socialLink, index) => ({
      id: socialLink.id,
      position: index,
    }));

    setSocialLinks(socialItems);

    reorder({ variables: { list: bulkUpdateData } });
  }

  return socialLinks.length ? (
    <>
      <Separator />
      <div className="mt-5 px-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="socialLinks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {socialLinks.map((socialLink, index) => (
                  <Draggable
                    draggableId={socialLink.id}
                    index={index}
                    isDragDisabled={isLoadingReorder}
                    key={socialLink.id}
                  >
                    {(providedInner) => (
                      <SocialLinkItem
                        key={index}
                        provided={providedInner}
                        socialLink={socialLink}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  ) : null;
}
