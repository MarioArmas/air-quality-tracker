import React, { useState } from 'react'
import './App.css'
import GlobeMap from './components/GlobeMap'
import OverlayUI from './components/OverlayUI'
import { fetchAirQuality } from './services/iqairService'

function App() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city, state, country) => {
    setLoading(true)
    setError(null)
    try {
      const newLocation = await fetchAirQuality(city, state, country)

      // Avoid adding duplicates
      setLocations((prev) => {
        const exists = prev.find((loc) => loc.id === newLocation.id)
        if (exists) return prev
        return [...prev, newLocation]
      })
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <GlobeMap locations={locations} />
      <OverlayUI onSearch={handleSearch} loading={loading} error={error} />
    </div>
  )
}

export default App
