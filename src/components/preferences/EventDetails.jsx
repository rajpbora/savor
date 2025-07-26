import { useState } from 'react'

const EventDetails = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    date: value?.date || new Date().toISOString().split('T')[0],
    time: value?.time || new Date().toTimeString().slice(0, 5),
    partySize: value?.partySize || 2,
    eventType: value?.eventType || 'casual',
    ...value
  })

  const handleChange = (field, newValue) => {
    const updated = { ...formData, [field]: newValue }
    setFormData(updated)
    onChange(updated)
  }

  const eventTypes = [
    { value: 'casual', label: 'Casual' },
    { value: 'date', label: 'Date' },
    { value: 'hangout', label: 'Hangout' },
    { value: 'business', label: 'Business' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="form-label">Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Number of People</label>
          <input
            type="number"
            min="1"
            max="20"
            value={formData.partySize}
            onChange={(e) => handleChange('partySize', parseInt(e.target.value))}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Event Type</label>
          <select
            value={formData.eventType}
            onChange={(e) => handleChange('eventType', e.target.value)}
            className="form-input"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default EventDetails