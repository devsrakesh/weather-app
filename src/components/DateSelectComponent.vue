<script setup lang="ts">
import { useDateOptions } from '@/composables/useDateOptions';

const props = defineProps<{ timestamps: number[] }>();
const emits = defineEmits<{ (e: 'update:date', date: number): void }>();

const { selectedDate, dateOptions } = useDateOptions(props.timestamps);
console.log(selectedDate, dateOptions)
function emitDateChange() {
  if (selectedDate.value !== null) {
    emits('update:date', selectedDate.value);
  }
}
</script>
<template>
  <div class=" w-full flex justify-center">
    <select class="bg-pink-100" v-model="selectedDate" @change="emitDateChange">
      <option v-for="option in dateOptions" :key="option.timestamp" :value="option.timestamp">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>



