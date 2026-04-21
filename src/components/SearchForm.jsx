import React, { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

export default function SearchForm({ onSearch, loading, error }) {
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
        <button type="submit" className="search-button" disabled={loading}>
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
  )
}
