const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateICS } = require('../services/ics');

// GET /api/bookings/slots (dummy)
router.get('/slots', async (req, res) => {
  // In production you'd compute available slots subtracting busy blocks from CalDAV
  const now = new Date();
  const slots = [
    { start: new Date(now.getTime() + 3600*1000).toISOString(), end: new Date(now.getTime() + 2*3600*1000).toISOString() },
    { start: new Date(now.getTime() + 3*3600*1000).toISOString(), end: new Date(now.getTime() + 4*3600*1000).toISOString() }
  ];
  res.json({ slots });
});

// POST /api/bookings/request
router.post('/request', async (req, res) => {
  const { clientId=1, requestedStart, requestedEnd, details } = req.body;
  const booking = await prisma.booking.create({ data: {
    clientId,
    clientRequestedStart: new Date(requestedStart),
    clientRequestedEnd: new Date(requestedEnd),
    status: 'pending_approval'
  }});
  res.json({ success: true, booking });
});

// PUT /api/bookings/:id/approve
router.put('/:id/approve', async (req, res) => {
  const id = parseInt(req.params.id);
  const { adminAdjustedStart, adminAdjustedEnd } = req.body;
  const updated = await prisma.booking.update({ where: { id }, data: {
    adminAdjustedStart: adminAdjustedStart ? new Date(adminAdjustedStart) : undefined,
    adminAdjustedEnd: adminAdjustedEnd ? new Date(adminAdjustedEnd) : undefined,
    status: 'approved'
  }});
  const ics = generateICS({
    uid: `booking-${updated.id}`,
    title: 'Booking Confirmed',
    start: updated.adminAdjustedStart || updated.clientRequestedStart,
    end: updated.adminAdjustedEnd || updated.clientRequestedEnd,
    description: 'Your booking has been confirmed.'
  });
  res.json({ success: true, booking: updated, ics });
});

// PUT /api/bookings/:id/decline
router.put('/:id/decline', async (req, res) => {
  const id = parseInt(req.params.id);
  const reason = req.body.reason || '';
  const updated = await prisma.booking.update({ where: { id }, data: { status: 'declined' }});
  res.json({ success: true, booking: updated });
});

module.exports = router;
