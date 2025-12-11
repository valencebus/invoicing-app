const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const inv = await prisma.invoice.findMany();
  res.json(inv);
});

module.exports = router;
