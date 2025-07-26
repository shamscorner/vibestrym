import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import type { JSX } from 'react';

import { Skeleton } from '@/components/ui/common/skeleton';

import type { FindChannelByUsernameQuery } from '@/graphql/_generated/output';

import { StreamLoading } from './stream-loading';
import { StreamOffline } from './stream-offline';
import { StreamPlayer } from './stream-player';

interface StreamVideoProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamVideo({ channel }: StreamVideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(channel.id);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === channel.id);

  let content: JSX.Element;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <StreamOffline channel={channel} />;
  } else if (!participant || tracks.length === 0) {
    content = <StreamLoading />;
  } else {
    content = <StreamPlayer participant={participant} />;
  }

  return (
    <div className="group relative mb-6 aspect-video rounded-lg">{content}</div>
  );
}

export function StreamVideoSkeleton() {
  return (
    <div className="mb-6 aspect-video">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
}
