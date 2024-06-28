// stores/weatherStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { DailyWeather, WeatherData } from '@/types/weather'
import { DummyWeatherData } from '@/DummyData'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', () => {
  // state
  const weatherData = ref<WeatherData | null>(null)
  const CurrentData = ref<DailyWeather | null | undefined>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const CurrentWeatherData = ref<WeatherData | null>(null)

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
  const fetchCurrentWeather = async (lat: number, lon: number, time: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=68e1c727fbe7ac2718cc25cc2989191b`
      )

      const data = response.data
      // Assume you need to map the response to your state structure
      CurrentWeatherData.value = data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    fetchCurrentWeather,
    dateTimestamps,
    setCurrentData,
    CurrentData,
    weatherData,
    loading,
    error,
    fetchWeather
  }
})
