// =========================================================
// Mobile navigation
// =========================================================
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.classList.toggle("is-open", !isOpen);
    mobileNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("is-menu-open", !isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.classList.remove("is-open");
      mobileNav.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
    });
  });
}

// =========================================================
// FAQ accordion
// =========================================================
document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    item.classList.toggle("is-open");
  });
});

// =========================================================
// Contact form demo feedback
// =========================================================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const existingMessage = contactForm.querySelector(".form-message");
    if (existingMessage) existingMessage.remove();

    const message = document.createElement("p");
    message.className = "form-message";
    message.textContent = "送信デモです。実案件では確認画面または送信処理を接続します。";
    contactForm.appendChild(message);
  });
}
