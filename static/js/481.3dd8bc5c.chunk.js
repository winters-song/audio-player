"use strict";(self.webpackChunkaudio_player=self.webpackChunkaudio_player||[]).push([[481],{2370:(t,n,e)=>{e.r(n),e.d(n,{default:()=>X});var i,s=e(5043),a=e(7528),l=e(5458);const r="#f0f0f0",o=l.A.div(i||(i=(0,a.A)(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n\n  .audio-player {\n    padding: 0 20px;\n    height: 80px;\n    background-image: linear-gradient(180deg, #00000000 0%, #00000080 100%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: ",";\n  }\n\n  .progress-bar{\n    position: absolute;\n    top: -4px;\n    left: 20px;\n    right: 20px;\n\n    .ant-slider{\n      margin: 0;\n\n      .ant-slider-rail {\n        background-color: rgba(255, 255, 255, 0.3);\n        /* background-color: white;\n        box-shadow: 0 0 12px 0px rgb(255 255 255), 0 0 12px 3px rgb(0 210 255), 0 0 20px 0px rgb(0 179 255), 0 0 40px 10px rgb(0 155 255), 0 0 60px 20px rgb(0 155 255); */\n      }\n\n      .ant-slider-track{\n        background-color: ",";\n      }\n    }\n  }\n\n  .center-bar{\n    width: 240px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-around;\n    z-index: 2;\n    \n    .play-btn{\n      width: 44px;\n      height: 44px;\n      border: 2px solid ","; \n      border-radius: 50%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer;\n      svg{\n        width: 30px;\n        height: 30px;\n      }\n\n      .icon-play{\n        position: relative;\n        left: 1px;\n      }\n    }\n\n    .pager-btn{\n      width: 44px;\n      height: 44px;\n      border-radius: 50%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer;\n      svg{\n        width: 30px;\n        height: 30px;\n      }\n    }\n  }\n\n  .left-bar{\n    position: absolute;\n    left: 20px;\n    text-align: left;\n    display: flex;\n    flex-direction: row;\n\n    .cover{\n      width: 44px;\n      height: 44px;\n      border-radius: 4px;\n      background-size: contain;\n      margin-right: 10px;\n    }\n    .col{\n      display: flex;\n      flex-direction: column;\n    }\n\n    .name{\n      width: 200px;\n      color: white;\n    }\n    \n    .time{\n      margin-top: 5px;\n      color: #ffffff80;\n      font-size: 14px;\n    }\n  }\n\n  .right-bar{\n    position: absolute;\n    right: 20px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    column-gap: 20px;\n\n    .btn{\n      width: 44px;\n      height: 44px;\n      border-radius: 50%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer;\n      svg{\n        width: 30px;\n        height: 30px;\n      }\n    }\n\n    .list-btn{\n      svg{\n        width: 28px;\n        height: 28px;\n        position: relative;\n        top: -1px;\n      }\n    }\n\n    .volume-wrapper{\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n\n      .volume-slider{\n        width: 100px;\n\n        .ant-slider-rail {\n          background-color: rgb(255, 255, 255, 0.1);\n        }\n\n        .ant-slider-track{\n          background-color: ",";\n        }\n      }\n    }\n  }\n  \n"])),r,r,r,r);var c=e(5681),h=e(3640),d=e(579);const p=()=>(0,d.jsx)("svg",{className:"icon icon-play",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z"})}),x=()=>(0,d.jsx)("svg",{className:"icon icon-pause",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M341.332992 142.222336c47.128576 0 85.334016 38.20544 85.334016 85.332992v568.889344c0 47.128576-38.20544 85.332992-85.334016 85.332992-47.127552 0-85.332992-38.20544-85.332992-85.332992V227.555328c0-47.128576 38.20544-85.332992 85.332992-85.332992z m341.334016 0c47.127552 0 85.332992 38.20544 85.332992 85.332992v568.889344c0 47.128576-38.20544 85.332992-85.332992 85.332992-47.128576 0-85.334016-38.20544-85.334016-85.332992V227.555328c0-47.128576 38.20544-85.332992 85.334016-85.332992z"})}),u=()=>(0,d.jsx)("svg",{className:"icon icon-prev",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M341.333333 746.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-469.333334a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333zM768 280.32a32.853333 32.853333 0 0 0-15.786667-27.733333l-5.12-2.56a31.146667 31.146667 0 0 0-34.133333 0l-314.453333 222.293333a32 32 0 0 0-13.653334 26.026667v26.453333a32 32 0 0 0 13.653334 26.026667l314.453333 221.013333a31.146667 31.146667 0 0 0 34.133333 0l5.12-2.56a32.426667 32.426667 0 0 0 15.786667-27.733333z"})}),m=()=>(0,d.jsx)("svg",{className:"icon icon-next",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M768 277.333333v469.333334a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-469.333334a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333zM311.04 251.733333a31.146667 31.146667 0 0 0-34.133333 0l-5.12 2.56a32.426667 32.426667 0 0 0-15.786667 26.026667v462.933333a32.853333 32.853333 0 0 0 15.786667 27.733334l5.12 2.56a32 32 0 0 0 34.133333 0l314.453333-221.013334a32 32 0 0 0 13.653334-26.026666v-26.453334a32 32 0 0 0-13.653334-26.026666z"})}),f=()=>(0,d.jsx)("svg",{className:"icon icon-volume",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M462.06 142.1L284.12 320H80c-26.52 0-48 21.48-48 48v288c0 26.5 21.48 48 48 48h204.12l177.94 177.9c30.06 30.06 81.94 8.94 81.94-33.94V176.04c0-42.92-51.92-63.96-81.94-33.94zM992 512c0-127.06-64.12-243.88-171.54-312.48-22.38-14.28-52.06-7.64-66.24 14.92s-7.56 52.42 14.82 66.72C848.54 331.94 896 418.22 896 512s-47.46 180.06-126.96 230.84c-22.38 14.28-29 44.14-14.82 66.72 13.02 20.72 42.24 30.28 66.24 14.92C927.88 755.88 992 639.06 992 512z m-283.54-153.74c-23.16-12.66-52.38-4.32-65.22 18.9-12.78 23.22-4.32 52.4 18.9 65.22C687.96 456.56 704 483.26 704 512c0 28.76-16.04 55.44-41.84 69.62-23.22 12.82-31.68 42-18.9 65.22 12.86 23.32 42.1 31.6 65.22 18.9 56.46-31.1 91.54-90 91.54-153.76s-35.08-122.64-91.56-153.72z"})}),v=()=>(0,d.jsx)("svg",{className:"icon icon-volume-mute",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M430.06 142.1L252.12 320H48c-26.52 0-48 21.48-48 48v288c0 26.5 21.48 48 48 48h204.12l177.94 177.9c30.06 30.06 81.94 8.94 81.94-33.94V176.04c0-42.92-51.92-63.96-81.94-33.94zM923.28 512l91.28-91.28c12.6-12.6 12.6-33.04 0-45.64l-45.64-45.64c-12.6-12.6-33.04-12.6-45.64 0L832 420.72l-91.28-91.28c-12.6-12.6-33.04-12.6-45.64 0l-45.64 45.64c-12.6 12.6-12.6 33.04 0 45.64L740.72 512l-91.26 91.26c-12.6 12.6-12.6 33.04 0 45.64l45.64 45.64c12.6 12.6 33.04 12.6 45.64 0L832 603.28l91.28 91.28c12.6 12.6 33.04 12.6 45.64 0l45.64-45.64c12.6-12.6 12.6-33.04 0-45.64L923.28 512z"})}),g=()=>(0,d.jsx)("svg",{className:"icon icon-fullscreen",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M213.333333 213.333333h213.333334V128H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v256h85.333333V213.333333zM170.666667 896h256v-85.333333H213.333333v-213.333334H128v256a42.666667 42.666667 0 0 0 42.666667 42.666667z m725.333333-42.666667v-256h-85.333333v213.333334h-213.333334v85.333333h256a42.666667 42.666667 0 0 0 42.666667-42.666667zM597.333333 213.333333h213.333334v213.333334h85.333333V170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-256v85.333333z","p-id":"10477"})}),w=()=>(0,d.jsx)("svg",{className:"icon icon-play-list",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M90.35039205 899.00880511h843.2992159a22.19208431 22.19208431 0 0 0 22.19208552-22.19208553v-44.38416861a22.19208431 22.19208431 0 0 0-22.19208552-22.19208552H90.35039205a22.19208431 22.19208431 0 0 0-22.19208552 22.19208552v44.38416861a22.19208431 22.19208431 0 0 0 22.19208552 22.19208553z m0-310.68918518h843.2992159a22.19208431 22.19208431 0 0 0 22.19208552-22.19208553v-44.38416862a22.19208431 22.19208431 0 0 0-22.19208552-22.19208552H90.35039205a22.19208431 22.19208431 0 0 0-22.19208552 22.19208552v44.38416862a22.19208431 22.19208431 0 0 0 22.19208552 22.19208553z m355.07335381-310.68918519a22.19208431 22.19208431 0 0 1-22.19208431-22.19208552v-44.38416862a22.19208431 22.19208431 0 0 1 22.19208431-22.19208553h488.22586209a22.19208431 22.19208431 0 0 1 22.19208552 22.19208553v44.38416862a22.19208431 22.19208431 0 0 1-22.19208552 22.19208552H445.42374586zM68.15830653 123.04037267a35.50733563 35.50733563 0 0 1 53.12785066-30.82480541l203.61237724 116.35309985a35.50733563 35.50733563 0 0 1 0 61.64961083l-203.61237724 116.35309985A35.50733563 35.50733563 0 0 1 68.15830653 355.74657238V123.04037267z"})}),b=()=>(0,d.jsx)("svg",{className:"icon icon-loop",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M694.4 854.4H195.2l48 44.8c9.6 6.4 16 16 16 28.8-3.2 19.2-19.2 32-38.4 32-9.6 0-22.4-6.4-28.8-12.8l-108.8-96c-12.8-12.8-16-35.2 0-48L192 704c6.4-6.4 19.2-9.6 28.8-9.6 19.2 0 35.2 16 35.2 35.2 0 9.6-6.4 19.2-12.8 25.6l-41.6 38.4h496c112 0 198.4-89.6 198.4-198.4v-86.4c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 140.8-118.4 259.2-265.6 259.2zM329.6 169.6h496l-48-44.8c-9.6-6.4-16-16-16-28.8 3.2-19.2 19.2-32 38.4-32 9.6 0 22.4 6.4 28.8 12.8l108.8 96c12.8 12.8 16 35.2 0 48L832 320c-6.4 6.4-19.2 9.6-28.8 9.6-19.2 0-35.2-16-35.2-35.2 0-9.6 6.4-19.2 12.8-25.6l41.6-38.4H326.4C217.6 233.6 128 323.2 128 435.2v89.6c0 19.2-12.8 32-32 32s-32-12.8-32-32v-86.4C64 288 182.4 169.6 329.6 169.6z","p-id":"2716"})}),j=()=>(0,d.jsxs)("svg",{className:"icon icon-single-cycle",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:[(0,d.jsx)("path",{d:"M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z","p-id":"6501"}),(0,d.jsx)("path",{d:"M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z","p-id":"6502"})]}),y=()=>(0,d.jsx)("svg",{className:"icon icon-single-cycle",viewBox:"0 0 1024 1024",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",children:(0,d.jsx)("path",{d:"M844.8 665.6c-6.4-6.4-16-12.8-25.6-9.6-19.2 0-35.2 16-35.2 35.2 0 9.6 6.4 19.2 12.8 25.6l41.6 41.6c-44.8-6.4-86.4-22.4-121.6-51.2-3.2 0-3.2-3.2-6.4-6.4L332.8 304C268.8 233.6 192 195.2 99.2 195.2c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32c73.6 0 134.4 32 182.4 86.4l384 400 6.4 6.4c48 38.4 108.8 64 172.8 70.4l-48 44.8c-9.6 6.4-16 19.2-16 28.8 0 19.2 19.2 35.2 38.4 32 9.6 0 19.2-6.4 25.6-12.8l99.2-92.8c16-16 16-41.6 0-57.6l-99.2-102.4z m-3.2-556.8c-12.8-16-32-19.2-48-6.4-9.6 6.4-12.8 16-12.8 25.6 0 12.8 3.2 22.4 16 28.8l41.6 41.6c-73.6 9.6-140.8 38.4-192 89.6l-115.2 118.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 16 9.6 25.6 9.6s19.2-3.2 25.6-9.6l112-118.4c41.6-38.4 92.8-64 147.2-70.4l-44.8 44.8c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 32 35.2 9.6 0 19.2-3.2 28.8-9.6L950.4 256c12.8-12.8 12.8-35.2 0-48l-108.8-99.2m-438.4 448c-9.6 0-19.2 3.2-25.6 9.6l-118.4 121.6c-48 44.8-96 67.2-160 67.2H96c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32h3.2c83.2 0 147.2-32 211.2-86.4l121.6-124.8c6.4-6.4 9.6-12.8 9.6-22.4 0-9.6-3.2-16-9.6-22.4-9.6-6.4-19.2-9.6-28.8-9.6z","p-id":"2884"})});var C=e(3003),N=e(6151);const k=[class{constructor(t){this.el=null,this.audioCtx=null,this.analyser=null,this.frameTimer=0,this.dataLength=50,this.floats=[],this.FLOAT_HEIGHT=4,this.DROP_DISTANCE=1,this.BAR_GAP=2,this.stats=void 0,Object.assign(this,t)}init(){}stopVisualize(){this.frameTimer&&(window.cancelAnimationFrame(this.frameTimer),this.frameTimer=0,this.resetCanvas())}resetCanvas(){if(this.el){const t=new Uint8Array(this.dataLength).map((()=>0));this.clearFloats(),this.clearCanvas(),this.drawFloats(t)}}drawEachFrame(t){if(this.frameTimer=requestAnimationFrame((()=>{this.drawEachFrame(t)})),this.analyser){this.analyser.getByteFrequencyData(t);const n=t.slice(0,Math.min(this.dataLength,t.length));this.clearCanvas(),this.drawFloats(n),this.drawBars(n)}}clearFloats(){this.floats=[]}clearCanvas(){if(!this.el)return;const t=this.el.width,n=this.el.height,e=this.el.getContext("2d");e&&(e.fillStyle="#222222",e.fillRect(0,0,t,n))}drawFloats(t){if(!this.el)return;const n=this.el.width,e=this.el.height,i=this.el.getContext("2d");if(!i)return;t.forEach(((t,n)=>{this.floats[n]=this.floats[n]||this.FLOAT_HEIGHT;const e=t+this.FLOAT_HEIGHT,i=this.floats[n]-this.DROP_DISTANCE;this.floats[n]=Math.max(i,e)}));const s=n/t.length-this.BAR_GAP;let a=0;this.floats.forEach((t=>{const n=t/128*e/2;i.fillStyle="#bbb",i.fillRect(a,e-n,s,this.FLOAT_HEIGHT),a+=s+this.BAR_GAP}))}drawBars(t){if(!this.el)return;const n=this.el.width,e=this.el.height,i=this.el.getContext("2d");if(!i)return;const s=n/t.length-this.BAR_GAP;let a=0;t.forEach((t=>{const l=t/128*e/2,r=i.createLinearGradient(n/2,0,n/2,e);r.addColorStop(0,"red"),r.addColorStop(.5,"yellow"),r.addColorStop(1,"green"),i.fillStyle=r,i.fillRect(a,e-l,s,l),a+=s+this.BAR_GAP}))}},class{constructor(t){this.el=null,this.audioCtx=null,this.analyser=null,this.ctx=void 0,this.postctx=void 0,this.frame=0,this.frameTimer=0,this.dataLength=60,this.dataOffset=5,this.gap=6,this.stats=void 0,Object.assign(this,t),this.ctx=document.createElement("canvas").getContext("2d"),this.el?this.postctx=this.el.getContext("2d"):this.postctx=null}init(){}stopVisualize(){this.frameTimer&&(window.cancelAnimationFrame(this.frameTimer),this.frameTimer=0,this.frame=0,this.resetCanvas())}resetCanvas(){this.el&&this.clearCanvas()}clearCanvas(){this.postctx&&this.postctx.clearRect(0,0,this.postctx.canvas.width,this.postctx.canvas.height)}draw(t){if(!this.el||!this.postctx||!this.ctx)return;this.frame++,this.ctx.canvas.width=this.postctx.canvas.width=this.el.width,this.ctx.canvas.height=this.postctx.canvas.height=this.el.height;let n=this.ctx;n.clearRect(0,0,n.canvas.width,n.canvas.height);let e=this.el.width/this.dataLength,i=this.gap,s=.8*this.el.height,a=e-this.gap;const l=t.slice(this.dataOffset,Math.min(this.dataLength,t.length)+this.dataOffset);for(let r=0;r<this.dataLength;r++){if(!l[r])continue;let t=l[r]>>3,o=i+r*e;n.fillStyle="hsl(".concat((.5*this.frame+2*r)%360,", 100%, 50%)");for(let i=0;i<t;i++){let t=s-i*e;n.beginPath(),n.roundRect(o,t,a,a,3),n.fill()}}this.postctx.clearRect(0,0,this.postctx.canvas.width,this.postctx.canvas.height),this.postctx.globalCompositeOperation="source-over",this.postctx.drawImage(this.ctx.canvas,0,0),this.postctx.globalCompositeOperation="lighten",this.postctx.filter="blur(4px)",this.postctx.drawImage(this.ctx.canvas,0,0),this.postctx.filter="blur(0)",this.postctx.globalCompositeOperation="source-over"}drawEachFrame(t){this.el&&this.postctx&&this.ctx&&(this.analyser&&(this.analyser.getByteFrequencyData(t),this.draw(t)),this.frameTimer=requestAnimationFrame((()=>this.drawEachFrame(t))))}}];class A{constructor(t){if(this.el=null,this.audioCtx=null,this.analyser=null,this.scene=null,this.stats=null,this.source=null,this.stream=null,this.currentEffectMode=0,this.el=document.querySelector(t),!this.el)throw new Error("\u627e\u4e0d\u5230 canvas");this.el.width=window.innerWidth,this.el.height=window.innerHeight}visualize(t){if(this.stream=t,this.audioCtx=this.audioCtx||new AudioContext,this.analyser=this.analyser||this.audioCtx.createAnalyser(),this.audioCtx&&this.analyser){var n;this.source=null===(n=this.audioCtx)||void 0===n?void 0:n.createMediaStreamSource(t),this.source.connect(this.analyser),this.analyser.fftSize=256;const e=this.analyser.frequencyBinCount;console.log("bufferLength",e);const i=new Uint8Array(e);this.scene||this.toggleEffect(this.currentEffectMode),this.scene.init(),this.scene.drawEachFrame(i)}}stopVisualize(){var t;null===(t=this.scene)||void 0===t||t.stopVisualize()}resetCanvas(){this.scene.resetCanvas()}toggleEffect(t){if(this.currentEffectMode=t,!this.analyser||!this.audioCtx)return;this.scene&&this.scene.stopVisualize();let n={el:this.el,analyser:this.analyser,audioCtx:this.audioCtx,stats:this.stats};this.scene=new k[this.currentEffectMode](n),this.stream&&this.visualize(this.stream)}}const z=e(1036),L=t=>{const n=Math.floor(t/3600),e=Math.floor(t%3600/60),i=Math.floor(t%60);return[n>0?n.toString().padStart(2,"0"):"",e.toString().padStart(2,"0"),i.toString().padStart(2,"0")].filter((t=>""!==t)).join(":")},M=t=>new Promise(((n,e)=>{z.read(t,{onSuccess:function(t){console.log(t);var e=t.tags.picture;if(e){var i="";for(let t=0;t<e.data.length;t++)i+=String.fromCharCode(e.data[t]);var s="data:"+e.format+";base64,"+btoa(i);n({title:t.tags.title,artist:t.tags.artist,cover:s})}},onError:function(t){console.error(t),e(t)}})}));var E=e(3536);const O=e.p+"static/media/\u85ac\u5e2b\u5bfa\u5bdb\u90a6,\u30ad\u30c3\u30b5\u30b3 - \u547c\u5438.1e7ad4a18e7509fbced4.mp3";let S=function(t){return t[t.LOOP=0]="LOOP",t[t.SINGLE=1]="SINGLE",t[t.RANDOM=2]="RANDOM",t}({});const{Text:R}=c.A,T=()=>{const t=(0,s.useRef)(null),[n,e]=(0,s.useState)(!1),[i,a]=(0,s.useState)(0),[l,r]=(0,s.useState)(Number(localStorage.getItem("volume"))||.5),[c,k]=(0,s.useState)(0),z=(0,C.wA)(),T=(0,C.d4)((t=>t.common.playList)),H=(0,C.d4)((t=>t.common.randomPlayList)),P=(0,C.d4)((t=>t.common.currentItem)),B=(0,C.d4)((t=>t.common.playListVisible)),F=(0,C.d4)((t=>t.common.playMode)),V=(0,C.d4)((t=>t.common.effectMode)),I=(0,s.useRef)(l),D=(0,s.useRef)(!1),_=(0,s.useRef)(),G=async()=>{var n,e,i;null===(n=_.current)||void 0===n||n.stopVisualize(),await(null===(e=t.current)||void 0===e?void 0:e.play());const s=t.current.captureStream();null===(i=_.current)||void 0===i||i.visualize(s)},q=async()=>{var n,e;null===(n=t.current)||void 0===n||n.pause(),null===(e=_.current)||void 0===e||e.stopVisualize()},U=n=>{t.current&&(t.current.volume=n,r(n),n&&(I.current=n,localStorage.setItem("volume",n.toString())))},Y=()=>{const t=F===S.RANDOM?H:T,n=t.findIndex((t=>t.url===(null===P||void 0===P?void 0:P.url)));n<t.length-1?z((0,N.Oj)(t[n+1])):z((0,N.Oj)(t[0]))};return(0,s.useEffect)((()=>{D.current&&(P?(G(),e(!0)):(q(),e(!1)))}),[P]),(0,s.useEffect)((()=>{(async t=>new Promise(((n,e)=>{fetch(t).then((t=>(t.ok||e("Network response was not ok"),t.blob()))).then((async t=>{const e=URL.createObjectURL(t),i=await M(t);n({name:"Unknown",url:e,...i})}))})))(O).then((t=>{z((0,N.Y6)([...T,t])),z((0,N.Oj)(t))})),_.current=new A("canvas"),setTimeout((()=>{D.current=!0}),1e3)}),[]),(0,s.useEffect)((()=>{F===S.RANDOM&&z((0,N.X5)((0,E.shuffle)([...T])))}),[T,F]),(0,s.useEffect)((()=>{var t;void 0!==V&&(null===(t=_.current)||void 0===t||t.toggleEffect(V))}),[V]),(0,d.jsxs)(o,{children:[(0,d.jsx)("audio",{ref:t,src:null===P||void 0===P?void 0:P.url,onTimeUpdate:()=>{t.current&&(a(t.current.currentTime),k(t.current.duration))},onEnded:()=>{t.current&&(F===S.SINGLE?(t.current.currentTime=0,G()):Y())}}),(0,d.jsxs)("div",{className:"audio-player",children:[(0,d.jsx)("div",{className:"progress-bar",children:(0,d.jsx)(h.A,{min:0,max:c,step:.1,value:i,onChange:n=>{t.current&&(t.current.currentTime=n)}})}),(0,d.jsxs)("div",{className:"left-bar",children:[(0,d.jsx)("div",{className:"cover",style:{backgroundImage:"url(".concat(null===P||void 0===P?void 0:P.cover,")")}}),(0,d.jsxs)("div",{className:"col",children:[(0,d.jsx)(R,{className:"name",ellipsis:!0,children:null!==P&&void 0!==P&&P.title?"".concat(null===P||void 0===P?void 0:P.title," - ").concat(null===P||void 0===P?void 0:P.artist):null===P||void 0===P?void 0:P.name}),(0,d.jsxs)("div",{className:"time",children:[L(i)," / ",L(c)]})]})]}),(0,d.jsxs)("div",{className:"center-bar",children:[(0,d.jsx)("div",{className:"pager-btn prev-btn",onClick:()=>{const t=F===S.RANDOM?H:T,n=t.findIndex((t=>t.url===(null===P||void 0===P?void 0:P.url)));z(n>0?(0,N.Oj)(t[n-1]):(0,N.Oj)(t[t.length-1]))},children:(0,d.jsx)(u,{})}),(0,d.jsx)("div",{className:"play-btn",onClick:()=>{P&&t.current&&(n?q():G(),e(!n))},children:n?(0,d.jsx)(x,{}):(0,d.jsx)(p,{})}),(0,d.jsx)("div",{className:"pager-btn next-btn",onClick:Y,children:(0,d.jsx)(m,{})})]}),(0,d.jsxs)("div",{className:"right-bar",children:[(0,d.jsxs)("div",{className:"volume-wrapper",children:[(0,d.jsx)("div",{className:"btn volume-btn",onClick:()=>U(l?0:I.current),children:0===l?(0,d.jsx)(v,{}):(0,d.jsx)(f,{})}),(0,d.jsx)(h.A,{className:"volume-slider",min:0,max:1,step:.01,value:l,onChange:U})]}),(0,d.jsxs)("div",{className:"btn mode-btn",onClick:()=>(t=>{const n=(t+1)%3;z((0,N.Zk)(n))})(F),children:[F===S.LOOP&&(0,d.jsx)(b,{}),F===S.SINGLE&&(0,d.jsx)(j,{}),F===S.RANDOM&&(0,d.jsx)(y,{})]}),(0,d.jsx)("div",{className:"btn list-btn",onClick:()=>z((0,N.sJ)(!B)),children:(0,d.jsx)(w,{})}),(0,d.jsx)("div",{className:"btn fullscreen-btn",onClick:()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},children:(0,d.jsx)(g,{})})]})]})]})};var H,P;const B=(0,e(909).AH)(H||(H=(0,a.A)(["\n  ::-webkit-scrollbar-track-piece{\n    background-color: rgba(255, 255, 255, 0.3);\n    -webkit-border-radius:5px;\n  }\n  ::-webkit-scrollbar{\n    width: 4px;\n    height: 4px;\n  }\n  ::-webkit-scrollbar-thumb:vertical{\n    height:18px;\n    background-color: white;\n    -webkit-border-radius: 8px;\n    outline-offset:-2px;\n  }\n\n  ::-webkit-scrollbar-thumb:horizontal{\n    width: 18px;\n    background-color: #ccc;\n    -webkit-border-radius: 8px;\n  }\n\n  ::-webkit-scrollbar-thumb:hover{\n    height:18px;\n    background-color:#aaa;\n    -webkit-border-radius: 8px;\n  }\n"]))),F=l.A.div(P||(P=(0,a.A)(["\n  position: absolute;\n  right: 20px;\n  top: 50px;\n  bottom: 100px;\n  width: 300px;\n  background-color: rgba(0,0,0,0.4);\n  border-radius: 20px;\n\n  color: #f0f0f0;\n\n  .header{\n    padding: 0 15px;\n    text-align: left;\n    font-weight: 600;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    height: 50px;\n\n    .add-btn{\n      width: 30px;\n      height: 24px;\n      line-height: 22px;\n      text-align: center;\n      border-radius: 5px;\n      border: 1px solid #999;\n      font-size: 24px;\n      font-weight: 400;\n      color: #999;\n      cursor: pointer;\n    }\n  }\n\n  .body{\n    position: absolute;\n    top: 50px;\n    left: 0;\n    right: 0;\n    bottom: 50px;\n    overflow: auto;\n\n    ",";\n  }\n\n  .list-item{\n    background-color: #ffffff05;\n    padding: 10px 15px;\n    text-align: left;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n\n    .text{\n      color: #999;\n    }\n\n    .delete-btn{\n      color: #999;\n\n      &:hover{\n        color:#eee;\n      }\n    }\n\n    &.active{\n      background-color: #ffffff10;\n      .text{\n        color: #fff;\n        text-shadow: 0 0 2px #fff;\n      }\n    }\n  }\n\n  .footer{\n    position: absolute;\n    bottom: 0;\n    padding: 15px 0;\n    text-align: center;\n    left: 0;\n    right: 0;\n    color: #ffffff80;\n  }\n"])),B),{Text:V}=c.A,I=()=>{const t=(0,C.wA)(),n=(0,C.d4)((t=>t.common.playList)),e=(0,C.d4)((t=>t.common.currentItem)),i=s.createRef(),a=async e=>{const i=Array.from(e).map((async t=>{const n=URL.createObjectURL(t);return{name:t.name.split(".")[0],url:n,...await M(t)}})),s=await Promise.all(i);t((0,N.Y6)([...n,...s]))};return(0,d.jsxs)(F,{onDrop:t=>{t.preventDefault(),t.stopPropagation();const n=t.dataTransfer.files;n.length>0&&a(n)},onDragOver:t=>{t.preventDefault(),t.stopPropagation()},children:[(0,d.jsxs)("div",{className:"header",children:[(0,d.jsx)("div",{className:"title",children:"Play List"}),(0,d.jsxs)("div",{className:"action",children:[(0,d.jsx)("div",{className:"add-btn",onClick:t=>{var n;t.stopPropagation(),null===(n=i.current)||void 0===n||n.click()},children:"+"}),(0,d.jsx)("input",{style:{display:"none"},ref:i,type:"file",onChange:t=>{t.target.files&&a(t.target.files)},multiple:!0,accept:"audio/*"}),(0,d.jsx)("div",{className:"btn collapse-btn"})]})]}),(0,d.jsx)("div",{className:"body",children:(0,d.jsx)("div",{className:"list-inner",children:n.map(((i,s)=>(0,d.jsxs)("div",{className:"list-item ".concat((null===e||void 0===e?void 0:e.url)===i.url?"active":""),onDoubleClick:()=>t((0,N.Oj)(i)),children:[(0,d.jsx)(V,{className:"text",ellipsis:!0,children:i.title?"".concat(i.title," - ").concat(i.artist):i.name}),(0,d.jsx)("div",{className:"delete-btn",onClick:e=>{e.stopPropagation();let i=n.slice();i.splice(s,1),t((0,N.Y6)(i))},children:"\u2715"})]},s)))})}),(0,d.jsx)("div",{className:"footer",children:(0,d.jsx)("div",{className:"note",children:"drag your music here"})})]})};var D=e(8304);const _=e.p+"static/media/donate.611c23c08827fdd9729e.png";var G;const q=l.A.div(G||(G=(0,a.A)(["\n  position: absolute;\n  top: 40%;\n  left: 10px;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 50px;\n  height: 100px;\n  transform: translateY(-50%);\n  row-gap: 15px;\n  font-family: var(--font-family);\n  .dot{\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    border: 2px solid white;\n    transition: all 0.2s;\n    cursor: pointer;\n    transform: scale(1);\n    &:hover, &.active{\n      box-shadow: inset 0 0 2px 4px white;\n    }\n    &:hover{\n      span{\n        transform: translateX(0);\n        opacity: 1;\n      }\n    }\n\n    span{\n      position: absolute;\n      left: 30px;\n      color: white;\n      width: 100px;\n      text-align: left;\n      line-height: 15px;\n      opacity: 0;\n      transition: all 0.2s 0.1s;\n      transform: translateX(-40px);\n    }\n  }\n"]))),U=["Bar Chart","Pixel Art LED"],Y=()=>{const t=(0,C.wA)(),n=(0,C.d4)((t=>t.common.effectMode));return(0,d.jsx)(q,{children:U.map(((e,i)=>(0,d.jsx)("div",{className:"dot ".concat(i===n?"active":""),onClick:()=>t((0,N.Sd)(i)),children:(0,d.jsx)("span",{children:e})},i)))})};const X=function(){const[t,n]=(0,s.useState)(!1),e=(0,C.d4)((t=>t.common.playListVisible));return(0,d.jsxs)("div",{className:"App",children:[(0,d.jsx)("canvas",{id:"canvas"}),(0,d.jsx)(Y,{}),(0,d.jsx)(T,{}),e&&(0,d.jsx)(I,{}),(0,d.jsxs)("div",{className:"links",children:[(0,d.jsx)("a",{href:"mailto:77941075@qq.com",children:"Email"})," \xb7 ",(0,d.jsx)("div",{className:"link",onClick:()=>n(!0),children:"Donate"})]}),(0,d.jsx)(D.A,{width:200,style:{display:"none"},src:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200",preview:{visible:t,src:_,toolbarRender:()=>[(0,d.jsx)("div",{})],onVisibleChange:t=>{n(t)}}})]})}}}]);
//# sourceMappingURL=481.3dd8bc5c.chunk.js.map