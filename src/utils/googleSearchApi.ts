// src/services/googleMapsService.ts
import axios from 'axios'

const API_KEY = 'AIzaSyCX8U9p84lHzzvhIQFCKSbTQER1C5f8Vz4'
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

export const searchLocationByCoordinates = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(GEOCODE_URL, {
      params: {
        latlng: `${lat},${lng}`,
        key: API_KEY
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching location data:', error)
    throw error
  }
}
