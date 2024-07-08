import WebglUtils from "../../utils/WebglUtils"




/* Parameters */
let vertexCount = 10000 * 4
let fontName = 'Arial, Helvetica'
let fontSize = 24

let vertexShaderSource = `
  attribute vec4 a_position;
  uniform vec2 u_resolution;
  uniform float u_frame;
  varying vec4 v_position;
  varying float v_frame;
  void main () {
    v_position = a_position;
    v_frame = u_frame;
    v_position.xy /= u_resolution;
    v_position.y *= -1.0;
    
    v_position.xy *= 10.0;
    v_position.z += cos(u_frame / 20.0 + v_position.x * 10.0) * sin(u_frame / 10.0 + v_position.y * 12.0) * 0.02;
    v_position.xy /= (1.0 + v_position.z);
    
    gl_Position = vec4(v_position.xy, 0.0, 1.0);
    gl_PointSize = 3.0;
  }
`

let fragmentShaderSource = `
  precision mediump float;
  varying vec4 v_position;
  varying float v_frame;
  float pi = 3.141592653589793;
  float hue2rgb(float f1, float f2, float hue) {
      if (hue < 0.0)
          hue += 1.0;
      else if (hue > 1.0)
          hue -= 1.0;
      float res;
      if ((6.0 * hue) < 1.0)
          res = f1 + (f2 - f1) * 6.0 * hue;
      else if ((2.0 * hue) < 1.0)
          res = f2;
      else if ((3.0 * hue) < 2.0)
          res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
      else
          res = f1;
      return res;
  }

  vec3 hsl2rgb(vec3 hsl) {
      vec3 rgb;
      
      hsl.x = mod(hsl.x, 360.0);
      hsl.x /= 360.0;

      if (hsl.y == 0.0) {
          rgb = vec3(hsl.z); // Luminance
      } else {
          float f2;

          if (hsl.z < 0.5)
              f2 = hsl.z * (1.0 + hsl.y);
          else
              f2 = hsl.z + hsl.y - hsl.y * hsl.z;

          float f1 = 2.0 * hsl.z - f2;

          rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
          rgb.g = hue2rgb(f1, f2, hsl.x);
          rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
      }   
      return rgb;
  }
  
  void main () {
    vec4 col = vec4(hsl2rgb(vec3(v_frame + v_position.z * 2000.0, 1.0, .5)) * v_position.w, 1.0);
    gl_FragColor = col;
  }
`

export default class Shader {
  private el: HTMLCanvasElement
  private vertices: number[] = []
  private dVertices: number[] = []
  private refctx: CanvasRenderingContext2D|null
  private gl: WebGLRenderingContext
  private postctx: CanvasRenderingContext2D|null
  private canvas: HTMLCanvasElement | OffscreenCanvas

  private uResolution: WebGLUniformLocation|null
  private uFrame: WebGLUniformLocation|null
  private aPosition: number

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

  private timer = 0

  constructor(el: HTMLCanvasElement) {
    this.el = el
    this.refctx = document.createElement('canvas').getContext('2d')
    this.gl = document.createElement('canvas').getContext('webgl') as WebGLRenderingContext
    this.postctx = this.el.getContext('2d') 
    this.canvas = this.gl.canvas

    this.textGeneration()
    this.dVertices = new Array(vertexCount).fill(0)

    let program = WebglUtils.createProgramWithSources(this.gl, vertexShaderSource, fragmentShaderSource)

    this.aPosition = this.gl.getAttribLocation(program, 'a_position')
    this.uResolution = this.gl.getUniformLocation(program, 'u_resolution')
    this.uFrame = this.gl.getUniformLocation(program, 'u_frame') 

    let vertexBuffer = this.gl.createBuffer()

    this.gl.useProgram(program)
    this.gl.clearColor(0, 0, 0, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)

    this.gl.vertexAttribPointer(this.gl.getAttribLocation(program, 'a_position'), 4, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(this.aPosition)
  }

  public render() {
    if(!this.postctx){
      return;
    }

    this.frame++
    this.gl.uniform1f(this.uFrame, this.frame)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    // Resizing
    if (this.postctx.canvas.width !== this.postctx.canvas.offsetWidth || this.postctx.canvas.height !== this.postctx.canvas.offsetHeight) {
      this.canvas.width = this.postctx.canvas.width = this.postctx.canvas.offsetWidth
      this.canvas.height = this.postctx.canvas.height = this.postctx.canvas.offsetHeight
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
      this.gl.uniform2fv(this.uResolution, [this.canvas.width, this.canvas.height])
    }

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
    }
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.dVertices), this.gl.STATIC_DRAW)
    this.gl.drawArrays(this.gl.POINTS, 0, this.dVertices.length / 4)

    this.postctx.globalAlpha = 0.1
    this.postctx.globalCompositeOperation = 'source-over'
    this.postctx.drawImage(this.canvas, 0, 0)
    this.postctx.globalCompositeOperation = 'lighten'
    this.postctx.globalAlpha = 1
    this.postctx.filter = 'blur(8px)'
    this.postctx.drawImage(this.canvas, 0, 0)
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
