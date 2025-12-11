import React, { useState } from 'react'
import api from '../lib/api'

export default function AdminDashboard(){
  const [templates, setTemplates] = useState([])

  async function load(){
    const r = await api.get('/api/templates')
    setTemplates(r.data || [])
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold">Admin</h2>
      <div className="mt-4">
        <button onClick={load} className="bg-green-600 text-white px-3 py-1 rounded">Load Templates</button>
      </div>
      <div className="mt-4">
        {templates.map(t=> (
          <div key={t.id} className="border p-3 rounded mb-2">
            <h4 className="font-semibold">{t.name}</h4>
            <p>{t.subject}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
