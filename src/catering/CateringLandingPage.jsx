// ============================================
// Catering Landing Page — /catering SEO Route
// Targets: catering Velachery, vegetarian catering, home function catering,
// small function catering, office catering, small party catering.
// ============================================
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, MessageCircle, ArrowRight, MapPin, CheckCircle2,
  Sparkles, UtensilsCrossed, Calendar, Users, Star, Quote,
  ChevronRight, IndianRupee, Heart, ShieldCheck, ChefHat,
  Cake, Building2, PartyPopper, Home as HomeIcon, Leaf,
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

const PHONE_PRIMARY = '+919360671134';
const PHONE_PRIMARY_DISPLAY = '+91 93606 71134';
const PHONE_SECONDARY_DISPLAY = '+91 74483 62352';
const WHATSAPP_HREF = 'https://wa.me/919360671134';
const ADDRESS_LINE = '6, Sapthagiri St, Annai Indra Nagar, Baby Nagar, Velachery, Chennai – 600042';
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

/* ───────────────────────── 1. HERO ───────────────────────── */

function Hero({ cateringCats }) {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-b border-[#C9A227]/25">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80"
          alt="Catering spread"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-[#2A030A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/55 via-transparent to-transparent" />
        <GopuramSilhouette className="absolute bottom-0 left-0 right-0 opacity-20" />
      </div>

      <KuthuvilakkuLamp className="absolute -bottom-6 -left-4 pointer-events-none hidden md:block z-[1]" height={260} opacity={0.07} />
      <KuthuvilakkuLamp className="absolute -bottom-6 -right-4 pointer-events-none hidden md:block z-[1] scale-x-[-1]" height={260} opacity={0.07} />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6D071A]/45 border border-[#C9A227]/30 backdrop-blur-sm mb-6"
        >
          <Leaf size={13} className="text-[#C9A227]" />
          <span className="text-[#C9A227] text-xs font-semibold tracking-widest uppercase">
            Pure Vegetarian · Home-Style
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FAF6ED] mb-5 leading-[1.05] font-display tracking-tight"
        >
          Catering Services{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] via-[#C9A227] to-[#B8922E]">
            in Velachery
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="text-[#FAF6ED]/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Reliable home-style vegetarian catering for functions, family gatherings,
          birthdays, housewarmings, and small events around Velachery &amp; nearby areas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none"
        >
          <a
            href={`${WHATSAPP_HREF}?text=${encodeURIComponent("Hi, I'd like to enquire about catering for an event.")}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base border border-[#C9A227]/30"
          >
            <MessageCircle size={17} className="text-[#C9A227]" />
            Enquire for Catering
            <ArrowRight size={16} />
          </a>
          <a
            href="/menu"
            onClick={(e) => { e.preventDefault(); navigate('/menu'); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
          >
            <UtensilsCrossed size={17} className="text-[#C9A227]" />
            View Menu
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs"
        >
          {[
            { icon: Sparkles,    label: 'Pure Vegetarian' },
            { icon: ShieldCheck, label: 'Hygienic Kitchen' },
            { icon: ChefHat,     label: 'Home-Style Taste' },
            { icon: Heart,       label: 'Flexible Menus' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#FAF6ED]/90 backdrop-blur-sm">
              <Icon size={12} className="text-[#C9A227]" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Floating trust strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/35 backdrop-blur-md border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2 sm:gap-x-12 text-[#FAF6ED]/95">
          <div className="hidden sm:flex items-center gap-2">
            <Star size={14} className="text-[#C9A227] fill-[#C9A227]" />
            <div>
              <p className="font-bold text-white text-sm leading-none">18+ Years</p>
              <p className="text-[#FAF6ED]/60 text-[10px] mt-0.5">In Velachery</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-[#C9A227]" />
            <div>
              <p className="font-bold text-white text-sm leading-none">Small to Large</p>
              <p className="text-[#FAF6ED]/60 text-[10px] mt-0.5">Guest Counts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Leaf size={14} className="text-[#C9A227]" />
            <div>
              <p className="font-bold text-white text-sm leading-none">100% Veg</p>
              <p className="text-[#FAF6ED]/60 text-[10px] mt-0.5">Pure Vegetarian</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. SMALL FUNCTION CATERING (HIGHLIGHT) ───────────────────────── */

function SmallFunction() {
  const points = [
    {
      icon: Users,
      title: 'Smaller Guest Counts',
      desc: 'Perfect for 20–50 guests. Intimate gatherings where quality matters more than quantity.',
    },
    {
      icon: HomeIcon,
      title: 'Home Functions',
      desc: 'We bring the food to your home or venue. No hassle of cooking or supervising a kitchen.',
    },
    {
      icon: Heart,
      title: 'Family Gatherings',
      desc: 'Annadams, family get-togethers, milestone birthdays, and reunion meals.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Simple Event Meals',
      desc: 'Straightforward, homestyle menus — exactly what your guests expect at a small function.',
    },
    {
      icon: Sparkles,
      title: 'Menu Selection',
      desc: 'Pick from our catering occasions menu. Mix and match dishes based on what your guests enjoy.',
    },
    {
      icon: MessageCircle,
      title: 'Easy to Enquire',
      desc: 'A quick WhatsApp or call is all it takes. Tell us your guest count and date — we handle the rest.',
    },
  ];

  return (
    <section className="relative bg-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      {/* Subtle food image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.06] mix-blend-overlay"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A030A] via-[#2A030A]/95 to-[#2A030A]" />
      </div>

      {/* Gold corner glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A227]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
            className="lg:col-span-5">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
              <HomeIcon size={12} /> Small &amp; Home Functions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-5 font-display leading-tight">
              Catering for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
                Small Functions
              </span>
              {' '}in Velachery
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#FAF6ED]/80 text-sm sm:text-base leading-relaxed font-light mb-5">
              Most caterers only want large wedding orders. We built our catering service around the
              reality that most family events in Velachery are smaller, intimate gatherings — and that's
              exactly where we shine.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base leading-relaxed font-light mb-7">
              If you need food for a home function, a family ritual, a small birthday celebration or a
              quiet gathering, we'll treat it with the same care as a grand wedding — just the right
              portions for your guest count.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href={`${WHATSAPP_HREF}?text=${encodeURIComponent("Hi, I need catering for a small function. Please share details.")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold text-sm rounded-xl shadow-lg border border-[#C9A227]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle size={15} className="text-[#C9A227]" />
                Enquire Now
              </a>
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-[#FAF6ED] font-bold text-sm rounded-xl hover:bg-white/10 transition-all"
              >
                <Phone size={15} className="text-[#C9A227]" />
                {PHONE_PRIMARY_DISPLAY}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.05)}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <motion.div
                key={p.title} variants={fadeUp}
                className="bg-[#FAF6ED] rounded-2xl border border-[#B8922E]/25 p-5 shadow-md hover:border-[#C9A227] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFF8E7] border border-[#C9A227]/25 flex items-center justify-center mb-3">
                  <p.icon size={18} className="text-[#B8922E]" />
                </div>
                <h3 className="font-extrabold text-[#6D071A] text-sm sm:text-base font-display mb-1.5">
                  {p.title}
                </h3>
                <p className="text-[#6D071A]/70 text-xs sm:text-sm leading-relaxed font-light">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. CATERING OPTIONS / MENU ───────────────────────── */

function CateringMenu({ cats }) {
  const navigate = useNavigate();
  const cateringItems = cats.find(c => c.name === 'Catering')?.items || [];

  return (
    <section id="catering-menu" className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.3} />
      <VinayagarWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" size={420} opacity={0.04} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.025} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <UtensilsCrossed size={12} /> Events We Cater For
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            What We{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              Cater For
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Every occasion below is something we currently cater for. Tell us your event — we'll plan a
            menu around it. All catering pricing is discussed based on menu, guest count, and service.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.03)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {cateringItems.map((it) => (
            <motion.article
              key={it.id} variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group bg-[#FAF6ED] rounded-2xl border border-[#B8922E]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all overflow-hidden flex flex-col"
            >
              {it.image_url && (
                <div className="h-44 overflow-hidden bg-[#4A0612] relative">
                  <img
                    src={it.image_url} alt={it.item}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#6D071A]/85 border border-[#C9A227]/30 text-[#FAF6ED] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Leaf size={10} className="text-[#C9A227]" />
                    Veg
                  </span>
                </div>
              )}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="font-extrabold text-[#6D071A] text-base sm:text-lg font-display leading-tight mb-2">
                  {it.item}
                </h3>
                <p className="text-[#6D071A]/75 text-xs sm:text-sm leading-relaxed font-light flex-1">
                  {it.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Leaf,    title: '100% Vegetarian', desc: 'Every dish is pure vegetarian — no onion/garlic variants available on request.' },
            { icon: ChefHat, title: 'Custom Menus',    desc: 'Mix items from different occasions to build your perfect spread.' },
            { icon: Users,   title: 'Any Group Size',  desc: 'From a quiet 20-guest family function to 200+ guest events.' },
          ].map((c) => (
            <div key={c.title} className="p-5 rounded-2xl bg-[#FAF6ED] border border-[#C9A227]/25 text-center shadow-sm">
              <c.icon size={20} className="text-[#B8922E] mx-auto mb-2" />
              <h4 className="font-bold text-[#6D071A] text-sm font-display mb-1">{c.title}</h4>
              <p className="text-[#6D071A]/70 text-xs leading-relaxed font-light">{c.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base border border-[#C9A227]/30"
          >
            <UtensilsCrossed size={17} className="text-[#C9A227]" />
            View Full Menu
            <ArrowRight size={16} />
          </button>
          <p className="text-[#FAF6ED]/55 text-xs mt-3 font-light">
            Opens our virtual menu book with every dish we serve.
          </p>
        </motion.div>
      </div>

      <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.3} />
    </section>
  );
}

/* ───────────────────────── 4b. MEALS CONNECTION CTA ───────────────────────── */

function MealsConnection() {
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
              <Calendar size={12} /> Daily &amp; Monthly Meals
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
              View Daily &amp; Monthly Meals <ArrowRight size={16} />
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

/* ───────────────────────── 5. GUEST COUNT / PLANNING ───────────────────────── */

function GuestPlanning() {
  const tiers = [
    { range: '20',   label: 'Intimate',    desc: 'Home gatherings, small poojas, close family',        Icon: HomeIcon },
    { range: '30',   label: 'Cozy',        desc: 'Birthday lunches, engagement at home, Seemantham',  Icon: Heart },
    { range: '50',   label: 'Family',      desc: 'Anniversary celebrations, housewarming functions',  Icon: Cake },
    { range: '100+', label: 'Community',   desc: 'Temple events, receptions, larger ceremonies',      Icon: Building2 },
  ];

  return (
    <section className="relative bg-[#4A0612] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <Users size={12} /> Guest Count Planning
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            Catering for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              Every Group Size
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Tell us your guest count and we'll plan a menu that fits perfectly — no over-ordering,
            no shortages. Every event is sized for your actual gathering.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.05)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {tiers.map((t, i) => (
            <motion.div
              key={t.label} variants={fadeUp}
              whileHover={{ y: -6 }}
              className="relative bg-[#FAF6ED] rounded-2xl border border-[#C9A227]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all p-6 sm:p-7 text-center overflow-hidden"
            >
              {/* Step number */}
              <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase text-[#B8922E]/40">
                Step {i + 1}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D071A] to-[#8B1025] border border-[#C9A227]/30 flex items-center justify-center mb-4 mx-auto shadow-md">
                <t.Icon size={22} className="text-[#C9A227]" />
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#6D071A] font-display">{t.range}</span>
                {t.range !== '100+' && <span className="text-sm text-[#6D071A]/60 font-semibold">guests</span>}
              </div>
              <h3 className="font-bold text-[#6D071A] text-sm font-display uppercase tracking-wider mb-2">
                {t.label}
              </h3>
              <p className="text-[#6D071A]/70 text-xs sm:text-sm leading-relaxed font-light">
                {t.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center text-[#FAF6ED]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light"
        >
          Menu selection, dish quantities and pricing are all discussed based on your guest count.
          Reach out and we'll plan together.
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. WHY SWAMY'S FOR CATERING ───────────────────────── */

function WhySwamys() {
  const reasons = [
    {
      icon: ChefHat,
      title: 'Home-Style Taste',
      desc: 'Cooked the way you would at home — no shortcuts, no factory feel.',
    },
    {
      icon: Sparkles,
      title: 'Authentic South Indian',
      desc: 'Traditional Tamil Brahmin-style recipes, temple-food roots, and homestyle sambar & rasam.',
    },
    {
      icon: Leaf,
      title: '100% Vegetarian',
      desc: 'Every dish is pure vegetarian. Clean kitchen, strict hygiene, no cross-contamination.',
    },
    {
      icon: MapPin,
      title: 'Local Velachery Caterer',
      desc: 'Based in Baby Nagar, Velachery. We know the area, the timings and the venues.',
    },
    {
      icon: Heart,
      title: 'Great for Smaller Groups',
      desc: 'Most caterers chase 500-guest weddings. We actively welcome 20-to-100-guest functions.',
    },
    {
      icon: ShieldCheck,
      title: 'Established Since 18+ Years',
      desc: 'Two decades of feeding Velachery. We are not a pop-up — we are part of the neighbourhood.',
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.25} />
      <FourDeitiesCorners />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <CheckCircle2 size={12} /> Why Swamy's
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              Swamy's for Catering
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Practical reasons — not generic marketing claims. These are things our customers in
            Velachery already know about us.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.05)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title} variants={fadeUp}
              className="bg-[#FAF6ED] rounded-2xl border border-[#B8922E]/25 p-6 sm:p-7 shadow-md hover:border-[#C9A227] hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF8E7] border border-[#C9A227]/25 flex items-center justify-center flex-shrink-0">
                  <r.icon size={20} className="text-[#B8922E]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#6D071A] text-base font-display mb-1.5">
                    {r.title}
                  </h3>
                  <p className="text-[#6D071A]/75 text-xs sm:text-sm leading-relaxed font-light">
                    {r.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.25} />
    </section>
  );
}

/* ───────────────────────── 7. SERVICE AREA ───────────────────────── */

function ServiceArea() {
  const nearby = [
    'Velachery', 'Baby Nagar', 'Medavakkam', 'Madipakkam',
    'Pallikaranai', 'Ramapuram', 'Chromepet', 'Guindy',
    'Saidapet', 'Adyar', 'Sholinganallur', 'Manapakkam', 'Alandur', 'Kotturpuram',
  ];

  return (
    <section className="relative bg-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin size={12} /> Service Area
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-5 font-display leading-tight">
              Catering Around{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
                Velachery
              </span>{' '}
              &amp; Nearby Areas
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#FAF6ED]/80 text-sm sm:text-base leading-relaxed font-light mb-5">
              Our kitchen is centrally located in Velachery — perfect for serving functions,
              gatherings and events across south Chennai without long transit times.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base leading-relaxed font-light mb-7">
              We regularly cater for events in Velachery itself and nearby localities.
              If your function is in or around these areas, we can almost certainly help.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-start gap-3 p-5 rounded-2xl bg-[#FAF6ED] border border-[#C9A227]/25">
              <div className="w-10 h-10 rounded-lg bg-[#FFF8E7] border border-[#C9A227]/25 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-[#B8922E]" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#6D071A]/50">Our Kitchen</p>
                <p className="text-sm font-semibold text-[#6D071A] mt-0.5">{ADDRESS_LINE}</p>
                <a
                  href={MAPS_HREF} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#B8922E] font-semibold mt-2 hover:text-[#C9A227] transition-colors"
                >
                  View on Google Maps <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.03)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {nearby.map((name) => (
              <motion.div
                key={name} variants={fadeUp}
                whileHover={{ y: -3 }}
                className="bg-[#FAF6ED] rounded-xl border border-[#B8922E]/25 px-4 py-3.5 text-center shadow-sm hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <MapPin size={14} className="text-[#B8922E] mx-auto mb-1" />
                <p className="text-sm font-bold text-[#6D071A] font-display">{name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. CATERING PHOTOS ───────────────────────── */

function Gallery() {
  // Strong, event-focused imagery. Prioritises food quantities & serving arrangements.
  const photos = [
    { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80', alt: 'Catering spread' },
    { src: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=900&q=80', alt: 'Banana leaf meal' },
    { src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80', alt: 'South Indian thali' },
    { src: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=900&q=80', alt: 'Idly and chutney' },
    { src: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=900&q=80', alt: 'Dosa varieties' },
    { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&q=80', alt: 'Rice and sambar' },
  ];

  return (
    <section className="relative bg-[#4A0612] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.25} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} /> Our Food
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            A Glimpse of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              What We Cook
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Homestyle South Indian food, prepared fresh and served the way you'd expect at a function
            in Velachery.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.04)}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {photos.map((p, i) => (
            <motion.div
              key={i} variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C9A227]/25 shadow-md group"
            >
              <img
                src={p.src} alt={p.alt} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-widest uppercase text-[#FAF6ED]/90">
                {p.alt}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.25} />
    </section>
  );
}

/* ───────────────────────── 9. REVIEWS / SOCIAL PROOF ───────────────────────── */

function Reviews() {
  const reviews = [
    {
      name: 'Lakshmi R.',
      area: 'Velachery',
      text: 'Swamys catered for our Gruhapravesam. Food was exactly like home-cooked — fresh, hot, and on time. Guests still ask us about that sambar.',
      event: 'Gruhapravesam',
    },
    {
      name: 'Karthik M.',
      area: 'Medavakkam',
      text: 'We ordered for my daughter\'s Seemantham. Very professional and the menu was customised exactly the way my mother wanted.',
      event: 'Seemantham',
    },
    {
      name: 'Priya S.',
      area: 'Madipakkam',
      text: 'Booked Swamys for a small 30-guest family function. Most caterers don\'t even respond to small orders. These guys actually cared.',
      event: 'Family Function',
    },
    {
      name: 'Ramesh B.',
      area: 'Baby Nagar',
      text: 'Birthday party catering was spot on. Quantity was generous, taste was homestyle, and the team was responsive throughout.',
      event: 'Birthday Party',
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.025} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-14">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <Star size={12} /> Loved by Velachery
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            What Our Catering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              Customers Say
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.05)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reviews.map((r) => (
            <motion.article
              key={r.name} variants={fadeUp}
              className="bg-[#FAF6ED] rounded-2xl border border-[#B8922E]/25 p-6 shadow-md hover:border-[#C9A227] hover:shadow-xl transition-all flex flex-col"
            >
              <Quote size={28} className="text-[#C9A227]/40 mb-3" />
              <p className="text-[#6D071A]/85 text-xs sm:text-sm leading-relaxed font-light flex-1">
                "{r.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-[#C9A227]/15">
                <div className="flex items-center gap-1 text-[#C9A227] mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#C9A227]" />)}
                </div>
                <p className="font-extrabold text-[#6D071A] text-sm font-display">{r.name}</p>
                <p className="text-[#6D071A]/60 text-xs">{r.area} · {r.event}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10. FAQ ───────────────────────── */

function FAQ() {
  const faqs = [
    {
      q: 'Do you provide catering in Velachery?',
      a: 'Yes. We are based in Baby Nagar, Velachery and provide catering across Velachery and nearby areas in south Chennai. Send us a WhatsApp with your event details and we will respond quickly.',
    },
    {
      q: 'Do you cater for small functions?',
      a: 'Absolutely. Small and home functions — anywhere from 20 to 50 guests — are a big part of what we do. We treat them with the same care as larger events.',
    },
    {
      q: 'Do you provide home function catering?',
      a: 'Yes. We cater for home functions, family rituals, and intimate gatherings at your home or venue. Tell us the guest count and occasion — we will plan the rest.',
    },
    {
      q: 'What types of events do you cater for?',
      a: 'We currently cater for Valagapu, Temple Functions, Birthday Parties, Marriage Orders, Seemantham, Receptions, Engagement / Nichayathartham, Sadabhishekam / Poorthi Vizha, Ayush Homam / Namakaranam, Pooja & Gruhapravesam, Shashtiapthapoorthi, Bheema Ratha Shanthi and Sadhabhishekam. If your event is not on the list, just ask — we can usually help.',
    },
    {
      q: 'Do you provide vegetarian catering?',
      a: 'Yes — every dish we serve is pure vegetarian. Our kitchen follows strict vegetarian standards with no cross-contamination.',
    },
    {
      q: 'Can you cater for small groups?',
      a: 'Yes. We work with guest counts from 20 upwards. Smaller groups are not a problem for us — most of our catering work is for intimate family events.',
    },
    {
      q: 'Do you provide office or corporate catering?',
      a: 'Yes. We handle office lunches, corporate events and team meals around Velachery. Tell us your guest count and preferred menu.',
    },
    {
      q: 'How do I enquire about catering?',
      a: 'The fastest way is WhatsApp. Tell us your event type, guest count, date and venue. We will share a menu plan and discuss pricing based on your requirements.',
    },
    {
      q: 'Which areas around Velachery do you serve?',
      a: 'We serve Velachery itself and nearby areas including Medavakkam, Madipakkam, Pallikaranai, Tambaram, Chromepet, Guindy, Saidapet, Adyar, Sholinganallur and Perungalathur.',
    },
  ];

  return (
    <section className="relative bg-[#4A0612] py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
      <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.3} />
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger()}
          className="text-center mb-12">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageCircle size={12} /> Frequently Asked Questions
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-4 font-display leading-tight">
            Catering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              FAQs
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger(0.04)}
          className="space-y-3"
        >
          {faqs.map((f, i) => (
            <motion.details key={i} variants={fadeUp}
              className="group bg-[#FAF6ED] rounded-2xl border border-[#C9A227]/25 shadow-md overflow-hidden"
            >
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

/* ───────────────────────── 11. FINAL CTA ───────────────────────── */

function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden border-b border-[#C9A227]/25">
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
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-5">
            <Calendar size={12} /> Plan Your Event
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FAF6ED] mb-5 font-display leading-tight">
            Planning a Function{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] to-[#C9A227]">
              Around Velachery?
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#FAF6ED]/85 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Tell us your event type, your guest count, your date — we'll put together a homestyle
            menu plan and discuss the details with you directly.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto max-w-md mx-auto sm:max-w-none">
            <a
              href={`${WHATSAPP_HREF}?text=${encodeURIComponent("Hi, I'd like to enquire about catering for an event.")}`}
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base border border-[#C9A227]/30"
            >
              <MessageCircle size={17} className="text-[#C9A227]" />
              Enquire for Catering
              <ArrowRight size={16} />
            </a>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
              >
                <Phone size={15} className="text-[#C9A227]" />
                {PHONE_PRIMARY_DISPLAY}
              </a>
              <a
                href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/25 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
              >
                <MessageCircle size={15} className="text-[#C9A227]" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#FAF6ED]/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={11} className="text-[#C9A227]" /> Velachery · Chennai
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Leaf size={11} className="text-[#C9A227]" /> 100% Vegetarian
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ChefHat size={11} className="text-[#C9A227]" /> Home-Style
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart size={11} className="text-[#C9A227]" /> Small &amp; Large Events
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── SEO + PAGE WRAPPER ───────────────────────── */

function groupItemsByCategory(items) {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.category)) map.set(it.category, []);
    map.get(it.category).push(it);
  }
  return Array.from(map, ([name, items]) => ({ name, items }));
}

export default function CateringLandingPage() {
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

  useEffect(() => {
    document.title = 'Catering Services in Velachery | Pure Veg Home-Style · Swamy\'s Mess';

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
      'Pure vegetarian catering in Velachery for home functions, small gatherings, birthdays, housewarmings, weddings and corporate events. Home-style food, flexible menus, serving Velachery and nearby areas.');
    setMeta('keywords',
      'catering Velachery, vegetarian catering Velachery, home function catering Velachery, small function catering Velachery, small party catering Velachery, office catering Velachery, catering for small events Velachery, pure veg catering, Swamys Mess catering');
    setMeta('og:title',       'Catering Services in Velachery | Pure Veg Home-Style · Swamy\'s Mess', 'property');
    setMeta('og:description', 'Reliable home-style vegetarian catering for functions, small events, birthdays, housewarmings and corporate events around Velachery.', 'property');
    setMeta('og:type',        'website', 'property');
    setMeta('og:url',         `${window.location.origin}/catering`, 'property');

    return () => {
      document.title = "Swamy's Mess & Catering | Authentic South Indian Food · Chennai";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#4A0612] text-[#FAF6ED]"
    >
      <Navbar />

      <main>
        <Hero />
        <SmallFunction />
        <CateringMenu cats={cats} />
        <MealsConnection />
        <GuestPlanning />
        <WhySwamys />
        <ServiceArea />
        <Gallery />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </motion.div>
  );
}
