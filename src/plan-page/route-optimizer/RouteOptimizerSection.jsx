import { useMemo, useState } from "react";

const COLORS = {
  bg: "#0A0805",
  card: "#111009",
  border: "#1A1610",
  gold: "#C9A84C",
  goldSoft: "rgba(201,168,76,0.12)",
  text: "#EDE4D0",
  muted: "#8A7A60",
  dim: "#6B5E45",
  good: "#7EC97E",
  warn: "#E0B15A",
  bad: "#D97B7B",
};

const CITY_DATA = {
  tashkent: {
    id: "tashkent",
    name: "Tashkent",
    icon: "🏙️",
    routeOrder: 1,
  },
  samarkand: {
    id: "samarkand",
    name: "Samarkand",
    icon: "🕌",
    routeOrder: 2,
  },
  bukhara: {
    id: "bukhara",
    name: "Bukhara",
    icon: "🏛️",
    routeOrder: 3,
  },
  khiva: {
    id: "khiva",
    name: "Khiva",
    icon: "🧱",
    routeOrder: 4,
  },
  fergana: {
    id: "fergana",
    name: "Fergana Valley",
    icon: "🌿",
    routeOrder: 5,
  },
  mountains: {
    id: "mountains",
    name: "Mountains / Chimgan",
    icon: "🏔️",
    routeOrder: 6,
  },
  nukus: {
    id: "nukus",
    name: "Nukus / Karakalpakstan",
    icon: "🎨",
    routeOrder: 7,
  },
};

const PRIORITIES = [
  { id: "first-timer", label: "Best first-time route", icon: "✨" },
  { id: "fastest", label: "Fastest", icon: "⚡" },
  { id: "cheapest", label: "Cheapest", icon: "💸" },
  { id: "comfortable", label: "Most comfortable", icon: "🛋️" },
];

const TRANSPORT_MAP = {
  "tashkent-samarkand": {
    train: { label: "🚄 Afrosiyob high-speed train", time: 2.1, cost: 12, comfort: 9, note: "Fastest and easiest option." },
    taxi: { label: "🚕 Private transfer / taxi", time: 4.5, cost: 75, comfort: 6, note: "Flexible but slower." },
    flight: null,
  },
  "samarkand-bukhara": {
    train: { label: "🚆 Train", time: 2.0, cost: 10, comfort: 8, note: "Best value and tourist-friendly." },
    taxi: { label: "🚕 Taxi", time: 4.0, cost: 55, comfort: 6, note: "Useful if train times do not fit." },
    flight: null,
  },
  "bukhara-khiva": {
    train: null,
    taxi: { label: "🚕 Shared/private taxi", time: 4.8, cost: 40, comfort: 6, note: "Most common overland option." },
    flight: { label: "✈️ Domestic flight (when available)", time: 2.3, cost: 55, comfort: 8, note: "Best if timing lines up." },
  },
  "tashkent-bukhara": {
    train: { label: "🚄 Train", time: 4.0, cost: 18, comfort: 8, note: "Smooth and efficient for most travelers." },
    taxi: null,
    flight: { label: "✈️ Domestic flight", time: 2.2, cost: 50, comfort: 7, note: "Best when saving time matters." },
  },
  "tashkent-khiva": {
    train: { label: "🚆 Overnight train", time: 12.5, cost: 25, comfort: 6, note: "Cheaper, but very time-heavy." },
    taxi: null,
    flight: { label: "✈️ Flight to Urgench + transfer", time: 2.0, cost: 60, comfort: 8, note: "Huge time saver." },
  },
  "tashkent-fergana": {
    train: null,
    taxi: { label: "🚗 Car / transfer", time: 5.0, cost: 55, comfort: 6, note: "Most practical for flexibility." },
    flight: null,
  },
  "tashkent-mountains": {
    train: null,
    taxi: { label: "🚗 Day trip / transfer", time: 2.0, cost: 28, comfort: 7, note: "Easy nature add-on from Tashkent." },
    flight: null,
  },
  "tashkent-nukus": {
    train: null,
    taxi: null,
    flight: { label: "✈️ Domestic flight", time: 2.3, cost: 70, comfort: 8, note: "Best way to avoid a very long overland transfer." },
  },
};

function getOptionsForLeg(from, to) {
  const direct =
    TRANSPORT_MAP[`${from}-${to}`] || TRANSPORT_MAP[`${to}-${from}`];

  if (direct) {
    return Object.entries(direct)
      .filter(([, option]) => Boolean(option))
      .map(([mode, option]) => ({ mode, ...option }));
  }

  return [
    {
      mode: "taxi",
      label: "🚕 Flexible transfer / custom route",
      time: 5.5,
      cost: 50,
      comfort: 6,
      note: "This leg depends on exact route and season.",
    },
  ];
}

function pickBestOption(options, priority) {
  if (priority === "fastest") {
    return [...options].sort((a, b) => a.time - b.time)[0];
  }
  if (priority === "cheapest") {
    return [...options].sort((a, b) => a.cost - b.cost)[0];
  }
  if (priority === "comfortable") {
    return [...options].sort((a, b) => b.comfort - a.comfort || a.time - b.time)[0];
  }
  // first-timer
  return [...options].sort((a, b) => {
    const aScore = a.comfort * 1.5 - a.time * 0.7 - a.cost * 0.03;
    const bScore = b.comfort * 1.5 - b.time * 0.7 - b.cost * 0.03;
    return bScore - aScore;
  })[0];
}

function computeEfficiency(days, legs, route, priority) {
  const totalTime = legs.reduce((sum, leg) => sum + leg.choice.time, 0);
  const cityChanges = Math.max(route.length - 1, 0);

  let score = 100;
  score -= totalTime * 4;
  score -= cityChanges * 4;

  if (days <= 5 && route.includes("khiva")) score -= 15;
  if (days <= 5 && route.length >= 4) score -= 18;
  if (days <= 4 && route.length >= 3) score -= 14;
  if (priority === "cheapest" && totalTime > 10) score -= 6;
  if (priority === "fastest" && legs.some((leg) => leg.choice.mode === "flight")) score += 4;
  if (priority === "first-timer" && route.includes("samarkand") && route.includes("bukhara")) score += 5;

  return Math.max(28, Math.min(98, Math.round(score)));
}

function buildWarnings(days, route, legs, priority) {
  const warnings = [];
  const totalTime = legs.reduce((sum, leg) => sum + leg.choice.time, 0);

  if (days <= 5 && route.includes("khiva")) {
    warnings.push("Khiva makes a short trip feel much tighter unless you fly part of the route.");
  }
  if (route.length >= 4 && days <= 5) {
    warnings.push("You are trying to cover many cities in limited time. Consider dropping one stop.");
  }
  if (totalTime >= 10) {
    warnings.push("This route spends a noticeable part of the trip in transit.");
  }
  if (priority === "cheapest") {
    warnings.push("Cheapest routes often save money but can cost you comfort or extra hours.");
  }
  if (priority === "fastest" && legs.some((leg) => leg.choice.mode === "flight")) {
    warnings.push("Flights save time, but schedules matter more than on train routes.");
  }
  if (!warnings.length) {
    warnings.push("This route looks realistic and well-balanced for the time you selected.");
  }

  return warnings.slice(0, 3);
}

function buildWhy(route, priority, efficiency) {
  if (priority === "first-timer") {
    return "This route prioritizes smooth city flow, strong first-time highlights, and low decision friction.";
  }
  if (priority === "fastest") {
    return "This route reduces wasted transit hours and favors the quickest workable connections.";
  }
  if (priority === "cheapest") {
    return "This route leans toward lower transport spend, even when that means slower movement.";
  }
  if (efficiency >= 85) {
    return "This route balances comfort, pace, and intercity logic unusually well.";
  }
  return "This route is optimized for a more relaxed and comfortable travel experience.";
}

function clampCityCount(days) {
  if (days <= 4) return 2;
  if (days <= 6) return 3;
  if (days <= 9) return 4;
  return 5;
}

function buildRoute(startCity, selectedCities, days, priority) {
  const desired = [...new Set([startCity, ...selectedCities])]
    .filter((id) => CITY_DATA[id])
    .sort((a, b) => CITY_DATA[a].routeOrder - CITY_DATA[b].routeOrder);

  const maxCities = clampCityCount(days);
  let route = desired.slice(0, maxCities);

  if (priority === "first-timer") {
    const preferred = ["tashkent", "samarkand", "bukhara", "khiva"];
    const merged = [...new Set([startCity, ...preferred.filter((id) => desired.includes(id)), ...desired])];
    route = merged.slice(0, maxCities);
  }

  if (priority === "fastest") {
    route = desired
      .sort((a, b) => CITY_DATA[a].routeOrder - CITY_DATA[b].routeOrder)
      .slice(0, maxCities);
  }

  return [...new Set(route)];
}

function Chip({ active, children, onClick, small = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: small ? "8px 12px" : "10px 14px",
        borderRadius: 999,
        border: `1px solid ${active ? COLORS.gold : "#2A2418"}`,
        background: active ? COLORS.goldSoft : "transparent",
        color: active ? COLORS.gold : COLORS.dim,
        fontFamily: "'Cinzel',serif",
        fontSize: small ? 10 : 11,
        letterSpacing: "0.04em",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 18,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Cinzel',serif",
        fontSize: 10,
        color: COLORS.gold,
        letterSpacing: "0.14em",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        padding: "12px 10px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${COLORS.border}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 10,
          color: COLORS.gold,
          letterSpacing: "0.08em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 13,
          color: COLORS.text,
          lineHeight: 1.3,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function RouteOptimizerSection() {
  const [days, setDays] = useState(7);
  const [startCity, setStartCity] = useState("tashkent");
  const [priority, setPriority] = useState("first-timer");
  const [selectedCities, setSelectedCities] = useState(["samarkand", "bukhara", "khiva"]);

  const toggleCity = (id) => {
    if (id === startCity) return;
    setSelectedCities((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  const result = useMemo(() => {
    const route = buildRoute(startCity, selectedCities, days, priority);

    const legs = [];
    for (let i = 0; i < route.length - 1; i += 1) {
      const from = route[i];
      const to = route[i + 1];
      const options = getOptionsForLeg(from, to);
      const choice = pickBestOption(options, priority);
      legs.push({ from, to, options, choice });
    }

    const totalTime = legs.reduce((sum, leg) => sum + leg.choice.time, 0);
    const totalCost = legs.reduce((sum, leg) => sum + leg.choice.cost, 0);
    const efficiency = computeEfficiency(days, legs, route, priority);
    const warnings = buildWarnings(days, route, legs, priority);
    const why = buildWhy(route, priority, efficiency);

    return {
      route,
      legs,
      totalTime,
      totalCost,
      efficiency,
      warnings,
      why,
    };
  }, [days, startCity, priority, selectedCities]);

  const scoreColor =
    result.efficiency >= 85 ? COLORS.good : result.efficiency >= 70 ? COLORS.warn : COLORS.bad;

  return (
    <div>
      <h2
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 24,
          color: COLORS.text,
          marginBottom: 6,
        }}
      >
        🚆 Route & Transport Optimizer
      </h2>

      <p
        style={{
          fontFamily: "'Crimson Pro',serif",
          color: COLORS.dim,
          fontStyle: "italic",
          marginBottom: 28,
          lineHeight: 1.6,
          fontSize: 16,
          maxWidth: 760,
        }}
      >
        Find the smartest Uzbekistan route for your trip length and travel priority —
        with best transport choices, realistic timing, and route-efficiency warnings.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 22,
          alignItems: "start",
        }}
      >
        <Card>
          <SectionLabel>ROUTE INPUTS</SectionLabel>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Trip length</div>
            <div style={chipWrapStyle}>
              {[4, 5, 7, 9, 12].map((value) => (
                <Chip key={value} active={days === value} onClick={() => setDays(value)}>
                  {value} days
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Starting city</div>
            <div style={chipWrapStyle}>
              {["tashkent", "samarkand", "bukhara"].map((id) => (
                <Chip key={id} active={startCity === id} onClick={() => setStartCity(id)}>
                  {CITY_DATA[id].icon} {CITY_DATA[id].name}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>What matters most?</div>
            <div style={chipWrapStyle}>
              {PRIORITIES.map((item) => (
                <Chip
                  key={item.id}
                  active={priority === item.id}
                  onClick={() => setPriority(item.id)}
                >
                  {item.icon} {item.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <div style={subheadingStyle}>Cities you want to include</div>
            <div style={chipWrapStyle}>
              {Object.values(CITY_DATA)
                .sort((a, b) => a.routeOrder - b.routeOrder)
                .map((city) => (
                  <Chip
                    key={city.id}
                    active={city.id === startCity || selectedCities.includes(city.id)}
                    onClick={() => toggleCity(city.id)}
                    small
                  >
                    {city.icon} {city.name}
                  </Chip>
                ))}
            </div>
            <div style={helperTextStyle}>
              The optimizer will keep the route realistic for your selected number of days.
            </div>
          </div>
        </Card>

        <div style={{ display: "grid", gap: 18 }}>
          <Card
            style={{
              background: "linear-gradient(180deg, rgba(201,168,76,0.08), rgba(17,16,9,1))",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <SectionLabel>OPTIMIZED ROUTE</SectionLabel>

            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 20,
                color: COLORS.text,
                marginBottom: 10,
                lineHeight: 1.4,
              }}
            >
              {result.route.map((id) => CITY_DATA[id].name).join(" → ")}
            </div>

            <p
              style={{
                fontFamily: "'Crimson Pro',serif",
                fontSize: 15,
                color: COLORS.muted,
                lineHeight: 1.7,
                marginBottom: 14,
              }}
            >
              {result.why}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              <Stat label="Transit time" value={`${result.totalTime.toFixed(1)}h`} />
              <Stat label="Transport cost" value={`~$${Math.round(result.totalCost)}`} />
              <Stat label="City changes" value={String(Math.max(result.route.length - 1, 0))} />
            </div>

            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 10,
                  color: COLORS.gold,
                  letterSpacing: "0.12em",
                  marginBottom: 6,
                }}
              >
                ROUTE EFFICIENCY SCORE
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 30,
                    color: scoreColor,
                    fontWeight: 700,
                    minWidth: 74,
                  }}
                >
                  {result.efficiency}/100
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 6,
                      width: "100%",
                      background: "#1A1610",
                      borderRadius: 999,
                      overflow: "hidden",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: `${result.efficiency}%`,
                        height: "100%",
                        background: scoreColor,
                        borderRadius: 999,
                      }}
                    />
                  </div>

                  <div style={helperTextStyle}>
                    Higher means less wasted movement and a more realistic city sequence.
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <SectionLabel>ROUTE WARNINGS</SectionLabel>

            <div style={{ display: "grid", gap: 10 }}>
              {result.warnings.map((warning, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: `1px solid ${COLORS.border}`,
                    background: "rgba(255,255,255,0.01)",
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>💡</span>
                  <span
                    style={{
                      fontFamily: "'Crimson Pro',serif",
                      color: COLORS.muted,
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {warning}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <Card>
          <SectionLabel>BEST TRANSPORT BY LEG</SectionLabel>

          <div style={{ display: "grid", gap: 12 }}>
            {result.legs.length === 0 ? (
              <div style={emptyStateStyle}>
                Pick at least two cities to see optimized intercity transport.
              </div>
            ) : (
              result.legs.map((leg, index) => (
                <div
                  key={`${leg.from}-${leg.to}-${index}`}
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    border: `1px solid ${COLORS.border}`,
                    background: "rgba(255,255,255,0.01)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 14,
                      color: COLORS.text,
                      marginBottom: 8,
                    }}
                  >
                    {CITY_DATA[leg.from].name} → {CITY_DATA[leg.to].name}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center" }}>
                    <div>
                      <div style={transportValueStyle}>{leg.choice.label}</div>
                      <div style={helperTextStyle}>{leg.choice.note}</div>
                    </div>

                    <div style={pillStyle}>{leg.choice.time.toFixed(1)}h</div>
                    <div style={pillStyle}>~${leg.choice.cost}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

const subheadingStyle = {
  fontFamily: "'Cinzel',serif",
  fontSize: 11,
  color: COLORS.text,
  marginBottom: 10,
  letterSpacing: "0.04em",
};

const chipWrapStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const helperTextStyle = {
  fontFamily: "'Crimson Pro',serif",
  color: COLORS.dim,
  fontSize: 13,
  lineHeight: 1.5,
};

const emptyStateStyle = {
  padding: "14px 16px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.02)",
  border: `1px solid ${COLORS.border}`,
  fontFamily: "'Crimson Pro',serif",
  color: COLORS.dim,
  fontSize: 14,
};

const transportValueStyle = {
  fontFamily: "'Crimson Pro',serif",
  fontSize: 15,
  color: COLORS.text,
  marginBottom: 4,
  lineHeight: 1.4,
};

const pillStyle = {
  padding: "8px 12px",
  borderRadius: 999,
  border: `1px solid ${COLORS.border}`,
  background: "rgba(201,168,76,0.08)",
  color: COLORS.gold,
  fontFamily: "'Cinzel',serif",
  fontSize: 11,
  whiteSpace: "nowrap",
};