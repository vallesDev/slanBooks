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
import "./js/animate.js";
import animate from "./js/animate.js";
mixitup(".portfolio__container");
animate();

/*==== CARRUSEL ====*/

const mySwiper = new Swiper(".testimonial__container", {
  spaceBetween: 16,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

mySwiper();
