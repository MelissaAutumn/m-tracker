// Loose interface over Chiptune2.js
export interface IPlayer {
  // IPlayer
  play(buffer:any, dest:AudioNode): void;
  stop(): void;
  pause(): void;
  unpause(): void;
  togglePause(): void;
  load(input:string, callback: (buffer:any) => void): void;

  // IMetadata
  duration(): any;
  getCurrentRow(): any;
  getCurrentPattern(): any;
  getCurrentOrder(): any;
  metadata(): any;

  // Events
  fireEvent(eventName: any, response: any): void;
  addHandler(eventName: any, handler: any): void;
  onEnded(handler:any): void;
  onError(handler:any): void;

  // ?
  unlock(): void;

  // Misc?
  createLibopenmptNode(buffer:any, config:any): void;
  module_ctl_set(ctl:any, value:any): any;

  // Additional functions by me!
  // Not the full libopenmpt api

  // Getters
  position(): any;
  estimatedBPM(): any;
  playingChannels(): any;
  speed(): any;
  tempo(): any;
  instrumentName(index:number): any;
  channelCount(): any;
  instrumentCount(): any;
  orderCount(): any;
  patternCount(): any;
  sampleCount(): any;
  subSongCount(): any;

  sampleName(index:number): any;
  selectedSubSong(): any;
  subSongName(index:number): any;
  selectSubSong(index:number): boolean;

  currentPlayingNode: object|null;
}