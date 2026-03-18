import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/images/fallback-place.jpg";

const PLACE_IMAGES = {
  Registan: [
    "/images/places/registan/registan-1.jpg",
    "/images/places/registan/registan-2.jpg",
    "/images/places/registan/registan-3.jpg",
    "/images/places/registan/registan-4.jpg",
  ],
  "Gur-e-Amir": [
    "/images/places/gur-e-amir/gur-e-amir-1.jpg",
    "/images/places/gur-e-amir/gur-e-amir-2.jpg",
    "/images/places/gur-e-amir/gur-e-amir-3.jpg",
  ],
  "Shah-i-Zinda": [
    "/images/places/shah-i-zinda/shah-i-zinda-1.jpg",
    "/images/places/shah-i-zinda/shah-i-zinda-2.jpg",
  ],
  Bibi_Khanym_Mosque: [
    "/images/places/bibi-khanym/bibi-khanym-1.jpg",
    "/images/places/bibi-khanym/bibi-khanym-2.jpg",
  ],
  Ulugh_Beg_Observatory: [
    "/images/places/ulugh-beg-observatory/ulugh-beg-observatory-1.jpg",
    "/images/places/ulugh-beg-observatory/ulugh-beg-observatory-2.jpg",
  ],
  Siab_Bazaar: [
    "/images/places/siab-bazaar/siab-bazaar-1.jpg",
    "/images/places/siab-bazaar/siab-bazaar-2.jpg",
    "/images/places/siab-bazaar/siab-bazaar-3.jpg",
  ],
  Amir_Timur_Museum: [
    "/images/places/amir-temur-monument/amir-temur-monument-1.jpg",
  ],
  Emirhan: [
    "/images/places/eats/emirhan/emirhan-1.jpg",
    "/images/places/eats/emirhan/emirhan-2.jpg",
  ],
  Ark_of_Bukhara: [
    "/images/places/ark-of-bukhara/ark-of-bukhara-1.jpg",
    "/images/places/ark-of-bukhara/ark-of-bukhara-2.jpg",
  ],
  Kalon_Minaret: [
    "/images/places/kalon-minaret/kalon-minaret-1.jpg",
    "/images/places/kalon-minaret/kalon-minaret-2.jpg",
  ],
  Samanid_mausoleum: [
    "/images/places/samanid-mausoleum/samanid-mausoleum-1.jpg",
    "/images/places/samanid-mausoleum/samanid-mausoleum-2.jpg",
  ],
  "Lyabi-Hauz": [
    "/images/places/lyabi-hauz/lyabi-hauz-1.jpg",
    "/images/places/lyabi-hauz/lyabi-hauz-2.jpg",
    "/images/places/lyabi-hauz/lyabi-hauz-3.jpg",
  ],
  Chor_Minor: [
    "/images/places/chor-minor/chor-minor-1.jpg",
    "/images/places/chor-minor/chor-minor-2.jpg",
  ],
  Kalon_Mosque: [
    "/images/places/kalon-mosque/kalon-mosque-1.jpg",
    "/images/places/kalon-mosque/kalon-mosque-2.jpg",
  ],
  "Taki_(Bukhara)": [
    "/images/places/taki-bukhara/taki-bukhara-1.jpg",
    "/images/places/taki-bukhara/taki-bukhara-2.jpg",
  ],
  Ichan_Kala: [
    "/images/places/ichan-kala/ichan-kala-1.jpg",
    "/images/places/ichan-kala/ichan-kala-2.jpg",
  ],
  Kalta_Minor: [
    "/images/places/kalta-minor/kalta-minor-1.jpg",
    "/images/places/kalta-minor/kalta-minor-2.jpg",
  ],
  Toshhovli_Palace: [
    "/images/places/toshhovli-palace/toshhovli-palace-1.jpg",
  ],
  Islam_Khoja_Minaret: [
    "/images/places/islam-khoja-minaret/islam-khoja-minaret-1.jpg",
  ],
  Kuhna_Ark: [
    "/images/places/kuhna-ark/kuhna-ark-1.jpg",
    "/images/places/kuhna-ark/kuhna-ark-2.jpg",
  ],
  "Juma_Mosque,_Khiva": [
    "/images/places/juma-mosque-khiva/juma-mosque-khiva-1.jpg",
  ],
  Amir_Timur_Square: [
    "/images/places/amir-temur-square/amir-temur-square-1.jpg",
    "/images/places/amir-temur-square/amir-temur-square-2.jpg",
  ],
  Chorsu_Bazaar: [
    "/images/places/chorsu-bazaar/chorsu-bazaar-1.jpg",
    "/images/places/chorsu-bazaar/chorsu-bazaar-2.jpg",
  ],
  Hazrat_Imam_Complex: [
    "/images/places/hazrat-imam-complex/hazrat-imam-complex-1.jpg",
    "/images/places/hazrat-imam-complex/hazrat-imam-complex-2.jpg",
  ],
  State_Museum_of_History: [
    "/images/places/state-museum-of-history/state-museum-of-history-1.jpg",
    "/images/places/state-museum-of-history/state-museum-of-history-2.jpg",
  ],
   Tashkent_Metro: [
    "/images/places/tashkent-metro/tashkent-metro-1.jpg",
    "/images/places/tashkent-metro/tashkent-metro-2.jpg",
    "/images/places/tashkent-metro/tashkent-metro-3.jpg",
  ],
  Earthquake_Memorial_Park: [
    "/images/places/earthquake-memorial-park/earthquake-memorial-park-1.jpg",
  ],
};

function safeImageKey(wikiTitle) {
  if (!wikiTitle) return "";
  return wikiTitle.replace(/-/g, "_").replace(/\s+/g, "_");
}

function usePlaceImages(wikiTitle) {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wikiTitle) {
      setImgs([]);
      setLoading(false);
      return;
    }

    const key = safeImageKey(wikiTitle);
    const found = PLACE_IMAGES[wikiTitle] || PLACE_IMAGES[key] || [];

    setImgs(found);
    setLoading(false);
  }, [wikiTitle]);

  return { imgs, loading };
}

function WikiThumb({ wiki, icon, name, rating, style }) {
  const key = safeImageKey(wiki);
  const src = (PLACE_IMAGES[wiki]?.[0]) || (PLACE_IMAGES[key]?.[0]) || FALLBACK_IMAGE;

  return (
    <div
      style={{
        ...style,
        position: "relative",
        background: "#1A1610",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg,transparent 50%,rgba(10,8,5,0.85))",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 10,
          right: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span
          style={{
            fontSize: 10,
            color: "#EDE4D0",
            background: "rgba(10,8,5,0.7)",
            padding: "2px 8px",
            borderRadius: 10,
            fontFamily: "'Cinzel',serif",
          }}
        >
          ⭐ {rating}
        </span>
      </div>
    </div>
  );
}

function ImageGallery({ item, cityColor }) {
  const { imgs, loading } = usePlaceImages(item.wiki);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [item?.wiki]);

  const prev = () => setActive((a) => (a - 1 + imgs.length) % imgs.length);
  const next = () => setActive((a) => (a + 1) % imgs.length);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: 240,
          borderRadius: 12,
          background: "#111009",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          border: "1px solid #1A1610",
        }}
      >
        <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#C9A84C",
                animation: `pulse 1.2s ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 10,
            color: "#5A4E3A",
            letterSpacing: "0.12em",
          }}
        >
          LOADING PHOTOS…
        </span>
      </div>
    );
  }

  if (!imgs.length) {
    return (
      <div
        style={{
          width: "100%",
          height: 240,
          borderRadius: 12,
          background: "#111009",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <img
          src={FALLBACK_IMAGE}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  return (
    <div>
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <img
            src={imgs[active] || FALLBACK_IMAGE}
            alt={item.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            style={{
              maxWidth: "88vw",
              maxHeight: "82vh",
              objectFit: "contain",
              borderRadius: 10,
              display: "block",
            }}
          />
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "rgba(201,168,76,0.2)",
              border: "1px solid #C9A84C44",
              borderRadius: "50%",
              width: 44,
              height: 44,
              color: "#C9A84C",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            style={{
              position: "fixed",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(201,168,76,0.2)",
              border: "1px solid #C9A84C44",
              borderRadius: "50%",
              width: 52,
              height: 52,
              color: "#C9A84C",
              fontSize: 26,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            style={{
              position: "fixed",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(201,168,76,0.2)",
              border: "1px solid #C9A84C44",
              borderRadius: "50%",
              width: 52,
              height: 52,
              color: "#C9A84C",
              fontSize: 26,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
          <div
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 8,
            }}
          >
            {imgs.map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: active === i ? "#C9A84C" : "#3A3020",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          position: "relative",
          marginBottom: 8,
          borderRadius: 12,
          overflow: "hidden",
          cursor: "zoom-in",
        }}
        onClick={() => setLightbox(true)}
      >
        <img
          src={imgs[active] || FALLBACK_IMAGE}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,0.45))",
          }}
        />
        {imgs.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                width: 34,
                height: 34,
                color: "#EDE4D0",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                width: 34,
                height: 34,
                color: "#EDE4D0",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              ›
            </button>
          </>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 10,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 12,
            padding: "2px 10px",
            fontFamily: "'Cinzel',serif",
            fontSize: 10,
            color: "#C9A84C",
            letterSpacing: "0.08em",
          }}
        >
          {active + 1}/{imgs.length} · CLICK TO ENLARGE
        </div>
      </div>

      {imgs.length > 1 && (
        <div style={{ display: "flex", gap: 6 }}>
          {imgs.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                height: 58,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                border: `2px solid ${active === i ? cityColor : "transparent"}`,
                opacity: active === i ? 1 : 0.55,
                transition: "all 0.2s",
              }}
            >
              <img
                src={img || FALLBACK_IMAGE}
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { usePlaceImages as useWikiImages, WikiThumb };
export default ImageGallery;