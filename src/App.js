"import { useState, useRef } from "react";

const videos = [
  {
    id: 1,
    user: "@abebe_haile",
    avatar: "🧑🏾",
    description: "አዲስ አበባ ውስጥ ምርጥ ቦታዎች 🔥 #addisababa #ethiopia",
    song: "♪ Teddy Afro - Ethiopia",
    likes: "245.3K",
    comments: "12.4K",
    shares: "8.9K",
    color: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    emoji: "🇪🇹",
    label: "አዲስ አበባ ቪዲዮ",
  },
  {
    id: 2,
    user: "@selam_cook",
    avatar: "👩🏾",
    description: "ምርጥ ኢንጀራ አሰራር ዛሬ ተማሩ! 👨‍🍳 #injera #ethiopianfood",
    song: "♪ Ethiopian Traditional Beat",
    likes: "89.1K",
    comments: "5.2K",
    shares: "3.4K",
    color: "linear-gradient(135deg, #2d1b00 0%, #5c3600 50%, #8b5500 100%)",
    emoji: "🍽️",
    label: "የምግብ አሰራር",
  },
  {
    id: 3,
    user: "@habtamu_dance",
    avatar: "🕺🏾",
    description: "አዲሱን ዳንስ ሞክሩ 💃🔥 #dance #ethiopiadance #viral",
    song: "♪ Aster Aweke - Yewedihalehu",
    likes: "512.7K",
    comments: "34.1K",
    shares: "67.2K",
    color: "linear-gradient(135deg, #1a0030 0%, #3d0060 50%, #6a0080 100%)",
    emoji: "💃",
    label: "ዳንስ ቪዲዮ",
  },
  {
    id: 4,
    user: "@mekdes_travel",
    avatar: "👩🏾‍💼",
    description: "ላሊበላ ድንቅ ነው! 😍✈️ #lalibela #travel #ethiopia",
    song: "♪ Mahmoud Ahmed - Alemariam",
    likes: "178.4K",
    comments: "9.8K",
    shares: "22.1K",
    color: "linear-gradient(135deg, #001a00 0%, #003300 50%, #005500 100%)",
    emoji: "⛪",
    label: "ቱሪዝም",
  },
  {
    id: 5,
    user: "@yonas_comedy",
    avatar: "🤣",
    description: "ሳቅ ሳቅ 😂😂 #comedy #ethiopian #funny",
    song: "♪ Comedy Beat Mix",
    likes: "1.2M",
    comments: "89.4K",
    shares: "134.6K",
    color: "linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #704d00 100%)",
    emoji: "😂",
    label: "ኮሜዲ",
  },
];

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill={filled ? "#fe2c55" : "none"} stroke={filled ? "#fe2c55" : "white"} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

// ቁጥሮችን በትክክል ለመጨመር የተስተካከለ ፈንክሽን
function addCount(str) {
  const num = parseFloat(str);
  if (isNaN(num)) return str;
  const suffix = str.replace(/[0-9.]/g, "");
  return (num + 0.1).toFixed(1) + suffix;
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
      <div style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>{icon}</div>
      <span style={{ color: "white", fontSize: 12, fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>{label}</span>
    </div>
  );
}

function VideoCard({ video, isActive }) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
 
  const tapTimer = useRef(null);
  const tapCount = useRef(0);

  const handleDoubleTap = () => {
    tapCount.current += 1;
    if (tapCount.current === 1) {
      tapTimer.current = setTimeout(() => {
        tapCount.current = 0;
      }, 300);
    } else if (tapCount.current === 2) {
      clearTimeout(tapTimer.current);
      tapCount.current = 0;
      if (!liked) {
        setLiked(true);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 900);
      }
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    const nextLiked = !liked;
    setLiked(nextLiked);
    if (nextLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
  };

  return (
    <div
      onClick={handleDoubleTap}
      style={{

width: "100%",
        height: "100%",
        background: video.color,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {/* Video placeholder with big emoji */}
      <div style={{ fontSize: 120, opacity: isActive ? 1 : 0.5, transition: "opacity 0.4s", filter: "drop-shadow(0 0 40px rgba(255,255,255,0.2))" }}>
        {video.emoji}
      </div>

      {/* Double tap heart animation */}
      {showHeart && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "heartPop 0.9s ease forwards", pointerEvents: "none", zIndex: 20 }}>
          <svg viewBox="0 0 24 24" width="120" height="120" fill="#fe2c55">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      )}

      {/* Bottom info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "80px 16px 24px" }}>
        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "2px solid white" }}>{video.avatar}</div>
          <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{video.user}</span>
          <button
            onClick={e => { e.stopPropagation(); setFollowing(!following); }}
            style={{
              marginLeft: 4, padding: "3px 12px", borderRadius: 4,
              border: following ? "1px solid rgba(255,255,255,0.5)" : "none",
              background: following ? "transparent" : "#fe2c55", color: "white",
              fontWeight: 700, fontSize: 13, cursor: "pointer"
            }}
          >
            {following ? "እየተከተሉ" : "ተከተሉ"}
          </button>
        </div>
        {/* Description */}
        <p style={{ color: "white", fontSize: 14, margin: "0 0 8px", lineHeight: 1.5, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{video.description}</p>
        {/* Song */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13 }}>🎵</span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "monospace" }}>{video.song}</span>
        </div>
      </div>

      {/* Right action buttons */}
      <div style={{ position: "absolute", right: 12, bottom: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Like */}
        <ActionBtn
          icon={<HeartIcon filled={liked} />}
          label={liked ? addCount(video.likes) : video.likes}
          onClick={handleLikeClick}
        />
        {/* Comment */}
        <ActionBtn icon={<span style={{ fontSize: 26 }}>💬</span>} label={video.comments} />
        {/* Share */}
        <ActionBtn icon={<span style={{ fontSize: 26 }}>↗️</span>} label={video.shares} />
        {/* Bookmark */}
        <ActionBtn icon={<span style={{ fontSize: 26 }}>🔖</span>} label="አስቀምጡ" />
        {/* Music disc */}
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #333, #111)", border: "3px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: isActive ? "spin 3s linear infinite" : "none", fontSize: 20 }}>🎵</div>
      </div>
    </div>
  );
}

export default function TikTokApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const startY = useRef(null);

const handleTouchStart = e => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = e => {
    if (startY.current === null) return;
    const diff = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < videos.length - 1) setCurrentIndex(i => i + 1);
      else if (diff < 0 && currentIndex > 0) setCurrentIndex(i => i - 1);
    }
    startY.current = null;
  };

  const handleWheel = e => {
    if (e.deltaY > 40 && currentIndex < videos.length - 1) setCurrentIndex(i => i + 1);
    else if (e.deltaY < -40 && currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  return (
    <div style={{ width: "100%", height: "100vh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Noto Serif Ethiopic', 'Segoe UI', sans-serif", maxWidth: 430, margin: "0 auto", position: "relative" }}>
      <style>{
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Ethiopic:wght@400;700&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes heartPop { 0% { transform: translate(-50%,-50%) scale(0); opacity: 1; } 50% { transform: translate(-50%,-50%) scale(1.2); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1); opacity: 0; } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
     
}</style>

      {/* Top nav */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px 8px", background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
        {activeTab === "home" ? (
          <>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, cursor: "pointer" }}>እየተከተሉ</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 14px" }}>|</span>
            <span style={{ color: "white", fontSize: 17, fontWeight: 700, borderBottom: "2px solid white", paddingBottom: 2 }}>ለእናንተ</span>
          </>
        ) : activeTab === "search" ? (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
            <span>🔍</span>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="ፈልጉ..." style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 15, width: "100%" }} />
          </div>
        ) : (
          <span style={{ color: "white", fontSize: 17, fontWeight: 700 }}>
            {activeTab === "profile" ? "መለያ" : activeTab === "inbox" ? "መልእክቶች" : "አዲስ"}
          </span>
        )}
        <div style={{ position: "absolute", right: 16, top: 12 }}>
          <span style={{ fontSize: 22, cursor: "pointer" }}>📡</span>
        </div>
      </div>

      {/* Video feed */}
      <div ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onWheel={handleWheel} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {videos.map((video, i) => (
          <div key={video.id} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, transform: translateY(${(i - currentIndex) * 100}%)
, transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
            <VideoCard video={video} isActive={i === currentIndex} />
          </div>
        ))}

        {/* Progress dots */}
        <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 5 }}>
          {videos.map((_, i) => (
            <div key={i} onClick={() => setCurrentIndex(i)} style={{ width: i === currentIndex ? 4 : 3, height: i === currentIndex ? 20 : 8, borderRadius: 4, background: i === currentIndex ? "white" : "rgba(255,255,255,0.35)", transition: "all 0.3s", cursor: "pointer" }} />

))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: "rgba(0,0,0,0.95)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 0 16px", zIndex: 10 }}>
        {[
          { id: "home", icon: "🏠", label: "ዋና" },
          { id: "search", icon: "🔍", label: "ፈልጉ" },
          { id: "add", icon: null, label: "" },
          { id: "inbox", icon: "💬", label: "መልእክት" },
          { id: "profile", icon: "👤", label: "መለያ" },
        ].map(tab => (
          tab.id === "add" ? (
            <button key="add" onClick={() => setActiveTab("add")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <div style={{ width: 46, height: 32, borderRadius: 8, background: "linear-gradient(90deg, #25f4ee, #fe2c55)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 2px black, 0 0 0 3px rgba(255,255,255,0.2)" }}>
                <span style={{ color: "white", fontSize: 20, fontWeight: "bold", lineHeight: 1 }}>+</span>
              </div>
            </button>
          ) : (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: activeTab === tab.id ? 1 : 0.5, transition: "opacity 0.2s" }}>
              <span style={{ fontSize: 24 }}>{tab.icon}</span>
              <span style={{ color: "white", fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400 }}>{tab.label}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
}"
አስተከክለ ስጣኝ


Gemini said
የሰጡት ኮድ በጣም ጥሩ የሆነ የቲክቶክ (TikTok) ክሎን መተግበሪያ ነው። ነገር ግን፣ በኮዱ ውስጥ ሁለት ዋና ዋና ስህተቶች ስላሉ ነው ስራውን ያቋረጠው።

እነዚህን ስህተቶች አስተካክዬ ሙሉውን ኮድ ከዚህ በታች አዘጋጅቼልዎታለሁ።

🛠️ የተስተካከሉ ዋና ዋና ስህተቶች፡
የtranslateY ስህተት (በመስመር 198 አካባቢ): በጃቫስክሪፕት ውስጥ translateY በጽሑፍ (Template Literal) ውስጥ ሲቀመጥ የዶላር ምልክት እና ቅንፍ ${} ያስፈልገዋል። የእርስዎ ኮድ ላይ translateY(${(i - currentIndex) * 100}%) ተብሎ የተጻፈው ስህተት ነበር። ወደ translateY(${(i - currentIndex) * 100}%) ተስተካክሏል።

የCSS <style> ስህተት (በመስመር 178 አካባቢ): በReact ውስጥ የ<style> ታግ ሲጠቀሙ በውስጡ ያለው የCSS ጽሑፍ በ{   } (Template Literal) መያዝ አለበት። የእርስዎ ኮድ ላይ ተራ ቅንፍ ብቻ ስለነበረው React እንዳይሰራ አድርጎት ነበር።

💻 የተስተካከለው ሙሉ ኮድ፡
JavaScript


import { useState, useRef } from "react";

const videos = [
  {
    id: 1,
    user: "@abebe_haile",
    avatar: "🧑🏾",
    description: "አዲስ አበባ ውስጥ ምርጥ ቦታዎች 🔥 #addisababa #ethiopia",
    song: "♪ Teddy Afro - Ethiopia",
    likes: "245.3K",
    comments: "12.4K",
    shares: "8.9K",
    color: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    emoji: "🇪🇹",
    label: "አዲስ አበባ ቪዲዮ",
  },
  {
    id: 2,
    user: "@selam_cook",
    avatar: "👩🏾",
    description: "ምርጥ ኢንጀራ አሰራር ዛሬ ተማሩ! 👨‍🍳 #injera #ethiopianfood",
    song: "♪ Ethiopian Traditional Beat",
    likes: "89.1K",
    comments: "5.2K",
    shares: "3.4K",
    color: "linear-gradient(135deg, #2d1b00 0%, #5c3600 50%, #8b5500 100%)",
    emoji: "🍽️",
    label: "የምግብ አሰራር",
  },
  {
    id: 3,
    user: "@habtamu_dance",
    avatar: "🕺🏾",
    description: "አዲሱን ዳንስ ሞክሩ 💃🔥 #dance #ethiopiadance #viral",
    song: "♪ Aster Aweke - Yewedihalehu",
    likes: "512.7K",
    comments: "34.1K",
    shares: "67.2K",
    color: "linear-gradient(135deg, #1a0030 0%, #3d0060 50%, #6a0080 100%)",
    emoji: "💃",
    label: "ዳንስ ቪዲዮ",
  },
  {
    id: 4,
    user: "@mekdes_travel",
    avatar: "👩🏾‍💼",
    description: "ላሊበላ ድንቅ ነው! 😍✈️ #lalibela #travel #ethiopia",
    song: "♪ Mahmoud Ahmed - Alemariam",
    likes: "178.4K",
    comments: "9.8K",
    shares: "22.1K",
    color: "linear-gradient(135deg, #001a00 0%, #003300 50%, #005500 100%)",
    emoji: "⛪",
    label: "ቱሪዝም",
  },
  {
    id: 5,
    user: "@yonas_comedy",
    avatar: "🤣",
    description: "ሳቅ ሳቅ 😂😂 #comedy #ethiopian #funny",
    song: "♪ Comedy Beat Mix",
    likes: "1.2M",
    comments: "89.4K",
    shares: "134.6K",
    color: "linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #704d00 100%)",
    emoji: "😂",
    label: "ኮሜዲ",
  },
];

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill={filled ? "#fe2c55" : "none"} stroke={filled ? "#fe2c55" : "white"} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

// ቁጥሮችን በትክክል ለመጨመር የተስተካከለ ፈንክሽን
function addCount(str) {
  const num = parseFloat(str);
  if (isNaN(num)) return str;
  const suffix = str.replace(/[0-9.]/g, "");
  return (num + 0.1).toFixed(1) + suffix;
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
      <div style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>{icon}</div>
      <span style={{ color: "white", fontSize: 12, fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>{label}</span>
    </div>
  );
}

function VideoCard({ video, isActive }) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  
  const tapTimer = useRef(null);
  const tapCount = useRef(0);

  const handleDoubleTap = () => {
    tapCount.current += 1;
    if (tapCount.current === 1) {
      tapTimer.current = setTimeout(() => {
        tapCount.current = 0;
      }, 300);
    } else if (tapCount.current === 2) {
      clearTimeout(tapTimer.current);
      tapCount.current = 0;
      if (!liked) {
        setLiked(true);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 900);
      }
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    const nextLiked = !liked;
    setLiked(nextLiked);
    if (nextLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
  };

  return (
    <div 
      onClick={handleDoubleTap} 
      style={{
        width: "100%", 
        height: "100%", 
        background: video.color, 
        position: "relative", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexShrink: 0, 
        userSelect: "none", 
      }}
    >
      {/* Video placeholder with big emoji */}
      <div style={{ fontSize: 120, opacity: isActive ? 1 : 0.5, transition: "opacity 0.4s", filter: "drop-shadow(0 0 40px rgba(255,255,255,0.2))" }}>
        {video.emoji}
      </div>

      {/* Double tap heart animation */}
      {showHeart && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "heartPop 0.9s ease forwards", pointerEvents: "none", zIndex: 20 }}>
          <svg viewBox="0 0 24 24" width="120" height="120" fill="#fe2c55">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      )}

      {/* Bottom info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "80px 16px 24px" }}>
        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "2px solid white" }}>{video.avatar}</div>
          <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{video.user}</span>
          <button 
            onClick={e => { e.stopPropagation(); setFollowing(!following); }} 
            style={{ 
              marginLeft: 4, padding: "3px 12px", borderRadius: 4, 
              border: following ? "1px solid rgba(255,255,255,0.5)" : "none", 
              background: following ? "transparent" : "#fe2c55", color: "white", 
              fontWeight: 700, fontSize: 13, cursor: "pointer" 
            }}
          >
            {following ? "እየተከተሉ" : "ተከተሉ"}
          </button>
        </div>
        {/* Description */}
        <p style={{ color: "white", fontSize: 14, margin: "0 0 8px", lineHeight: 1.5, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{video.description}</p>
        {/* Song */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13 }}>🎵</span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "monospace" }}>{video.song}</span>
        </div>
      </div>

      {/* Right action buttons */}
      <div style={{ position: "absolute", right: 12, bottom: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Like */}
        <ActionBtn 
          icon={<HeartIcon filled={liked} />} 
          label={liked ? addCount(video.likes) : video.likes} 
          onClick={handleLikeClick} 
        />
        {/* Comment */}
        <ActionBtn icon={<span style={{ fontSize: 26 }}>💬</span>} label={video.comments} />
        {/* Share */}
        <ActionBtn icon={<span style={{ fontSize: 26 }}>↗️</span>} label={video.shares} />
        {/* Bookmark */}
        <ActionBtn icon={<span style={{ fontSize: 26 }}>🔖</span>} label="አስቀምጡ" />
        {/* Music disc */}
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #333, #111)", border: "3px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: isActive ? "spin 3s linear infinite" : "none", fontSize: 20 }}>🎵</div>
      </div>
    </div>
  );
}

export default function TikTokApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const startY = useRef(null);

  const handleTouchStart = e => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = e => {
    if (startY.current === null) return;
    const diff = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < videos.length - 1) setCurrentIndex(i => i + 1);
      else if (diff < 0 && currentIndex > 0) setCurrentIndex(i => i - 1);
    }
    startY.current = null;
  };

  const handleWheel = e => {
    if (e.deltaY > 40 && currentIndex < videos.length - 1) setCurrentIndex(i => i + 1);
    else if (e.deltaY < -40 && currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  return (
    <div style={{ width: "100%", height: "100vh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Noto Serif Ethiopic', 'Segoe UI', sans-serif", maxWidth: 430, margin: "0 auto", position: "relative" }}>
      
      {/* ⚠️ እዚህ ጋር ስህተቱ ተስተካክሏል */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Ethiopic:wght@400;700&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes heartPop { 0% { transform: translate(-50%,-50%) scale(0); opacity: 1; } 50% { transform: translate(-50%,-50%) scale(1.2); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1); opacity: 0; } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Top nav */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px 8px", background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
        {activeTab === "home" ? (
          <>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, cursor: "pointer" }}>እየተከተሉ</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 14px" }}>|</span>
            <span style={{ color: "white", fontSize: 17, fontWeight: 700, borderBottom: "2px solid white", paddingBottom: 2 }}>ለእናንተ</span>
          </>
        ) : activeTab === "search" ? (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
            <span>🔍</span>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="ፈልጉ..." style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 15, width: "100%" }} />
          </div>
        ) : (
          <span style={{ color: "white", fontSize: 17, fontWeight: 700 }}>
            {activeTab === "profile" ? "መለያ" : activeTab === "inbox" ? "መልእክቶች" : "አዲስ"}
          </span>
        )}
        <div style={{ position: "absolute", right: 16, top: 12 }}>
          <span style={{ fontSize: 22, cursor: "pointer" }}>📡</span>
        </div>
      </div>

      {/* Video feed */}
      <div ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onWheel={handleWheel} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {videos.map((video, i) => (
          /* ⚠️ እዚህ ጋር የነበረው translateY ስህተት ተስተካክሏል */
          <div key={video.id} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, transform: `translateY(${(i - currentIndex) * 100}%)`, transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
            <VideoCard video={video} isActive={i === currentIndex} />
          </div>
        ))}

        {/* Progress dots */}
        <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 5 }}>
          {videos.map((_, i) => (
            <div key={i} onClick={() => setCurrentIndex(i)} style={{ width: i === currentIndex ? 4 : 3, height: i === currentIndex ? 20 : 8, borderRadius: 4, background: i === currentIndex ? "white" : "rgba(255,255,255,0.35)", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: "rgba(0,0,0,0.95)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 0 16px", zIndex: 10 }}>
        {[
          { id: "home", icon: "🏠", label: "ዋና" },
          { id: "search", icon: "🔍", label: "ፈልጉ" },
          { id: "add", icon: null, label: "" },
          { id: "inbox", icon: "💬", label: "መልእክት" },
          { id: "profile", icon: "👤", label: "መለያ" },
        ].map(tab => (
          tab.id === "add" ? (
            <button key="add" onClick={() => setActiveTab("add")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <div style={{ width: 46, height: 32, borderRadius: 8, background: "linear-gradient(90deg, #25f4ee, #fe2c55)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 2px black, 0 0 0 3px rgba(255,255,255,0.2)" }}>
                <span style={{ color: "white", fontSize: 20, fontWeight: "bold", lineHeight: 1 }}>+</span>
              </div>
            </button>
          ) : (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: activeTab === tab.id ? 1 : 0.5, transition: "opacity 0.2s" }}>
              <span style={{ fontSize: 24 }}>{tab.icon}</span>
              <span style={{ color: "white", fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400 }}>{tab.label}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
}
