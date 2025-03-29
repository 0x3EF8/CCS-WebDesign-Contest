document.addEventListener("DOMContentLoaded", () => {
  const testimonialSlider = document.getElementById("testimonialSlider")
  const testimonialSlides = testimonialSlider.querySelectorAll(".testimonial-slide")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const dots = document.querySelectorAll(".dot")
  let currentSlide = 0

  function showSlide(index) {
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    testimonialSlides[index].classList.add("active")
    dots[index].classList.add("active")
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    showSlide(currentSlide)
  }

  nextBtn.addEventListener("click", nextSlide)
  prevBtn.addEventListener("click", prevSlide)

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = Number.parseInt(this.getAttribute("data-index"))
      currentSlide = slideIndex
      showSlide(currentSlide)
    })
  })

  // Auto-advance testimonials
  let testimonialInterval = setInterval(nextSlide, 5000)

  // Pause auto-advance on hover
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval)
  })

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(nextSlide, 5000)
  })
})

