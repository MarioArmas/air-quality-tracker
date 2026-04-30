import { cacheGet, cacheSet } from './cacheService'

const getApiKey = () => {
  const key = process.env.REACT_APP_IQAIR_API_KEY
  if (!key) throw new Error('API Key missing. Please add it to your .env file.')
  return key
}

// Fetch the list of supported countries — cached (memory → localStorage → API)
export const fetchCountries = async () => {
  const cached = cacheGet('iqair_countries')
  if (cached) return cached

  const res = await fetch(
    `https://api.airvisual.com/v2/countries?key=${getApiKey()}`
  )
  if (!res.ok) throw new Error('Could not fetch countries')
  const result = await res.json()
  if (result.status !== 'success') throw new Error('Countries data unavailable')

  const countries = result.data.map((c) => c.country).sort()
  cacheSet('iqair_countries', countries)
  return countries
}

// Fetch states for a given country — cached per country
export const fetchStates = async (country) => {
  const key = `iqair_states_${country}`
  const cached = cacheGet(key)
  if (cached) return cached

  const res = await fetch(
    `https://api.airvisual.com/v2/states?country=${encodeURIComponent(country)}&key=${getApiKey()}`
  )
  if (!res.ok) throw new Error('Could not fetch states')
  const result = await res.json()
  if (result.status !== 'success') throw new Error('States data unavailable')

  const states = result.data.map((s) => s.state).sort()
  cacheSet(key, states)
  return states
}

// Fetch cities for a given country + state — cached per pair
export const fetchCities = async (country, state) => {
  const key = `iqair_cities_${country}_${state}`
  const cached = cacheGet(key)
  if (cached) return cached

  const res = await fetch(
    `https://api.airvisual.com/v2/cities?state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}&key=${getApiKey()}`
  )
  if (!res.ok) throw new Error('Could not fetch cities')
  const result = await res.json()
  if (result.status !== 'success') throw new Error('Cities data unavailable')

  const cities = result.data.map((c) => c.city).sort()
  cacheSet(key, cities)
  return cities
}

export const fetchAirQuality = async (city, state, country) => {
  const apiKey = getApiKey()

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
    return {
      id: `${city}-${state}-${country}`,
      city,
      state,
      country,
      lat: location.coordinates[1],
      lng: location.coordinates[0],
      aqi: current.pollution.aqius,
      mainPollutant: current.pollution.mainus,
      temperature: current.weather.tp,
      humidity: current.weather.hu,
      windSpeed: current.weather.ws,
    }
  } else {
    throw new Error('Data could not be retrieved.')
  }
}

export const fetchNearestCityAirQuality = async () => {
  const apiKey = getApiKey()

  const response = await fetch(
    `https://api.airvisual.com/v2/nearest_city?key=${apiKey}`
  )

  if (!response.ok) {
    throw new Error('Could not fetch nearest city data')
  }

  const result = await response.json()
  if (result.status === 'success') {
    const { city, state, country, location, current } = result.data
    return {
      id: `${city}-${state}-${country}`,
      city,
      state,
      country,
      lat: location.coordinates[1],
      lng: location.coordinates[0],
      aqi: current.pollution.aqius,
      mainPollutant: current.pollution.mainus,
      temperature: current.weather.tp,
      humidity: current.weather.hu,
      windSpeed: current.weather.ws,
    }
  } else {
    throw new Error('Nearest city data could not be retrieved.')
  }
}
