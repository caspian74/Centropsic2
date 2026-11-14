// ─────────────────────────────────────────────────────────────────────────
//  Se ejecuta después de "vite build" (ver package.json → scripts.build).
//
//  1. Genera un HTML por ruta (dist/especialistas/<slug>.html, etc.) con su
//     propio <title>, descripción, canonical, Open Graph y JSON-LD. Así
//     buscadores y vistas previas de WhatsApp/Facebook leen los datos
//     correctos sin ejecutar JavaScript, y Cloudflare Pages responde cada
//     URL directamente al recargar.
//  2. Genera dist/sitemap.xml y dist/robots.txt con el dominio configurado.
//
//  No usa dependencias externas. Si algo falla aquí, avisa en consola pero
//  NO rompe la compilación: el sitio sigue funcionando como SPA.
// ─────────────────────────────────────────────────────────────────────────

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { siteConfig } from '../src/data/siteConfig.js';
import { getAllRoutes, getMeta, buildHeadTags, cleanBase } from '../src/data/seo.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const escapeAttr = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function resolveBaseUrl() {
  let fileEnv = {};
  try {
    // Lee .env / .env.production igual que lo hace Vite.
    const { loadEnv } = await import('vite');
    fileEnv = loadEnv('production', root, 'VITE_');
  } catch {
    /* Vite no disponible: se usan solo las variables del sistema. */
  }
  return cleanBase(process.env.VITE_SITE_URL || fileEnv.VITE_SITE_URL || siteConfig.url);
}

function renderHead(meta, base) {
  const lines = [`<title>${escapeText(meta.title)}</title>`];
  for (const { tag, attrs, content } of buildHeadTags(meta, base)) {
    const attrText = Object.entries(attrs)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
      .join(' ');
    lines.push(
      tag === 'script'
        ? `<script data-seo ${attrText}>${content}</script>`
        : `<${tag} data-seo ${attrText} />`,
    );
  }
  return lines.map((l) => `    ${l}`).join('\n');
}

async function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!existsSync(indexPath)) {
    console.warn('[postbuild] No existe dist/index.html. ¿Se ejecutó "vite build"?');
    return;
  }

  const base = await resolveBaseUrl();
  if (!base) {
    console.warn(
      '\n[postbuild] AVISO: no hay dominio configurado.\n' +
        '  Define VITE_SITE_URL (o "url" en src/data/siteConfig.js) para generar\n' +
        '  sitemap.xml, URLs canónicas e imágenes Open Graph con el dominio real.\n',
    );
  }

  const template = await readFile(indexPath, 'utf8');
  const block = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
  const routes = getAllRoutes();

  if (!block.test(template)) {
    console.warn('[postbuild] No se encontraron los marcadores seo:start / seo:end en index.html.');
  } else {
    for (const route of routes) {
      const meta = getMeta(route, base);
      const html = template.replace(
        block,
        () => `<!--seo:start-->\n${renderHead(meta, base)}\n    <!--seo:end-->`,
      );
      const file =
        route === '/' ? indexPath : path.join(dist, `${route.replace(/^\//, '')}.html`);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, html, 'utf8');
    }
    console.log(`[postbuild] HTML estático generado para ${routes.length} rutas.`);
  }

  const robots = ['User-agent: *', 'Allow: /'];
  if (base) {
    const today = new Date().toISOString().slice(0, 10);
    const urls = routes
      .map((route) => {
        const meta = getMeta(route, base);
        const loc = `${base}${route === '/' ? '/' : route}`;
        return `  <url>\n    <loc>${escapeText(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${meta.priority || '0.5'}</priority>\n  </url>`;
      })
      .join('\n');
    await writeFile(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      'utf8',
    );
    robots.push('', `Sitemap: ${base}/sitemap.xml`);
    console.log(`[postbuild] sitemap.xml generado (${routes.length} URLs) para ${base}`);
  }
  await writeFile(path.join(dist, 'robots.txt'), robots.join('\n') + '\n', 'utf8');
  console.log('[postbuild] robots.txt generado.');
}

main().catch((error) => {
  console.warn('[postbuild] No se pudo completar el paso de SEO estático:', error);
});
