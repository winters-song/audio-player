import { ISceneProps } from "../../models/common"
import Bar2D from "../../scene/Bar2D/Bar2D"
import Pixel from "../../scene/Pixel/Pixel"
// import TestScene from "../../scene/Test/TestScene"


const SceneList = [
  Bar2D,
  Pixel
]

export default class SceneMgr {

  el: HTMLCanvasElement | null = null

  audioCtx: AudioContext | null = null

  analyser: AnalyserNode | null = null

  scene: any = null

  stats: any = null

  source: MediaStreamAudioSourceNode | null = null

  stream: MediaStream | null = null

  //  ['Bar', 'Pixel', 'Ring']
  currentEffectMode = 0

  constructor(selector: string) {
    this.el = document.querySelector(selector);
    if (!this.el) {
      throw new Error('找不到 canvas');
    }
    this.el.width = window.innerWidth;    
    this.el.height = window.innerHeight;


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
      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      console.log("bufferLength", bufferLength);
      const dataArray = new Uint8Array(bufferLength);


      if(!this.scene){
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

  toggleEffect(effectMode: number) {
    this.currentEffectMode = effectMode

    if(!this.analyser || !this.audioCtx){
      return 
    }
    if(this.scene){
      this.scene.stopVisualize();
    }

    let params = {
      el: this.el,
      analyser: this.analyser,
      audioCtx: this.audioCtx,
      stats: this.stats
    } as ISceneProps


    this.scene = new SceneList[this.currentEffectMode](params)

    if(this.stream){
      this.visualize(this.stream)
    }
  }

}