<script lang="ts" setup>
import HourlyItem from './HourlyItem.vue';
import { computed } from 'vue';

const props = defineProps(['weatherData'])


const alternateValues1 = computed(() => {
  return props.weatherData?.hourly.slice(0, 5);
});

const alternateValues2 = computed(() => {
  return props.weatherData?.hourly.slice(5, 10);
});
</script>

<template>
    <div class=" bg-[#fee1b7] bg-opacity-70 bg-blend-exclusion  w-full rounded-2xl  md:rounded-[40px] p-2 md:p-8 items-center  text-orange-500  ">
<div class="flex justify-between">
  <HourlyItem v-for="item in alternateValues1" :key="item.dt" :item="item" />
</div>
<div class="w-full border border-white md:my-8 my-2"></div>
<div class="flex justify-between">
  <HourlyItem v-for="item in alternateValues2" :key="item.dt" :item="item" />
</div>

    </div>
</template>
