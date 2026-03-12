import { useState } from "react";

export default function TripPlannerForm({ onGenerate }) {
  const [startCity, setStartCity] = useState("Tashkent");
  const [cities, setCities] = useState("Samarkand, Bukhara, Khiva");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("mid-range");
  const [style, setStyle] = useState("culture");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      startCity,
      cities: cities.split(",").map((c) => c.trim()).filter(Boolean),
      days: Number(days),
      budget,
      style,
    };

    onGenerate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 16,
        background: "#111009",
        border: "1px solid #1A1610",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <h2 style={{ margin: 0 }}>AI Trip Planner</h2>

      <div>
        <label>Starting City</label>
        <select value={startCity} onChange={(e) => setStartCity(e.target.value)}>
          <option>Tashkent</option>
          <option>Samarkand</option>
          <option>Bukhara</option>
          <option>Khiva</option>
        </select>
      </div>

      <div>
        <label>Cities to Visit</label>
        <input
          type="text"
          value={cities}
          onChange={(e) => setCities(e.target.value)}
          placeholder="Samarkand, Bukhara, Khiva"
        />
      </div>

      <div>
        <label>Number of Days</label>
        <input
          type="number"
          min="1"
          max="14"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>

      <div>
        <label>Budget</label>
        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="budget">Budget</option>
          <option value="mid-range">Mid-range</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      <div>
        <label>Travel Style</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="culture">Culture</option>
          <option value="food">Food</option>
          <option value="photography">Photography</option>
          <option value="relaxed">Relaxed</option>
          <option value="fast-paced">Fast-paced</option>
        </select>
      </div>

      <button type="submit">Generate My Trip</button>
    </form>
  );
}