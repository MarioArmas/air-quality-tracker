import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'
import Legend from './Legend'

export default function OverlayUI({ onSearch, loading, error }) {
  return (
    <div className="overlay-ui">
      {/* Header & Search */}
      <div className="overlay-header">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Header />
          <SearchForm onSearch={onSearch} loading={loading} error={error} />
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="overlay-footer">
        <Legend />
      </div>
    </div>
  )
}
