import { Routes, Route, useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import HomePage from "./home-page/HomePage";
import PlanPage from "./plan-page/PlanPage";
import ChatBot from "./ai/ChatBot";

export default function App() {
  const navigate = useNavigate();

  const openPlan = (section = "visa") => {
    navigate(`/plan/${section}`);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onOpenPlan={openPlan} />} />

        <Route
          path="/plan"
          element={
            <PlanPage
              onBack={() => navigate("/")}
              initialSection="visa"
            />
          }
        />

        <Route
          path="/plan/:section"
          element={
            <PlanPage
              onBack={() => navigate("/")}
            />
          }
        />
      </Routes>

      <ChatBot />

      <Analytics />
      <SpeedInsights />
    </>
  );
}