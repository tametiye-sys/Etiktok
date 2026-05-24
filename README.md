{showHeart&&<div style={{position:"absolute",top:"50%",left:"50%",animation:"heartPop 0.9s ease forwards",pointerEvents:"none",zIndex:20}}>
        <svg viewBox="0 0 24 24" width="120" height="120" fill="#fe2c55"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>}

      <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(0,0,0,0.85),transparent)",padding:"80px 16px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:"2px solid white"}}>{video.avatar}</div>
          <span style={{color:"white",fontWeight:700,fontSize:16,fontFamily:"'Noto Serif Ethiopic',serif"}}>{video.user}</span>
          <button onClick={e=>{e.stopPropagation();setFollowing(!following);}} style={{marginLeft:4,padding:"3px 12px",borderRadius:4,border:following?"1px solid rgba(255,255,255,0.5)":"none",background:following?"transparent":"#fe2c55",color:"white",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif Ethiopic',serif"}}>{following?"እየተከተሉ":"ተከተሉ"}</button>
        </div>
        <p style={{color:"white",fontSize:14,margin:"0 0 8px",lineHeight:1.5,fontFamily:"'Noto Serif Ethiopic',serif"}}>{video.description}</p>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span>🎵</span><span style={{color:"rgba(255,255,255,0.85)",fontSize:13}}>{video.song}</span></div>
      </div>

      <div style={{position:"absolute",right:12,bottom:120,display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
        <div onClick={e=>{e.stopPropagation();setLiked(!liked);if(!liked){setShowHeart(true);setTimeout(()=>setShowHeart(false),900);}}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
          <HeartIcon filled={liked}/>
          <span style={{color:"white",fontSize:12,fontWeight:600}}>{video.likes}</span>
        </div>
        {[["💬",video.comments],["↗️",video.shares],["🔖","አስቀምጡ"]].map(([icon,label])=>(
          <div key={label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
            <span style={{fontSize:26}}>{icon}</span>
            <span style={{color:"white",fontSize:12,fontWeight:600}}>{label}</span>
          </div>
        ))}
        <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#333,#111)",border:"3px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",animation:isActive?"spin 3s linear infinite":"none",fontSize:20}}>🎵</div>
      </div>
    </div>
  );
}

function App(){
  const [currentIndex,setCurrentIndex]=useState(0);
  const [activeTab,setActiveTab]=useState("home");
  const [searchQuery,setSearchQuery]=useState("");
  const startY=useRef(null);

  const handleTouchStart=e=>{startY.current=e.touches[0].clientY;};
  const handleTouchEnd=e=>{
    if(startY.current===null)return;
    const diff=startY.current-e.changedTouches[0].clientY;
    if(Math.abs(diff)>50){
      if(diff>0&&currentIndex<videos.length-1)setCurrentIndex(i=>i+1);
      else if(diff<0&&currentIndex>0)setCurrentIndex(i=>i-1);
    }
    startY.current=null;
  };

  return (
    <div style={{width:"100%",maxWidth:430,height:"100vh",background:"#000",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative",fontFamily:"'Noto Serif Ethiopic',sans-serif"}}>
      {/* Top nav */}
      <div style={{position:"absolute",top:0,left:0,right:0,zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",padding:"12px 20px 8px",background:"linear-gradient(to bottom,rgba(0,0,0,0.6),transparent)"}}>
