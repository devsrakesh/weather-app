<script setup lang="ts">
import { useDateOptions } from '@/composables/useDateOptions';
import { useWeatherStore } from '@/stores/weather';

const props = defineProps<{ timestamps: number[] }>();
const emits = defineEmits<{ (e: 'update:date', date: number): void }>();

const { selectedDate, dateOptions } = useDateOptions(props.timestamps);
console.log(selectedDate.value, dateOptions.value)
function emitDateChange() {
  if (selectedDate.value !== null) {
    emits('update:date', selectedDate.value);
  }
}

</script>
<template>
  <div class=" w-full flex justify-center">
    <select class="bg-[#fee1b7] md:text-4xl" v-model="selectedDate" @change="emitDateChange">
      <option v-for="option in dateOptions" :key="option.timestamp" :value="option.timestamp" class="text-xl">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>



