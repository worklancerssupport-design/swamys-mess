// ============================================
// FoodCard — Premium photo-first card
// White background, thin gold borders, deep burgundy text
// ============================================
import { useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee } from 'lucide-react';

export default function FoodCard({ item, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.045, 0.35) }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#B8922E]/25 hover:border-[#C9A227] transition-all duration-300 cursor-default flex flex-col"
    >
      {/* ── Photo ── */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-[#4A0612] flex-shrink-0">
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

        {/* Bottom overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

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
          {item.item}
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
