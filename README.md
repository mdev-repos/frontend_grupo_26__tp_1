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

### Perfiles (`js/perfil.js`)

- **Escanear habilidades:** anima las barras de skill hasta el nivel (`data-value`) de cada integrante, en cascada. Corre al cargar y con el botón `[ ESCANEAR / RE-ESCANEAR ]`.

> <!-- PENDIENTE GRUPO: agregar capturas de pantalla de cada función (portada + 5 perfiles). -->

## URL publicada en Vercel

> <!-- PENDIENTE GRUPO: publicar en Vercel y pegar acá la URL. -->

## Evolución (para los siguientes trabajos)

- Completar los 5 perfiles con datos e imágenes definitivas.
- README con capturas y URL de Vercel.
- Revisar breakpoints y accesibilidad antes de cada entrega.

## Uso de IA

### Emmanuel

- **Herramientas:** `hy3` y `ox alpha` (plan gratuito de opencode), `Kimi Code` (suscripción de pago). Sin Claude.
- **Experiencia previa:** uso diario de agentes de IA en el flujo de ingeniería (PFO1 individual con la misma declaración).
- **Qué asistieron:** verificación de años/géneros de películas y discos para la tarjeta; revisión de estructura semántica del perfil.
- **Criterio propio:** todos los textos, niveles de habilidad, decisión de imágenes y la bitácora grupal se redactaron y revisaron a mano; el JS de la rama (`main.js`, `perfil.js`) es del equipo y se reusó sin cambios.
- **Imágenes:** foto propia (`Emma.png`); pósters y carátulas aportados por Emmanuel — <!-- PENDIENTE: confirmar origen exacto de cada imagen (propia / IA con modelo y prompt / descarga) antes de entregar. -->

> <!-- PENDIENTE GRUPO: cada integrante agrega su bloque (herramientas, plan, experiencia, qué revisó con criterio propio). -->

## Entrega

En la planilla única de entregas se carga un solo enlace: el de este repositorio público. La URL de Vercel se revisa desde este README.
