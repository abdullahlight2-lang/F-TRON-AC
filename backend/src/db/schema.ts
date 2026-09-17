import { mysqlTable, serial, varchar, text, int, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';

// 1. Tabel Layanan (Services Catalog)
export const services = mysqlTable('services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull().default('AC Rumah'),
  description: text('description').notNull(),
  priceBase: int('price_base').notNull(),
  durationMinutes: int('duration_minutes').default(60),
  icon: varchar('icon', { length: 100 }),
  badge: varchar('badge', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Tabel Pemesanan (Bookings & Order Tracking)
export const bookings = mysqlTable('bookings', {
  id: serial('id').primaryKey(),
  ticketCode: varchar('ticket_code', { length: 50 }).notNull().unique(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  customerAddress: text('customer_address').notNull(),
  serviceId: int('service_id').notNull(),
  serviceName: varchar('service_name', { length: 255 }),
  unitCount: int('unit_count').default(1),
  estimatedPrice: int('estimated_price').notNull(),
  bookingDate: varchar('booking_date', { length: 100 }).notNull(),
  notes: text('notes'),
  status: mysqlEnum('status', [
    'pending', 
    'confirmed', 
    'technician_assigned', 
    'in_progress', 
    'completed', 
    'cancelled'
  ]).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. Tabel Testimoni (Testimonials)
export const testimonials = mysqlTable('testimonials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 100 }).default('Pelanggan'),
  rating: int('rating').notNull(), // 1 - 5
  comment: text('comment').notNull(),
  serviceUsed: varchar('service_used', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// 4. Tabel FAQ
export const faqs = mysqlTable('faqs', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: varchar('category', { length: 100 }).default('Umum'),
});

// 5. Tabel Pesan / Kontak (Contact Form Submissions)
export const contacts = mysqlTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
