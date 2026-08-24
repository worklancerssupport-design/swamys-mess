// ============================================
// ContactForm — Franchise Enquiry
// Premium Luxury Design
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Loader2, User, Phone, Mail, MapPin, Wallet, MessageSquare } from 'lucide-react';
import axios from 'axios';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

const budgetOptions = [
  '₹5 Lakh – ₹10 Lakh',
  '₹10 Lakh – ₹20 Lakh',
  '₹20 Lakh – ₹50 Lakh',
  '₹50 Lakh+',
];

const EMPTY = { fullName: '', phone: '', email: '', city: '', budget: '', message: '' };

// Validation rules
function validate(form) {
  const e = {};
  if (!form.fullName.trim())                                e.fullName = 'Name is required';
  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))  e.phone    = 'Enter a valid 10-digit number';
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
  if (!form.city.trim())                                    e.city     = 'City is required';
  return e;
}

export default function ContactForm() {
  const [form,     setForm]     = useState(EMPTY);
  const [status,   setStatus]   = useState('idle'); 
  const [errors,   setErrors]   = useState({});
  const [serverErr,setServerErr] = useState('');

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(ev => ({ ...ev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    setServerErr('');

    const now = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });

    const payload = {
      access_key:  WEB3FORMS_KEY,
      subject:     `New Franchise Enquiry — ${form.fullName} (${form.city})`,
      from_name:   "Swamy's Mess Website",
      replyto:     form.email,
      message: `
New Franchise Enquiry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name             : ${form.fullName}
Phone            : ${form.phone}
Email            : ${form.email}
City             : ${form.city}
Investment Budget: ${form.budget || 'Not specified'}

Message:
${form.message || '(No message provided)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted At: ${now}
Source: Swamy's Mess Website — Franchise Enquiry Form
      `.trim(),
      'Full Name':        form.fullName,
      'Phone':            form.phone,
      'Email':            form.email,
      'City':             form.city,
      'Investment Budget': form.budget || 'Not specified',
      'Submitted At':     now,
    };

    try {
      const res = await axios.post('https://api.web3forms.com/submit', payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        timeout: 15000,
      });

      if (res.data?.success) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        throw new Error(res.data?.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      const msg = err?.response?.data?.message || err.message || '';
      if (msg.includes('access_key') || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setServerErr('Email not configured. Get your free key at web3forms.com and set VITE_WEB3FORMS_KEY in .env');
      } else {
        setServerErr('Failed to send. Please call us at +91 98765 43210 or try again later.');
      }
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center">
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-5 shadow-xl shadow-green-500/20 border border-green-400/25 animate-floatUp">
          <CheckCircle size={32} className="text-white" />
        </motion.div>
        <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="text-2xl font-bold text-[#6D071A] mb-2 font-display">
          Enquiry Sent!
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-[#6D071A]/70 mb-1 max-w-sm text-sm font-light">
          Thank you for your interest. Our franchise team will contact you within <strong>24 hours</strong>.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="text-xs text-[#6D071A]/40 mb-7">
          Email delivered to: worklancers.support@gmail.com
        </motion.p>
        <button onClick={() => setStatus('idle')}
          className="px-7 py-2.5 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white rounded-xl text-sm font-semibold hover:opacity-95 transition-all shadow-md border border-[#C9A227]/30">
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Row: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field name="fullName" label="Full Name" type="text"  icon={User}   value={form.fullName} onChange={handleChange} error={errors.fullName} disabled={sending} />
        <Field name="phone"    label="Phone"     type="tel"   icon={Phone}  value={form.phone}    onChange={handleChange} error={errors.phone}    disabled={sending} />
      </div>

      {/* Row: Email + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field name="email" label="Email Address" type="email" icon={Mail}   value={form.email} onChange={handleChange} error={errors.email} disabled={sending} />
        <Field name="city"  label="City"           type="text"  icon={MapPin} value={form.city}  onChange={handleChange} error={errors.city}  disabled={sending} />
      </div>

      {/* Budget */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D071A]/50 pointer-events-none">
          <Wallet size={15} />
        </div>
        <select name="budget" value={form.budget} onChange={handleChange} disabled={sending}
          className="w-full pl-10 pr-4 py-3.5 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:outline-none text-sm transition-all appearance-none cursor-pointer disabled:opacity-60 focus:ring-1 focus:ring-[#C9A227]/20 font-light">
          <option value="">Investment Budget (optional)</option>
          {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6D071A]/45 text-xs">▼</div>
      </div>

      {/* Message */}
      <div className="relative">
        <div className="absolute left-3.5 top-3.5 text-[#6D071A]/50 pointer-events-none">
          <MessageSquare size={15} />
        </div>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} disabled={sending}
          placeholder="Tell us about your plans, preferred location, or any questions..."
          className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] placeholder-[#6D071A]/40 focus:border-[#C9A227] focus:outline-none text-sm resize-none transition-all disabled:opacity-60 focus:ring-1 focus:ring-[#C9A227]/20 font-light" />
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverErr && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-750">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{serverErr}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button type="submit" disabled={sending}
        whileHover={!sending ? { scale: 1.02, boxShadow: '0 12px 35px rgba(109,7,26,0.15)' } : {}}
        whileTap={!sending ? { scale: 0.98 } : {}}
        className="w-full py-4 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold text-base rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 border border-[#C9A227]/30 disabled:opacity-70 disabled:cursor-not-allowed">
        {sending ? (
          <><Loader2 size={19} className="animate-spin text-[#C9A227]" />Sending Enquiry...</>
        ) : (
          <><Send size={17} />Send Franchise Enquiry</>
        )}
      </motion.button>

      <p className="text-center text-xs text-[#6D071A]/50 leading-relaxed">
        🔒 Your details are private and used only to respond to this enquiry.
      </p>
    </form>
  );
}

/* ── Animated floating-label input ── */
function Field({ name, label, type, icon: Icon, value, onChange, error, disabled }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div>
      <div className={`relative rounded-xl border transition-all duration-200 ${
        error         ? 'border-red-500' :
        focused       ? 'border-[#C9A227] ring-2 ring-[#C9A227]/10' :
        'border-[#B8922E]/25 hover:border-[#C9A227]/35'
      } bg-white overflow-hidden`}>

        {/* Icon */}
        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          focused ? 'text-[#C9A227]' : 'text-[#6D071A]/50'
        }`}>
          <Icon size={15} />
        </div>

        {/* Floating label */}
        <label htmlFor={name}
          className={`absolute left-10 pointer-events-none transition-all duration-200 font-medium ${
            active
              ? 'top-1.5 text-[10px] text-[#B8922E]'
              : 'top-1/2 -translate-y-1/2 text-sm text-[#6D071A]/45'
          }`}>
          {label}{name !== 'message' && name !== 'budget' ? ' *' : ''}
        </label>

        <input id={name} name={name} type={type} value={value} onChange={onChange}
          disabled={disabled} autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-10 pr-4 pt-5 pb-1.5 bg-transparent text-[#6D071A] text-sm focus:outline-none disabled:opacity-60" />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-700 font-semibold flex items-center gap-1">
          <AlertCircle size={10} />{error}
        </motion.p>
      )}
    </div>
  );
}
