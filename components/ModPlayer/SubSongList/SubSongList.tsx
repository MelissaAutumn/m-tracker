import {useEffect, useState} from "react";
import {IPlayer} from "../../../types/IPlayer";
import {clearInterval, setInterval} from "timers";

interface ISubSongListProps {
  player: IPlayer;
  play: (index: number) => void;
}

const SubSongList = (props: ISubSongListProps) => {
  const player = props.player;

  useEffect(() => {

  }, []);

  if (!player) {
    return (<div/>);
  }

  const total = player.subSongCount();

  let subsongs = [<li onClick={() => {
    props.play(-1)
  }} key={-1}>{-1}: All</li>];

  for (let i = 0; i < total; i++) {
    let name = player.subSongName(i);

    if (!name) {
      name = `Index ${i}`;
    }

    subsongs.push(<li onClick={() => {
      props.play(i)
    }} key={i}>{i}: {name}</li>);
  }


  return (
    <ul>
      {subsongs}
    </ul>
  )
}

export default SubSongList;