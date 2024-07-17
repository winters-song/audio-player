import React, { useEffect, useRef, useState } from "react"
import TestScene from "./components/TestScene";


const Page = (props: any) => {
  const elRef = useRef<HTMLCanvasElement>(null);
 
  useEffect(() => {
    const canvas = elRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      new TestScene({
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
