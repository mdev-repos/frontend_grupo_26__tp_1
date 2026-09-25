// GRUPO 26 · TP1 — emmanuel.js (complemento propio)
// Lightbox: click en una media-card la abre en grande; cierra con Esc,
// botón o click fuera. No toca main.js ni perfil.js.
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#lightbox");
  if (!modal) return;
  const img = modal.querySelector("img");
  const caption = modal.querySelector("figcaption");
  const closeBtn = modal.querySelector("[data-close]");
  let lastFocus = null;

  function open(src, alt, title) {
    img.src = src;
    img.alt = alt;
    caption.textContent = title;
    lastFocus = document.activeElement;
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
    card.addEventListener("click", () => {
      const pic = card.querySelector("img");
      const title = card.querySelector("h3");
      if (!pic || !pic.src) return;
      open(pic.src, pic.alt, title ? title.textContent : pic.alt);
    });
  });

  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
});
