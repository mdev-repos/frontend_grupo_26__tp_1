// =========================================================
// GRUPO 26 · TP1 — matias.js
// Interacción propia del perfil: "Terminal Mainframe".
// Cada botón dispara un comando falso y la respuesta se
// escribe letra por letra (mismo efecto typewriter que la
// portada, pero acá corre por comando, no al cargar la página).
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#mfScreen");
  const buttons = document.querySelectorAll("[data-mf-cmd]");
  if (!screen || !buttons.length) return;

  const RESPONSES = {
    whoami: [
      "> whoami",
      "USER: matias.mazzitelli",
      "ROL: Backend & Mainframe Developer",
      "TAG: PLAYER_05 // Ingeniería de Software"
    ],
    jobs: [
      "> jobs --list",
      "PID   PROCESO               ESTADO",
      "0001  JAVA_SPRING.JAR       RUNNING",
      "0002  MAINFRAME_COBOL.JOB   RUNNING",
      "0003  BACKEND_CORE.SVC      RUNNING",
      "0004  SOFTWARE_ENG.DAEMON   RUNNING"
    ],
    status: [
      "> status",
      "UPTIME: 36 AÑOS // 0 INCIDENTES CRÍTICOS",
      "CARGA DEL SISTEMA: ESTABLE",
      "UBICACIÓN: TABLADA, BUENOS AIRES"
    ],
    wake: [
      "> wake_up",
      "WAKE UP, MATIAS...",
      "THE MAINFRAME HAS YOU.",
      "FOLLOW THE WHITE RABBIT. 🐇"
    ]
  };

  let typingTimer = null;

  function typeLines(lines) {
    clearInterval(typingTimer);
    const fullText = lines.join("\n");
    let i = 0;
    screen.textContent = "";
    typingTimer = setInterval(() => {
      i++;
      screen.textContent = fullText.slice(0, i);
      if (i >= fullText.length) clearInterval(typingTimer);
    }, 16);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-mf-cmd");
      if (RESPONSES[cmd]) typeLines(RESPONSES[cmd]);
    });
  });
});
