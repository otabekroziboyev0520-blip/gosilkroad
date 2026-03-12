import sights from "./sights";
import eat from "./eat";
import stay from "./stay";

const bukhara = {
  id: "bukhara",
  name: "Bukhara",
  emoji: "🏰",
  tagline: "The City That Time Forgot",

  image: "/images/cities/bukhara.jpg",

  color: "#7A3E1D",
  accent: "#C97C4D",

  lat: 39.7747,
  lng: 64.4286,
  zoom: 13,
  places: sights,
  restaurants: eat,
  hotels: stay,
};

export default bukhara;