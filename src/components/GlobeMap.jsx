import React, { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'var(--aqi-good)'
  if (aqi <= 100) return 'var(--aqi-moderate)'
  if (aqi <= 150) return 'var(--aqi-unhealthy-sensitive)'
  if (aqi <= 200) return 'var(--aqi-unhealthy)'
  if (aqi <= 300) return 'var(--aqi-very-unhealthy)'
  return 'var(--aqi-hazardous)'
}

const getPollutantName = (code) => {
  const map = {
    p2: 'PM2.5',
    p1: 'PM10',
    o3: 'Ozone',
    n2: 'NO2',
    s2: 'SO2',
    co: 'CO',
  }
  return map[code] || code
}

export default function GlobeMap({ locations = [] }) {
  const globeRef = useRef()
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [selectedLocation, setSelectedLocation] = useState(null)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initial animation
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().autoRotateSpeed = 0.5
      globeRef.current.pointOfView({ altitude: 2.5 }, 4000)
    }
  }, [])

  // Fly to the newly added location
  useEffect(() => {
    if (locations.length > 0 && globeRef.current) {
      const latest = locations[locations.length - 1]
      globeRef.current.pointOfView(
        { lat: latest.lat, lng: latest.lng, altitude: 1.5 },
        2000
      )
      setSelectedLocation(latest)
    }
  }, [locations])

  return (
    <div className="globe-container">
      <Globe
        ref={globeRef}
        width={windowSize.width}
        height={windowSize.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="#050510"
        atmosphereColor="#a5b4fc"
        atmosphereAltitude={0.15}
        htmlElementsData={locations}
        htmlElement={(d) => {
          const el = document.createElement('div')
          el.className = 'marker'
          const color = getAqiColor(d.aqi)
          el.style.color = color
          el.innerHTML = `
            <div class="marker-dot" style="background-color: ${color}"></div>
            <div class="marker-label">${d.city}: ${d.aqi} AQI</div>
          `
          el.style.pointerEvents = 'auto'
          el.style.cursor = 'pointer'
          el.onclick = () => {
            setSelectedLocation(d)
            if (globeRef.current) {
              globeRef.current.pointOfView(
                { lat: d.lat, lng: d.lng, altitude: 1.5 },
                1000
              )
            }
          }
          return el
        }}
        htmlAltitude={0.05}
      />

      {selectedLocation && (
        <div className="glass-panel location-details-card">
          <button
            className="close-btn"
            onClick={() => setSelectedLocation(null)}
          >
            ✕
          </button>
          <h3>
            {selectedLocation.city}, {selectedLocation.country}
          </h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">AQI</span>
              <span
                className="detail-value"
                style={{
                  color: getAqiColor(selectedLocation.aqi),
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                {selectedLocation.aqi}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Main Pollutant</span>
              <span className="detail-value">
                {getPollutantName(selectedLocation.mainPollutant)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Temperature</span>
              <span className="detail-value">
                {selectedLocation.temperature}°C
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{selectedLocation.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">
                {selectedLocation.windSpeed} m/s
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
