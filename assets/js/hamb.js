document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links-container');
    const links = navLinks.querySelectorAll('a'); // Get all links within the navLinks container
    const arrows = document.querySelectorAll('.arrow'); // All submenu opening arrows
    const submenus = document.querySelectorAll('.submenu'); // All submenus

    // Toggle the nav menu on hamburger click
    hamburger.addEventListener('click', function () {
        if (navLinks.style.transform === 'translateY(0%)') {
            navLinks.style.transform = 'translateY(-100%)'; // Hide menu
        } else {
            navLinks.style.transform = 'translateY(0%)'; // Show menu
        }
    });

    // Close the nav menu when any link is clicked, but only on mobile views
    links.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) { // Only apply on mobile devices
                navLinks.style.transform = 'translateY(-100%)'; // Hide menu
            }
        });
    });

    // Close submenu when clicking anywhere except on opening arrows
    document.addEventListener('click', function (event) {
        const isArrow = Array.from(arrows).some(arrow => arrow.contains(event.target));
        const isSubmenu = Array.from(submenus).some(submenu => submenu.contains(event.target));

        if (!isArrow && !isSubmenu) {
            submenus.forEach(submenu => {
                submenu.classList.add('hidden'); // Hide all submenus
            });

            arrows.forEach(arrow => {
                arrow.classList.remove('open'); // Reset arrow rotation
            });
        }
    });

    // Close submenu when a submenu item is clicked on PC
    links.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth > 768) { // Only apply on PC views
                const submenu = link.closest('.submenu'); // Find the submenu containing the link
                if (submenu) {
                    submenu.classList.add('hidden'); // Hide the submenu
                    const arrow = submenu.previousElementSibling; // Get the corresponding arrow
                    if (arrow && arrow.classList.contains('arrow')) {
                        arrow.classList.remove('open'); // Reset arrow rotation
                    }
                }
            }
        });
    });
});