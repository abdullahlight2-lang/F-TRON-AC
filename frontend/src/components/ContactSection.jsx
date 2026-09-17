import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      alert('Gagal mengirim pesan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-slate-100/60 dark:bg-navy-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            Konsultasikan Permasalahan Mesin Pendingin Anda
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Tim customer care kami siap memberikan solusi terbaik 24 Jam sehari. Kirim pesan atau hubungi WhatsApp kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Telepon & Hotline</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Panggilan darurat & konsultasi cepat</p>
                <a href="tel:081299887766" className="text-sm font-extrabold text-brand-600 dark:text-brand-400 hover:underline">
                  +62 812-9988-7766
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Email Dukungan</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Untuk penawaran kerjasama proyek & perusahaan</p>
                <a href="mailto:support@ftronac.com" className="text-sm font-extrabold text-brand-600 dark:text-brand-400 hover:underline">
                  support@ftronac.com
                </a>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Kantor & Workshop Utama</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  Jl. Raya Utama No. 128, Kebayoran Baru, Jakarta Selatan 12150
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
                  <Clock className="w-4 h-4" />
                  <span>Buka Setiap Hari: 07.00 - 21.00 WIB</span>
                </div>
              </div>
            </div>

            {/* Google Map Embed Preview */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-48 relative">
              <iframe
                title="F TRON AC Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.176466986295!2d106.7972!3d-6.2442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f140685e1005%3A0x6b42b10a24d27bf9!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Isi form di bawah ini dan tim respon teknis kami akan membalas kurang dari 15 menit.
              </p>

              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Pesan Anda telah berhasil dikirim! Tim F TRON AC akan segera menghubungi Anda.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nama Anda *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Hendra Wijaya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nomor HP / WA *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Pesan / Keluhan Servis *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan keluhan mesin pendingin Anda (misal: AC bocor, kulkas tidak dingin, dll)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Kirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
