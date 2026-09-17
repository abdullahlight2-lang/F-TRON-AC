import React from 'react';
import { Snowflake, ShieldCheck, Clock, Users, ArrowRight, Wrench, Search, Star } from 'lucide-react';

export default function HeroSection({ openBookingModal, openTrackerModal }) {
  return (
    <section id="beranda" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Glowing Orbs & Grids */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 dark:bg-brand-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-400/20 dark:bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
              <Snowflake className="w-4 h-4 text-brand-500" />
              <span>Jasa Servis AC & Pendingin No. #1 Bergaransi</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              Solusi Sejuk & Cepat untuk <span className="gradient-text">Mesin Pendingin</span> Anda
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Layanan profesional servis AC, Kulkas, Freezer, Chiller, dan Cold Room. Teknisi berpengalaman bersertifikasi, transparan tanpa biaya tersembunyi & <strong>Garansi Resmi 30 Hari</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={() => openBookingModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
              >
                <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Pesan Servis Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={openTrackerModal}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-navy-800 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all shadow-sm flex items-center justify-center gap-2.5"
              >
                <Search className="w-5 h-5 text-brand-500" />
                <span>Cek Status Tiket Servis</span>
              </button>
            </div>

            {/* Trust Features Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Garansi 30 Hari</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Jaminan perbaikan ulang</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Respon Cepat</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Teknisi ke lokasi 30m</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">1,500+ Pelanggan</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Rating 4.9/5 ⭐</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Floating Card */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-white/40 dark:border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
                      <Snowflake className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">F TRON AC Express</h3>
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">Layanan Tanggap Darurat 24/7</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full border border-emerald-500/20">
                    Online
                  </span>
                </div>

                {/* Popular Services Quick Select */}
                <div className="space-y-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between hover:border-brand-500 transition-colors cursor-pointer" onClick={() => openBookingModal(1)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                        AC
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Cuci AC & Perawatan</h4>
                        <p className="text-[11px] text-slate-500">Mulai Rp 75.000 / unit</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 rounded-lg">Pesan</button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between hover:border-brand-500 transition-colors cursor-pointer" onClick={() => openBookingModal(3)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                        R32
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Isi Freon Original</h4>
                        <p className="text-[11px] text-slate-500">Mulai Rp 150.000</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 rounded-lg">Pesan</button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between hover:border-brand-500 transition-colors cursor-pointer" onClick={() => openBookingModal(4)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                        REF
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Servis Kulkas & Freezer</h4>
                        <p className="text-[11px] text-slate-500">Mulai Rp 180.000</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 rounded-lg">Pesan</button>
                  </div>
                </div>

                {/* Rating Snippet */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-bold text-slate-800 dark:text-slate-200 ml-1">4.9 / 5.0</span>
                  </div>
                  <span className="font-semibold text-brand-600 dark:text-brand-300">1,240+ Review</span>
                </div>
              </div>

              {/* Floating Ticket Tracker Badge */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl border border-white/50 dark:border-white/10 hidden sm:flex items-center gap-3 max-w-xs animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Status Tiket: #AC-8921</h5>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Teknisi Dalam Perjalanan</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
