import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Wrench, ShieldCheck, AlertCircle, Phone } from 'lucide-react';

export default function OrderTrackerModal({ isOpen, onClose }) {
  const [ticketInput, setTicketInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackResult, setTrackResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setTrackResult(null);

    try {
      const res = await fetch(`/api/bookings/track/${encodeURIComponent(ticketInput.trim())}`);
      const result = await res.json();

      if (result.success) {
        setTrackResult(result.data);
      } else {
        setErrorMsg(result.message || 'Kode tiket tidak ditemukan.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke backend server tracking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-xl rounded-3xl p-6 sm:p-8 relative shadow-2xl border border-white/50 dark:border-white/10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Cek Status Tiket Servis</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Lacak pengerjaan teknisi secara real-time</p>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Masukkan Kode Tiket (Contoh: AC-8921) atau No. HP"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none uppercase tracking-wide font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-500 transition-colors shadow-md shrink-0"
            >
              {loading ? 'Mencari...' : 'Cek Status'}
            </button>
          </div>
        </form>

        {/* Quick Example Button */}
        {!trackResult && !errorMsg && (
          <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-brand-600 dark:text-brand-400 block mb-1">💡 Contoh Kode Tiket Pengujian:</span>
            <p>Gunakan kode demo <button onClick={() => setTicketInput('AC-8921')} className="font-mono bg-brand-500/20 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded font-bold hover:underline">AC-8921</button> untuk melihat simulasi status progres pengerjaan.</p>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tracking Result Timeline */}
        {trackResult && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Status Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-brand-100 font-semibold">Kode Tiket: #{trackResult.booking.ticketCode}</span>
                <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-[11px] font-bold capitalize">
                  {trackResult.statusLabel}
                </span>
              </div>
              <h4 className="text-lg font-bold">{trackResult.booking.serviceName}</h4>
              <p className="text-xs text-brand-100 mt-1">{trackResult.statusDescription}</p>
            </div>

            {/* Timeline Progress */}
            <div className="py-2">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                Progres Pengerjaan
              </h5>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {trackResult.allSteps.map((stepObj) => {
                  const isDone = stepObj.step <= trackResult.currentStep;
                  const isCurrent = stepObj.step === trackResult.currentStep;

                  return (
                    <div key={stepObj.step} className="relative flex items-start gap-4">
                      {/* Circle Step Icon */}
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-brand-500 text-white ring-4 ring-brand-500/20 animate-pulse'
                          : isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {isDone ? '✓' : stepObj.step}
                      </div>

                      <div>
                        <h6 className={`text-sm font-bold ${
                          isDone ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {stepObj.label}
                        </h6>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {stepObj.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-navy-900 text-xs space-y-1.5 border border-slate-200 dark:border-slate-800">
              <div><strong>Pelanggan:</strong> {trackResult.booking.customerName}</div>
              <div><strong>Alamat:</strong> {trackResult.booking.customerAddress}</div>
              <div><strong>Jadwal:</strong> {trackResult.booking.bookingDate}</div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
