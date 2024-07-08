import React, { useEffect, useRef, useState } from "react"
// import Shader from '../../components/Shaders/Shader1';
// import Shader from '../../components/Shaders/Canvas2d';
// import Shader from '../../scene/Pixel/Pixel';
import Shader from "./Shader"


const Page = (props: any) => {
  const elRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const shaderRef = useRef<any>(null);
  useEffect(() => {
    const canvas = elRef.current;
    if (canvas) {
      // canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight;

      setTimeout(() => {
        let shader = new Shader(canvas);
        shaderRef.current = shader;
        shader.render();
      }, 1000)
    }
  }, []);

  const togglePlay = (isPlaying: boolean) => {
    if (isPlaying) {
      shaderRef.current.stop();
    } else {
      shaderRef.current.render();
    }
    setIsPlaying(!isPlaying);
  }


  return (
    <div>
      <canvas ref={elRef} id="canvas" onClick={() => togglePlay(isPlaying)}/>
    </div>
  )
};

export default Page;
