import WebglUtils from "../../utils/WebglUtils";
import { textF } from "./data";


var translation = [40, 20];
var color = [Math.random(), Math.random(), Math.random(), 1];


interface IProgramInfo {
  program: WebGLProgram
  attribLocations: {
    position: number,
  }
  uniformLocations: {
    resolution: WebGLUniformLocation | null
    translation: WebGLUniformLocation | null
    color: WebGLUniformLocation | null
  }
}


//  x-R (左边0, 右边1),  y-G（下边0, 上边1）
const vsSource = `
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;

void main() {
  vec2 position = a_position + u_translation;
  vec2 zeroToOne = position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

const fsSource = `
precision mediump float;
uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}
`;

export default class Shader1 {
  private el: HTMLCanvasElement
  private gl: WebGLRenderingContext | null

  constructor(el: HTMLCanvasElement) {
    this.el = el
    let gl = this.gl = el.getContext('webgl')
    if (!gl) {
      return
    }

    const program = WebglUtils.createProgramWithSources(gl, vsSource, fsSource)

    const programInfo: IProgramInfo = {
      program,
      attribLocations: {
        position: gl.getAttribLocation(program, "a_position"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(program, "u_resolution"),
        translation: gl.getUniformLocation(program, "u_translation"),
        color: gl.getUniformLocation(program, "u_color"),
      }
    };

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    this.setGeometry(gl);
    

    this.drawScene(gl, programInfo, positionBuffer);
  }

  private drawScene(gl: WebGLRenderingContext, programInfo: IProgramInfo, positionBuffer: WebGLBuffer|null) {
    WebglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // gl.clearColor(0.0, 0.0, 0.0, 0.0); 
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(programInfo.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    this.setPositionAttribute(gl, { position: positionBuffer }, programInfo);

    gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
    gl.uniform4fv(programInfo.uniformLocations.color, color);
    gl.uniform2fv(programInfo.uniformLocations.translation, translation);

    gl.drawArrays(gl.TRIANGLES, 0, 18);

  }

  private setGeometry(gl: WebGLRenderingContext) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textF), gl.STATIC_DRAW);
  }

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  private setPositionAttribute(gl: WebGLRenderingContext, buffers: any, programInfo: any) {
    gl.enableVertexAttribArray(programInfo.attribLocations.positionLocation);
    
    const numComponents = 2; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
  }
}
