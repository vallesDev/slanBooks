//Show Menu

export default function showMenu(toggleId, navId) {
  const toogle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toogle && nav) {
    toogle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
}

showMenu("nav-toggle", "nav-menu");

// Remove menu

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==== SCROLL SECTIONS ACTIVE LINK ====*/

const sections = document.querySelectorAll("section[id]");
const scrollActive = (sectionId) => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;

    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", scrollActive);

/*==== Change background header ====*/

function scrollHeader() {
  const header = document.getElementById("header");

  if (this.scrollY >= 200) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*==== Show scroll Top ====*/

function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");

  if (this.scrollY >= 560) {
    scrollTop.classList.add("show-scroll");
  } else {
    header.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollTop);

/*=== Activo filtro*/

const linkPortfolio = document.querySelectorAll(".portfolio__item");

function activePortfolio() {
  if (linkPortfolio) {
    linkPortfolio.forEach((l) => l.classList.remove("active-portfolio"));
    this.classList.add("active-portfolio");
  }
}

linkPortfolio.forEach((l) => l.addEventListener("click", activePortfolio));
