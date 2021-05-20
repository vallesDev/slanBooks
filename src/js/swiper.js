/*==== CARRUSEL ====*/

export const swiper = new Swiper(".testimonial__container", {
  // Optional parameters
  spaceBetween: 16,
  loop: true,
  grabCursor: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    640: {
      slidesPerWiew: 2,
    },
    1024: {
      slidesPerWiew: 2,
    },
  },
});
