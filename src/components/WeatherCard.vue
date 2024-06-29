<script setup lang="ts">
import { ref, watchEffect} from 'vue';
import DateSelect from '@/components/DateSelectComponent.vue';
import { useDateFormatter } from '@/composables/useDateFormatter';
import { useTemperatureConverter } from '@/composables/useTemperatureConverter';
import { useTimeFormatter } from '@/composables/useTimeFormatter';
import { useDateOptionsStore } from '@/stores/dateOptions';

const { formatDate } = useDateFormatter();
const { fahrenheitToCelsius } = useTemperatureConverter();
const { formatTime } = useTimeFormatter();
const props = defineProps(['weatherData', 'dateTimestamps', "loading", "locations"]);

const dateOptionsStore = useDateOptionsStore();
dateOptionsStore.setTimestamps(props.dateTimestamps);

const selectDate = ref<number | null>(dateOptionsStore.selectedDate);
const setCurrentData = ref();

watchEffect(() => {
  const newDate = dateOptionsStore.selectedDate;
  selectDate.value = newDate;
  setCurrentData.value = props.weatherData && props.weatherData?.daily.find((day: any) => day.dt === newDate);
});

function handleDateChange(date: number) {
  setCurrentData.value = props.weatherData && props.weatherData?.daily.find((day: any) => day.dt === date);
  console.log("dat",date);
  
}

</script>

<template>
  <div class="border bg-[#fee1b7] min-h-[40vh] h-full md:h-full w-full rounded-2xl md:rounded-[60px] p-5 md:p-8 flex flex-col items-center text-[#fda679]">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div>
        <DateSelect
          v-if="props.dateTimestamps"
          :timestamps="props.dateTimestamps"
          @update:date="handleDateChange"
        />
        <div class="flex justify-center items-center md:py-5">
          <img
            :src="`https://openweathermap.org/img/wn/${setCurrentData.weather[0].icon}.png`"
            alt="Weather Icon"
            class="h-20 md:h-44"
          />
          <div class="text-[#fda679] text-6xl font-semibold md:text-9xl">
            {{ fahrenheitToCelsius(setCurrentData.temp.day).toFixed(0) }}
          </div>
        </div>
        <div class="flex flex-col md:gap-5">
          <div class="text-center leading-8 text-sm md:text-4xl">{{ setCurrentData.weather[0].main }}</div>
          <div class="text-center leading-8 md:text-2xl">
            {{ props.locations[0]?.address[1].long_name }}, {{ props.locations[0]?.address[0].long_name }}
          </div>
          <div class="text-center leading-8 md:text-2xl">{{ formatDate(props.weatherData.current.dt) }}</div>
          <div class="flex justify-center items-center gap-2 md:text-2xl">
            <div class="text-center leading-8 md:text-2xl">
              Feels Like {{ fahrenheitToCelsius(setCurrentData.feels_like.day).toFixed(0) }}
            </div>
            |
            <div class="text-center leading-8 md:text-2xl">
              Sunset {{ formatTime(setCurrentData.sunset) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
