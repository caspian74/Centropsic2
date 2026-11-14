import { useEffect, useRef } from 'react';
import {
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';

// ─────────────────────────────────────────────────────────────────────────
//  Escena 3D del hero (Three.js sin envoltorios).
//  Esferas translúcidas con los colores del centro que flotan despacio,
//  rodeadas por una constelación de puntos unidos por líneas finas
//  (inspirada en conexiones neuronales) y partículas suaves. Todo el
//  conjunto gira levemente siguiendo al cursor.
//
//  Este archivo se carga con import() diferido y solo en equipos capaces
//  (ver lib/device.js). Se pausa fuera de pantalla o con la pestaña oculta.
// ─────────────────────────────────────────────────────────────────────────

const PALETTE = {
  navy: 0x17283f,
  sage: 0x83b99a,
  sageLight: 0xc0dccb,
  salmon: 0xe99573,
  salmonLight: 0xf4c8b5,
};

const SPHERES = [
  { color: PALETTE.sage, radius: 1.5, position: [0.2, 0.35, 0], speed: 0.42, phase: 0 },
  { color: PALETTE.salmon, radius: 1.0, position: [1.75, -1.05, 0.9], speed: 0.5, phase: 1.7 },
  { color: PALETTE.navy, radius: 0.36, position: [-1.55, 1.65, 1.1], speed: 0.62, phase: 3.1 },
  { color: PALETTE.salmonLight, radius: 0.62, position: [-1.7, -1.45, -0.4], speed: 0.38, phase: 4.4 },
  { color: PALETTE.sageLight, radius: 0.5, position: [2.25, 1.7, -0.9], speed: 0.56, phase: 5.6 },
];

/** Generador pseudoaleatorio con semilla: la composición es siempre la misma. */
function seeded(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Textura circular difuminada para que los puntos no se vean cuadrados. */
function createDotTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.45, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

function createNetwork(random, dotTexture) {
  const group = new Group();
  const nodes = [];
  const count = 58;

  // Puntos repartidos en una cáscara elipsoidal alrededor de las esferas.
  for (let i = 0; i < count; i += 1) {
    const u = random() * 2 - 1;
    const theta = random() * Math.PI * 2;
    const radius = 2.2 + random() * 1.05;
    const s = Math.sqrt(1 - u * u);
    nodes.push([
      Math.cos(theta) * s * radius * 1.12,
      u * radius * 0.92,
      Math.sin(theta) * s * radius * 0.7,
    ]);
  }

  const linePositions = [];
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      const dx = nodes[i][0] - nodes[j][0];
      const dy = nodes[i][1] - nodes[j][1];
      const dz = nodes[i][2] - nodes[j][2];
      if (dx * dx + dy * dy + dz * dz < 1.45 * 1.45) {
        linePositions.push(...nodes[i], ...nodes[j]);
      }
    }
  }

  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new LineBasicMaterial({
    color: PALETTE.navy,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  group.add(new LineSegments(lineGeometry, lineMaterial));

  const pointGeometry = new BufferGeometry();
  pointGeometry.setAttribute('position', new Float32BufferAttribute(nodes.flat(), 3));
  const pointMaterial = new PointsMaterial({
    color: PALETTE.navy,
    map: dotTexture,
    size: 0.11,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  group.add(new Points(pointGeometry, pointMaterial));

  return group;
}

function createDust(random, dotTexture) {
  const positions = [];
  for (let i = 0; i < 150; i += 1) {
    positions.push((random() - 0.5) * 13, (random() - 0.5) * 8, (random() - 0.5) * 6 - 1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const material = new PointsMaterial({
    color: PALETTE.sage,
    map: dotTexture,
    size: 0.07,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  return new Points(geometry, material);
}

export default function HeroScene({ onReady }) {
  const mount = useRef(null);

  useEffect(() => {
    const container = mount.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch (error) {
      // Sin WebGL: se queda la versión ligera en CSS.
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(new Color(0x000000), 0);
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    scene.add(new HemisphereLight(0xffffff, 0xe8e7e3, 1.5));
    const keyLight = new DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);
    const warmLight = new DirectionalLight(PALETTE.salmon, 0.9);
    warmLight.position.set(-6, -3, 2);
    scene.add(warmLight);

    const random = seeded(20261113);
    const dotTexture = createDotTexture();

    const root = new Group();
    scene.add(root);

    const sphereGeometry = new SphereGeometry(1, 64, 48);
    const spheres = SPHERES.map((config) => {
      const material = new MeshPhysicalMaterial({
        color: config.color,
        roughness: 0.42,
        metalness: 0,
        clearcoat: 0.55,
        clearcoatRoughness: 0.45,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new Mesh(sphereGeometry, material);
      mesh.position.set(...config.position);
      mesh.scale.setScalar(config.radius);
      root.add(mesh);
      return { mesh, ...config };
    });

    const network = createNetwork(random, dotTexture);
    root.add(network);
    const dust = createDust(random, dotTexture);
    scene.add(dust);

    // ── Tamaño ────────────────────────────────────────────────────────────
    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // En pantallas anchas la composición vive a la derecha del texto.
      const wide = camera.aspect > 1.25;
      root.position.x = wide ? Math.min(3.3, camera.aspect * 1.85) : 0;
      root.scale.setScalar(wide ? 1 : 0.78);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // ── Cursor ────────────────────────────────────────────────────────────
    const pointerTarget = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // ── Ciclo de animación ────────────────────────────────────────────────
    let frame = 0;
    let running = false;
    let elapsed = 0;
    let last = 0;
    let announced = false;

    const render = (now) => {
      frame = window.requestAnimationFrame(render);
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta;

      pointer.x += (pointerTarget.x - pointer.x) * 0.04;
      pointer.y += (pointerTarget.y - pointer.y) * 0.04;

      root.rotation.y = pointer.x * 0.24 + Math.sin(elapsed * 0.12) * 0.1;
      root.rotation.x = pointer.y * 0.14 + Math.cos(elapsed * 0.1) * 0.04;
      root.position.y = -window.scrollY * 0.0016;

      network.rotation.y = elapsed * 0.04;
      network.rotation.z = Math.sin(elapsed * 0.07) * 0.12;
      dust.rotation.y = -elapsed * 0.015;
      dust.position.x = pointer.x * -0.25;

      for (const sphere of spheres) {
        const t = elapsed * sphere.speed + sphere.phase;
        sphere.mesh.position.x = sphere.position[0] + Math.cos(t * 0.7) * 0.14;
        sphere.mesh.position.y = sphere.position[1] + Math.sin(t) * 0.26;
        // "Respiración": una deformación mínima que las hace sentirse orgánicas.
        sphere.mesh.scale.set(
          sphere.radius * (1 + Math.sin(t * 1.3) * 0.035),
          sphere.radius * (1 + Math.sin(t * 1.3 + 2) * 0.035),
          sphere.radius * (1 + Math.sin(t * 1.3 + 4) * 0.035),
        );
      }

      renderer.render(scene, camera);

      if (!announced) {
        announced = true;
        onReady?.();
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      last = window.performance.now();
      frame = window.requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    let inView = true;
    const sync = () => (inView && !document.hidden ? start() : stop());
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    intersection.observe(container);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onPointerMove);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });
      dotTexture.dispose();
      renderer.dispose();
      canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mount} className="absolute inset-0" />;
}
