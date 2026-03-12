import { useState } from "react";
import { PHRASES } from "../data";

export default function Phrasebook() {
  const [activeCategory, setActiveCategory] = useState("Greetings");
  const [activeLang, setActiveLang] = useState("both");
  const [search, setSearch] = useState("");
  const categories = Object.keys(PHRASES);

  const allPhrases = search.trim()
    ? Object.values(PHRASES).flat().filter(p =>
        [p.en,p.uz,p.ru,p.phonetic_uz,p.phonetic_ru].some(s=>s.toLowerCase().includes(search.toLowerCase()))
      )
    : PHRASES[activeCategory] || [];

  const langColor = {uz:"#5BB8D4", ru:"#e07070"};

  return (
    <div>
      {/* Language toggle + search */}
      <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search phrases…" style={{flex:1,minWidth:180,padding:"9px 14px",background:"#111009",border:"1px solid #2A2418",borderRadius:8,color:"#EDE4D0",fontFamily:"'Crimson Pro',serif",fontSize:14,outline:"none"}}/>
        <div style={{display:"flex",gap:6}}>
          {[["both","🇺🇿+🇷🇺"],["uz","🇺🇿 Uzbek"],["ru","🇷🇺 Russian"]].map(([v,l])=>(
            <button key={v} onClick={()=>setActiveLang(v)} style={{padding:"8px 14px",background:activeLang===v?"rgba(201,168,76,0.2)":"#111009",border:`1px solid ${activeLang===v?"#C9A84C55":"#1A1610"}`,borderRadius:8,color:activeLang===v?"#C9A84C":"#5A4E3A",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.06em",cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      {!search.trim() && (
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setActiveCategory(cat)} style={{padding:"7px 14px",background:activeCategory===cat?"rgba(201,168,76,0.15)":"#111009",border:`1px solid ${activeCategory===cat?"#C9A84C55":"#1A1610"}`,borderRadius:20,color:activeCategory===cat?"#C9A84C":"#5A4E3A",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.05em",cursor:"pointer",transition:"all 0.15s"}}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Phrases */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {allPhrases.map((p,i)=>(
          <div key={i} style={{background:"#111009",border:"1px solid #1A1610",borderRadius:12,padding:"16px 18px"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#EDE4D0",marginBottom:12}}>{p.en}</div>
            <div style={{display:"grid",gridTemplateColumns:activeLang==="both"?"1fr 1fr":"1fr",gap:12}}>
              {(activeLang==="both"||activeLang==="uz") && (
                <div style={{background:"rgba(91,184,212,0.07)",border:"1px solid rgba(91,184,212,0.2)",borderRadius:8,padding:"10px 14px"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:9,color:langColor.uz,letterSpacing:"0.15em",marginBottom:4}}>🇺🇿 UZBEK</div>
                  <div style={{fontFamily:"'Crimson Pro',serif",fontSize:17,color:"#EDE4D0",marginBottom:4,fontStyle:"italic"}}>{p.uz}</div>
                  <div style={{fontFamily:"'Crimson Pro',serif",fontSize:12,color:"#5BB8D4",opacity:0.7}}>/{p.phonetic_uz}/</div>
                </div>
              )}
              {(activeLang==="both"||activeLang==="ru") && (
                <div style={{background:"rgba(224,112,112,0.07)",border:"1px solid rgba(224,112,112,0.2)",borderRadius:8,padding:"10px 14px"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:9,color:langColor.ru,letterSpacing:"0.15em",marginBottom:4}}>🇷🇺 RUSSIAN</div>
                  <div style={{fontFamily:"'Crimson Pro',serif",fontSize:17,color:"#EDE4D0",marginBottom:4,fontStyle:"italic"}}>{p.ru}</div>
                  <div style={{fontFamily:"'Crimson Pro',serif",fontSize:12,color:"#e07070",opacity:0.7}}>/{p.phonetic_ru}/</div>
                </div>
              )}
            </div>
            {p.tip && <div style={{marginTop:10,padding:"6px 12px",background:"rgba(201,168,76,0.07)",borderRadius:6,fontFamily:"'Crimson Pro',serif",fontSize:12,color:"#8A7A60",fontStyle:"italic"}}>💡 {p.tip}</div>}
          </div>
        ))}
        {allPhrases.length===0 && <div style={{fontFamily:"'Crimson Pro',serif",color:"#5A4E3A",fontSize:15,padding:20,textAlign:"center"}}>No phrases found for "{search}"</div>}
      </div>
    </div>
  );
}

