import { useTracks } from "@livekit/components-react";
import { type RemoteParticipant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { FullscreenControl } from "./full-screen-control";
import { VolumeControl } from "./volume-control";

interface StreamPlayerProps {
  participant: RemoteParticipant;
}

export function StreamPlayer({ participant }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function onVolumeChange(value: number) {
    setVolume(+value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  }

  function toggleMute() {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  }

  function toggleFullscreen() {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  }

  function handleFullscreenChange() {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;

    setIsFullscreen(isCurrentlyFullscreen);
  }

  useEventListener(
    "fullscreenchange" as keyof WindowEventMap,
    handleFullscreenChange
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <it only runs once during the initial render>
  useEffect(() => {
    onVolumeChange(0);
  }, []);

  {
    const tracks = useTracks([
      Track.Source.Camera,
      Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === participant.identity);
    for (const track of tracks) {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    }
  }

  return (
    <div className="relative flex h-full" ref={wrapperRef}>
      {/** biome-ignore lint/a11y/useMediaCaption: <no need> */}
      <video ref={videoRef} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100">
        <div className="absolute bottom-0 flex h-16 w-full items-center justify-between px-4">
          <VolumeControl
            onChange={onVolumeChange}
            onToggle={toggleMute}
            value={volume}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
