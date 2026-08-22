// ============================================
// MenuBook — Premium Redesigned Virtual Restaurant Menu Book
// Premium Luxury Overhaul with Traditional Tamil Accents, Deity Watermarks & Corners
// ============================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, UtensilsCrossed, IndianRupee, Star, Award } from 'lucide-react';
import { breakfastItems, dosaItems, lunchItems, dinnerItems } from '../data/menuData';
import { GopuramSilhouette, KolamPattern, AuspiciousDivider, BrassDiya, AuspiciousCorner, TempleBorderGold, FourDeitiesCorners } from '../navbar/Decorations';

/* ── tag styles ── */
const tagPalette = {
  Popular:       { bg: 'bg-[#B8922E]',  text: 'text-[#FAF6ED]' },
  Bestseller:    { bg: 'bg-[#B8922E]',  text: 'text-[#FAF6ED]' },
  Premium:       { bg: 'bg-[#C9A227]',   text: 'text-[#6D071A]' },
  'Must Try':    { bg: 'bg-[#8B1025]',     text: 'text-[#FAF6ED]' },
  Sweet:         { bg: 'bg-pink-850/80',    text: 'text-[#FAF6ED]' },
  'Full Meal':   { bg: 'bg-emerald-850/80', text: 'text-[#FAF6ED]' },
  Value:         { bg: 'bg-teal-850/80',    text: 'text-[#FAF6ED]' },
  Combo:         { bg: 'bg-violet-850/80',  text: 'text-[#FAF6ED]' },
  'Chef Special':{ bg: 'bg-[#8B1025]',    text: 'text-[#FAF6ED]' },
};

/* ── page definitions ── */
const pages = [
  { id: 'cover', type: 'cover' },
  {
    id: 'breakfast', type: 'menu', category: 'Breakfast', icon: '🌅',
    time: '6 AM – 11 AM', tagline: 'Start your day the South Indian way',
    items: breakfastItems, pageNum: 1,
  },
  {
    id: 'dosa', type: 'menu', category: 'Dosa Varieties', icon: '🥞',
    time: '6 AM – 11 AM & 6 PM – 10 PM', tagline: 'Crispy, hot, and traditional South Indian crepes',
    items: dosaItems, pageNum: 2,
  },
  {
    id: 'lunch', type: 'menu', category: 'Lunch', icon: '☀️',
    time: '11 AM – 4 PM', tagline: 'Wholesome meals, always made fresh',
    items: lunchItems, pageNum: 3,
  },
  {
    id: 'dinner', type: 'menu', category: 'Dinner', icon: '🌙',
    time: '6 PM – 10 PM', tagline: 'Evening comfort food done right',
    items: dinnerItems, pageNum: 4,
  },
  { id: 'closing', type: 'closing' },
];

/* ── flip animation ── */
const flipVariants = {
  enterRight: { x: 100, opacity: 0, rotateY: -15, scale: 0.95 },
  enterLeft:  { x: -100, opacity: 0, rotateY: 15,  scale: 0.95 },
  center: {
    x: 0, opacity: 1, rotateY: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exitLeft:  { x: -100, opacity: 0, rotateY: 15,  scale: 0.95, transition: { duration: 0.35, ease: 'easeIn' } },
  exitRight: { x: 100,  opacity: 0, rotateY: -15, scale: 0.95, transition: { duration: 0.35, ease: 'easeIn' } },
};

/* ── Paper texture overlay ── */
const PAPER_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

/* ── Decorative corner SVG ── */
function Corner({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 text-[#C9A227]/40 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 2 L14 2 M2 2 L2 14" strokeLinecap="round"/>
      <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
    </svg>
  );
}

/* ── Fleur-de-lis divider ── */
function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A227]/40" />
      <span className="text-[#C9A227]/60 text-xs">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A227]/40" />
    </div>
  );
}

/* ── Redesigned Spacious Food Item Card ── */
function BookMenuItem({ item, index }) {
  const [imgErr, setImgErr] = useState(false);
  const isChef = item.tag === 'Premium' || item.tag === 'Chef Special';
  const isPopular = item.tag === 'Popular' || item.tag === 'Bestseller' || item.tag === 'Must Try';
  const tagInfo   = item.tag ? tagPalette[item.tag] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#B8922E]/25 bg-white shadow-sm hover:shadow-md hover:border-[#C9A227]/40 transition-all duration-300 relative z-10"
    >
      {/* Food Image */}
      <div className="relative h-32 sm:h-36 overflow-hidden bg-[#4A0612] flex-shrink-0">
        {!imgErr ? (
          <img
            src={item.photo}
            alt={item.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🍽️</div>
        )}
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Ribbons / Badges */}
        {isChef && (
          <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-0.5 bg-[#8B1025] text-[#FAF6ED] text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md border border-[#C9A227]/20">
            <Award size={8} className="text-[#C9A227]" />Chef Special
          </span>
        )}
        {isPopular && !isChef && (
          <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-0.5 bg-[#B8922E] text-[#FAF6ED] text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md">
            <Star size={8} className="fill-[#FAF6ED] text-[#FAF6ED]" />Popular
          </span>
        )}
        {tagInfo && !isChef && !isPopular && (
          <span className={`absolute top-2 right-2 z-10 ${tagInfo.bg} ${tagInfo.text} text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md`}>
            {item.tag}
          </span>
        )}
      </div>

      {/* Item info block */}
      <div className="p-4 flex flex-col justify-between flex-1 min-h-[90px] border-t border-[#B8922E]/10 bg-white">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <span className="font-extrabold text-[#6D071A] text-[13.5px] sm:text-[14.5px] leading-snug font-display">
            {item.name}
          </span>
          <span className="font-black text-sm sm:text-base text-[#B8922E] flex items-center flex-shrink-0">
            <IndianRupee size={12} className="stroke-[2.5]" />
            {item.price}
          </span>
        </div>
        <p className="text-[11px] sm:text-[12px] text-[#6D071A]/70 leading-relaxed font-light line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Premium Cover Page (Deep Burgundy Cover with Gopuram Silhouette & Brass Diyas) ── */
function CoverPage({ onOpenMenu }) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden select-none bg-gradient-to-br from-[#6D071A] via-[#4A0612] to-[#2A030A] p-8 text-center"
      style={PAPER_STYLE}>

      {/* Subtle food background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
          alt="South Indian food cover"
          className="w-full h-full object-cover opacity-15 mix-blend-overlay"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6D071A]/80 via-[#4A0612]/50 to-[#2A030A]/90" />
      </div>

      {/* Centered Gopuram silhouette underlay */}
      <GopuramSilhouette className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-0" size={240} opacity={0.06} />

      {/* Flanking Brass Diyas near cover bottom ledge */}
      <BrassDiya className="absolute bottom-6 left-10 pointer-events-none z-10" size={32} opacity={0.65} />
      <BrassDiya className="absolute bottom-6 right-10 pointer-events-none z-10 scale-x-[-1]" size={32} opacity={0.65} />

      {/* Decorative corners */}
      <Corner className="absolute top-4 left-4" />
      <Corner className="absolute top-4 right-4 rotate-90" />
      <Corner className="absolute bottom-4 left-4 -rotate-90" />
      <Corner className="absolute bottom-4 right-4 rotate-180" />

      {/* Gold border */}
      <div className="absolute inset-4 border-2 border-[#C9A227]/30 rounded-xl pointer-events-none" />
      <div className="absolute inset-5.5 border border-[#C9A227]/10 rounded-lg pointer-events-none" />

      {/* Corner brackets */}
      <AuspiciousCorner className="absolute top-6 left-6 pointer-events-none" size={24} />
      <AuspiciousCorner className="absolute top-6 right-6 rotate-90 pointer-events-none" size={24} />
      <AuspiciousCorner className="absolute bottom-6 left-6 -rotate-90 pointer-events-none" size={24} />
      <AuspiciousCorner className="absolute bottom-6 right-6 rotate-180 pointer-events-none" size={24} />

      {/* Content */}
      <div className="relative z-10 max-w-sm mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1025] to-[#6D071A] flex items-center justify-center shadow-xl border border-[#C9A227]/40 mx-auto animate-floatUp">
          <UtensilsCrossed size={28} className="text-[#FAF6ED]" />
        </div>

        <div>
          <span className="text-[#C9A227] text-xs font-bold tracking-[0.4em] uppercase">Swamy's</span>
          <h1 className="text-[#FAF6ED] font-black text-4xl sm:text-5xl mt-1 tracking-wider leading-none font-display">
            MESS &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#B8922E]">
              CATERING
            </span>
          </h1>
          <p className="text-[#FAF6ED]/85 text-xs sm:text-sm mt-3 tracking-[0.18em] font-medium uppercase font-sans">
            Authentic South Indian Food & Catering
          </p>
        </div>

        <GoldDivider className="w-36 mx-auto" />

        <button
          onClick={onOpenMenu}
          className="px-8 py-3.5 bg-gradient-to-r from-[#8B1025] to-[#6D071A] hover:opacity-95 text-[#FAF6ED] font-bold text-sm tracking-widest rounded-xl transition-all shadow-lg border border-[#C9A227]/30 flex items-center gap-2 mx-auto uppercase"
        >
          Open Menu
          <ChevronRight size={14} className="text-[#C9A227]" />
        </button>
      </div>
    </div>
  );
}

/* ── Premium Closing Page ── */
function ClosingPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden select-none bg-gradient-to-br from-[#6D071A] via-[#4A0612] to-[#2A030A] p-8 text-center"
      style={PAPER_STYLE}>

      {/* Subtle food background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80"
          alt="Thank you food backdrop"
          className="w-full h-full object-cover opacity-15 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#6D071A]/80 via-[#4A0612]/50 to-[#2A030A]/90" />
      </div>

      {/* Decorative corners */}
      <Corner className="absolute top-4 left-4" />
      <Corner className="absolute top-4 right-4 rotate-90" />
      <Corner className="absolute bottom-4 left-4 -rotate-90" />
      <Corner className="absolute bottom-4 right-4 rotate-180" />

      {/* Gold border */}
      <div className="absolute inset-4 border-2 border-[#C9A227]/30 rounded-xl pointer-events-none" />

      <div className="relative z-10 max-w-sm mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1025] to-[#6D071A] flex items-center justify-center shadow-xl border border-[#C9A227]/40 mx-auto">
          <UtensilsCrossed size={28} className="text-[#FAF6ED]" />
        </div>

        <h2 className="text-[#FAF6ED] font-extrabold leading-tight text-3xl font-display">
          Thank You
        </h2>

        <GoldDivider className="w-36 mx-auto" />

        <p className="text-[#C9A227] text-2xl font-bold tracking-wide leading-relaxed font-display">
          நன்றி! மீண்டும் வருக!
        </p>

        <GoldDivider className="w-36 mx-auto" />

        <div>
          <p className="text-[#FAF6ED]/60 text-xs tracking-wider uppercase font-light font-sans">
            Swamy's Mess & Catering
          </p>
          <p className="text-[#C9A227]/60 text-[9px] mt-1 tracking-widest uppercase font-semibold">
            Velachery, Chennai
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Spacious Menu Category Content Page (Warm Ivory Sheet with Kolam, Borders & Watermark) ── */
function MenuPageContent({ page }) {
  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-[#FAF6ED] p-4 sm:p-6"
      style={PAPER_STYLE}>
      
      {/* Kolam pattern in background sheet */}
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.015} />

      {/* Traditional Four Deities Corners Layout Watermark (Rotated variant) */}
      <FourDeitiesCorners layout="rotated" className="absolute inset-0 pointer-events-none p-4" />

      {/* Ivory paper sheet card containing list & headers */}
      <div className="flex-1 rounded-2xl bg-[#FFF8E7] border border-[#C9A227]/35 p-4 sm:p-6 flex flex-col overflow-hidden shadow-md relative z-10">
        {/* Top Gold Temple Border inside card */}
        <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.75} />
        
        {/* Soft yellow glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

        {/* ── Category Header block (Minimal and elegant with gold line, diyas & divider) ── */}
        <div className="text-center py-2 px-4 mb-3 sm:mb-4 flex-shrink-0 mt-3 relative z-10">
          <span className="block text-[#B8922E]/70 text-[9.5px] font-bold tracking-[0.3em] uppercase mb-0.5 font-sans">Category</span>
          <h3 className="text-[#6D071A] font-black text-lg sm:text-xl tracking-[0.18em] uppercase font-display inline-flex items-center justify-center gap-2.5 relative px-2">
            <BrassDiya size={16} opacity={0.8} />
            {page.category}
            <BrassDiya size={16} opacity={0.8} className="scale-x-[-1]" />
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A227]" />
          </h3>
          <AuspiciousDivider className="my-1.5" width="w-48" />
        </div>

        {/* ── Scrollable list of spacious cards ── */}
        <div className="flex-1 overflow-y-auto px-1 py-1 custom-scrollbar relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
            {page.items.map((item, idx) => (
              <BookMenuItem key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>

        {/* Page footer details */}
        <div className="flex-shrink-0 border-t border-[#B8922E]/15 pt-3 mt-3 flex items-center justify-between text-[#6D071A] relative z-10">
          <div className="flex items-center gap-1.5">
            <UtensilsCrossed size={12} className="text-[#B8922E]" />
            <span className="text-[10px] italic font-semibold font-display">Swamy's Mess</span>
          </div>
          <span className="text-[9px] tracking-wider uppercase font-bold text-[#B8922E] bg-[#FAF6ED] px-2 py-0.5 rounded-full border border-[#C9A227]/25 font-sans">
            {page.items.length} items
          </span>
        </div>

        {/* Bottom Gold Temple Border inside card */}
        <TempleBorderGold className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.75} />
      </div>
    </div>
  );
}

/* ── Main MenuBook Modal ── */
export default function MenuBook({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction,   setDirection]   = useState(1);

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) { setDirection(1); setCurrentPage(p => p + 1); }
  }, [currentPage]);
  const goPrev = useCallback(() => {
    if (currentPage > 0) { setDirection(-1); setCurrentPage(p => p - 1); }
  }, [currentPage]);

  /* Keyboard nav */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, currentPage, goNext, goPrev, onClose]);

  /* Reset on open, lock scroll */
  useEffect(() => { if (isOpen) setCurrentPage(0); }, [isOpen]);
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  const page = pages[currentPage];
  const pageTopOffset = page.type === 'menu' ? 'top-[78px] sm:top-[86px]' : 'top-4';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md"
            onClick={onClose} />

          {/* Book modal wrapper */}
          <motion.div key="bk"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-none">

            <div className="relative w-full max-w-4xl pointer-events-auto"
              style={{ height: 'min(760px, 86vh)' }}
              onClick={e => e.stopPropagation()}>

              {/* ── Book drop shadow ── */}
              <div className="absolute -bottom-4 left-8 right-8 h-8 bg-black/40 blur-2xl rounded-full" />
              <div className="absolute -bottom-1 left-4 right-4 h-4 bg-black/25 blur-lg rounded-full" />

              {/* ── Hardcover outer shell (Deep Burgundy) ── */}
              <div className="absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-br from-[#6D071A] via-[#4A0612] to-[#2A030A] border border-[#C9A227]/30" />

              {/* Spine binder lines */}
              <div className="absolute left-0 top-2 bottom-2 w-4 rounded-l-xl z-20 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-[#4A0612] via-[#2A030A] to-[#1E0207]" />
                {[20, 35, 50, 65, 80].map(pct => (
                  <div key={pct} className="absolute left-0 right-0 h-px bg-black/40" style={{ top: `${pct}%` }} />
                ))}
              </div>

              {/* ── Sticky Header for Menu Pages (Deep Burgundy gradient with Gold highlight) ── */}
              {page.type === 'menu' && (
                <div className="absolute top-4 left-4 right-4 z-20 bg-gradient-to-r from-[#6D071A] via-[#4A0612] to-[#6D071A] px-6 py-3.5 rounded-t-2xl shadow-lg border border-[#C9A227]/35 flex-shrink-0">
                  <div className="text-center">
                    <span className="text-[#C9A227] font-bold text-[9px] tracking-[0.35em] uppercase font-sans">Est. 2008 · Chennai</span>
                    <h1 className="text-[#FAF6ED] font-black text-sm sm:text-base tracking-wider font-display">
                      Swamy's Mess & Catering
                    </h1>
                  </div>
                </div>
              )}

              {/* ── Page area container ── */}
              <div className={`absolute left-4 right-4 ${pageTopOffset} bottom-4 rounded-b-xl overflow-hidden`}
                style={{ perspective: '1200px' }}>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div key={page.id} custom={direction}
                    variants={flipVariants}
                    initial={direction > 0 ? 'enterRight' : 'enterLeft'}
                    animate="center"
                    exit={direction > 0 ? 'exitLeft' : 'exitRight'}
                    className="absolute inset-0"
                    style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}>
                    {page.type === 'cover'
                      ? <CoverPage onOpenMenu={() => { setDirection(1); setCurrentPage(1); }} />
                      : page.type === 'closing'
                        ? <ClosingPage />
                        : <MenuPageContent page={page} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Close button (White icon, Gold hover) ── */}
              <button onClick={onClose}
                className="absolute -top-3.5 -right-3.5 z-30 w-9 h-9 bg-[#6D071A] border border-[#C9A227]/30 rounded-full flex items-center justify-center text-[#FAF6ED] hover:text-[#C9A227] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                aria-label="Close">
                <X size={16} />
              </button>

              {/* ── Prev / Next arrows ── */}
              <button onClick={goPrev} disabled={currentPage === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 w-11 h-11 bg-[#6D071A] border border-[#C9A227]/30 rounded-full flex items-center justify-center text-[#FAF6ED] hover:text-[#C9A227] disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl"
                aria-label="Previous page">
                <ChevronLeft size={20} />
              </button>
              <button onClick={goNext} disabled={currentPage === pages.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 w-11 h-11 bg-[#6D071A] border border-[#C9A227]/30 rounded-full flex items-center justify-center text-[#FAF6ED] hover:text-[#C9A227] disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl"
                aria-label="Next page">
                <ChevronRight size={20} />
              </button>

              {/* ── Page fraction indicator (X / Y) ── */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[#FAF6ED] font-bold text-[11px] bg-[#6D071A] border border-[#C9A227]/25 px-4 py-1.5 rounded-full shadow-md tracking-[0.25em]">
                {currentPage + 1} / {pages.length}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
