import React, { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

export default function GlobeMap() {
  const globeRef = useRef()
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

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
      // Auto-rotate
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().autoRotateSpeed = 0.5

      // Set initial point of view
      globeRef.current.pointOfView({ altitude: 2.5 }, 4000)
    }
  }, [])

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
      />
    </div>
  )
}
