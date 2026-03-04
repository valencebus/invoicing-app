const express = require('express');
const { nextId, readData, writeData } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.templates);
});

router.post('/', (req, res) => {
  const { name, subject, bodyHtml } = req.body;

  if (!name || !subject || !bodyHtml) {
    return res.status(400).json({ error: 'name, subject, and bodyHtml are required.' });
  }

  const data = readData();

  const template = {
    id: nextId(data.templates),
    name,
    subject,
    bodyHtml,
    createdAt: new Date().toISOString(),
  };

  data.templates.push(template);
  writeData(data);

  return res.status(201).json(template);
});

module.exports = router;