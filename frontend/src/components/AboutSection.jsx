import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Wrench, CheckCircle, Clock } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: <Award className="w-6 h-6 text-brand-500" />,
      title: 'Teknisi Bersertifikat',
      desc: 'Setiap teknisi F TRON AC telah melalui pelatihan ketat dan bersertifikat BNSP sistem refrigrasi.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'Garansi Resmi 30 Hari',
      desc: 'Jaminan perbaikan gratis tanpa biaya jika AC / pendingin bermasalah kembali dalam kurun waktu garansi.'
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-sky-500" />,
      title: 'Peralatan & Freon Original',
      desc: 'Menggunakan peralatan pembersih modern, manifol akurat, serta freon murni tanpa campuran berlebih.'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: 'Tepat Waktu & Respon Cepat',
      desc: 'Tim kami merespon pemesanan dalam hitungan menit dan tiba di lokasi sesuai jadwal yang Anda tentukan.'
    }
  ];

  return (
    <section id="tentang-kami" className="py-20 bg-white dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Feature Column */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
              Tentang F TRON AC
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-6 leading-tight">
              Penyedia Jasa Servis Mesin Pendingin Terpercaya Sejak 2018
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
              F TRON AC hadir memberikan standar baru dalam perawatan dan perbaikan mesin pendingin (Air Conditioner, Kulkas, Freezer, Chiller, dan Cold Room). Kami berkomitmen memberikan kualitas pengerjaan terbaik dengan biaya jujur dan transparan.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Lebih dari 1,500+ unit AC & kulkas berhasil diperbaiki',
                'Melayani area Perumahan, Perkantoran, Restoran, & Pabrik Industri',
                'Metode pembersihan higienis tanpa merusak komponen komponen listrik'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            {/* Quick Contact Badge */}
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-navy-900 border border-brand-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Butuh Konsultasi Kendala AC?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tim customer care siap melayani 24 Jam</p>
              </div>
              <a
                href="#kontak"
                className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-500 transition-colors"
              >
                Hubungi Kami
              </a>
            </div>

          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
