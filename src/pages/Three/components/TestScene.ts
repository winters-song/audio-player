
import * as THREE from 'three';

interface IProps {
  el: HTMLCanvasElement | null
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

  particleGeometry?: THREE.BufferGeometry

  constructor(params: IProps) {
    Object.assign(this, params)

    this.init()
  }

  init() {
    if (!this.el) return

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.el
    });
    window.addEventListener('resize', () => {
      var width = window.innerWidth;
      var height = window.innerHeight;
      if (this.renderer && this.camera) {
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      }
    });


    this.drawParticle();
    // this.animateParticle();
  }

  drawBox() {
    if (!this.scene || !this.camera) {
      return;
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  drawParticle() {
    if (!this.scene || !this.camera) {
      return;
    }

    this.particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1024 * 3);
    const colors = new Float32Array(1024 * 3);

    for (let i = 0, j = 0, l = positions.length; i < l; i += 3, j++) {
      positions[i] = (j - 512) * 1.1;
      positions[i + 1] = 0;
      positions[i + 2] = 0;

      colors[i] = 1;
      colors[i + 1] = 1;
      colors[i + 2] = 1;
    }

    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ vertexColors: true });
    const particles = new THREE.Points(this.particleGeometry, material);
    this.scene?.add(particles);

    this.camera.position.z = 100;
  }

  animateBox() {
    if (!this.scene || !this.camera) {
      return;
    }

    this.renderer?.setAnimationLoop(() => {
      this.animateBox()
    });

    if (this.cube) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }
    this.renderer?.render(this.scene, this.camera);

  }

  animateParticle() {
    if (!this.scene || !this.camera || !this.particleGeometry) {
      return;
    }

    this.renderer?.setAnimationLoop(() => {
      this.animateParticle()
    });

    const positions = this.particleGeometry.attributes.position.array;
    // const colors = this.particleGeometry.attributes.color.array;
    for (let i = 0; i < 1024; i++) {
      // 每个粒子的索引
      const index = i * 3;

      // 更新每个粒子的位置
      positions[index + 1] += Math.random() - 0.5; // 更新 y 坐标

      // colors[index ] = Math.random();
      // colors[index + 1] = Math.random();
      // colors[index + 2] = Math.random();
      // this.particleMaterial?.color.setRGB(1, Math.random(), 1);
    }

    this.particleGeometry.attributes.position.needsUpdate = true; // 标记顶点位置属性已更新
    // this.particleGeometry.attributes.color.needsUpdate = true; // 标记顶点位置属性已更新


    // particles.geometry.verticesNeedUpdate = true;
    this.camera.lookAt(this.scene.position);

    this.renderer?.render(this.scene, this.camera);

  }
}