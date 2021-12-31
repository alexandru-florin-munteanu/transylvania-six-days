"use strict";

// IMAGE CAROUSEL COMPONENT //////////////////

const imgs = document.getElementById("imgs");

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

// Node list
const img = document.querySelectorAll("#imgs img");

let i = 0;

let interval = setInterval(run, 4500);

function run() {
  i++;
  changeImage();
}

function changeImage() {
  if (i > img.length - 1) {
    i = 0;
  } else if (i < 0) {
    i = img.length - 1;
  }
  imgs.style.transform = `translateX(${-i * 48}rem)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 3500);
}

rightBtn.addEventListener("click", () => {
  i++;
  changeImage();
  resetInterval();
});
leftBtn.addEventListener("click", () => {
  i--;
  changeImage();
  resetInterval();
});

// VERTICAL SWITCHER COMPONENT //////////////////////

const switcherContainer = document.querySelector(".switcher-container");
const switchRight = document.querySelector(".right-switch");
const switchLeft = document.querySelector(".left-switch");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");
const switchesLength = switchRight.querySelectorAll("div").length;

let activeSwitchIndex = 0;

switchLeft.style.top = `-${(switchesLength - 1) * 100}vh`;

upButton.addEventListener("click", () => changeSwitch("up"));
downButton.addEventListener("click", () => changeSwitch("down"));

const changeSwitch = (direction) => {
  const switcherHeight = switcherContainer.clientHeight;
  if (direction === "up") {
    activeSwitchIndex++;
    if (activeSwitchIndex > switchesLength - 1) {
      activeSwitchIndex = 0;
    }
  } else if (direction === "down") {
    activeSwitchIndex--;
    if (activeSwitchIndex < 0) {
      activeSwitchIndex = switchesLength - 1;
    }
  }

  switchRight.style.transform = `translateY(-${
    activeSwitchIndex * switcherHeight
  }px)`;
  switchLeft.style.transform = `translateY(${
    activeSwitchIndex * switcherHeight
  }px)`;
};

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

// FAQ Toggle

("use strict");

/*
 *  -> bring in toggle buttons (querySelectorAll)
 *  -> loop through nodelist (forEach)
 *  -> add click event (addEventListener)
 *  -> Toggle the active class on the parent node (.parentNode & .classList.toggle())
 */

const toggleButtons = document.querySelectorAll(".faq__toggle");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentNode.classList.toggle("active");
  });
});
