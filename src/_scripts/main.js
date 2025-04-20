document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.navbar__burger');
  const closeButton = document.querySelector('.navbar__close');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (burgerButton && closeButton && mobileMenu) {
    // Открытие меню
    burgerButton.addEventListener('click', () => {
      mobileMenu.classList.add('is-open');
      burgerButton.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    });

    // Закрытие меню
    closeButton.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burgerButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; // Разблокируем прокрутку
    });

    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('.navbar__link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burgerButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('is-open');
        burgerButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});
