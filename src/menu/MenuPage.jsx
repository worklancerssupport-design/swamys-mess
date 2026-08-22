// ============================================
// Menu Page — Hero + Category Tabs + Monthly Subscription
// Premium Luxury Design with Traditional Tamil Accents, Deity Watermarks & Diyas
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import Hero from './Hero';
import MenuSection from './MenuSection';
import { breakfastItems, dosaItems, lunchItems, dinnerItems, foodImages } from '../data/menuData';
import { KolamPattern, AuspiciousDivider, KuthuvilakkuLamp, BrassDiya, TempleBorderGold, VinayagarWatermark, FourDeitiesCorners } from '../navbar/Decorations';

export default function MenuPage({ onBookCatering }) {
  const [activeTab, setActiveTab] = useState('Breakfast');

  const tabs = [
    { id: 'Breakfast', label: 'Breakfast', icon: '🌅', items: breakfastItems, imageSrc: foodImages.breakfast },
    { id: 'Dosa Varieties', label: 'Dosa Varieties', icon: '🥞', items: dosaItems, imageSrc: foodImages.dosa },
    { id: 'Lunch', label: 'Lunch', icon: '☀️', items: lunchItems, imageSrc: foodImages.lunch },
    { id: 'Dinner', label: 'Dinner', icon: '🌙', items: dinnerItems, imageSrc: foodImages.dinner },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div>
      {/* Full-screen hero with carousel */}
      <Hero onBookCatering={onBookCatering} />

      {/* ── Monthly Food Subscription Section ── */}
      <section className="bg-[#4A0612] py-20 border-b border-[#C9A227]/25 relative overflow-hidden">
        {/* Subtle background food picture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.06] mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A0612]/95 to-[#2A030A]/95" />
        </div>

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-[#FAF6ED] rounded-[2rem] p-8 md:p-12 text-[#6D071A] relative overflow-hidden shadow-xl border border-[#C9A227]/30">
            {/* Traditional lamp and kolam inside subscription card */}
            <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.015} />
            <KuthuvilakkuLamp className="absolute bottom-2 right-4 pointer-events-none hidden md:block" height={160} opacity={0.04} />
            <BrassDiya className="absolute top-4 right-4 pointer-events-none z-10" size={32} opacity={0.25} />
            
            {/* Subtle Ganesha/Vinayagar watermark inside the card */}
            <VinayagarWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" size={240} opacity={0.05} />

            {/* Glow effect inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 text-[#B8922E] text-xs font-bold uppercase tracking-wider mb-4 border border-[#C9A227]/25">
                  <Sparkles size={12} /> Special Subscription Program
                </span>
                <h3 className="text-3xl font-extrabold mb-3 font-display leading-tight">
                  Monthly Food Subscription
                </h3>
                <p className="text-[#6D071A]/80 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                  Enjoy fresh, homestyle South Indian breakfast, lunch and dinner every day with our monthly food subscription. Prepared daily under clean, hygienic conditions.
                </p>
                <div className="mt-6 flex flex-wrap gap-y-2.5 gap-x-4 justify-center md:justify-start">
                  {['Pure Vegetarian', 'Zero Artificial Preservatives', 'Daily Menu Variations'].map(feat => (
                    <span key={feat} className="flex items-center gap-1.5 text-xs text-[#6D071A]/90 font-medium">
                      <CheckCircle2 size={14} className="text-[#B8922E]" /> {feat}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-80 flex-shrink-0 relative z-10">
                <div className="bg-[#FFF8E7] border border-[#C9A227]/25 rounded-2xl p-6 text-center shadow-md">
                  <p className="text-[10px] uppercase tracking-widest text-[#B8922E] font-bold">Unbeatable Value</p>
                  <p className="text-4xl font-black text-[#6D071A] mt-1.5 font-display">
                    ₹3,999
                    <span className="text-sm font-normal text-[#6D071A]/60"> / Month</span>
                  </p>
                  <p className="text-xs text-[#B8922E] font-semibold tracking-wider uppercase mt-2">3 Meals a Day</p>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-b border-[#C9A227]/20 py-3.5 text-xs">
                    <div>
                      <p className="text-[#6D071A]/55">Morning</p>
                      <p className="font-bold text-[#6D071A] mt-0.5">Breakfast</p>
                    </div>
                    <div className="border-l border-r border-[#C9A227]/20">
                      <p className="text-[#6D071A]/55">Afternoon</p>
                      <p className="font-bold text-[#6D071A] mt-0.5">Lunch</p>
                    </div>
                    <div>
                      <p className="text-[#6D071A]/55">Evening</p>
                      <p className="font-bold text-[#6D071A] mt-0.5">Dinner</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-5 w-full py-3.5 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white hover:opacity-95 active:scale-95 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 border border-[#C9A227]/30"
                  >
                    Enquire About Subscription
                    <ChevronRight size={14} />
                  </button>
                  <p className="text-[9px] text-[#6D071A]/40 mt-2.5">
                    *Self-pickup only. Terms and conditions apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu sections */}
      <section id="menu" className="bg-[#FAF6ED] py-16 sm:py-20 relative overflow-hidden border-b border-[#C9A227]/25">
        {/* Top Temple Gold Border */}
        <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.8} />

        {/* Repeating traditional Tamil Kolam pattern background */}
        <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.02} />

        {/* Traditional Four Deities Corners Layout Watermarks */}
        <FourDeitiesCorners layout="default" />

        {/* Background decorative glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#6D071A]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#8B1025]/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-[#B8922E] text-sm font-semibold tracking-widest uppercase mb-2">
              Our Menu
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6D071A] mb-3 flex items-center justify-center gap-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <BrassDiya className="hidden sm:inline-block" size={24} opacity={0.7} />
              Taste the Tradition
              <BrassDiya className="hidden sm:inline-block scale-x-[-1]" size={24} opacity={0.7} />
            </h2>
            
            {/* Elegant devotional line divider */}
            <AuspiciousDivider className="my-4" />

            <p className="text-[#6D071A]/70 max-w-xl mx-auto text-base font-light mt-4">
              Every dish cooked fresh with handpicked spices, traditional recipes,
              and a generous helping of love.
            </p>
          </motion.div>

          {/* Category Tabs Bar */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-2xl mx-auto relative z-10">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold tracking-wide border transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white border-[#C9A227]/40 shadow-lg shadow-[#6D071A]/10'
                      : 'bg-[#FFF8E7] text-[#6D071A]/85 hover:text-[#B8922E] border-[#6D071A]/10 hover:border-[#B8922E]/35'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Render Active Category Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10"
            >
              <MenuSection
                category={activeTabData.id}
                icon={activeTabData.icon}
                items={activeTabData.items}
                imageSrc={activeTabData.imageSrc}
              />
            </motion.div>
          </AnimatePresence>

          <p className="text-center font-bold text-xl text-[#B8922E] my-6 mt-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            நன்றி! மீண்டும் வருக!
          </p>

        </div>

        {/* Bottom Temple Gold Border */}
        <TempleBorderGold className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.8} />
      </section>
    </div>
  );
}
