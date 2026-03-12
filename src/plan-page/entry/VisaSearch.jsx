import { useState } from "react";
import { VISA_DATA } from "../data";

function VisaSearch({visaCountry, setVisaCountry, setVisaResult}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const allKeys = Object.keys(VISA_DATA);
  const filtered = query.trim()===""
    ? allKeys
    : allKeys.filter(k => k.toLowerCase().includes(query.toLowerCase()));
  const select = (k) => {
    setVisaCountry(k);
    setVisaResult(VISA_DATA[k]);
    setQuery("");
    setOpen(false);
  };
  const typeColor = (t) => t==="Visa-Free"?"#6BBF6A":t==="E-Visa"?"#C9A84C":"#e07070";
  const typeBadge = (t) => ({background:t==="Visa-Free"?"rgba(46,125,50,0.2)":t==="E-Visa"?"rgba(201,168,76,0.15)":"rgba(180,50,50,0.2)",color:typeColor(t),border:`1px solid ${typeColor(t)}55`,borderRadius:10,padding:"1px 8px",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.06em",whiteSpace:"nowrap"});
  return (
    <div style={{position:"relative",maxWidth:460,marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 16px",background:"#111009",border:`1px solid ${open?"#C9A84C55":"#2A2418"}`,borderRadius:10,cursor:"text"}} onClick={()=>setOpen(true)}>
        {visaCountry && !open
          ? <><span style={{fontSize:22}}>{VISA_DATA[visaCountry]?.flag}</span><span style={{fontFamily:"'Crimson Pro',serif",color:"#EDE4D0",fontSize:15,flex:1}}>{visaCountry.replace(/^.+? /,"")}</span><span style={typeBadge(VISA_DATA[visaCountry]?.type)}>{VISA_DATA[visaCountry]?.type}</span><button onClick={e=>{e.stopPropagation();setVisaCountry("");setVisaResult(null);}} style={{background:"none",border:"none",color:"#5A4E3A",fontSize:18,cursor:"pointer",padding:"0 2px",lineHeight:1}}>×</button></>
          : <><span style={{fontSize:18,opacity:0.4}}>🔍</span><input autoFocus={open} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your passport country…" style={{flex:1,background:"none",border:"none",outline:"none",color:"#EDE4D0",fontSize:15,fontFamily:"'Crimson Pro',serif"}} onFocus={()=>setOpen(true)}/></>
        }
      </div>
      {open && (
        <>
          <div style={{position:"fixed",inset:0,zIndex:98}} onClick={()=>{setOpen(false);setQuery("");}}/>
          <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#111009",border:"1px solid #2A2418",borderRadius:10,zIndex:99,maxHeight:300,overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
            {filtered.length===0
              ? <div style={{padding:16,fontFamily:"'Crimson Pro',serif",color:"#5A4E3A",fontSize:14,textAlign:"center"}}>No countries found</div>
              : filtered.map(k=>(
                <div key={k} onClick={()=>select(k)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid #1A1610",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#1A1610"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span style={{fontSize:20,lineHeight:1}}>{VISA_DATA[k].flag}</span>
                  <span style={{fontFamily:"'Crimson Pro',serif",color:"#EDE4D0",fontSize:14,flex:1}}>{k.replace(/^.+? /,"")}</span>
                  <span style={typeBadge(VISA_DATA[k].type)}>{VISA_DATA[k].type}</span>
                </div>
              ))
            }
          </div>
        </>
      )}
    </div>
  );
}


export default VisaSearch;
