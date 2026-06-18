// =========================================================
// Mobile navigation
// =========================================================
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  const mobileMenuQuery = window.matchMedia("(max-width: 1080px)");
  const mobileNavLinks = [...mobileNav.querySelectorAll("a")];

  const setMenuState = (isOpen, returnFocus = false) => {
    const shouldOpen = isOpen && mobileMenuQuery.matches;

    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    menuButton.setAttribute("aria-label", shouldOpen ? "メニューを閉じる" : "メニューを開く");
    menuButton.classList.toggle("is-open", shouldOpen);
    mobileNav.classList.toggle("is-open", shouldOpen);
    mobileNav.setAttribute("aria-hidden", String(!shouldOpen));
    mobileNav.inert = !shouldOpen;
    document.body.classList.toggle("is-menu-open", shouldOpen);

    if (shouldOpen) {
      mobileNavLinks[0]?.focus();
    } else if (returnFocus) {
      menuButton.focus();
    }
  };

  setMenuState(false);

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (event.key === "Escape" && isOpen) setMenuState(false, true);
  });

  mobileMenuQuery.addEventListener("change", () => setMenuState(false));
}

// =========================================================
// FAQ accordion
// =========================================================
document.querySelectorAll(".faq-item > button").forEach((button, index) => {
  const item = button.closest(".faq-item");
  const panel = button.nextElementSibling;
  if (!item || !panel) return;

  const buttonId = button.id || `faq-button-${index + 1}`;
  const panelId = panel.id || `faq-panel-${index + 1}`;

  button.id = buttonId;
  panel.id = panelId;
  button.setAttribute("aria-controls", panelId);
  button.setAttribute("aria-expanded", "false");
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-labelledby", buttonId);
  panel.setAttribute("aria-hidden", "true");

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    item.classList.toggle("is-open", !isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
    panel.setAttribute("aria-hidden", String(isOpen));
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
    message.setAttribute("tabindex", "-1");
    message.textContent = "入力内容を確認しました。デモサイトのため、実際の送信は行われません。";
    contactForm.appendChild(message);
    message.focus();
  });
}
