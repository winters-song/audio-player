import { IEffectMode, ISceneProps } from "../../models/common"
import Bar2D from "../../scene/Bar2D/Bar2D"
import Pixel from "../../scene/Pixel/Pixel"
import Line from "../../scene/Line/Line"
import { CANVAS_TYPE } from "../common/constants"
// import TestScene from "../../scene/Test/TestScene"


const SceneList = [
  Bar2D,
  Pixel,
  Line
]

const canvas2dSelector = '#canvas-2d'
const canvasWebglSelector = '#canvas-webgl'

export default class SceneMgr {

  canvas2dEl: HTMLCanvasElement | null = null

  canvasWebglEl: HTMLCanvasElement | null = null

  audioCtx: AudioContext | null = null

  analyser: AnalyserNode | null = null

  scene: any = null

  stats: any = null

  source: MediaStreamAudioSourceNode | null = null

  stream: MediaStream | null = null

  //  ['Bar', 'Pixel', 'Ring']
  currentEffectMode?: IEffectMode

  constructor() {
    this.canvas2dEl = document.querySelector(canvas2dSelector);
    this.canvasWebglEl = document.querySelector(canvasWebglSelector);
    if (!this.canvas2dEl || !this.canvasWebglEl) {
      throw new Error('找不到 canvas');
    }
    this.canvasWebglEl.width = this.canvas2dEl.width = window.innerWidth;    
    this.canvasWebglEl.height = this.canvas2dEl.height = window.innerHeight;

    this.stats = new Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
  }

  visualize(stream: MediaStream) {
    this.stream = stream;
    // reuse the analyser whenever switching sounds
    this.audioCtx = this.audioCtx || new AudioContext()
    this.analyser = this.analyser || this.audioCtx.createAnalyser();

    if(this.audioCtx && this.analyser){

      // if(this.source){
      //   this.source.disconnect();
      // }
      // 获取音频源
      this.source = this.audioCtx?.createMediaStreamSource(stream);
      // 将音频源连接解析器
      this.source.connect(this.analyser);

      // 准备数据数组
      // this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      console.log("bufferLength", bufferLength);
      const dataArray = new Uint8Array(bufferLength);


      if(!this.scene && this.currentEffectMode){
        this.toggleEffect(this.currentEffectMode)
      }

      this.scene.init();
      this.scene.drawEachFrame(dataArray);

    }
  }

  stopVisualize() {
    this.scene?.stopVisualize()
  }

  resetCanvas() {
    this.scene.resetCanvas();
  }

  toggleEffect(effectMode: IEffectMode, cb?: () => void) {
    this.currentEffectMode = effectMode

    if(!this.analyser || !this.audioCtx){
      return 
    }
    if(this.scene){
      this.scene.destroy();
    }

    let params = {
      el: effectMode.type === CANVAS_TYPE.CANVAS_2D ? this.canvas2dEl : this.canvasWebglEl,
      analyser: this.analyser,
      audioCtx: this.audioCtx,
      stats: this.stats
    } as ISceneProps


    this.scene = new SceneList[this.currentEffectMode.id - 1](params)

    cb && cb();
  }

}