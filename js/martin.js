/* martin.js — Interacción con películas y discos favoritos (solo JS, sin estilos) */
(function () {
  'use strict';

  // Config de cada sección: texto del h2 a buscar y mensajes
  const SECCIONES = [
    {
      buscar: 'películas',
      mensaje: (t, d) => `🎬 Esta noche vemos: ${t} (${d})`,
      vacio: '// Elegí una película o dejá que el azar decida',
      boton: '[ PELÍCULA AL AZAR ]'
    },
    {
      buscar: 'discos',
      mensaje: (t, d) => `🎧 Ahora sonando: ${t} — ${d}`,
      vacio: '// Elegí un disco o dejá que el azar decida',
      boton: '[ DISCO AL AZAR ]'
    }
  ];

  SECCIONES.forEach(sec => {
    const h2 = Array.from(document.querySelectorAll('h2'))
      .find(h => h.textContent.toLowerCase().includes(sec.buscar));
    if (!h2) return;

    const grid = h2.nextElementSibling;
    if (!grid || !grid.classList.contains('media-grid')) return;

    const cards = Array.from(grid.querySelectorAll('.media-card'));

    // Panel de texto + botón de azar (usa la clase .btn que ya existe en tu sitio)
    const panel = document.createElement('p');
    panel.setAttribute('aria-live', 'polite');
    panel.textContent = sec.vacio;

    const btnAzar = document.createElement('button');
    btnAzar.type = 'button';
    btnAzar.className = 'btn';
    btnAzar.textContent = sec.boton;

    grid.after(panel);
    panel.after(btnAzar);

    function seleccionar(card) {
      cards.forEach(c => {
        c.classList.remove('seleccionada');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('seleccionada');
      card.setAttribute('aria-pressed', 'true');

      const titulo = card.querySelector('h3').textContent.trim();
      const detalle = card.querySelector('p').textContent.trim();
      panel.textContent = sec.mensaje(titulo, detalle);
    }

    function deseleccionar(card) {
      card.classList.remove('seleccionada');
      card.setAttribute('aria-pressed', 'false');
      panel.textContent = sec.vacio;
    }

    cards.forEach(card => {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');

      const alternar = () => {
        card.classList.contains('seleccionada') ? deseleccionar(card) : seleccionar(card);
      };
      card.addEventListener('click', alternar);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          alternar();
        }
      });
    });

    // Elegir al azar con una mini "ruleta": recorre las tarjetas y frena en una
    btnAzar.addEventListener('click', () => {
      btnAzar.disabled = true;
      const meta = Math.floor(Math.random() * cards.length);
      let paso = 0;
      const total = cards.length * 3 + meta;

      const timer = setInterval(() => {
        seleccionar(cards[paso % cards.length]);
        paso++;
        if (paso > total) {
          clearInterval(timer);
          btnAzar.disabled = false;
        }
      }, 150);
    });
  });
})();