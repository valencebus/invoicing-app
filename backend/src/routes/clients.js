const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
});

router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  const c = await prisma.client.create({ data: { name, email, phone }});
  res.json(c);
});

module.exports = router;
