let scene, camera, renderer, controls;
let currentCarIndex = 0;
const cars = [];

const carNameEl = document.getElementById('car-name');
const specsEl = document.getElementById('specs');
const detailBtn = document.getElementById('detail-btn');
const backBtn = document.getElementById('back-btn');

init();
loadCars();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('three-canvas'),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Debug helper
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);

  // Responsive
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadCars() {
  const loader = new THREE.GLTFLoader();
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

        // Posisi, skala, dan rotasi default
        car.position.set(0, 0, 0);
        car.scale.set(1.5, 1.5, 1.5);
        car.rotation.y = Math.PI / 4; // menyerong

        cars[index] = car;

        if (index === 0) {
          scene.add(car);
          carNameEl.textContent = "Car 1";
        }

        console.log(`Model ${index + 1} loaded`, car);
      },
      undefined,
      error => {
        console.error(`Gagal memuat model ${index + 1} dari ${path}`, error);
      }
    );
  });
}

function showCar(index) {
  // Hapus semua mobil dari scene
  cars.forEach(car => scene.remove(car));

  const car = cars[index];
  if (car) {
    scene.add(car);
    carNameEl.textContent = `Car ${index + 1}`;
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
  carNameEl.textContent = `Car ${currentCarIndex + 1}`;
};

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
