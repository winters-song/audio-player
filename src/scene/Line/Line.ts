
import * as THREE from 'three';
import BaseScene from '../Base/BaseScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Threejs学习Demo
*/
export default class Line extends BaseScene {

  renderer: THREE.WebGLRenderer | null = null

  scene?: THREE.Scene

  camera?: THREE.PerspectiveCamera

  cube?: THREE.Mesh

  particleGeometry?: THREE.BufferGeometry

  length = 1024

  inited = false

  controls: OrbitControls | null = null

  init() {
    if(!this.el) return
    if(this.inited){
      return;
    }
    this.inited = true

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 50, 400);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.el
    });
 
    this.drawParticle();

    this.controls = new OrbitControls(this.camera, this.el);
    this.controls.autoRotate = true;


    const resizeHandler = () => {
      if (!this.el) {
        return;
      }
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.el.width = width;
      this.el.height = height;
      if (this.renderer && this.camera) {
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', resizeHandler);

    this.removeResizeEvent = () => {
      window.removeEventListener('resize', resizeHandler);
    }

  }

  drawParticle() {
    if (!this.scene || !this.camera) {
      return;
    }

    this.particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.length * 3);
    const colors = new Float32Array(this.length * 3);

    for (let i = 0, j = 0, l = positions.length; i < l; i += 3, j++) {
      positions[i] = (j - this.length/2) * 1.1;
      positions[i + 1] = 0;
      positions[i + 2] = 0;

      colors[i] = 1;
      colors[i + 1] = 1;
      colors[i + 2] = 1;
    }

    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ vertexColors: true, size: 3 });
    const particles = new THREE.Points(this.particleGeometry, material);
    this.scene?.add(particles);

    const gridHelper = new THREE.GridHelper(400, 10);
    this.scene?.add(gridHelper);
  }

  drawEachFrame ( dataArray: Uint8Array) {
    
    this.renderer?.setAnimationLoop(() => {
      this.stats.begin();
      this.controls?.update();
      this.drawEachFrame(dataArray)
      this.stats.end();
    });

    if (!this.scene || !this.camera || !this.particleGeometry) {
      return;
    }
    if (this.analyser) {

      this.analyser.getByteFrequencyData(dataArray);
      const positions = this.particleGeometry.attributes.position.array;
      const colors = this.particleGeometry.attributes.color.array;
      const half = this.length / 2
      for (let i = 0; i < half; i++) {
        // 每个粒子的索引
        const indexRight = (i + half) * 3;
        const indexLeft = (half - i) * 3;

        // 更新每个粒子的位置
        positions[indexLeft + 1] = positions[indexRight + 1] = dataArray[i] / 2; // 更新 y 坐标
        colors[indexLeft + 1] = colors[indexRight + 1] = dataArray[i]/255;
        colors[indexLeft + 2] = colors[indexRight + 2] = 1 - dataArray[i]/255;
      }

      this.particleGeometry.attributes.position.needsUpdate = true; // 标记顶点位置属性已更新
      this.particleGeometry.attributes.color.needsUpdate = true; // 标记顶点位置属性已更新

      this.camera.lookAt(this.scene.position);

      this.renderer?.render(this.scene, this.camera);
    }
  }


  stopVisualize() {
    this.renderer?.setAnimationLoop(null);
  }

}