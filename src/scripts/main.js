// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Only handle links that point to sections on the same page
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add active class to current navigation item
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Мобильное меню
  const navbarToggle = document.querySelector(".navbar__toggle");
  const navbarMenu = document.querySelector(".navbar__menu");

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", function () {
      navbarMenu.classList.toggle("navbar__menu--active");
      navbarToggle.classList.toggle("navbar__toggle--active");
    });
  }

  // Закрытие меню при клике вне его области
  document.addEventListener("click", function (event) {
    if (navbarMenu && navbarMenu.classList.contains("navbar__menu--active")) {
      if (
        !navbarMenu.contains(event.target) &&
        !navbarToggle.contains(event.target)
      ) {
        navbarMenu.classList.remove("navbar__menu--active");
        navbarToggle.classList.remove("navbar__toggle--active");
      }
    }
  });
});
