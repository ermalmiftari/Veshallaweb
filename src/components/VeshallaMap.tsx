"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Fix marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function VeshallaMap() {
  const mapRef = useRef<L.Map | null>(null);
  const startPos: [number, number] = [42.0465, 20.9000];

  useEffect(() => {
    if (!mapRef.current) return;

    import("leaflet-kml").then(async () => {
      const response = await fetch("/hiking-veshalla.kml");
      const text = await response.text();
      const parser = new DOMParser();
      const kml = parser.parseFromString(text, "text/xml");
      const track = new L.KML(kml);

      mapRef.current!.addLayer(track);
      mapRef.current!.fitBounds(track.getBounds());
    });
  }, []);

  return (
    <MapContainer
      center={startPos}
      zoom={14}
      style={{ width: "100%", height: "600px" }}
      whenCreated={(m) => (mapRef.current = m)}
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution="&copy; Google"
      />
    </MapContainer>
  );
}
