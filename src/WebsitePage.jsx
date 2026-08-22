// ============================================
// App — Root with premium loading screen + dark mode
// ============================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed } from 'lucide-react';
import Navbar      from './navbar/Navbar';
import Footer      from './navbar/Footer';
import BookCatering from './catering/BookCatering';
import MenuPage    from './menu/MenuPage';
import CateringPage from './catering/CateringPage';
import ContactPage  from './contact/ContactPage';
import PdfDownloadTestPage from './menu/PdfDownloadTestPage';

const ENV = import.meta.env;
const RAW_URL = `https://raw.githubusercontent.com/${ENV.VITE_GITHUB_OWNER}/${ENV.VITE_GITHUB_REPO}/${ENV.VITE_GITHUB_BRANCH}/${ENV.VITE_GITHUB_FILE_PATH}`;

async function fetchMenuData() {
  try {
    const r = await fetch(RAW_URL);
    if (!r.ok) return null;
    const items = await r.json();
    const map = new Map();
    for (const it of items) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it);
    }
    return Array.from(map, ([name, items]) => ({ name, items }));
  } catch (e) {
    console.error('Failed to fetch menu data:', e);
    return null;
  }
}

/* ── Premium Loading Screen ── */

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    const raf = () => {
      const p = Math.min(((Date.now() - start) / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(raf);
      else setTimeout(onDone, 200);
    };
    requestAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-amber-950 via-stone-950 to-amber-950 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl" />
      </div>

      {/* Decorative corner ornaments */}
      {['top-6 left-6 border-t border-l', 'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l', 'bottom-6 right-6 border-b border-r'].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 ${cls} border-amber-500/30`} />
      ))}

      {/* Logo + title */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'backOut' }}
        className="flex flex-col items-center relative z-10"
      >
        {/* Pulsing ring */}
        <div className="relative mb-5">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-3xl bg-orange-500/40 blur-md"
          />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40">
            <UtensilsCrossed size={36} className="text-white" />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-3xl font-bold text-white mb-1 text-center"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Swamy's
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-orange-400 text-xs tracking-[0.25em] uppercase mb-8"
        >
          Mess & Catering
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-48 sm:w-64"
        >
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p className="text-center text-white/30 text-[10px] mt-2 tracking-widest">
            Preparing your experience...
          </p>
        </motion.div>
      </motion.div>

      {/* Bouncing dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-12 flex gap-1.5"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.12 }}
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Main App ── */
export default function App() {
  const [loading,  setLoading]  = useState(true);
  const [cats, setCats] = useState([]);
  const [bookCateringOpen, setBookCateringOpen] = useState(false);
  const pdfTestMode = new URLSearchParams(window.location.search).has('pdf-test');

  const loadData = useCallback(async () => {
    const data = await fetchMenuData();
    if (data) setCats(data);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const menuCats = cats.filter(c => c.name !== 'Catering');
  const cateringItems = cats.find(c => c.name === 'Catering')?.items || [];

  return (
    <AnimatePresence mode="wait">
      {pdfTestMode ? (
        <PdfDownloadTestPage />
      ) : loading ? (
        <LoadingScreen key="loading" onDone={() => setLoading(false)} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[#4A0612] text-[#FAF6ED] transition-colors duration-300"
        >
          <Navbar
            onBookCatering={() => setBookCateringOpen(true)}
          />

          <main>
            <MenuPage cats={menuCats} onBookCatering={() => setBookCateringOpen(true)} />
            <CateringPage items={cateringItems} onBookCatering={() => setBookCateringOpen(true)} />
            <ContactPage  />
          </main>

          <BookCatering
            isOpen={bookCateringOpen}
            onClose={() => setBookCateringOpen(false)}
          />

          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
