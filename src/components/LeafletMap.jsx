import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { siteConfig, fullAddress } from '../data/siteConfig.js';

/** Mapa de OpenStreetMap con marcador del centro (requiere coordenadas). */
export default function LeafletMap() {
  const container = useRef(null);

  useEffect(() => {
    const { coordinates, zoom } = siteConfig.map;
    if (!container.current || !coordinates) return undefined;

    const position = [coordinates.lat, coordinates.lng];
    const map = L.map(container.current, {
      center: position,
      zoom,
      scrollWheelZoom: false, // No secuestrar el scroll de la página.
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: '<span class="map-pin"></span>',
      iconSize: [36, 36],
      iconAnchor: [18, 40],
      popupAnchor: [0, -40],
    });

    const popup = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = siteConfig.name;
    const address = document.createElement('div');
    address.textContent = fullAddress;
    popup.append(title, address);

    L.marker(position, { icon, title: siteConfig.name, alt: `Ubicación de ${siteConfig.name}` })
      .addTo(map)
      .bindPopup(popup);

    return () => map.remove();
  }, []);

  return (
    <div
      ref={container}
      className="absolute inset-0 z-0"
      role="application"
      aria-label={`Mapa interactivo con la ubicación de ${siteConfig.name}`}
    />
  );
}
