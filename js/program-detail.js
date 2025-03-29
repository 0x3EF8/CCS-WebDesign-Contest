document.addEventListener("DOMContentLoaded", () => {
  // Curriculum Year Tabs
  const curriculumTabs = document.querySelectorAll(".curriculum-tab")
  const yearContents = document.querySelectorAll(".year-content")

  if (curriculumTabs.length > 0) {
    curriculumTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        curriculumTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Hide all year contents
        yearContents.forEach((content) => content.classList.remove("active"))

        // Show the selected year content
        const yearNumber = tab.getAttribute("data-year")
        document.getElementById(`year${yearNumber}`).classList.add("active")
      })
    })
  }

  // Smooth scrolling for curriculum links
  document.querySelectorAll('a[href="#curriculum"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()

      const curriculumSection = document.getElementById("curriculum")
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = curriculumSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    })
  })

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".course-card, .career-item, .facility-item, .showcase-item")

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
  document.querySelectorAll(".course-card, .career-item, .facility-item, .showcase-item").forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})

