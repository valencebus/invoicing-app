import React from 'react'
import BookingWidget from './pages/BookingWidget'
import AdminDashboard from './pages/AdminDashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Invoicing & Booking App (Demo)</h1>
        <BookingWidget />
        <div className="mt-12">
          <AdminDashboard />
        </div>
      </div>
    </div>
  )
}
