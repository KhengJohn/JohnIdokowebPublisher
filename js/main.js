document.addEventListener('DOMContentLoaded', () => { function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburgerButton = document.querySelector('.hamburger-button');
  
    // Toggle the menu visibility
    menu.classList.toggle('open');
  
    // Toggle the hamburger lines transformation
    hamburgerButton.classList.toggle('open');
  }
  
  let currentSlide = 0;
  const slideInterval = 10000; // Slide duration in milliseconds
  let intervalId;
  
  // Function to move to the next or previous slide
  function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
    restartAutoSlide();
  }
  
  // Function to go directly to a specific slide
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    restartAutoSlide();
  }
  
  // Function to automatically advance slides
  function autoSlide() {
    moveSlide(1);
  }
  
  // Start automatic slide transition
  function startAutoSlide() {
    intervalId = setInterval(autoSlide, slideInterval);
  }
  
  // Clear and restart automatic slide
  function restartAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }
  
  // Function to update the slider and active pagination dot
  function updateSlider() {
    document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 25}%)`;
  
    // Update active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }
  
  // Initialize auto slide on page load and set the first dot as active
  startAutoSlide();
  updateSlider();
   
    let fifthCurrentSlide = 0; // Renamed to avoid conflict with other sliders
  
    function moveFifthSlide(direction) { // Renamed to distinguish this function
      const fifthSlides = document.querySelectorAll('.fifth-slide'); // Renamed for clarity
      const totalFifthSlides = fifthSlides.length; // Renamed to avoid conflicts
  
      fifthCurrentSlide += direction;
  
      if (fifthCurrentSlide < 0) {
        fifthCurrentSlide = totalFifthSlides - 1;
      } else if (fifthCurrentSlide >= totalFifthSlides) {
        fifthCurrentSlide = 0;
      }
  
      document.querySelector('.fifth-slider').style.transform = `translateX(-${fifthCurrentSlide * 50}%)`;
    }
  
    // Event listeners for fifth slider pagination buttons
    document.querySelector('.fifth-prev').addEventListener('click', () => moveFifthSlide(-1));
    document.querySelector('.fifth-next').addEventListener('click', () => moveFifthSlide(1));
    
    const dropdown = document.querySelector('.styled-dropdown');
const selected = dropdown.querySelector('.dropdown-selected');
const options = dropdown.querySelector('.dropdown-options');

selected.addEventListener('click', () => {
  options.classList.toggle('show-options');
});

options.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown-option')) {
    selected.textContent = event.target.textContent;
    options.classList.remove('show-options');
  }
});

// Close dropdown if clicked outside
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    options.classList.remove('show-options');
  }
});
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow", // Change this to other effects like 'slide' if you prefer
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
    } , breakpoints: {
        968: { // When the viewport is 768px or larger (e.g., tablets and up)
          slidesPerView: 3.5,
        },
        0: { // Default settings for smaller screens
          slidesPerView: 1.8,
        }
      }
  });
  });
  
  