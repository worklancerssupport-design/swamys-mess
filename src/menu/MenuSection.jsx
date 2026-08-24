// ============================================
// MenuSection — Category Section Header & Responsive Cards Grid
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Utensils, ChevronDown, ChevronUp } from 'lucide-react';
import FoodCard from './FoodCard';

const categoryMeta = {
  Breakfast: {
    grad:    'from-[#C9A227] to-[#B8922E]',
    bgLight: 'from-[#6D071A] to-[#4A0612]',
    border:  'border-[#C9A227]/30',
    time:    '6 AM – 11 AM',
    tagline: 'Authentic homestyle traditional breakfast',
  },
  'Dosa Varieties': {
    grad:    'from-[#C9A227] to-[#B8922E]',
    bgLight: 'from-[#6D071A] to-[#4A0612]',
    border:  'border-[#C9A227]/30',
    time:    '6 AM – 11 AM & 6 PM – 10 PM',
    tagline: 'Crispy, hot, and traditional South Indian crepes',
  },
  Lunch: {
    grad:    'from-[#C9A227] to-[#B8922E]',
    bgLight: 'from-[#6D071A] to-[#4A0612]',
    border:  'border-[#C9A227]/30',
    time:    '11 AM – 4 PM',
    tagline: 'Wholesome, traditional meals made fresh daily',
  },
  Dinner: {
    grad:    'from-[#C9A227] to-[#B8922E]',
    bgLight: 'from-[#6D071A] to-[#4A0612]',
    border:  'border-[#C9A227]/30',
    time:    '6 PM – 10 PM',
    tagline: 'Evening comfort food done right',
  },
};

export default function MenuSection({ category, items, imageSrc }) {
  const [showAll, setShowAll] = useState(false);
  const meta    = categoryMeta[category] || categoryMeta.Breakfast;
  const INITIAL = 8;
  const visible  = showAll ? items : items.slice(0, INITIAL);
  const hasMore  = items.length > INITIAL;

  return (
    <div className="mb-20 sm:mb-24">

      {/* ── Header card (Deep Burgundy inside Ivory Section) ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${meta.bgLight} border ${meta.border} mb-10 shadow-lg`}
      >
        {/* Blurred background photo */}
        {imageSrc && (
          <div className="absolute inset-0 z-0">
            <img src={imageSrc} alt="" aria-hidden="true"
              className="w-full h-full object-cover opacity-[0.06] blur-sm scale-110"
              loading="lazy" />
          </div>
        )}

        {/* Gold top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

            {/* Left — title block */}
            <div>
                {/* Time chip */}
                <div className="inline-flex items-center gap-1.5 bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#C9A227] rounded-full px-2.5 py-0.5 mb-1.5">
                  <Clock size={10} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">{meta.time}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6ED] leading-none mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {category}
                </h2>
                <p className="text-sm text-[#FAF6ED]/70 italic font-light">{meta.tagline}</p>
              </div>

            {/* Right — thumbnail + item count */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-end">
              {/* Item count pill */}
              <div className="flex items-center gap-1.5 bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#C9A227] px-3 py-1.5 rounded-xl font-semibold text-xs">
                <Utensils size={11} />
                {items.length} dishes
              </div>

              {/* Thumbnail — desktop only */}
              {imageSrc && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="hidden sm:block w-36 h-24 lg:w-44 lg:h-28 rounded-xl overflow-hidden shadow-xl flex-shrink-0 border border-[#C9A227]/30"
                >
                  <img src={imageSrc} alt={`${category} specials`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy" />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
      </motion.div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {visible.map((item, idx) => (
          <FoodCard key={item.id} item={item} index={idx} />
        ))}
      </div>

      {/* ── Show more / less button (Cream bg, Red text, Gold border) ── */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            onClick={() => setShowAll(v => !v)}
            whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(109,7,26,0.1)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full border-2 border-[#C9A227] bg-[#FAF6ED] text-[#6D071A] text-sm font-bold hover:bg-[#FFF8E7] transition-all duration-200 shadow-md"
          >
            <AnimatePresence mode="wait">
              <motion.span key={showAll ? 'less' : 'more'}
                initial={{ opacity: 0, y: showAll ? 4 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5">
                {showAll
                  ? <><ChevronUp size={15} /> Show Less</>
                  : <><ChevronDown size={15} /> Show All {items.length} Dishes</>}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
