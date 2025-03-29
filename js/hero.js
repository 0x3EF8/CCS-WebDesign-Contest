document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero")
  const imageBlocks = document.querySelectorAll(".img-effect .block")

  if (imageBlocks.length > 0 && heroSection) {
    // Initial animation on page load
    imageBlocks.forEach((block, index) => {
      block.style.opacity = "0"
      block.style.transform = "translateY(20px)"

      setTimeout(
        () => {
          block.style.transition = "opacity 0.8s ease, transform 0.8s ease"
          block.style.opacity = "1"
          block.style.transform = "translateY(0)"
        },
        300 + index * 200,
      )
    })

    // Parallax effect on mouse move
    window.addEventListener("mousemove", (e) => {
      // Only apply effect if not on mobile
      if (window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth
        const mouseY = e.clientY / window.innerHeight

        // Calculate movement based on mouse position
        imageBlocks.forEach((block, index) => {
          const blockRect = block.getBoundingClientRect()
          const blockCenterX = blockRect.left + blockRect.width / 2
          const blockCenterY = blockRect.top + blockRect.height / 2

          const offsetX = ((e.clientX - blockCenterX) / 30) * (index === 1 ? 0.8 : 0.4)
          const offsetY = ((e.clientY - blockCenterY) / 30) * 0.4

          // Apply smooth transform
          block.style.transition = "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
          block.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`
        })

        // Subtle background parallax
        const heroOffset = (mouseX - 0.5) * 20
        heroSection.style.backgroundPositionX = `calc(50% + ${heroOffset}px)`
      }
    })

    // Reset positioning when mouse leaves
    heroSection.addEventListener("mouseleave", () => {
      imageBlocks.forEach((block) => {
        block.style.transition = "transform 0.8s ease"
        block.style.transform = "translateX(0) translateY(0)"
      })

      heroSection.style.backgroundPositionX = "50%"
    })

    // Add scroll effect
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
      const heroHeight = heroSection.offsetHeight
      const scrollRatio = scrollPosition / heroHeight

      if (scrollRatio <= 1) {
        imageBlocks.forEach((block, index) => {
          const translateY = scrollPosition * (0.1 + index * 0.05)
          const currentTransform = block.style.transform || ""

          // Extract existing translateX if any
          const translateXMatch = currentTransform.match(/translateX$$([^)]+)$$/)
          const translateX = translateXMatch ? translateXMatch[1] : "0px"

          block.style.transform = `translateX(${translateX}) translateY(${translateY}px)`
        })
      }
    })
  }
})

