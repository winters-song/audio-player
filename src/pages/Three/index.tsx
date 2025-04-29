import React, { useEffect, useRef, useState } from "react"
// import Scene from "./components/Voxel";
import Scene from "./components/Edges";


const Page = (props: any) => {
  const elRef = useRef<HTMLCanvasElement>(null);
 
  useEffect(() => {
    const canvas = elRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      
      new Scene({
        el: canvas
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={elRef} id="canvas"  />
    </div>
  )
};

export default Page;
