export default function animate() {
  /*=== GSAP ANIMATION ===*/

  gsap.from(".home__img", { opacity: 0, duration: 2, delay: 0.5, x: 60 });

  gsap.from(".home__data", { opacity: 0, duration: 2, delay: 0.8, y: 25 });

  gsap.from(".home__greeting, .home__name, .home__profession, .home__button", {
    opacity: 0,
    duration: 2,
    delay: 1,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
  });

  gsap.from(".nav__logo, nav__toggle", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
  });

  gsap.from(".nav__item", {
    opacity: 0,
    duration: 2,
    delay: 1.8,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
  });
}
