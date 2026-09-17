import React, { useState } from 'react';
import { Calculator, Plus, Minus, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function CostEstimator({ openBookingModal }) {
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [unitCount, setUnitCount] = useState(1);
  const [hasFreonRefill, setHasFreonRefill] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const servicesList = [
    { id: 1, title: 'Cuci AC & Maintenance', price: 75000 },
    { id: 2, title: 'Bongkar Pasang AC', price: 250000 },
    { id: 3, title: 'Isi Freon (R22/R32/R410a)', price: 150000 },
    { id: 4, title: 'Servis Kulkas & Freezer', price: 180000 },
    { id: 5, title: 'Perbaikan Chiller & Cold Room', price: 500000 },
    { id: 6, title: 'Overhaul / Cuci Kimia AC', price: 220000 },
  ];

  const currentService = servicesList.find(s => s.id === selectedServiceId) || servicesList[0];

  const calculateTotal = () => {
    let base = currentService.price * unitCount;
    if (hasFreonRefill) base += 100000 * unitCount;
    if (isUrgent) base += 50000;
    return base;
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section id="estimator" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold mb-4">
                <Calculator className="w-4 h-4" />
                <span>Kalkulator Transparan</span>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                Hitung Perkiraan Biaya Servis Anda
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-8">
                Simulasikan estimasi biaya pengerjaan tanpa kejutan biaya tersembunyi.
              </p>

              {/* 1. Pilih Layanan */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  1. Pilih Jenis Layanan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesList.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-3.5 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                        selectedServiceId === service.id
                          ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span>{service.title}</span>
                      <span className="font-bold text-xs text-brand-600 dark:text-brand-400">
                        {formatRupiah(service.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Jumlah Unit */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  2. Jumlah Unit Mesin / AC
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-navy-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setUnitCount(Math.max(1, unitCount - 1))}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 flex items-center justify-center font-bold hover:bg-slate-200 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-12 text-center text-lg font-extrabold text-slate-900 dark:text-white">
                      {unitCount} <span className="text-xs font-normal text-slate-500">Unit</span>
                    </span>

                    <button
                      onClick={() => setUnitCount(unitCount + 1)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 flex items-center justify-center font-bold hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Opsi Tambahan */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  3. Opsi Tambahan (Opsional)
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasFreonRefill}
                      onChange={(e) => setHasFreonRefill(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                    />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      Sertakan Isi / Tambah Freon Murni
                    </span>
                  </div>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400">+Rp 100.000 / unit</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                    />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      Layanan Darurat Tanggap Cepat (&lt; 30 Menit)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400">+Rp 50.000</span>
                </label>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <h3 className="font-extrabold text-lg text-white">Ringkasan Estimasi</h3>
                  <span className="px-3 py-1 bg-brand-500/20 text-brand-300 font-semibold text-xs rounded-full border border-brand-500/30">
                    Garansi 30 Hari
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                  <div className="flex justify-between">
                    <span>Layanan Utama:</span>
                    <span className="font-semibold text-white">{currentService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumlah Unit:</span>
                    <span className="font-semibold text-white">{unitCount} Unit</span>
                  </div>
                  {hasFreonRefill && (
                    <div className="flex justify-between text-brand-300">
                      <span>Tambah Freon:</span>
                      <span className="font-semibold">+Rp {formatRupiah(100000 * unitCount)}</span>
                    </div>
                  )}
                  {isUrgent && (
                    <div className="flex justify-between text-amber-300">
                      <span>Layanan Darurat Express:</span>
                      <span className="font-semibold">+Rp 50.000</span>
                    </div>
                  )}
                </div>

                {/* Total Price Display */}
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 mb-6">
                  <span className="text-xs text-slate-400 block mb-1">Perkiraan Biaya Total:</span>
                  <div className="text-3xl sm:text-4xl font-black text-brand-400">
                    {formatRupiah(calculateTotal())}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    *Harga final akan dikonfirmasi setelah pengecekan teknisi di lokasi.
                  </span>
                </div>

                <button
                  onClick={() => openBookingModal(selectedServiceId)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold text-base hover:from-brand-400 hover:to-brand-300 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 group"
                >
                  <span>Pesan Sekarang Dengan Estimasi Ini</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
