import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const waNumber = '6281299887766';
  const defaultText = encodeURIComponent('Halo F TRON AC, saya ingin berkonsultasi / pesan layanan servis mesin pendingin.');

  return (
    <a
      href={`https://wa.me/${waNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
      aria-label="Chat via WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
      </div>

      <span className="hidden sm:inline text-sm font-extrabold tracking-wide">
        Chat WhatsApp 24/7
      </span>
    </a>
  );
}
