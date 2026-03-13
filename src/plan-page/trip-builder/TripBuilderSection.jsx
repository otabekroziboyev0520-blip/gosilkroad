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
};

const CITY_DATA = {
  tashkent: {
    id: "tashkent",
    name: "Tashkent",
    icon: "🏙️",
    routeOrder: 1,
    minDays: 1,
    idealDays: 2,
    tags: ["food", "culture", "architecture", "history"],
    highlights: {
      history: ["Khast Imam Complex", "Amir Temur Museum"],
      architecture: ["Tashkent Metro", "Khast Imam Complex"],
      food: ["Chorsu Bazaar", "National plov center"],
      culture: ["Broadway / city walk", "Applied Arts Museum"],
      photography: ["Tashkent Metro", "Amir Temur Square"],
      nature: ["Japanese Garden", "Anhor area stroll"],
      adventure: ["Day-start urban exploring", "Fast local market stop"],
    },
  },
  samarkand: {
    id: "samarkand",
    name: "Samarkand",
    icon: "🕌",
    routeOrder: 2,
    minDays: 2,
    idealDays: 3,
    tags: ["history", "architecture", "photography", "culture", "food"],
    highlights: {
      history: ["Registan", "Gur-e-Amir"],
      architecture: ["Shah-i-Zinda", "Bibi-Khanym Mosque"],
      food: ["Siab Bazaar", "Traditional dinner near old city"],
      culture: ["Slow old-town walking", "Craft + tea stop"],
      photography: ["Registan at golden hour", "Shah-i-Zinda details"],
      nature: ["Afrosiab hill viewpoints", "Quiet garden stop"],
      adventure: ["Dense monument run", "Early start for full coverage"],
    },
  },
  bukhara: {
    id: "bukhara",
    name: "Bukhara",
    icon: "🏛️",
    routeOrder: 3,
    minDays: 2,
    idealDays: 3,
    tags: ["history", "architecture", "culture", "photography", "food"],
    highlights: {
      history: ["Ark Fortress", "Poi Kalyan"],
      architecture: ["Poi Kalyan ensemble", "Chor Minor"],
      food: ["Lyabi-Hauz dinner", "Old-city teahouse lunch"],
      culture: ["Trading Domes walk", "Old alley wandering"],
      photography: ["Blue hour at Lyabi-Hauz", "Poi Kalyan skyline"],
      nature: ["Quiet courtyard break", "Canal-side walk"],
      adventure: ["Compact old-city circuit", "Multi-site walking route"],
    },
  },
  khiva: {
    id: "khiva",
    name: "Khiva",
    icon: "🧱",
    routeOrder: 4,
    minDays: 2,
    idealDays: 2,
    tags: ["history", "architecture", "photography", "culture"],
    highlights: {
      history: ["Ichan Kala", "Tosh Hovli Palace"],
      architecture: ["Kalta Minor", "Islam Khoja Minaret"],
      food: ["Terrace dinner inside old city", "Tea break in Ichan Kala"],
      culture: ["Wall-city slow walk", "Craft stalls"],
      photography: ["Sunset over Ichan Kala", "Minaret viewpoints"],
      nature: ["Quiet wall-edge walk", "Sunrise city atmosphere"],
      adventure: ["Fast fortress circuit", "Tower climb"],
    },
  },
  fergana: {
    id: "fergana",
    name: "Fergana Valley",
    icon: "🌿",
    routeOrder: 5,
    minDays: 2,
    idealDays: 3,
    tags: ["culture", "food", "crafts"],
    highlights: {
      history: ["Kokand Palace", "Regional town center"],
      architecture: ["Kokand Palace", "Traditional workshops"],
      food: ["Market lunch", "Family-style local dinner"],
      culture: ["Margilan silk workshop", "Rishtan ceramics"],
      photography: ["Craft process shots", "Colorful local bazaar"],
      nature: ["Countryside roadside views", "Garden stop"],
      adventure: ["Workshop-hopping day", "Regional road route"],
    },
  },
  mountains: {
    id: "mountains",
    name: "Mountains / Chimgan",
    icon: "🏔️",
    routeOrder: 6,
    minDays: 1,
    idealDays: 2,
    tags: ["nature", "adventure", "photography"],
    highlights: {
      history: ["Light cultural stop en route", "Scenic village break"],
      architecture: ["Resort viewpoint areas", "Cable-car structures"],
      food: ["Lakeside lunch", "Mountain tea stop"],
      culture: ["Weekend local atmosphere", "Resort promenade"],
      photography: ["Charvak views", "Mountain lookout"],
      nature: ["Chimgan viewpoints", "Charvak reservoir"],
      adventure: ["Cable car / active viewpoint day", "Light outdoor activity"],
    },
  },
  nukus: {
    id: "nukus",
    name: "Nukus / Karakalpakstan",
    icon: "🎨",
    routeOrder: 7,
    minDays: 2,
    idealDays: 3,
    tags: ["art", "history", "photography", "adventure"],
    highlights: {
      history: ["Savitsky Museum", "Regional history stops"],
      architecture: ["Soviet-era city forms", "Museum exterior + spaces"],
      food: ["Simple regional lunch", "Local dinner stop"],
      culture: ["Museum deep dive", "Regional atmosphere"],
      photography: ["Museum zones", "Remote landscape textures"],
      nature: ["Desert edge scenery", "Regional landscape stop"],
      adventure: ["Long-distance special-interest route", "Museum-focused day"],
    },
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
];

const STYLE_OPTIONS = [
  { id: "classic", label: "Classic highlights", icon: "✨" },
  { id: "slow", label: "Slow cultural trip", icon: "🍵" },
  { id: "photo", label: "Photo-focused", icon: "📸" },
  { id: "food", label: "Food + culture", icon: "🍽️" },
  { id: "mixed", label: "Mixed interests", icon: "🧭" },
];

const PACE_OPTIONS = [
  { id: "relaxed", label: "Relaxed", desc: "Fewer sights, more breathing room" },
  { id: "balanced", label: "Balanced", desc: "Best for most travelers" },
  { id: "fast", label: "Fast-paced", desc: "More coverage, tighter schedule" },
];

const BUDGET_OPTIONS = [
  { id: "budget", label: "Budget" },
  { id: "comfort", label: "Comfort" },
  { id: "luxury", label: "Luxury" },
];

const CLASSIC_ROUTE = ["tashkent", "samarkand", "bukhara", "khiva"];

const TRANSPORT_MAP = {
  "tashkent-samarkand": {
    best: "🚄 Afrosiyob train",
    time: "2h 10m",
    price: "$10–15",
  },
  "samarkand-bukhara": {
    best: "🚆 Train",
    time: "2h",
    price: "$8–12",
  },
  "bukhara-khiva": {
    best: "🚕 Taxi or ✈️ domestic flight",
    time: "5h overland / faster by air",
    price: "$12–60",
  },
  "tashkent-bukhara": {
    best: "🚄 Train or ✈️ flight",
    time: "4h train / ~1h flight",
    price: "$18–50",
  },
  "tashkent-khiva": {
    best: "✈️ Flight to Urgench + transfer",
    time: "~2h total air side + transfer",
    price: "$40–80",
  },
  "tashkent-mountains": {
    best: "🚗 Private transfer / day trip",
    time: "1.5–2h",
    price: "$20–50",
  },
  "tashkent-fergana": {
    best: "🚗 Road transfer",
    time: "5h",
    price: "$45–80",
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLegInfo(from, to) {
  return (
    TRANSPORT_MAP[`${from}-${to}`] ||
    TRANSPORT_MAP[`${to}-${from}`] || {
      best: "🚕 Flexible regional transfer",
      time: "Varies",
      price: "Varies",
    }
  );
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

function toggleListItem(prev, id, fallback) {
  if (prev.includes(id)) {
    const next = prev.filter((x) => x !== id);
    return next.length ? next : fallback;
  }
  return [...prev, id];
}

function scoreCity(city, interests, style, arrivalCity) {
  let score = 0;
  if (city.id === arrivalCity) score += 30;

  interests.forEach((interest) => {
    if (city.tags.includes(interest)) score += 10;
  });

  if (style === "classic" && ["tashkent", "samarkand", "bukhara", "khiva"].includes(city.id)) score += 12;
  if (style === "slow" && ["bukhara", "fergana", "mountains"].includes(city.id)) score += 10;
  if (style === "photo" && ["samarkand", "bukhara", "khiva", "mountains"].includes(city.id)) score += 11;
  if (style === "food" && ["tashkent", "samarkand", "bukhara", "fergana"].includes(city.id)) score += 10;
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
    days <= 4 ? (pace === "fast" ? 3 : 2) :
    days <= 6 ? (pace === "fast" ? 4 : 3) :
    days <= 9 ? 4 : 5;

  const pickedSet = new Set(baseSelected);
  for (const city of scored) {
    if (pickedSet.size >= maxCities) break;
    pickedSet.add(city.id);
  }

  const picked = [...pickedSet]
    .filter((id) => CITY_DATA[id])
    .sort((a, b) => CITY_DATA[a].routeOrder - CITY_DATA[b].routeOrder);

  if (!picked.includes(arrivalCity)) picked.unshift(arrivalCity);

  return [...new Set(picked)];
}

function allocateDays(route, totalDays, pace) {
  const paceBonus = pace === "relaxed" ? 0.6 : pace === "fast" ? -0.35 : 0;

  const weights = route.map((id) => CITY_DATA[id].idealDays + paceBonus);
  const sumWeights = weights.reduce((a, b) => a + b, 0);

  let allocations = route.map((id, index) => {
    const city = CITY_DATA[id];
    const proportional = Math.round((weights[index] / sumWeights) * totalDays);
    return clamp(proportional || 1, 1, city.idealDays + 1);
  });

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
      const need = CITY_DATA[route[i]].idealDays - allocations[i];
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

function buildSummary({ allocation, pace, style, interests }) {
  const totalDays = allocation.reduce((sum, item) => sum + item.days, 0);
  const cities = allocation.map((item) => item.city.name).join(" → ");
  const dominantInterest = interests[0] || "mixed";

  let vibe = "a balanced Silk Road trip";
  if (style === "photo") vibe = "a visually strong, photography-focused trip";
  if (style === "food") vibe = "a food-and-culture route";
  if (style === "slow") vibe = "a slower, more atmospheric journey";
  if (pace === "fast") vibe = "a high-coverage, fast-moving route";
  if (pace === "relaxed") vibe = "a gentle, low-stress itinerary";

  return `${totalDays}-day route through ${cities}. Best for travelers who want ${vibe} with a ${dominantInterest}-leaning experience.`;
}

function getInterestHighlight(city, interest) {
  const list = city.highlights[interest];
  if (list && list.length) return list;
  return city.highlights.history || [];
}

function uniquePush(arr, value) {
  if (value && !arr.includes(value)) arr.push(value);
}

function buildSlotContent({ city, slot, interests, style, pace, isArrival, isTravelDay, leg, localDayIndex, totalCityDays }) {
  const lines = [];

  if (isTravelDay && slot === "morning" && leg) {
    uniquePush(lines, `Travel to ${city.name} via ${leg.best} (${leg.time}).`);
  }

  const preferredInterestOrder = [
    ...interests,
    "history",
    "architecture",
    "culture",
    "food",
    "photography",
    "nature",
    "adventure",
  ];

  if (slot === "morning") {
    const key = preferredInterestOrder[0] || "history";
    const picks = getInterestHighlight(city, key);
    if (isArrival && !isTravelDay) {
      uniquePush(lines, `Easy start with hotel check-in and a light first walk around ${city.name}.`);
    }
    uniquePush(lines, `Visit ${picks[0] || city.name + " highlights"} while energy is high and crowds are lower.`);
    if (style === "photo") uniquePush(lines, "Prioritize the most photogenic stop early for cleaner light.");
    if (pace === "fast") uniquePush(lines, "Start early to cover your main priorities efficiently.");
  }

  if (slot === "afternoon") {
    const secondInterest = preferredInterestOrder[1] || preferredInterestOrder[0] || "culture";
    const picks = getInterestHighlight(city, secondInterest);
    if (isTravelDay) {
      uniquePush(lines, `Check in, reset briefly, then explore ${picks[0] || city.name + " old quarter"}.`);
    } else {
      uniquePush(lines, `Continue with ${picks[0] || city.name + " core sights"} and nearby areas.`);
    }
    if (interests.includes("food")) uniquePush(lines, "Make lunch part of the plan with a local restaurant or bazaar stop.");
    if (pace === "relaxed") uniquePush(lines, "Leave some unstructured time for cafés, tea, or slow wandering.");
  }

  if (slot === "evening") {
    if (interests.includes("photography")) {
      const photoSpot = getInterestHighlight(city, "photography")[0];
      uniquePush(lines, `Catch golden hour or evening atmosphere at ${photoSpot || city.name + " center"}.`);
    } else {
      uniquePush(lines, `Enjoy a relaxed evening walk and dinner in one of ${city.name}'s best atmosphere areas.`);
    }

    if (interests.includes("food")) uniquePush(lines, "Choose a memorable dinner rather than treating food as an afterthought.");
    if (style === "slow") uniquePush(lines, "Keep the evening light so the trip never feels rushed.");
    if (localDayIndex === totalCityDays && totalCityDays > 1) uniquePush(lines, "Wrap the day early enough to stay fresh for the next leg.");
  }

  return lines.slice(0, 3);
}

function buildStructuredItinerary({ allocation, transportLegs, pace, interests, style }) {
  const itinerary = [];
  let dayCounter = 1;

  allocation.forEach((item, cityIndex) => {
    for (let d = 1; d <= item.days; d += 1) {
      const travelLeg = d === 1 && cityIndex > 0 ? transportLegs[cityIndex - 1] : null;
      const isTravelDay = Boolean(travelLeg);
      const isArrival = dayCounter === 1;

      itinerary.push({
        day: dayCounter,
        cityId: item.cityId,
        city: item.city,
        title:
          isTravelDay
            ? `Day ${dayCounter} — Arrive in ${item.city.name}`
            : isArrival
            ? `Day ${dayCounter} — Start in ${item.city.name}`
            : `Day ${dayCounter} — ${item.city.name}`,
        transport: travelLeg,
        morning: buildSlotContent({
          city: item.city,
          slot: "morning",
          interests,
          style,
          pace,
          isArrival,
          isTravelDay,
          leg: travelLeg,
          localDayIndex: d,
          totalCityDays: item.days,
        }),
        afternoon: buildSlotContent({
          city: item.city,
          slot: "afternoon",
          interests,
          style,
          pace,
          isArrival,
          isTravelDay,
          leg: travelLeg,
          localDayIndex: d,
          totalCityDays: item.days,
        }),
        evening: buildSlotContent({
          city: item.city,
          slot: "evening",
          interests,
          style,
          pace,
          isArrival,
          isTravelDay,
          leg: travelLeg,
          localDayIndex: d,
          totalCityDays: item.days,
        }),
      });

      dayCounter += 1;
    }
  });

  return itinerary;
}

export default function TripBuilderSection() {
  const [days, setDays] = useState(7);
  const [budgetLevel, setBudgetLevel] = useState("comfort");
  const [style, setStyle] = useState("classic");
  const [pace, setPace] = useState("balanced");
  const [arrivalCity, setArrivalCity] = useState("tashkent");
  const [selectedCities, setSelectedCities] = useState(["tashkent", "samarkand", "bukhara"]);
  const [interests, setInterests] = useState(["history", "architecture", "culture"]);

  const toggleInterest = (id) => {
    setInterests((prev) => toggleListItem(prev, id, ["history"]));
  };

  const toggleCity = (id) => {
    setSelectedCities((prev) => toggleListItem(prev, id, ["tashkent"]));
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
    const summary = buildSummary({ allocation, pace, style, interests });
    const itinerary = buildStructuredItinerary({
      allocation,
      transportLegs,
      pace,
      interests,
      style,
    });

    return {
      route,
      allocation,
      transportLegs,
      summary,
      itinerary,
    };
  }, [selectedCities, days, interests, style, pace, arrivalCity]);

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
        Build a day-by-day Uzbekistan itinerary with realistic pacing, city flow,
        transport moments, and clearer morning / afternoon / evening planning.
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
            <div style={subheadingStyle}>Interests</div>
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
              The planner keeps the route realistic even if you choose more cities than fit comfortably.
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
            <SectionLabel>ITINERARY SUMMARY</SectionLabel>

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
              {result.summary}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              <MiniStat label="Cities" value={String(result.route.length)} />
              <MiniStat label="Pace" value={pace} />
              <MiniStat label="Style" value={style.replace("-", " ")} />
            </div>
          </Card>

          <Card>
            <SectionLabel>DAY SPLIT</SectionLabel>

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
                    <div style={helperTextStyle}>
                      Strong fit for {interests[0] || "mixed"} travelers with {pace} pacing.
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

      <div style={{ marginTop: 22, display: "grid", gap: 18 }}>
        <Card>
          <SectionLabel>DAY-BY-DAY STRUCTURED ITINERARY</SectionLabel>

          <div style={{ display: "grid", gap: 14 }}>
            {result.itinerary.map((day) => (
              <div
                key={day.day}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: `1px solid ${COLORS.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 14,
                        color: COLORS.text,
                        marginBottom: 4,
                      }}
                    >
                      {day.title}
                    </div>
                    <div style={helperTextStyle}>
                      {day.city.icon} {day.city.name}
                    </div>
                  </div>

                  {day.transport && (
                    <div
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        background: "rgba(201,168,76,0.08)",
                        border: `1px solid ${COLORS.border}`,
                        color: COLORS.gold,
                        fontFamily: "'Cinzel',serif",
                        fontSize: 10,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {day.transport.best} · {day.transport.time}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 0,
                  }}
                >
                  <TimeBlock title="Morning" items={day.morning} />
                  <TimeBlock title="Afternoon" items={day.afternoon} />
                  <TimeBlock title="Evening" items={day.evening} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>TRANSPORT FLOW</SectionLabel>

          <div style={{ display: "grid", gap: 10 }}>
            {result.transportLegs.length === 0 ? (
              <div style={emptyStateStyle}>
                Single-city trip — no intercity transport needed.
              </div>
            ) : (
              result.transportLegs.map((leg, index) => (
                <div
                  key={`${leg.from}-${leg.to}-${index}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
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
                        fontSize: 13,
                        color: COLORS.text,
                        marginBottom: 4,
                      }}
                    >
                      {CITY_DATA[leg.from].name} → {CITY_DATA[leg.to].name}
                    </div>
                    <div style={helperTextStyle}>
                      {leg.best} · {leg.time} · {leg.price}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "rgba(201,168,76,0.08)",
                      color: COLORS.gold,
                      fontFamily: "'Cinzel',serif",
                      fontSize: 10,
                    }}
                  >
                    Move {index + 1}
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

function TimeBlock({ title, items }) {
  return (
    <div
      style={{
        padding: 16,
        borderRight: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 11,
          color: COLORS.gold,
          letterSpacing: "0.08em",
          marginBottom: 10,
        }}
      >
        {title.toUpperCase()}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item, idx) => (
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