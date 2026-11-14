const matches = (query) =>
  typeof window !== 'undefined' && window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches('(prefers-reduced-motion: reduce)');

/**
 * ¿Conviene cargar la escena 3D en este dispositivo?
 * En móviles, equipos con poca memoria, ahorro de datos, movimiento reducido
 * o sin WebGL se queda la versión ligera en CSS (y Three.js ni se descarga).
 */
export function canRunScene() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (matches('(max-width: 767px)')) return false;
  if (matches('(pointer: coarse)') && matches('(max-width: 1024px)')) return false;

  const connection = navigator.connection;
  if (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ''))) {
    return false;
  }
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Ejecuta una tarea cuando el navegador está libre (no compite con el primer pintado). */
export function whenIdle(callback, timeout = 1500) {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 400);
  return () => window.clearTimeout(id);
}
