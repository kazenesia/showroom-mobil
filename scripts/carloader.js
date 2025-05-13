let currentCar; // Variabel untuk menyimpan mobil yang sedang ditampilkan

const carModels = [
    { folder: "car1", file: "car1.gltf", specs: "?? **Model:** Car 1<br>?? **Mesin:** V8 Turbo<br>?? **Tenaga:** 500 HP" },
    { folder: "car2", file: "car2.gltf", specs: "?? **Model:** Car 2<br>?? **Mesin:** Hybrid<br>?? **Tenaga:** 400 HP" },
    { folder: "car3", file: "car3.gltf", specs: "?? **Model:** Car 3<br>?? **Mesin:** Electric<br>?? **Tenaga:** 350 HP" },
    { folder: "car4", file: "car4.gltf", specs: "?? **Model:** Car 4<br>?? **Mesin:** Diesel<br>?? **Tenaga:** 450 HP" },
    { folder: "car5", file: "car5.gltf", specs: "?? **Model:** Car 5<br>?? **Mesin:** Sport<br>?? **Tenaga:** 600 HP" }
];

function loadCar(scene, carIndex) {
    const car = carModels[carIndex];

    // Hapus mobil sebelumnya jika ada
    if (currentCar) {
        currentCar.dispose();
    }

    // Muat mobil baru dari folder masing-masing
    BABYLON.SceneLoader.ImportMesh("", "https://username.github.io/showroom-mobil/assets/car1/", "car1.gltf", scene, function (meshes) {
        currentCar = meshes[0]; // Simpan referensi mobil yang baru dimuat
        currentCar.position = new BABYLON.Vector3(0, 0, 0);
        currentCar.scaling = new BABYLON.Vector3(1, 1, 1);

        // Tambahkan event listener untuk klik
        currentCar.actionManager = new BABYLON.ActionManager(scene);
        currentCar.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                document.getElementById("car-specs").innerHTML = car.specs;
            })
        );
    });
}

// Muat mobil pertama saat halaman dimulai
loadCar(scene, 0);
