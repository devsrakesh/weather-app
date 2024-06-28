<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import DateSelect from '@/components/DateSelectComponent.vue'
import { useDateFormatter } from '@/composables/useDateFormatter'
import { useTemperatureConverter } from '@/composables/useTemperatureConverter'
import { useTimeFormatter } from '@/composables/useTimeFormatter'
import { useLocationStore } from '@/stores/location'
import { useDateOptions } from '@/composables/useDateOptions'

const { formatDate } = useDateFormatter()
const { fahrenheitToCelsius } = useTemperatureConverter()
const { formatTime } = useTimeFormatter()
const weatherStore = useWeatherStore()

const locationStore = useLocationStore();
const { locations } = locationStore;


const { dateTimestamps, weatherData, loading, error } = weatherStore
const selectDate = ref<number | null>(null)





function handleDateChange(date: number) {
  console.log(selectDate.value, date)
  selectDate.value = date
}

 const  setCurrentData= computed(()=>{
    const data = weatherData&& weatherData?.daily.filter((day:any) => day.dt === selectDate.value)
    return  data && data[0]
 }) 
  

</script>
<template>
  <div
    class="border bg-[#fee1b7] min-h-[40vh] h-full md:h-full w-full rounded-2xl md:rounded-[60px] p-5 md:p-8 flex flex-col items-center text-[#fda679]"
  >
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <pre>{{ setCurrentData }}</pre>
    <div v-if="weatherData">
      <div>
        <DateSelect
          v-if="dateTimestamps"
          :timestamps="dateTimestamps"
          @update:date="handleDateChange"
          class=""
        />
        <div class="flex justify-center items-center md:py-5">
          <img
            :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`"
            alt="https://openweathermap.org"
            class="h-20 md:h-44"
          />
          <div class="text-[#fda679] text-6xl font-semibold md:text-9xl">
            {{ fahrenheitToCelsius(weatherData.current.temp).toFixed(0) }}
          </div>
        </div>
        <div class="flex flex-col md:gap-5">

          <div class="text-center leading-8 text-sm md:text-4xl">{{ weatherData.current.weather[0].description }}</div>
          <div class="text-center leading-8 md:text-2xl" >
  {{ locations[0]?.address[1].long_name }},{{ locations[0]?.address[0].long_name }}
          </div>
          <div class="text-center leading-8 md:text-2xl">{{ formatDate(weatherData.current.dt) }}</div>
          <div class="flex justify-center items-center gap-2 md:text-2xl">
            <div class="text-center leading-8 md:text-2xl">
              Feels Like {{ fahrenheitToCelsius(weatherData.current.feels_like).toFixed(0) }}
            </div>
            |
            <div class="text-center leading-8 md:text-2xl">
              Sunset {{ formatTime(weatherData.current.sunset) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
