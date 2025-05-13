const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

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
