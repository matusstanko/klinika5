document.addEventListener("DOMContentLoaded", function () {
    // =====================
    // 1) SUBMENU TOGGLING
    // =====================
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents closing when clicking the arrow
  
        const submenu = this.nextElementSibling;
        const isOpen = submenu.classList.contains("hidden");
  
        // Close all other submenus
        document.querySelectorAll(".submenu").forEach((menu) => menu.classList.add("hidden"));
        document.querySelectorAll(".arrow").forEach((a) => {
          a.classList.remove("open");
          a.style.color = "";      // Reset color
          a.style.textShadow = ""; // Remove glow
        });
  
        // Toggle this submenu
        if (isOpen) {
          submenu.classList.remove("hidden");
          this.classList.add("open");
          this.style.color = "#007BFF"; // Modern blue
          this.style.textShadow = "0 0 8px rgba(0, 123, 255, 0.7)"; // Soft glow effect
        }
      });
    });
  
    // Close menu when clicking outside
    document.addEventListener("click", function () {
      document.querySelectorAll(".submenu").forEach((menu) => menu.classList.add("hidden"));
      document.querySelectorAll(".arrow").forEach((a) => {
        a.classList.remove("open");
        a.style.color = "";      // Reset color
        a.style.textShadow = ""; // Remove glow
      });
    });
  
    // ============================
    // 2) SCROLL-BASED ACTIVE LINKS
    // ============================
    const sections = document.querySelectorAll("#sluzby, #reviews, #personal, #technologie, #clinic-gallery, #kontakt");
    const navLinks = document.querySelectorAll(".nav-links-container a");
  
    let isAutoScrolling = false; // skip highlight while auto-scrolling
  
    // Watch for nav clicks => disable highlight temporarily
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        isAutoScrolling = true;
        setTimeout(() => {
          isAutoScrolling = false;
        }, 700);
      });
    });
  
    function setActiveLink(sectionId) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const foundLink = document.querySelector(`.nav-links-container a[href="#${sectionId}"]`);
      if (foundLink) {
        foundLink.classList.add("active");
      }
    }
  
    function onScroll() {
      if (isAutoScrolling) return; // skip while auto-scrolling
  
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
  
      // 1) If near bottom, force kontakt link
      if (scrollPos + windowHeight >= docHeight - 5) {
        setActiveLink("kontakt");
        return;
      }
  
      // 2) Otherwise, highlight by offset
      const offsetScroll = scrollPos + 100; // offset
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (offsetScroll >= top && offsetScroll < top + height) {
          setActiveLink(section.id);
        }
      });
    }
  
    // Listen for scroll + run once on load
    window.addEventListener("scroll", onScroll);
    onScroll();
  });