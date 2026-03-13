import { useState } from "react";
import { GLOBAL_CSS } from "../shared/styles";
import { PACKING, BUDGET, ROUTES, SEASONS } from "./data";
import VisaSearch from "./entry/VisaSearch";
import CurrencyConverter from "./currency/CurrencyConverter";
import TrainGuide from "./train/TrainGuide";
import Phrasebook from "./phrasebook/Phrasebook";
import TripBuilderSection from "./trip-builder/TripBuilderSection";

function PlanPage({ onBack }) {
  const [visaCountry, setVisaCountry] = useState("");
  const [visaResult, setVisaResult] = useState(null);
  const [budgetLevel, setBudgetLevel] = useState(1);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [activeSeason, setActiveSeason] = useState(null);
  const [activeSection, setActiveSection] = useState("visa");

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
    <div style={{ minHeight: "100vh", background: "#0A0805", color: "#EDE4D0" }}>
      <style>{GLOBAL_CSS}</style>

      {/* Header */}
      <div
        style={{
          background: "rgba(10,8,5,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #1A1610",
          padding: "0 32px",
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
            fontSize: 11,
            letterSpacing: "0.15em",
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
              fontSize: 14,
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "0.08em",
            }}
          >
            PLAN YOUR TRIP
          </span>
        </div>

        <div style={{ width: 140 }} />
      </div>

      {/* Hero Banner */}
      <div
        style={{
          padding: "48px 32px 32px",
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
            fontSize: 16,
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
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "210px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Sidebar */}
        <div style={{ position: "sticky", top: 72 }}>
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

          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "11px 14px",
                marginBottom: 5,
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
                borderRadius: 4,
                color: activeSection === s.id ? "#C9A84C" : "#5A4E3A",
                fontFamily: "'Cinzel',serif",
                fontSize: 11,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}

          <div
            style={{
              marginTop: 20,
              padding: "16px",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 9,
                color: "#C9A84C",
                letterSpacing: "0.15em",
                marginBottom: 10,
              }}
            >
              QUICK FACTS
            </div>

            {[
              ["💰", "$1 = 12,700 UZS"],
              ["⏰", "GMT+5 (no DST)"],
              ["🌐", "Uzbek + Russian"],
              ["🔌", "Type C/F plugs"],
              ["📞", "+998 country code"],
              ["🌡️", "Best: Apr–May, Sep–Oct"],
            ].map(([i, t]) => (
              <div key={t} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                <span style={{ fontSize: 12 }}>{i}</span>
                <span
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 12,
                    color: "#6B5E45",
                    lineHeight: 1.4,
                  }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          {/* VISA */}
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
                Search your passport country to instantly check your visa
                requirement for Uzbekistan
              </p>

              <VisaSearch
                visaCountry={visaCountry}
                setVisaCountry={setVisaCountry}
                setVisaResult={setVisaResult}
              />

              {visaResult && (
                <div
                  style={{
                    padding: 24,
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
                    animation: "fadeUp 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
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
                      href="https://e-visa.uzbekistan.go.uz"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 14,
                        padding: "9px 22px",
                        background:
                          "linear-gradient(135deg,#C9A84C,#8B6914)",
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
                      href="https://mfa.uz/en/pages/embassies-and-consulates"
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

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                  gap: 14,
                }}
              >
                {[
                  {
                    icon: "📋",
                    title: "What to Bring",
                    items: [
                      "Valid passport (6+ months remaining)",
                      "Return or onward flight ticket",
                      "Hotel booking confirmation",
                      "Proof of funds (~$50/day recommended)",
                    ],
                  },
                  {
                    icon: "🏨",
                    title: "On Arrival",
                    items: [
                      "Hotels auto-register you (law requires)",
                      "Keep all registration slips — show on departure",
                      "Fill customs declaration form (given on plane)",
                      "ATMs available at Tashkent airport",
                    ],
                  },
                  {
                    icon: "⚠️",
                    title: "Key Notes",
                    items: [
                      "No visa-on-arrival — prepare beforehand",
                      "Photography restricted at some sites",
                      "Dress modestly at all religious sites",
                      "Currency exchange: banks beat hotel rates",
                    ],
                  },
                ].map((box, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 20,
                      background: "#111009",
                      border: "1px solid #1A1610",
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{box.icon}</div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 11,
                        color: "#C9A84C",
                        marginBottom: 12,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {box.title.toUpperCase()}
                    </div>
                    {box.items.map((item, j) => (
                      <div
                        key={j}
                        style={{ display: "flex", gap: 8, marginBottom: 7 }}
                      >
                        <span style={{ color: "#C9A84C44", flexShrink: 0 }}>—</span>
                        <span
                          style={{
                            fontFamily: "'Crimson Pro',serif",
                            fontSize: 13,
                            color: "#8A7A60",
                            lineHeight: 1.5,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROUTES */}
          {activeSection === "routes" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                🚆 Getting Around Uzbekistan
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
                All major transport connections between the Silk Road cities,
                with real prices and insider tips
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                {ROUTES.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "18px 22px",
                      background: "#111009",
                      border: "1px solid #1A1610",
                      borderRadius: 12,
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 11,
                          color: "#C9A84C",
                          letterSpacing: "0.08em",
                          marginBottom: 5,
                        }}
                      >
                        {r.from} → {r.to}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Crimson Pro',serif",
                          fontSize: 17,
                          color: "#EDE4D0",
                          marginBottom: 3,
                        }}
                      >
                        {r.mode}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Crimson Pro',serif",
                          fontSize: 12,
                          color: "#6B5E45",
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}
                      >
                        {r.tip}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 20,
                          color: "#C9A84C",
                          fontWeight: 700,
                        }}
                      >
                        {r.price}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          color: "#6B5E45",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {r.time} · {r.freq}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: 22,
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 11,
                    color: "#C9A84C",
                    letterSpacing: "0.15em",
                    marginBottom: 12,
                  }}
                >
                  💡 RUSTAM'S TRANSPORT TIPS
                </div>

                {[
                  "Install Yandex Go before arriving — it's Uber for Central Asia. Works in all major cities, GPS-tracked, fixed prices.",
                  "Book train tickets at uzrailpass.uz at least 2 weeks ahead in peak season (April–October). Very affordable and comfortable.",
                  "The Afrosiyob bullet train Tashkent↔Samarkand is fast, cheap and scenic — always take it over flying this route.",
                  "For Khiva: the domestic flight from Tashkent saves 4+ hours. Book on uzairways.com as early as possible.",
                  "Shared taxis ('taksi') are cheap for short intercity hops but chaotic. Agree on price before getting in.",
                ].map((tip, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", gap: 10, marginBottom: 9 }}
                  >
                    <span style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }}>
                      ◆
                    </span>
                    <span
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 14,
                        color: "#8A7A60",
                        lineHeight: 1.6,
                      }}
                    >
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEASONS */}
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
                Uzbekistan has four distinct seasons — each with a completely
                different travel experience. Click a season for full details.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
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
                      transition: "all 0.25s",
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
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <span
                              key={j}
                              style={{
                                color: j < s.rating ? "#C9A84C" : "#2A2418",
                                fontSize: 13,
                              }}
                            >
                              ★
                            </span>
                          ))}
                      </div>
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
                        marginBottom: activeSeason === i ? 10 : 0,
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

              <div
                style={{
                  padding: 22,
                  background: "#111009",
                  border: "1px solid #1A1610",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 11,
                    color: "#C9A84C",
                    letterSpacing: "0.15em",
                    marginBottom: 12,
                  }}
                >
                  📅 NAVRUZ FESTIVAL — MARCH 21
                </div>
                <p
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 15,
                    color: "#8A7A60",
                    lineHeight: 1.7,
                  }}
                >
                  Uzbekistan's most important holiday — the Persian New Year
                  celebrated on the spring equinox. Streets fill with music,
                  dancing, sumalak (slow-cooked wheat porridge), traditional
                  games and extraordinary hospitality from strangers. If you can
                  arrange your trip to include March 21st, do it. No guidebook
                  can fully describe the experience.
                </p>
              </div>
            </div>
          )}

          {/* BUDGET */}
          {activeSection === "budget" && (
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: "#EDE4D0",
                  marginBottom: 6,
                }}
              >
                💱 Budget Planner
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
                Plan your daily spend across three travel styles — all genuinely
                achievable in Uzbekistan
              </p>

              <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                {BUDGET.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setBudgetLevel(i)}
                    style={{
                      padding: "10px 24px",
                      background:
                        budgetLevel === i
                          ? "rgba(201,168,76,0.15)"
                          : "transparent",
                      border: `1px solid ${
                        budgetLevel === i ? "#C9A84C" : "#2A2418"
                      }`,
                      borderRadius: 24,
                      color: budgetLevel === i ? "#C9A84C" : "#5A4E3A",
                      fontFamily: "'Cinzel',serif",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {b.icon} {b.level}
                  </button>
                ))}
              </div>

              {(() => {
                const b = BUDGET[budgetLevel];
                return (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <div
                      style={{
                        padding: 24,
                        background: "rgba(201,168,76,0.07)",
                        border: "1px solid #C9A84C33",
                        borderRadius: 14,
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ marginBottom: 18 }}>
                        <div
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 10,
                            color: "#C9A84C",
                            letterSpacing: "0.2em",
                            marginBottom: 4,
                          }}
                        >
                          ESTIMATED DAILY BUDGET
                        </div>
                        <div
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 40,
                            color: "#EDE4D0",
                            fontWeight: 700,
                          }}
                        >
                          {b.daily}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                        {[
                          ["🏨", "Accommodation", b.stay],
                          ["🍽️", "Food", b.eat],
                          ["🚌", "Transport", b.get],
                        ].map(([ic, label, val]) => (
                          <div
                            key={label}
                            style={{
                              padding: "12px 16px",
                              background: "#0A0805",
                              border: "1px solid #1A1610",
                              borderRadius: 10,
                              flex: "1",
                              minWidth: 130,
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Cinzel',serif",
                                fontSize: 9,
                                color: "#5A4E3A",
                                letterSpacing: "0.1em",
                                marginBottom: 4,
                              }}
                            >
                              {ic} {label.toUpperCase()}
                            </div>
                            <div
                              style={{
                                fontFamily: "'Crimson Pro',serif",
                                fontSize: 13,
                                color: "#8A7A60",
                                lineHeight: 1.5,
                              }}
                            >
                              {val}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 10,
                            color: "#C9A84C",
                            letterSpacing: "0.15em",
                            marginBottom: 10,
                          }}
                        >
                          MONEY-SAVING TIPS
                        </div>
                        {b.tips.map((tip, j) => (
                          <div
                            key={j}
                            style={{ display: "flex", gap: 10, marginBottom: 9 }}
                          >
                            <span style={{ color: "#C9A84C", flexShrink: 0 }}>
                              ◆
                            </span>
                            <span
                              style={{
                                fontFamily: "'Crimson Pro',serif",
                                fontSize: 14,
                                color: "#8A7A60",
                                lineHeight: 1.6,
                              }}
                            >
                              {tip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(165px,1fr))",
                        gap: 10,
                      }}
                    >
                      {[
                        ["Budget Meal", "$1–3"],
                        ["Restaurant", "$5–15"],
                        ["Train (per leg)", "$8–15"],
                        ["Museum entry", "$1–7"],
                        ["Hotel/night", "$15–300"],
                        ["City taxi", "$1–3"],
                        ["Souvenir suzani", "$10–80"],
                        ["Guided day tour", "$50–150"],
                        ["SIM card", "$2–5"],
                        ["Hammam bath", "$5–15"],
                      ].map(([label, price]) => (
                        <div
                          key={label}
                          style={{
                            padding: "12px 14px",
                            background: "#111009",
                            border: "1px solid #1A1610",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Crimson Pro',serif",
                              fontSize: 13,
                              color: "#6B5E45",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Cinzel',serif",
                              fontSize: 12,
                              color: "#C9A84C",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TRIP BUILDER */}
          {activeSection === "itinerary" && <TripBuilderSection />}

          {activeSection === "packing" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 24,
                      color: "#EDE4D0",
                      marginBottom: 4,
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
                    }}
                  >
                    Check off items as you pack — your progress is saved during
                    this session
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 30,
                      color: "#C9A84C",
                      fontWeight: 700,
                    }}
                  >
                    {checkedCount}/{totalItems}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 9,
                      color: "#5A4E3A",
                      letterSpacing: "0.12em",
                      marginBottom: 6,
                    }}
                  >
                    ITEMS PACKED
                  </div>
                  <div
                    style={{
                      height: 4,
                      width: 130,
                      background: "#1A1610",
                      borderRadius: 2,
                    }}
                  >
                    <div
                      style={{
                        width: `${(checkedCount / totalItems) * 100}%`,
                        height: "100%",
                        background: "linear-gradient(90deg,#C9A84C,#F5D78E)",
                        borderRadius: 2,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                </div>
              </div>

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
                        {items.filter((i) => checkedItems.has(i.key)).length}/
                        {items.length}
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
                          transition: "background 0.15s",
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
                            transition: "all 0.2s",
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
                            transition: "all 0.2s",
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

          {/* FLIGHTS */}
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
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                All major international routes into Tashkent International
                Airport (TAS) — the main hub
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                  gap: 14,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    hub: "Istanbul 🇹🇷",
                    airline: "Turkish Airlines",
                    time: "4–5 hrs",
                    freq: "Daily",
                    note: "Most popular European route. Great connections from UK, Germany, France, and beyond.",
                  },
                  {
                    hub: "Dubai 🇦🇪",
                    airline: "Flydubai / Emirates",
                    time: "3–4 hrs",
                    freq: "Daily",
                    note: "Best option from Middle East, South Asia, East Africa. Competitive prices.",
                  },
                  {
                    hub: "Moscow 🇷🇺",
                    airline: "Aeroflot / Uzbekistan Airways",
                    time: "3.5 hrs",
                    freq: "Multiple daily",
                    note: "Cheapest route from Russia and CIS countries. Many frequencies.",
                  },
                  {
                    hub: "Frankfurt 🇩🇪",
                    airline: "Uzbekistan Airways",
                    time: "6 hrs",
                    freq: "3x weekly",
                    note: "Direct from Central Europe. Good for German, Swiss and Austrian travelers.",
                  },
                  {
                    hub: "Beijing 🇨🇳",
                    airline: "Air China / Uzbekistan Airways",
                    time: "5–6 hrs",
                    freq: "Several weekly",
                    note: "Growing Chinese tourist traffic. Book early in peak season.",
                  },
                  {
                    hub: "London 🇬🇧",
                    airline: "Via Istanbul or Dubai",
                    time: "8–10 hrs",
                    freq: "With 1 stop",
                    note: "No direct London–Tashkent route currently. Turkish Airlines via Istanbul is best.",
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
                    <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          color: "#5A4E3A",
                          letterSpacing: "0.06em",
                        }}
                      >
                        ⏱ {f.time}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          color: "#5A4E3A",
                          letterSpacing: "0.06em",
                        }}
                      >
                        📅 {f.freq}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 13,
                        color: "#6B5E45",
                        lineHeight: 1.6,
                      }}
                    >
                      {f.note}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: 22,
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 11,
                    color: "#C9A84C",
                    letterSpacing: "0.15em",
                    marginBottom: 14,
                  }}
                >
                  🛬 TASHKENT AIRPORT ARRIVAL TIPS
                </div>

                {[
                  "No visa-on-arrival — make sure your e-visa or visa-free status is sorted before your flight.",
                  "Currency exchange at the airport is fair — rates are similar to city banks. Better than hotel exchange.",
                  "Yandex Go from airport to city center costs ~$1.20. Walk past the taxi touts — they charge 10x the real price.",
                  "Free SIM cards for tourists from Ucell or Beeline kiosks are available at the arrivals exit.",
                  "Keep your customs declaration form carefully — you must present it again when departing.",
                  "The airport has good wifi — download Yandex Go and maps.me before leaving the terminal.",
                ].map((tip, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", gap: 10, marginBottom: 9 }}
                  >
                    <span style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }}>
                      ◆
                    </span>
                    <span
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 14,
                        color: "#8A7A60",
                        lineHeight: 1.6,
                      }}
                    >
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CURRENCY */}
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
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                The Uzbek som confuses almost every visitor. Here's everything
                you need to handle money confidently.
              </p>

              <CurrencyConverter />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                  gap: 14,
                  marginTop: 28,
                }}
              >
                {[
                  {
                    icon: "🏧",
                    title: "ATMs — The Truth",
                    items: [
                      "Tashkent: ATMs everywhere, reliable",
                      "Samarkand & Bukhara: ATMs work but limit is 1–2M UZS per transaction",
                      "Khiva: Very few ATMs — withdraw before arriving",
                      "Visa/Mastercard both work; AmEx rarely accepted",
                      "Best ATMs: Ipak Yuli Bank, Orient Finance, Kapitalbank",
                    ],
                  },
                  {
                    icon: "💳",
                    title: "Card Acceptance",
                    items: [
                      "Restaurants in tourist areas: ~70% accept cards",
                      "Local bazaars & street food: Cash only",
                      "Hotels: Cards widely accepted",
                      "Taxis (Yandex Go): Cash by default, some accept cards",
                      "Museum entry fees: Usually cash only",
                    ],
                  },
                  {
                    icon: "💱",
                    title: "Where to Exchange",
                    items: [
                      "Airport exchange desks: Fair rates, use them on arrival",
                      "City banks: Best official rates (Kapitalbank, Ipak Yuli)",
                      "Hotels: Convenient but 3–5% worse rate",
                      "Street exchange: Illegal — avoid even if offered better rate",
                      "Tip: Exchange $100–200 at airport, top up at banks in cities",
                    ],
                  },
                  {
                    icon: "💰",
                    title: "Cash Carrying Tips",
                    items: [
                      "Bring crisp, clean USD or EUR — damaged notes often refused",
                      "₹, ¥, ₩ are NOT exchangeable outside Tashkent",
                      "The highest note is 100,000 UZS (~$8) — you'll carry thick wads",
                      "Divide cash across wallet, bag & hotel safe",
                      "Budget: ~500,000 UZS/day ($40) covers most mid-range travel",
                    ],
                  },
                ].map((box, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 20,
                      background: "#111009",
                      border: "1px solid #1A1610",
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{box.icon}</div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 11,
                        color: "#C9A84C",
                        marginBottom: 12,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {box.title.toUpperCase()}
                    </div>
                    {box.items.map((item, j) => (
                      <div
                        key={j}
                        style={{ display: "flex", gap: 8, marginBottom: 7 }}
                      >
                        <span style={{ color: "#C9A84C55", flexShrink: 0 }}>—</span>
                        <span
                          style={{
                            fontFamily: "'Crimson Pro',serif",
                            fontSize: 13,
                            color: "#8A7A60",
                            lineHeight: 1.5,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 24,
                  padding: 20,
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 11,
                    color: "#C9A84C",
                    letterSpacing: "0.15em",
                    marginBottom: 14,
                  }}
                >
                  📊 QUICK PRICE REFERENCE
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                    gap: 8,
                  }}
                >
                  {[
                    ["Street plov", "8,000–15,000 UZS"],
                    ["Restaurant meal", "30,000–80,000 UZS"],
                    ["Museum entry", "15,000–100,000 UZS"],
                    ["City taxi (Yandex)", "8,000–25,000 UZS"],
                    ["500ml water", "3,000–5,000 UZS"],
                    ["Hotel (budget)", "from 200,000 UZS"],
                    ["Hotel (mid-range)", "from 600,000 UZS"],
                    ["Domestic flight", "$30–80 USD"],
                    ["Train ticket", "$8–15 USD"],
                    ["SIM card (30-day)", "~30,000 UZS"],
                  ].map(([item, price], i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "#0A0805",
                        borderRadius: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Crimson Pro',serif",
                          fontSize: 13,
                          color: "#6B5E45",
                        }}
                      >
                        {item}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 11,
                          color: "#EDE4D0",
                        }}
                      >
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TRAINS */}
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
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  marginBottom: 8,
                  lineHeight: 1.6,
                }}
              >
                uzrailpass.uz is notoriously frustrating for foreigners.
                This step-by-step guide gets you through it.
              </p>

              <div
                style={{
                  padding: "10px 16px",
                  background: "rgba(180,80,40,0.12)",
                  border: "1px solid rgba(200,100,50,0.3)",
                  borderRadius: 10,
                  marginBottom: 24,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                <span
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 14,
                    color: "#c8764a",
                    lineHeight: 1.6,
                  }}
                >
                  The official site rejects most foreign Visa/Mastercards.
                  Scroll down for working payment workarounds — many travelers
                  need them.
                </span>
              </div>

              <TrainGuide />
            </div>
          )}

          {/* PHRASEBOOK */}
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
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  color: "#6B5E45",
                  fontStyle: "italic",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                Both Uzbek and Russian are used daily. Uzbek is the national
                language; Russian is widely spoken in cities and by older
                generations. A few words go a very long way.
              </p>

              <Phrasebook />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanPage;