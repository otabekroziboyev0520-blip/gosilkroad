import { useEffect, useState } from "react";
import cities from "./cities";
import { TESTIMONIALS, WHY_UZ } from "./homeData";
import { GLOBAL_CSS } from "../shared/styles";
import CityMap from "./map/CityMap";
import ImageGallery, { WikiThumb } from "./cities/ImageGallery";

export default function HomePage({ onOpenPlan }) {
  const [cityId, setCityId] = useState("samarkand");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        document
          .getElementById("selected-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(null);
  }, [cityId, filter]);

  const city = cities[cityId];
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const displayItems = [
    ...(filter === "all" || filter === "places" ? city.places : []),
    ...(filter === "all" || filter === "restaurants" ? city.restaurants : []),
    ...(filter === "all" || filter === "hotels" ? city.hotels : []),
  ];

  return (
    <div
      style={{
        background: "#0A0805",
        color: "#EDE4D0",
        fontFamily: "Georgia,serif",
        minHeight: "100vh",
      }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navScrolled ? "rgba(10,8,5,0.96)" : "transparent",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
          borderBottom: navScrolled
            ? "1px solid #1A1610"
            : "1px solid transparent",
          transition: "all 0.4s",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
          onClick={() => scrollTo("hero")}
        >
          <span style={{ fontSize: 20 }}>🌙</span>
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "0.08em",
            }}
          >
            GoSilkRoad
          </span>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {[["Explore", "map"], ["Cities", "cities"], ["Plan", "plan"]].map(
            ([l, id]) => (
              <span
                key={id}
                className="nl"
                onClick={() => (id === "plan" ? onOpenPlan() : scrollTo(id))}
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "#8A7A60",
                }}
              >
                {l.toUpperCase()}
              </span>
            )
          )}
        </div>

        <button
          onClick={() => onOpenPlan()}
          style={{
            padding: "7px 18px",
            background: "linear-gradient(135deg,#C9A84C,#8B6914)",
            border: "none",
            borderRadius: 20,
            fontFamily: "'Cinzel',serif",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "#0A0805",
            cursor: "pointer",
          }}
        >
          PLAN TRIP
        </button>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        style={{
          height: "100vh",
          minHeight: 640,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,#0A0805 0%,#1A1208 40%,#0A0805 100%)",
          }}
        />
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.04,
          }}
        >
          <defs>
            <pattern
              id="t"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,2 58,16 58,44 30,58 2,44 2,16"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.8"
              />
              <polygon
                points="30,12 48,22 48,38 30,48 12,38 12,22"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.4"
              />
              <circle
                cx="30"
                cy="30"
                r="4"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#t)" />
        </svg>

        <div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "0 20px",
            animation: "heroIn 1.2s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid #C9A84C33",
              padding: "5px 18px",
              borderRadius: 20,
              marginBottom: 28,
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C9A84C",
                boxShadow: "0 0 8px #C9A84C",
              }}
            />
            <span
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                color: "#C9A84C",
                letterSpacing: "0.25em",
              }}
            >
              TRUSTED BY 50,000+ TRAVELERS
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "clamp(42px,9vw,104px)",
              fontWeight: 900,
              letterSpacing: "0.02em",
              color: "#EDE4D0",
              lineHeight: 0.95,
              marginBottom: 10,
            }}
          >
            UZBEKISTAN
          </h1>

          <h2
            style={{
              fontFamily: "'Crimson Pro',serif",
              fontSize: "clamp(16px,2.5vw,28px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#C9A84C",
              marginBottom: 24,
              letterSpacing: "0.06em",
            }}
          >
            Where Every Stone Tells a Thousand Years
          </h2>

          <p
            style={{
              fontFamily: "'Crimson Pro',serif",
              fontSize: "clamp(14px,1.5vw,17px)",
              color: "#6B5E45",
              maxWidth: 500,
              margin: "0 auto 36px",
              lineHeight: 1.8,
            }}
          >
            Turquoise domes, legendary plov, and 2,500 years of living history.
            Your intelligent companion to one of the world's most magical
            destinations.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("map")}
              style={{
                padding: "13px 32px",
                background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                border: "none",
                borderRadius: 28,
                fontFamily: "'Cinzel',serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#0A0805",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
              }}
            >
              EXPLORE THE MAP
            </button>

            <button
              onClick={() => onOpenPlan()}
              style={{
                padding: "13px 32px",
                background: "transparent",
                border: "1px solid #C9A84C44",
                borderRadius: 28,
                fontFamily: "'Cinzel',serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#C9A84C",
                cursor: "pointer",
              }}
            >
              PLAN YOUR TRIP
            </button>
          </div>

          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {[["7M+", "Tourists in 2024"], ["4", "UNESCO Sites"], ["2,500+", "Years of History"], ["80+", "Mapped Locations"]].map(
              ([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "clamp(18px,2.5vw,28px)",
                      fontWeight: 700,
                      color: "#C9A84C",
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Crimson Pro',serif",
                      fontSize: 10,
                      color: "#3A3020",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {l.toUpperCase()}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* WHY UZBEKISTAN */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 10,
              color: "#C9A84C",
              letterSpacing: "0.3em",
              marginBottom: 12,
            }}
          >
            THE CASE FOR UZBEKISTAN
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "clamp(22px,4vw,42px)",
              fontWeight: 600,
              color: "#EDE4D0",
              marginBottom: 14,
            }}
          >
            Why Uzbekistan?
          </h2>
          <p
            style={{
              fontFamily: "'Crimson Pro',serif",
              fontSize: 16,
              color: "#6B5E45",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            Still genuinely undiscovered by mass tourism — and not for long.
            Here's why it belongs at the top of your list.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: 20,
          }}
        >
          {WHY_UZ.map((item, i) => (
            <div
              key={i}
              className="hc"
              style={{
                padding: 28,
                background: "#111009",
                border: "1px solid #1A1610",
                borderRadius: 14,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
              <h3
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 16,
                  color: "#EDE4D0",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  fontSize: 15,
                  color: "#6B5E45",
                  lineHeight: 1.75,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" style={{ padding: "0 32px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 10,
              color: "#C9A84C",
              letterSpacing: "0.3em",
              marginBottom: 10,
            }}
          >
            THE FOUR GREAT CITIES
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "clamp(22px,4vw,40px)",
              fontWeight: 600,
              color: "#EDE4D0",
            }}
          >
            Choose Your Destination
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 22,
          }}
        >
          {Object.values(cities).map((c) => (
            <div
              key={c.id}
              className="hc"
              onClick={() => {
                setCityId(c.id);
                setSelected(null);
              }}
              style={{
                cursor: "pointer",
                borderRadius: 20,
                overflow: "hidden",
                border:
                  cityId === c.id
                    ? `1px solid ${c.accent}`
                    : "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  cityId === c.id ? `0 0 0 1px ${c.accent} inset` : "none",
                background: "#111009",
              }}
            >
              <div
                style={{
                  height: 190,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.6s ease",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.35))",
                  }}
                />

                {cityId === c.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "#C9A84C",
                      color: "#111009",
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    SELECTED
                  </div>
                )}
              </div>

              <div style={{ padding: "18px 20px", background: "#0B0906" }}>
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#EDE4D0",
                    marginBottom: 4,
                  }}
                >
                  {c.name}
                </div>

                <div
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 13,
                    color: "#5A4E3A",
                    fontStyle: "italic",
                    marginBottom: 12,
                  }}
                >
                  {c.tagline}
                </div>

                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#3A3020",
                      fontFamily: "'Cinzel',serif",
                    }}
                  >
                    🏛️ {c.places?.length || 0} sights
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#2A2010",
                      fontFamily: "'Cinzel',serif",
                      margin: "0 4px",
                    }}
                  >
                    ·
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#3A3020",
                      fontFamily: "'Cinzel',serif",
                    }}
                  >
                    🍽️ {c.restaurants?.length || 0} restaurants
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#2A2010",
                      fontFamily: "'Cinzel',serif",
                      margin: "0 4px",
                    }}
                  >
                    ·
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#3A3020",
                      fontFamily: "'Cinzel',serif",
                    }}
                  >
                    🏨 {c.hotels?.length || 0} hotels
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAP & EXPLORE */}
      <section id="map" style={{ padding: "0 32px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: "clamp(20px,3vw,34px)",
                fontWeight: 700,
                color: "#EDE4D0",
                marginBottom: 4,
              }}
            >
              {city.emoji} {city.name}
            </h2>
            <p
              style={{
                fontFamily: "'Crimson Pro',serif",
                fontSize: 14,
                color: "#5A4E3A",
                fontStyle: "italic",
              }}
            >
              {city.tagline}
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["all", "🗺️ All"], ["places", "🏛️ Sights"], ["restaurants", "🍽️ Eat"], ["hotels", "🏨 Stay"]].map(
              ([f, l]) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "8px 16px",
                    background: filter === f ? `${city.color}22` : "transparent",
                    border: `1px solid ${filter === f ? city.color : "#2A2418"}`,
                    borderRadius: 22,
                    color: filter === f ? city.accent : "#5A4E3A",
                    fontFamily: "'Cinzel',serif",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {l}
                </button>
              )
            )}
          </div>
        </div>

        <CityMap
          city={city}
          filter={filter}
          selected={selected}
          onSelect={setSelected}
        />

        <p
          style={{
            textAlign: "center",
            fontFamily: "'Crimson Pro',serif",
            fontStyle: "italic",
            color: "#3A3020",
            fontSize: 12,
            marginTop: 10,
          }}
        >
          🖱️ Click any map marker or card below · {displayItems.length} locations shown
        </p>

        {selected && (
          <div
            id="selected-detail"
            style={{
              marginTop: 22,
              background: `${city.color}0A`,
              border: `1px solid ${city.color}44`,
              borderRadius: 16,
              overflow: "hidden",
              animation: "fadeUp 0.3s ease",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 0 }}>
              <div
                style={{
                  padding: 22,
                  borderRight: `1px solid ${city.color}22`,
                  background: `${city.color}05`,
                }}
              >
                <ImageGallery item={selected} cityColor={city.color} />
              </div>

              <div style={{ padding: 26 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 36 }}>{selected.icon}</span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 21,
                          color: "#EDE4D0",
                          marginBottom: 5,
                        }}
                      >
                        {selected.name}
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ fontSize: 13, color: "#C9A84C" }}>
                          ⭐ {selected.rating}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#5A4E3A",
                            fontFamily: "'Crimson Pro',serif",
                          }}
                        >
                          ({selected.reviews?.toLocaleString()} reviews)
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 10px",
                            background: `${city.color}22`,
                            border: `1px solid ${city.color}44`,
                            borderRadius: 12,
                            color: city.accent,
                            fontFamily: "'Cinzel',serif",
                          }}
                        >
                          {selected.type.toUpperCase()}
                        </span>
                        {selected.fee && (
                          <span
                            style={{
                              fontSize: 11,
                              color: "#5A4E3A",
                              fontFamily: "'Cinzel',serif",
                            }}
                          >
                            💰 {selected.fee}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3A3020",
                      fontSize: 24,
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    ×
                  </button>
                </div>

                <p
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 15,
                    color: "#8A7A60",
                    lineHeight: 1.8,
                    marginBottom: 18,
                  }}
                >
                  {selected.desc}
                </p>

                {selected.tip && (
                  <div
                    style={{
                      padding: "13px 18px",
                      background: "rgba(201,168,76,0.07)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: 10,
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#C9A84C",
                        fontFamily: "'Cinzel',serif",
                        letterSpacing: "0.1em",
                      }}
                    >
                      💡 INSIDER TIP:{" "}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 14,
                        color: "#6B5E45",
                        lineHeight: 1.6,
                      }}
                    >
                      {selected.tip}
                    </span>
                  </div>
                )}

                {selected.hours && (
                  <div
                    style={{
                      fontFamily: "'Crimson Pro',serif",
                      fontSize: 13,
                      color: "#3A3020",
                    }}
                  >
                    🕐 <span style={{ marginRight: 16 }}>{selected.hours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))",
            gap: 14,
            marginTop: 24,
          }}
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="hc"
              onClick={() => {
                const nextSelected = selected?.id === item.id ? null : item;
                setSelected(nextSelected);
              }}
              style={{
                background: selected?.id === item.id ? `${city.color}18` : "#111009",
                border: `1px solid ${selected?.id === item.id ? city.accent : "#1A1610"}`,
                boxShadow:
                  selected?.id === item.id ? `0 12px 40px ${city.color}25` : "none",
                borderRadius: 12,
                overflow: "hidden",
                transition: "all .25s ease",
                cursor: "pointer",
              }}
            >
              <WikiThumb
                wiki={item.wiki}
                icon={item.icon}
                name={item.name}
                rating={item.rating}
                style={{ height: 130, width: "100%" }}
              />
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#EDE4D0",
                    marginBottom: 3,
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 9,
                    color: "#4A3E2E",
                    letterSpacing: "0.1em",
                    marginBottom: 7,
                  }}
                >
                  {item.type.toUpperCase()} {item.fee && `· ${item.fee}`}{" "}
                  {item.reviews && `· ${item.reviews?.toLocaleString()} reviews`}
                </div>
                <p
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 13,
                    color: "#5A4E3A",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc?.slice(0, 75)}...
                </p>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 10,
                    color: selected?.id === item.id ? city.accent : "#2A2418",
                    fontFamily: "'Cinzel',serif",
                    textAlign: "right",
                  }}
                >
                  {selected?.id === item.id ? "▲ CLOSE" : "▼ PHOTOS + DETAILS"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "0 32px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 10,
              color: "#C9A84C",
              letterSpacing: "0.3em",
              marginBottom: 12,
            }}
          >
            REAL TRAVELER STORIES
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "clamp(22px,4vw,40px)",
              fontWeight: 600,
              color: "#EDE4D0",
              marginBottom: 12,
            }}
          >
            What Travelers Say
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 18px",
              border: "1px solid #C9A84C33",
              borderRadius: 20,
              background: "rgba(201,168,76,0.05)",
            }}
          >
            <span style={{ color: "#C9A84C", fontSize: 13 }}>★★★★★</span>
            <span
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                color: "#6B5E45",
                letterSpacing: "0.1em",
              }}
            >
              4.9/5 AVERAGE · 50,000+ TRAVELERS
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 18,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="hc"
              style={{
                padding: 26,
                background: "#111009",
                border: "1px solid #1A1610",
                borderRadius: 14,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  color: "#C9A84C",
                  opacity: 0.3,
                  fontFamily: "Georgia",
                  fontSize: 60,
                  lineHeight: 1,
                }}
              >
                "
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#C9A84C22,#C9A84C44)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    border: "1px solid #C9A84C33",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 13,
                      color: "#EDE4D0",
                      marginBottom: 2,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Crimson Pro',serif",
                      fontSize: 12,
                      color: "#5A4E3A",
                    }}
                  >
                    {t.country}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 9,
                      color: "#3A3020",
                      letterSpacing: "0.08em",
                      marginTop: 2,
                    }}
                  >
                    {t.trip}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                {Array(t.rating)
                  .fill(0)
                  .map((_, j) => (
                    <span key={j} style={{ color: "#C9A84C", fontSize: 13 }}>
                      ★
                    </span>
                  ))}
              </div>

              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  fontSize: 14,
                  color: "#7A6E58",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
              >
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1A1610", background: "#0A0805" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 32px 32px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 32,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>🌙</span>
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 17,
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                  }}
                >
                  GoSilkRoad
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#5A4E3A",
                  fontSize: 14,
                  lineHeight: 1.8,
                  marginBottom: 16,
                  fontStyle: "italic",
                }}
              >
                Your intelligent companion along the ancient Silk Road. Built
                with love for Uzbekistan and the travelers who discover it.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href="mailto:hello@silkroute.uz"
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 10,
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                    padding: "6px 14px",
                    border: "1px solid #C9A84C33",
                    borderRadius: 16,
                  }}
                >
                  📧 EMAIL
                </a>
                <a
                  href="https://instagram.com/gosilkroad"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 10,
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                    padding: "6px 14px",
                    border: "1px solid #C9A84C33",
                    borderRadius: 16,
                  }}
                >
                  📷 INSTAGRAM
                </a>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 10,
                  color: "#C9A84C",
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                }}
              >
                EXPLORE
              </div>
              {[
                ["🕌 Samarkand", () => { setCityId("samarkand"); scrollTo("map"); }],
                ["🏰 Bukhara", () => { setCityId("bukhara"); scrollTo("map"); }],
                ["🌙 Khiva", () => { setCityId("khiva"); scrollTo("map"); }],
                ["🌆 Tashkent", () => { setCityId("tashkent"); scrollTo("map"); }],
              ].map(([label, action]) => (
                <div
                  key={label}
                  onClick={action}
                  className="nl"
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 14,
                    color: "#5A4E3A",
                    marginBottom: 10,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 10,
                  color: "#C9A84C",
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                }}
              >
                PLAN YOUR TRIP
              </div>
              {[
                ["🪪 Visa & Entry", "visa"],
                ["🚆 Getting Around", "routes"],
                ["💱 Budget Planner", "budget"],
                ["📅 Trip Builder", "itinerary"],
                ["🎒 Packing List", "packing"],
                ["✈️ Getting Here", "flights"],
              ].map(([label]) => (
                <div
                  key={label}
                  onClick={() => {
                    onOpenPlan();
                  }}
                  className="nl"
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 14,
                    color: "#5A4E3A",
                    marginBottom: 10,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #1A1610",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: "'Crimson Pro',serif",
                color: "#3A3020",
                fontSize: 12,
                fontStyle: "italic",
              }}
            >
              © 2026 GoSilkRoad · Built for travelers who want to go deeper
            </p>
            <button
              onClick={() => onOpenPlan()}
              style={{
                padding: "8px 24px",
                background: "transparent",
                border: "1px solid #C9A84C33",
                borderRadius: 20,
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#5A4E3A",
                cursor: "pointer",
              }}
            >
              PLAN YOUR TRIP →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}