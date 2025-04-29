
import * as THREE from 'three';
import BaseScene from '../Base/BaseScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const color1 = 0xeff6ff;
const color2 = 0xdbeafe;
const color3 = 0xbfdbfe;
const color4 = 0x93c5fd;
const color5 = 0x60a5fa;
const color6 = 0x3b82f6;
const color7 = 0x2563eb;
const color8 = 0x1d4ed8;
const colorArray = [color1, color2, color3, color4, color5, color6, color7, color8];

/**
 * Threejs学习Demo
*/
export default class Wave extends BaseScene {

  renderer: THREE.WebGLRenderer | null = null

  scene?: THREE.Scene

  camera?: THREE.PerspectiveCamera

  cube?: THREE.Mesh

  particleGeometry?: THREE.BufferGeometry

  length = 1024

  inited = false

  controls: OrbitControls | null = null

  init() {
    if (!this.el) return
    if (this.inited) {
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
    // this.controls.autoRotate = true;


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
    resizeHandler();

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
    const z = 0;
    const space = 3;
    const col = this.length / 8;

    for (let i = 0, j = 0; i < positions.length; i += 3, j++) {
      let row = Math.floor(j/col)
      positions[i] = (j % col - col/2) * space;
      positions[i + 1] = 0;
      positions[i + 2] = z + row * 25;

      const colorVal = colorArray[row];
      colors[i] = ((colorVal >> 16) & 255) / 255;
      colors[i + 1] = ((colorVal >> 8) & 255) / 255;
      colors[i + 2] = (colorVal & 255) / 255;
    }

    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ 
      vertexColors: true, 
      size: 3,
     });
    const particles = new THREE.Points(this.particleGeometry, material);
    this.scene?.add(particles);

    const gridHelper = new THREE.GridHelper(400, 10);
    this.scene?.add(gridHelper);
  }

  drawEachFrame(dataArray: Uint8Array) {

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
      for (let i = 0; i < this.length; i++) {
        positions[i*3 + 1] = dataArray[i]
      }

      this.particleGeometry.attributes.position.needsUpdate = true; // 标记顶点位置属性已更新

      this.camera.lookAt(this.scene.position);

      this.renderer?.render(this.scene, this.camera);
    }
  }


  stopVisualize() {
    this.renderer?.setAnimationLoop(null);
  }

}