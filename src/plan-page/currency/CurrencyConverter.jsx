import { useEffect, useState } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [uzs, setUzs] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Approximate offline rates vs USD (UZS per 1 unit of currency)
  const OFFLINE_RATES_TO_USD = {USD:1,EUR:1.09,GBP:1.28,RUB:0.011,KZT:0.002,CNY:0.138,JPY:0.0067,KRW:0.00073,TRY:0.030,AED:0.272,SAR:0.267,INR:0.012,GBP:1.28,CAD:0.74,AUD:0.65,CHF:1.12,SEK:0.095,NOK:0.094,PLN:0.25,CZK:0.044};
  const UZS_PER_USD = 12700;
  const currencies = ["USD","EUR","GBP","RUB","KZT","CNY","JPY","KRW","TRY","AED","SAR","INR","CAD","AUD","CHF","SEK","NOK","PLN","CZK"];
  const symbols = {USD:"$",EUR:"€",GBP:"£",RUB:"₽",KZT:"₸",CNY:"¥",JPY:"¥",KRW:"₩",TRY:"₺",AED:"د.إ",SAR:"﷼",INR:"₹",CAD:"CA$",AUD:"A$",CHF:"Fr",SEK:"kr",NOK:"kr",PLN:"zł",CZK:"Kč"};

  const convert = async () => {
    const val = parseFloat(amount);
    if (!val || isNaN(val)) return;
    setLoading(true); setError(null);
    try {
      const r = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const d = await r.json();
      if (d.rates && d.rates.UZS) {
        setUzs(val * d.rates.UZS);
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
        return;
      }
    } catch(_){}
    // Fallback to offline rates
    const toUSD = OFFLINE_RATES_TO_USD[from] || 1;
    setUzs(val * toUSD * UZS_PER_USD);
    setLastUpdated("offline estimate");
    setLoading(false);
  };

  useEffect(() => { convert(); }, [from, amount]);

  const fmt = (n) => n >= 1000 ? n.toLocaleString("en-US",{maximumFractionDigits:0}) : n.toFixed(2);

  return (
    <div style={{background:"#111009",border:"1px solid #1A1610",borderRadius:16,padding:28,maxWidth:540}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:"#C9A84C",letterSpacing:"0.2em",marginBottom:20}}>LIVE CURRENCY CONVERTER</div>
      <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#0A0805",borderRadius:10,padding:"10px 14px",flex:1,minWidth:160}}>
          <select value={from} onChange={e=>setFrom(e.target.value)} style={{background:"none",border:"none",color:"#EDE4D0",fontSize:15,fontFamily:"'Crimson Pro',serif",outline:"none",cursor:"pointer",width:62}}>
            {currencies.map(c=><option key={c} value={c} style={{background:"#111009"}}>{c}</option>)}
          </select>
          <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" min="0" style={{background:"none",border:"none",color:"#EDE4D0",fontSize:22,fontFamily:"'Cinzel',serif",outline:"none",width:100,fontWeight:600}} placeholder="1"/>
        </div>
        <span style={{fontFamily:"'Cinzel',serif",color:"#C9A84C",fontSize:20}}>=</span>
        <div style={{background:"linear-gradient(135deg,rgba(201,168,76,0.15),rgba(139,105,20,0.1))",border:"1px solid #C9A84C44",borderRadius:10,padding:"10px 20px",flex:1,minWidth:180}}>
          {loading ? (
            <span style={{fontFamily:"'Cinzel',serif",color:"#5A4E3A",fontSize:14}}>calculating…</span>
          ) : uzs ? (
            <>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:26,color:"#C9A84C",fontWeight:700,letterSpacing:"0.02em"}}>{fmt(uzs)}</div>
              <div style={{fontFamily:"'Crimson Pro',serif",fontSize:12,color:"#5A4E3A",marginTop:2}}>Uzbek som (UZS) · {lastUpdated}</div>
            </>
          ) : <span style={{color:"#5A4E3A",fontFamily:"'Crimson Pro',serif"}}>enter amount</span>}
        </div>
      </div>
      {uzs && !loading && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[10,50,100,200,500,1000].map(v=>(
            <div key={v} onClick={()=>setAmount(String(v))} style={{padding:"8px 10px",background:amount==String(v)?"rgba(201,168,76,0.15)":"#0A0805",border:`1px solid ${amount==String(v)?"#C9A84C55":"#1A1610"}`,borderRadius:8,cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:"#5A4E3A"}}>{symbols[from]||""}{v}</div>
              <div style={{fontFamily:"'Crimson Pro',serif",fontSize:13,color:"#C9A84C",fontWeight:600}}>{fmt(v * (uzs/parseFloat(amount||1)))} UZS</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TRAIN GUIDE ──────────────────────────────────────────────────────────────
const TRAIN_STEPS = [
  {
    num:1, title:"Go to the Official Site",
    body:"Open uzrailpass.uz in a desktop browser (mobile often fails). If the page loads slowly, try clearing cookies or using a different browser — Chrome or Firefox work best.",
    tip:"🔒 Make sure it says 'https://' — the site has had phishing copies.",
    warning:null,
  },
  {
    num:2, title:"Select Your Route & Date",
    body:"Click 'Buy Tickets'. Select departure city, destination, and date. The calendar only shows dates with available trains. Samarkand ↔ Tashkent: Afrosiyob (fast, 2hrs). Samarkand ↔ Bukhara: Sharq or Afrosiyob (2hrs). Bukhara ↔ Tashkent: Sharq (3.5hrs).",
    tip:"🗓️ Book at least 3–7 days ahead in peak season (April–October). Trains sell out fast.",
    warning:null,
  },
  {
    num:3, title:"Choose Your Train & Class",
    body:"'Afrosiyob' = high-speed bullet train (best). 'Sharq' = comfortable express. 'Economy' class is fine — seats are assigned, clean and air-conditioned. 'Business' has wider seats and a meal. 'VIP' is like a private cabin.",
    tip:"💡 Economy on Afrosiyob is perfectly comfortable and costs half of Business.",
    warning:null,
  },
  {
    num:4, title:"Enter Passenger Details",
    body:"Enter your full name EXACTLY as in your passport. Passport number is required. Email address for the e-ticket. Double-check the spelling — name mismatches can cause boarding issues.",
    tip:"📋 Use Latin characters only. Your name must match your passport exactly.",
    warning:null,
  },
  {
    num:5, title:"Payment — This Is Where It Gets Tricky",
    body:"The site accepts Uzbek UzCard, HUMO cards, and theoretically Visa/Mastercard. In practice, most foreign-issued Visa/Mastercards are rejected by the payment gateway.",
    tip:null,
    warning:"⚠️ If your card fails, don't panic — use the workarounds below.",
  },
];

const PAYMENT_WORKAROUNDS = [
  {icon:"🤝", title:"Ask Your Hotel", body:"Almost every hotel or guesthouse in Uzbekistan will buy the ticket for you and charge you in cash. This is the most reliable method. Ask the day before you need to travel."},
  {icon:"🚶", title:"Station Ticket Office", body:"Go to the train station and buy at the counter. International passport is accepted. Arrive 1–2 hours before your train — queues can be long. Staff often speak some English."},
  {icon:"💳", title:"Try a Different Card", body:"Some travelers report success with Revolut (virtual card), Wise, or N26. Create a virtual card with a billing address set to a US or EU country and try again."},
  {icon:"📱", title:"Payme App (Local)", body:"Download the Payme app (Uzbekistan). You can link it to an international card and use it as a payment method on uzrailpass.uz. More setup but it works reliably."},
  {icon:"🏪", title:"Local Travel Agency", body:"Any travel agency in any city will book tickets for a ~5,000–10,000 UZS fee. Worth it for the hassle saved. Your hotel can direct you to the nearest one."},
];

export default CurrencyConverter;
