<script setup lang="ts">
import HourlyCard from '@/components/HourlyCard.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useGeolocation } from '@vueuse/core'

const { coords, locatedAt, error, resume, pause } = useGeolocation()
const weatherStore = useWeatherStore();

const apiKey = ref('68e1c727fbe7ac2718cc25cc2989191b'); 

onMounted(() => {
  if (coords.value?.latitude<Infinity&& coords.value?.longitude<Infinity) {
     weatherStore.fetchWeather(coords.value?.latitude, coords.value?.longitude, apiKey.value);
  }
  
});

watchEffect(() => {
  console.log(coords.value?.latitude,coords.value?.longitude);
  if (coords.value?.latitude<Infinity&& coords.value?.longitude<Infinity) {
     weatherStore.fetchWeather(coords.value?.latitude, coords.value?.longitude, apiKey.value);
  }
})
</script>
    
<template>
  <main>
    <div class="w-full h-full px-8 flex flex-col md:flex-row gap-8 text-white">
      <WeatherCard />
      <div>

        <HourlyCard />
        <div >
          <h1 class="my-5">
            Random Text {{ coords?.latitude  }}{{  coords?.longitude }}
          </h1>
          <p class="text-ellipsis line-clamp-3 md:line-clamp-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, deleniti a facere officia amet, iusto itaque libero consectetur culpa perspiciatis tempora? Ipsum culpa nesciunt atque dolorem laborum, odio laboriosam doloribus!
          </p>
        </div>
      </div>
    </div>
    </main>
</template>
