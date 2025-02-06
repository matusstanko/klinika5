document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevents closing when clicking the arrow

            const submenu = this.nextElementSibling;
            const isOpen = submenu.classList.contains('hidden');

            // Close all other submenus
            document.querySelectorAll('.submenu').forEach(menu => menu.classList.add('hidden'));
            document.querySelectorAll('.arrow').forEach(a => {
                a.classList.remove('open');
                a.style.color = ''; // Reset color
                a.style.textShadow = ''; // Remove glow
            });

            // Toggle this submenu
            if (isOpen) {
                submenu.classList.remove('hidden');
                this.classList.add('open');
                this.style.color = '#007BFF'; // Modern blue
                this.style.textShadow = '0 0 8px rgba(0, 123, 255, 0.7)'; // Soft glow effect
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function () {
        document.querySelectorAll('.submenu').forEach(menu => menu.classList.add('hidden'));
        document.querySelectorAll('.arrow').forEach(a => {
            a.classList.remove('open');
            a.style.color = ''; // Reset color
            a.style.textShadow = ''; // Remove glow
        });
    });
});