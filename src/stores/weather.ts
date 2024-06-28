// stores/weatherStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { DailyWeather, WeatherData } from '@/types/weather'
import api from '@/utils/axiosUtil'
import { DummyWeatherData } from '@/DummyData'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', () => {
  // state
  const weatherData = ref<WeatherData | null>(null)
  const CurrentData = ref<DailyWeather | null | undefined>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // gatter
  const dateTimestamps = computed(() => {
    return weatherData.value?.daily.map((day) => day.dt)
  })

  // action
  function setCurrentData(date: number) {
    const data = weatherData.value?.daily.filter((day) => day.dt === date)
    CurrentData.value = data && data[0]
  }

  async function fetchWeather(lat: number, lon: number, apiKey: string) {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      weatherData.value = response.data
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return {
    dateTimestamps,
    setCurrentData,
    CurrentData,
    weatherData,
    loading,
    error,
    fetchWeather
  }
})
