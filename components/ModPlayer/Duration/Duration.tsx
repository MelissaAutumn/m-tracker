import {useEffect, useState} from "react";
import {IPlayer} from "../../../types/IPlayer";
import {clearInterval, setInterval} from "timers";

interface IModPlayerDurationProps {
  player : IPlayer
}

const Duration = (props:IModPlayerDurationProps) => {
  const [playerTick, setPlayerTick] = useState(-1);
  const [_interval, _setInterval] = useState<any>(null);

  const player = props.player;

  // We can't access state here, but return() can access the interval var _si!
  useEffect(() => {
    // We want to force this component to update every 500ms.
    const _si = setInterval(() => {
      const newTick = Math.random();
      setPlayerTick(newTick);
    }, 500);

    _setInterval(_si);

    return () => {
      if (_si) {
        clearInterval(_si);
      }
    }
    //Runs only on the first render
  }, []);


  if (!player) {
    return (<div/>);
  }

  const position = player.position() as number;
  const duration = player.duration() as number;

  return (
    <div>
      {position.toFixed(0)} / {duration.toFixed(0)}
    </div>
  )
}

export default Duration;