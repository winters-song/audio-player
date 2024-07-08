
export default class WebglUtils {

  static compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number) {
    // Create the shader object
    var shader = gl.createShader(shaderType);
    if (!shader) {
      // Something went wrong during compilation; get the error
      throw "could not create shader";
    }
  
    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);
  
    // Compile the shader
    gl.compileShader(shader);
  
    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      // Something went wrong during compilation; get the error
      throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }
  
    return shader;
  }

  static createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    // create a program.
    var program = gl.createProgram();
    if (!program) {
      // Something went wrong during compilation; get the error
      throw "could not create program";
    }
    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
  
    // link the program.
    gl.linkProgram(program);
  
    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      // something went wrong with the link
      throw ("program failed to link:" + gl.getProgramInfoLog(program));
    }
  
    return program;
  }

  static createProgramWithSources(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
    const vertexShader = this.compileShader(gl, vsSource, gl.VERTEX_SHADER );
    const fragmentShader = this.compileShader(gl, fsSource, gl.FRAGMENT_SHADER );
    return this.createProgram(gl, vertexShader, fragmentShader)
  }

  static resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, multiplier?: number) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

}