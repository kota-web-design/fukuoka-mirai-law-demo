// =========================================================
// Mobile navigation
// =========================================================
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  const setMenuState = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    menuButton.classList.toggle("is-open", isOpen);
    mobileNav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("is-menu-open", isOpen);
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
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
// Contact form feedback
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
    message.setAttribute("role", "status");
    message.textContent = "お問い合わせ内容を受け付けました。内容を確認のうえ、担当者よりご連絡いたします。";
    contactForm.appendChild(message);
    contactForm.reset();
  });
}
