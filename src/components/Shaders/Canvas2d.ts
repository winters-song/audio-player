import CanvasUtils from "../../utils/CanvasUtils"

/* Parameters */
let vertexCount = 10000 * 4
let fontName = 'Arial, Helvetica'
let fontSize = 24

declare global {
  interface Window {
    CanvasUtils: any;
  }
}

export default class Shader {
  private el: HTMLCanvasElement
  private vertices: number[] = []
  private dVertices: number[] = []
  private refctx: CanvasRenderingContext2D|null
  private ctx: CanvasRenderingContext2D|null
  private postctx: CanvasRenderingContext2D|null

  private smoothness = 6

  private textList = [
    'Hey!',
    'I\'m H2x',
    'How are you?',
    'Do you like it?',
    '~~~LanRen~~~',
    ':3'
  ]

  private textIndex = 5

  private frame = 0

  private dotSize = 3

  private timer = 0

  constructor(el: HTMLCanvasElement) {
    this.el = el
    this.refctx = document.createElement('canvas').getContext('2d')
    this.ctx = document.createElement('canvas').getContext('2d')
    this.postctx = this.el.getContext('2d') 

    this.textGeneration()
    this.dVertices = new Array(vertexCount).fill(0)

    window.CanvasUtils = CanvasUtils
  }

  public render() {
    if(!this.postctx || !this.ctx){
      return;
    }

    this.frame++

    // Resizing
    if (this.postctx.canvas.width !== this.postctx.canvas.offsetWidth || this.postctx.canvas.height !== this.postctx.canvas.offsetHeight) {
      this.ctx.canvas.width = this.postctx.canvas.width = this.postctx.canvas.offsetWidth
      this.ctx.canvas.height = this.postctx.canvas.height = this.postctx.canvas.offsetHeight
    }

    let ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let centerX = this.el.width/2;
    let centerY = this.el.height/2;

    for (let i = 0; i < this.vertices.length; i += 4) {
      let x = i
      let y = i + 1
      let z = i + 2
      let v = i + 3

      // Make vertex transition to target vertex
      this.dVertices[x] -= (this.dVertices[x] - this.vertices[x]) / this.smoothness // x
      this.dVertices[y] -= (this.dVertices[y] - this.vertices[y]) / this.smoothness // y
      //this.dVertices[z] -= (this.dVertices[z] - this.vertices[z]) / this.smoothness // z
      this.dVertices[v] -= (this.dVertices[v] - this.vertices[v]) / this.smoothness // alpha

      let realX = this.dVertices[x] * 5 + centerX
      let realY = this.dVertices[y] * 5 + centerY
      let opacity = this.dVertices[v]
      let unitZ = Math.cos(this.frame / 20.0 + realX/20) * Math.sin(this.frame / 10.0 + realY/20) * 0.002  ;
      realX /= (1.0 + unitZ);
      realY /= (1.0 + unitZ);

      // shader part
      ctx.fillStyle = `hsla(${(this.frame + unitZ * 6000.0) % 360}, 100%, 50%, ${opacity})`

      // 绘制方形点
      ctx.fillRect(realX, realY, this.dotSize, this.dotSize);

      // console.log(ctx.fillStyle)
    }

    this.postctx.clearRect(0, 0, this.postctx.canvas.width, this.postctx.canvas.height)
    this.postctx.globalCompositeOperation = 'source-over'
    this.postctx.drawImage(this.ctx.canvas, 0, 0)
    this.postctx.globalCompositeOperation = 'lighten'
    this.postctx.filter = 'blur(4px)'
    this.postctx.drawImage(this.ctx.canvas, 0, 0)
    this.postctx.filter = 'blur(0)'

    this.timer = requestAnimationFrame(() => this.render())
  }

  public stop () {
    cancelAnimationFrame( this.timer )
  }

  private setText(text: string) {
    if(!this.refctx){
      return;
    }
    // Drawing text and resizing canvas
    this.refctx.font = `${fontSize}px ${fontName}`
    this.refctx.canvas.width = this.refctx.measureText(text).width || 100
    this.refctx.canvas.height = fontSize
    this.refctx.font = `${fontSize}px ${fontName}`
    this.refctx.textBaseline = 'top'
    this.refctx.clearRect(0, 0, this.refctx.canvas.width, this.refctx.canvas.height)
    this.refctx.fillStyle = '#fff'
    this.refctx.fillText(text, 0, 0)

    let { data } = this.refctx.getImageData(0, 0, this.refctx.canvas.width, this.refctx.canvas.height)

    this.vertices = new Array(vertexCount).fill(0)
    // 坐标 x: [ -width/2, width/2 ], y: [ -height/2, height/2 ]
    for (let i = 0; i < data.length; i += 4) {
      let x = (i / 4 % this.refctx.canvas.width) - this.refctx.canvas.width / 2
      let y = ((i / 4 / this.refctx.canvas.width >> 0) % this.refctx.canvas.height) - this.refctx.canvas.height / 2
      // let z = 0
      // 红色通道为0则结果为0， 红色通道为255则结果为data[i + 3]
      let v = data[i] ? (data[i + 3] / 255) : 0

      this.vertices[i] = x
      this.vertices[i + 1] = y
      // this.vertices[vertexIndex++] = z
      this.vertices[i + 3] = v
    }
  }

  private textGeneration() {
    this.setText(this.textList[this.textIndex])
    setTimeout(() => {
      this.textIndex++
      if (this.textIndex === this.textList.length) {
        this.textIndex = 0
      }
      this.textGeneration()
    }, 1000)
  }

}
