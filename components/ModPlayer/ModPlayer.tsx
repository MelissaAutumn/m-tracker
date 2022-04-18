import React, {createRef, forwardRef, RefObject, useEffect, useState} from "react";
import Script from "next/script";
import {IPlayer} from '../../types/IPlayer';
import {IMetadata} from "../../types/IMetadata";
import Duration from "./Duration/Duration";
import SubSongList from "./SubSongList/SubSongList";
import Metadata from "./Metadata/Metadata";
import Playlist from "./Playlist/Playlist";
import Audio from './Audio/Audio';
import MediaSession from "./MediaSession/MediaSession";
import audio from "./Audio/Audio";

// Styles
import styles from "./ModPlayer.module.scss";

declare global {
  interface Window {
    // So we can sneakily set this for chiptune2.js
    _audioContext: any;
    _debug_player: any;
    // Set by chiptune2.js
    ChiptuneJsPlayer: any;
    ChiptuneJsConfig: any;
    // Set by libopenmpt
    Module: any;
    // Set by me, so chiptune2.js works!
    libopenmpt: any;
  }
}

const ModPlayer = () => {
  const [openmpt2Instance, setOpenmpt2Instance] = useState<any>(null);
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [buffer, setBuffer] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [audioRef, setAudioRef] = useState<RefObject<HTMLAudioElement>|null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext|any|null>(null);

  const [mediaStream, setMediaStream] = useState<MediaStreamAudioDestinationNode|null>(null);


  useEffect(() => {
    if (!openmpt2Instance || !player) {
      return;
    }

    if (!isPlaying && buffer) {
      playCurrentSong();
    }

  }, [openmpt2Instance, player, buffer]);

  useEffect(() => {
    if (audioContext || !player) {
      return;
    }
    console.log("Set audio context");
    setAudioContext(window._audioContext);
  }, [audioContext, player])


  const renderScripts = () => {
    return (
      <div>
        <Script src="/js/chiptune2/chiptune2.js"
                onLoad={() => {
                  console.log("Chiptune 2 loaded!");
                  window._audioContext = new window.AudioContext();
                  const player = new window.ChiptuneJsPlayer(new window.ChiptuneJsConfig(-1, 100, 0, window._audioContext));
                  window._debug_player = player;

                  setPlayer(player);
                }}
                onError={(e) => {
                  console.warn("chiptune2.js failed to load.", e);
                }}
        />
        <Script src="/js/chiptune2/libopenmpt.js"
                onLoad={() => {
                  console.log("libopenmpt loaded!");
                  // Tie together window.Module to libopenmpt, this needs to be set globally as ChiptuneJsPlayer expects a global instance :c
                  window.libopenmpt = window.Module;
                  setOpenmpt2Instance(window.Module);
                }}
                onError={(e) => {
                  console.warn("libopenmpt.js failed to load.", e);
                }}
        />
      </div>
    );
  };

  if (!player) {
    return (renderScripts());
  }

  // play current song
  const playCurrentSong = () => {
    const dest = audioContext.createMediaStreamDestination();
    setMediaStream(dest);

    player.play(buffer, dest);
    setMetadata(player.metadata());

    setPlayerReady(true);
    setIsPlaying(true);

    // Start with the "ALL" subtrack
    playSubSong(-1);
  };
  const playSubSong = (index: number) => {
    const success = player.selectSubSong(index);
  }

  const onSelectSong = (name:string) => {
    setPlayerReady(false);
    setIsPlaying(false);
    player.stop();

    setBuffer(null);
    player.load(`/data/modules/${name}`, (buffer: any) => {
      setBuffer(buffer);
    });
  }


  const togglePlayback = () => {
    if (!audioRef || !audioRef.current) {
      return;
    }

    const ref = audioRef.current;

    if (ref.paused) {
      ref.play();
    } else {
      ref.pause();
    }
  }

  /**
   * On retrieval of Audio Reference Object
   * @param ref
   */
  const onMediaRef = (ref: RefObject<HTMLAudioElement>) => {
    setAudioRef(ref);
  };

  /**
   * On <Audio> Play
   * Don't call directly!
   * @param ev
   */
  const onMediaPlay = (ev: Event) => {
    if (!playerReady) {
      return;
    }

    player.unpause();
  }

  /**
   * On <Audio> Pause
   * Don't call directly!
   * @param ev
   */
  const onMediaPause = (ev: Event) => {
    if (!playerReady) {
      return;
    }

    player.pause();
  }

  return (
    <div className={styles.container}>
      <div className={[styles.column, styles.playlist].join(' ')}>
        <h3>Playlist</h3>
        <Playlist player={player} interactFn={onSelectSong}/>
      </div>
      <div className={[styles.column, styles.playInfo].join(' ')}>
      <h1>{metadata && (metadata.title)}</h1>
      <div onClick={togglePlayback}> PLAY / PAUSE</div>
      {playerReady && (
        <Duration player={player}/>
      )}
      <h3>Sub Songs</h3>
      {playerReady && (
        <SubSongList player={player} play={playSubSong}/>
      )}
      <h3>Metadata</h3>
      {playerReady && (
        <Metadata player={player}/>
      )}
      </div>


      {renderScripts()}

      <MediaSession player={player} isPlaying={audioRef?.current?.paused || false}/>
      <Audio onRef={onMediaRef} onPlay={onMediaPlay} onPause={onMediaPause} mediaStream={mediaStream} showControls={true}/>

    </div>
  )
};

export default ModPlayer;