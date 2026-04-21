import React from 'react'
import { Wind } from 'lucide-react'

export default function Header() {
  return (
    <div className="glass-panel title-panel">
      <Wind className="title-icon" size={28} />
      <h1>Air Quality Tracker</h1>
    </div>
  )
}
