import React from 'react'
import { MapPin, X } from 'lucide-react'

function LocationPermissionModal({ onAllow, onDeny }) {
  return (
    <div className="location-modal-backdrop">
      <div className="location-modal glass-panel">
        <div className="location-modal-icon">
          <MapPin size={32} />
        </div>

        <h2 className="location-modal-title">Detect your location?</h2>
        <p className="location-modal-desc">
          Allow <strong>Air Quality Tracker</strong> to use your current
          location to instantly show the air quality near you.
        </p>

        <div className="location-modal-actions">
          <button className="location-btn location-btn-allow" onClick={onAllow}>
            <MapPin size={16} />
            Allow Location
          </button>
          <button className="location-btn location-btn-deny" onClick={onDeny}>
            <X size={16} />
            Not Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationPermissionModal
