const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.95, 0.95, 0.95, 1); // Abu terang showroom

scene.createDefaultEnvironment();

const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 15, BABYLON.Vector3.Zero(), scene);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Data mobil
const cars = [
  { name: "BMW M4 Coupe", folder: "car1", file: "car1.gltf", year: 2018, model: "F82", spec: "3.0L Twin Turbo" },
  { name: "Bugatti Centodieci", folder: "car2", file: "car2.gltf", year: 2019, model: "-", spec: "8.0L Quad Turbo" },
  { name: "Ferarri Stradale", folder: "car3", file: "car3.gltf", year: 2023, model: "SF90", spec: "4.0L V8 Twin Turbo" },
  { name: "Ford Mustang", folder: "car4", file: "car4.gltf", year: 2025, model: "GTD", spec: "5.2L V8 Engine" },
  { name: "Genty Akylone", folder: "car5", file: "car5.gltf", year: 2015, model: "-", spec: "3.5L V8 Twin Turbo" }
];

const loadedCars = [];
let currentIndex = 0;
let mode = "carousel";

function focusCameraOnMesh(mesh) {
  const bounds = mesh.getBoundingInfo().boundingBox;
  const center = bounds.centerWorld;
  const size = bounds.extendSizeWorld;

  camera.setTarget(center);
  camera.setPosition(new BABYLON.Vector3(center.x + size.x * 3, center.y + size.y * 1.2, center.z + size.z * 2));
}

cars.forEach((car, index) => {
  BABYLON.SceneLoader.ImportMesh("", `assets/${car.folder}/`, car.file, scene, (meshes) => {
    const root = meshes[0].parent || meshes[0];
    root.scaling = new BABYLON.Vector3(5, 5, 5); // perbesar
    root.position = BABYLON.Vector3.Zero();
    root.setEnabled(index === 0); // tampilkan mobil pertama saja
    loadedCars.push({ ...car, mesh: root });

    if (loadedCars.length === cars.length) {
      updateCarousel();
    }
  }, null, (scene, err) => {
    console.error(`❌ Error loading ${car.name}:`, err);
  });
});

function updateCarousel() {
  if (mode !== "carousel") return;

  loadedCars.forEach((car, i) => {
    car.mesh.setEnabled(i === currentIndex);
  });

  const car = loadedCars[currentIndex];
  document.getElementById("car-name").innerText = car.name;
  camera.detachControl(canvas);
  focusCameraOnMesh(car.mesh);
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

function selectCar() {
  const car = loadedCars[currentIndex];
  mode = "detail";
  camera.attachControl(canvas, true);
  focusCameraOnMesh(car.mesh);
  document.getElementById("car-title").innerText = `${car.name} (${car.year})`;
  document.getElementById("car-specs").innerText = `Model: ${car.model}, Spesifikasi: ${car.spec}`;
  document.getElementById("car-details").style.display = "block";
}

function exitDetailMode() {
  mode = "carousel";
  camera.detachControl(canvas);
  updateCarousel();
}

function setCameraTo(view) {
  const car = loadedCars[currentIndex];
  const bounds = car.mesh.getBoundingInfo().boundingBox;
  const center = bounds.centerWorld;
  const size = bounds.extendSizeWorld;

  switch (view) {
    case "left":
      camera.setPosition(new BABYLON.Vector3(center.x - size.x * 2.5, center.y + 1, center.z));
      break;
    case "top":
      camera.setPosition(new BABYLON.Vector3(center.x, center.y + size.y * 3.5, center.z));
      break;
    case "inside":
      camera.setPosition(new BABYLON.Vector3(center.x, center.y + 1.2, center.z));
      break;
  }

  camera.setTarget(center);
}

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
