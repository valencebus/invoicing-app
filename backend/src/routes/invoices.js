const express = require('express');
const router = express.Router();
import { prisma } from '../prisma.js';
  datasourceUrl: process.env.DATABASE_URL,
});

router.get('/', async (req, res) => {
  const inv = await prisma.invoice.findMany();
  res.json(inv);
});

module.exports = router;
