# TP1 · Grupo 26 — Sitio web grupal (estética Cyberpunk 2077)

Sitio web del equipo 26 para el Trabajo Práctico Grupal 1 de Desarrollo de Sistemas Web (Front End, 2026).
Portada con presentación del equipo, un perfil individual por integrante y bitácora del proceso.
Hecho con HTML, CSS y JavaScript puro, sin frameworks ni build step.

## Integrantes del equipo 26

- Maximo — [PereiraMax](https://github.com/PereiraMax)
- Julian — [juliganSW](https://github.com/juliganSW)
- Martin — [martin-2t](https://github.com/martin-2t)
- Emmanuel — [Emmanuel-Valdez](https://github.com/Emmanuel-Valdez)
- Matias — [mdev-repos](https://github.com/mdev-repos)

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 propio (variables CSS, Flexbox + Grid, animaciones y media queries)
- JavaScript puro (sin librerías)
- Google Fonts
- Vercel (publicación)

## Estructura de archivos y carpetas

```text
index.html          → portada (equipo + listado de integrantes)
emmanuel.html       → perfil de Emmanuel
julian.html         → perfil de Julian
martin.html         → perfil de Martin
matias.html         → perfil de Matias
maximo.html         → perfil de Maximo
bitacora.html       → bitácora del proceso
css/style.css       → estilos de todo el sitio
js/main.js          → menú responsive + interacciones de la portada
js/perfil.js        → interacción de escaneo de habilidades (perfiles)
img/                → avatares, fotos, pósters y carátulas por integrante
```

## Guía de estilos

Temática inspirada en Cyberpunk 2077: fondos oscuros, neones cian/magenta y tipografías condensadas.

| Uso | Color | Hex |
|---|---|---|
| Fondo vacío | negro azulado | `#04050d` |
| Paneles | azul noche / alternativo | `#0a0d1f` / `#10142c` |
| Acento principal | amarillo neón | `#fcee0a` |
| Acento secundario | cian | `#02d7f2` |
| Acento alerta | magenta | `#ff2a6d` |
| Detalles | púrpura | `#a45bff` |
| Texto | blanco hielo / gris | `#eafcff` / `#8590b5` |

- **Google Fonts:** `Orbitron` (títulos) + `Chakra Petch` (cuerpo); la portada suma `Saira Stencil One` y `Share Tech Mono`.
- **Iconografía:** avatar placeholder propio (`img/avatar-placeholder.svg`), fotos aportadas por cada integrante y símbolos de texto (`☰`, `📍`, `💻`, `→`).
- **Responsive:** mobile-first con breakpoints en `400px`, `900px` y `1200px`, sin desbordes.

## Funciones JavaScript

### Portada (`js/main.js`)

- **Menú hamburguesa:** muestra/oculta la navegación en pantallas chicas (también corre en las demás páginas).
- **Typewriter:** el texto de bienvenida se escribe letra por letra como una terminal.
- **Reiniciar transmisión:** re-ejecuta el typewriter y dispara un glitch en el título.
- **Auto pick character:** elige un integrante al azar, resalta su tarjeta y la desplaza a la vista.

### Perfiles (`js/perfil.js` + `js/emmanuel.js`)

- **Escanear habilidades:** anima las barras de skill hasta el nivel (`data-value`) de cada integrante, en cascada. Corre al cargar y con el botón `[ ESCANEAR / RE-ESCANEAR ]`.
- **Lightbox de Emmanuel (`js/emmanuel.js`, solo `emmanuel.html`):** click en una tarjeta de película/disco la abre en grande (modal con título); cierra con Esc, botón `[ CERRAR × ]` o click fuera. No toca `main.js` ni `perfil.js`.

> <!-- PENDIENTE GRUPO: agregar capturas de pantalla de cada función (portada + 5 perfiles). -->

## URL publicada en Vercel

> <!-- PENDIENTE GRUPO: publicar en Vercel y pegar acá la URL. -->

## Evolución (para los siguientes trabajos)

- Completar los 5 perfiles con datos e imágenes definitivas.
- README con capturas y URL de Vercel.
- Revisar breakpoints y accesibilidad antes de cada entrega.

## Uso de IA

### Emmanuel

- **Herramientas:** opencode con el modelo Muse Spark 1.3 (plan gratuito).
- **Experiencia previa:** uso diario de agentes de IA en el flujo de ingeniería.
- **Qué asistió:** verificación de años/géneros de películas y discos para la tarjeta; revisión de estructura semántica del perfil; lightbox propio (`js/emmanuel.js` + estilos + modal) y porcentajes de skills variados (90/85/80/70).
- **Criterio propio:** todos los textos, datos, imágenes y la bitácora se decidieron y revisaron a mano; el JS del equipo (`main.js`, `perfil.js`) se reusó sin cambios y el lightbox nuevo se probó a mano (abrir/cerrar con Esc, botón y click fuera).
- **Imágenes:** foto propia (`emma.jpg`); pósters y carátulas descargados de páginas web públicas.

> <!-- PENDIENTE GRUPO: cada integrante agrega su bloque (herramientas, plan, experiencia, qué revisó con criterio propio). -->

## Entrega

En la planilla única de entregas se carga un solo enlace: el de este repositorio público. La URL de Vercel se revisa desde este README.
