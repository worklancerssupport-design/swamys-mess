// ============================================
// FoodCard — Premium photo-first card
// White background, thin gold borders, deep burgundy text
// ============================================
import { useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, Award, Flame } from 'lucide-react';

/* ── tag → pill color ── */
const tagPill = {
  Popular:       'bg-[#B8922E]',
  Bestseller:    'bg-[#B8922E]',
  Premium:       'bg-[#C9A227]',
  'Must Try':    'bg-[#8B1025]',
  Sweet:         'bg-pink-800/80',
  'Full Meal':   'bg-emerald-800/85',
  Value:         'bg-teal-800/85',
  Combo:         'bg-violet-800/80',
  'Chef Special':'bg-[#6D071A]',
};

/* ── decoration tags ── */
const chefTags    = new Set(['Chef Special', 'Premium']);
const popularTags = new Set(['Bestseller', 'Popular', 'Must Try']);

export default function FoodCard({ item, index }) {
  const [imgError, setImgError] = useState(false);
  const isChef    = chefTags.has(item.tag);
  const isPopular = popularTags.has(item.tag);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.045, 0.35) }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#B8922E]/25 hover:border-[#C9A227] transition-all duration-300 cursor-default flex flex-col"
    >
      {/* ── Popular ribbon ── */}
      {isPopular && (
        <div className="absolute top-0 left-0 z-20">
          <div className="relative w-16 h-16 overflow-hidden">
            <div className="absolute -top-1 -left-1 w-[72px] h-[72px] bg-[#B8922E] rotate-45 origin-bottom-right" />
            <Flame size={12} className="absolute top-2 left-2 text-[#FAF6ED] z-10" />
          </div>
        </div>
      )}

      {/* ── Chef's Special badge ── */}
      {isChef && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-[#6D071A] text-[#FAF6ED] text-[9px] font-bold px-2 py-1 rounded-full shadow-lg border border-[#C9A227]/30">
          <Award size={9} className="text-[#C9A227]" />
          Chef's Special
        </div>
      )}

      {/* ── Photo ── */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-[#4A0612] flex-shrink-0">
        {!imgError ? (
          <img
            src={item.photo}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6D071A]/40 to-[#4A0612]/40 flex items-center justify-center">
            <span className="text-4xl opacity-30">🍽️</span>
          </div>
        )}

        {/* Bottom overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

        {/* Tag badge */}
        {item.tag && !isChef && !isPopular && (
          <span className={`absolute top-2.5 left-2.5 z-10 ${tagPill[item.tag] || 'bg-gray-600/90'} text-white text-[9px] font-bold tracking-wide px-2.5 py-0.5 rounded-full shadow border border-white/15`}>
            {item.tag}
          </span>
        )}

        {/* ── Price badge (overlapping seam) ── */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(index * 0.045, 0.35) + 0.15 }}
          className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-0.5 bg-[#6D071A] text-[#C9A227] font-extrabold text-sm px-2.5 py-1 rounded-full shadow-lg border border-[#C9A227]/30 group-hover:bg-[#C9A227] group-hover:text-[#6D071A] group-hover:border-[#C9A227] transition-colors duration-300"
        >
          <IndianRupee size={11} strokeWidth={2.5} />
          {item.price}
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 bg-white">
        <h4 className="font-bold text-[#6D071A] text-[15px] sm:text-[16px] leading-snug mb-1.5 group-hover:text-[#8B1025] transition-colors duration-200 font-display">
          {item.name}
        </h4>
        <p className="text-[12px] sm:text-[13px] text-[#6D071A]/70 leading-relaxed line-clamp-2 flex-1 font-light">
          {item.description}
        </p>

        {/* Footer row */}
        <div className="mt-4.5 pt-3 border-t border-[#6D071A]/10 flex items-center justify-between">
          <span className="text-[10px] text-[#6D071A]/50 italic">
            Fresh daily
          </span>
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-[10px] font-bold text-[#8B1025] opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wider uppercase"
          >
            Order now →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
