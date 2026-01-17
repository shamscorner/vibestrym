import { captureException } from "@sentry/nextjs";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { graphql } from "@/gql";
import { gqlFetch } from "@/gql/execute";
import type { StreamModel } from "@/gql/graphql";
import { StreamsContent } from "./components/stream-content";

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

export async function generateMetadata(props: {
  searchParams: Promise<{ searchTerm: string }>;
}): Promise<Metadata> {
  const t = await getTranslations("streams");

  const searchParams = await props.searchParams;

  return {
    title: searchParams.searchTerm
      ? `${t("searchHeading")} "${searchParams.searchTerm}"`
      : t("heading"),
  };
}

export default async function StreamsPage() {
  const { streams } = await gqlFetch(FindAllStreamsDoc, {
    filters: {},
  })
    .then((res) => ({
      streams: res.data?.findAllStreams ?? [],
    }))
    .catch((error) => {
      captureException(error);
      return { streams: [] };
    });

  return <StreamsContent streams={streams as StreamModel[]} />;
}
