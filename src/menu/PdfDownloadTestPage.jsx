import { useEffect, useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { buildEnquiryPdfHtml } from '../utils/pdf/buildEnquiryPdfHtml';
import { downloadPdfFromHtml } from '../utils/pdf/downloadPdfFromHtml';

const mockPdfData = {
  fullName: 'Test Customer',
  phone: '9876543210',
  email: 'test.customer@example.com',
  functionType: 'Marriage Orders',
  guestCount: '250',
  programDate: '2026-10-15',
  programLocation: '6, Sapthagiri St, Baby Nagar, Velachery, Chennai',
  specialRequirements: 'Pure vegetarian leaf service, 5 sweets, traditional welcome drinks',
  notes: 'This is a PDF generation test. Please verify the final output is readable, high contrast, and fully rendered in deep red and warm gold.',
};

export default function PdfDownloadTestPage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const runDownload = async () => {
    setStatus('generating');
    setError('');

    try {
      const html = buildEnquiryPdfHtml(mockPdfData);
      await downloadPdfFromHtml(html, 'swamys-catering-pdf-test.pdf');
      setStatus('ready');
    } catch (downloadError) {
      console.error('PDF test download failed:', downloadError);
      setError(downloadError?.message || 'PDF test download failed');
      setStatus('error');
    }
  };

  useEffect(() => {
    runDownload();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-orange-900 to-amber-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center rounded-[2rem] border border-orange-500/20 bg-[#fffdfa] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg flex-shrink-0">
            <FileText size={22} />
          </div>

          <div className="flex-1">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-500">PDF test mode</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl text-orange-900 font-display">
              Swamy's Mess Enquiry PDF test
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-950/70">
              This page feeds mock booking data into the same HTML template and PDF download helper used by the booking flow.
              It should generate a readable PDF immediately, and you can rerun it if you want to verify the output again.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-orange-500/10 bg-[#fffbf6] p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-orange-950/40">Status</p>
              <p className="mt-1 text-base font-semibold text-orange-950">
                {status === 'generating' ? 'Generating PDF...' : status === 'ready' ? 'PDF downloaded' : status === 'error' ? 'Download failed' : 'Ready'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-orange-950/40">Filename</p>
              <p className="mt-1 text-base font-semibold text-orange-950">swamys-catering-pdf-test.pdf</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-orange-955 sm:grid-cols-2">
            <p><span className="font-semibold text-orange-900">Function:</span> {mockPdfData.functionType}</p>
            <p><span className="font-semibold text-orange-900">Guests:</span> {mockPdfData.guestCount}</p>
            <p><span className="font-semibold text-orange-900">Location:</span> {mockPdfData.programLocation}</p>
            <p><span className="font-semibold text-orange-900">Customer:</span> {mockPdfData.fullName}</p>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={runDownload}
            disabled={status === 'generating'}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 text-sm font-semibold shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all border border-amber-400/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'generating' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {status === 'generating' ? 'Generating...' : 'Download test PDF again'}
          </button>

          <p className="text-xs leading-6 text-orange-950/50 sm:max-w-md sm:self-center">
            Open this page with <span className="font-semibold text-orange-900">/?pdf-test=1</span> while the app is running.
          </p>
        </div>
      </div>
    </main>
  );
}