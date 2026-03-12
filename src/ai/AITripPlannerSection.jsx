import { useState } from "react";
import TripPlannerForm from "./TripPlannerForm";
import GeneratedItinerary from "./GeneratedItinerary";

export default function AITripPlannerSection() {
  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = (formData) => {
    const cities = formData.cities.length ? formData.cities : [formData.startCity];

    const cityPlans = {
      Tashkent: {
        morning: "Visit Amir Temur Square and nearby landmarks",
        afternoon: "Explore Chorsu Bazaar and old city areas",
        evening: "Enjoy dinner in a modern local restaurant",
      },
      Samarkand: {
        morning: "Visit Registan Square",
        afternoon: "Explore Shah-i-Zinda and Bibi-Khanym Mosque",
        evening: "Dinner near the old city with night views",
      },
      Bukhara: {
        morning: "Visit Ark of Bukhara",
        afternoon: "Walk around Kalon Minaret and Lyabi-Hauz",
        evening: "Traditional dinner in the old town",
      },
      Khiva: {
        morning: "Explore Ichan Kala",
        afternoon: "Visit Kalta Minor and Kuhna Ark",
        evening: "Watch sunset near the old city walls",
      },
    };

    const days = [];

    for (let i = 0; i < formData.days; i++) {
      const city = cities[i % cities.length];
      const plan = cityPlans[city] || {
        morning: "Explore the city center",
        afternoon: "Visit top local attractions",
        evening: "Enjoy local food and relax",
      };

      days.push({
        day: i + 1,
        city,
        morning: plan.morning,
        afternoon: plan.afternoon,
        evening: plan.evening,
      });
    }

    setItinerary({
      summary: `${formData.days}-day ${formData.style} trip through ${cities.join(", ")}`,
      days,
    });
  };

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <TripPlannerForm onGenerate={handleGenerate} />
      <GeneratedItinerary itinerary={itinerary} />
    </div>
  );
}