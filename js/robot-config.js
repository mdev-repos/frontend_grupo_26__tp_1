/* ============================================================
   robot-config.js
   Grupo 26 · TP1 — Configurador de robot (motor / sensor / driver / control)
   Permite elegir un componente por categoría y valida en vivo si la
   combinación elegida es compatible a nivel hardware, mostrando un
   reporte estilo terminal cyberpunk antes de "ensamblar" el build.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. Datos de cada componente ---------- */
  const RC_DATA = {
    motor: {
      cc: {
        label: "Motor de corriente continua",
        info: "6-12V · gira en ambos sentidos invirtiendo polaridad."
      },
      servo: {
        label: "Servomotor",
        info: "4.8-6V · se posiciona por señal PWM, no por polaridad."
      },
      paso: {
        label: "Motor paso a paso",
        info: "5-12V · avanza en pasos secuenciando bobinas."
      }
    },
    sensor: {
      ultrasonico: {
        label: "Sensor ultrasónico (HC-SR04)",
        info: "Digital · usa 2 pines (trigger/echo) para medir distancia."
      },
      retroreflexivo: {
        label: "Sensor retroreflexivo",
        info: "Digital · detecta objetos por reflexión de luz infrarroja."
      },
      cny70: {
        label: "Sensor CNY70 de piso",
        info: "Analógico/digital · detecta líneas o cambios de superficie."
      },
      brujula: {
        label: "Brújula / giróscopo",
        info: "I2C · entrega orientación e inercia por bus de datos."
      }
    },
    driver: {
      l298: {
        label: "Driver L298",
        info: "Puente H doble · soporta motores DC o un paso a paso bipolar.",
        motoresOk: ["cc", "paso"]
      },
      rele: {
        label: "Módulo de relé",
        info: "Conmutación on/off · no controla velocidad ni sentido por sí solo.",
        motoresOk: ["cc"]
      },
      l293: {
        label: "Driver L293",
        info: "Puente H doble en formato DIP, menor corriente que el L298.",
        motoresOk: ["cc", "paso"]
      },
      "shield-l293": {
        label: "Shield L293",
        info: "Puente H doble en formato shield, se monta sobre la placa.",
        motoresOk: ["cc", "paso"],
        requiereShield: true
      }
    },
    control: {
      uno: { label: "Arduino Uno", analogicas: 6, soportaShield: true, logica: "5V" },
      nano: { label: "Arduino Nano", analogicas: 8, soportaShield: false, logica: "5V" },
      mega: { label: "Arduino Mega", analogicas: 16, soportaShield: true, logica: "5V" },
      nodemcu: { label: "NodeMCU (ESP8266)", analogicas: 1, soportaShield: false, logica: "3.3V" }
    }
  };

  /* ---------- 2. Estado de la selección actual ---------- */
  const state = { motor: null, sensor: null, driver: null, control: null };

  const readout = document.querySelector("[data-readout]");
  const groups = document.querySelectorAll(".rc-options");

  if (!readout || groups.length === 0) return; // esta página no tiene el configurador

  /* ---------- 3. Selección de chips (una opción activa por grupo) ---------- */
  groups.forEach((group) => {
    const key = group.getAttribute("data-options");
    group.addEventListener("click", (event) => {
      const chip = event.target.closest(".rc-chip");
      if (!chip) return;

      group.querySelectorAll(".rc-chip").forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");

      state[key] = chip.getAttribute("data-value");
    });
  });

  /* ---------- 4. Reglas de compatibilidad ---------- */
  function evaluarBuild() {
    const mensajes = [];
    const motor = RC_DATA.motor[state.motor];
    const sensor = RC_DATA.sensor[state.sensor];
    const driver = RC_DATA.driver[state.driver];
    const control = RC_DATA.control[state.control];

    // Motor <-> Driver
    if (state.motor === "servo") {
      mensajes.push({
        nivel: "warn",
        texto: "El servomotor no necesita un driver de potencia: se controla directo con una señal PWM de la placa. Podés omitir el " + driver.label + "."
      });
    } else if (!driver.motoresOk.includes(state.motor)) {
      mensajes.push({
        nivel: "error",
        texto: driver.label + " no puede manejar un " + motor.label.toLowerCase() + ". Un relé simple solo enciende/apaga y no secuencia bobinas ni invierte giro."
      });
    } else {
      mensajes.push({
        nivel: "ok",
        texto: driver.label + " es compatible con " + motor.label.toLowerCase() + "."
      });
    }

    // Driver <-> Placa de control (montaje físico del shield)
    if (driver.requiereShield && !control.soportaShield) {
      mensajes.push({
        nivel: "error",
        texto: "El " + driver.label + " se monta físicamente sobre el header de Arduino Uno/Mega; no entra en " + control.label + ". Usá el L298 o L293 sueltos, conectados por cable."
      });
    }

    // Driver <-> nivel lógico de la placa
    if (control.logica === "3.3V" && (state.driver === "l298" || state.driver === "l293" || state.driver === "shield-l293")) {
      mensajes.push({
        nivel: "warn",
        texto: control.label + " trabaja a lógica 3.3V y el " + driver.label + " espera 5V en sus entradas. Vas a necesitar un conversor de nivel entre ambos."
      });
    }

    // Sensor <-> Placa de control
    if (state.sensor === "cny70" && control.analogicas <= 1) {
      mensajes.push({
        nivel: "warn",
        texto: control.label + " tiene una sola entrada analógica disponible; si sumás otro sensor analógico vas a tener conflicto de pines."
      });
    } else {
      mensajes.push({
        nivel: "ok",
        texto: sensor.label + " es compatible con " + control.label + "."
      });
    }

    // Nota de alimentación según el motor
    if (state.motor === "cc" || state.motor === "paso") {
      mensajes.push({
        nivel: "info",
        texto: "Usá una fuente externa para alimentar el " + motor.label.toLowerCase() + "; no lo alimentes desde el 5V de la placa."
      });
    } else {
      mensajes.push({
        nivel: "info",
        texto: "Un servo chico (tipo SG90) puede alimentarse desde el 5V de la placa; servos más grandes necesitan fuente aparte."
      });
    }

    return mensajes;
  }

  function calcularVeredicto(mensajes) {
    if (mensajes.some((m) => m.nivel === "error")) {
      return { clase: "error", texto: "CONFLICTO DE HARDWARE DETECTADO" };
    }
    if (mensajes.some((m) => m.nivel === "warn")) {
      return { clase: "warn", texto: "BUILD VIABLE CON ADVERTENCIAS" };
    }
    return { clase: "ok", texto: "COMPILACIÓN EXITOSA" };
  }

  /* ---------- 5. Render del reporte ---------- */
  function renderReadout() {
    const faltantes = Object.keys(state).filter((k) => !state[k]);
    if (faltantes.length > 0) {
      readout.innerHTML =
        '<h3>// Reporte de ensamblaje</h3>' +
        '<p class="rc-check-error">✗ Faltan seleccionar: ' + faltantes.join(", ") + "</p>";
      readout.hidden = false;
      requestAnimationFrame(() => readout.classList.add("is-visible"));
      return;
    }

    const mensajes = evaluarBuild();
    const veredicto = calcularVeredicto(mensajes);

    const iconClase = { ok: "rc-check-ok", warn: "rc-check-warn", error: "rc-check-error", info: "rc-check-info" };

    const listaBuild = `
      <li><strong>Motor:</strong> ${RC_DATA.motor[state.motor].label} — ${RC_DATA.motor[state.motor].info}</li>
      <li><strong>Sensor:</strong> ${RC_DATA.sensor[state.sensor].label} — ${RC_DATA.sensor[state.sensor].info}</li>
      <li><strong>Driver:</strong> ${RC_DATA.driver[state.driver].label} — ${RC_DATA.driver[state.driver].info}</li>
      <li><strong>Control:</strong> ${RC_DATA.control[state.control].label}</li>
    `;

    const listaChecks = mensajes
      .map((m) => `<li class="${iconClase[m.nivel]}">${m.texto}</li>`)
      .join("");

    readout.innerHTML = `
      <h3>// Reporte de ensamblaje</h3>
      <ul class="rc-build-list">${listaBuild}</ul>
      <ul class="rc-check-list">${listaChecks}</ul>
      <span class="rc-verdict ${veredicto.clase}">${veredicto.texto}</span>
    `;

    readout.hidden = false;
    readout.classList.remove("is-visible");
    requestAnimationFrame(() => readout.classList.add("is-visible"));
    readout.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------- 6. Botones de acción ---------- */
  const btnBuild = document.querySelector("[data-build]");
  const btnRandom = document.querySelector("[data-random-build]");
  const btnReset = document.querySelector("[data-reset-build]");

  if (btnBuild) btnBuild.addEventListener("click", renderReadout);

  if (btnRandom) {
    btnRandom.addEventListener("click", () => {
      groups.forEach((group) => {
        const key = group.getAttribute("data-options");
        const chips = Array.from(group.querySelectorAll(".rc-chip"));
        const elegido = chips[Math.floor(Math.random() * chips.length)];

        chips.forEach((c) => {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        elegido.classList.add("is-active");
        elegido.setAttribute("aria-pressed", "true");
        state[key] = elegido.getAttribute("data-value");
      });
      renderReadout();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      Object.keys(state).forEach((k) => (state[k] = null));
      groups.forEach((group) => {
        group.querySelectorAll(".rc-chip").forEach((c) => {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
      });
      readout.classList.remove("is-visible");
      readout.hidden = true;
      readout.innerHTML = "";
    });
  }
})();
