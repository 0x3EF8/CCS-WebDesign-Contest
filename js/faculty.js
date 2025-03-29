document.addEventListener("DOMContentLoaded", () => {
  const viewMoreBtn = document.getElementById("viewMoreFaculty")
  const hiddenFaculty = document.querySelectorAll(".hidden-faculty")
  let facultyExpanded = false

  viewMoreBtn.addEventListener("click", () => {
    if (!facultyExpanded) {
      // Show all hidden faculty
      hiddenFaculty.forEach((faculty, index) => {
        setTimeout(() => {
          faculty.classList.add("show")
        }, index * 100) // Stagger the animation
      })
      viewMoreBtn.textContent = "View Less"
      facultyExpanded = true
    } else {
      // Hide faculty
      hiddenFaculty.forEach((faculty) => {
        faculty.classList.remove("show")
      })
      viewMoreBtn.textContent = "View More Faculty"
      facultyExpanded = false

      // Scroll back to faculty section if user has scrolled down
      const facultySection = document.getElementById("faculty")
      const headerHeight = document.querySelector("header").offsetHeight
      const facultyPosition = facultySection.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: facultyPosition,
        behavior: "smooth",
      })
    }
  })
})

