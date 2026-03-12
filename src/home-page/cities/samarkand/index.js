import sights from "./sights";
import eat from "./eat";
import stay from "./stay";

const samarkand = {
  id: "samarkand",
  name: "Samarkand",
  emoji: "🕌",
  tagline: "The Crown Jewel of the Silk Road",

  image: "/images/cities/samarkand.jpg",

  color: "#1A6B8A",
  accent: "#5BB8D4",

  lat: 39.6542,
  lng: 66.9597,
  zoom: 13,
  places: sights,
  restaurants: eat,
  hotels: stay,
};

export default samarkand;