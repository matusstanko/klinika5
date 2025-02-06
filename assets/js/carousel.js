document.addEventListener("DOMContentLoaded", function () {
  // Select all carousels
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    // Get elements for the specific carousel
    const container = carousel.querySelector(".carousel-container");
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    const indicators = carousel.querySelectorAll(".indicator");
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    // Initialize the current index for each carousel
    let currentIndex = 0;

    // Function to update the carousel's position and indicators
    function updateCarousel() {
      const offset = -currentIndex * 100; // Slide offset
      container.style.transform = `translateX(${offset}%)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }

    // Event listener for the "previous" button
    prevButton.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });

    // Event listener for the "next" button
    nextButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });

    // Event listeners for indicators
    indicators.forEach((indicator) => {
      indicator.addEventListener("click", function () {
        currentIndex = parseInt(this.getAttribute("data-index"));
        updateCarousel();
      });
    });

    // Prevent swiping to empty pages if only 1 slide exists
    if (totalItems === 1) {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
      indicators.forEach((indicator) => indicator.style.display = "none");
    }
  });
});