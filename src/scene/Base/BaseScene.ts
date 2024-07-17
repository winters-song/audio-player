import { IBaseScene, ISceneProps } from "../../models/common"

export default class BaseScene implements IBaseScene {
  // canvas dom element
  el: HTMLCanvasElement | null = null

  audioCtx: AudioContext | null = null

  analyser: AnalyserNode | null = null

  stats: any

  inited = false

  removeResizeEvent?: () => void

  constructor(params: ISceneProps) {
    Object.assign(this, params)
  }

  public init () { }

  public stopVisualize () { }

  public resetCanvas () { }

  public drawEachFrame (dataArray: Uint8Array) { }

  public destroy () {
    this.stopVisualize();

    if (this.removeResizeEvent) {
      this.removeResizeEvent();
    }
  }

};

