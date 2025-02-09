document.addEventListener("DOMContentLoaded", function () {
    const symbols = ["/images/zub1.svg", "/images/zub3.svg", "/images/zub2.svg", "/images/zub4.svg","/images/zub2.svg"]; // Your SVGs
    // Define positions, sizes, and rotations (balanced, modern, staggered)
    const teethConfig = [
        // Left side (0% - 5%)
        { left: "2%", top: "5%", size: "15%", rotation: -10 },
        { left: "4%", top: "35%", size: "10%", rotation: 8 },
        { left: "1%", top: "70%", size: "8%", rotation: -5 },

        // Right side (95% - 100%) (Staggered differently)
        { left: "80%", top: "8%", size: "8%", rotation: 10 },
        { left: "88%", top: "40%", size: "10%", rotation: -8 },
        { left: "80%", top: "85%", size: "15%", rotation: 5 },
    ];
    const backgroundLayer = document.createElement("div");
    backgroundLayer.id = "background-layer";
    document.body.prepend(backgroundLayer); // Ensures it's behind everything
    teethConfig.forEach((config, index) => {
        const img = document.createElement("img");
        img.src = symbols[index % symbols.length]; // Alternate between SVGs
        img.classList.add("teeth-symbol");
        // Apply manual position, size (percentage-based), and rotation
        img.style.left = config.left;
        img.style.top = config.top;
        img.style.width = config.size; // Now in percentage of viewport width
        img.style.transform = `rotate(${config.rotation}deg)`;
        backgroundLayer.appendChild(img);
    });
});