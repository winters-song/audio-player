import { CANVAS_TYPE } from "../components/common/constants";

export interface ICommonStore {
  playListVisible: boolean;
  playList: PlayListItem[];
  randomPlayList: PlayListItem[];
  currentItem?: PlayListItem;
  // 0 - loop, 1 - single cycle, 2 - random
  playMode: number; 

  effectMode: IEffectMode;
}

export interface IStore {
  common: ICommonStore
}

export interface PlayListItem {
  name: string;
  title?: string;
  artist?: string;
  url: string;
  cover?: string;
}



export interface IBaseScene {

  el: HTMLCanvasElement | null

  stats: any
  
  stopVisualize: () => void

  destroy: () => void

  resetCanvas: () => void

  drawEachFrame: (dataArray: Uint8Array) => void

  init: () => void
}


export interface ISceneProps{
  el: HTMLCanvasElement | null

  stats: any

  audioCtx: AudioContext | null

  analyser: AnalyserNode | null
}


export interface IEffectMode{
  id: number;
  name: string;
  type: CANVAS_TYPE;
}