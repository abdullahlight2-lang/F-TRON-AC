import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.success) setTestimonials(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="testimoni" className="py-20 bg-slate-100/60 dark:bg-navy-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
            Ulasan Pelanggan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            Apa Kata Pelanggan Setia F TRON AC?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Kepuasan dan kenyamanan Anda adalah prioritas utama kami. Berikut adalah testimoni dari beberapa pelanggan yang telah menggunakan jasa servis kami.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-7 relative border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-brand-500/15 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3.5">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">{item.role}</span>
                  <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">{item.serviceUsed}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
