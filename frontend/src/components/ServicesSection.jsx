import React, { useState, useEffect } from 'react';
import { Wind, Wrench, Zap, ShieldAlert, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesSection({ openBookingModal }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setServices(data.data);
        }
      })
      .catch((err) => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <Wind className="w-6 h-6" />;
    }
  };

  const categories = ['Semua', 'AC Rumah & Kantor', 'Pemasangan Unit', 'Perbaikan Refrigerant', 'Pendingin Dapur', 'Komersial & Industri'];

  const filteredServices = activeCategory === 'Semua' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <section id="layanan" className="py-20 bg-slate-100/60 dark:bg-navy-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
            Katalog Layanan Servis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            Solusi Servis Lengkap & Harga Transparan
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Pilih jenis layanan mesin pendingin sesuai kebutuhan Anda. Semua harga sudah termasuk jaminan garansi pengerjaan 30 hari.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                  : 'bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-200/80 dark:border-slate-700/80 group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-110 transition-transform">
                      {getIcon(service.icon)}
                    </div>
                    {service.badge && (
                      <span className="px-3 py-1 text-[11px] font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/80 rounded-full border border-brand-200 dark:border-brand-800">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    {service.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Mulai Dari</span>
                      <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
                        {formatRupiah(service.priceBase)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{service.durationMinutes} min</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(service.id)}
                    className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Pesan Layanan Ini</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
