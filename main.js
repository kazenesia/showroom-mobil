import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '/examples/jsm/loaders/GLTFLoader.js'

let scene, camera, renderer, controls, currentCarIndex = 0, cars = [];
const carNameEl = document.getElementById('car-name');

init();
loadCars();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 5);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('three-canvas'),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x202020);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  animate();
}

function loadCars() {
  const loader = new GLTFLoader();
  const carPaths = [
    'assets/car1/car1.gltf',
    'assets/car2/car2.gltf',
    'assets/car3/car3.gltf',
    'assets/car4/car4.gltf',
    'assets/car5/car5.gltf'
  ];

  carPaths.forEach((path, index) => {
    loader.load(
      path,
      gltf => {
        const car = gltf.scene;
        car.position.set(0, 0, 0);
        car.scale.set(1.5, 1.5, 1.5);
        car.rotation.y = Math.PI / 4;

        console.log(`Car ${index + 1} loaded`);
        cars[index] = car;

        if (index === 0) {
          scene.add(car);
          carNameEl.textContent = "Car 1";

          const boxHelper = new THREE.BoxHelper(car, 0xff0000);
          scene.add(boxHelper);
        }
      },
      undefined,
      error => {
        console.error(`Error loading ${path}`, error);
      }
    );
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
