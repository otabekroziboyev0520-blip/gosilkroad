import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import HomePage from "./home-page/HomePage";
import PlanPage from "./plan-page/PlanPage";
import ChatBot from "./ai/ChatBot";

export default function App() {
  const [page, setPage] = useState("home");
  const [planInitialSection, setPlanInitialSection] = useState("visa");

  const openPlan = (section = "visa") => {
    setPlanInitialSection(section);
    setPage("plan");
  };

  return (
    <>
      {page === "home" ? (
        <HomePage onOpenPlan={openPlan} />
      ) : (
        <PlanPage
          onBack={() => setPage("home")}
          initialSection={planInitialSection}
        />
      )}
      <ChatBot />

      <Analytics />
    </>
  );
}
