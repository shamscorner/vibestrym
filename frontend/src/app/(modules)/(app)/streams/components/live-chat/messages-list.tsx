import { useEffect, useState } from 'react';

import {
  type FindChannelByUsernameQuery,
  type FindChatMessagesByStreamQuery,
  useChatMessageAddedSubscription,
  useFindChatMessagesByStreamQuery,
  useFindSponsorsByChannelQuery,
} from '@/graphql/_generated/output';

import { MessageItem } from './message-item';

interface MessagesListProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function MessagesList({ channel }: MessagesListProps) {
  const { data } = useFindChatMessagesByStreamQuery({
    variables: {
      streamId: channel.stream.id,
    },
  });

  const { data: sponsorsData } = useFindSponsorsByChannelQuery({
    variables: {
      channelId: channel.id,
    },
  });
  const sponsors = sponsorsData?.findSponsorsByChannel ?? [];

  const sponsorIds = new Set(sponsors.map((sponor) => sponor.user.id));

  const [messages, setMessages] = useState<
    FindChatMessagesByStreamQuery['findChatMessagesByStream']
  >([]);

  const { data: newMessageData } = useChatMessageAddedSubscription({
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
