// ============================================
// Decorations — Custom Pure-SVG South Indian Motifs & Ornaments
// High-quality, responsive vector graphics with low-opacity styling
// ============================================
import React from 'react';

// ── 1. Repeating Kolam Grid Pattern ──
export function KolamPattern({ className = "absolute inset-0 pointer-events-none", opacity = 0.02 }) {
  return (
    <div className={className} style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kolamGrid" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Center dots & loop */}
            <circle cx="80" cy="80" r="2.5" fill="#C9A227" />
            <circle cx="50" cy="50" r="2" fill="#C9A227" />
            <circle cx="110" cy="50" r="2" fill="#C9A227" />
            <circle cx="50" cy="110" r="2" fill="#C9A227" />
            <circle cx="110" cy="110" r="2" fill="#C9A227" />
            
            {/* Intersecting Kolam loops */}
            <path
              d="M 80,25 C 95,40 110,55 110,80 C 110,105 95,120 80,135 C 65,120 50,105 50,80 C 50,55 65,40 80,25 Z"
              fill="none"
              stroke="#C9A227"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M 25,80 C 40,65 55,50 80,50 C 105,50 120,65 135,80 C 120,95 105,110 80,110 C 55,110 40,95 25,80 Z"
              fill="none"
              stroke="#C9A227"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Diagonals */}
            <path
              d="M 40,40 Q 80,60 120,40 Q 100,80 120,120 Q 80,100 40,120 Q 60,80 40,40"
              fill="none"
              stroke="#C9A227"
              strokeWidth="0.75"
              strokeDasharray="2,2"
            />
            {/* Little corner flowers */}
            <circle cx="10" cy="10" r="1.5" fill="#C9A227" />
            <path d="M 5,10 L 15,10 M 10,5 L 10,15" stroke="#C9A227" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kolamGrid)" />
      </svg>
    </div>
  );
}

// ── 2. Temple Gopuram Silhouette ──
export function GopuramSilhouette({ className = "absolute pointer-events-none", size = 280, opacity = 0.06 }) {
  return (
    <svg
      viewBox="0 0 120 180"
      width={size}
      height={size * 1.5}
      className={className}
      style={{ opacity }}
      fill="none"
      stroke="#C9A227"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base platform */}
      <path d="M 10,170 L 110,170 L 110,160 L 10,160 Z" fill="#C9A227" fillOpacity="0.1" />
      <path d="M 15,160 L 105,160 L 102,145 L 18,145 Z" fill="#C9A227" fillOpacity="0.05" />
      
      {/* Tier 1 (Lowest) */}
      <path d="M 20,145 L 100,145 L 96,120 L 24,120 Z" />
      <path d="M 20,145 H 100 M 24,120 H 96" />
      <line x1="35" y1="145" x2="38" y2="120" />
      <line x1="60" y1="145" x2="60" y2="120" />
      <line x1="85" y1="145" x2="82" y2="120" />
      
      {/* Tier 2 */}
      <path d="M 26,120 L 94,120 L 90,98 L 30,98 Z" />
      <path d="M 26,120 H 94 M 30,98 H 90" />
      <line x1="40" y1="120" x2="43" y2="98" />
      <line x1="60" y1="120" x2="60" y2="98" />
      <line x1="80" y1="120" x2="77" y2="98" />

      {/* Tier 3 */}
      <path d="M 32,98 L 88,98 L 84,78 L 36,78 Z" />
      <path d="M 32,98 H 88 M 36,78 H 84" />
      <line x1="45" y1="98" x2="48" y2="78" />
      <line x1="60" y1="98" x2="60" y2="78" />
      <line x1="75" y1="98" x2="72" y2="78" />

      {/* Tier 4 */}
      <path d="M 38,78 L 82,78 L 78,60 L 42,60 Z" />
      <path d="M 38,78 H 82 M 42,60 H 78" />
      <line x1="48" y1="78" x2="50" y2="60" />
      <line x1="60" y1="78" x2="60" y2="60" />
      <line x1="72" y1="78" x2="70" y2="60" />

      {/* Tier 5 (Top Tier) */}
      <path d="M 44,60 L 76,60 L 72,45 L 48,45 Z" />
      <line x1="52" y1="60" x2="54" y2="45" />
      <line x1="60" y1="60" x2="60" y2="45" />
      <line x1="68" y1="60" x2="66" y2="45" />

      {/* Dome / Shikhar */}
      <path d="M 50,45 C 50,32 70,32 70,45 Z" fill="#C9A227" fillOpacity="0.15" />
      <path d="M 47,45 C 47,30 73,30 73,45 Z" />
      
      {/* 5 Pinnacles (Kalasams) */}
      <circle cx="60" cy="24" r="2.5" fill="#C9A227" />
      <circle cx="53" cy="27" r="2" fill="#C9A227" />
      <circle cx="67" cy="27" r="2" fill="#C9A227" />
      <circle cx="47" cy="30" r="1.5" fill="#C9A227" />
      <circle cx="73" cy="30" r="1.5" fill="#C9A227" />

      {/* Spikes / Finials */}
      <path d="M 60,24 L 60,18" />
      <path d="M 53,27 L 53,22" />
      <path d="M 67,27 L 67,22" />
    </svg>
  );
}

// ── 3. Traditional Brass Kuthuvilakku Lamp ──
export function KuthuvilakkuLamp({ className = "absolute pointer-events-none", height = 240, opacity = 0.08 }) {
  return (
    <svg
      viewBox="0 0 100 240"
      width={height * 0.42}
      height={height}
      className={className}
      style={{ opacity }}
      fill="none"
      stroke="#C9A227"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pedestal Multi-Tiered Base */}
      <path d="M 20,225 L 80,225 C 80,210 20,210 20,225 Z" fill="#C9A227" fillOpacity="0.2" />
      <path d="M 25,210 L 75,210 C 75,200 25,200 25,210 Z" />
      <path d="M 32,200 C 32,190 68,190 68,200 Z" />

      {/* Main Column / Stem */}
      <path d="M 46,190 L 46,65 L 54,65 L 54,190 Z" fill="#C9A227" fillOpacity="0.05" />
      
      {/* Column Rings / Decorative Bands */}
      <path d="M 42,160 H 58" />
      <path d="M 43,120 H 57" />
      <path d="M 43,85 H 57" />

      {/* Oil Bowl (Deep Plate) */}
      <path d="M 15,65 C 15,50 85,50 85,65 Z" fill="#C9A227" fillOpacity="0.1" />
      <path d="M 15,65 H 85" />
      
      {/* Five Flame Outlets (Prongs) */}
      <path d="M 20,62 Q 22,55 25,60" />
      <path d="M 35,60 Q 38,52 40,58" />
      <path d="M 50,58 Q 50,48 50,56" />
      <path d="M 65,60 Q 62,52 60,58" />
      <path d="M 80,62 Q 78,55 75,60" />

      {/* Flames */}
      {/* Central main flame */}
      <path
        d="M 47,46 C 47,38 53,38 53,46 C 53,52 47,52 47,46 Z"
        fill="#C9A227"
        strokeWidth="1"
        className="animate-pulse"
      />
      {/* Side flames */}
      <path d="M 22,50 C 22,45 26,45 26,50 C 26,53 22,53 22,50 Z" fill="#C9A227" strokeWidth="0.75" />
      <path d="M 74,50 C 74,45 78,45 78,50 C 78,53 74,53 74,50 Z" fill="#C9A227" strokeWidth="0.75" />

      {/* Annapakshi/Crown (Ornamental Bird / Loop at the top) */}
      <path d="M 50,46 V 25" />
      <path d="M 44,25 C 44,15 56,15 56,25 C 56,30 44,30 44,25 Z" fill="#C9A227" fillOpacity="0.15" />
      <path d="M 47,20 Q 50,14 53,20" />
    </svg>
  );
}

// ── 4. Elegant Horizontal Auspicious Divider ──
export function AuspiciousDivider({ className = "my-6", width = "w-64" }) {
  return (
    <div className={`flex items-center justify-center gap-3.5 ${width} mx-auto ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A227]/40" />
      <span className="text-[#C9A227] text-[11px] select-none tracking-widest flex items-center gap-1.5">
        ✦ <span className="text-[14px] leading-none">🕭</span> ✦
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A227]/40" />
    </div>
  );
}

// ── 5. Auspicious Kalash (Coconut & Mango Leaves) SVG Icon ──
export function KalashAuspicious({ className = "w-6 h-6", color = "#C9A227" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Mango Leaves */}
      <path d="M 35,45 C 28,32 38,20 42,28 C 44,32 40,40 40,45 Z" fill={color} fillOpacity="0.1" />
      <path d="M 65,45 C 72,32 62,20 58,28 C 56,32 60,40 60,45 Z" fill={color} fillOpacity="0.1" />
      <path d="M 50,45 C 50,22 45,15 50,5 C 55,15 50,22 50,45 Z" fill={color} fillOpacity="0.2" />

      {/* Coconut */}
      <path d="M 38,45 C 38,32 50,25 50,25 C 50,25 62,32 62,45 Z" fill={color} fillOpacity="0.25" />

      {/* Pot (Lota) */}
      <path d="M 35,45 H 65 L 68,52 C 76,60 76,82 66,92 C 58,97 42,97 34,92 C 24,82 24,60 32,52 Z" fill={color} fillOpacity="0.05" />
      
      {/* Pot Neck Rings */}
      <path d="M 32,48 H 68" />
      <path d="M 35,53 H 65" />
      
      {/* Swastika / Auspicious sign on the Pot */}
      <path d="M 44,65 H 56 M 50,59 V 71 M 44,59 V 65 M 56,65 V 71 M 50,59 H 56 M 44,71 H 50" strokeWidth="1.5" />
    </svg>
  );
}

// ── 6. Sacred Fire Homam SVG Icon ──
export function SacredFireHomam({ className = "w-6 h-6", color = "#C9A227" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Altar base layers */}
      <path d="M 12,85 L 88,85 L 80,95 L 20,95 Z" fill={color} fillOpacity="0.2" />
      <path d="M 18,72 L 82,72 L 86,85 L 14,85 Z" fill={color} fillOpacity="0.1" />
      <path d="M 25,58 L 75,58 L 78,72 L 22,72 Z" />
      
      {/* Fire logs */}
      <path d="M 32,58 L 68,50" />
      <path d="M 68,58 L 32,50" />
      
      {/* Flames */}
      <path d="M 50,10 C 50,10 65,30 58,48 C 50,58 40,45 50,10 Z" fill={color} fillOpacity="0.3" />
      <path d="M 40,25 C 40,25 50,38 46,50 C 42,55 35,48 40,25 Z" fill={color} fillOpacity="0.25" />
      <path d="M 60,25 C 60,25 50,38 54,50 C 58,55 65,48 60,25 Z" fill={color} fillOpacity="0.25" />
    </svg>
  );
}

// ── 7. Overlapping Bangles (Valagapu) SVG Icon ──
export function BangleValagapu({ className = "w-6 h-6", color = "#C9A227" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      {/* Three overlapping glass bangles */}
      <circle cx="36" cy="50" r="22" fill={color} fillOpacity="0.05" />
      <circle cx="50" cy="50" r="22" fill={color} fillOpacity="0.05" />
      <circle cx="64" cy="50" r="22" fill={color} fillOpacity="0.05" />
      
      {/* Bangle decorative dots */}
      <circle cx="36" cy="28" r="1.5" fill={color} />
      <circle cx="36" cy="72" r="1.5" fill={color} />
      <circle cx="50" cy="28" r="1.5" fill={color} />
      <circle cx="50" cy="72" r="1.5" fill={color} />
      <circle cx="64" cy="28" r="1.5" fill={color} />
      <circle cx="64" cy="72" r="1.5" fill={color} />
    </svg>
  );
}

// ── 8. Illustrated Brass Diya (Oil Lamp) with Radial Glow ──
export function BrassDiya({ className = "", size = 45, opacity = 1 }) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size, opacity }}>
      {/* Soft radial golden lighting halo */}
      <div className="absolute inset-[-50%] bg-[#C9A227]/10 rounded-full blur-md pointer-events-none animate-pulse" />
      
      <svg viewBox="0 0 45 45" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {/* Diya body (Warm brass) */}
        <path d="M 5,26 C 5,34 14,39 22.5,39 C 31,39 40,34 40,26 C 40,20 33,20 22.5,20 C 12,20 5,20 5,26 Z" fill="#B8922E" stroke="#C9A227" strokeWidth="1" />
        {/* Inner oil pool */}
        <path d="M 8,25 C 8,31 15,35 22.5,35 C 30,35 37,31 37,25 C 37,23 22.5,22 22.5,22 C 22.5,22 8,23 8,25 Z" fill="#6D071A" />
        
        {/* Pedestal small base */}
        <path d="M 18,39 L 27,39 L 29,42 L 16,42 Z" fill="#8B1025" stroke="#C9A227" strokeWidth="0.75" />

        {/* Wick flame (pulsing) */}
        <g className="animate-pulse origin-bottom" style={{ transformOrigin: '22.5px 20px' }}>
          {/* Outer flame */}
          <path d="M 22.5,4 C 22.5,4 17,13 17,17 C 17,21 28,21 28,17 C 28,13 22.5,4 22.5,4 Z" fill="#E5C158" opacity="0.9" />
          {/* Inner fire core */}
          <path d="M 22.5,8 C 22.5,8 19.5,14 19.5,17 C 19.5,19.5 25.5,19.5 25.5,17 C 25.5,14 22.5,8 22.5,8 Z" fill="#8B1025" />
        </g>
      </svg>
    </div>
  );
}

// ── 9. Repeating Tamil Temple Architectural Border (Gopurappadi) ──
export function TempleBorderLine({ className = "", color = "#C9A227", opacity = 0.15 }) {
  return (
    <svg className={className} width="100%" height="16" style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="templeStep" width="30" height="16" patternUnits="userSpaceOnUse">
          {/* Traditional step-motif: gopurappadi */}
          <path d="M 0,16 H 30 M 0,16 L 6,10 H 12 L 15,4 L 18,10 H 24 L 30,16" fill="none" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <circle cx="15" cy="2" r="1" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill="url(#templeStep)" />
    </svg>
  );
}

// ── 10. Gold Ornamental Corner Bracket ──
export function AuspiciousCorner({ className = "", size = 30, color = "#C9A227" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" className={className} fill="none" stroke={color} strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M 2,28 V 2 H 28" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 6,24 V 6 H 24" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <circle cx="2" cy="2" r="1.5" fill={color} />
    </svg>
  );
}

// ── 11. Detailed Horizontal Gold Temple Border Filigree ──
export function TempleBorderGold({ className = "", opacity = 0.85 }) {
  return (
    <svg className={className} width="100%" height="24" style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="templeGoldPattern" width="60" height="24" patternUnits="userSpaceOnUse">
          {/* Detailed Tamil gold border filigree */}
          <path d="M 0,12 H 60 M 0,2 H 60 M 0,22 H 60" stroke="#C9A227" strokeWidth="1" fill="none" />
          <path d="M 15,2 Q 20,12 15,22 Q 10,12 15,2" fill="none" stroke="#B8922E" strokeWidth="0.75" />
          <path d="M 45,2 Q 50,12 45,22 Q 40,12 45,2" fill="none" stroke="#B8922E" strokeWidth="0.75" />
          <circle cx="30" cy="12" r="3" fill="#C9A227" fillOpacity="0.5" stroke="#B8922E" strokeWidth="0.75" />
          <path d="M 27,12 L 33,12 M 30,9 L 30,15" stroke="#FAF6ED" strokeWidth="0.5" />
          <path d="M 5,6 L 10,12 L 5,18" stroke="#B8922E" strokeWidth="0.75" fill="none" />
          <path d="M 25,6 L 20,12 L 25,18" stroke="#B8922E" strokeWidth="0.75" fill="none" />
          <path d="M 35,6 L 40,12 L 35,18" stroke="#B8922E" strokeWidth="0.75" fill="none" />
          <path d="M 55,6 L 50,12 L 55,18" stroke="#B8922E" strokeWidth="0.75" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill="url(#templeGoldPattern)" />
    </svg>
  );
}

// ── 12. Vinayagar (Lord Ganesha) Subtle Line-Art Watermark ──
export function VinayagarWatermark({ className = "", size = 180, opacity = 0.08 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ opacity }} fill="none" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      {/* Head & Crown (Kireetam) */}
      <path d="M 40,25 C 40,10 60,10 60,25 Z M 44,15 H 56 M 47,10 H 53 M 50,5 V 25" />
      {/* Ears */}
      <path d="M 38,28 C 30,28 32,45 38,40 M 62,28 C 70,28 68,45 62,40" />
      {/* Face outline / Trunk */}
      <path d="M 44,28 C 44,35 46,42 46,48 C 46,55 38,62 38,66 C 38,68 40,70 43,70 C 47,70 52,65 52,58 C 52,50 56,38 56,28" />
      {/* Tusk */}
      <path d="M 40,41 H 44 M 58,41 H 55" />
      {/* Modak (sweet) in trunk area */}
      <path d="M 36,66 C 36,63 40,63 40,66 Z" fill="#C9A227" fillOpacity="0.2" />
      {/* Tilak on forehead */}
      <path d="M 50,22 V 32 M 48,25 H 52 M 47,28 H 53" strokeWidth="1.5" />
      {/* Body/Belly outline */}
      <path d="M 38,40 C 25,50 30,85 50,85 C 70,85 75,50 62,40" />
      {/* Sacred thread (Janeu) */}
      <path d="M 36,45 L 62,75" strokeDasharray="3,3" />
    </svg>
  );
}

// ── 13. Murugan Subtle Line-Art Watermark ──
export function MuruganWatermark({ className = "", size = 180, opacity = 0.08 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ opacity }} fill="none" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      {/* Vel (Spear) staff */}
      <line x1="50" y1="95" x2="50" y2="10" strokeWidth="1.5" />
      {/* Vel Blade */}
      <path d="M 50,10 C 35,25 44,55 50,55 C 56,55 65,25 50,10 Z" fill="#C9A227" fillOpacity="0.05" />
      {/* Inner details of Vel */}
      <path d="M 50,10 V 55" />
      <circle cx="50" cy="30" r="3" />
      <path d="M 45,30 H 55" />
      {/* Three lines of Vibhuti on Vel */}
      <path d="M 46,24 H 54 M 45,26 H 55 M 46,28 H 54" strokeWidth="1" />
      {/* Peacock Feathers silhouette in backdrop */}
      <path d="M 50,55 C 38,60 20,70 20,80 C 20,90 35,95 50,95 C 65,95 80,90 80,80 C 80,70 62,60 50,55 Z" strokeDasharray="2,2" />
      <circle cx="35" cy="78" r="4" />
      <circle cx="65" cy="78" r="4" />
      <circle cx="50" cy="84" r="5" />
    </svg>
  );
}

// ── 14. Aiyanar (Guardian Horse & Sword) Subtle Line-Art Watermark ──
export function AiyanarWatermark({ className = "", size = 180, opacity = 0.08 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ opacity }} fill="none" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      {/* Guardian Horse silhouette */}
      <path d="M 20,85 C 20,85 22,50 35,45 C 42,42 45,35 48,20 C 50,22 55,25 58,22 C 60,18 58,10 65,12 C 72,14 70,25 64,32 C 58,38 58,50 62,60 L 68,85" />
      <path d="M 35,45 C 45,45 60,52 62,60" />
      {/* Legs */}
      <path d="M 24,85 V 95 M 32,85 V 93 M 60,85 V 95 M 66,85 V 93" strokeWidth="1.5" />
      {/* Guardian Sword (Aruval) next to horse */}
      <path d="M 80,90 L 80,35 C 80,35 83,20 90,30 C 92,32 87,38 87,42 L 85,90 Z" fill="#C9A227" fillOpacity="0.1" />
      <circle cx="80" cy="90" r="2.5" fill="#C9A227" />
    </svg>
  );
}

// ── 15. Karuppasamy (Sword & Shield) Subtle Line-Art Watermark ──
export function KaruppasamyWatermark({ className = "", size = 180, opacity = 0.08 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ opacity }} fill="none" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      {/* Guardian Sword (Aruval) */}
      <path d="M 42,85 V 20 C 42,20 46,5 58,15 C 61,18 53,24 53,28 V 85 Z" fill="#C9A227" fillOpacity="0.1" strokeWidth="1.5" />
      <circle cx="42" cy="85" r="3" fill="#C9A227" />
      
      {/* Shield in background */}
      <circle cx="58" cy="55" r="14" strokeWidth="1.2" strokeDasharray="3,3" />
      <path d="M 48,55 H 68 M 58,45 V 65" />
      
      {/* Traditional stars / guard dots */}
      <circle cx="25" cy="30" r="1" fill="#C9A227" />
      <circle cx="75" cy="30" r="1" fill="#C9A227" />
      <circle cx="25" cy="70" r="1" fill="#C9A227" />
      <circle cx="75" cy="70" r="1" fill="#C9A227" />
    </svg>
  );
}

// ── 16. Four Deities Corner Watermarks wrapper ──
export function FourDeitiesCorners({ className = "absolute inset-0 pointer-events-none", layout = "default" }) {
  const commonClass = "absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 opacity-[0.11] sm:opacity-[0.14] transition-all duration-300 pointer-events-none z-0";
  
  if (layout === "shifted") {
    return (
      <div className={`${className}`}>
        <MuruganWatermark className={`${commonClass} top-4 left-4`} />
        <VinayagarWatermark className={`${commonClass} top-4 right-4`} />
        <KaruppasamyWatermark className={`${commonClass} bottom-4 left-4`} />
        <AiyanarWatermark className={`${commonClass} bottom-4 right-4`} />
      </div>
    );
  }
  
  if (layout === "rotated") {
    return (
      <div className={`${className}`}>
        <KaruppasamyWatermark className={`${commonClass} top-4 left-4`} />
        <AiyanarWatermark className={`${commonClass} top-4 right-4`} />
        <VinayagarWatermark className={`${commonClass} bottom-4 left-4`} />
        <MuruganWatermark className={`${commonClass} bottom-4 right-4`} />
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <VinayagarWatermark className={`${commonClass} top-4 left-4`} />
      <MuruganWatermark className={`${commonClass} top-4 right-4`} />
      <AiyanarWatermark className={`${commonClass} bottom-4 left-4`} />
      <KaruppasamyWatermark className={`${commonClass} bottom-4 right-4`} />
    </div>
  );
}

// ── 17. Symmetrical deity transitional section band ──
export function DeityTransitionSection() {
  return (
    <section className="bg-[#FFF8E7] py-12 relative overflow-hidden border-t border-b border-[#C9A227]/30 flex flex-col items-center justify-center">
      {/* Symmetrical Top/Bottom Gold borders */}
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.8} />
      <TempleBorderGold className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.8} />
      
      <div className="max-w-4xl mx-auto px-4 flex flex-row items-center justify-center gap-12 sm:gap-24 relative z-10 py-2 opacity-[0.14] hover:opacity-[0.25] transition-opacity duration-300">
        <div className="flex flex-col items-center">
          <VinayagarWatermark size={60} opacity={1} />
          <span className="text-[9px] text-[#B8922E] tracking-[0.2em] font-bold uppercase mt-1">Vinayagar</span>
        </div>
        <div className="flex flex-col items-center">
          <MuruganWatermark size={60} opacity={1} />
          <span className="text-[9px] text-[#B8922E] tracking-[0.2em] font-bold uppercase mt-1">Murugan</span>
        </div>
        <div className="flex flex-col items-center">
          <AiyanarWatermark size={60} opacity={1} />
          <span className="text-[9px] text-[#B8922E] tracking-[0.2em] font-bold uppercase mt-1">Aiyanar</span>
        </div>
        <div className="flex flex-col items-center">
          <KaruppasamyWatermark size={60} opacity={1} />
          <span className="text-[9px] text-[#B8922E] tracking-[0.2em] font-bold uppercase mt-1">Karuppasamy</span>
        </div>
      </div>
    </section>
  );
}
