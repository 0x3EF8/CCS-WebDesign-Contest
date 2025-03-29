document.addEventListener("DOMContentLoaded", () => {
  initChatAssistant()
  setupFooterVisibilityCheck()
})

function initChatAssistant() {
  const chatToggle = document.getElementById("chatToggle")
  const chatWindow = document.getElementById("chatWindow")
  const chatClose = document.getElementById("chatClose")
  const chatInput = document.getElementById("chatInput")
  const chatSend = document.getElementById("chatSend")
  const chatMessages = document.getElementById("chatMessages")
  const quickQuestions = document.querySelectorAll(".quick-question")

  // FAQ database
  const faqResponses = {
    hello: "Hello! I'm the CCS Tech Assistant. How may I assist you with our Computer Science and IT programs?",
    hi: "Hi there! I'm the CCS Tech Assistant. How may I assist you with our Computer Science and IT programs?",
    hey: "Hello! I'm the CCS Tech Assistant. How may I assist you with our Computer Science and IT programs?",

    "what programs does ccs offer":
      "The College of Computer Studies offers two primary undergraduate programs: BS Computer Science (BSCS) and BS Information Technology (BSIT). Both programs are designed with industry-aligned curricula to prepare students for careers in software development, data science, cybersecurity, and IT infrastructure management.",

    "what are the admission requirements":
      "Admission requirements include: High school diploma or equivalent, completed application form, entrance examination results, and an interview. For specific requirements and deadlines, please contact our admissions office at admissions@ccs.edu or visit the Contact section.",

    "how do cs and it programs differ":
      "Computer Science focuses on computational theory, algorithms, and software engineering with a strong mathematical foundation. Information Technology emphasizes practical application, system administration, and information management. CS is more theory-oriented while IT is more application-focused. You can view a detailed curriculum comparison via the 'Compare Programs' button in the Programs section.",

    "what career opportunities are available":
      "Our graduates pursue careers in: Software Development (Software Engineer, Full-Stack Developer, Mobile App Developer), Data Science & Analytics (Data Scientist, ML Engineer, BI Analyst), Cybersecurity (Security Analyst, Penetration Tester, Security Architect), and IT Management (IT Project Manager, CTO/CIO, DevOps Engineer).",

    default:
      "I don't have specific information about that query in my knowledge base. For more detailed information, please contact our admissions office at admissions@ccs.edu or visit the Contact section of our website.",
  }

  // Toggle chat window visibility
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.add("active")
    chatToggle.classList.add("hidden")

    // Add welcome message if it's the first time opening
    if (chatMessages.children.length === 0) {
      addBotMessage(
        "Hello! I'm the CCS Tech Assistant. How may I help you with information about our Computer Science and IT programs?",
      )
    }
  })

  // Close chat window
  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active")
    chatToggle.classList.remove("hidden")
  })

  // Send message when clicking send button
  chatSend.addEventListener("click", () => {
    sendMessage()
  })

  // Send message when pressing Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Handle quick question buttons
  quickQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.getAttribute("data-question")
      chatInput.value = question
      sendMessage()
    })
  })

  // Function to send a message
  function sendMessage() {
    const message = chatInput.value.trim()

    if (message) {
      // Add user message to chat
      addUserMessage(message)

      // Get and display bot response
      setTimeout(() => {
        const response = getBotResponse(message)
        addBotMessage(response)
      }, 500)

      // Clear input field
      chatInput.value = ""
    }
  }

  // Add a user message to the chat
  function addUserMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.className = "chat-message user-message"
    messageElement.innerHTML = `
      <div class="message-content">${message}</div>
      <div class="message-time">${getCurrentTime()}</div>
    `

    chatMessages.appendChild(messageElement)
    scrollToBottom()
  }

  // Add a bot message to the chat
  function addBotMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.className = "chat-message bot-message"
    messageElement.innerHTML = `
      <div class="bot-avatar">
        <img src="images/logo/ccs.png" alt="CCS Assistant">
      </div>
      <div class="message-bubble">
        <div class="message-content">${message}</div>
        <div class="message-time">${getCurrentTime()}</div>
      </div>
    `

    // Add typing indicator
    const typingIndicator = document.createElement("div")
    typingIndicator.className = "chat-message bot-message typing-indicator"
    typingIndicator.innerHTML = `
      <div class="bot-avatar">
        <img src="images/logo/ccs.png" alt="CCS Assistant">
      </div>
      <div class="message-bubble">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `

    chatMessages.appendChild(typingIndicator)
    scrollToBottom()

    // Remove typing indicator and add actual message after a delay
    setTimeout(() => {
      chatMessages.removeChild(typingIndicator)
      chatMessages.appendChild(messageElement)
      scrollToBottom()
    }, 1000)
  }

  // Get bot response based on user input
  function getBotResponse(message) {
    // Convert message to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase()

    // Check for greetings
    if (lowerMessage === "hello" || lowerMessage === "hi" || lowerMessage === "hey") {
      return faqResponses[lowerMessage]
    }

    // Check for specific questions in our FAQ database
    for (const key in faqResponses) {
      if (lowerMessage.includes(key)) {
        return faqResponses[key]
      }
    }

    // Check for specific keywords
    if (lowerMessage.includes("program") || lowerMessage.includes("course") || lowerMessage.includes("degree")) {
      return faqResponses["what programs does ccs offer"]
    } else if (
      lowerMessage.includes("admission") ||
      lowerMessage.includes("apply") ||
      lowerMessage.includes("requirements")
    ) {
      return faqResponses["what are the admission requirements"]
    } else if (
      lowerMessage.includes("difference") ||
      lowerMessage.includes("cs vs it") ||
      lowerMessage.includes("compare")
    ) {
      return faqResponses["how do cs and it programs differ"]
    } else if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("work")) {
      return faqResponses["what career opportunities are available"]
    }

    // Default response if no match is found
    return faqResponses["default"]
  }

  // Get current time in HH:MM format
  function getCurrentTime() {
    const now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes

    return `${hours}:${minutes} ${ampm}`
  }

  // Scroll chat to bottom
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight
  }
}

// Function to check if footer is visible and hide/show chat assistant accordingly
function setupFooterVisibilityCheck() {
  const chatAssistant = document.getElementById("chatAssistant")
  const footer = document.querySelector("footer")

  // Initial check
  checkFooterVisibility()

  // Check on scroll
  window.addEventListener("scroll", checkFooterVisibility)

  // Check on window resize
  window.addEventListener("resize", checkFooterVisibility)

  function checkFooterVisibility() {
    if (!chatAssistant || !footer) return

    const footerRect = footer.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // If footer is visible in the viewport
    if (footerRect.top < windowHeight && footerRect.bottom > 0) {
      chatAssistant.classList.add("hidden-near-footer")
    } else {
      chatAssistant.classList.remove("hidden-near-footer")
    }
  }
}

