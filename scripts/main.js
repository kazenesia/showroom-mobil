const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

// Camera & Light
const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2.5, Math.PI / 2.5, 20, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, false);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

// Mobil
const cars = [
  { name: "BMW M4 Coupe", folder: "car1", file: "car1.gltf", year: 2018, model: "F82", spec: "3.0L Twin Turbo" },
  { name: "Bugatti Centodieci", folder: "car2", file: "car2.gltf", year: 2019, model: "-", spec: "8.0L Quad Turbo" },
  { name: "Ferarri Stradale", folder: "car3", file: "car3.gltf", year: 2023, model: "SF90", spec: "4.0L V8 Twin Turbo" },
  { name: "Ford Mustang", folder: "car4", file: "car4.gltf", year: 2025, model: "GTD", spec: "5.2L V8 Engine" },
  { name: "Genty Akylone", folder: "car5", file: "car5.gltf", year: 2015, model: "-", spec: "3.5L V8 Twin Turbo" }
  // Tambahkan mobil lainnya di sini
];

const loadedCars = [];
let currentIndex = 0;
let mode = "carousel"; // atau "detail"

// Load semua mobil
cars.forEach((car, index) => {
  BABYLON.SceneLoader.ImportMesh("", `assets/${car.folder}/`, car.file, scene, (meshes) => {
    const carRoot = meshes[0].parent || meshes[0];
    carRoot.position = new BABYLON.Vector3(index * 10, 0, 0);
    carRoot.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-30), 0);
    carRoot.setEnabled(false);
    loadedCars[index] = { ...car, mesh: carRoot };
    if (loadedCars.length === cars.length) {
      updateCarousel();
    }
  });
});

// Fungsi Carousel
function updateCarousel() {
  if (mode !== "carousel") return;

  loadedCars.forEach((carObj, i) => {
    carObj.mesh.setEnabled(i === currentIndex);
  });

  const currentCar = loadedCars[currentIndex];
  document.getElementById("car-name").innerText = currentCar.name;

  camera.detachControl(canvas);
  camera.setTarget(currentCar.mesh.position);
  camera.alpha = -Math.PI / 3;
  camera.beta = Math.PI / 2.5;
  camera.radius = 20;

  document.getElementById("car-details").style.display = "none";
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + loadedCars.length) % loadedCars.length;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % loadedCars.length;
  updateCarousel();
}

// Masuk Mode Detail
function selectCar() {
  const car = loadedCars[currentIndex];
  mode = "detail";

  camera.attachControl(canvas, true);
  camera.setTarget(car.mesh.position);
  camera.radius = 10;

  document.getElementById("car-title").innerText = `${car.name} (${car.year})`;
  document.getElementById("car-specs").innerText = `Model: ${car.model}, Spesifikasi: ${car.spec}`;
  document.getElementById("car-details").style.display = "block";
}

// Exit Mode Detail
function exitDetailMode() {
  mode = "carousel";
  camera.detachControl(canvas);
  updateCarousel();
}

// Preset Kamera
function setCameraTo(view) {
  const car = loadedCars[currentIndex];
  const pos = car.mesh.position;

  switch (view) {
    case "left":
      camera.setPosition(new BABYLON.Vector3(pos.x - 5, pos.y + 2, pos.z));
      break;
    case "top":
      camera.setPosition(new BABYLON.Vector3(pos.x, pos.y + 10, pos.z));
      break;
    case "inside":
      camera.setPosition(new BABYLON.Vector3(pos.x, pos.y + 1.2, pos.z));
      break;
  }

  camera.setTarget(pos);
}

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
