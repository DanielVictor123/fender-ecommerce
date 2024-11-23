"use strict";

// Fetch a random image from Unsplash
async function fetchRandomImage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?query=fashion&client_id=4X7ioGCbS9HV4Tv3kE-w9xYzdMS4BHiiTjaN2wrr7AI"
  );
  const data = await response.json();
  document.getElementById("modal-image").src = data.urls.small;
}

// Show success modal
function showSuccessModal() {
  document.getElementById("success-modal").style.display = "block"; 
}

// Sparkles effect
function showSparkles() {
  const sparkles = document.createElement("div");
  sparkles.className = "sparkles";
  document.body.appendChild(sparkles);
  // Add animation or styling to sparkles
  setTimeout(() => {
    document.body.removeChild(sparkles);
  }, 2000); // Remove sparkles after 2 seconds
}

// Modal event listeners
document.addEventListener("DOMContentLoaded", () => {
  fetchRandomImage(); // Fetch image on page load

  const modal = document.querySelector("[data-modal]");
  const modalCloseBtn = document.querySelector("[data-modal-close]");
  const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

  modalCloseOverlay.addEventListener("click", () =>
    modal.classList.add("closed")
  );
  modalCloseBtn.addEventListener("click", () => modal.classList.add("closed"));

  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = newsletterForm.email.value; // Get the email input value

    // Send email notification to the server
    try {
      const response = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      if (response.ok) {
        showSparkles(); // Show sparkles
        showSuccessModal(); // Show success modal
        modal.classList.add("closed"); // Hide the newsletter modal
        newsletterForm.reset(); // Reset the form
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  const successModalCloseBtn = document.getElementById("success-modal-close");
  successModalCloseBtn.addEventListener("click", () => {
    document.getElementById("success-modal").style.display = "none";
  });
});

// notification toast variables
const notificationToast = document.querySelector("[data-toast]");
const toastCloseBtn = document.querySelector("[data-toast-close]");

// notification toast eventListener
toastCloseBtn.addEventListener("click", function () {
  notificationToast.classList.add("closed");
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll(
  "[data-mobile-menu-open-btn]"
);
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll(
  "[data-mobile-menu-close-btn]"
);
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove("active");
    overlay.classList.remove("active");
  };

  mobileMenuOpenBtn[i].addEventListener("click", function () {
    mobileMenu[i].classList.add("active");
    overlay.classList.add("active");
  });

  mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
  overlay.addEventListener("click", mobileMenuCloseFunc);
}

// accordion variables
const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordion = document.querySelectorAll("[data-accordion]");

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener("click", function () {
    const clickedBtn = this.nextElementSibling.classList.contains("active");

    for (let i = 0; i < accordion.length; i++) {
      if (clickedBtn) break;

      if (accordion[i].classList.contains("active")) {
        accordion[i].classList.remove("active");
        accordionBtn[i].classList.remove("active");
      }
    }

    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("active");
  });
}
