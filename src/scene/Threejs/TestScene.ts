
import * as THREE from 'three';
import { IBaseScene } from '../../models/common';

interface IProps{
  el: HTMLCanvasElement | null

  audioCtx: AudioContext

  analyser: AnalyserNode
}

/**
 * Threejs学习Demo
*/
export default class TestScene {
  el: HTMLCanvasElement | null = null

  renderer: THREE.WebGLRenderer | null = null

  scene?: THREE.Scene

  camera?: THREE.PerspectiveCamera

  cube?: THREE.Mesh

  constructor(params: IProps) {
    Object.assign(this, params)
  }

  init() {
    if(!this.el) return

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.el
    });
    
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setAnimationLoop(animate);
    // document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  drawEachFrame ( dataArray: Uint8Array) {
    this.renderer?.setAnimationLoop(() => {
      this.drawEachFrame(dataArray)
    });

    if(this.cube){
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }
    if(this.scene && this.camera){
      this.renderer?.render(this.scene, this.camera);
    }

  }


  stopVisualize() {
    this.renderer?.setAnimationLoop(null);
  }

  resetCanvas() {
    
  }
}