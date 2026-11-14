import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { buildHeadTags, cleanBase, getMeta } from '../data/seo.js';

/** Dominio del sitio: variable de entorno → siteConfig → dominio actual. */
export function getBaseUrl() {
  return cleanBase(import.meta.env.VITE_SITE_URL || siteConfig.url || window.location.origin);
}

/**
 * Actualiza <title>, descripción, canonical, Open Graph, Twitter Cards y
 * JSON-LD de la ruta actual. Los textos viven en src/data/seo.js.
 */
export default function Seo({ path }) {
  useEffect(() => {
    const base = getBaseUrl();
    const meta = getMeta(path, base);

    document.title = meta.title;
    document.head.querySelectorAll('[data-seo]').forEach((node) => node.remove());

    for (const { tag, attrs, content } of buildHeadTags(meta, base)) {
      const node = document.createElement(tag);
      Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
      if (content) node.textContent = content;
      node.setAttribute('data-seo', '');
      document.head.appendChild(node);
    }
  }, [path]);

  return null;
}
