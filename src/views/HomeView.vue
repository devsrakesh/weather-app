<script setup lang="ts">
import HourlyCard from '@/components/HourlyCard.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { useWeatherStore } from '@/stores/weather';
import { onMounted, ref, watch } from 'vue';
import { useGeolocation } from '@vueuse/core'
import { useLocationStore } from '@/stores/location';

const { coords } = useGeolocation()
const weatherStore = useWeatherStore();

const apiKey = ref('68e1c727fbe7ac2718cc25cc2989191b'); 
const locationStore = useLocationStore();
const { searchLocationsByCoordinates } = locationStore;


const searchByCoordinates = () => {
  if (coords.value?.latitude !== null && coords.value?.longitude !== null) {
    searchLocationsByCoordinates(coords.value?.latitude, coords.value?.longitude);
  }
};

onMounted(() => {
  if (coords.value?.latitude<Infinity&& coords.value?.longitude<Infinity) {
    weatherStore.fetchWeather(coords.value?.latitude, coords.value?.longitude, apiKey.value);
     searchByCoordinates()
  }

});

// watchEffect(() => {
//   if (coords.value?.latitude<Infinity&& coords.value?.longitude<Infinity) {
//     weatherStore.fetchWeather(coords.value?.latitude, coords.value?.longitude, apiKey.value);
//      searchByCoordinates()
     
//   }
// })

watch(coords, (newCoords) => {
 if (newCoords?.latitude<Infinity&& newCoords?.longitude<Infinity) {
    weatherStore.fetchWeather(newCoords?.latitude, newCoords?.longitude, apiKey.value);
     searchByCoordinates()
     
  }
}, { immediate: true });
</script>
    
<template>
  <main>
    <div class="w-full h-full px-8 md:p-20 flex flex-col md:flex-row gap-8 text-white pt-4">

      <WeatherCard />
      <div class="md:pr-32 ">

        <HourlyCard />
        <div >
          <h1 class="my-5 md:my-10  md:text-3xl">
            Random Text 
            <!-- {{ coords?.latitude  }}{{  coords?.longitude }} -->
          </h1>
          <p class="text-ellipsis line-clamp-3 md:line-clamp-6 md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, deleniti a facere officia amet, iusto itaque libero consectetur culpa perspiciatis tempora? Ipsum culpa nesciunt atque dolorem laborum, odio laboriosam doloribus!
          </p>
        </div>
      </div>
    </div>
    </main>
</template>
