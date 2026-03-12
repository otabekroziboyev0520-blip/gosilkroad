export default function GeneratedItinerary({ itinerary }) {
  if (!itinerary) return null;

  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gap: 16,
      }}
    >
      <h2 style={{ margin: 0 }}>{itinerary.summary}</h2>

      {itinerary.days.map((day) => (
        <div
          key={day.day}
          style={{
            background: "#111009",
            border: "1px solid #1A1610",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            Day {day.day} — {day.city}
          </h3>
          <p><strong>Morning:</strong> {day.morning}</p>
          <p><strong>Afternoon:</strong> {day.afternoon}</p>
          <p><strong>Evening:</strong> {day.evening}</p>
        </div>
      ))}
    </div>
  );
}