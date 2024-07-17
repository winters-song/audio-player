import { IEffectMode } from "../../models/common"

import song1 from '../../assets/audio/薬師寺寛邦,キッサコ - 呼吸.mp3';
import song2 from '../../assets/audio/小高直樹 - ステージ2、5.mp3'
import song3 from '../../assets/audio/药不能停呢 - 特救指令日版F关.mp3'
import song4 from '../../assets/audio/Paul Romero,Rob King,Steve Baca - stronghold towns.mp3'
import song5 from '../../assets/audio/SNK新世界楽曲雑技団 - ESAKA？ (主人公チーム).mp3'
import song6 from '../../assets/audio/Quazar - Funky Stars.mp3'

export enum PLAY_MODE {
  LOOP = 0,
  SINGLE = 1,
  RANDOM = 2,
}

export enum CANVAS_TYPE {
  CANVAS_2D,
  WEBGL
}

export const TOTAL_PLAY_MODE = 3


export const effectList: IEffectMode[] = [{
  id: 1,
  name: 'Bar 2D',
  type: CANVAS_TYPE.CANVAS_2D
},{
  id: 2,
  name: 'Pixel Art LED',
  type: CANVAS_TYPE.CANVAS_2D
},{
  id: 3,
  name: 'Line 3D',
  type: CANVAS_TYPE.WEBGL
}]


export const defaultPlayList = [
  song1, song2, song3, song4, song5, //song6
]