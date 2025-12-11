const express = require('express');
const bodyParser = require('body-parser');
const bookings = require('./routes/bookings');
const clients = require('./routes/clients');
const invoices = require('./routes/invoices');
const templates = require('./routes/templates');

const app = express();
app.use(bodyParser.json());

app.use('/api/bookings', bookings);
app.use('/api/clients', clients);
app.use('/api/invoices', invoices);
app.use('/api/templates', templates);

app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = app;
