import { useState } from "react";

export default function TrainGuide() {
  const [activeStep, setActiveStep] = useState(null);

  const routes = [
    {
      from: "Tashkent",
      to: "Samarkand",
      train: "🚄 Afrosiyob",
      time: "2h 05m",
      price: "~$10–15",
      freq: "5x daily",
    },
    {
      from: "Samarkand",
      to: "Bukhara",
      train: "🚆 Sharq",
      time: "2h 00m",
      price: "~$8–12",
      freq: "3x daily",
    },
    {
      from: "Tashkent",
      to: "Bukhara",
      train: "🚆 Sharq",
      time: "3h 45m",
      price: "~$12–18",
      freq: "2x daily",
    },
    {
      from: "Bukhara",
      to: "Urgench",
      train: "🚆 Regional",
      time: "5h 30m",
      price: "~$8–10",
      freq: "1x daily",
    },
    {
      from: "Tashkent",
      to: "Andijan",
      train: "🚄 Afrosiyob",
      time: "2h 15m",
      price: "~$10–14",
      freq: "3x daily",
    },
    {
      from: "Tashkent",
      to: "Namangan",
      train: "🚆 Express",
      time: "3h 00m",
      price: "~$8–12",
      freq: "2x daily",
    },
  ];

  const bookingSteps = [
    {
      num: 1,
      title: "Open the official railway website",
      body: "Go to uzrailpass.uz and switch the page language if needed. The English version works, but some labels can still be confusing or partly untranslated.",
      tip: "Use Chrome browser with auto-translate turned on if parts of the site stay in Russian or Uzbek.",
    },
    {
      num: 2,
      title: "Choose your route and travel date",
      body: "Enter your departure city, destination, and date. Search early, especially for Afrosiyob high-speed trains, because the best seats sell out quickly in spring and autumn.",
      tip: "For Tashkent–Samarkand and Samarkand–Bukhara, Afrosiyob or Sharq are the best train options.",
    },
    {
      num: 3,
      title: "Select the train and seat class",
      body: "Pick the departure time that suits your plan. Most trains have economy and business class. Economy is usually totally fine for tourists and still very comfortable.",
      tip: "Morning departures are best for sightseeing days because you arrive with more time to explore.",
    },
    {
      num: 4,
      title: "Enter passenger details exactly as in passport",
      body: "Type your full name, passport number, and personal details exactly as they appear in your passport. Even small spelling mistakes can cause boarding problems.",
      warning: "Do not use nicknames or shortened names. The ticket and passport must match exactly.",
    },
    {
      num: 5,
      title: "Try payment with your bank card",
      body: "Proceed to the payment page and try your Visa or Mastercard. Sometimes foreign cards work, but many travelers report random failures even when the card is valid.",
      warning: "If payment fails once, do not panic — this is very common on the official website.",
    },
    {
      num: 6,
      title: "Download and save your e-ticket immediately",
      body: "Once payment succeeds, download the e-ticket PDF and also take a screenshot on your phone. Keep both ready for station entry and in case mobile data is weak on travel day.",
      tip: "Always save the ticket offline. Do not rely only on your email inbox.",
    },
  ];

  const paymentWorkarounds = [
    {
      icon: "💳",
      title: "Try another card",
      desc: "Visa may fail while Mastercard works, or the opposite. Try another bank card before giving up.",
    },
    {
      icon: "📱",
      title: "Use local help",
      desc: "Ask your hotel, host, or guide to book the ticket with a local card. Many are used to helping travelers with this.",
    },
    {
      icon: "🧾",
      title: "Book through a travel agency",
      desc: "A local agency can often secure tickets quickly, especially if the official site keeps rejecting payment.",
    },
    {
      icon: "🏦",
      title: "Pay at the station",
      desc: "If you're already in Uzbekistan, go to the railway station ticket office with your passport and buy directly there.",
    },
    {
      icon: "⏰",
      title: "Book early",
      desc: "Do not wait until the last minute. If payment problems happen, you want enough time for a backup method.",
    },
    {
      icon: "📸",
      title: "Keep screenshots",
      desc: "If the payment page freezes or behaves strangely, take screenshots so you remember the train and seat details you were trying to book.",
    },
  ];

  return (
    <div>
      {/* Route Quick Reference */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 11,
            color: "#C9A84C",
            letterSpacing: "0.15em",
            marginBottom: 14,
          }}
        >
          MAIN ROUTES AT A GLANCE
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 10,
          }}
        >
          {routes.map((r, i) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                background: "#111009",
                border: "1px solid #1A1610",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 13,
                    color: "#EDE4D0",
                  }}
                >
                  {r.from} → {r.to}
                </span>
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 12,
                    color: "#C9A84C",
                  }}
                >
                  {r.price}
                </span>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 13,
                    color: "#5A4E3A",
                  }}
                >
                  {r.train}
                </span>
                <span
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 13,
                    color: "#6B5E45",
                  }}
                >
                  ⏱ {r.time}
                </span>
                <span
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 13,
                    color: "#6B5E45",
                  }}
                >
                  📅 {r.freq}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step */}
      <div
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 11,
          color: "#C9A84C",
          letterSpacing: "0.15em",
          marginBottom: 14,
        }}
      >
        STEP-BY-STEP BOOKING GUIDE
      </div>

      <div style={{ marginBottom: 28 }}>
        {bookingSteps.map((step, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              border: `1px solid ${activeStep === i ? "#C9A84C44" : "#1A1610"}`,
              borderRadius: 12,
              overflow: "hidden",
              transition: "all 0.2s",
            }}
          >
            <div
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 18px",
                cursor: "pointer",
                background: activeStep === i ? "rgba(201,168,76,0.07)" : "#111009",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background:
                    activeStep === i
                      ? "linear-gradient(135deg,#C9A84C,#8B6914)"
                      : "rgba(201,168,76,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cinzel',serif",
                  fontSize: 12,
                  color: activeStep === i ? "#0A0805" : "#C9A84C",
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                {step.num}
              </div>

              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 13,
                  color: "#EDE4D0",
                  flex: 1,
                  letterSpacing: "0.04em",
                }}
              >
                {step.title}
              </span>

              <span
                style={{
                  color: "#5A4E3A",
                  fontSize: 16,
                  transition: "transform 0.2s",
                  transform: activeStep === i ? "rotate(90deg)" : "none",
                }}
              >
                ›
              </span>
            </div>

            {activeStep === i && (
              <div
                style={{
                  padding: "0 18px 18px 18px",
                  background: "rgba(201,168,76,0.04)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Crimson Pro',serif",
                    fontSize: 15,
                    color: "#8A7A60",
                    lineHeight: 1.7,
                    marginBottom: step.tip || step.warning ? 12 : 0,
                  }}
                >
                  {step.body}
                </p>

                {step.tip && (
                  <div
                    style={{
                      padding: "8px 14px",
                      background: "rgba(46,125,50,0.1)",
                      border: "1px solid rgba(46,125,50,0.25)",
                      borderRadius: 8,
                      fontFamily: "'Crimson Pro',serif",
                      fontSize: 13,
                      color: "#6BBF6A",
                      lineHeight: 1.6,
                      marginBottom: step.warning ? 10 : 0,
                    }}
                  >
                    {step.tip}
                  </div>
                )}

                {step.warning && (
                  <div
                    style={{
                      padding: "8px 14px",
                      background: "rgba(180,80,40,0.1)",
                      border: "1px solid rgba(200,100,50,0.3)",
                      borderRadius: 8,
                      fontFamily: "'Crimson Pro',serif",
                      fontSize: 13,
                      color: "#c8764a",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.warning}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Workarounds */}
      <div
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 11,
          color: "#e07070",
          letterSpacing: "0.15em",
          marginBottom: 14,
        }}
      >
        💳 PAYMENT WORKAROUNDS (WHEN FOREIGN CARDS FAIL)
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {paymentWorkarounds.map((w, i) => (
          <div
            key={i}
            style={{
              padding: 18,
              background: "#111009",
              border: "1px solid #1A1610",
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{w.icon}</div>
            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 11,
                color: "#C9A84C",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              {w.title.toUpperCase()}
            </div>
            <p
              style={{
                fontFamily: "'Crimson Pro',serif",
                fontSize: 13,
                color: "#6B5E45",
                lineHeight: 1.6,
              }}
            >
              {w.desc}
            </p>
          </div>
        ))}
      </div>

      {/* On the day of travel */}
      <div
        style={{
          padding: 18,
          background: "rgba(201,168,76,0.06)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 11,
            color: "#C9A84C",
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          🎫 ON THE DAY OF TRAVEL
        </div>

        {[
          "Show your e-ticket (screenshot or print) at the platform barrier — no need to re-print if digital.",
          "Bring your passport — it must match the name on the ticket.",
          "Arrive at the station 20–30 minutes before departure.",
          "Luggage goes in overhead racks or under your seat — no check-in needed.",
          "The train is usually very punctual — Uzbek rail prides itself on timeliness.",
          "Food cart comes through on longer journeys. Cash only, mostly tea and snacks.",
        ].map((tip, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ color: "#C9A84C", flexShrink: 0 }}>◆</span>
            <span
              style={{
                fontFamily: "'Crimson Pro',serif",
                fontSize: 14,
                color: "#8A7A60",
                lineHeight: 1.5,
              }}
            >
              {tip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}