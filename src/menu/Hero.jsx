// ============================================
// Hero — Carousel background + Virtual Menu Book trigger
// Premium Luxury Overhaul with Devotional Tamil Gopuram & Diyas
// ============================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Star, Clock, Award, BookOpen } from 'lucide-react';
import MenuBook from './MenuBook';
import { GopuramSilhouette, BrassDiya, TempleBorderLine, VinayagarWatermark } from '../navbar/Decorations';

/* ── Carousel slides ── */
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1920&q=80',
    label: 'Masala Dosa',
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1920&q=80',
    label: 'Idly & Sambar',
  },
  {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1920&q=80',
    label: 'South Indian Meals',
  },
  {
    url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=1920&q=80',
    label: 'Dosa Varieties',
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80',
    label: 'Filter Coffee',
  },
  {
    url: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1920&q=80',
    label: 'Poori Masala',
  },
  {
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80',
    label: 'Veg Thali',
  },
];

const INTERVAL = 4000;

export default function Hero({ onBookCatering, cats }) {
  const [current, setCurrent]   = useState(0);
  const [paused, setPaused]     = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const timerRef = useRef(null);

  /* auto-advance */
  useEffect(() => {
    if (paused || bookOpen) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, bookOpen]);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Background carousel ─────────────────── */}
        <div className="absolute inset-0 z-0 bg-[#4A0612]">
          <AnimatePresence mode="sync">
            {slides.map((slide, idx) =>
              idx === current ? (
                <motion.div
                  key={slide.url}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ opacity: { duration: 1.2 }, scale: { duration: INTERVAL / 1000 + 1.2, ease: 'linear' } }}
                >
                  <img
                    src={slide.url}
                    alt={slide.label}
                    className="w-full h-full object-cover scale-110 blur-[2px]"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* Glass backdrop card wrapping the carousel — exact full coverage */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] z-[1]" />

          {/* Luxury Burgundy gradients & soft warm golden glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A0612]/92 via-black/55 to-[#1E0207]/95 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/35 via-transparent to-[#1E0207]/30 z-10" />

          {/* Centered gold spotlight glow behind text container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A227]/7 rounded-full blur-3xl pointer-events-none z-10" />

          {/* Centered gopuram silhouette in background */}
          <GopuramSilhouette className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-10" size={320} opacity={0.06} />

          {/* Flanking Brass Diyas (Oil lamps) near bottom edges */}
          <BrassDiya className="absolute bottom-14 left-8 pointer-events-none hidden md:block z-10" size={42} opacity={0.15} />
          <BrassDiya className="absolute bottom-14 right-8 pointer-events-none hidden md:block z-10 scale-x-[-1]" size={42} opacity={0.15} />

          {/* Bottom Temple Border Line */}
          <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10" opacity={0.25} />
        </div>

        {/* ── Slide label ── */}
        <div className="absolute bottom-24 right-6 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-[#C9A227]/20 px-3.5 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              <span className="text-[#FAF6ED]/70 text-[10px] tracking-wider uppercase font-semibold">{slides[current].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Main content ────────────────────────── */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Subtle Lord Ganesha / Vinayagar watermark behind the text */}
          <VinayagarWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" size={320} opacity={0.05} />

          {/* Est. badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6D071A]/60 border border-[#C9A227]/40 backdrop-blur-md mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            <span className="text-[#FAF6ED] text-xs font-semibold tracking-widest uppercase">
              Est. 2008 · Chennai
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative z-10 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight font-display"
          >
            <span className="text-[#FAF6ED] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Swamy's
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF6ED] via-[#F5E9C8] to-[#E8D9B0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              Mess & Catering
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative z-10 text-lg sm:text-xl lg:text-2xl text-[#FAF6ED]/95 font-light mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          >
            Authentic South Indian Food • Daily Meals • Complete Catering Solutions
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA — opens the menu book */}
            <motion.button
              onClick={() => setBookOpen(true)}
              whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(109,7,26,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-[#FAF6ED] font-bold text-base rounded-2xl shadow-xl overflow-hidden min-w-[200px] flex items-center justify-center gap-2.5 border border-[#C9A227]/30"
            >
              <BookOpen size={18} className="text-[#C9A227]" />
              <span>View Menu</span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={onBookCatering}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-[#FAF6ED]/25 text-[#FAF6ED] font-bold text-base rounded-2xl hover:bg-white/10 transition-all duration-200 min-w-[200px]"
            >
              Book Catering
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="relative z-10 mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 px-6 py-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/[0.08] shadow-xl"
          >
            {[
              { icon: Star, value: '4.9★', label: 'Verified Rating' },
              { icon: Clock, value: '18+ Years', label: 'Serving Tradition' },
              { icon: Award, value: '1000+', label: 'Events Catered' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 text-[#FAF6ED]/80 px-2">
                <div className="w-10 h-10 rounded-xl bg-[#6D071A]/60 border border-[#C9A227]/35 flex items-center justify-center shadow-inner">
                  <Icon size={16} className="text-[#C9A227]" />
                </div>
                <div className="text-left leading-tight">
                  <p className="font-bold text-[#FAF6ED] text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{value}</p>
                  <p className="text-[#FAF6ED]/70 text-[11px] mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Carousel dot nav ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-1.5 bg-[#C9A227]' : 'w-1.5 h-1.5 bg-[#FAF6ED]/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-6 z-20 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-[#FAF6ED]/40 cursor-pointer hover:text-[#C9A227] transition-colors"
            onClick={scrollToMenu}
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* Virtual Menu Book modal */}
      <MenuBook isOpen={bookOpen} onClose={() => setBookOpen(false)} cats={cats} />
    </>
  );
}
