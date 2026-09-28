// =========================================================
// GRUPO 26 · TP1 — main.js
// Menú responsive + interacción dinámica de la portada
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  // --- Menú hamburguesa (todas las páginas) ---
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // --- Interacción dinámica de la portada ---
  // 1) Efecto "terminal": el texto de bienvenida se escribe letra por letra.
  // 2) Botón "REINICIAR TRANSMISIÓN": vuelve a tipear el texto y dispara un glitch en el título.
  const heroText = document.querySelector("[data-typewriter]");
  const heroTitle = document.querySelector(".hero h1");
  const replayBtn = document.querySelector("[data-replay]");

  if (heroText) {
    const fullText = heroText.getAttribute("data-typewriter");
    let typingTimer = null;
    let glitchTimer = null;

    function typeText() {
      heroText.innerHTML = '<span class="cursor">&nbsp;</span>';
      let i = 0;
      clearInterval(typingTimer);
      typingTimer = setInterval(() => {
        i++;
        heroText.innerHTML = fullText.slice(0, i) + '<span class="cursor">&nbsp;</span>';
        if (i >= fullText.length) clearInterval(typingTimer);
      }, 12);
    }

    typeText();

    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        typeText();
        if (heroTitle) {
          clearTimeout(glitchTimer);
          heroTitle.classList.remove("is-glitching");
          void heroTitle.offsetWidth;
          heroTitle.classList.add("is-glitching");
          glitchTimer = setTimeout(() => {
            heroTitle.classList.remove("is-glitching");
          }, 1100);
        }
      });
    }
  }

  const autoPickBtn = document.querySelector("[data-autopick]");
  const teamCards = document.querySelectorAll(".team-card");

  function pickCard(card) {
    teamCards.forEach((c) => c.style.borderColor = "");
    card.style.borderColor = "var(--magenta)";
  }

  if (autoPickBtn && teamCards.length) {
    autoPickBtn.addEventListener("click", () => {
      const pick = teamCards[Math.floor(Math.random() * teamCards.length)];
      pickCard(pick);
      pick.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  teamCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      pickCard(card);
    });
  });
});
