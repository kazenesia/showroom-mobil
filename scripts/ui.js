const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const selectBtn = document.getElementById("select-btn");

// Event listener untuk tombol sebelumnya
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + carModels.length) % carModels.length;
    loadCar(scene, currentIndex);
});

// Event listener untuk tombol berikutnya
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % carModels.length;
    loadCar(scene, currentIndex);
});

// Event listener untuk memilih mobil
selectBtn.addEventListener("click", () => {
    selectedCar = currentCar;
    document.getElementById("car-specs").innerHTML = carModels[currentIndex].specs;

    // Batasi eksplorasi kamera hanya ke bagian atas dan samping
    camera.lowerBetaLimit = Math.PI / 4; // Tidak bisa melihat bawah
    camera.upperBetaLimit = Math.PI / 2; // Bisa melihat atas
});
