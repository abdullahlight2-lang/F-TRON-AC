import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        if (data.success) setFaqs(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="faq" className="py-20 bg-white dark:bg-navy-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
            FAQ (Pertanyaan Umum)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            Pertanyaan Yang Sering Diajukan
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Temukan jawaban cepat mengenai garansi, biaya panggil, jadwal servis, dan jaminan teknisi F TRON AC.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-navy-900/50 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-500' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/40 dark:border-slate-800/40 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
