const express = require('express');
const { nextId, readData, writeData } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.invoices);
});

router.post('/', (req, res) => {
  const { clientId, items, total, status } = req.body;

  if (!clientId || !Array.isArray(items) || typeof total !== 'number') {
    return res.status(400).json({
      error: 'clientId, items (array), and total (number) are required.',
    });
  }

  const data = readData();
  const client = data.clients.find((item) => item.id === Number(clientId));

  if (!client) {
    return res.status(404).json({ error: 'Client not found.' });
  }

  const invoice = {
    id: nextId(data.invoices),
    clientId: Number(clientId),
    items,
    total,
    status: status || 'draft',
    createdAt: new Date().toISOString(),
  };

  data.invoices.push(invoice);
  writeData(data);

  return res.status(201).json(invoice);
});

module.exports = router;