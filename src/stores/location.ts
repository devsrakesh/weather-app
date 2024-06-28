// src/stores/location.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchLocationByCoordinates } from '@/utils/googleSearchApi'

export interface addrs {
  long_name: string
  short_name: string
  types: string[]
}
interface Location {
  address: addrs[]
  lat: number
  lng: number
}

export const useLocationStore = defineStore('location', () => {
  const locations = ref<Location[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const searchLocationsByCoordinates = async (lat: number, lng: number) => {
    isLoading.value = true
    error.value = null
    try {
      const data = await searchLocationByCoordinates(lat, lng)
      locations.value = data.results.map((result: any) => {
        return {
          address: result.address_components,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        }
      })
    } catch (err) {
      error.value = 'Failed to fetch location data.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    locations,
    isLoading,
    error,
    searchLocationsByCoordinates
  }
})
