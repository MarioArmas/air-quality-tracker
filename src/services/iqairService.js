export const fetchAirQuality = async (city, state, country) => {
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
