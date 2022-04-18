import {createRef, RefObject, useEffect, useState} from "react";

interface IModPlayerAudioProps {
  showControls?: boolean;
  onPlay: (ev: Event) => void;
  onPause: (ev: Event) => void;
  onRef: (ref: RefObject<HTMLAudioElement>) => void;
  mediaStream: MediaStreamAudioDestinationNode | null;
}

const Audio = (props: IModPlayerAudioProps) => {
  const [isInit, setIsInit] = useState<boolean>(false);
  const [audioRef] = useState(createRef<HTMLAudioElement>());

  useEffect(() => {
    if (!audioRef ||  !audioRef.current || isInit) {
      return;
    }

    // Pass up the ref
    props.onRef(audioRef);

    const audio = audioRef.current;
    audio.onplay = ((ev) => props.onPlay(ev));
    audio.onpause = ((ev) => props.onPause(ev));

    setIsInit(true);

  }, [audioRef])

  useEffect(() => {
    if (!props.mediaStream || !audioRef || !audioRef.current) {
      return;
    }

    const audio = audioRef.current;
    audio.srcObject = props.mediaStream.stream;

  }, [props.mediaStream, audioRef]);

  return (
    <div>
      <audio style={{position: "absolute", left:0, top:0, width:"100%"}}  autoPlay ref={audioRef} controls={props.showControls}/>
    </div>
  )
}

Audio.defaultProps = {
  showControls: false,
};

export default Audio;