"use client";

import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Heading } from "@/components/ui/custom/heading";
import { graphql } from "@/gql";
import type { StreamModel } from "@/gql/graphql";
import { StreamCardSkeleton } from "./stream-card";
import { StreamsList } from "./stream-list";

const FindAllStreamsDoc = graphql(`
query FindAllStreams($filters: FiltersInput!) {
  findAllStreams(filters: $filters) {
    title
    thumbnailUrl
    isLive
    user {
      username
      avatar
      isVerified
    }
    category {
      title
      slug
    }
  }
}
`);

interface StreamsContentProps {
  streams: StreamModel[];
}

export function StreamsContent({ streams }: StreamsContentProps) {
  const t = useTranslations("streams");

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  const [streamList, setStreamList] = useState<StreamModel[]>(streams ?? []);
  const [hasMore, setHasMore] = useState(true);

  const { data, fetchMore } = useQuery(FindAllStreamsDoc, {
    variables: {
      filters: {
        searchTerm,
        take: 12,
        skip: 0,
      },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.findAllStreams) {
      setStreamList(data.findAllStreams as StreamModel[]);
      setHasMore(data.findAllStreams.length === 12);
    }
  }, [data]);

  function fetchMoreStreams() {
    if (!hasMore) return;

    setTimeout(async () => {
      const { data: newData } = await fetchMore({
        variables: {
          filters: {
            searchTerm,
            take: 12,
            skip: streamList.length,
          },
        },
      });

      if (newData?.findAllStreams.length) {
        setStreamList((prev) => [
          ...prev,
          ...(newData.findAllStreams as StreamModel[]),
        ]);
      } else {
        setHasMore(false);
      }
    }, 400);
  }

  return (
    <>
      <Heading
        title={
          searchTerm ? `${t("searchHeading")} "${searchTerm}"` : t("heading")
        }
      />
      <InfiniteScroll
        dataLength={streamList.length}
        hasMore={hasMore}
        loader={
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <StreamCardSkeleton key={index} />
            ))}
          </div>
        }
        next={fetchMoreStreams}
      >
        <StreamsList streams={streamList} />
      </InfiniteScroll>
    </>
  );
}
