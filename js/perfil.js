// =========================================================
// GRUPO 26 · TP1 — perfil.js
// Interacción dinámica de cada perfil: "ESCANEAR HABILIDADES"
// Anima las barras de skill con los valores propios de cada
// integrante (definidos en data-value en cada .skill-fill).
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.querySelector("[data-scan]");
  const fills = document.querySelectorAll(".skill-fill");
  const values = document.querySelectorAll(".skill-value");

  if (!scanBtn || !fills.length) return;

  function resetScan() {
    fills.forEach((f) => (f.style.width = "0%"));
    values.forEach((v) => (v.textContent = "0%"));
  }

  function runScan() {
    resetScan();
    fills.forEach((fill, i) => {
      const target = fill.getAttribute("data-value") || "0";
      // pequeño retraso escalonado para efecto de "escaneo"
      setTimeout(() => {
        fill.style.width = target + "%";
        if (values[i]) values[i].textContent = target + "%";
      }, i * 150);
    });
    scanBtn.textContent = "[ RE-ESCANEAR ]";
  }

  resetScan();
  scanBtn.addEventListener("click", runScan);
});
