import React from 'react'
import './App.css'
import GlobeMap from './components/GlobeMap'
import OverlayUI from './components/OverlayUI'

function App() {
  return (
    <div className="app-container">
      <GlobeMap />
      <OverlayUI />
    </div>
  )
}

export default App
