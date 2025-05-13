const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Kamera showroom
const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Pencahayaan showroom
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Lantai showroom
const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
groundMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
ground.material = groundMaterial;

// Jalankan render loop
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
