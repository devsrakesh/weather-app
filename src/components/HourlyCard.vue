<script lang="ts" setup>
import { useWeatherStore } from '@/stores/weather';
import HourlyItem from './HourlyItem.vue';
import { computed } from 'vue';

const weatherStore = useWeatherStore();
const { weatherData, loading, error } = weatherStore;

const alternateValues = computed(() => {
  return weatherData?.hourly.slice(0,10); // Change condition for alternate selection
});
</script>

<template>
    <div class="border bg-pink-100  w-full rounded-2xl p-5 items-center  text-orange-500 grid grid-cols-5 gap-4">

        <HourlyItem v-for="item in alternateValues" :key="item.dt" :item="item" />

    </div>
</template>
