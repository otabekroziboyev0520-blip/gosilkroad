import { useEffect, useRef, useState } from "react";
import SYSTEM_PROMPT from "./systemPrompt";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{role:"assistant",content:"Assalomu alaykum! 👋 I'm Rustam — your personal Uzbekistan guide. Ask me anything: best plov in Tashkent, how to reach Khiva, what to wear at a mosque, or hidden gems tourists miss. Where are you planning to go? 🌙"}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { if (open) bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, open]);
  const send = async () => {
    const text = input.trim(); if (!text || loading) return;
    const newMsgs = [...messages, {role:"user", content:text}];
    setMessages(newMsgs); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYSTEM_PROMPT,messages:newMsgs.map(m=>({role:m.role,content:m.content}))})});
      const data = await res.json();
      setMessages(prev => [...prev, {role:"assistant", content:data.content?.[0]?.text || "Kechirasiz! Something went wrong. Try again."}]);
    } catch { setMessages(prev => [...prev, {role:"assistant", content:"Kechirasiz! Connection issue. Please try again."}]); }
    setLoading(false);
  };
  return (
    <>
      {open && <div style={{position:"fixed",bottom:90,right:24,zIndex:1000,width:360,height:500,background:"#0E0B06",border:"1px solid #C9A84C33",borderRadius:16,display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,0.7)",overflow:"hidden",animation:"chatIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>
        <div style={{padding:"14px 18px",background:"linear-gradient(135deg,#1A1208,#0E0B06)",borderBottom:"1px solid #C9A84C22",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#8B6914)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,boxShadow:"0 0 16px #C9A84C44"}}>🧭</div>
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:"#EDE4D0",display:"flex",alignItems:"center",gap:6}}>
              Rustam
              <span style={{fontSize:9,background:"rgba(201,168,76,0.15)",border:"1px solid #C9A84C44",borderRadius:10,padding:"1px 7px",color:"#C9A84C",letterSpacing:"0.08em"}}>VERIFIED LOCAL</span>
            </div>
            <div style={{fontSize:10,color:"#5A4E3A",display:"flex",alignItems:"center",gap:4}}><span style={{width:5,height:5,borderRadius:"50%",background:"#4CAF50",display:"inline-block"}}/>Born in Samarkand · AI Travel Guide</div>
          </div>
          <button onClick={()=>setOpen(false)} style={{marginLeft:"auto",background:"none",border:"none",color:"#5A4E3A",fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
          {messages.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:8,alignItems:"flex-end"}}>
              {m.role==="assistant" && <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#8B6914)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>🧭</div>}
              <div style={{maxWidth:"82%",padding:"10px 14px",background:m.role==="user"?"linear-gradient(135deg,#C9A84C,#A07A2A)":"#1A1610",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",border:m.role==="assistant"?"1px solid #2A2418":"none",fontSize:13,color:m.role==="user"?"#0E0B06":"#BFB49A",lineHeight:1.65,fontFamily:"'Crimson Pro',serif"}}>{m.content}</div>
            </div>
          ))}
          {loading && <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#8B6914)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🧭</div>
            <div style={{padding:"10px 14px",background:"#1A1610",borderRadius:"14px 14px 14px 4px",border:"1px solid #2A2418",display:"flex",gap:4}}>
              {[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:"50%",background:"#C9A84C",display:"inline-block",animation:`dot 1.2s ${i*0.2}s infinite`}}/>)}
            </div>
          </div>}
          <div ref={bottomRef}/>
        </div>
        <div style={{padding:"10px 14px",borderTop:"1px solid #1A1610",background:"#0A0805",display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask Rustam anything about Uzbekistan..." style={{flex:1,padding:"10px 14px",background:"#1A1610",border:"1px solid #2A2418",borderRadius:22,color:"#EDE4D0",fontSize:13,outline:"none",fontFamily:"'Crimson Pro',serif"}}/>
          <button onClick={send} disabled={loading||!input.trim()} style={{width:40,height:40,background:input.trim()?"linear-gradient(135deg,#C9A84C,#8B6914)":"#1A1610",border:"none",borderRadius:"50%",color:input.trim()?"#0E0B06":"#3A3020",fontSize:16,cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0}}>→</button>
        </div>
      </div>}
      <button onClick={()=>setOpen(!open)} style={{position:"fixed",bottom:24,right:24,zIndex:1000,width:58,height:58,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#8B6914)",border:"none",boxShadow:"0 8px 32px rgba(201,168,76,0.5)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,animation:"pulse 3s infinite",transition:"transform 0.2s"}}>
        {open?"✕":"🧭"}
      </button>
    </>
  );
}

export default ChatBot;
