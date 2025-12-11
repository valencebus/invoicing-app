import React from 'react'

export function googleLink({ title, start, end, details, location }){
  function fmt(d){
    return new Date(d).toISOString().replace(/-|:|\.\d+/g,'')
  }
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  const params = new URLSearchParams({
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details,
    location
  })
  return `${base}&${params.toString()}`
}

export default function AddToCalendarButtons({ event }){
  const g = googleLink({ title: event.title, start: event.start, end: event.end, details: event.description, location: event.location })
  const blob = new Blob([event.ics || ''], { type: 'text/calendar' })
  const icsUrl = URL.createObjectURL(blob)

  return (
    <div className="flex gap-2">
      <a href={g} target="_blank" rel="noreferrer" className="underline">Add to Google</a>
      <a href={icsUrl} download={`${event.uid || 'event'}.ics`} className="underline">Download .ics</a>
    </div>
  )
}
