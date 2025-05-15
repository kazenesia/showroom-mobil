// main.js (pastikan seluruh isi berada dalam format module)
import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';

// Script kamu dimulai di bawah ini
let scene, camera, renderer, currentCarIndex = 0, cars = [];
const carNameEl = document.getElementById('car-name');
const specsEl = document.getElementById('specs');
const detailBtn = document.getElementById('detail-btn');
const backBtn = document.getElementById('back-btn');

init();
loadCars();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('three-canvas'),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

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
    loader.load(path, gltf => {
      cars[index] = gltf.scene;
      if (index === 0) {
        scene.add(cars[0]);
        carNameEl.textContent = "Car 1";
      }
    });
  });
}

function showCar(index) {
  scene.clear();
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  if (cars[index]) {
    scene.add(cars[index]);
    carNameEl.textContent = "Car " + (index + 1);
  }
}

document.getElementById('next-btn').onclick = () => {
  currentCarIndex = (currentCarIndex + 1) % cars.length;
  showCar(currentCarIndex);
};

document.getElementById('prev-btn').onclick = () => {
  currentCarIndex = (currentCarIndex - 1 + cars.length) % cars.length;
  showCar(currentCarIndex);
};

detailBtn.onclick = () => {
  specsEl.classList.remove('hidden');
  detailBtn.classList.add('hidden');
  backBtn.classList.remove('hidden');
  carNameEl.textContent += " - Detail Mode";
};

backBtn.onclick = () => {
  specsEl.classList.add('hidden');
  detailBtn.classList.remove('hidden');
  backBtn.classList.add('hidden');
  carNameEl.textContent = "Car " + (currentCarIndex + 1);
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
