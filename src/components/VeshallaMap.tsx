"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// 🔹 Animated blue marker
const VeshallaIcon = L.divIcon({
  className: "veshalla-marker",
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#00aaff;
      border-radius:50%;
      box-shadow:0 0 10px #00aaff;
      animation:pulse 1.6s infinite;
    "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// 🔹 Pulse animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse {
  0% { box-shadow:0 0 4px #00aaff; }
  50% { box-shadow:0 0 18px #00aaff; }
  100% { box-shadow:0 0 4px #00aaff; }
}
`;
document.head.appendChild(style);

export default function VeshallaMap() {
  const mapRef = useRef<L.Map | null>(null);

  const veshallaPos: [number, number] = [42.06137, 20.84499];

  // 🔒 Boundaries (prevents scrolling out of Veshalla area)
  const bounds = L.latLngBounds(
    [42.055, 20.835], // SW
    [42.068, 20.855]  // NE
  );

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Limit movement area
    map.setMaxBounds(bounds);

    // Smooth cinematic fly in
    setTimeout(() => {
      map.flyTo(veshallaPos, 17.5, {
        duration: 3,
        easeLinearity: 0.2,
      });
    }, 600);

    // Load trails and highlight on hover ⭐
    (async () => {
      try {
        const res = await fetch("/veshalla-trails.geojson");
        if (!res.ok) return;

        const data = await res.json();

        const colors = ["#e53935", "#fb8c00", "#43a047", "#1e88e5", "#8e24aa", "#00acc1"];

        L.geoJSON(data, {
          style: (feature) => {
            const name = feature?.properties?.name || "";
            const idx = name
              .split("")
              .reduce((sum: number, ch: string) => sum + ch.charCodeAt(0), 0)
              % colors.length;

            return {
              color: colors[idx],
              weight: 4,
              opacity: 0.8,
            };
          },
          onEachFeature: (feature, layer) => {
            // Hover highlight
            layer.on("mouseover", () => {
              layer.setStyle({ weight: 7, opacity: 1 });
            });
            layer.on("mouseout", () => {
              layer.setStyle({ weight: 4, opacity: 0.8 });
            });

            const name = feature.properties?.name || "Veshalla Trail";
            layer.bindPopup(`<b>${name}</b>`);
          },
        }).addTo(map);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <MapContainer
      center={veshallaPos}
      zoom={16}
      minZoom={13}
      maxZoom={19}
      zoomControl={true}
      scrollWheelZoom={true}
      dragging={true}
      doubleClickZoom={true}
      style={{ width: "100%", height: "600px" }}
      whenCreated={(m) => (mapRef.current = m)}
    >
      {/* Google Satellite + labels */}
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution="&copy; Google"
      />

      {/* 🔵 Blue marker at Veshalla */}
      <Marker position={veshallaPos} icon={VeshallaIcon} />
    </MapContainer>
  );
}
