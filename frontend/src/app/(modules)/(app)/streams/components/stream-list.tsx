import { EmptyState } from "@/components/ui/custom/empty-state";
import { Heading } from "@/components/ui/custom/heading";

import type { StreamModel } from "@/gql/graphql";

import { StreamCard } from "./stream-card";

interface StreamsListProps {
  heading?: string;
  streams: StreamModel[];
}

export function StreamsList({ heading, streams }: StreamsListProps) {
  return streams.length ? (
    <>
      {heading && <Heading title={heading} />}
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {streams.map((stream, index) => (
          <StreamCard key={index} stream={stream} />
        ))}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
