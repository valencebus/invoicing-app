// frontend/src/lib/api.js
import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/,'') : ''

// If BASE empty, using relative /api will hit the Vite proxy in dev.
// If BASE set (production), we use absolute URLs.
const api = axios.create({
  baseURL: BASE || undefined,
  // optional: set timeout
  timeout: 15000,
})

export default {
  // GET /api/bookings/slots
  getSlots: () => api.get('/api/bookings/slots').then(r => r.data),
  requestBooking: (payload) => api.post('/api/bookings/request', payload).then(r => r.data),
  approveBooking: (id, body) => api.put(`/api/bookings/${id}/approve`, body).then(r => r.data),
  declineBooking: (id, body) => api.put(`/api/bookings/${id}/decline`, body).then(r => r.data),

  getTemplates: () => api.get('/api/templates').then(r => r.data),
  createTemplate: (t) => api.post('/api/templates', t).then(r => r.data),

  getClients: () => api.get('/api/clients').then(r => r.data),
  createClient: (c) => api.post('/api/clients', c).then(r => r.data),

  // add more endpoints here as you expand
}
