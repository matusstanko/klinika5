document.addEventListener("DOMContentLoaded", function () {
    const symbols = ["/images/zub1.svg", "/images/zub1.svg", "/images/zub3.svg", "/images/zub4.svg","/images/zub2.svg"]; // Your SVGs
    // Define positions, sizes, and rotations (balanced, modern, staggered)
    const teethConfig = [
        // Left side (0% - 5%)
        { left: "2%", top: "5%", size: "5%", rotation: -10 },
        { left: "4%", top: "13%", size: "6%", rotation: 8 },
        { left: "1%", top: "22%", size: "4.5%", rotation: -5 },
        { left: "3%", top: "33%", size: "7%", rotation: 12 },
        { left: "2%", top: "46%", size: "6%", rotation: -8 },
        { left: "1%", top: "55%", size: "5.5%", rotation: 5 },
        { left: "4%", top: "66%", size: "6.5%", rotation: -12 },
        { left: "2%", top: "77%", size: "4.8%", rotation: 10 },
        // Right side (95% - 100%) (Staggered differently)
        { left: "90%", top: "8%", size: "5%", rotation: 10 },
        { left: "88%", top: "18%", size: "6%", rotation: -8 },
        { left: "92%", top: "27%", size: "4.5%", rotation: 5 },
        { left: "93%", top: "37%", size: "7%", rotation: -12 },
        { left: "88%", top: "50%", size: "6%", rotation: 8 },
        { left: "90%", top: "58%", size: "5.5%", rotation: -5 },
        { left: "80%", top: "69%", size: "6.5%", rotation: 12 },
        { left: "95%", top: "80%", size: "4.8%", rotation: -10 }
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