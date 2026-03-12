import { useState } from "react";
import HomePage from "./home-page/HomePage";
import PlanPage from "./plan-page/PlanPage";
import ChatBot from "./ai/ChatBot";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" ? (
        <HomePage onOpenPlan={() => setPage("plan")} />
      ) : (
        <PlanPage onBack={() => setPage("home")} />
      )}
      <ChatBot />
    </>
  );
}
