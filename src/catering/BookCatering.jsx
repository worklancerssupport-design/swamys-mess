// ============================================
// BookCatering — Multi-step Catering Booking Modal
// Premium Luxury Design
// ============================================
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, ChevronLeft, ChevronRight, Download, Loader2, Mail, Phone, Send, User, Users, Calendar, MapPin, ClipboardList, MessageSquare, X } from 'lucide-react';
import axios from 'axios';
import { buildEnquiryPdfHtml } from '../utils/pdf/buildEnquiryPdfHtml';
import { downloadPdfFromHtml } from '../utils/pdf/downloadPdfFromHtml';

const bookingSteps = ['Event Details', 'Contact Details', 'Success'];

const DEFAULT_FORM = {
  functionType: '',
  guestCount: '',
  programDate: '',
  programLocation: '',
  fullName: '',
  email: '',
  phone: '',
  specialRequirements: '',
  notes: '', 
};

const FUNCTION_TYPES = [
  'Valagapu',
  'Temple Function',
  'Birthday Party',
  'Marriage',
  'Seemantham',
  'Reception',
  'Engagement',
  'Nichayathartham',
  'Sadabhishekam / Poorthi Vizha',
  'Ayush Homam / Namakaranam',
  'Pooja & Gruhapravesam',
  'Jatakarma & Namakarana',
  'Shashtiapthapoorthi',
  'Bheema Ratha Shanthi',
  'Sadhabhishekam',
  'Other',
];

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function BookCatering({ isOpen, onClose }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [completedForm, setCompletedForm] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); 
  const [submitStatus, setSubmitStatus] = useState('idle'); 
  const [submitError, setSubmitError] = useState('');
  const [pdfStatus, setPdfStatus] = useState('idle');

  // Prevent past dates
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!isOpen) return;
    setForm(DEFAULT_FORM);
    setCompletedForm(null);
    setShowToast(false);
    setErrors({});
    setStep(1);
    setSubmitStatus('idle');
    setSubmitError('');
    setPdfStatus('idle');
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Auto-hide success toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const err = {};
    if (!form.functionType) err.functionType = 'Please select a function type';
    if (!form.guestCount || Number(form.guestCount) <= 0) {
      err.guestCount = 'Please enter a valid guest count (greater than 0)';
    }
    if (!form.programDate) {
      err.programDate = 'Please select the program date';
    } else if (new Date(form.programDate) < new Date(todayStr)) {
      err.programDate = 'Program date cannot be in the past';
    }
    if (!form.programLocation.trim()) err.programLocation = 'Program location/venue is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep2 = () => {
    const err = {};
    if (!form.fullName.trim()) err.fullName = 'Full name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      err.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      err.email = 'Enter a valid email address';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setSubmitStatus('sending');
    setSubmitError('');

    // Step 2: Auto Generate & Download PDF
    try {
      const html = buildEnquiryPdfHtml({
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        functionType: form.functionType,
        guestCount: form.guestCount,
        programDate: form.programDate,
        programLocation: form.programLocation,
        specialRequirements: form.specialRequirements,
        notes: form.notes,
      });

      const sanitizedName = form.fullName.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
      const filename = `Swamys_Catering_Enquiry_${sanitizedName}.pdf`;
      await downloadPdfFromHtml(html, filename);
    } catch (pdfError) {
      console.error('PDF generation/download error:', pdfError);
      setSubmitError('Unable to generate the enquiry PDF. Please try again.');
      setSubmitStatus('error');
      return; // Do NOT continue to email sending
    }

    // Step 3: Send Email
    const now = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const formattedProgDate = formatDate(form.programDate);

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: "New Catering Enquiry - Swamy's Mess & Catering",
      from_name: "Swamy's Mess & Catering Website",
      replyto: form.email,
      message: `
NEW CATERING ENQUIRY

Customer Details
Name:
${form.fullName}
Phone:
${form.phone}
Email:
${form.email}

Event Details
Function:
${form.functionType}
Number of Guests:
${form.guestCount}
Program Date:
${formattedProgDate}
Program Location:
${form.programLocation}

Special Requirements:
${form.specialRequirements || 'None'}

Additional Message:
${form.notes || 'None'}

Submitted At:
${now}

Swamy's Mess & Catering
      `.trim(),
      'Full Name': form.fullName,
      'Phone': form.phone,
      'Email': form.email,
      'Function': form.functionType,
      'Number of Guests': form.guestCount,
      'Program Date': formattedProgDate,
      'Program Location': form.programLocation,
      'Special Requirements': form.specialRequirements || 'None',
      'Additional Message': form.notes || 'None',
      'Submitted At': now,
    };

    try {
      const response = await axios.post('https://api.web3forms.com/submit', payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        timeout: 15000,
      });

      if (response.data?.success) {
        setCompletedForm(form);
        setSubmitStatus('success');
        setShowToast(true);
        setStep(3);
        setForm(DEFAULT_FORM); // Reset form only after successful submission
      } else {
        throw new Error(response.data?.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitError("Your enquiry PDF has been downloaded, but we couldn't send the enquiry to our team. Please try submitting again.");
      setSubmitStatus('error');
    }
  };

  const handleDownloadPdf = async () => {
    const dataToUse = completedForm || form;
    if (!dataToUse.fullName) return;
    setPdfStatus('generating');
    try {
      const html = buildEnquiryPdfHtml({
        fullName: dataToUse.fullName,
        phone: dataToUse.phone,
        email: dataToUse.email,
        functionType: dataToUse.functionType,
        guestCount: dataToUse.guestCount,
        programDate: dataToUse.programDate,
        programLocation: dataToUse.programLocation,
        specialRequirements: dataToUse.specialRequirements,
        notes: dataToUse.notes,
      });

      const sanitizedName = dataToUse.fullName.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
      const filename = `Swamys_Catering_Enquiry_${sanitizedName}.pdf`;
      await downloadPdfFromHtml(html, filename);
      setPdfStatus('ready');
      setShowToast(true);
    } catch (error) {
      console.error('PDF generation error:', error);
      setPdfStatus('error');
    }
  };

  const visibleStepIdx = Math.min(step, bookingSteps.length) - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-3 py-4 backdrop-blur-sm sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden rounded-[2rem] border border-[#C9A227]/40 bg-[#FAF6ED] shadow-2xl"
          >
            {/* Top red header glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Symmetrical Animated Success Toast Popup */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto bg-[#6D071A] border-2 border-[#C9A227] text-[#FAF6ED] px-6 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-3"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-bold font-sans">
                    Catering Enquiry PDF Downloaded successfully!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col flex-1 min-h-0">
              {/* Modal Header */}
              <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-2xl font-extrabold text-[#6D071A] sm:text-3xl font-display"
                    >
                      Book Catering Services
                    </h2>
                    <p className="text-xs text-[#6D071A]/60 mt-1">
                      Customize your South Indian menu. Negotiable catering pricing.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#B8922E]/20 bg-white text-[#6D071A] hover:text-[#C9A227] hover:scale-105 active:scale-95 transition-all shadow-sm"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="mt-5 w-full">
                  <div className="flex items-center">
                    {bookingSteps.map((sName, idx) => {
                      const isCompleted = idx < visibleStepIdx;
                      const isCurrent = idx === visibleStepIdx;
                      const isUpcoming = idx > visibleStepIdx;

                      return (
                        <div key={sName} className="flex flex-1 items-start">
                          <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                            <div className="flex w-full items-center">
                              <div
                                className={`h-px flex-1 ${idx === 0 ? 'bg-transparent' : 'bg-[#B8922E]/10'}`}
                              />
                              <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                                  isCurrent
                                    ? 'border-[#C9A227] bg-[#6D071A] text-[#FAF6ED] shadow-md'
                                    : isCompleted
                                      ? 'border-[#B8922E]/50 bg-[#8B1025] text-white'
                                      : 'border-[#B8922E]/20 bg-white text-[#6D071A]/40'
                                }`}
                              >
                                {idx + 1}
                              </div>
                              <div
                                className={`h-px flex-1 ${idx < bookingSteps.length - 1 ? 'bg-[#B8922E]/10' : 'bg-transparent'}`}
                              />
                            </div>
                            <p
                              className={`mt-2 max-w-full truncate text-[10px] sm:text-[11px] font-semibold tracking-wide ${
                                isCurrent
                                  ? 'text-[#6D071A] font-bold'
                                  : isUpcoming
                                    ? 'text-[#6D071A]/40'
                                    : 'text-[#8B1025]'
                              }`}
                            >
                              {sName}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 max-w-xl mx-auto"
                    >
                      <h3 className="text-lg font-bold text-[#6D071A] mb-2 font-display">
                        Provide Your Event details
                      </h3>

                      {/* Dropdown for Function */}
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Function Type</span>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D071A]/60 pointer-events-none">
                            <ClipboardList size={16} />
                          </div>
                          <select
                            name="functionType"
                            value={form.functionType}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select occasion type...</option>
                            {FUNCTION_TYPES.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6D071A]/50 text-xs">▼</div>
                        </div>
                        {errors.functionType && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.functionType}</p>}
                      </label>

                      {/* Guests & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Number of Guests</span>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D071A]/60 pointer-events-none">
                              <Users size={16} />
                            </div>
                            <input
                              type="number"
                              name="guestCount"
                              placeholder="e.g. 150"
                              value={form.guestCount}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all"
                            />
                          </div>
                          {errors.guestCount && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.guestCount}</p>}
                        </label>

                        <label className="block">
                          <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Program Date</span>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D071A]/60 pointer-events-none">
                              <Calendar size={16} />
                            </div>
                            <input
                              type="date"
                              name="programDate"
                              min={todayStr}
                              value={form.programDate}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all"
                            />
                          </div>
                          {errors.programDate && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.programDate}</p>}
                        </label>
                      </div>

                      {/* Location */}
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Program Location / Venue</span>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-[#6D071A]/60 pointer-events-none">
                            <MapPin size={16} />
                          </div>
                          <textarea
                            name="programLocation"
                            rows={3}
                            placeholder="Complete address/venue name where the function will be held..."
                            value={form.programLocation}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all resize-none"
                          />
                        </div>
                        {errors.programLocation && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.programLocation}</p>}
                      </label>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 max-w-xl mx-auto"
                    >
                      <h3 className="text-lg font-bold text-[#6D071A] mb-2 font-display">
                        Customer Details & Special Requirements
                      </h3>

                      {/* Customer Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Full Name</span>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D071A]/60 pointer-events-none">
                              <User size={16} />
                            </div>
                            <input
                              type="text"
                              name="fullName"
                              placeholder="Enter your full name"
                              value={form.fullName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all"
                            />
                          </div>
                          {errors.fullName && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.fullName}</p>}
                        </label>

                        <label className="block">
                          <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Phone Number</span>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D071A]/60 pointer-events-none">
                              <Phone size={16} />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="10-digit mobile number"
                              value={form.phone}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all"
                            />
                          </div>
                          {errors.phone && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.phone}</p>}
                        </label>
                      </div>

                      {/* Email */}
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Email Address</span>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D071A]/60 pointer-events-none">
                            <Mail size={16} />
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all"
                          />
                        </div>
                        {errors.email && <p className="text-red-750 text-xs mt-1 font-semibold">{errors.email}</p>}
                      </label>

                      {/* Special Requirements */}
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Special Requirements</span>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-[#6D071A]/60 pointer-events-none">
                            <ClipboardList size={16} />
                          </div>
                          <textarea
                            name="specialRequirements"
                            rows={3}
                            placeholder="Vegetarian preferences, specific dishes, leaf service, custom staff requirements, decorations..."
                            value={form.specialRequirements}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all resize-none"
                          />
                        </div>
                      </label>

                      {/* Additional Message / Notes */}
                      <label className="block">
                        <span className="block text-sm font-semibold text-[#6D071A] mb-1.5 font-sans">Additional Message</span>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-[#6D071A]/60 pointer-events-none">
                            <MessageSquare size={16} />
                          </div>
                          <textarea
                            name="notes"
                            rows={2}
                            placeholder="Any other inquiries or general comments..."
                            value={form.notes}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-[#B8922E]/25 rounded-xl bg-white text-[#6D071A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none text-sm transition-all resize-none"
                          />
                        </div>
                      </label>

                      {submitError && (
                        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-750 text-sm font-semibold">
                          {submitError}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10 max-w-xl mx-auto space-y-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mx-auto animate-floatUp">
                        <CheckCircle size={40} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#6D071A] animate-fadeInUp font-display">
                        ✓ Enquiry Submitted Successfully!
                      </h3>
                      
                      <div className="text-[#6D071A]/80 text-sm leading-relaxed max-w-md mx-auto space-y-2 font-medium">
                        <p>Your catering enquiry PDF has been downloaded.</p>
                        <p>Your enquiry has been sent to our team.</p>
                        <p>We will contact you shortly.</p>
                      </div>

                      <div className="bg-[#FFF8E7] p-5 rounded-2xl text-left border border-[#C9A227]/25 grid grid-cols-2 gap-4 max-w-md mx-auto shadow-sm">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#6D071A]/40 font-sans">Function</p>
                          <p className="text-sm font-semibold text-[#6D071A]">{(completedForm || form).functionType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#6D071A]/40 font-sans">Guests</p>
                          <p className="text-sm font-semibold text-[#6D071A]">{(completedForm || form).guestCount}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#6D071A]/40 font-sans">Date</p>
                          <p className="text-sm font-semibold text-[#6D071A]">{formatDate((completedForm || form).programDate)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#6D071A]/40 font-sans">Customer</p>
                          <p className="text-sm font-semibold text-[#6D071A] truncate">{(completedForm || form).fullName}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal Footer Controls */}
              <div className="border-t border-[#B8922E]/10 px-5 py-4 sm:px-6 flex items-center justify-between">
                {step === 1 && (
                  <>
                    <p className="text-xs text-[#6D071A]/50 hidden sm:block font-light">
                      Fill out event details to proceed to customer info.
                    </p>
                    <div className="flex-1 sm:flex-none flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold text-sm rounded-xl shadow-md border border-[#C9A227]/30 transition-all active:scale-[0.98]"
                      >
                        Continue
                        <ChevronRight size={16} className="text-[#C9A227]" />
                      </button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={submitStatus === 'sending'}
                      className="inline-flex items-center justify-center gap-1.5 px-6 py-3 border-2 border-[#C9A227] bg-[#FAF6ED] text-[#6D071A] font-bold text-sm rounded-xl transition-all hover:bg-[#FFF8E7] disabled:opacity-50"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitStatus === 'sending'}
                      className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold text-sm rounded-xl shadow-md border border-[#C9A227]/30 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {submitStatus === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-[#C9A227]" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                  </>
                )}

                {step === 3 && (
                  <div className="w-full flex justify-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto min-w-[140px] inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#8B1025] to-[#6D071A] text-white font-bold text-sm rounded-xl shadow-md border border-[#C9A227]/30 transition-all active:scale-[0.98]"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}