import { useQuery, useSubscription } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { graphql } from "@/gql";
import type { ChatMessageAddedSubscription, Query } from "@/gql/graphql";
import { MessageItem } from "./message-item";

const FindSponsorsByChannelDoc = graphql(`
query FindSponsorsByChannel($channelId: String!) {
  findSponsorsByChannel(channelId: $channelId) {
    user {
      id
      username
      avatar
    }
  }
}
`);

const FindChatMessagesByStreamDoc = graphql(`
query FindChatMessagesByStream($streamId: String!) {
  findChatMessagesByStream(streamId: $streamId) {
    createdAt
    text
    user {
      id
      username
    }
  }
}
`);

const ChatMessageAddedDoc = graphql(`
subscription ChatMessageAdded($streamId: String!) {
  chatMessageAdded(streamId: $streamId) {
    createdAt
    text
    user {
      id
      username
    }
  }
}
`);

interface MessagesListProps {
  channel: Query["findChannelByUsername"];
}

export function MessagesList({ channel }: MessagesListProps) {
  const { data } = useQuery(FindChatMessagesByStreamDoc, {
    variables: {
      streamId: channel.stream.id,
    },
  });

  const { data: sponsorsData } = useQuery(FindSponsorsByChannelDoc, {
    variables: {
      channelId: channel.id,
    },
  });
  const sponsors = sponsorsData?.findSponsorsByChannel ?? [];

  const sponsorIds = new Set(sponsors.map((sponor) => sponor.user.id));

  const [messages, setMessages] = useState<
    ChatMessageAddedSubscription["chatMessageAdded"][]
  >([]);

  const { data: newMessageData } = useSubscription(ChatMessageAddedDoc, {
    variables: {
      streamId: channel.stream.id,
    },
  });

  useEffect(() => {
    if (data?.findChatMessagesByStream) {
      setMessages(data.findChatMessagesByStream);
    }
  }, [data]);

  useEffect(() => {
    if (newMessageData) {
      const newMessage = newMessageData.chatMessageAdded;

      setMessages((prev) => [newMessage, ...prev]);
    }
  }, [newMessageData]);

  return (
    <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto text-sm">
      {messages.map((message, index) => (
        <MessageItem
          isSponsor={sponsorIds.has(message.user.id)}
          key={index}
          message={message}
        />
      ))}
    </div>
  );
}
