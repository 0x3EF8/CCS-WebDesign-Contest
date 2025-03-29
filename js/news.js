document.addEventListener("DOMContentLoaded", () => {
  // Pagination handling
  const paginationLinks = document.querySelectorAll(".pagination-link")
  const paginationNext = document.querySelector(".pagination-next")

  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all pagination links
      paginationLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // In a real application, you would fetch and display the news for the selected page
      // For this demo, we'll just scroll to the top of the news listing
      const newsListing = document.querySelector(".news-listing")
      newsListing.scrollIntoView({ behavior: "smooth" })
    })
  })

  if (paginationNext) {
    paginationNext.addEventListener("click", (e) => {
      e.preventDefault()

      // Find the currently active page
      const activePage = document.querySelector(".pagination-link.active")
      const activePageNum = Number.parseInt(activePage.textContent)

      // Find the next page if it exists
      const nextPageLink = document.querySelector(`.pagination-link:nth-child(${activePageNum + 1})`)

      if (nextPageLink) {
        // Trigger a click on the next page
        nextPageLink.click()
      }
    })
  }

  // Newsletter subscription handling
  const newsletterForm = document.querySelector(".newsletter-form")
  const newsletterInput = document.querySelector(".newsletter-input")
  const newsletterButton = document.querySelector(".newsletter-button")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (newsletterInput.value.trim() === "") {
        alert("Please enter your email address")
        return
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(newsletterInput.value)) {
        alert("Please enter a valid email address")
        return
      }

      // In a real application, you would submit the form to a server
      // For this demo, we'll just show a success message
      alert("Thank you for subscribing to our newsletter!")
      newsletterInput.value = ""
    })
  }

  // Share functionality
  const shareButtons = document.querySelectorAll(".share-icon")

  shareButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would implement sharing functionality
      // For this demo, we'll just show an alert
      alert("Sharing functionality would be implemented here")
    })
  })
})

