import { useEffect, useRef, useState } from "react";

function CityMap({ city, filter, selected, onSelect }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const markersByIdRef = useRef({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.L) {
      setReady(true);
      return;
    }

    const existingCss = document.querySelector('link[data-leaflet="true"]');
    if (!existingCss) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      link.setAttribute("data-leaflet", "true");
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector('script[data-leaflet="true"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => setReady(true));
      if (window.L) setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.setAttribute("data-leaflet", "true");
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current || instanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      zoomControl: true,
      preferCanvas: true,
    }).setView([city.lat, city.lng], city.zoom || 13);

    instanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
      markersLayerRef.current = null;
      markersByIdRef.current = {};
    };
  }, [ready]);

  useEffect(() => {
    if (!ready || !instanceRef.current) return;

    const map = instanceRef.current;
    map.flyTo([city.lat, city.lng], city.zoom || 13, {
      animate: true,
      duration: 1.8,
    });
  }, [ready, city.id, city.lat, city.lng, city.zoom]);

  useEffect(() => {
    if (!ready || !instanceRef.current || !markersLayerRef.current) return;

    const L = window.L;
    const map = instanceRef.current;
    const markersLayer = markersLayerRef.current;

    markersLayer.clearLayers();
    markersByIdRef.current = {};

    const items = [
      ...(filter === "all" || filter === "places" ? city.places : []),
      ...(filter === "all" || filter === "restaurants" ? city.restaurants : []),
      ...(filter === "all" || filter === "hotels" ? city.hotels : []),
    ].filter(
      (item) =>
        item &&
        typeof item.lat === "number" &&
        typeof item.lng === "number"
    );

    const sortedItems = [...items].sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    );

    const topIds = new Set(sortedItems.slice(0, 3).map((item) => item.id));

    const bounds = [];

    items.forEach((item) => {
      const isTop = topIds.has(item.id);
      const isSelected = selected?.id === item.id;

      const markerHtml = isTop || isSelected
        ? `
          <div style="position:relative;width:50px;height:50px;display:flex;align-items:center;justify-content:center;">
            <div class="gsr-pulse-ring" style="background:${item.markerColor || city.accent};"></div>
            <div style="
              position:relative;
              z-index:2;
              background:${item.markerColor || city.accent};
              width:${isSelected ? 42 : 38}px;
              height:${isSelected ? 42 : 38}px;
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:18px;
              border:3px solid white;
              box-shadow:${isSelected ? "0 0 0 4px rgba(201,168,76,0.35), 0 6px 18px rgba(0,0,0,0.55)" : "0 3px 14px rgba(0,0,0,0.5)"};
              cursor:pointer;
            ">
              ${item.icon}
            </div>
          </div>
        `
        : `
          <div style="
            background:${item.markerColor || city.accent};
            width:38px;
            height:38px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:18px;
            border:2.5px solid white;
            box-shadow:0 3px 14px rgba(0,0,0,0.5);
            cursor:pointer;
          ">
            ${item.icon}
          </div>
        `;

      const icon = L.divIcon({
        className: "",
        html: markerHtml,
        iconSize: isTop || isSelected ? [50, 50] : [38, 38],
        iconAnchor: isTop || isSelected ? [25, 44] : [19, 38],
        popupAnchor: [0, -34],
      });

      const marker = L.marker([item.lat, item.lng], { icon }).addTo(markersLayer);

      marker.bindPopup(`
        <div style="font-family:Georgia,serif;padding:4px 2px;min-width:180px">
          <b style="font-size:13px;color:#EDE4D0">${isTop ? "⭐ " : ""}${item.name}</b><br>
          <span style="color:#C9A84C;font-size:11px">
            ⭐ ${item.rating} · ${item.reviews?.toLocaleString?.() || 0} reviews
          </span><br>
          <span style="font-size:11px;color:#8A7A60;line-height:1.5">
            ${item.desc?.slice(0, 80) || ""}...
          </span><br>
          ${
            isTop
              ? `<span style="font-size:10px;color:#E7C870">Top place in ${city.name}</span><br>`
              : ""
          }
          <span style="font-size:10px;color:#C9A84C">▼ Click card for photos & details</span>
        </div>
      `);

      marker.on("click", () => {
        onSelect(item);
        marker.openPopup();
      });

      markersByIdRef.current[item.id] = marker;
      bounds.push([item.lat, item.lng]);
    });

    if (!selected && bounds.length > 0) {
      map.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: city.zoom || 13,
        animate: true,
        duration: 1.2,
      });
    }
  }, [ready, city, filter, selected, onSelect]);

  useEffect(() => {
    if (!ready || !instanceRef.current || !selected) return;

    const map = instanceRef.current;
    const marker = markersByIdRef.current[selected.id];

    if (
      marker &&
      typeof selected.lat === "number" &&
      typeof selected.lng === "number"
    ) {
      map.flyTo([selected.lat, selected.lng], Math.max(city.zoom || 13, 15), {
        animate: true,
        duration: 1.2,
      });

      setTimeout(() => {
        marker.openPopup();
      }, 250);
    }
  }, [ready, selected, city.zoom]);

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        .gsr-pulse-ring {
          position: absolute;
          inset: 4px;
          border-radius: 999px;
          opacity: 0.35;
          animation: gsrPulse 1.8s infinite ease-out;
          z-index: 1;
        }

        @keyframes gsrPulse {
          0% {
            transform: scale(0.9);
            opacity: 0.55;
          }
          70% {
            transform: scale(1.55);
            opacity: 0;
          }
          100% {
            transform: scale(1.55);
            opacity: 0;
          }
        }

        .leaflet-popup-content-wrapper {
          background: #111009;
          color: #EDE4D0;
          border: 1px solid #2A2418;
          border-radius: 12px;
        }

        .leaflet-popup-tip {
          background: #111009;
        }

        .leaflet-control-zoom a {
          background: #111009 !important;
          color: #C9A84C !important;
          border-bottom: 1px solid #2A2418 !important;
        }

        .leaflet-control-zoom a:hover {
          background: #1A1610 !important;
        }
      `}</style>

      {!ready && (
        <div
          style={{
            height: 440,
            background: "#111009",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            border: "1px solid #2A2418",
          }}
        >
          <span
            style={{
              color: "#C9A84C",
              fontFamily: "'Cinzel',serif",
              fontSize: 12,
              letterSpacing: "0.15em",
            }}
          >
            LOADING MAP...
          </span>
        </div>
      )}

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: 440,
          borderRadius: 14,
          overflow: "hidden",
          display: ready ? "block" : "none",
          border: "1px solid #2A2418",
        }}
      />
    </div>
  );
}

export default CityMap;