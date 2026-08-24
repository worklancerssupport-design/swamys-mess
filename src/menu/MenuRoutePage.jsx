// ============================================
// MenuRoutePage — Dedicated /menu SEO + UI Page
// Targets: Swamy's Mess menu, homemade food Velachery,
// home-style food Velachery, South Indian food Velachery,
// individual dishes / categories offered by Swamy's.
// Primarily a menu + discovery + conversion page.
// ============================================
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, MessageCircle, ArrowRight, Clock, MapPin, Utensils,
  Sunrise, Sun, Moon, Sparkles, ChefHat, Leaf,
  IndianRupee, Calendar, Star, ChevronRight,
} from 'lucide-react';
import {
  KolamPattern, TempleBorderGold, TempleBorderLine,
  KuthuvilakkuLamp, GopuramSilhouette, MuruganWatermark,
  FourDeitiesCorners, AuspiciousDivider,
} from '../navbar/Decorations';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import localData from '../data.json';

const ENV = import.meta.env;
const RAW_URL = `https://raw.githubusercontent.com/${ENV.VITE_GITHUB_OWNER}/${ENV.VITE_GITHUB_REPO}/${ENV.VITE_GITHUB_BRANCH}/${ENV.VITE_GITHUB_FILE_PATH}`;

const PHONE_PRIMARY_DISPLAY = '+91 93606 71134';
const PHONE_PRIMARY_TEL     = '+919360671134';
const WHATSAPP_HREF         = 'https://wa.me/919360671134';
const ADDRESS_LINE          = '6, Sapthagiri St, Baby Nagar, Velachery, Chennai – 600042';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0) => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: delay } },
});

const categoryIcons = {
  Breakfast:        Sunrise,
  'Dosa Varieties': Utensils,
  Lunch:            Sun,
  Dinner:           Moon,
};

const categoryMeta = {
  Breakfast:        { time: '6 AM – 11 AM',                   tagline: 'Authentic homestyle traditional breakfast',            bg: 'from-[#7A0A22] to-[#4A0612]' },
  'Dosa Varieties': { time: '6 AM – 11 AM & 6 PM – 10 PM',    tagline: 'Crispy, hot, traditional South Indian crepes',         bg: 'from-[#6D071A] to-[#3F0510]' },
  Lunch:            { time: '11 AM – 4 PM',                    tagline: 'Wholesome, traditional meals made fresh daily',        bg: 'from-[#6D071A] to-[#4A0612]' },
  Dinner:           { time: '6 PM – 10 PM',                    tagline: 'Evening comfort food done right',                     bg: 'from-[#7A0A22] to-[#3F0510]' },
};

function groupItemsByCategory(items) {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.category)) map.set(it.category, []);
    map.get(it.category).push(it);
  }
  return Array.from(map, ([name, items]) => ({ name, items }));
}

async function fetchMenuData() {
  try {
    const r = await fetch(RAW_URL);
    if (!r.ok) return null;
    const items = await r.json();
    return groupItemsByCategory(items);
  } catch (e) {
    console.error('MenuRoutePage: failed to fetch menu data:', e);
    return null;
  }
}

/* ───────────────────────── 1. HERO ───────────────────────── */

function Hero({ cats }) {
  const total = cats.reduce((sum, c) => sum + c.items.length, 0);
  const navigate = useNavigate();

  return (
    <header className="relative min-h-[80vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-[#C9A227]/25">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E0207]/85 via-[#4A0612]/65 to-[#1E0207]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/45 via-transparent to-[#1E0207]/35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A227]/8 rounded-full blur-3xl pointer-events-none" />
      </div>

      <GopuramSilhouette className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1] pointer-events-none" opacity={0.07} />
      <KolamPattern className="absolute inset-0 z-[1] pointer-events-none" opacity={0.02} />
      <KuthuvilakkuLamp className="absolute top-8 left-8 z-[1] pointer-events-none hidden md:block" opacity={0.18} size={64} />
      <KuthuvilakkuLamp className="absolute top-8 right-8 z-[1] pointer-events-none hidden md:block" opacity={0.18} size={64} />
      <FourDeitiesCorners className="absolute inset-0 z-[1] pointer-events-none" opacity={0.06} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial="hidden" animate="show" variants={stagger()}
          className="flex flex-col items-center"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={13} /> Swamy's Mess & Catering · Velachery
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#FAF6ED] mb-6 font-display leading-[1.05]">
            Swamy's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] via-[#F4D77A] to-[#C9A227]">
              Menu
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg lg:text-xl text-[#FAF6ED]/85 font-light leading-relaxed max-w-3xl mb-3">
            The complete food offering from Swamy's Mess & Catering — South Indian
            breakfast, dosa, lunch and dinner prepared fresh at our Velachery kitchen.
          </motion.p>

          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#FAF6ED]/65 font-light mb-10">
            <Leaf size={13} className="inline -mt-0.5 mr-1 text-[#C9A227]" />
            Pure vegetarian · Homestyle · Made-to-order
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href={WHATSAPP_HREF}
              target="_blank" rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#C9A227] to-[#B8922E] text-[#4A0612] font-extrabold rounded-xl shadow-lg shadow-[#C9A227]/25 hover:scale-[1.03] active:scale-[0.98] transition-transform text-sm sm:text-base"
            >
              <MessageCircle size={18} /> Order / Enquire
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => navigate('/meals')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <Calendar size={17} /> View Daily Meals
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-[#FAF6ED]/55">
            <span className="flex items-center gap-1.5"><Utensils size={13} className="text-[#C9A227]" /> {total}+ dishes</span>
            <span className="flex items-center gap-1.5"><ChefHat size={13} className="text-[#C9A227]" /> 4 categories</span>
            <span className="flex items-center gap-1.5"><Star size={13} className="text-[#C9A227]" /> 18+ years in Velachery</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#C9A227]" /> Dine-in · Takeaway</span>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

/* ───────────────────────── 2. STICKY CATEGORY NAV ───────────────────────── */

function StickyCategoryNav({ cats, activeCat }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!activeCat || !containerRef.current) return;
    const el = containerRef.current.querySelector(`[data-cat="${activeCat}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeCat]);

  return (
    <div className="sticky top-[64px] sm:top-[72px] z-30 bg-[#FAF6ED]/85 backdrop-blur-xl border-b border-[#C9A227]/25 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div ref={containerRef} className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {cats.map((c) => {
            const Icon = categoryIcons[c.name] || Utensils;
            const isActive = c.name === activeCat;
            return (
              <a
                key={c.name}
                href={`#cat-${c.name.replace(/\s+/g, '-')}`}
                data-cat={c.name}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${
                  isActive
                    ? 'bg-[#6D071A] text-[#FAF6ED] border-[#6D071A] shadow-md'
                    : 'bg-[#FFF8E7] text-[#6D071A] border-[#C9A227]/30 hover:border-[#C9A227] hover:bg-[#FAF6ED]'
                }`}
              >
                <Icon size={13} />
                {c.name}
                <span className={`hidden sm:inline text-[10px] font-semibold ${isActive ? 'text-[#C9A227]' : 'text-[#6D071A]/60'}`}>
                  ({c.items.length})
                </span>
              </a>
            );
          })}
          <button
            onClick={() => navigate('/meals')}
            className="ml-auto inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap bg-gradient-to-r from-[#C9A227] to-[#B8922E] text-[#4A0612] hover:scale-[1.03] transition-transform flex-shrink-0"
          >
            Daily Meals <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 3. CATEGORY SECTION ───────────────────────── */

function CategorySection({ cat }) {
  const Icon  = categoryIcons[cat.name] || Utensils;
  const meta  = categoryMeta[cat.name] || { time: 'All day', tagline: 'Fresh homestyle food', bg: 'from-[#6D071A] to-[#4A0612]' };

  return (
    <section
      id={`cat-${cat.name.replace(/\s+/g, '-')}`}
      className="mb-16 sm:mb-20 scroll-mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${meta.bg} border border-[#C9A227]/25 shadow-lg mb-6 sm:mb-8`}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />
        <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.03} />

        <div className="relative z-10 p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#C9A227] rounded-full px-2.5 py-0.5 mb-2">
              <Clock size={10} />
              <span className="text-[10px] font-bold tracking-widest uppercase">{meta.time}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FAF6ED] leading-tight mb-1 font-display flex items-center gap-2.5">
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#C9A227]/15 border border-[#C9A227]/30 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[#C9A227]" />
              </span>
              {cat.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6ED]/70 italic font-light pl-[46px] sm:pl-[52px]">{meta.tagline}</p>
          </div>

          <div className="flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#C9A227] px-3 py-1.5 rounded-xl font-semibold text-xs self-start sm:self-center">
            <Utensils size={11} />
            {cat.items.length} dishes
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {cat.items.map((item, idx) => (
          <ItemCard key={item.id} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 4. ITEM CARD ───────────────────────── */

function ItemCard({ item, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#B8922E]/25 hover:border-[#C9A227] transition-all duration-300 flex flex-col"
    >
      <div className="relative h-40 sm:h-44 overflow-hidden bg-[#4A0612] flex-shrink-0">
        {!imgError && item.image_url ? (
          <img
            src={item.image_url}
            alt={item.item}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6D071A]/40 to-[#4A0612]/40 flex items-center justify-center">
            <span className="text-4xl opacity-30">🍽️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

        {item.price && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(index * 0.04, 0.3) + 0.15 }}
            className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-0.5 bg-[#6D071A] text-[#C9A227] font-extrabold text-sm px-2.5 py-1 rounded-full shadow-lg border border-[#C9A227]/30 group-hover:bg-[#C9A227] group-hover:text-[#6D071A] transition-colors duration-300"
          >
            <IndianRupee size={11} strokeWidth={2.5} />
            {item.price}
          </motion.div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 bg-white">
        <h3 className="font-bold text-[#6D071A] text-[15px] sm:text-[16px] leading-snug mb-1.5 group-hover:text-[#8B1025] transition-colors font-display">
          {item.item}
        </h3>
        {item.description && (
          <p className="text-[12px] sm:text-[13px] text-[#6D071A]/70 leading-relaxed line-clamp-2 flex-1 font-light">
            {item.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}

/* ───────────────────────── 5. SUPPORTING NOTES ───────────────────────── */

function SupportingNotes({ cats }) {
  const total = cats.reduce((sum, c) => sum + c.items.length, 0);

  const notes = [
    {
      icon: Clock,
      title: 'Fresh Every Day',
      desc: 'All dishes are prepared fresh in our Velachery kitchen. Breakfast opens at 6 AM, lunch is served 11 AM – 4 PM, and dinner runs 6 PM – 10 PM.',
    },
    {
      icon: Leaf,
      title: 'Pure Vegetarian',
      desc: "Swamy's is a 100% pure vegetarian kitchen — no onion or garlic in our traditional items, just like home-cooked South Indian food.",
    },
    {
      icon: MapPin,
      title: 'Dine-in & Takeaway',
      desc: 'Visit us at 6, Sapthagiri Street, Baby Nagar, Velachery for a hot plate, or call ahead to place a takeaway / parcel order.',
    },
    {
      icon: Phone,
      title: 'Order by Phone or WhatsApp',
      desc: 'Skip the queue — call or message us on WhatsApp to confirm availability and place advance orders for breakfast, lunch, dinner or parties.',
    },
  ];

  return (
    <section className="bg-[#FFF8E7] py-16 sm:py-20 border-y border-[#C9A227]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#8B1025] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} /> Good to know
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6D071A] mb-3 font-display">
            Menu & Ordering Notes
          </h2>
          <p className="text-sm sm:text-base text-[#6D071A]/70 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to know about ordering from Swamy's Mess & Catering in Velachery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {notes.map((n, idx) => {
            const Icon = n.icon;
            return (
              <motion.div
                key={n.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-[#B8922E]/25 p-5 sm:p-6 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6D071A] to-[#8B1025] border border-[#C9A227]/30 flex items-center justify-center mb-3">
                  <Icon size={17} className="text-[#C9A227]" />
                </div>
                <h3 className="font-bold text-[#6D071A] text-base mb-1.5 font-display">{n.title}</h3>
                <p className="text-[13px] text-[#6D071A]/70 leading-relaxed font-light">{n.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. MEALS CONNECTION CTA ───────────────────────── */

function MealsConnection() {
  const navigate = useNavigate();
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden border-b border-[#C9A227]/20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A0612] via-[#6D071A] to-[#4A0612]" />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.04} />
      <MuruganWatermark className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none" size={420} opacity={0.04} />
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.3} />
      <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.3} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
        >
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar size={12} /> Daily & Monthly Meals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6ED] mb-3 font-display leading-tight">
              Looking for everyday{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
                home-style meals?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#FAF6ED]/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              We run a daily lunch and monthly tiffin subscription across Velachery and nearby areas —
              fresh, homestyle, on-time, every day of the week.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/meals')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#C9A227] to-[#B8922E] text-[#4A0612] font-extrabold rounded-xl shadow-lg shadow-[#C9A227]/25 hover:scale-[1.03] active:scale-[0.98] transition-transform text-sm sm:text-base"
            >
              View Daily & Monthly Meals <ArrowRight size={16} />
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank" rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <MessageCircle size={17} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. CATERING CONNECTION CTA ───────────────────────── */

function CateringConnection() {
  const navigate = useNavigate();
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden border-b border-[#C9A227]/20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E7] via-[#FAF6ED] to-[#FFF8E7]" />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.04} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
        >
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#8B1025] text-xs font-bold uppercase tracking-wider mb-4">
              <ChefHat size={12} /> Functions & Events
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6D071A] mb-3 font-display leading-tight">
              Planning a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D071A] to-[#8B1025]">
                function or event?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#6D071A]/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              From intimate home gatherings of 20 guests to larger ceremonies — we cater for
              weddings, receptions, poojas, birthdays and temple functions across Velachery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/catering')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#6D071A] to-[#8B1025] text-[#FAF6ED] font-extrabold rounded-xl shadow-lg shadow-[#6D071A]/25 hover:scale-[1.03] active:scale-[0.98] transition-transform text-sm sm:text-base"
            >
              Catering Enquiry <ArrowRight size={16} />
            </button>
            <a
              href={`tel:${PHONE_PRIMARY_TEL}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white border border-[#6D071A]/25 text-[#6D071A] font-bold rounded-xl hover:bg-[#FFF8E7] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <Phone size={17} /> Call {PHONE_PRIMARY_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. FINAL CTA ───────────────────────── */

function FinalCTA() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#C9A227]/20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A030A] via-[#4A0612] to-[#2A030A]" />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.04} />
      <MuruganWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" size={500} opacity={0.05} />
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.3} />
      <TempleBorderGold className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.3} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6ED] mb-4 font-display leading-tight">
            Hungry?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              Let's get your order started.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#FAF6ED]/75 max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Reach out for a single meal, a monthly tiffin subscription, or a function we can cater for.
            We're right here in Velachery.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <a
              href={WHATSAPP_HREF}
              target="_blank" rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#C9A227] to-[#B8922E] text-[#4A0612] font-extrabold rounded-xl shadow-lg shadow-[#C9A227]/25 hover:scale-[1.03] active:scale-[0.98] transition-transform text-sm sm:text-base"
            >
              <MessageCircle size={18} /> Order / Enquire
            </a>
            <a
              href="/meals"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <Calendar size={17} /> View Daily & Monthly Meals
            </a>
            <a
              href="/catering"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <ChefHat size={17} /> Catering Enquiry
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-[#FAF6ED]/65">
            <span className="flex items-center gap-1.5"><Phone size={13} className="text-[#C9A227]" /> {PHONE_PRIMARY_DISPLAY}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#C9A227]" /> {ADDRESS_LINE}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function MenuRoutePage() {
  const [cats, setCats] = useState(() => groupItemsByCategory(localData));
  const [activeCat, setActiveCat] = useState('');

  const loadData = useCallback(async () => {
    const data = await fetchMenuData();
    if (data && data.length) setCats(data);
  }, []);
  useEffect(() => { loadData(); }, [loadData]);

  const menuCats = useMemo(
    () => cats.filter(c => c.name !== 'Catering'),
    [cats]
  );

  /* SEO: title, meta description, Open Graph */
  useEffect(() => {
    document.title = "Swamy's Menu | South Indian Food Velachery | Swamy's Mess & Catering";

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta(
      'description',
      "View the full menu of Swamy's Mess & Catering in Velachery — South Indian breakfast, dosa varieties, lunch and dinner. Pure vegetarian homestyle food made fresh daily."
    );
    setMeta(
      'keywords',
      "Swamy's Mess menu, homemade food Velachery, home-style food Velachery, South Indian food Velachery, breakfast Velachery, dosa Velachery, lunch Velachery, dinner Velachery"
    );
    setMeta('og:title', "Swamy's Menu | South Indian Food Velachery", 'property');
    setMeta(
      'og:description',
      "The full menu of Swamy's Mess & Catering — vegetarian South Indian breakfast, dosa, lunch and dinner from our Velachery kitchen.",
      'property'
    );
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', `${window.location.origin}/menu`, 'property');

    return () => {
      document.title = "Swamy's Mess & Catering | Velachery, Chennai";
    };
  }, []);

  /* Sticky-category active tracking via IntersectionObserver */
  useEffect(() => {
    if (!menuCats.length) return;
    const ids = menuCats.map(c => `cat-${c.name.replace(/\s+/g, '-')}`);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          const match = menuCats.find(c => `cat-${c.name.replace(/\s+/g, '-')}` === id);
          if (match) setActiveCat(match.name);
        }
      },
      { rootMargin: '-200px 0px -55% 0px', threshold: [0, 0.1, 0.3] }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [menuCats]);

  return (
    <div className="min-h-screen bg-[#FAF6ED] text-[#6D071A]">
      <Navbar />

      <main>
        <Hero cats={menuCats} />
        <StickyCategoryNav cats={menuCats} activeCat={activeCat} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {menuCats.map((cat) => (
            <CategorySection key={cat.name} cat={cat} />
          ))}
        </div>

        <SupportingNotes cats={menuCats} />
        <MealsConnection />
        <CateringConnection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
