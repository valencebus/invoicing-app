const ics = require('ics');

function toICSDate(date) {
  const d = new Date(date);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
}

function generateICS({ uid, title, start, end, description, location = '' }) {
  const event = {
    uid,
    title,
    start: toICSDate(start),
    end: toICSDate(end),
    description,
    location
  };
  const { error, value } = ics.createEvent(event);
  if (error) throw error;
  return value; // raw .ics content
}

module.exports = { generateICS };
