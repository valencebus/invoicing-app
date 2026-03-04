const express = require('express');
const { nextId, readData, writeData } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.clients);
});

router.post('/', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const data = readData();
  const exists = data.clients.some((client) => client.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return res.status(409).json({ error: 'Client email already exists.' });
  }

  const client = {
    id: nextId(data.clients),
    name,
    email,
    phone: phone || null,
    createdAt: new Date().toISOString(),
  };

  data.clients.push(client);
  writeData(data);

  return res.status(201).json(client);
});

module.exports = router;
