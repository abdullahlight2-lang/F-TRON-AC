import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { initDb, mockDb, getDbStatus, seedServices } from './db/index';

// Initialize DB Connection asynchronously
initDb();

const app = new Elysia({ prefix: '/api' })
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: 'F TRON AC API Documentation',
        version: '1.0.0',
        description: 'High Performance API for Cooling Machine Servicing (AC, Refrigerator, Chiller) built with ElysiaJS & Drizzle ORM'
      }
    }
  }))
  // Health check & status
  .get('/health', () => ({
    status: 'ok',
    service: 'F TRON AC Backend Service',
    timestamp: new Date().toISOString(),
    database: getDbStatus()
  }))

  // 1. Services Catalog
  .get('/services', () => {
    return {
      success: true,
      data: mockDb.services
    };
  })
  .get('/services/:id', ({ params: { id }, set }) => {
    const service = mockDb.services.find(s => s.id === Number(id));
    if (!service) {
      set.status = 404;
      return { success: false, message: 'Layanan tidak ditemukan' };
    }
    return { success: true, data: service };
  })

  // 2. Cost Estimator API
  .post('/estimator', ({ body }) => {
    const { serviceId, unitCount, isUrgent, hasFreonRefill } = body as any;
    const service = mockDb.services.find(s => s.id === Number(serviceId)) || seedServices[0];
    
    let base = service.priceBase * (unitCount || 1);
    if (hasFreonRefill) {
      base += 100000 * (unitCount || 1);
    }
    if (isUrgent) {
      base += 50000;
    }

    return {
      success: true,
      data: {
        serviceId: service.id,
        serviceTitle: service.title,
        unitCount,
        isUrgent,
        hasFreonRefill,
        estimatedTotal: base,
        formattedTotal: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(base)
      }
    };
  }, {
    body: t.Object({
      serviceId: t.Number(),
      unitCount: t.Number(),
      isUrgent: t.Optional(t.Boolean()),
      hasFreonRefill: t.Optional(t.Boolean())
    })
  })

  // 3. Bookings & Order Ticket System
  .get('/bookings', () => {
    return {
      success: true,
      data: mockDb.bookings
    };
  })
  .post('/bookings', ({ body, set }) => {
    const { customerName, customerPhone, customerAddress, serviceId, unitCount, bookingDate, notes } = body;
    
    const service = mockDb.services.find(s => s.id === serviceId) || seedServices[0];
    const generatedTicketCode = `AC-${Math.floor(1000 + Math.random() * 9000)}`;
    const estimatedPrice = service.priceBase * (unitCount || 1);

    const newBooking = {
      id: mockDb.bookings.length + 1,
      ticketCode: generatedTicketCode,
      customerName,
      customerPhone,
      customerAddress,
      serviceId,
      serviceName: service.title,
      unitCount: unitCount || 1,
      estimatedPrice,
      bookingDate,
      notes: notes || '',
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    mockDb.bookings.push(newBooking);

    set.status = 201;
    return {
      success: true,
      message: 'Pemesanan tiket servis berhasil dibuat!',
      data: newBooking
    };
  }, {
    body: t.Object({
      customerName: t.String({ minLength: 2 }),
      customerPhone: t.String({ minLength: 8 }),
      customerAddress: t.String({ minLength: 5 }),
      serviceId: t.Number(),
      unitCount: t.Optional(t.Number()),
      bookingDate: t.String(),
      notes: t.Optional(t.String())
    })
  })

  // 4. Order Tracking Endpoint
  .get('/bookings/track/:ticketCode', ({ params: { ticketCode }, set }) => {
    const code = ticketCode.trim().toUpperCase();
    const booking = mockDb.bookings.find(b => b.ticketCode.toUpperCase() === code || b.customerPhone.includes(code));
    
    if (!booking) {
      set.status = 404;
      return {
        success: false,
        message: `Tiket servis '${ticketCode}' tidak ditemukan. Silakan periksa kembali kode tiket atau nomor HP Anda.`
      };
    }

    const statusSteps = [
      { step: 1, key: 'pending', label: 'Tiket Diterima', desc: 'Permintaan booking sedang diverifikasi oleh admin' },
      { step: 2, key: 'confirmed', label: 'Terkonfirmasi', desc: 'Jadwal telah disetujui & disiapkan' },
      { step: 3, key: 'technician_assigned', label: 'Teknisi Ditugaskan', desc: 'Teknisi bersertifikat dalam perjalanan ke lokasi' },
      { step: 4, key: 'in_progress', label: 'Pengerjaan Servis', desc: 'Pemeriksaan & perbaikan sedang berlangsung' },
      { step: 5, key: 'completed', label: 'Selesai & Garansi Aktif', desc: 'Pengerjaan selesai. Garansi 30 hari aktif' }
    ];

    const currentStepObj = statusSteps.find(s => s.key === booking.status) || statusSteps[0];

    return {
      success: true,
      data: {
        booking,
        currentStep: currentStepObj.step,
        statusLabel: currentStepObj.label,
        statusDescription: currentStepObj.desc,
        allSteps: statusSteps
      }
    };
  })

  // 5. Testimonials API
  .get('/testimonials', () => {
    return {
      success: true,
      data: mockDb.testimonials
    };
  })

  // 6. FAQs API
  .get('/faqs', () => {
    return {
      success: true,
      data: mockDb.faqs
    };
  })

  // 7. Contact Form API
  .post('/contacts', ({ body, set }) => {
    const { name, email, phone, message } = body;
    const newContact = {
      id: mockDb.contacts.length + 1,
      name,
      email: email || '',
      phone,
      message,
      createdAt: new Date().toISOString()
    };
    mockDb.contacts.push(newContact);

    set.status = 201;
    return {
      success: true,
      message: 'Pesan Anda telah berhasil terkirim. Tim kami akan menghubungi Anda segera!'
    };
  }, {
    body: t.Object({
      name: t.String(),
      email: t.Optional(t.String()),
      phone: t.String(),
      message: t.String()
    })
  })

  .listen(3001);

console.log(`🚀 ElysiaJS Backend Server running on http://localhost:3001`);
console.log(`📚 Swagger API Docs available on http://localhost:3001/swagger`);
