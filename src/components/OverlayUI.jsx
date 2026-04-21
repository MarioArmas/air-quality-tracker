import React, { useState } from 'react'
import { Wind, Search, Loader2 } from 'lucide-react'

const aqiLegend = [
  { label: 'Good (0-50)', color: 'var(--aqi-good)' },
  { label: 'Moderate (51-100)', color: 'var(--aqi-moderate)' },
  {
    label: 'Unhealthy for Sensitive (101-150)',
    color: 'var(--aqi-unhealthy-sensitive)',
  },
  { label: 'Unhealthy (151-200)', color: 'var(--aqi-unhealthy)' },
  { label: 'Very Unhealthy (201-300)', color: 'var(--aqi-very-unhealthy)' },
  { label: 'Hazardous (300+)', color: 'var(--aqi-hazardous)' },
]

export default function OverlayUI({ onSearch, loading, error }) {
  const [city, setCity] = useState('Los Angeles')
  const [state, setState] = useState('California')
  const [country, setCountry] = useState('USA')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city && state && country && onSearch) {
      onSearch(city, state, country)
    }
  }

  return (
    <div className="overlay-ui">
      {/* Header */}
      <div className="overlay-header">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="glass-panel title-panel">
            <Wind className="title-icon" size={28} />
            <h1>Global Air Quality</h1>
          </div>

          {/* Search Panel */}
          <div className="glass-panel search-panel">
            <h3>Add City to Map</h3>
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                className="search-input"
                placeholder="City (e.g. Los Angeles)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="search-input"
                placeholder="State (e.g. California)"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <input
                className="search-input"
                placeholder="Country (e.g. USA)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <button
                type="submit"
                className="search-button"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="title-icon" size={20} />
                ) : (
                  <Search size={20} />
                )}
                Search
              </button>
            </form>
            {error && <div className="error-msg">{error}</div>}
          </div>
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="overlay-footer">
        <div className="glass-panel legend-panel">
          <h3>Air Quality Index</h3>
          <div className="legend-items">
            {aqiLegend.map((item) => (
              <div key={item.label} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color, color: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
