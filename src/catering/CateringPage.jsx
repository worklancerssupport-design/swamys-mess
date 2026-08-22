// ============================================
// Catering Page — Hero + Occasions Grid + Why Choose Us
// ============================================
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2, Phone, Star
} from 'lucide-react';
import { TempleBorderLine, KuthuvilakkuLamp, MuruganWatermark, BrassDiya, AuspiciousDivider } from '../navbar/Decorations';

/* Animated section divider */
function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent my-4"
    />
  );
}

const whyChooseUs = [
  {
    title: 'Authentic South Indian Taste',
    desc: 'Prepared by experienced chefs using stone-ground masalas and traditional recipes.',
  },
  {
    title: 'Customizable Menus',
    desc: 'Design your own menu. Choose number of sweets, starters, mains, and desserts.',
  },
  {
    title: 'Negotiable Pricing',
    desc: 'Flexible pricing models tailored to your budget and menu selection. All prices are negotiable.',
  },
  {
    title: 'Hygienic Preparation',
    desc: 'Strict food safety standards, freshly sourced ingredients, and clean cooking processes.',
  },
];

export default function CateringPage({ items, onBookCatering }) {
  if (!items?.length) return null;
  return (
    <section id="catering" className="bg-[#4A0612] overflow-hidden">

      {/* ── Hero Banner ──────────────────────── */}
      <div className="relative min-h-[70vh] sm:min-h-[78vh] flex items-center justify-center overflow-hidden border-b border-[#C9A227]/25">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80"
            alt="Catering event"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/45 via-transparent to-transparent" />
        </div>

        {/* Floating stats strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/5 backdrop-blur-md border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap justify-center gap-6 sm:gap-12">
            {[
              { value: '1000+', label: 'Events Served' },
              { value: '18+ Years',  label: 'Experience' },
              { value: '4.9/5',  label: 'Rating', icon: Star },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-[#FAF6ED]/95">
                {Icon && <Icon size={14} className="text-[#C9A227] fill-[#C9A227]" />}
                <div>
                  <p className="font-bold text-white text-base leading-none">{value}</p>
                  <p className="text-[#FAF6ED]/60 text-xs mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto pt-10 pb-28 sm:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6D071A]/40 border border-[#C9A227]/30 backdrop-blur-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            <span className="text-[#C9A227] text-xs font-semibold tracking-widest uppercase">
              A to Z Party Orders
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6ED] mb-5 leading-tight max-w-2xl mx-auto font-display"
          >
            Complete Catering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#B8922E]">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#FAF6ED]/90 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed font-light"
          >
            We undertake A-Z party orders for all your events. Menus can be fully customized according to your taste and guest requirements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-8 shadow-sm"
          >
            All Catering Prices Are Negotiable
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none"
          >
            <motion.button
              onClick={onBookCatering}
              whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(109,7,26,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold rounded-xl shadow-xl transition-all text-base border border-[#C9A227]/30"
            >
              <Phone size={16} className="text-[#C9A227]" />
              Book Catering
            </motion.button>
            <motion.a
              href="#occasions"
              onClick={(e) => { e.preventDefault(); document.getElementById('occasions')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-[#FAF6ED] font-bold rounded-xl hover:bg-white/10 transition-all text-base"
            >
              Explore Occasions
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── Occasions Grid ─────────────────────────── */}
      <div id="occasions" className="bg-gradient-to-b from-[#2A030A] via-[#4A0612] to-[#2A030A] py-16 sm:py-20 relative overflow-hidden border-b border-[#C9A227]/25">
        {/* Top Temple Border Line */}
        <TempleBorderLine className="absolute top-0 left-0 right-0 z-10" opacity={0.25} />

        {/* Subtle Murugan/Vel watermark layer in the background */}
        <MuruganWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" size={360} opacity={0.04} />

        {/* Background glow ornaments */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Traditional Lamps framing at margins */}
        <KuthuvilakkuLamp className="absolute left-4 top-20 pointer-events-none hidden lg:block" height={260} opacity={0.06} />
        <KuthuvilakkuLamp className="absolute right-4 top-20 pointer-events-none hidden lg:block scale-x-[-1]" height={260} opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#C9A227] text-sm font-semibold tracking-widest uppercase mb-2 font-sans"
            >
              Occasions We Serve
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6ED] mb-3 font-display flex items-center justify-center gap-2"
            >
              <BrassDiya className="hidden sm:inline-block" size={24} opacity={0.7} />
              Catering Occasions
              <BrassDiya className="hidden sm:inline-block scale-x-[-1]" size={24} opacity={0.7} />
            </motion.h2>

            <AuspiciousDivider className="my-4" />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#FAF6ED]/70 max-w-xl mx-auto text-base font-light mt-4"
            >
              We provide complete end-to-end food solutions for all traditional family events and milestones.
            </motion.p>
          </div>

          <Divider />

          {/* Occasions Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-[#FAF6ED] rounded-2xl border border-[#B8922E]/25 shadow-md hover:shadow-xl hover:border-[#C9A227] transition-all duration-300 overflow-hidden relative z-10"
              >
                {item.image_url && (
                  <div className="h-40 overflow-hidden bg-[#4A0612]">
                    <img
                      src={item.image_url}
                      alt={item.item}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="font-extrabold text-[#6D071A] text-base mb-1.5 font-display">
                    {item.item}
                  </h4>
                  <p className="text-[#6D071A]/70 text-xs sm:text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All prices negotiable banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-6 rounded-2xl bg-[#FAF6ED] border-2 border-[#C9A227] text-center shadow-lg max-w-2xl mx-auto relative z-10"
          >
            <p className="text-[#6D071A] text-lg font-bold font-display">
              📢 Note: All Catering Prices Are Fully Negotiable!
            </p>
            <p className="text-[#6D071A]/75 text-sm mt-1 font-light">
              Pricing is calculated based on menu items, guest counts, and special services. Speak directly to us for the best quote.
            </p>
          </motion.div>

        </div>

        {/* Bottom Temple Border Line */}
        <TempleBorderLine className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.25} />
      </div>

      {/* ── Why Choose Us ────────────────────── */}
      <div className="bg-[#2A030A] py-16 sm:py-20 relative overflow-hidden border-b border-[#C9A227]/25">
        {/* Subtle background spices image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.05] mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#2A030A]/90" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C9A227] text-sm font-semibold tracking-widest uppercase mb-2 font-sans">
              Why Us
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#FAF6ED] mb-3 font-display"
            >
              Why Choose Swamy's Catering?
            </h2>
            <Divider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 bg-[#FAF6ED] rounded-2xl border border-[#B8922E]/25 text-center shadow-md hover:border-[#C9A227] transition-all duration-300 relative z-10"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFF8E7] border border-[#C9A227]/25 text-[#B8922E] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="font-bold text-[#6D071A] text-base mb-2 font-display">
                  {item.title}
                </h4>
                <p className="text-[#6D071A]/70 text-xs sm:text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
