document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value
      let isValid = true

      if (name.trim() === "") {
        isValid = false
        alert("Please enter your name")
      } else if (email.trim() === "" || !isValidEmail(email)) {
        isValid = false
        alert("Please enter a valid email address")
      } else if (message.trim() === "") {
        isValid = false
        alert("Please enter your message")
      }

      if (isValid) {
        // In a real application, you would send the form data to a server
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
      }
    })
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
})

