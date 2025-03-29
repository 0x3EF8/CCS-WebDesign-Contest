document.addEventListener("DOMContentLoaded", () => {
  setupThemeSwitcher()
  setupLoadingScreen()
  initializeNavigationEvents()
  initializeSmoothScrolling()

  function setupThemeSwitcher() {
    const themeSwitchMobile = document.getElementById("themeSwitchMobile")
    const themeSwitchDesktop = document.getElementById("themeSwitchDesktop")
    const body = document.body

    // Check for saved theme preference or use default (dark)
    const savedTheme = localStorage.getItem("theme") || "dark"
    if (savedTheme === "light") {
      body.classList.add("light-theme")
      themeSwitchMobile.checked = true
      themeSwitchDesktop.checked = true
    } else {
      body.classList.remove("light-theme")
      themeSwitchMobile.checked = false
      themeSwitchDesktop.checked = false
    }

    // Desktop theme switch event listener
    themeSwitchDesktop.addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("light-theme")
        themeSwitchMobile.checked = true
        localStorage.setItem("theme", "light")
      } else {
        body.classList.remove("light-theme")
        themeSwitchMobile.checked = false
        localStorage.setItem("theme", "dark")
      }
    })

    // Sync mobile and desktop theme switches
    themeSwitchMobile.addEventListener("change", function () {
      themeSwitchDesktop.checked = this.checked

      if (this.checked) {
        body.classList.add("light-theme")
        localStorage.setItem("theme", "light")
      } else {
        body.classList.remove("light-theme")
        localStorage.setItem("theme", "dark")
      }
    })
  }

  function setupLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")

    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1500)
  }

  function initializeNavigationEvents() {
    const menuToggle = document.getElementById("menuToggle")
    const navLinks = document.getElementById("navLinks")

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Animate hamburger to X
      const bars = menuToggle.querySelectorAll(".bar")
      bars.forEach((bar) => bar.classList.toggle("active"))

      if (navLinks.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")

          const bars = menuToggle.querySelectorAll(".bar")
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        }
      })
    })
  }

  function initializeSmoothScrolling() {
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

    // Active navigation highlighting
    window.addEventListener("scroll", setActiveNav)
  }

  function setActiveNav() {
    const sections = document.querySelectorAll("section")
    const navLinksItems = document.querySelectorAll(".nav-links a")

    const scrollPosition = window.scrollY
    const headerHeight = document.querySelector("header").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinksItems.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  // News & Events tab switching
  const newsEventsTabs = document.querySelectorAll(".news-events-tab")
  const newsEventsContents = document.querySelectorAll(".news-events-content")

  if (newsEventsTabs.length > 0) {
    newsEventsTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Remove active class from all tabs
        newsEventsTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Hide all contents
        newsEventsContents.forEach((content) => content.classList.remove("active"))

        // Show the selected content
        document.getElementById(tabId + "-content").classList.add("active")
      })
    })
  }
})

// Career Section Tabs
document.addEventListener("DOMContentLoaded", () => {
  const careerNavItems = document.querySelectorAll(".career-nav-item")
  const careerPanels = document.querySelectorAll(".career-panel")

  if (careerNavItems.length > 0) {
    careerNavItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all nav items
        careerNavItems.forEach((navItem) => {
          navItem.classList.remove("active")
        })

        // Add active class to clicked nav item
        this.classList.add("active")

        // Hide all panels
        careerPanels.forEach((panel) => {
          panel.classList.remove("active")
        })

        // Show the corresponding panel
        const careerType = this.getAttribute("data-career")
        document.getElementById(`${careerType}-panel`).classList.add("active")
      })
    })
  }
})

