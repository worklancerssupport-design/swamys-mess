// ============================================
// Contact Page — Animated cards + Map + Form + Reviews
// Premium Luxury Overhaul with Traditional Kolam Backdrop, Deity Watermarks & Corners
// ============================================
import { motion } from 'motion/react';
import {
  MapPin, Phone, MessageCircle, Mail, Clock,
  ExternalLink, ArrowUpRight
} from 'lucide-react';
import ContactForm from './ContactForm';
import ReviewForm  from './ReviewForm';
import { KolamPattern, BrassDiya, TempleBorderGold, FourDeitiesCorners } from '../navbar/Decorations';

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['6, Sapthagiri St, Baby Nagar', 'Velachery, Chennai – 600042'],
    action: 'https://www.google.com/maps/search/?api=1&query=6,+Sapthagiri+St,+Baby+Nagar,+Velachery,+Chennai,+Greater+Chennai,+Tamil+Nadu+600042',
    actionLabel: 'Get Directions',
    gradient: 'from-[#8B1025] to-[#6D071A]',
    bg: 'bg-white',
    iconColor: 'text-[#FAF6ED]',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 94456 78901'],
    action: 'tel:+919876543210',
    actionLabel: 'Call Now',
    gradient: 'from-[#8B1025] to-[#6D071A]',
    bg: 'bg-white',
    iconColor: 'text-[#FAF6ED]',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    lines: ['+91 98765 43210', '8 AM – 9 PM'],
    action: 'https://wa.me/919876543210',
    actionLabel: 'Chat Now',
    gradient: 'from-[#C9A227] to-[#B8922E]',
    bg: 'bg-white',
    iconColor: 'text-[#FAF6ED]',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['worklancers.support@gmail.com'],
    action: 'mailto:worklancers.support@gmail.com',
    actionLabel: 'Send Email',
    gradient: 'from-[#8B1025] to-[#6D071A]',
    bg: 'bg-white',
    iconColor: 'text-[#FAF6ED]',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon–Fri: 6 AM – 10 PM', 'Sat: 6 AM – 11 PM', 'Sun: 7 AM – 10 PM'],
    action: null,
    gradient: 'from-[#8B1025] to-[#6D071A]',
    bg: 'bg-white',
    iconColor: 'text-[#FAF6ED]',
    badge: 'Open Now',
  },
];

export default function ContactPage() {
  return (
    <section id="contact" className="bg-[#FAF6ED] relative overflow-hidden border-b border-[#C9A227]/25 py-16">
      {/* Top Temple Gold Border */}
      <TempleBorderGold className="absolute top-0 left-0 right-0 z-10" opacity={0.8} />

      {/* Repeating traditional Tamil Kolam pattern background */}
      <KolamPattern className="absolute inset-0 pointer-events-none" opacity={0.018} />

      {/* Traditional Four Deities Corners Layout Watermark (Shifted variant) */}
      <FourDeitiesCorners layout="shifted" />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Hero Banner ─────────────────────────── */}
      <div className="relative min-h-[44vh] sm:min-h-[52vh] flex items-center justify-center overflow-hidden rounded-t-[2.5rem] mx-4 border border-[#C9A227]/20 shadow-inner mt-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0612]/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6D071A]/40 border border-[#C9A227]/30 backdrop-blur-sm mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            <span className="text-[#FAF6ED] text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6ED] mb-4 font-display flex items-center justify-center gap-2"
          >
            <BrassDiya className="hidden sm:inline-block" size={24} opacity={0.7} />
            Let's Serve{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#B8922E]">You Better</span>
            <BrassDiya className="hidden sm:inline-block scale-x-[-1]" size={24} opacity={0.7} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#FAF6ED]/85 text-lg font-light"
          >
            Visit us, call us, or drop a message — we're always here.
          </motion.p>
        </div>
      </div>

      {/* ── Contact Cards ──────────────────────── */}
      <div className="relative z-10 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14 font-sans">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[#B8922E]/25 hover:border-[#C9A227] transition-all duration-300 group flex flex-col justify-between relative z-10"
                >
                  <div>
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#C9A227]/20`}>
                      <Icon size={18} className={card.iconColor} />
                    </div>

                    <div className="flex items-start justify-between gap-1 mb-2">
                      <h4 className="font-extrabold text-[#6D071A] text-sm font-display">{card.title}</h4>
                      {card.badge && (
                        <span className="flex items-center gap-1 text-[9px] bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#B8922E] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                          {card.badge}
                        </span>
                      )}
                    </div>

                    {card.lines.map((line, i) => (
                      <p key={i} className="text-xs text-[#6D071A]/70 leading-5 font-light">{line}</p>
                    ))}
                  </div>

                  {card.action && (
                    <a
                      href={card.action}
                      target={card.action.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs text-[#B8922E] font-bold hover:gap-2 transition-all hover:text-[#C9A227]"
                    >
                      {card.actionLabel}
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ── Map + Form ─────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 relative z-10">

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5">
                <p className="text-[#B8922E] text-xs font-semibold tracking-widest uppercase mb-1">Find Us</p>
                <h3 className="text-2xl font-bold text-[#6D071A] font-display">
                  Our Location
                </h3>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-80 border border-[#B8922E]/25 shadow-lg group">
                <iframe
                  title="Swamy's Mess & Catering Location"
                  src="https://maps.google.com/maps?q=6,%20Sapthagiri%20St,%20Baby%20Nagar,%20Velachery,%20Chennai,%20Greater%20Chennai,%20Tamil%20Nadu%20600042&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Address overlay */}
                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <div className="bg-[#FAF6ED]/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5 border border-[#C9A227]/25">
                    <div className="w-6 h-6 rounded-lg bg-[#6D071A] flex items-center justify-center flex-shrink-0">
                      <MapPin size={12} className="text-[#FAF6ED]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6D071A] font-display">Swamy's Mess & Catering</p>
                      <p className="text-[10px] text-[#6D071A]/70 font-light">6, Sapthagiri St, Baby Nagar, Velachery, Chennai</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=6,+Sapthagiri+St,+Baby+Nagar,+Velachery,+Chennai,+Greater+Chennai,+Tamil+Nadu+600042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-[#B8922E] hover:text-[#C9A227] font-semibold hover:underline"
              >
                <ExternalLink size={13} />
                Get Directions on Google Maps
              </a>
            </motion.div>

            {/* Franchise Enquiry */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B8922E]/25 shadow-lg flex flex-col justify-between relative z-10"
            >
              <div>
                <div className="mb-6 pt-1 relative">
                  {/* Decorative Diya in the upper corner of the card */}
                  <BrassDiya className="absolute top-0 right-0 pointer-events-none" size={28} opacity={0.25} />
                  
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-block w-5 h-0.5 bg-[#C9A227] rounded" />
                    <p className="text-[#B8922E] text-xs font-bold tracking-widest uppercase font-sans">Franchise</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#6D071A] mb-2 font-display">
                    Franchise Enquiry
                  </h3>
                  <p className="text-sm text-[#6D071A]/70 leading-relaxed font-light">
                    Interested in opening your own Swamy's Mess & Catering branch? Fill the form and our team will reach out within 24 hours.
                  </p>
                </div>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Low Investment', 'Full Training', 'Brand Support', 'Proven Model'].map(chip => (
                    <span key={chip} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C9A227]/10 text-[#6D071A] text-[11px] font-semibold rounded-full border border-[#C9A227]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                      {chip}
                    </span>
                  ))}
                </div>

                <ContactForm />
              </div>
            </motion.div>
          </div>

          {/* ── Reviews ──────────────────────────── */}
          <div className="pt-4 relative z-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6D071A]/10 border border-[#6D071A]/20 rounded-full mb-3"
              >
                <span className="text-[#6D071A] text-xs font-bold tracking-widest uppercase font-sans">Customer Reviews</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-[#6D071A] mb-3 font-display"
              >
                What Our Guests Say
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#6D071A]/70 max-w-md mx-auto text-sm font-light"
              >
                Real experiences from verified customers — unfiltered and honest.
              </motion.p>
            </div>
            <ReviewForm />
          </div>
        </div>
      </div>

      {/* Bottom Temple Gold Border */}
      <TempleBorderGold className="absolute bottom-0 left-0 right-0 z-10 scale-y-[-1]" opacity={0.8} />
    </section>
  );
}
