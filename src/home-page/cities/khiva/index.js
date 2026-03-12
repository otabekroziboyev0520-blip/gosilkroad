import sights from "./sights";
import eat from "./eat";
import stay from "./stay";

const khiva = {
  id: "khiva",
  name: "Khiva",
  emoji: "🌙",
  tagline: "A Fortress Frozen in the 18th Century",

  image: "/images/cities/khiva.jpg",

  color: "#6B3A0F",
  accent: "#E1A95F",

  lat: 41.3783,
  lng: 60.3636,
  zoom: 13,
  places: sights,
  restaurants: eat,
  hotels: stay,
};

export default khiva;