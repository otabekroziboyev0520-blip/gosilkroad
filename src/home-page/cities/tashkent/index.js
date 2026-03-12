import sights from "./sights";
import eat from "./eat";
import stay from "./stay";

const tashkent = {
  id: "tashkent",
  name: "Tashkent",
  emoji: "🏙️",
  tagline: "Central Asia's Most Surprising Capital",

  image: "/images/cities/tashkent.jpg",

  color: "#2C0E45",
  accent: "#8E5BCB",

  lat: 41.2995,
  lng: 69.2401,
  zoom: 13,
  places: sights,
  restaurants: eat,
  hotels: stay,
};

export default tashkent;