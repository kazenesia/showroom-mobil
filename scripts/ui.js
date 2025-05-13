const carSlider = document.getElementById("car-slider");

// Event listener untuk slider
carSlider.addEventListener("input", () => {
    loadCar(scene, parseInt(carSlider.value));
});
