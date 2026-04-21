import React from 'react'
import { Globe, Wind } from 'lucide-react'

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

export default function OverlayUI() {
  return (
    <div className="overlay-ui">
      {/* Header */}
      <div className="overlay-header">
        <div className="glass-panel title-panel">
          <Wind className="title-icon" size={28} />
          <h1>Global Air Quality</h1>
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
