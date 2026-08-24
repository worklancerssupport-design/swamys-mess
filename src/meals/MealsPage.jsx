// ============================================
// MealsPage — Dedicated /meals SEO Landing Page
// Targets search intents: daily meals, monthly meals, tiffin service,
// home-style meals for bachelors / working professionals / PG residents in Velachery
// ============================================
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, MessageCircle, ArrowRight, Clock, MapPin, CheckCircle2,
  Sparkles, UtensilsCrossed, Calendar, Users, GraduationCap,
  Briefcase, Home as HomeIcon, ChefHat, Star, Quote,
  ChevronRight, IndianRupee, Heart, ShieldCheck,
} from 'lucide-react';
import {
  KolamPattern, TempleBorderGold, TempleBorderLine,
  KuthuvilakkuLamp, VinayagarWatermark,
  GopuramSilhouette, MuruganWatermark, FourDeitiesCorners,
} from '../navbar/Decorations';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import localData from '../data.json';

const ENV = import.meta.env;
const RAW_URL = `https://raw.githubusercontent.com/${ENV.VITE_GITHUB_OWNER}/${ENV.VITE_GITHUB_REPO}/${ENV.VITE_GITHUB_BRANCH}/${ENV.VITE_GITHUB_FILE_PATH}`;

function groupItemsByCategory(items) {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.category)) map.set(it.category, []);
    map.get(it.category).push(it);
  }
  return Array.from(map, ([name, items]) => ({ name, items }));
}

/* ───────────────────────── helpers ───────────────────────── */

const PHONE_PRIMARY = '+919360671134';
const PHONE_PRIMARY_DISPLAY = '+91 93606 71134';
const PHONE_SECONDARY_DISPLAY = '+91 74483 62352';
const WHATSAPP_HREF = 'https://wa.me/919360671134';
const ADDRESS_LINE = '6, Sapthagiri St, Baby Nagar, Velachery, Chennai – 600042';
const MAPS_HREF =
  'https://www.google.com/maps/search/?api=1&query=6,+Sapthagiri+St,+Baby+Nagar,+Velachery,+Chennai+600042';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (delay = 0) => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: delay } },
});

/* ─────────────────── featured dishes (from data.json) ─────────────────── */

function pickFeaturedItems(cats) {
  const out = [];
  const preferredOrder = ['Lunch', 'Dosa Varieties', 'Breakfast', 'Dinner'];
  for (const name of preferredOrder) {
    const cat = cats.find(c => c.name === name);
    if (!cat) continue;
    const items = cat.items.filter(i => i.image_url && i.price);
    if (items.length) {
      out.push({
        category: cat.name,
        item: items[0],
      });
    }
    if (out.length >= 6) break;
  }
  return out;
}

/* ───────────────────────── 1. HERO ───────────────────────── */

function Hero({ cats }) {
  const navigate = useNavigate();
  return (
    <header className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#C9A227]/25">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        {/* Layered gradients for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E0207]/85 via-[#4A0612]/65 to-[#1E0207]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/45 via-transparent to-[#1E0207]/35" />
        {/* Subtle gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A227]/8 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Decorative motifs */}
      <GopuramSilhouette className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1] pointer-events-none" opacity={0.07} />
      <KolamPattern className="absolute inset-0 z-[1] pointer-events-none" opacity={0.02} />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-28 sm:py-32 text-center">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6D071A]/55 border border-[#C9A227]/35 backdrop-blur-md mb-6 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A227]" />
          </span>
          <span className="text-[#FAF6ED] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
            Velachery · Chennai · Since 18+ Years
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight font-display mb-6">
          <span className="text-[#FAF6ED] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">Home-Style </span>
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF6ED] via-[#F5E9C8] to-[#E5C158]"
            style={{ filter: 'drop-shadow(0 2px 14px rgba(229,193,88,0.35))' }}>
            Daily &amp; Monthly Meals
          </span>
          <br className="hidden sm:block" />
          <span className="text-[#FAF6ED] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]"> in Velachery</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
          className="text-[#FAF6ED]/85 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Fresh, homestyle South Indian food — every single day. Choose a one-time meal or a
          hassle-free monthly plan built for bachelors, working professionals, students and
          families across Velachery and nearby areas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={WHATSAPP_HREF}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl transition-all text-sm sm:text-base border border-[#C9A227]/30 hover:shadow-2xl"
          >
            <MessageCircle size={17} />
            Order / Enquire
            <ArrowRight size={16} />
          </a>
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-4 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base"
          >
            <UtensilsCrossed size={17} className="text-[#C9A227]" />
            View Full Menu
          </button>
        </motion.div>

        {/* Quick trust strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs">
          {[
            { icon: Sparkles, label: 'Pure Vegetarian' },
            { icon: ShieldCheck, label: 'Hygienic Kitchen' },
            { icon: Clock, label: 'Same-day Fresh' },
            { icon: IndianRupee, label: 'Starting ₹20' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.08] text-[#FAF6ED]/85 font-semibold"
            >
              <Icon size={12} className="text-[#C9A227]" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom temple border */}
      <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10" opacity={0.45} />
    </header>
  );
}

/* ───────────────────── 2. DAILY & MONTHLY OPTIONS ───────────────────── */

function MealOptions({ cats }) {
  const lunch = cats.find(c => c.name === 'Lunch');
  const breakfast = cats.find(c => c.name === 'Breakfast');
  const dinner = cats.find(c => c.name === 'Dinner');

  const lunchSample = lunch?.items.find(i => /meals/i.test(i.item)) || lunch?.items[0];
  const breakfastSample = breakfast?.items.find(i => /idly/i.test(i.item)) || breakfast?.items[0];
  const dinnerSample = dinner?.items.find(i => /chapati/i.test(i.item)) || dinner?.items[0];

  return (
    <section id="meal-options" className="relative bg-[#FAF6ED] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.8} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />
      <FourDeitiesCorners layout="shifted" className="absolute inset-0 pointer-events-none p-6" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6D071A]/10 border border-[#6D071A]/20 text-[#6D071A] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} className="text-[#B8922E]" />
            Two ways to eat with us
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6D071A] mb-4 font-display leading-tight">
            Daily Meals or a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1025] to-[#C9A227]">Monthly Plan</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6D071A]/75 text-sm sm:text-base leading-relaxed font-light">
            Stop cooking every day, stop ordering from five different restaurants.
            Pick the rhythm that fits your life — one meal at a time, or every single day.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* ── Daily Meals card ── */}
          <motion.article variants={fadeUp}
            className="group relative bg-white rounded-3xl overflow-hidden border border-[#B8922E]/25 shadow-lg hover:shadow-2xl hover:border-[#C9A227] transition-all duration-300">
            {/* Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-[#4A0612]">
              {lunchSample?.image_url && (
                <img
                  src={lunchSample.image_url} alt={lunchSample?.item || 'Daily meals'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0612]/90 via-[#4A0612]/30 to-transparent" />
              {/* Tag */}
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6ED]/95 text-[#6D071A] text-[10px] font-bold uppercase tracking-widest border border-[#C9A227]/40 shadow-md">
                <Clock size={11} /> No Commitment
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6ED] font-display drop-shadow-lg">Daily Meals</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <p className="text-[#6D071A]/75 text-sm leading-relaxed mb-5 font-light">
                Walk in or call ahead. Order exactly what you need today — idly, dosa,
                a full meals plate, chapati, or anything on our menu. Pay per meal,
                no strings attached.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Pay only for what you eat',
                  'Walk-in, takeaway, or call-ahead',
                  'Same freshly-cooked taste every visit',
                  'Full à-la-carte menu available',
                ].map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[#6D071A]/85">
                    <CheckCircle2 size={15} className="text-[#B8922E] flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-xs text-[#6D071A]/65 font-semibold uppercase tracking-wider mb-4">
                <IndianRupee size={13} className="text-[#B8922E]" />
                Sample pricing from data
              </div>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {breakfastSample && (
                  <div className="rounded-xl border border-[#C9A227]/25 bg-[#FFF8E7] p-3 text-center">
                    <p className="text-[9px] text-[#6D071A]/55 uppercase tracking-widest font-bold">Breakfast</p>
                    <p className="text-sm font-bold text-[#6D071A] mt-0.5 truncate">{breakfastSample.item}</p>
                    <p className="text-xs font-extrabold text-[#8B1025] mt-0.5">₹{breakfastSample.price}</p>
                  </div>
                )}
                {lunchSample && (
                  <div className="rounded-xl border border-[#C9A227]/25 bg-[#FFF8E7] p-3 text-center">
                    <p className="text-[9px] text-[#6D071A]/55 uppercase tracking-widest font-bold">Lunch</p>
                    <p className="text-sm font-bold text-[#6D071A] mt-0.5 truncate">{lunchSample.item}</p>
                    <p className="text-xs font-extrabold text-[#8B1025] mt-0.5">₹{lunchSample.price}</p>
                  </div>
                )}
                {dinnerSample && (
                  <div className="rounded-xl border border-[#C9A227]/25 bg-[#FFF8E7] p-3 text-center">
                    <p className="text-[9px] text-[#6D071A]/55 uppercase tracking-widest font-bold">Dinner</p>
                    <p className="text-sm font-bold text-[#6D071A] mt-0.5 truncate">{dinnerSample.item}</p>
                    <p className="text-xs font-extrabold text-[#8B1025] mt-0.5">₹{dinnerSample.price}</p>
                  </div>
                )}
              </div>

              <a
                href={WHATSAPP_HREF}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all border border-[#C9A227]/30">
                <MessageCircle size={15} /> Order a Single Meal
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.article>

          {/* ── Monthly Plan card (featured) ── */}
          <motion.article variants={fadeUp}
            className="group relative rounded-3xl overflow-hidden border-2 border-[#C9A227]/45 shadow-2xl transition-all duration-300">
            {/* Image bg */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1920&q=80"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1E0207]/85 via-[#4A0612]/85 to-[#1E0207]/95" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/40 to-transparent" />
            </div>
            <KolamPattern className="absolute inset-0 z-[1] pointer-events-none" opacity={0.025} />
            <KuthuvilakkuLamp className="absolute bottom-2 right-2 pointer-events-none hidden md:block z-[1]" height={170} opacity={0.07} />
            <VinayagarWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]" size={260} opacity={0.05} />

            <div className="relative z-10 p-6 sm:p-8">
              {/* Tag */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#E5C158] text-[10px] font-bold uppercase tracking-widest mb-5 shadow-sm">
                <Sparkles size={11} /> Most Loved · Daily Convenience
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6ED] font-display mb-3 leading-tight">
                Monthly Meal Plan
              </h3>
              <p className="text-[#FAF6ED]/80 text-sm leading-relaxed mb-6 font-light">
                Three fresh, homestyle meals a day, every day of the month.
                Set it once and forget it — your food is ready when you are,
                cooked the same way you'd cook at home.
              </p>

              {/* Daily inclusions grid */}
              <div className="grid grid-cols-3 gap-2 mb-6 border-y border-[#C9A227]/25 py-4">
                {[
                  { period: 'Morning',   meal: 'Breakfast', icon: '🌅' },
                  { period: 'Afternoon', meal: 'Lunch',     icon: '☀️' },
                  { period: 'Evening',   meal: 'Dinner',    icon: '🌙' },
                ].map(({ period, meal, icon }) => (
                  <div key={meal} className="text-center px-2">
                    <p className="text-2xl mb-1">{icon}</p>
                    <p className="text-[9px] text-[#E5C158] uppercase tracking-widest font-bold">{period}</p>
                    <p className="text-sm font-bold text-[#FAF6ED] mt-0.5">{meal}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-2.5 mb-7">
                {[
                  'Same homestyle taste across breakfast, lunch & dinner',
                  'Zero artificial preservatives or shortcuts',
                  'Pure vegetarian · Hygienic kitchen',
                  'Daily menu variations so you never get bored',
                ].map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[#FAF6ED]/85">
                    <CheckCircle2 size={15} className="text-[#C9A227] flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Value block */}
              <div className="bg-[#FFF8E7] rounded-2xl p-5 border border-[#C9A227]/35 mb-5">
                <p className="text-[10px] uppercase tracking-widest text-[#B8922E] font-bold">Unbeatable everyday value</p>
                <p className="text-4xl font-black text-[#6D071A] mt-1.5 font-display leading-none">
                  ₹4,999
                  <span className="text-sm font-normal text-[#6D071A]/60"> / month</span>
                </p>
                <p className="text-xs text-[#B8922E] font-semibold tracking-wider uppercase mt-2">3 home-cooked meals · every day</p>
              </div>

              <a
                href={WHATSAPP_HREF}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white text-sm font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all border border-[#C9A227]/40">
                <Calendar size={15} />
                Enquire About Monthly Plan
                <ArrowRight size={14} />
              </a>
              <p className="text-[10px] text-[#FAF6ED]/45 mt-3 text-center italic">
                Self-pickup at our Velachery mess. Terms &amp; conditions apply.
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. WHO THIS IS FOR ───────────────────────── */

function WhoThisIsFor() {
  const audiences = [
    {
      icon: Users, title: 'Bachelors & People Living Alone',
      problem: 'Tired of cooking every single day in a small PG kitchen?',
      solution: 'Fresh homestyle meals ready when you walk in — no prep, no cleanup, no compromise.',
    },
    {
      icon: Briefcase, title: 'Working Professionals',
      problem: 'Long hours, no time, and restaurant food is getting unhealthy.',
      solution: 'Reliable breakfast, lunch and dinner built around your work schedule. Eat well, focus on work.',
    },
    {
      icon: GraduationCap, title: 'Students & PG Residents',
      problem: 'Hostel mess food is repetitive. Outside food is oily and heavy on the wallet.',
      solution: 'Affordable home-cooked alternatives right around Velachery — your body and grades will thank you.',
    },
    {
      icon: HomeIcon, title: 'Local Families & Residents',
      problem: 'Days when nobody in the house feels like cooking.',
      solution: 'Pick up a full tiffin or a monthly subscription and bring home-cooked taste back to your table.',
    },
  ];

  return (
    <section id="who" className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.35} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />
      <MuruganWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]" size={320} opacity={0.04} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <Heart size={12} /> Built for everyday people
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            Who Our Meals Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">For</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base leading-relaxed font-light">
            Whether you're living alone in a PG, juggling a 9-to-6, or just tired of
            cooking — we've cooked for people like you for nearly two decades.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {audiences.map(({ icon: Icon, title, problem, solution }) => (
            <motion.article
              key={title} variants={fadeUp}
              className="group relative bg-[#FAF6ED] rounded-2xl p-6 sm:p-7 border border-[#B8922E]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all duration-300">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B1025] to-[#6D071A] flex items-center justify-center mb-5 shadow-md border border-[#C9A227]/30 group-hover:scale-105 transition-transform">
                <Icon size={22} className="text-[#FAF6ED]" />
              </div>

              <h3 className="font-extrabold text-[#6D071A] text-base mb-2 font-display leading-snug">{title}</h3>
              <p className="text-xs italic text-[#6D071A]/55 mb-3 leading-relaxed">"{problem}"</p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent mb-3" />
              <p className="text-sm text-[#6D071A]/80 leading-relaxed font-light">{solution}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── 4. WHAT YOU GET ──────────────────────── */

function WhatYouGet({ cats }) {
  const features = [
    { icon: ChefHat,     label: 'Homestyle preparation',     desc: 'Cooked the same way it’s made in Tamil homes — fresh, not factory-style.' },
    { icon: Sparkles,    label: 'Pure vegetarian kitchen',   desc: '100% veg menu. No onion-garlic free claims — just honest, clean food.' },
    { icon: ShieldCheck, label: 'Clean & hygienic process',  desc: 'Daily-clean utensils, fresh oil, and disciplined kitchen standards.' },
    { icon: Clock,       label: 'Same-day freshness',        desc: 'Food prepared the same morning — never reheated from yesterday.' },
    { icon: UtensilsCrossed, label: 'Wide à-la-carte menu',  desc: 'Idly, dosa varieties, full meals, chapati and more — pick what you love.' },
    { icon: Heart,       label: 'No artificial preservatives', desc: 'Real ingredients, no shortcuts. The way food should be.' },
  ];

  return (
    <section id="included" className="relative bg-[#FAF6ED] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.7} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6D071A]/10 border border-[#6D071A]/20 text-[#6D071A] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} className="text-[#B8922E]" />
            What's actually included
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6D071A] mb-4 font-display leading-tight">
            Real Food. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1025] to-[#C9A227]">Real Care.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6D071A]/75 text-sm sm:text-base leading-relaxed font-light">
            Everything we serve is built on the same principles we've followed for nearly
            two decades — fresh, honest, homestyle South Indian cooking.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.06)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label} variants={fadeUp}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-[#B8922E]/25 hover:border-[#C9A227] hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#FFF8E7] border border-[#C9A227]/30 flex items-center justify-center">
                <Icon size={20} className="text-[#B8922E]" />
              </div>
              <div>
                <h3 className="font-bold text-[#6D071A] text-sm mb-1 font-display">{label}</h3>
                <p className="text-xs sm:text-sm text-[#6D071A]/70 leading-relaxed font-light">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category quick-glance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-14 bg-gradient-to-br from-[#4A0612] to-[#2A030A] rounded-3xl p-6 sm:p-10 text-[#FAF6ED] relative overflow-hidden border border-[#C9A227]/30 shadow-xl">
          <KuthuvilakkuLamp className="absolute -bottom-4 -right-2 pointer-events-none hidden md:block" height={200} opacity={0.08} />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {cats.map(c => (
              <div key={c.name} className="border-r last:border-r-0 border-[#C9A227]/20 px-2">
                <p className="text-2xl sm:text-3xl font-black text-[#E5C158] font-display">{c.items.length}</p>
                <p className="text-[10px] sm:text-xs text-[#FAF6ED]/65 uppercase tracking-widest mt-1 font-bold">{c.name}</p>
                <p className="text-[10px] text-[#FAF6ED]/45 mt-0.5">items on menu</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. MENU PREVIEW ───────────────────────── */

function MenuPreview({ cats }) {
  const navigate = useNavigate();
  const featured = pickFeaturedItems(cats);

  return (
    <section id="menu-preview" className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.35} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <UtensilsCrossed size={12} /> Today's Menu · Live Preview
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            A Taste of What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">Cooking</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base leading-relaxed font-light">
            A small slice of what's on the daily menu. Tap below to see the full list
            with prices, photos and descriptions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.05)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10">
          {featured.map(({ category, item }) => (
            <motion.article key={item.id} variants={fadeUp}
              className="group bg-[#FAF6ED] rounded-2xl overflow-hidden border border-[#B8922E]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all duration-300">
              <div className="relative h-44 overflow-hidden bg-[#4A0612]">
                {item.image_url && (
                  <img src={item.image_url} alt={item.item}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0612]/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF6ED]/95 text-[#6D071A] text-[10px] font-bold uppercase tracking-widest border border-[#C9A227]/40">
                  {category}
                </span>
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6ED]/95 text-[#6D071A] text-xs font-extrabold border border-[#C9A227]/40 shadow-md">
                  <IndianRupee size={11} />{item.price}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-extrabold text-[#6D071A] text-sm sm:text-base font-display leading-tight line-clamp-2">
                  {item.item}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="text-center">
          <button onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base border border-[#C9A227]/30">
            View Full Menu
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5b. CATERING CONNECTION CTA ───────────────────────── */

function CateringConnection() {
  const navigate = useNavigate();
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden border-b border-[#C9A227]/25">
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
              <ChefHat size={12} /> Functions &amp; Events
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6ED] mb-3 font-display leading-tight">
              Planning a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
                function or event?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#FAF6ED]/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              From intimate home gatherings of 20 guests to larger ceremonies — we cater for
              weddings, receptions, poojas, birthdays and temple functions across Velachery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/catering')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#C9A227] to-[#B8922E] text-[#4A0612] font-extrabold rounded-xl shadow-lg shadow-[#C9A227]/25 hover:scale-[1.03] active:scale-[0.98] transition-transform text-sm sm:text-base"
            >
              Explore Catering <ArrowRight size={16} />
            </button>
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <Phone size={17} /> Call {PHONE_PRIMARY_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. HOW IT WORKS ───────────────────────── */

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Choose Your Meal',     desc: 'Pick a single daily meal, or a monthly breakfast + lunch + dinner plan.' },
    { n: '02', title: 'Contact Us',           desc: 'Call, WhatsApp, or walk in to our Velachery mess to confirm your order.' },
    { n: '03', title: 'Confirm & Schedule',   desc: 'For monthly plans, we lock in your start date and meal preferences.' },
    { n: '04', title: 'Collect Your Meals',   desc: 'Walk in fresh every day — homestyle food ready at the promised time.' },
  ];

  return (
    <section id="how" className="relative bg-[#FAF6ED] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.7} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />
      <FourDeitiesCorners layout="rotated" className="absolute inset-0 pointer-events-none p-6" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6D071A]/10 border border-[#6D071A]/20 text-[#6D071A] text-xs font-bold uppercase tracking-wider mb-4">
            <Clock size={12} className="text-[#B8922E]" />
            Simple, no-fuss ordering
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6D071A] mb-4 font-display leading-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1025] to-[#C9A227]">Works</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6D071A]/75 text-sm sm:text-base leading-relaxed font-light">
            From the first message to your first meal — here's the entire flow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.08)}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#C9A227]/35 z-0" />

          {steps.map(({ n, title, desc }) => (
            <motion.div key={n} variants={fadeUp}
              className="relative z-10 text-center bg-white rounded-2xl p-6 border border-[#B8922E]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all">
              <div className="mx-auto w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-[#8B1025] to-[#6D071A] flex items-center justify-center mb-5 shadow-xl border border-[#C9A227]/40">
                <span className="text-[#FAF6ED] font-display font-black text-xl">{n}</span>
              </div>
              <h3 className="font-extrabold text-[#6D071A] text-base mb-2 font-display">{title}</h3>
              <p className="text-xs sm:text-sm text-[#6D071A]/70 leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. SERVICE AREA ───────────────────────── */

function ServiceArea() {
  const nearby = [
    'Velachery', 'Baby Nagar', 'Medavakkam', 'Madipakkam',
    'Pallikaranai', 'Tambaram', 'Chromepet', 'Guindy',
    'Saidapet', 'Adyar', 'Sholinganallur', 'Perungalathur',
  ];

  return (
    <section id="service-area" className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.35} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin size={12} /> Local · Trusted · Accessible
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            Meals Around <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">Velachery</span> &amp; Nearby Areas
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base leading-relaxed font-light">
            Our mess sits in the heart of Velachery — a short walk or ride for residents
            from any of these neighbouring areas.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.05)}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {nearby.map(name => (
            <motion.div key={name} variants={fadeUp}
              className="flex items-center gap-2.5 bg-[#FAF6ED]/5 backdrop-blur-sm border border-[#C9A227]/25 rounded-xl px-4 py-3 hover:bg-[#C9A227]/15 transition-colors">
              <MapPin size={14} className="text-[#C9A227] flex-shrink-0" />
              <span className="text-sm text-[#FAF6ED] font-semibold">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Address block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-[#FAF6ED] to-[#FFF8E7] rounded-3xl p-6 sm:p-8 border border-[#C9A227]/35 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#8B1025] to-[#6D071A] flex items-center justify-center shadow-md border border-[#C9A227]/30">
            <MapPin size={26} className="text-[#FAF6ED]" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-[#B8922E] font-bold mb-1">Our Mess Address</p>
            <p className="text-base sm:text-lg font-extrabold text-[#6D071A] font-display leading-snug">{ADDRESS_LINE}</p>
          </div>
          <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#6D071A] text-white text-xs font-bold rounded-lg hover:bg-[#8B1025] transition-colors">
            Get Directions
            <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── 8. REVIEWS / SOCIAL PROOF ──────────────────────── */

function Reviews() {
  const reviews = [
    {
      id: 1, name: 'Priya Krishnan', title: 'Best South Indian in Chennai!',
      rating: 5, avatar: 'PK', gradient: 'from-amber-500 to-amber-600',
      text: 'Absolutely love the food here! The masala dosa is crispy and perfectly spiced. The filter coffee is a must-try — exactly like what you get in a traditional mess. Highly recommend!',
    },
    {
      id: 2, name: 'Sunita Raman', title: 'Amazing value for money',
      rating: 4, avatar: 'SR', gradient: 'from-orange-500 to-orange-600',
      text: 'The weekday meals are fantastic value for money. Sambar is always fresh and the rice varieties are wonderful. A true home-style South Indian experience right here in the city.',
    },
    {
      id: 3, name: 'Arun Prakash', title: 'Reliable monthly tiffin',
      rating: 5, avatar: 'AP', gradient: 'from-yellow-500 to-yellow-600',
      text: 'I’ve been on their monthly meal plan for three months now. Same homestyle taste every day, no shortcuts. As a bachelor, it has completely solved my food problem.',
    },
  ];

  return (
    <section id="reviews" className="relative bg-[#FAF6ED] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.7} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6D071A]/10 border border-[#6D071A]/20 text-[#6D071A] text-xs font-bold uppercase tracking-wider mb-4">
            <Star size={12} className="fill-[#C9A227] text-[#C9A227]" /> 4.9 / 5 · Verified Customers
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6D071A] mb-4 font-display leading-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1025] to-[#C9A227]">Velachery</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6D071A]/75 text-sm sm:text-base leading-relaxed font-light">
            Don't just take our word for it — here's what our regulars say about our
            homestyle meals and monthly plans.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.08)}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map(r => (
            <motion.article key={r.id} variants={fadeUp}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-[#B8922E]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all">
              <Quote size={42} className="absolute -top-2 -right-2 text-[#6D071A]/5 -rotate-180" strokeWidth={3} />

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-md border border-[#C9A227]/25`}>
                  {r.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#6D071A] text-sm">{r.name}</p>
                  <p className="text-[10px] text-[#6D071A]/55 italic">{r.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < r.rating ? 'fill-[#C9A227] text-[#C9A227]' : 'text-[#6D071A]/15'}
                  />
                ))}
                <span className="ml-1.5 text-xs font-semibold text-[#B8922E]">{r.rating}.0</span>
              </div>

              <p className="text-sm text-[#6D071A]/80 leading-relaxed font-light line-clamp-5">
                {r.text}
              </p>

              <div className="mt-4 pt-4 border-t border-[#C9A227]/15 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8922E] opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#B8922E]" />
                </span>
                <span className="text-[10px] text-[#6D071A]/45 font-semibold uppercase tracking-wider">Verified Customer</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. FAQ ───────────────────────── */

function FAQ() {
  const faqs = [
    {
      q: 'Do you offer daily meals in Velachery?',
      a: 'Yes. Walk in or call ahead to order any meal from our full menu — idly, dosa varieties, full meals, chapati, parathas and more. No commitment, no subscription required for one-time orders.',
    },
    {
      q: 'Do you offer monthly meal plans?',
      a: 'Yes. Our monthly plan covers breakfast, lunch and dinner every day of the month — pure vegetarian, freshly cooked in our Velachery mess. Enquire via WhatsApp to lock in your start date.',
    },
    {
      q: 'Do you provide food for bachelors?',
      a: 'Absolutely. Most of our monthly-plan customers are bachelors, working professionals and PG residents who don\'t want to cook every day. It\'s the easiest way to eat homestyle food without the prep.',
    },
    {
      q: 'Do you offer tiffin / home-style meals?',
      a: 'Yes — every meal we serve is prepared in homestyle South Indian tradition. The monthly plan in particular is structured like a tiffin service with three freshly-cooked meals a day.',
    },
    {
      q: 'Do you serve working professionals and PG residents?',
      a: 'Yes. Our mess is centrally located in Velachery and is a regular stop for people working around the area and PG residents from nearby localities.',
    },
    {
      q: 'Which areas around Velachery do you serve?',
      a: 'Our mess is at Baby Nagar, Velachery. Walk-in customers typically come from Velachery itself and nearby areas including Medavakkam, Madipakkam, Pallikaranai, Tambaram, Chromepet, Guindy, Saidapet and Adyar.',
    },
    {
      q: 'Can I order without taking a monthly plan?',
      a: 'Of course. You can order any single meal or dish from the menu anytime — no subscription required.',
    },
    {
      q: 'How do I order or enquire about a meal plan?',
      a: 'Just WhatsApp us or call our numbers. We\'ll confirm availability, share current pricing and lock in your start date if you want a monthly plan.',
    },
  ];

  return (
    <section id="faq" className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.35} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-12">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageCircle size={12} /> Frequently Asked Questions
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            Quick <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">Answers</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base leading-relaxed font-light">
            Everything you'd ask before choosing Swamy's as your everyday meal partner.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.04)}
          className="space-y-3">
          {faqs.map((f, i) => (
            <motion.details key={i} variants={fadeUp}
              className="group bg-[#FAF6ED] rounded-2xl border border-[#C9A227]/25 shadow-md overflow-hidden">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-[#FFF8E7] transition-colors">
                <h3 className="font-bold text-[#6D071A] text-sm sm:text-base font-display leading-snug">
                  {f.q}
                </h3>
                <ChevronRight size={18} className="text-[#B8922E] flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent mb-3" />
                <p className="text-sm text-[#6D071A]/80 leading-relaxed font-light">{f.a}</p>
              </div>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10. FINAL CTA ───────────────────────── */

function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section id="order" className="relative py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80"
          alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A0612]/95 via-[#2A030A]/85 to-[#1E0207]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/40 via-transparent to-[#1E0207]/40" />
      </div>
      <KuthuvilakkuLamp className="absolute -bottom-6 -left-4 pointer-events-none hidden md:block z-[1]" height={240} opacity={0.08} />
      <KuthuvilakkuLamp className="absolute -bottom-6 -right-4 pointer-events-none hidden md:block z-[1] scale-x-[-1]" height={240} opacity={0.08} />
      <KolamPattern className="absolute inset-0 z-[1] pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#6D071A]/55 border border-[#C9A227]/35 backdrop-blur-md text-[#FAF6ED] text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
            <Sparkles size={12} className="text-[#E5C158]" /> Ready when you are
          </motion.span>

          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAF6ED] mb-5 font-display leading-[1.1]">
            Looking for reliable <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF6ED] via-[#F5E9C8] to-[#E5C158]">home-style meals</span>
            <br className="hidden sm:block" /> around Velachery?
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#FAF6ED]/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-9 font-light">
            Send us a WhatsApp or give us a call. We'll confirm today's availability
            or set you up with a monthly plan — whichever fits your routine.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base border border-[#C9A227]/35">
              <MessageCircle size={17} />
              WhatsApp Us Now
              <ArrowRight size={16} />
            </a>
            <a href={`tel:${PHONE_PRIMARY}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base">
              <Phone size={17} className="text-[#C9A227]" />
              {PHONE_PRIMARY_DISPLAY}
            </a>
            <button onClick={() => navigate('/menu')}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base">
              <UtensilsCrossed size={17} className="text-[#C9A227]" />
              View Menu
            </button>
          </motion.div>

          {/* Trust mini-strip */}
          <motion.div variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-[#FAF6ED]/75">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.08] font-semibold">
              <Phone size={11} className="text-[#C9A227]" /> {PHONE_PRIMARY_DISPLAY}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.08] font-semibold">
              <Phone size={11} className="text-[#C9A227]" /> {PHONE_SECONDARY_DISPLAY}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.08] font-semibold">
              <MapPin size={11} className="text-[#C9A227]" /> Velachery · Chennai
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── SEO + PAGE WRAPPER ───────────────────────── */

export default function MealsPage() {
  const [cats, setCats] = useState(() => groupItemsByCategory(localData));

  const loadData = useCallback(async () => {
    try {
      const r = await fetch(RAW_URL);
      if (!r.ok) return;
      const items = await r.json();
      setCats(groupItemsByCategory(items));
    } catch (e) {
      console.error('Failed to fetch menu data:', e);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Update document metadata for SEO on mount
  useEffect(() => {
    document.title = "Home-Style Daily & Monthly Meals in Velachery · Swamy's Mess";

    const setMeta = (name, content, attr = 'name') => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description',
      'Daily meals, monthly food subscriptions and homestyle tiffin in Velachery, Chennai. Fresh South Indian breakfast, lunch & dinner for bachelors, working professionals, students and families.');
    setMeta('keywords',
      'daily meals Velachery, monthly meals Velachery, tiffin service Velachery, home style food, homemade food, monthly food for bachelors, food for working professionals, PG food Velachery, Swamys Mess meals');
    setMeta('og:title',       'Home-Style Daily & Monthly Meals in Velachery · Swamys Mess', 'property');
    setMeta('og:description', 'Fresh, homestyle South Indian meals — daily or monthly. Built for bachelors, professionals, students and families around Velachery.', 'property');
    setMeta('og:type',        'website', 'property');
    setMeta('og:url',         `${window.location.origin}/meals`, 'property');

    return () => {
      document.title = "Swamy's Mess & Catering | Authentic South Indian Food · Chennai";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#4A0612] text-[#FAF6ED]">
      <Navbar />

      <main>
        <Hero cats={cats} />
        <MealOptions cats={cats} />
        <WhoThisIsFor />
        <WhatYouGet cats={cats} />
        <MenuPreview cats={cats} />
        <CateringConnection />
        <HowItWorks />
        <ServiceArea />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </motion.div>
  );
}
