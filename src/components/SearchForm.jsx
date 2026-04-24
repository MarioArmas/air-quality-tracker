import React, { useState, useEffect } from 'react'
import { Search, Loader2 } from 'lucide-react'
import {
  fetchCountries,
  fetchStates,
  fetchCities,
} from '../services/iqairService'

export default function SearchForm({ onSearch, loading, error }) {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)

  // ── Load countries once on mount ──────────────────────────────────────────
  useEffect(() => {
    setLoadingCountries(true)
    fetchCountries()
      .then((list) => {
        setCountries(list)
        if (list.length > 0) setCountry(list[0])
      })
      .catch(console.error)
      .finally(() => setLoadingCountries(false))
  }, [])

  // ── Load states whenever country changes ──────────────────────────────────
  useEffect(() => {
    if (!country) return
    setState('')
    setCity('')
    setStates([])
    setCities([])
    setLoadingStates(true)
    fetchStates(country)
      .then((list) => {
        setStates(list)
        if (list.length > 0) setState(list[0])
      })
      .catch(console.error)
      .finally(() => setLoadingStates(false))
  }, [country])

  // ── Load cities whenever state changes ────────────────────────────────────
  useEffect(() => {
    if (!country || !state) return
    setCity('')
    setCities([])
    setLoadingCities(true)
    fetchCities(country, state)
      .then((list) => {
        setCities(list)
        if (list.length > 0) setCity(list[0])
      })
      .catch(console.error)
      .finally(() => setLoadingCities(false))
  }, [country, state])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city && state && country && onSearch) {
      onSearch(city, state, country)
    }
  }

  const selectClass = 'search-input search-select'

  return (
    <div className="glass-panel search-panel">
      <h3>Add City to Map</h3>
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Country */}
        <div className="select-wrapper">
          {loadingCountries && <Loader2 className="select-spinner" size={14} />}
          <select
            className={selectClass}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={loadingCountries}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="select-wrapper">
          {loadingStates && <Loader2 className="select-spinner" size={14} />}
          <select
            className={selectClass}
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={loadingStates || !country}
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="select-wrapper">
          {loadingCities && <Loader2 className="select-spinner" size={14} />}
          <select
            className={selectClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loadingCities || !state}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="search-button"
          disabled={loading || !city}
        >
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
