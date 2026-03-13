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
  success: "#7EC97E",
  danger: "#E07A7A",
};

const CITY_DATA = {
  tashkent: {
    id: "tashkent",
    name: "Tashkent",
    icon: "🏙️",
    minDays: 1,
    idealDays: 2,
    tags: ["food", "culture", "architecture", "city-life"],
    routeOrder: 1,
    daily: {
      budget: 48,
      comfort: 92,
      luxury: 180,
    },
    highlights: [
      "Khast Imam Complex",
      "Chorsu Bazaar",
      "Tashkent Metro stations",
      "Amir Temur Square",
    ],
    paceNotes: {
      relaxed: "A good first stop to recover from arrival and ease into the trip.",
      balanced: "Great for one full day before moving to the classic Silk Road cities.",
      fast: "Can be done in half to one day if your focus is Samarkand and Bukhara.",
    },
  },
  samarkand: {
    id: "samarkand",
    name: "Samarkand",
    icon: "🕌",
    minDays: 2,
    idealDays: 3,
    tags: ["history", "architecture", "photography", "culture", "food"],
    routeOrder: 2,
    daily: {
      budget: 55,
      comfort: 105,
      luxury: 210,
    },
    highlights: [
      "Registan",
      "Shah-i-Zinda",
      "Gur-e-Amir",
      "Bibi-Khanym Mosque",
      "Siab Bazaar",
    ],
    paceNotes: {
      relaxed: "Needs at least 2.5–3 days if you want sunrise/sunset moments and less rushing.",
      balanced: "Perfect with 2 full days.",
      fast: "Possible in 1.5–2 days, but you will move quickly.",
    },
  },
  bukhara: {
    id: "bukhara",
    name: "Bukhara",
    icon: "🏛️",
    minDays: 2,
    idealDays: 3,
    tags: ["history", "architecture", "culture", "photography", "food"],
    routeOrder: 3,
    daily: {
      budget: 50,
      comfort: 96,
      luxury: 195,
    },
    highlights: [
      "Poi Kalyan",
      "Ark Fortress",
      "Lyabi-Hauz",
      "Trading Domes",
      "Chor Minor",
    ],
    paceNotes: {
      relaxed: "Excellent for slow wandering, rooftop dinners, and old-city atmosphere.",
      balanced: "2 full days is usually the sweet spot.",
      fast: "Possible in 1.5–2 days for a classic highlights run.",
    },
  },
  khiva: {
    id: "khiva",
    name: "Khiva",
    icon: "🧱",
    minDays: 2,
    idealDays: 2,
    tags: ["history", "architecture", "photography", "culture"],
    routeOrder: 4,
    daily: {
      budget: 52,
      comfort: 98,
      luxury: 190,
    },
    highlights: [
      "Ichan Kala",
      "Kalta Minor",
      "Tosh Hovli Palace",
      "Islam Khoja Minaret",
    ],
    paceNotes: {
      relaxed: "Best with 2 days so you can enjoy the walled city without sprinting.",
      balanced: "Works well with 1.5–2 days.",
      fast: "You can see the core in one intense day, but it is tight.",
    },
  },
  fergana: {
    id: "fergana",
    name: "Fergana Valley",
    icon: "🌿",
    minDays: 2,
    idealDays: 3,
    tags: ["culture", "food", "crafts", "local-life"],
    routeOrder: 5,
    daily: {
      budget: 46,
      comfort: 88,
      luxury: 170,
    },
    highlights: [
      "Rishtan ceramics",
      "Margilan silk workshops",
      "Kokand palace",
      "Local bazaars",
    ],
    paceNotes: {
      relaxed: "Best for travelers who want authentic local craft and slower travel.",
      balanced: "Works in 2 days if focused.",
      fast: "Not ideal for a rushed first Uzbekistan trip.",
    },
  },
  mountains: {
    id: "mountains",
    name: "Mountains / Chimgan",
    icon: "🏔️",
    minDays: 1,
    idealDays: 2,
    tags: ["nature", "adventure", "photography"],
    routeOrder: 6,
    daily: {
      budget: 58,
      comfort: 112,
      luxury: 220,
    },
    highlights: [
      "Chimgan",
      "Amirsoy area",
      "Charvak reservoir",
      "Scenic mountain viewpoints",
    ],
    paceNotes: {
      relaxed: "Great as a decompress day around Tashkent.",
      balanced: "Best as a 1–2 day add-on.",
      fast: "Fine as a day trip if time is tight.",
    },
  },
  nukus: {
    id: "nukus",
    name: "Nukus / Karakalpakstan",
    icon: "🎨",
    minDays: 2,
    idealDays: 3,
    tags: ["art", "history", "adventure", "photography"],
    routeOrder: 7,
    daily: {
      budget: 60,
      comfort: 118,
      luxury: 235,
    },
    highlights: [
      "Savitsky Museum",
      "Desert landscapes",
      "Remote regional culture",
    ],
    paceNotes: {
      relaxed: "A strong special-interest extension, not usually a first-timer core stop.",
      balanced: "Best if paired with extra days.",
      fast: "Too ambitious for a short trip.",
    },
  },
};

const CLASSIC_ROUTE = ["tashkent", "samarkand", "bukhara", "khiva"];

const TRANSPORT_MAP = {
  "tashkent-samarkand": {
    best: "🚄 Afrosiyob high-speed train",
    bestTime: "2h 10m",
    bestPrice: "$10–15",
    alt: "🚕 Private transfer / taxi",
    altTime: "4h 30m",
    altPrice: "$60–90",
    why: "Fastest, easiest, and best first intercity leg.",
  },
  "samarkand-bukhara": {
    best: "🚆 Train",
    bestTime: "1h 50m–2h 10m",
    bestPrice: "$8–12",
    alt: "🚕 Taxi",
    altTime: "4h",
    altPrice: "$45–65",
    why: "Train is the best value and most tourist-friendly option.",
  },
  "bukhara-khiva": {
    best: "🚕 Shared/private taxi",
    bestTime: "4h 30m–5h",
    bestPrice: "$12–60",
    alt: "✈️ Domestic flight (when available)",
    altTime: "1h + airport time",
    altPrice: "$30–80",
    why: "Overland is common; flights save time when schedules line up.",
  },
  "tashkent-bukhara": {
    best: "🚄 Train",
    bestTime: "4h",
    bestPrice: "$14–22",
    alt: "✈️ Domestic flight",
    altTime: "1h 10m + airport time",
    altPrice: "$30–70",
    why: "Train is usually the smoothest choice unless time is critical.",
  },
  "tashkent-khiva": {
    best: "✈️ Domestic flight to Urgench + short transfer",
    bestTime: "1h 30m + transfer",
    bestPrice: "$40–80",
    alt: "🚆 Overnight train",
    altTime: "12h+",
    altPrice: "$20–35",
    why: "Flying saves huge time on short itineraries.",
  },
  "tashkent-fergana": {
    best: "🚗 Car / transfer",
    bestTime: "4h 30m–5h 30m",
    bestPrice: "$45–80",
    alt: "🚆/🚕 mixed route",
    altTime: "Varies",
    altPrice: "$20–50",
    why: "Good if you want crafts, local life, and something less touristy.",
  },
  "tashkent-mountains": {
    best: "🚗 Day trip / transfer",
    bestTime: "1h 30m–2h",
    bestPrice: "$20–50",
    alt: "🚌 Shared transport",
    altTime: "2h+",
    altPrice: "$5–15",
    why: "Easy add-on for nature without changing your whole route.",
  },
};

const INTEREST_OPTIONS = [
  { id: "history", label: "History", icon: "🏛️" },
  { id: "architecture", label: "Architecture", icon: "🕌" },
  { id: "food", label: "Food", icon: "🍽️" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "adventure", label: "Adventure", icon: "⛰️" },
  { id: "crafts", label: "Crafts", icon: "🧵" },
  { id: "art", label: "Art", icon: "🎨" },
];

const STYLE_OPTIONS = [
  { id: "classic", label: "Classic highlights", icon: "✨" },
  { id: "slow", label: "Slow cultural trip", icon: "🍵" },
  { id: "photo", label: "Photo-focused", icon: "📸" },
  { id: "food", label: "Food + culture", icon: "🍽️" },
  { id: "mixed", label: "Mixed interests", icon: "🧭" },
];

const PACE_OPTIONS = [
  { id: "relaxed", label: "Relaxed", desc: "Fewer cities, more depth" },
  { id: "balanced", label: "Balanced", desc: "Best for most travelers" },
  { id: "fast", label: "Fast-paced", desc: "More places, quicker stops" },
];

const BUDGET_OPTIONS = [
  { id: "budget", label: "Budget", desc: "Hostels / simple stays / local transport" },
  { id: "comfort", label: "Comfort", desc: "Good hotels / smoother transport / nicer meals" },
  { id: "luxury", label: "Luxury", desc: "Premium stays / private comfort / best locations" },
];

const TRAVELER_OPTIONS = [
  { id: "solo", label: "Solo" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family / group" },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLegInfo(from, to) {
  return (
    TRANSPORT_MAP[`${from}-${to}`] ||
    TRANSPORT_MAP[`${to}-${from}`] || {
      best: "🚕 Flexible transfer / train depending on date",
      bestTime: "Varies",
      bestPrice: "Varies",
      alt: "🧭 Custom route",
      altTime: "Varies",
      altPrice: "Varies",
      why: "This leg depends on your exact route and season.",
    }
  );
}

function scoreCity(city, interests, style, arrivalCity) {
  let score = 0;

  if (city.id === arrivalCity) score += 30;

  interests.forEach((interest) => {
    if (city.tags.includes(interest)) score += 10;
  });

  if (style === "classic" && ["tashkent", "samarkand", "bukhara", "khiva"].includes(city.id)) {
    score += 12;
  }
  if (style === "slow" && ["bukhara", "fergana", "mountains"].includes(city.id)) {
    score += 10;
  }
  if (style === "photo" && ["samarkand", "bukhara", "khiva", "mountains"].includes(city.id)) {
    score += 10;
  }
  if (style === "food" && ["tashkent", "samarkand", "bukhara", "fergana"].includes(city.id)) {
    score += 10;
  }
  if (style === "mixed") score += 4;

  return score;
}

function pickCities({ selectedCities, days, interests, style, pace, arrivalCity }) {
  const baseSelected = selectedCities.length ? selectedCities : CLASSIC_ROUTE;

  const scored = Object.values(CITY_DATA)
    .map((city) => ({
      ...city,
      score: scoreCity(city, interests, style, arrivalCity),
    }))
    .sort((a, b) => b.score - a.score);

  const maxCities =
    days <= 4 ? (pace === "fast" ? 3 : 2) : days <= 6 ? (pace === "fast" ? 4 : 3) : days <= 9 ? 4 : 5;

  const pickedSet = new Set(baseSelected);
  for (const city of scored) {
    if (pickedSet.size >= maxCities) break;
    pickedSet.add(city.id);
  }

  const picked = [...pickedSet]
    .filter((id) => CITY_DATA[id])
    .sort((a, b) => CITY_DATA[a].routeOrder - CITY_DATA[b].routeOrder);

  if (!picked.includes(arrivalCity)) {
    picked.unshift(arrivalCity);
  }

  return [...new Set(picked)];
}

function allocateDays(route, totalDays, pace) {
  const paceBonus =
    pace === "relaxed" ? 0.5 : pace === "fast" ? -0.35 : 0;

  const weights = route.map((id) => {
    const city = CITY_DATA[id];
    return city.idealDays + paceBonus;
  });

  const sumWeights = weights.reduce((a, b) => a + b, 0);

  let allocations = route.map((id, index) => {
    const city = CITY_DATA[id];
    const proportional = Math.round((weights[index] / sumWeights) * totalDays);
    return clamp(proportional || 1, 1, city.idealDays + 1);
  });

  const minNeeded = route.reduce((sum, id) => sum + Math.min(1, CITY_DATA[id].minDays), 0);
  if (totalDays < minNeeded) {
    allocations = route.map(() => 1);
  }

  let current = allocations.reduce((a, b) => a + b, 0);

  while (current > totalDays) {
    let changed = false;
    for (let i = allocations.length - 1; i >= 0; i -= 1) {
      if (allocations[i] > 1) {
        allocations[i] -= 1;
        current -= 1;
        changed = true;
        if (current === totalDays) break;
      }
    }
    if (!changed) break;
  }

  while (current < totalDays) {
    let bestIndex = 0;
    let bestNeed = -Infinity;
    for (let i = 0; i < route.length; i += 1) {
      const city = CITY_DATA[route[i]];
      const need = city.idealDays - allocations[i];
      if (need > bestNeed) {
        bestNeed = need;
        bestIndex = i;
      }
    }
    allocations[bestIndex] += 1;
    current += 1;
  }

  return route.map((id, i) => ({
    cityId: id,
    city: CITY_DATA[id],
    days: allocations[i],
  }));
}

function buildTransport(route) {
  const legs = [];
  for (let i = 0; i < route.length - 1; i += 1) {
    const from = route[i];
    const to = route[i + 1];
    legs.push({
      from,
      to,
      ...getLegInfo(from, to),
    });
  }
  return legs;
}

function buildBudget({ allocation, budgetLevel, travelerType, transportLegs }) {
  const multiplier =
    travelerType === "solo" ? 1 :
    travelerType === "couple" ? 1.75 :
    2.4;

  const lodgingFoodDaily = allocation.reduce((sum, item) => {
    return sum + item.city.daily[budgetLevel] * item.days;
  }, 0);

  const transportBase = transportLegs.reduce((sum, leg) => {
    const numeric = leg.bestPrice.match(/\$([0-9]+)/);
    return sum + (numeric ? Number(numeric[1]) : 20);
  }, 0);

  const attractionPerDay =
    budgetLevel === "budget" ? 8 :
    budgetLevel === "comfort" ? 16 :
    30;

  const base = lodgingFoodDaily + transportBase + attractionPerDay * allocation.reduce((s, a) => s + a.days, 0);
  const subtotal = Math.round(base * multiplier);
  const low = Math.round(subtotal * 0.92);
  const high = Math.round(subtotal * 1.12);

  return {
    perPersonDaily: Math.round(lodgingFoodDaily / allocation.reduce((s, a) => s + a.days, 0)),
    lodgingFoodDaily,
    transportBase: Math.round(transportBase * multiplier),
    attractions: Math.round(attractionPerDay * allocation.reduce((s, a) => s + a.days, 0) * multiplier),
    totalLow: low,
    totalHigh: high,
    totalMid: subtotal,
  };
}

function buildReadiness({ days, route, pace, budgetLevel }) {
  const warnings = [];

  if (days <= 4 && route.length >= 4) {
    warnings.push("You are trying to fit too many cities into a short trip.");
  }
  if (pace === "fast" && route.includes("khiva") && days <= 5) {
    warnings.push("Khiva is beautiful but can make a short itinerary feel rushed.");
  }
  if (budgetLevel === "budget" && route.includes("khiva")) {
    warnings.push("Khiva can push transport costs higher than you expect.");
  }
  if (!warnings.length) {
    warnings.push("This route looks realistic for a first Uzbekistan trip.");
  }

  return warnings;
}

function buildDayPlan({ allocation, pace, interests, style, transportLegs }) {
  const plan = [];
  let dayCounter = 1;

  allocation.forEach((item, cityIndex) => {
    for (let d = 1; d <= item.days; d += 1) {
      const title =
        d === 1 && cityIndex === 0
          ? `Day ${dayCounter} — Arrive in ${item.city.name}`
          : `Day ${dayCounter} — ${item.city.name}`;

      const activities = [];

      if (d === 1 && cityIndex > 0) {
        const leg = transportLegs[cityIndex - 1];
        activities.push(`Travel from ${CITY_DATA[leg.from].name} to ${CITY_DATA[leg.to].name} via ${leg.best}.`);
      }

      if (interests.includes("history")) {
        activities.push(`Focus on ${item.city.highlights.slice(0, 2).join(" and ")}.`);
      } else {
        activities.push(`Explore ${item.city.highlights[0]} and the surrounding old quarter.`);
      }

      if (interests.includes("photography")) {
        activities.push("Plan one sunrise or golden-hour stop for your best photos.");
      }
      if (interests.includes("food")) {
        activities.push("Add a local lunch stop and one market or teahouse experience.");
      }
      if (interests.includes("culture")) {
        activities.push("Leave time for walking slowly, people-watching, and artisan streets.");
      }
      if (interests.includes("nature") && item.city.id === "mountains") {
        activities.push("Use the day for scenic viewpoints and a light outdoor activity.");
      }

      if (pace === "relaxed") {
        activities.push("Keep the evening free for a relaxed dinner and short wander.");
      }
      if (pace === "fast") {
        activities.push("Start early to cover the main highlights efficiently.");
      }
      if (style === "photo") {
        activities.push("Prioritize the most visual sites before midday crowds.");
      }
      if (style === "food") {
        activities.push("Treat dinner as part of the itinerary, not an afterthought.");
      }

      plan.push({
        day: dayCounter,
        title,
        activities: activities.slice(0, 4),
      });

      dayCounter += 1;
    }
  });

  return plan;
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
        letterSpacing: "0.15em",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

export default function TripBuilderSection() {
  const [days, setDays] = useState(7);
  const [budgetLevel, setBudgetLevel] = useState("comfort");
  const [travelerType, setTravelerType] = useState("solo");
  const [style, setStyle] = useState("classic");
  const [pace, setPace] = useState("balanced");
  const [arrivalCity, setArrivalCity] = useState("tashkent");
  const [selectedCities, setSelectedCities] = useState(["tashkent", "samarkand", "bukhara"]);
  const [interests, setInterests] = useState(["history", "architecture", "culture"]);
  const [hasBuilt, setHasBuilt] = useState(true);

  const toggleInterest = (id) => {
    setInterests((prev) => {
      if (prev.includes(id)) return prev.length === 1 ? prev : prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  const toggleCity = (id) => {
    setSelectedCities((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const result = useMemo(() => {
    const route = pickCities({
      selectedCities,
      days,
      interests,
      style,
      pace,
      arrivalCity,
    });

    const allocation = allocateDays(route, days, pace);
    const transportLegs = buildTransport(route);
    const budget = buildBudget({
      allocation,
      budgetLevel,
      travelerType,
      transportLegs,
    });
    const warnings = buildReadiness({
      days,
      route,
      pace,
      budgetLevel,
    });
    const dayPlan = buildDayPlan({
      allocation,
      pace,
      interests,
      style,
      transportLegs,
    });

    const routeLabel = allocation.map((item) => item.city.name).join(" → ");

    return {
      route,
      allocation,
      transportLegs,
      budget,
      warnings,
      dayPlan,
      routeLabel,
    };
  }, [selectedCities, days, interests, style, pace, arrivalCity, budgetLevel, travelerType]);

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
        📅 Smart Trip Builder
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
        Build a realistic Uzbekistan route in under a minute. Choose your travel style,
        budget, pace, and interests — then get a route, day split, transport plan, and cost estimate.
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
          <SectionLabel>TRIP SETUP</SectionLabel>

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
            <div style={subheadingStyle}>Budget level</div>
            <div style={chipWrapStyle}>
              {BUDGET_OPTIONS.map((option) => (
                <Chip
                  key={option.id}
                  active={budgetLevel === option.id}
                  onClick={() => setBudgetLevel(option.id)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
            <div style={helperTextStyle}>
              {BUDGET_OPTIONS.find((x) => x.id === budgetLevel)?.desc}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Who is traveling?</div>
            <div style={chipWrapStyle}>
              {TRAVELER_OPTIONS.map((option) => (
                <Chip
                  key={option.id}
                  active={travelerType === option.id}
                  onClick={() => setTravelerType(option.id)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Trip style</div>
            <div style={chipWrapStyle}>
              {STYLE_OPTIONS.map((option) => (
                <Chip
                  key={option.id}
                  active={style === option.id}
                  onClick={() => setStyle(option.id)}
                >
                  {option.icon} {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Travel pace</div>
            <div style={chipWrapStyle}>
              {PACE_OPTIONS.map((option) => (
                <Chip
                  key={option.id}
                  active={pace === option.id}
                  onClick={() => setPace(option.id)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
            <div style={helperTextStyle}>
              {PACE_OPTIONS.find((x) => x.id === pace)?.desc}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Arrival city</div>
            <div style={chipWrapStyle}>
              {["tashkent", "samarkand", "bukhara"].map((id) => (
                <Chip key={id} active={arrivalCity === id} onClick={() => setArrivalCity(id)}>
                  {CITY_DATA[id].icon} {CITY_DATA[id].name}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>What are you interested in?</div>
            <div style={chipWrapStyle}>
              {INTEREST_OPTIONS.map((option) => (
                <Chip
                  key={option.id}
                  active={interests.includes(option.id)}
                  onClick={() => toggleInterest(option.id)}
                  small
                >
                  {option.icon} {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <div style={subheadingStyle}>Cities you definitely want</div>
            <div style={chipWrapStyle}>
              {Object.values(CITY_DATA)
                .sort((a, b) => a.routeOrder - b.routeOrder)
                .map((city) => (
                  <Chip
                    key={city.id}
                    active={selectedCities.includes(city.id)}
                    onClick={() => toggleCity(city.id)}
                    small
                  >
                    {city.icon} {city.name}
                  </Chip>
                ))}
            </div>
            <div style={helperTextStyle}>
              Select your must-visit places. The planner will keep the route realistic.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHasBuilt(true)}
            style={{
              marginTop: 18,
              width: "100%",
              padding: "14px 18px",
              border: "none",
              borderRadius: 999,
              background: "linear-gradient(135deg,#C9A84C,#8B6914)",
              color: COLORS.bg,
              fontFamily: "'Cinzel',serif",
              fontSize: 12,
              letterSpacing: "0.15em",
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(201,168,76,0.2)",
            }}
          >
            BUILD MY TRIP →
          </button>
        </Card>

        <div style={{ display: "grid", gap: 18 }}>
          <Card
            style={{
              background: "linear-gradient(180deg, rgba(201,168,76,0.08), rgba(17,16,9,1))",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <SectionLabel>ROUTE SUMMARY</SectionLabel>

            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 20,
                color: COLORS.text,
                marginBottom: 10,
                lineHeight: 1.4,
              }}
            >
              {result.routeLabel}
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
              {days}-day {style.replace("-", " ")} trip · {pace} pace · {travelerType} ·{" "}
              {budgetLevel} budget
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              <MiniStat label="Cities" value={String(result.route.length)} />
              <MiniStat label="Budget" value={`$${result.budget.totalLow}–${result.budget.totalHigh}`} />
              <MiniStat label="Best fit" value={pace} />
            </div>

            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(201,168,76,0.08)",
                borderRadius: 10,
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
                WHY THIS ROUTE
              </div>
              <p
                style={{
                  fontFamily: "'Crimson Pro',serif",
                  fontSize: 14,
                  color: COLORS.muted,
                  lineHeight: 1.6,
                }}
              >
                This route prioritizes your interests while keeping intercity movement realistic.
                It avoids the common mistake of cramming too many long-distance stops into one trip.
              </p>
            </div>
          </Card>

          <Card>
            <SectionLabel>DAY SPLIT BY CITY</SectionLabel>

            <div style={{ display: "grid", gap: 10 }}>
              {result.allocation.map((item) => (
                <div
                  key={item.cityId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 10,
                    alignItems: "center",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: `1px solid ${COLORS.border}`,
                    background: "rgba(255,255,255,0.01)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        color: COLORS.text,
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                    >
                      {item.city.icon} {item.city.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Crimson Pro',serif",
                        color: COLORS.dim,
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.city.paceNotes[pace]}
                    </div>
                  </div>

                  <div
                    style={{
                      minWidth: 66,
                      textAlign: "center",
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: COLORS.goldSoft,
                      color: COLORS.gold,
                      fontFamily: "'Cinzel',serif",
                      fontSize: 13,
                    }}
                  >
                    {item.days} day{item.days > 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {hasBuilt && (
        <div style={{ display: "grid", gap: 18, marginTop: 22 }}>
          <Card>
            <SectionLabel>TRANSPORT PLAN</SectionLabel>

            <div style={{ display: "grid", gap: 12 }}>
              {result.transportLegs.length === 0 ? (
                <div style={emptyStateStyle}>
                  Your route only has one city, so no intercity transport is needed.
                </div>
              ) : (
                result.transportLegs.map((leg, index) => (
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

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div style={transportBoxStyle}>
                        <div style={transportLabelStyle}>BEST OPTION</div>
                        <div style={transportValueStyle}>{leg.best}</div>
                        <div style={transportMetaStyle}>
                          {leg.bestTime} · {leg.bestPrice}
                        </div>
                      </div>

                      <div style={transportBoxStyle}>
                        <div style={transportLabelStyle}>ALTERNATIVE</div>
                        <div style={transportValueStyle}>{leg.alt}</div>
                        <div style={transportMetaStyle}>
                          {leg.altTime} · {leg.altPrice}
                        </div>
                      </div>
                    </div>

                    <div style={{ ...helperTextStyle, marginTop: 10 }}>{leg.why}</div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <SectionLabel>COST ESTIMATE</SectionLabel>

              <div style={{ display: "grid", gap: 10 }}>
                <PriceRow label="Daily average" value={`~$${result.budget.perPersonDaily}/day`} />
                <PriceRow label="Transport total" value={`$${result.budget.transportBase}`} />
                <PriceRow label="Attractions / experiences" value={`$${result.budget.attractions}`} />
                <PriceRow
                  label="Estimated trip total"
                  value={`$${result.budget.totalLow}–${result.budget.totalHigh}`}
                  strong
                />
              </div>

              <div
                style={{
                  marginTop: 14,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(201,168,76,0.08)",
                }}
              >
                <div style={transportLabelStyle}>BUDGET NOTE</div>
                <div style={helperTextStyle}>
                  This estimate is designed to feel realistic, not fake-cheap. It includes the
                  trip style, route length, and likely transport choices.
                </div>
              </div>
            </Card>

            <Card>
              <SectionLabel>REALITY CHECK</SectionLabel>

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

          <Card>
            <SectionLabel>DAY-BY-DAY DRAFT ITINERARY</SectionLabel>

            <div style={{ display: "grid", gap: 12 }}>
              {result.dayPlan.map((day) => (
                <div
                  key={day.day}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "58px 1fr",
                    gap: 14,
                    alignItems: "start",
                    paddingBottom: 12,
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 999,
                      background: COLORS.gold,
                      color: COLORS.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Cinzel',serif",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {day.day}
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 14,
                        color: COLORS.text,
                        marginBottom: 8,
                      }}
                    >
                      {day.title}
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                      {day.activities.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            fontFamily: "'Crimson Pro',serif",
                            color: COLORS.muted,
                            fontSize: 14,
                            lineHeight: 1.6,
                          }}
                        >
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }) {
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

function PriceRow({ label, value, strong = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
        padding: "12px 14px",
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        background: strong ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.01)",
      }}
    >
      <span
        style={{
          fontFamily: "'Crimson Pro',serif",
          fontSize: 14,
          color: COLORS.muted,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 13,
          color: strong ? COLORS.gold : COLORS.text,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
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

const transportBoxStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  border: `1px solid ${COLORS.border}`,
  background: "rgba(255,255,255,0.01)",
};

const transportLabelStyle = {
  fontFamily: "'Cinzel',serif",
  fontSize: 10,
  color: COLORS.gold,
  letterSpacing: "0.1em",
  marginBottom: 6,
};

const transportValueStyle = {
  fontFamily: "'Crimson Pro',serif",
  fontSize: 15,
  color: COLORS.text,
  marginBottom: 4,
  lineHeight: 1.4,
};

const transportMetaStyle = {
  fontFamily: "'Crimson Pro',serif",
  fontSize: 13,
  color: COLORS.dim,
};