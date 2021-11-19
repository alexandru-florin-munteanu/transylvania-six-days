// ABOUT-RULES ELEMENTS - Tabbed Components
const tabs = document.querySelectorAll(".rules__tab");
const tabsContainer = document.querySelector(".rules__tab-container");
const tabsContent = document.querySelectorAll(".rules__content");

// Tabbed Component functionality

tabsContainer.addEventListener("click", function (e) {
  // Span bug fix + makes event delegation easier
  const clicked = e.target.closest(".rules__tab");
  if (!clicked) return;

  // Removing active classes from previously clicked links

  tabs.forEach((t) => t.classList.remove("rules__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("rules__content--active"));

  // Activating tab and content area
  clicked.classList.add("rules__tab--active");

  document
    .querySelector(`.rules__content--${clicked.dataset.tab}`)
    .classList.add("rules__content--active");
});

// SLIDER COMPONENT

const slider = function () {
  //  Elements
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const slider = document.querySelector(".slider");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  //   Functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (curSlide) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  };

  //   Next Slide function

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  //   Moving to previous Slide

  const previousSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  // Dots event listeners
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
