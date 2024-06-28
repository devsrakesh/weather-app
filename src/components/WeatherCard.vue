<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import DateSelect from '@/components/DateSelectComponent.vue'
import { useDateFormatter } from '@/composables/useDateFormatter'
import { useTemperatureConverter } from '@/composables/useTemperatureConverter'
import { useTimeFormatter } from '@/composables/useTimeFormatter'

const weatherStore = useWeatherStore()
const selectedDate = ref<number | null>(null)

function handleDateChange(date: number) {
  console.log(selectedDate.value, date)
  selectedDate.value = date
  setCurrentData(date)
}

const { CurrentData, setCurrentData, dateTimestamps, weatherData, loading, error } = weatherStore
const { formatDate } = useDateFormatter()
const { fahrenheitToCelsius } = useTemperatureConverter()
const { formatTime } = useTimeFormatter()
</script>
<template>
  <div
    class="border bg-yellow-100 h-[40vh] w-full rounded-2xl p-5 flex flex-col items-center text-orange-500"
  >
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="weatherData">
      <!-- <pre>curre{{ CurrentData }}</pre> -->
      <div>
        <DateSelect
          v-if="dateTimestamps"
          :timestamps="dateTimestamps"
          @update:date="handleDateChange"
          class=""
        />
        <div class="flex justify-center items-center">
          <img
            :src="`https://openweathermap.org/img/wn/${CurrentData.weather[0].icon}.png`"
            alt="https://openweathermap.org/img/wn/04n.png"
            class="h-20"
          />
          <div class="text-orange-600 text-5xl">
            {{ fahrenheitToCelsius(CurrentData.temp.max).toFixed(0) }}
          </div>
        </div>
        <div class="text-center leading-8">{{ CurrentData.weather[0].description }}</div>
        <div class="text-center leading-8">{{ weatherData.timezone }}</div>
        <div class="text-center leading-8">{{ formatDate(weatherData.current.dt) }}</div>
        <div class="flex justify-center items-center gap-2">
          <div class="text-center leading-8">
            Feels Like {{ fahrenheitToCelsius(weatherData.current.feels_like).toFixed(0) }}
          </div>
          |
          <div class="text-center leading-8">
            Sunset {{ formatTime(weatherData.current.sunset) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
