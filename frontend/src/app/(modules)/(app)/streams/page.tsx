import { captureException } from "@sentry/nextjs";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SERVER_URL } from "@/constants/url.constants";
import { FindAllStreamsDocument, type Query } from "@/gql/graphql";
import { StreamsContent } from "./components/stream-content";

async function findAllStreams() {
  try {
    const query = FindAllStreamsDocument.loc?.source.body;
    const variables = {
      filters: {},
    };

    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    return {
      streams: data.data.findAllStreams as Query["findAllStreams"],
    };
  } catch (error) {
    captureException(error, {
      extra: {
        location: "findAllStreams",
        serverUrl: SERVER_URL,
      },
    });
    throw new Error("Failed to fetch streams");
  }
}

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
  const { streams } = await findAllStreams();

  return <StreamsContent streams={streams} />;
}
