const express = require('express');
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const t = await prisma.emailTemplate.findMany();
  res.json(t);
});

router.post('/', async (req, res) => {
  const { name, subject, bodyHtml } = req.body;
  const created = await prisma.emailTemplate.create({ data: { name, subject, bodyHtml }});
  res.json(created);
});

module.exports = router;
