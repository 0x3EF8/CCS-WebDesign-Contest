document.addEventListener("DOMContentLoaded", () => {
  // Tab switching for webinars
  const tabs = document.querySelectorAll(".webinars-tab")
  const tabContents = document.querySelectorAll(".webinars-tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Hide all tab contents
      tabContents.forEach((content) => content.classList.remove("active"))

      // Show the content for the clicked tab
      document.getElementById(tabId + "-webinars").classList.add("active")
    })
  })

  // Webinar modal functionality
  const webinarModal = document.getElementById("webinarModal")
  const webinarModalClose = document.getElementById("webinarModalClose")
  const webinarModalClose2 = document.getElementById("webinarModalClose2")

  // Function to hide webinar modal
  function hideWebinarModal() {
    webinarModal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Event listeners for modal close buttons
  if (webinarModalClose) {
    webinarModalClose.addEventListener("click", hideWebinarModal)
  }

  if (webinarModalClose2) {
    webinarModalClose2.addEventListener("click", hideWebinarModal)
  }

  // Close modal when clicking outside the content
  if (webinarModal) {
    webinarModal.addEventListener("click", (e) => {
      if (e.target === webinarModal) {
        hideWebinarModal()
      }
    })
  }

  // Video modal functionality
  const videoLinks = document.querySelectorAll(".view-recording-link")
  const videoModal = document.getElementById("webinarVideoModal")
  const videoModalClose = document.getElementById("webinarVideoClose")
  const videoContainer = document.getElementById("webinarVideoContainer")
  const videoTitle = document.getElementById("webinarVideoTitle")

  videoLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const videoId = link.getAttribute("data-video")
      const title = link.getAttribute("data-title")

      videoTitle.textContent = title
      videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" title="${title}" allowfullscreen></iframe>`

      videoModal.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  })

  videoModalClose.addEventListener("click", () => {
    videoModal.classList.remove("active")
    document.body.style.overflow = ""
    videoContainer.innerHTML = ""
  })

  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("active")
      document.body.style.overflow = ""
      videoContainer.innerHTML = ""
    }
  })

  // Registration form handling
  const registrationForm = document.getElementById("webinarRegistrationForm")

  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const webinar = document.getElementById("webinar").value

      if (!name || !email || !webinar) {
        alert("Please fill in all required fields")
        return
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // In a real application, you would submit the form to a server
      alert("Thank you for registering! You will receive a confirmation email with webinar details.")
      registrationForm.reset()
    })
  }
})

