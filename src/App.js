import React, { useState } from 'react'
import './App.css'
import GlobeMap from './components/GlobeMap'
import OverlayUI from './components/OverlayUI'

function App() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCityAirQuality = async (city, state, country) => {
    setLoading(true)
    setError(null)
    try {
      const apiKey = process.env.REACT_APP_IQAIR_API_KEY
      if (!apiKey) {
        throw new Error('API Key missing. Please add it to your .env file.')
      }

      const response = await fetch(
        `https://api.airvisual.com/v2/city?city=${encodeURIComponent(
          city
        )}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(
          country
        )}&key=${apiKey}`
      )

      if (!response.ok) {
        throw new Error('City not found or API error')
      }

      const result = await response.json()
      if (result.status === 'success') {
        const { city, state, country, location, current } = result.data
        const newLocation = {
          id: `${city}-${state}-${country}`,
          city,
          state,
          country,
          lat: location.coordinates[1],
          lng: location.coordinates[0],
          aqi: current.pollution.aqius,
        }

        // Avoid adding duplicates
        setLocations((prev) => {
          const exists = prev.find((loc) => loc.id === newLocation.id)
          if (exists) return prev
          return [...prev, newLocation]
        })
      } else {
        throw new Error('Data could not be retrieved.')
      }
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
      <OverlayUI
        onSearch={fetchCityAirQuality}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App
