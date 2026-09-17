import React, { useState, useEffect } from 'react';
import { X, Wrench, CheckCircle2, Copy, Calendar, MapPin, User, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, initialServiceId = 1 }) {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    serviceId: initialServiceId,
    unitCount: 1,
    bookingDate: new Date().toISOString().split('T')[0] + 'T10:00',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  useEffect(() => {
    if (initialServiceId) {
      setFormData(prev => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) setServices(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceId: Number(formData.serviceId),
          unitCount: Number(formData.unitCount)
        })
      });
      const result = await res.json();

      if (result.success) {
        setSuccessBooking(result.data);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        alert(result.message || 'Terjadi kesalahan saat memproses pesanan.');
      }
    } catch (err) {
      alert('Gagal terhubung ke backend server.');
    } finally {
      setLoading(false);
    }
  };

  const copyTicketCode = () => {
    if (successBooking) {
      navigator.clipboard.writeText(successBooking.ticketCode);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 3000);
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

        {!successBooking ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Form Booking Servis Online</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Garansi pengerjaan 30 hari penuh</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nama & HP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nomor WhatsApp / HP *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Alamat Lengkap Pengerjaan *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <textarea
                    required
                    rows={2}
                    placeholder="Nama Jalan, RT/RW, No. Rumah, Kecamatan, Kota"
                    value={formData.customerAddress}
                    onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Layanan & Jumlah Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Jenis Layanan *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Jumlah Unit
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={formData.unitCount}
                    onChange={(e) => setFormData({ ...formData, unitCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-center font-bold"
                  />
                </div>
              </div>

              {/* Tanggal Booking */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Jadwal & Jam Pengerjaan *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="datetime-local"
                    required
                    value={formData.bookingDate}
                    onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Catatan Kendala */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Catatan Keluhan / Jenis Merk AC (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Misal: AC Merk Panasonic 1PK tidak dingin, ada bunyi berisik"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-sm hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Memproses Booking...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Konfirmasi Booking Tiket Sekarang</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
              Booking Berhasil Dibuat!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Simpan kode tiket di bawah ini untuk mengecek status pengerjaan teknisi.
            </p>

            {/* Ticket Code Box */}
            <div className="bg-slate-100 dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Kode Tiket Servis Anda</span>
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400 tracking-wider">
                  {successBooking.ticketCode}
                </span>
              </div>
              <button
                onClick={copyTicketCode}
                className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-navy-800 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedTicket ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>

            <div className="text-left text-xs space-y-2 bg-brand-500/5 p-4 rounded-xl border border-brand-500/10 text-slate-600 dark:text-slate-300 mb-6">
              <div><strong>Nama:</strong> {successBooking.customerName}</div>
              <div><strong>Layanan:</strong> {successBooking.serviceName} ({successBooking.unitCount} Unit)</div>
              <div><strong>Estimasi Biaya:</strong> Rp {new Intl.NumberFormat('id-ID').format(successBooking.estimatedPrice)}</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white transition-all"
            >
              Tutup Modal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
