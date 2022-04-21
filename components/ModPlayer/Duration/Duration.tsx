import {useEffect, useState} from "react";
import {IPlayer} from "../../../types/IPlayer";
import {clearInterval, setInterval} from "timers";
import style from './Duration.module.scss';

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

  // Ceil to remove percentage widths, and min to make sure repeating samples aren't going past the progress bar
  const complete = Math.ceil(Math.min(100, (position / duration) * 100));

  return (
    <div>
      {position.toFixed(0)} / {duration.toFixed(0)}
      <div className={style['progress-bar']}>
        <div className={style['progress-fill']} style={{ width: `${complete}%` }}>

        </div>
      </div>
    </div>
  )
}

export default Duration;