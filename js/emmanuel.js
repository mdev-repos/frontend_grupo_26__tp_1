document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#lightbox");
  if (!modal) return;
  const img = modal.querySelector("img");
  const caption = modal.querySelector("figcaption");
  const closeBtn = modal.querySelector("[data-close]");
  let lastFocus = null;

  function open(card) {
    const pic = card.querySelector("img");
    const title = card.querySelector("h3");
    if (!pic || !pic.src) return;
    img.src = pic.src;
    img.alt = pic.alt;
    caption.textContent = title ? title.textContent : pic.alt;
    lastFocus = card;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".media-card").forEach((card) => {
    const title = card.querySelector("h3");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Ampliar ${title ? title.textContent : "imagen"}`);
    card.addEventListener("click", () => open(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(card);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });
});
