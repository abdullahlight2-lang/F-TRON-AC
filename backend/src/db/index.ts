import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Connection Configuration (from env or defaults)
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'ftron_ac_db';
const DB_PORT = parseInt(process.env.DB_PORT || '3306');

let db: any = null;
let isRealDbConnected = false;

// Initial Seed Data for F TRON AC
export const seedServices = [
  {
    id: 1,
    title: 'Cuci AC & Maintenance Berkala',
    slug: 'cuci-ac-maintenance',
    category: 'AC Rumah & Kantor',
    description: 'Pembersihan evaporator, kondensor, filter udara, dan cek saluran pembuangan air secara menyeluruh.',
    priceBase: 75000,
    durationMinutes: 45,
    icon: 'Wind',
    badge: 'Terfavorit'
  },
  {
    id: 2,
    title: 'Bongkar Pasang & Relokasi AC',
    slug: 'bongkar-pasang-ac',
    category: 'Pemasangan Unit',
    description: 'Jasa lepas unit lama dan pemasangan unit baru/relokasi antar ruangan atau gedung dengan rapi.',
    priceBase: 250000,
    durationMinutes: 120,
    icon: 'Wrench',
    badge: 'Garansi 30 Hari'
  },
  {
    id: 3,
    title: 'Isi & Tambah Freon (R22/R32/R410a)',
    slug: 'tambah-freon-ac',
    category: 'Perbaikan Refrigerant',
    description: 'Pengisian ulang freon original berkualitas untuk mengembalikan performa dingin AC secara optimal.',
    priceBase: 150000,
    durationMinutes: 30,
    icon: 'Zap',
    badge: 'Freon Murni'
  },
  {
    id: 4,
    title: 'Servis Kulkas & Freezer Rumah Tangga',
    slug: 'servis-kulkas-freezer',
    category: 'Pendingin Dapur',
    description: 'Perbaikan kulkas tidak dingin, bocor freon, kompresor bising, atau penggantian overload/thermostat.',
    priceBase: 180000,
    durationMinutes: 90,
    icon: 'Refrigerator',
    badge: 'Teknisi Ahli'
  },
  {
    id: 5,
    title: 'Perbaikan Chiller & Cold Room Industri',
    slug: 'servis-chiller-coldroom',
    category: 'Komersial & Industri',
    description: 'Servis berat & perawatan rutin mesin pendingin kapasitas besar untuk restoran, pabrik, dan gudang.',
    priceBase: 500000,
    durationMinutes: 180,
    icon: 'ShieldAlert',
    badge: 'Pro Commercial'
  },
  {
    id: 6,
    title: 'Overhaul / Cuci Besar AC (Penyertaan Kimia)',
    slug: 'overhaul-cuci-kimia-ac',
    category: 'Perbaikan Berat',
    description: 'Pembersihan total unit indoor yang sangat kotor / tersumbat parah menggunakan larutan pembersih khusus.',
    priceBase: 220000,
    durationMinutes: 90,
    icon: 'Sparkles',
    badge: 'Deep Clean'
  }
];

export const seedTestimonials = [
  {
    id: 1,
    name: 'Bpk. Hendra Wijaya',
    role: 'Pemilik Kafe (Jakarta Selatan)',
    rating: 5,
    comment: 'Teknisi F TRON AC sangat profesional! Servis 4 unit AC kantor pengerjaannya rapi, tepat waktu, dan dinginnya awet. Mantap!',
    serviceUsed: 'Cuci AC & Maintenance Berkala',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Ibu Rina Setyowati',
    role: 'Ibu Rumah Tangga (Tangerang)',
    rating: 5,
    comment: 'Kulkas 2 pintu saya mendadak tidak dingin, dipanggil sore jam 5 teknisi F TRON AC langsung datang. Ganti onderdil langsung beres!',
    serviceUsed: 'Servis Kulkas & Freezer',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Bpk. Budi Santoso',
    role: 'Manager Operasional Restoran',
    rating: 5,
    comment: 'Sangat terbantu dengan layanan perbaikan Chiller darurat. Respon pesanan sangat cepat dan ada fitur tracking status tiket servisnya!',
    serviceUsed: 'Perbaikan Chiller & Cold Room',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const seedFaqs = [
  {
    id: 1,
    question: 'Berapa lama garansi yang diberikan F TRON AC?',
    answer: 'Kami memberikan Garansi Resmi Pengerjaan & Sparepart selama 30 Hari penuh sejak pengerjaan selesai.',
    category: 'Garansi & Biaya'
  },
  {
    id: 2,
    question: 'Apakah ada biaya panggil jika tidak jadi diservis?',
    answer: 'Biaya panggil & pengecekan awal sebesar Rp 50.000. Jika pengerjaan servis dilanjutkan, biaya pengecekan GRATIS!',
    category: 'Pemesanan'
  },
  {
    id: 3,
    question: 'Berapa kali idealnya AC rumah harus dicuci?',
    answer: 'AC rumah tangga disarankan dicuci secara berkala 3 - 4 bulan sekali untuk menjaga udara tetap bersih dan hemat listrik.',
    category: 'Tips & Layanan'
  },
  {
    id: 4,
    question: 'Apakah teknisi F TRON AC membawa peralatan sendiri?',
    answer: 'Ya, semua teknisi kami dilengkapi dengan peralatan standar industri, tangga, jet pump cuci AC, manifolds freon, dan APD lengkap.',
    category: 'Teknisi & Operasional'
  },
  {
    id: 5,
    question: 'Bagaimana cara mengecek status booking servis saya?',
    answer: 'Anda dapat menggunakan fitur "Cek Status Servis" di bagian atas website ini dengan memasukkan Kode Tiket (Contoh: AC-8921).',
    category: 'Pemesanan'
  }
];

// In-Memory Database Fallback for seamless execution
export const mockDb = {
  services: [...seedServices],
  bookings: [
    {
      id: 1,
      ticketCode: 'AC-8921',
      customerName: 'Budi Santoso',
      customerPhone: '081299887766',
      customerAddress: 'Jl. Merdeka No. 45, Jakarta Selatan',
      serviceId: 1,
      serviceName: 'Cuci AC & Maintenance Berkala',
      unitCount: 2,
      estimatedPrice: 150000,
      bookingDate: '2026-09-20T10:00',
      notes: 'AC di lantai 2 bocor air sedikit',
      status: 'in_progress',
      createdAt: new Date().toISOString()
    }
  ],
  testimonials: [...seedTestimonials],
  faqs: [...seedFaqs],
  contacts: [] as any[]
};

// Connect MySQL or initialize Drizzle ORM
export async function initDb() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      connectTimeout: 2000
    });
    db = drizzle(connection, { schema, mode: 'default' });
    isRealDbConnected = true;
    console.log('✅ Connected to MySQL database via Drizzle ORM successfully!');
  } catch (error) {
    console.log('ℹ️ MySQL instance not detected locally. Operating in High-Performance In-Memory Data Store mode.');
    isRealDbConnected = false;
  }
}

export function getDbStatus() {
  return { isRealDbConnected, driver: isRealDbConnected ? 'MySQL (Drizzle ORM)' : 'In-Memory Store (Seeded)' };
}
