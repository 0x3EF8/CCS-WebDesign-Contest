document.addEventListener("DOMContentLoaded", () => {
  // Tab switching for events
  const tabs = document.querySelectorAll(".events-tab")
  const tabContents = document.querySelectorAll(".events-tab-content")

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
      document.getElementById(tabId + "-events").classList.add("active")
    })
  })

  // Event modal functionality
  const eventModal = document.getElementById("eventModal")
  const eventModalClose = document.getElementById("eventModalClose")
  const eventModalClose2 = document.getElementById("eventModalClose2")

  // Function to hide event modal
  function hideEventModal() {
    eventModal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Event listeners for modal close buttons
  if (eventModalClose) {
    eventModalClose.addEventListener("click", hideEventModal)
  }

  if (eventModalClose2) {
    eventModalClose2.addEventListener("click", hideEventModal)
  }

  // Close modal when clicking outside the content
  if (eventModal) {
    eventModal.addEventListener("click", (e) => {
      if (e.target === eventModal) {
        hideEventModal()
      }
    })
  }
})

