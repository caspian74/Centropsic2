# Centro Psicoterapéutico — sitio web

Sitio del **Centro Psicoterapéutico** (La Mesa, Tijuana, B.C.): directorio de 12 especialistas con perfil propio, agenda por WhatsApp, mapa, preguntas frecuentes y páginas legales.

Hecho con React + Vite + Tailwind CSS, GSAP (ScrollTrigger) y Three.js. Es un sitio estático: no necesita servidor, base de datos ni servicios de pago.

---

## 1. Uso rápido

Requiere Node.js 18.18 o superior (recomendado: 20, ver `.nvmrc`).

```bash
npm install     # instala dependencias
npm run dev     # desarrollo en http://localhost:5173
npm run build   # compila a /dist
npm run preview # sirve /dist para revisarlo antes de publicar
```

> **Importante:** el proyecto se escribió y revisó sin poder ejecutar `npm install` (el entorno donde se generó no tenía acceso a npm). Se verificó la sintaxis de todos los archivos, los imports y el script de SEO, pero **la primera compilación real será la tuya**. Ejecuta `npm install && npm run build` antes de subirlo; si aparece algún error, casi seguro será de versión de alguna dependencia y se corrige en minutos.

---

## 2. Antes de publicar (lista de pendientes)

Nada de lo que muestra el sitio es inventado. Lo que falta está vacío y se completa en un solo lugar:

| Pendiente | Dónde |
| --- | --- |
| Dominio definitivo | `VITE_SITE_URL` (o `url` en `src/data/siteConfig.js`) |
| Razón social, domicilio y correo de privacidad | `siteConfig.legal` |
| Revisión de las tres páginas legales por el responsable del centro | `src/pages/Privacy.jsx`, `Terms.jsx`, `MentalHealthNotice.jsx` |
| Correo, redes sociales, horario, código postal | `siteConfig.contact`, `.social`, `.hours`, `.address.postalCode` |
| Fotografías de especialistas | `public/images/especialistas/` + campo `photo` |
| Textos de presentación y cédulas (opcionales) | campos `description` y `license` en `specialists.js` |
| Coordenadas exactas del local (opcional) | `siteConfig.map.coordinates` |
| Logotipo vectorial original | `src/components/Logo.jsx` y `public/favicon.svg` |
| Confirmar el artículo («la»/«el») de cada especialista | campo `article` en `specialists.js` |

Las páginas legales muestran un aviso de **«Borrador pendiente de revisión»** y resaltan cada dato faltante. El aviso se apaga con `siteConfig.legal.showDraftNotice = false` cuando el responsable del centro apruebe los textos. No han sido validadas por un abogado.

El isotipo se redibujó en SVG a partir de la fotografía del directorio impreso; es una aproximación fiel, pero conviene sustituirlo por el archivo original.

---

## 3. Dónde se edita cada cosa

```
src/data/
  specialists.js   Directorio: nombres, especialidades, teléfonos, fotos
  siteConfig.js    Datos del centro: dirección, mapa, contacto, redes, textos del hero, legales
  services.js      Áreas de atención (tarjetas y filtros)
  faq.js           Preguntas frecuentes
  seo.js           Títulos, descripciones y datos estructurados por ruta
```

### Agregar, quitar o modificar un especialista

Edita `src/data/specialists.js`. Cada persona es un bloque:

```js
{
  slug: 'nombre-apellido',     // URL del perfil: /especialistas/nombre-apellido
  title: 'Psic.',
  article: 'la',               // 'la' o 'el' (para el mensaje de WhatsApp)
  name: 'Nombre Apellido',
  specialty: 'Texto oficial de su especialidad',
  phone: '664-000-0000',       // 10 dígitos; la lada +52 se agrega sola
  services: ['adultos'],       // ids de services.js, para los filtros
  photo: '',                   // '/images/especialistas/archivo.webp'
  description: '',             // presentación aprobada por la persona (opcional)
  license: '',                 // cédula profesional (opcional)
}
```

Con eso se actualizan solos: la tarjeta, su perfil, el botón flotante, el pie de página, el formulario, el sitemap y los datos estructurados.

### WhatsApp

Cada botón abre `https://wa.me/52XXXXXXXXXX` con el mensaje ya escrito. El texto del mensaje se cambia en `siteConfig.whatsapp.bookingTemplate`. No existe un número general de recepción: el botón flotante despliega el directorio para elegir a quién escribir.

El formulario de contacto **no envía ni guarda datos**: arma el mensaje y abre WhatsApp.

### Mapa

- Por defecto se muestra el mapa interactivo de Google ubicado **por dirección** (sin API key y sin inventar coordenadas).
- Si escribes las coordenadas verificadas en `siteConfig.map.coordinates` (`{ lat, lng }`), el sitio cambia automáticamente a **Leaflet + OpenStreetMap** con marcador propio. Puedes obtenerlas en Google Maps con clic derecho sobre el local.

---

## 4. Publicar en GitHub y Cloudflare Pages

### GitHub

```bash
git init
git add .
git commit -m "Sitio Centro Psicoterapéutico"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/centro-psicoterapeutico.git
git push -u origin main
```

### Cloudflare Pages

1. En el panel de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
2. Configuración de compilación:

   | Campo | Valor |
   | --- | --- |
   | Framework preset | Vite (o «None») |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

3. En **Variables and Secrets** agrega `VITE_SITE_URL` con el dominio final, por ejemplo `https://www.tu-dominio.com` (sin diagonal al final).
4. **Save and Deploy**. Cada `git push` a `main` publica una versión nueva.
5. Conecta el dominio en **Custom domains**.

La versión de Node se toma de `.nvmrc`.

### Rutas al recargar la página

No se usa `_redirects`. Funciona así:

- Al compilar, `scripts/postbuild.mjs` genera un HTML por cada ruta (`dist/especialistas/jessica-miranda-suarez.html`, etc.), cada uno con su título, descripción, canonical, Open Graph y JSON-LD. Cloudflare Pages los sirve directamente, así que **recargar cualquier URL funciona** y las vistas previas al compartir un perfil por WhatsApp muestran los datos de esa persona.
- Para cualquier otra ruta, Cloudflare Pages entrega `index.html` de forma automática (comportamiento de SPA cuando no existe un `404.html` en la raíz) y React muestra la página 404 personalizada. **No agregues un `404.html` a `public/`**, porque desactivaría ese comportamiento.

Si prefieres desplegar con **Workers (static assets)** en lugar de Pages, agrega un `wrangler.jsonc` con:

```jsonc
{
  "name": "centro-psicoterapeutico",
  "compatibility_date": "2026-01-01",
  "assets": { "directory": "./dist", "not_found_handling": "single-page-application" }
}
```

### Variables de entorno

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `VITE_SITE_URL` | No (recomendada) | Dominio para canonicals, Open Graph, `sitemap.xml` y `robots.txt` |

Sin ella el sitio funciona igual, pero la compilación avisa que no generó sitemap ni canonicals estáticos.

---

## 5. Qué incluye

**Secciones:** hero con escena 3D, sobre nosotros, 11 áreas de atención, directorio, proceso en 5 pasos, ubicación con mapa, preguntas frecuentes, contacto y pie de página.

**Páginas:** `/`, `/especialistas` (con filtros por tipo de atención), `/especialistas/<slug>` (12 perfiles), `/aviso-de-privacidad`, `/terminos-y-condiciones`, `/aviso-de-salud-mental` y 404.

**Animación**

- GSAP + ScrollTrigger: entrada del hero, títulos palabra por palabra, aparición progresiva de tarjetas, parallax de formas, línea de tiempo que se dibuja con el scroll. Todo se declara con atributos `data-reveal`, `data-split`, `data-parallax` y `data-draw` (ver `src/hooks/useScrollAnimations.js`).
- Three.js (`src/components/three/HeroScene.jsx`): esferas translúcidas, constelación de puntos y líneas inspirada en conexiones neuronales, partículas y reacción al cursor.
- Barra de progreso de scroll, transición entre páginas, menú móvil animado, microinteracciones en botones y tarjetas.

**Rendimiento**

- Three.js y Leaflet se descargan aparte y solo cuando hacen falta. La escena 3D no se carga en móviles, equipos con poca memoria, modo de ahorro de datos, sin WebGL o con `prefers-reduced-motion`; en esos casos se ve una versión ligera en CSS (`src/lib/device.js`).
- La escena se pausa fuera de pantalla y con la pestaña oculta.
- El mapa se monta al acercarse a su sección. Fuentes autoalojadas. Páginas secundarias con carga diferida.
- Los objetivos de Lighthouse (Performance 90+, Accesibilidad/Buenas prácticas/SEO 95+) son metas de diseño: **no se midieron**. Mídelos sobre el sitio publicado.

**Accesibilidad:** HTML semántico, enlace «Saltar al contenido», navegación con teclado, foco visible, `aria-*` en menú, acordeones, filtros y diálogos, botones táctiles de 44 px o más, contraste AA en textos y respeto por `prefers-reduced-motion`.

**SEO:** título y descripción por ruta, canonical, Open Graph y Twitter Cards, `sitemap.xml` y `robots.txt` generados al compilar, URLs amigables, JSON-LD (`LocalBusiness`, `Person` por especialista, `FAQPage`, `BreadcrumbList`) solo con información verificable. Sin reseñas, calificaciones ni testimonios.

---

## 6. Estructura

```
centro-psicoterapeutico/
├─ public/
│  ├─ _headers               Encabezados de seguridad y caché (Cloudflare)
│  ├─ favicon.svg  og-image.png  site.webmanifest
│  ├─ icons/                 Iconos PNG
│  └─ images/especialistas/  Fotografías (ver LEEME.txt)
├─ scripts/
│  └─ postbuild.mjs          HTML por ruta + sitemap.xml + robots.txt
├─ src/
│  ├─ components/            Encabezado, pie, tarjetas, mapa, formulario, SEO…
│  │  └─ three/HeroScene.jsx Escena 3D
│  ├─ sections/              Secciones de la página de inicio
│  ├─ pages/                 Páginas (rutas)
│  ├─ data/                  ← Contenido editable
│  ├─ hooks/  lib/  styles/
│  ├─ App.jsx  main.jsx
├─ index.html
├─ tailwind.config.js  postcss.config.js  vite.config.js
├─ .env.example  .nvmrc  .gitignore
└─ package.json
```

---

## 7. Notas

- **Emergencias:** el sitio indica el 911 y la Línea de la Vida (800 911 2000). Se editan en `siteConfig.emergency`.
- **Crédito de la agencia:** opcional, en `siteConfig.credit`.
- **Imagen para redes** (`public/og-image.png`, 1200×630): sustitúyela cuando haya fotografías del centro.
