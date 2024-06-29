<script setup lang="ts">
import HourlyCard from '@/components/HourlyCard.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { ref, watch,watchEffect } from 'vue';
import { useGeolocation } from '@vueuse/core';
import { useLocationStore } from '@/stores/location';
import { useDateOptions } from '@/composables/useDateOptions';


const { coords } = useGeolocation();
const weatherStore = useWeatherStore();
const apiKey = '68e1c727fbe7ac2718cc25cc2989191b'
const locationStore = useLocationStore();

watch(coords, (newCoords) => {
  if (newCoords?.latitude && newCoords?.longitude) {
    weatherStore.fetchWeather(coords.value.latitude, coords.value.longitude, apiKey);
    locationStore.searchLocationsByCoordinates(coords.value.latitude, coords.value.longitude);
}
}, { immediate: true });



</script>

<template>
  <main>
    <div class="w-full h-full px-8 md:p-20 flex flex-col md:flex-row gap-8 text-white pt-4">
      <WeatherCard :selectedDate="selectedDate"  :weatherData="weatherStore.weatherData" :dateTimestamps="weatherStore.dateTimestamps" :loading="weatherStore.loading" :locations="locationStore.locations"/>
      <div class="md:pr-32">
        <HourlyCard :weatherData="weatherStore.weatherData" :dateTimestamps="weatherStore.dateTimestamps" :loading="weatherStore.loading" />
        <div>
          <h1 class="my-5 md:my-10 md:text-3xl">
            Random Text 
          </h1>
          <p class="text-ellipsis line-clamp-3 md:line-clamp-6 md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, deleniti a facere officia amet, iusto itaque libero consectetur culpa perspiciatis tempora? Ipsum culpa nesciunt atque dolorem laborum, odio laboriosam doloribus!
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
