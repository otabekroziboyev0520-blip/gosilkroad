import { useEffect, useState } from "react";
import { GLOBAL_CSS } from "../shared/styles";
import { PACKING, ROUTES, SEASONS } from "./data";
import VisaSearch from "./entry/VisaSearch";
import CurrencyConverter from "./currency/CurrencyConverter";
import TrainGuide from "./train/TrainGuide";
import Phrasebook from "./phrasebook/Phrasebook";
import TripBuilderSection from "./trip-builder/TripBuilderSection";
import BudgetCalculatorSection from "./budget-calculator/BudgetCalculatorSection";
import RouteOptimizerSection from "./route-optimizer/RouteOptimizerSection";

function PlanPage({ onBack, initialSection = "visa" }) {
  const [visaCountry, setVisaCountry] = useState("");
  const [visaResult, setVisaResult] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [activeSeason, setActiveSeason] = useState(null);
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    setActiveSection(initialSection || "visa");
  }, [initialSection]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const togglePack = (key) =>
    setCheckedItems((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const totalItems = Object.values(PACKING).flat().length;
  const checkedCount = checkedItems.size;

  const sections = [
    { id: "visa", icon: "🪪", label: "Visa & Entry" },
    { id: "routes", icon: "🚆", label: "Getting Around" },
    { id: "trains", icon: "🎫", label: "Train Tickets" },
    { id: "currency", icon: "💵", label: "Currency & Cash" },
    { id: "phrasebook", icon: "💬", label: "Phrasebook" },
    { id: "seasons", icon: "🌤️", label: "Best Time" },
    { id: "budget", icon: "💱", label: "Budget Planner" },
    { id: "itinerary", icon: "📅", label: "Trip Builder" },
    { id: "packing", icon: "🎒", label: "Packing List" },
    { id: "flights", icon: "✈️", label: "Getting Here" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0805",
        color: "#EDE4D0",
        overflowX: "hidden",
      }}
    >
      <style>{GLOBAL_CSS}</style>

      <div
        style={{
          background: "rgba(10,8,5,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #1A1610",
          padding: isMobile ? "0 12px" : "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            color: "#C9A84C",
            cursor: "pointer",
            fontFamily: "'Cinzel',serif",
            fontSize: isMobile ? 10 : 11,
            letterSpacing: "0.12em",
            padding: 0,
          }}
        >
          ← BACK TO EXPLORE
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🌙</span>
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: isMobile ? 12 : 14,
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "0.08em",
            }}
          >
            PLAN YOUR TRIP
          </span>
        </div>

        <div style={{ width: isMobile ? 40 : 140 }} />
      </div>

      <div
        style={{
          padding: isMobile ? "28px 14px 22px" : "48px 32px 32px",
          textAlign: "center",
          background: "linear-gradient(180deg,#1A1208,#0A0805)",
          borderBottom: "1px solid #1A1610",
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 10,
            color: "#C9A84C",
            letterSpacing: "0.3em",
            marginBottom: 12,
          }}
        >
          EVERYTHING YOU NEED TO KNOW
        </div>
        <h1
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "clamp(22px,4vw,44px)",
            fontWeight: 600,
            color: "#EDE4D0",
            marginBottom: 12,
          }}
        >
          Plan Your Uzbekistan Journey
        </h1>
        <p
          style={{
            fontFamily: "'Crimson Pro',serif",
            color: "#6B5E45",
            fontSize: isMobile ? 15 : 16,
            fontStyle: "italic",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Visa requirements, transport routes, budget planning, seasonal guide,
          packing lists, and a custom trip builder — all in one place.
        </p>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: isMobile ? "20px 12px" : "32px 24px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "210px 1fr",
          gap: isMobile ? 16 : 24,
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: isMobile ? "static" : "sticky",
            top: isMobile ? "auto" : 72,
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 9,
              color: "#5A4E3A",
              letterSpacing: "0.2em",
              marginBottom: 12,
            }}
          >
            SECTIONS
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2,minmax(0,1fr))" : "1fr",
              gap: 6,
            }}
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: isMobile ? "10px 12px" : "11px 14px",
                  background:
                    activeSection === s.id
                      ? "rgba(201,168,76,0.1)"
                      : "transparent",
                  border: `1px solid ${
                    activeSection === s.id ? "#C9A84C33" : "#1A1610"
                  }`,
                  borderLeft: `3px solid ${
                    activeSection === s.id ? "#C9A84C" : "transparent"
                  }`,
                  borderRadius: 6,
                  color: activeSection === s.id ? "#C9A84C" : "#5A4E3A",
                  fontFamily: "'Cinzel',serif",
                  fontSize: isMobile ? 10 : 11,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 15 }}>{s.icon}</span>
                <span style={{ lineHeight: 1.25 }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ animation: "fadeUp 0.3s ease", minWidth: 0 }}>
          {activeSection === "visa" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                🪪 Visa & Entry Requirements
              </h2>
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                Search your passport country to instantly check your visa requirement for Uzbekistan
              </p>

              <VisaSearch
                visaCountry={visaCountry}
                setVisaCountry={setVisaCountry}
                setVisaResult={setVisaResult}
              />

              {visaResult && (
                <div
                  style={{
                    padding: isMobile ? 18 : 24,
                    background:
                      visaResult.type === "Visa-Free"
                        ? "rgba(46,125,50,0.12)"
                        : visaResult.type === "Visa Required"
                        ? "rgba(180,50,50,0.10)"
                        : "rgba(201,168,76,0.08)",
                    border: `1px solid ${
                      visaResult.type === "Visa-Free"
                        ? "#2E7D3244"
                        : visaResult.type === "Visa Required"
                        ? "#b4323244"
                        : "#C9A84C44"
                    }`,
                    borderRadius: 14,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: isMobile ? "flex-start" : "center",
                      flexDirection: isMobile ? "column" : "row",
                      gap: 14,
                      marginBottom: 14,
                    }}
                  >
                    <span style={{ fontSize: 42 }}>{visaResult.flag}</span>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 32 }}>
                        {visaResult.type === "Visa-Free"
                          ? "✅"
                          : visaResult.type === "E-Visa"
                          ? "📱"
                          : visaResult.type === "Visa Required"
                          ? "🏛️"
                          : "🔍"}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 20,
                            color:
                              visaResult.type === "Visa-Free"
                                ? "#6BBF6A"
                                : visaResult.type === "Visa Required"
                                ? "#e07070"
                                : "#C9A84C",
                            marginBottom: 2,
                          }}
                        >
                          {visaResult.type}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Crimson Pro',serif",
                            fontSize: 14,
                            color: "#6B5E45",
                          }}
                        >
                          Maximum stay:{" "}
                          <strong style={{ color: "#EDE4D0" }}>
                            {visaResult.duration}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Crimson Pro',serif",
                      fontSize: 15,
                      color: "#8A7A60",
                      lineHeight: 1.7,
                    }}
                  >
                    {visaResult.note}
                  </p>

                  {visaResult.type === "E-Visa" && (
                    <a
                      href="https://e-visa.gov.uz/main"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 14,
                        padding: "9px 22px",
                        background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                        borderRadius: 22,
                        color: "#0A0805",
                        fontFamily: "'Cinzel',serif",
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textDecoration: "none",
                      }}
                    >
                      APPLY FOR E-VISA →
                    </a>
                  )}

                  {visaResult.type === "Visa Required" && (
                    <a
                      href="https://gov.uz/oz/mfa/sections/o-zbekiston-respublikasining-xorijdagi-diplomatik-vakolatxonalari-va-konsullik-muassasalari"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 14,
                        padding: "9px 22px",
                        background: "rgba(180,50,50,0.2)",
                        border: "1px solid #b4323255",
                        borderRadius: 22,
                        color: "#e07070",
                        fontFamily: "'Cinzel',serif",
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textDecoration: "none",
                      }}
                    >
                      FIND UZBEK EMBASSY →
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {activeSection === "routes" && <RouteOptimizerSection />}
          {activeSection === "budget" && <BudgetCalculatorSection />}
          {activeSection === "itinerary" && <TripBuilderSection />}

          {activeSection === "seasons" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                🌤️ Best Time to Visit
              </h2>
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                Uzbekistan has four distinct seasons — each with a completely different travel experience.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                  gap: 14,
                  marginBottom: 24,
                }}
              >
                {SEASONS.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveSeason(activeSeason === i ? null : i)}
                    style={{
                      padding: 22,
                      background:
                        activeSeason === i
                          ? "rgba(201,168,76,0.1)"
                          : "#111009",
                      border: `1px solid ${
                        activeSeason === i ? "#C9A84C44" : "#1A1610"
                      }`,
                      borderRadius: 12,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <span style={{ fontSize: 30 }}>{s.icon}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 15,
                        color: "#EDE4D0",
                        marginBottom: 3,
                      }}
                    >
                      {s.season}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 13,
                        color: "#C9A84C",
                      }}
                    >
                      {s.months} · {s.temp}
                    </div>
                    {activeSeason === i && (
                      <p
                        style={{
                          fontFamily: "'Crimson Pro',serif",
                          fontSize: 14,
                          color: "#8A7A60",
                          lineHeight: 1.7,
                          marginTop: 10,
                          borderTop: "1px solid #1A1610",
                          paddingTop: 12,
                        }}
                      >
                        {s.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "packing" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                🎒 Packing Checklist
              </h2>
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Check off items as you pack — your progress is saved during this session
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {Object.entries(PACKING).map(([category, items]) => (
                  <div
                    key={category}
                    style={{
                      background: "#111009",
                      border: "1px solid #1A1610",
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 18px",
                        background: "#0F0E0A",
                        borderBottom: "1px solid #1A1610",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 11,
                          color: "#C9A84C",
                          letterSpacing: "0.12em",
                        }}
                      >
                        {category.toUpperCase()}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          color: "#5A4E3A",
                        }}
                      >
                        {items.filter((i) => checkedItems.has(i.key)).length}/{items.length}
                      </span>
                    </div>
                    {items.map((item) => (
                      <div
                        key={item.key}
                        onClick={() => togglePack(item.key)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "12px 18px",
                          borderBottom: "1px solid #0A0805",
                          cursor: "pointer",
                          background: checkedItems.has(item.key)
                            ? "rgba(201,168,76,0.04)"
                            : "transparent",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 4,
                            border: `1.5px solid ${
                              checkedItems.has(item.key)
                                ? "#C9A84C"
                                : "#2A2418"
                            }`,
                            background: checkedItems.has(item.key)
                              ? "#C9A84C"
                              : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {checkedItems.has(item.key) && (
                            <span
                              style={{
                                color: "#0A0805",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Crimson Pro',serif",
                            fontSize: 14,
                            color: checkedItems.has(item.key)
                              ? "#4A3E2E"
                              : "#8A7A60",
                            textDecoration: checkedItems.has(item.key)
                              ? "line-through"
                              : "none",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "flights" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                ✈️ Getting to Uzbekistan
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                  gap: 14,
                }}
              >
                {[
                  {
                    hub: "Istanbul 🇹🇷",
                    airline: "Turkish Airlines",
                    time: "4–5 hrs",
                    freq: "Daily",
                  },
                  {
                    hub: "Dubai 🇦🇪",
                    airline: "Flydubai / Emirates",
                    time: "3–4 hrs",
                    freq: "Daily",
                  },
                  {
                    hub: "Moscow 🇷🇺",
                    airline: "Aeroflot / Uzbekistan Airways",
                    time: "3.5 hrs",
                    freq: "Multiple daily",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 20,
                      background: "#111009",
                      border: "1px solid #1A1610",
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 16,
                        color: "#EDE4D0",
                        marginBottom: 4,
                      }}
                    >
                      {f.hub}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 13,
                        color: "#C9A84C",
                        marginBottom: 8,
                      }}
                    >
                      {f.airline}
                    </div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          color: "#5A4E3A",
                        }}
                      >
                        ⏱ {f.time}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          color: "#5A4E3A",
                        }}
                      >
                        📅 {f.freq}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "currency" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                💵 Currency & Cash Guide
              </h2>
              <CurrencyConverter />
            </div>
          )}

          {activeSection === "trains" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                🎫 Train Ticket Guide
              </h2>
              <TrainGuide />
            </div>
          )}

          {activeSection === "phrasebook" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                💬 Uzbek & Russian Phrasebook
              </h2>
              <Phrasebook />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanPage;
