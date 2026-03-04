const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/store.json');

const defaultData = {
  slots: [
    'Monday 10:00 AM',
    'Monday 2:00 PM',
    'Tuesday 11:00 AM',
    'Wednesday 4:00 PM',
  ],
  bookings: [],
  clients: [],
  invoices: [],
  templates: [
    {
      id: 1,
      name: 'Default Booking Confirmation',
      subject: 'Your booking is confirmed',
      bodyHtml: '<p>Thanks for booking with us.</p>',
      createdAt: new Date().toISOString(),
    },
  ],
};

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
}

function readData() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function nextId(items) {
  if (!items.length) return 1;
  return Math.max(...items.map((item) => item.id || 0)) + 1;
}

module.exports = {
  readData,
  writeData,
  nextId,
};
