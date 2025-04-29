
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import boxTexture from '../../../assets/textures/square-outline-textured.png';

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
    this.scene.background = new THREE.Color(0xf0f0f0);

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

    const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    const rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    this.scene.add(this.rollOverMesh);

    // cubes
// '../../../assets/textures/square-outline-textured.png'
    const map = new THREE.TextureLoader().load(boxTexture);
    map.colorSpace = THREE.SRGBColorSpace;
    this.cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    this.cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xfeb74c, map: map });

    // grid

    const gridHelper = new THREE.GridHelper(1000, 20);
    this.scene.add(gridHelper);

    const geometry = new THREE.PlaneGeometry(1000, 1000);
    geometry.rotateX(- Math.PI / 2);

    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    this.scene.add(plane);

    this.objects.push(plane);

    const ambientLight = new THREE.AmbientLight(0x606060, 3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    this.scene.add(directionalLight);
  }

  addEvents() {
    const me = this;

    function onPointerDown(event: PointerEvent) {
      if (!me.rollOverMesh || !me.camera || !me.scene) {
        return;
      }

      me.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

      me.raycaster.setFromCamera(me.pointer, me.camera);

      const intersects = me.raycaster.intersectObjects(me.objects, false);

      if (intersects.length > 0) {

        const intersect = intersects[0];
        if (intersect.face) {
          const voxel = new THREE.Mesh( me.cubeGeo, me.cubeMaterial );
          voxel.position.copy( intersect.point ).add( intersect.face.normal );
          voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
          me.scene.add( voxel );

					me.objects.push( voxel );
          // me.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
          // me.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        }
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (!me.rollOverMesh || !me.camera) {
        return;
      }
      me.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

      me.raycaster.setFromCamera(me.pointer, me.camera);

      const intersects = me.raycaster.intersectObjects(me.objects, false);

      if (intersects.length > 0) {

        const intersect = intersects[0];
        if (intersect.face) {
          me.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
          me.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        }

      }

    }


    document.addEventListener( 'pointermove', onPointerMove );
    document.addEventListener('pointerdown', onPointerDown);
    // document.addEventListener( 'keydown', onDocumentKeyDown );
    // document.addEventListener( 'keyup', onDocumentKeyUp );


    // setTimeout(() => {
    //   document.removeEventListener( 'pointermove', onPointerMove );
    // }, 5000);

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