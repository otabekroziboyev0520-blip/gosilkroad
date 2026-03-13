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
};

const CITY_DATA = {
  tashkent: { name: "Tashkent", hotelFactor: 1.1, foodFactor: 1.05 },
  samarkand: { name: "Samarkand", hotelFactor: 1.12, foodFactor: 1.0 },
  bukhara: { name: "Bukhara", hotelFactor: 1.0, foodFactor: 0.98 },
  khiva: { name: "Khiva", hotelFactor: 1.08, foodFactor: 1.0 },
  fergana: { name: "Fergana Valley", hotelFactor: 0.92, foodFactor: 0.95 },
  mountains: { name: "Mountains / Chimgan", hotelFactor: 1.18, foodFactor: 1.05 },
  nukus: { name: "Nukus / Karakalpakstan", hotelFactor: 1.06, foodFactor: 1.02 },
};

const HOTEL_OPTIONS = {
  budget: { label: "Budget stay", perNight: 25 },
  comfort: { label: "Comfort hotel", perNight: 60 },
  premium: { label: "Premium hotel", perNight: 140 },
};

const MEAL_OPTIONS = {
  local: { label: "Mostly local food", perDay: 12 },
  mixed: { label: "Mix of local + nicer dining", perDay: 24 },
  upscale: { label: "Upscale meals", perDay: 50 },
};

const TRANSPORT_OPTIONS = {
  budget: { label: "Mostly trains / shared rides", perMove: 12 },
  balanced: { label: "Train + some private transfers", perMove: 28 },
  private: { label: "Private / premium transport", perMove: 65 },
};

const TOUR_OPTIONS = {
  minimal: { label: "Mostly self-guided", perDay: 5 },
  some: { label: "A few paid tours", perDay: 14 },
  active: { label: "Guides / activities often", perDay: 28 },
};

const TRAVELER_OPTIONS = {
  solo: { label: "Solo", multiplier: 1 },
  couple: { label: "Couple", multiplier: 1.75 },
  family: { label: "Family / group", multiplier: 2.6 },
};

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

function CostRow({ label, value, strong = false }) {
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
          color: COLORS.muted,
          fontSize: 14,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Cinzel',serif",
          color: strong ? COLORS.gold : COLORS.text,
          fontSize: 13,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function BudgetCalculatorSection() {
  const [days, setDays] = useState(7);
  const [travelerType, setTravelerType] = useState("solo");
  const [hotelLevel, setHotelLevel] = useState("comfort");
  const [mealStyle, setMealStyle] = useState("mixed");
  const [transportStyle, setTransportStyle] = useState("balanced");
  const [tourStyle, setTourStyle] = useState("some");
  const [selectedCities, setSelectedCities] = useState(["tashkent", "samarkand", "bukhara"]);

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
    const traveler = TRAVELER_OPTIONS[travelerType];
    const hotel = HOTEL_OPTIONS[hotelLevel];
    const meals = MEAL_OPTIONS[mealStyle];
    const transport = TRANSPORT_OPTIONS[transportStyle];
    const tours = TOUR_OPTIONS[tourStyle];

    const cityObjects = selectedCities.map((id) => CITY_DATA[id]);
    const avgHotelFactor =
      cityObjects.reduce((sum, city) => sum + city.hotelFactor, 0) / cityObjects.length;
    const avgFoodFactor =
      cityObjects.reduce((sum, city) => sum + city.foodFactor, 0) / cityObjects.length;

    const hotelTotal = hotel.perNight * days * avgHotelFactor * traveler.multiplier;
    const foodTotal = meals.perDay * days * avgFoodFactor * traveler.multiplier;

    const cityMoves = Math.max(selectedCities.length - 1, 0);
    const transportTotal =
      (transport.perMove * cityMoves + Math.max(0, days - cityMoves - 1) * 3) *
      traveler.multiplier;

    const attractionTotal = tours.perDay * days * traveler.multiplier;

    const contingency = (hotelTotal + foodTotal + transportTotal + attractionTotal) * 0.1;
    const subtotal = hotelTotal + foodTotal + transportTotal + attractionTotal;
    const total = subtotal + contingency;

    return {
      hotelTotal: Math.round(hotelTotal),
      foodTotal: Math.round(foodTotal),
      transportTotal: Math.round(transportTotal),
      attractionTotal: Math.round(attractionTotal),
      contingency: Math.round(contingency),
      subtotal: Math.round(subtotal),
      totalLow: Math.round(total * 0.95),
      totalHigh: Math.round(total * 1.1),
      perDay: Math.round(total / days),
    };
  }, [days, travelerType, hotelLevel, mealStyle, transportStyle, tourStyle, selectedCities]);

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
        💰 Real Trip Cost Calculator
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
        Estimate a realistic Uzbekistan travel budget based on your route, travel style,
        accommodation level, food preferences, and transport choices.
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
          <SectionLabel>CALCULATOR INPUTS</SectionLabel>

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
            <div style={subheadingStyle}>Who is traveling?</div>
            <div style={chipWrapStyle}>
              {Object.entries(TRAVELER_OPTIONS).map(([id, option]) => (
                <Chip
                  key={id}
                  active={travelerType === id}
                  onClick={() => setTravelerType(id)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Hotel level</div>
            <div style={chipWrapStyle}>
              {Object.entries(HOTEL_OPTIONS).map(([id, option]) => (
                <Chip key={id} active={hotelLevel === id} onClick={() => setHotelLevel(id)}>
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Food style</div>
            <div style={chipWrapStyle}>
              {Object.entries(MEAL_OPTIONS).map(([id, option]) => (
                <Chip key={id} active={mealStyle === id} onClick={() => setMealStyle(id)}>
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Transport style</div>
            <div style={chipWrapStyle}>
              {Object.entries(TRANSPORT_OPTIONS).map(([id, option]) => (
                <Chip
                  key={id}
                  active={transportStyle === id}
                  onClick={() => setTransportStyle(id)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={subheadingStyle}>Paid tours / attractions</div>
            <div style={chipWrapStyle}>
              {Object.entries(TOUR_OPTIONS).map(([id, option]) => (
                <Chip key={id} active={tourStyle === id} onClick={() => setTourStyle(id)}>
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <div style={subheadingStyle}>Cities in this trip</div>
            <div style={chipWrapStyle}>
              {Object.entries(CITY_DATA).map(([id, city]) => (
                <Chip
                  key={id}
                  active={selectedCities.includes(id)}
                  onClick={() => toggleCity(id)}
                  small
                >
                  {city.name}
                </Chip>
              ))}
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
            <SectionLabel>BUDGET SUMMARY</SectionLabel>

            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 20,
                color: COLORS.text,
                marginBottom: 10,
                lineHeight: 1.4,
              }}
            >
              ${result.totalLow}–${result.totalHigh}
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
              Approx. ${result.perDay}/day for a {days}-day{" "}
              {TRAVELER_OPTIONS[travelerType].label.toLowerCase()} trip across{" "}
              {selectedCities.length} cities.
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              <CostRow label="Accommodation" value={`$${result.hotelTotal}`} />
              <CostRow label="Food & drinks" value={`$${result.foodTotal}`} />
              <CostRow label="Transport" value={`$${result.transportTotal}`} />
              <CostRow label="Tours / attractions" value={`$${result.attractionTotal}`} />
              <CostRow label="Safety buffer" value={`$${result.contingency}`} />
              <CostRow label="Estimated total" value={`$${result.totalLow}–$${result.totalHigh}`} strong />
            </div>
          </Card>

          <Card>
            <SectionLabel>WHY THIS ESTIMATE FEELS REAL</SectionLabel>

            <div style={{ display: "grid", gap: 10 }}>
              <div style={infoBoxStyle}>
                It changes based on your city mix. Tashkent, mountain stays, and remote routes can
                shift the price higher.
              </div>
              <div style={infoBoxStyle}>
                It includes a contingency buffer, because real travelers always spend a little more
                than the perfect plan.
              </div>
              <div style={infoBoxStyle}>
                It is designed to be useful for decision-making, not just impress people with low fake numbers.
              </div>
            </div>
          </Card>
        </div>
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

const infoBoxStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  border: `1px solid ${COLORS.border}`,
  background: "rgba(255,255,255,0.01)",
  fontFamily: "'Crimson Pro',serif",
  color: COLORS.muted,
  fontSize: 14,
  lineHeight: 1.6,
};