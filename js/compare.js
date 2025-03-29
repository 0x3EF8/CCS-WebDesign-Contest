document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality for comparison sections
  const comparisonTabs = document.querySelectorAll(".comparison-tab")
  const tabContents = document.querySelectorAll(".comparison-tab-content")

  if (comparisonTabs.length > 0) {
    comparisonTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        comparisonTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Hide all tab contents
        tabContents.forEach((content) => content.classList.remove("active"))

        // Show the selected tab content
        const tabId = tab.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".comparison-row, .career-comparison-item, .overlap-career-item, .unique-course-list li",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  document
    .querySelectorAll(".comparison-row, .career-comparison-item, .overlap-career-item, .unique-course-list li")
    .forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

