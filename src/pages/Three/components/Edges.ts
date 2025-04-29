
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

  rollOverMesh?: THREE.Mesh

  cubeGeo?: THREE.BoxGeometry

  cubeMaterial?: THREE.Material

  objects: THREE.Mesh[] = []

  raycaster: THREE.Raycaster = new THREE.Raycaster();

  pointer: THREE.Vector2 = new THREE.Vector2();

  controls?: OrbitControls

  stats: any

  constructor(params: IProps) {
    Object.assign(this, params)

    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);

    this.init()
  }

  init() {
    if (!this.el) return

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xf0f0f0);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.set(500, 800, 1300);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.el,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener('resize', () => {
      if (!this.el) {
        return;
      }
      var width = window.innerWidth;
      var height = window.innerHeight;
      // this.el.width = width;
      // this.el.height = height;
      if (this.renderer && this.camera) {
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      }

    });


    this.initObjects();
    this.addEvents();
    this.controls = new OrbitControls(this.camera, this.el);

    this.animate();
  }

  initObjects() {
    if (!this.scene || !this.camera) {
      return;
    }

    
    const gridHelper = new THREE.GridHelper(1000, 20);
    this.scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0x606060, 3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    this.scene.add(directionalLight);

    const loader = new GLTFLoader();
    // loader.load('/audio-player/models/monkey.gltf', (gltf) => {

    //   gltf.scene.traverse((child) => {
    //     if ((child as THREE.Mesh).isMesh) {
    //       const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
    //       // 最新Opengl版本不支持linewidth
    //       const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffff}));
    //       line.scale.set(100, 100, 100)
    //       this.scene?.add(line);

    //       (child as THREE.Mesh).material = new THREE.MeshLambertMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4 });
    //       child.scale.set(100, 100, 100)
    //       this.scene?.add(child);
    //     }
    //   })
    // });
    loader.load('/audio-player/models/tower.gltf', (gltf) => {

      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          // const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
          // // 最新Opengl版本不支持linewidth
          // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffff}));
          // line.scale.set(100, 100, 100)
          // this.scene?.add(line);

          (child as THREE.Mesh).material = new THREE.MeshLambertMaterial({ color: 0xffffff });
          child.scale.set(2, 2, 2)
          this.scene?.add(child);
        }
      })
    });
  }

  addEvents() {
    const me = this;
  }

  animate() {
    if (!this.scene || !this.camera) {
      return;
    }

    this.renderer?.setAnimationLoop(() => {
      this.stats.begin();
      this.controls?.update();
      this.animate()
      this.stats.end();
    });

    this.renderer?.render(this.scene, this.camera);
  }
}