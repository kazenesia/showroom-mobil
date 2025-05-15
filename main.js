
let scene, camera, renderer, currentCarIndex = 0, cars = [];
let carNameEl = document.getElementById('car-name');
let specsEl = document.getElementById('specs');
let detailBtn = document.getElementById('detail-btn');
let backBtn = document.getElementById('back-btn');

init();
loadCars();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4);

  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('three-canvas'), antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  animate();
}

function loadCars() {
  const loader = new THREE.GLTFLoader();
  const carPaths = [
    'assets/car1/model.gltf',
    'assets/car2/model.gltf',
    'assets/car3/model.gltf',
    'assets/car4/model.gltf',
    'assets/car5/model.gltf'
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
