import {IPlayer} from "../../../types/IPlayer";
import {IMetadata} from "../../../types/IMetadata";
import React, {useEffect} from "react";

interface IMediaSessionProps {
  player : IPlayer,
  isPlaying: boolean,
}

// FIXME: Media Session API directly attaches to <audio> / <video> and does not work with AudioContext API!
// FIXME: Re-enable once we re-work our libopenmpt interface
const MediaSession = (props:IMediaSessionProps) => {
  const { mediaSession } = navigator;

  useEffect(() => {
    if (props.isPlaying) {
      mediaSession.playbackState = "playing";
    } else {
      mediaSession.playbackState = "paused";
    }

    if (!props.player || !props.player.currentPlayingNode) {
      return;
    }

    const metadata = props.player.metadata() as IMetadata;

    if (metadata) {
      mediaSession.metadata = new MediaMetadata({
        title: metadata['title'],
        artist: metadata['artist'],
        album: 'm-tracker',
      });
    }
  }, [props]);

  return (<div/>);
}

export default MediaSession;