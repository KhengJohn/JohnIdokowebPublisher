// Toggle Menu Module
const toggleMenuModule = (() => {
  function toggleMenu() {
    const menu = document.getElementById("menu");
    const hamburgerButton = document.querySelector(".hamburger-button");
    console.log("toggleMenu called");
    menu.classList.toggle("open");
    hamburgerButton.classList.toggle("open");
  }

  function init() {
    document
      .querySelector(".hamburger-button")
      .addEventListener("click", toggleMenu);
  }

  return { init };
})();

// Improved Slider Module with Debugging for goToSlide
const sliderModule = (() => {
  let currentSlide = 0;
  const slideInterval = 10000;
  let intervalId;

  function moveSlide(direction) {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) {
      console.error("No slides found.");
      return;
    }

    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
    restartAutoSlide();
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) {
      console.error("No slides found.");
      return;
    }

    if (index < 0 || index >= slides.length) {
      console.error(`Invalid index ${index} for goToSlide.`);
      return;
    }

    console.log(`Navigating to slide index: ${index}`);
    currentSlide = index;
    updateSlider();
    restartAutoSlide();
  }

  function autoSlide() {
    moveSlide(1);
  }

  function startAutoSlide() {
    intervalId = setInterval(autoSlide, slideInterval);
  }

  function restartAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }

  function updateSlider() {
    const slider = document.querySelector(".slider");
    if (slider) {
      slider.style.transform = `translateX(-${currentSlide * 25}%)`;
      console.log(`Slider moved to slide index: ${currentSlide}`);
    } else {
      console.error("Slider element not found.");
    }

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    } else {
      console.warn(`No dot found for slide index: ${currentSlide}`);
    }
  }

  function init() {
    startAutoSlide();
    updateSlider();
  }

  return { moveSlide, goToSlide, init };
})();

// Fifth Slider Module
const fifthSliderModule = (() => {
  let fifthCurrentSlide = 0;

  function moveFifthSlide(direction) {
    const fifthSlides = document.querySelectorAll(".fifth-slide");
    if (!fifthSlides.length) return;

    const totalFifthSlides = fifthSlides.length;
    fifthCurrentSlide += direction;

    if (fifthCurrentSlide < 0) {
      fifthCurrentSlide = totalFifthSlides - 1;
    } else if (fifthCurrentSlide >= totalFifthSlides) {
      fifthCurrentSlide = 0;
    }

    const slider = document.querySelector(".fifth-slider");
    if (slider) {
      slider.style.transform = `translateX(-${fifthCurrentSlide * 50}%)`;
    }
  }

  function init() {
    document
      .querySelector(".fifth-prev")
      ?.addEventListener("click", () => moveFifthSlide(-1));
    document
      .querySelector(".fifth-next")
      ?.addEventListener("click", () => moveFifthSlide(1));
  }

  return { init };
})();

// Custom Dropdown Module
const dropdownModule = (() => {
  let options, selected, dropdown;

  function handleOutsideClick(event) {
    if (!dropdown.contains(event.target)) {
      options.classList.remove("show-options");
    }
  }

  function toggleOptions() {
    options.classList.toggle("show-options");
  }

  function handleOptionClick(event) {
    if (event.target.classList.contains("dropdown-option")) {
      selected.textContent = event.target.textContent;
      options.classList.remove("show-options");
    }
  }

  function init() {
    dropdown = document.querySelector(".styled-dropdown");
    if (!dropdown) return;

    selected = dropdown.querySelector(".dropdown-selected");
    options = dropdown.querySelector(".dropdown-options");

    selected.addEventListener("click", toggleOptions);
    options.addEventListener("click", handleOptionClick);
    document.addEventListener("click", handleOutsideClick);

    // Cleanup on module unload (if needed)
    return () => {
      selected.removeEventListener("click", toggleOptions);
      options.removeEventListener("click", handleOptionClick);
      document.removeEventListener("click", handleOutsideClick);
    };
  }

  return { init };
})();

// Initialize Swiper
function initializeSwiper() {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "3",
    spaceBetween: 50,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
    },
    breakpoints: {
      968: { slidesPerView: 3.5 },
      0: { slidesPerView: 1.8 },
    }, autoplay: {
      delay: 3000, // Delay between transitions in milliseconds (3 seconds in this example)
      disableOnInteraction: false, // Keeps autoplay running even after user interactions like swiping
    },
  });
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  toggleMenuModule.init();
  sliderModule.init();
  fifthSliderModule.init();
  const cleanupDropdown = dropdownModule.init();
  initializeSwiper();

  const goToSlideButtons = document.querySelectorAll(".go-to-slide-btn");
  // Add click event listeners to each button
  goToSlideButtons.forEach((button, index) => {
    button.addEventListener("click", () => sliderModule.goToSlide(index));
  });
});
