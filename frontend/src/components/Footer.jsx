import React from 'react';
import { Snowflake, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ openBookingModal, openTrackerModal }) {
  return (
    <footer className="bg-slate-900 dark:bg-navy-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Snowflake className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                F TRON <span className="text-brand-400">AC</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Penyedia jasa spesialis servis, perawatan, perbaikan, dan bongkar pasang AC, kulkas, freezer, serta mesin pendingin industri terpercaya di Indonesia dengan Garansi Resmi 30 Hari.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => openBookingModal()}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                Pesan Servis
              </button>

              <button
                onClick={openTrackerModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all border border-slate-700"
              >
                Cek Status Tiket
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigasi Utama</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#beranda" className="hover:text-brand-400 transition-colors">Beranda</a></li>
              <li><a href="#layanan" className="hover:text-brand-400 transition-colors">Katalog Layanan</a></li>
              <li><a href="#estimator" className="hover:text-brand-400 transition-colors">Kalkulator Biaya Servis</a></li>
              <li><a href="#tentang-kami" className="hover:text-brand-400 transition-colors">Tentang F TRON AC</a></li>
              <li><a href="#testimoni" className="hover:text-brand-400 transition-colors">Testimoni Pelanggan</a></li>
              <li><a href="#faq" className="hover:text-brand-400 transition-colors">Pertanyaan Umum (FAQ)</a></li>
              <li><a href="#kontak" className="hover:text-brand-400 transition-colors">Kontak & Lokasi</a></li>
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Layanan Spesialis</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-300">Cuci AC & Perawatan Berkala</span></li>
              <li><span className="text-slate-300">Isi & Tambah Freon Original (R32/R410)</span></li>
              <li><span className="text-slate-300">Bongkar Pasang & Relokasi AC</span></li>
              <li><span className="text-slate-300">Servis Kulkas & Freezer Rumah Tangga</span></li>
              <li><span className="text-slate-300">Perbaikan Chiller & Cold Room Industri</span></li>
              <li><span className="text-slate-300">Overhaul / Cuci Kimia AC</span></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Kontak Cepat</h4>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <span>+62 812-9988-7766</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <span>support@ftronac.com</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>Jakarta Selatan, Indonesia</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} F TRON AC. All rights reserved. Servis Mesin Pendingin Bergaransi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk kenyamanan dingin tempat Anda.
          </p>
        </div>

      </div>
    </footer>
  );
}
