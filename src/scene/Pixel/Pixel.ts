import { ISceneProps } from "../../models/common"
import BaseScene from "../Base/BaseScene"

/**
 * use virtual canvas to draw rectangles
 * use output canvas to add blur (glow) effects
 */
export default class Pixel extends BaseScene {
  
  ctx: CanvasRenderingContext2D | null
  postctx: CanvasRenderingContext2D | null

  frame = 0

  frameTimer = 0

  dataLength = 60

  dataOffset = 5

  gap = 6

  constructor(params: ISceneProps) {
    super(params)

    this.ctx = document.createElement('canvas').getContext('2d')
    if (!this.el) {
      this.postctx = null;
      return;
    }
    this.postctx = this.el.getContext('2d')
  }

  init() { 
    if(!this.el) return
    if(this.inited){
      return;
    }
    this.inited = true
    
    const resizeHandler = () => {
      if (!this.el) {
        return;
      }
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.el.width = width;
      this.el.height = height;
      console.log('do resize')
    };
    window.addEventListener('resize', resizeHandler);

    this.removeResizeEvent = () => {
      window.removeEventListener('resize', resizeHandler);
    }

  }

  stopVisualize() {
    if (this.frameTimer) {
      window.cancelAnimationFrame(this.frameTimer);
      this.frameTimer = 0
      this.frame = 0
      this.resetCanvas();
    }
  }

  resetCanvas() {
    if (this.el) {
      this.clearCanvas();
    }
  }

  clearCanvas() {
    if (!this.postctx) {
      return
    }
    this.postctx.clearRect(0, 0, this.postctx.canvas.width, this.postctx.canvas.height)
  }

  draw(dataArray: Uint8Array) {
    if (!this.el || !this.postctx || !this.ctx) {
      return;
    }
    this.frame++

    // Resizing
    this.ctx.canvas.width = this.postctx.canvas.width = this.el.width
    this.ctx.canvas.height = this.postctx.canvas.height = this.el.height

    let ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let unitWidth = this.el.width / this.dataLength
    let startX = this.gap
    let startY = this.el.height * 0.8
    let dotWidth = unitWidth - this.gap

    const bars = dataArray.slice(this.dataOffset, Math.min(this.dataLength, dataArray.length) + this.dataOffset);

    for (let i = 0; i < this.dataLength; i++) {

      if (!bars[i]) {
        continue;
      }
      let count = bars[i] >> 3

      let realX = startX + i * unitWidth
      // shader part
      ctx.fillStyle = `hsl(${(this.frame * 0.5 + i * 2) % 360}, 100%, 50%)`

      for (let j = 0; j < count; j++) {
        let realY = startY - j * unitWidth
        // 绘制方形点
        // ctx.fillRect(realX, realY, dotWidth, dotWidth);
        ctx.beginPath();
        ctx.roundRect(realX, realY, dotWidth, dotWidth, 3);
        ctx.fill();
      }
    }

    this.postctx.clearRect(0, 0, this.postctx.canvas.width, this.postctx.canvas.height)
    this.postctx.globalCompositeOperation = 'source-over'
    this.postctx.drawImage(this.ctx.canvas, 0, 0)
    this.postctx.globalCompositeOperation = 'lighten'
    this.postctx.filter = 'blur(4px)'
    this.postctx.drawImage(this.ctx.canvas, 0, 0)
    this.postctx.filter = 'blur(0)'
    this.postctx.globalCompositeOperation = 'source-over'

  }

  drawEachFrame(dataArray: Uint8Array) {
    if (!this.el || !this.postctx || !this.ctx) {
      return;
    }

    this.frameTimer = requestAnimationFrame(() => {
      this.stats.begin();
      this.drawEachFrame(dataArray)
      this.stats.end();
    })

    if (this.analyser) {
      // 读取数据
      this.analyser.getByteFrequencyData(dataArray);
      this.draw(dataArray)
    }
  }

}
