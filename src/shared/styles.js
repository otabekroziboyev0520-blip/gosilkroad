const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:#0A0805}
  ::-webkit-scrollbar-thumb{background:#C9A84C44;border-radius:2px}
  @keyframes heroIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{box-shadow:0 8px 32px rgba(201,168,76,0.4)}50%{box-shadow:0 8px 48px rgba(201,168,76,0.7)}}
  @keyframes chatIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes dot{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  .hc {
  transition: transform .35s ease, box-shadow .35s ease;
}

.hc:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 45px rgba(0,0,0,0.35);
}
  .hc {
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.hc:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
}
  .city-image:hover img {
  transform: scale(1.06);
}
  .nl{transition:color 0.2s;cursor:pointer}
  .nl:hover{color:#C9A84C !important}
  .leaflet-popup-content-wrapper{background:#111009 !important;border:1px solid #C9A84C33 !important;border-radius:8px !important;box-shadow:0 8px 24px rgba(0,0,0,0.5) !important}
  .leaflet-popup-content p{margin:0 !important}
  .leaflet-popup-tip{background:#111009 !important}
  .leaflet-popup-close-button{color:#C9A84C !important}
  input:focus,select:focus{outline:1px solid #C9A84C44 !important}
`;

export { GLOBAL_CSS };
