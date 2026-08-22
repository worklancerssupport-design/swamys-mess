// ============================================
// Navbar — Premium luxury sticky nav
// Frosted glass, deep burgundy & metallic gold
// ============================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, UtensilsCrossed, BookOpen } from 'lucide-react';

const navLinks = [
  { label: 'Menu',     href: '#menu'     },
  { label: 'Catering', href: '#catering' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar({ onBookCatering }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);

      // Active-section detection
      const sectionIds = ['contact', 'catering', 'menu'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 130) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookCatering = () => {
    setMobileOpen(false);
    onBookCatering?.();
  };

  const isActive = (href) => activeSection === href.replace('#', '');

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[#6D071A]/95 backdrop-blur-md shadow-xl border-b border-[#C9A227]/25'
            : 'bg-[#4A0612]/90 border-b border-[#B8922E]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <motion.a
              href="#menu"
              onClick={(e) => { e.preventDefault(); handleNavClick('#menu'); }}
              className="flex items-center gap-2.5 group flex-shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B1025] to-[#6D071A] flex items-center justify-center shadow-md border border-[#C9A227]/40">
                  <UtensilsCrossed size={16} className="text-[#FAF6ED]" />
                </div>
                {/* Gold glow ring on hover */}
                <div className="absolute inset-0 rounded-xl bg-[#C9A227]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
              <div className="leading-tight">
                <p
                  className="font-bold text-sm lg:text-base tracking-wider text-[#FAF6ED] font-display"
                >
                  Swamy's
                </p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A227] font-semibold">
                  Mess & Catering
                </p>
              </div>
            </motion.a>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-[#C9A227]'
                      : 'text-[#FAF6ED]/85 hover:text-[#C9A227] hover:bg-[#FAF6ED]/5'
                  }`}
                >
                  {link.label}
                  {/* Active underline dot */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C9A227] rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2">
              {/* Book Catering CTA */}
              <motion.button
                onClick={handleBookCatering}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(109,7,26,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-[#FAF6ED] text-xs sm:text-sm font-semibold rounded-xl shadow-md border border-[#C9A227]/30 transition-all"
              >
                <BookOpen size={13} className="text-[#C9A227]" />
                Book Catering
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-lg transition-colors text-[#FAF6ED] hover:bg-white/5"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mobileOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Scroll progress bar (Subtle gold) ── */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6D071A] via-[#C9A227] to-[#6D071A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#4A0612]/95 backdrop-blur-md border-t border-[#6D071A]/40"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive(link.href)
                        ? 'bg-[#6D071A]/40 text-[#C9A227]'
                        : 'text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/5'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                    )}
                  </motion.a>
                ))}
                <motion.button
                  onClick={handleBookCatering}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mt-2 w-full px-4 py-3 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-[#FAF6ED] text-sm font-semibold rounded-xl text-center shadow-md border border-[#C9A227]/30"
                >
                  Book Catering
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
