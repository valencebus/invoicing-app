import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddToCalendarButtons from '../components/AddToCalendarButtons'

export default function BookingWidget(){
  const [slots, setSlots] = useState([])
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(()=>{
    axios.get('/api/bookings/slots')
      .then(r => setSlots(r.data.slots || []))
      .catch(()=>setSlots([]))
  },[])

  async function submit(){
    if(!selected) { alert('pick a slot'); return; }
    await axios.post('/api/bookings/request', {
      clientId: 1,
      requestedStart: selected.start,
      requestedEnd: selected.end,
      details: `Requested by ${name}`
    })
    alert('Request submitted — admin will confirm')
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Book a time</h2>
      <div className="mt-4">
        <label className="block">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full" />
        <label className="block mt-2">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full" />
      </div>

      <div className="mt-4">
        <h3 className="font-medium">Available slots</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {slots.map((s,i)=> (
            <button key={i} onClick={()=>setSelected(s)} className={`p-2 border rounded ${selected===s? 'bg-blue-100':''}`}>
              {new Date(s.start).toLocaleString()} — {new Date(s.end).toLocaleTimeString()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">Request Booking</button>
      </div>
    </div>
  )
}
