//import "./styles/index.css";
import mixitup from "mixitup";
import "./styles/index.scss";
import "./images/home.jpg";
import "./images/about.jpg";
import "./images/work1.jpg";
import "./images/work2.jpg";
import "./images/work3.jpg";
import "./images/work4.jpg";
import "./images/work5.jpg";
import "./images/work6.jpg";
import "./images/testimonial1.jpg";
import "./images/testimonial2.jpg";
import "./images/testimonial3.jpg";
import "./js/scripts.js";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

mixitup(".portfolio__container");

/*==== CARRUSEL ====*/

const swiper = new Swiper(".testimonial__container", {
  // Optional parameters
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
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

swiper();

//import "./js/mixitupPagination.js";

//mixitup.use(mixitupPagination);
