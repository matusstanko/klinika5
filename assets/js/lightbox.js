document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery-grid img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");
    const prevBtn = document.querySelector(".prev-lightbox");
    const nextBtn = document.querySelector(".next-lightbox");

    let currentIndex = 0; // Store current image index
    let imgArray = []; // Array of image sources

    images.forEach(img => imgArray.push(img.src));

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = imgArray[currentIndex];
        lightbox.style.display = "flex";
        setTimeout(() => { lightbox.style.opacity = "1"; }, 10);
    }

    function closeLightboxFunc() {
        lightbox.style.opacity = "0";
        setTimeout(() => { lightbox.style.display = "none"; }, 300);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % imgArray.length;
        lightboxImg.src = imgArray[currentIndex];
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + imgArray.length) % imgArray.length;
        lightboxImg.src = imgArray[currentIndex];
    }

    images.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });

    closeLightbox.addEventListener("click", closeLightboxFunc);
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeLightboxFunc();
        if (event.key === "ArrowRight") showNextImage();
        if (event.key === "ArrowLeft") showPrevImage();
    });

    // Mobile Swipe Support
    let touchStartX = 0;

    lightbox.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", (event) => {
        let touchEndX = event.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) showNextImage(); // Swipe left
        if (touchStartX - touchEndX < -50) showPrevImage(); // Swipe right
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target !== lightboxImg && event.target !== prevBtn && event.target !== nextBtn) {
            closeLightboxFunc();
        }
    });
});