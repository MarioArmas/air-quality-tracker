let countriesCache = null
const statesCache = new Map()
const citiesCache = new Map()

const getApiKey = () => {
  const key = process.env.REACT_APP_IQAIR_API_KEY
  if (!key) throw new Error('API Key missing. Please add it to your .env file.')
  return key
}

// Fetch the list of supported countries — cached after the first call
export const fetchCountries = async () => {
  if (countriesCache) return countriesCache

  const res = await fetch(
    `https://api.airvisual.com/v2/countries?key=${getApiKey()}`
  )
  if (!res.ok) throw new Error('Could not fetch countries')
  const result = await res.json()
  if (result.status !== 'success') throw new Error('Countries data unavailable')

  // result.data is [{country: "Australia"}, ...]
  countriesCache = result.data.map((c) => c.country).sort()
  return countriesCache
}

// Fetch states for a given country — cached per country
export const fetchStates = async (country) => {
  if (statesCache.has(country)) return statesCache.get(country)

  const res = await fetch(
    `https://api.airvisual.com/v2/states?country=${encodeURIComponent(country)}&key=${getApiKey()}`
  )
  if (!res.ok) throw new Error('Could not fetch states')
  const result = await res.json()
  if (result.status !== 'success') throw new Error('States data unavailable')

  const states = result.data.map((s) => s.state).sort()
  statesCache.set(country, states)
  return states
}

// Fetch cities for a given country+state — cached per pair
export const fetchCities = async (country, state) => {
  const cacheKey = `${country}|${state}`
  if (citiesCache.has(cacheKey)) return citiesCache.get(cacheKey)

  const res = await fetch(
    `https://api.airvisual.com/v2/cities?state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}&key=${getApiKey()}`
  )
  if (!res.ok) throw new Error('Could not fetch cities')
  const result = await res.json()
  if (result.status !== 'success') throw new Error('Cities data unavailable')

  const cities = result.data.map((c) => c.city).sort()
  citiesCache.set(cacheKey, cities)
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
    }
  } else {
    throw new Error('Nearest city data could not be retrieved.')
  }
}
