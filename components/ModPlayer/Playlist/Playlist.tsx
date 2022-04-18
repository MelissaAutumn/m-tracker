import {IPlayer} from "../../../types/IPlayer";
import style from './Playlist.module.scss';
import {useEffect, useState} from "react";

interface IModPlayerPlaylistProps {
  player: IPlayer
  interactFn: (name: string) => void;
}

interface ISongMeta {
  node:any;
  song:string;
}

const Playlist = (props: IModPlayerPlaylistProps) => {
  const player = props.player;
  const interactFn = props.interactFn;
  const [selectedSong, setSelectedSong] = useState<ISongMeta|null>(null);

  if (!player || !interactFn) {
    return (<div/>);
  }

  const rootOnClick = (event : any) => {
    const node = event.target.parentNode;

    if (node.className.includes(style['root-active'])) {
      node.className = style.root;
      return;
    }

    node.className = [style.root, style['root-active']].join(' ');
  }

  const selectSong = (event: any, song: string) => {
    const node = event.target

    if (selectedSong) {
      selectedSong.node.className = style.clicky;
    }

    node.className = [style.clicky, style.selected].join(' ');
    setSelectedSong({
      node,
      song
    });
    interactFn(song);
  }

  const buildList = (category : string, list : Array<string>) => {
    const nestedElements = [];

    for (let i = 0; i < list.length; i++) {
      const song = list[i];
      const uniqueKey = [category, song].join('-');
      nestedElements.push(<li className={style.clicky} onClick={(event) => {selectSong(event, song)}} key={uniqueKey}>{song}</li>);
    }

    return (
    <li key={category} className={style.root}>
      <span className={style.clicky} onClick={rootOnClick}>
        {category}
      </span>
      <ul className={style.nested}>{nestedElements}</ul>
    </li>
    );
  }

  const songList = require("/public/data/modules/db.json")['Songs'];
  const treeList : any = [];

  Object.keys(songList).forEach(function(key) {
    treeList.push(buildList(key, songList[key]));
  });

  return (
    <div>
      <ul className={style.tree}>
        {treeList}
      </ul>
    </div>
  )
}

export default Playlist;