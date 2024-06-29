<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useDateOptionsStore } from '@/stores/dateOptions';

const props = defineProps<{ timestamps: number[] }>();
const emits = defineEmits<{ (e: 'update:date', date: number): void }>();

const dateOptionsStore = useDateOptionsStore();
dateOptionsStore.setTimestamps(props.timestamps);

const selectedDate = ref<number | null>(null); // Local ref for selectedDate
const dateOptions = dateOptionsStore.dateOptions;

onMounted(() => {
  // Initialize selectedDate with a default value
  selectedDate.value = dateOptionsStore.selectedDate.value || props.timestamps[0];
});

watch(selectedDate, (newDate) => {
  if (newDate !== null) {
    dateOptionsStore.selectedDate.value = newDate; // Update store value
    emitDateChange();
  }
});

function emitDateChange() {
  if (selectedDate.value !== null) {
    emits('update:date', selectedDate.value);
    console.log(selectedDate.value);
  }
}
</script>

<template>
  <div class="w-full flex justify-center">
    <select class="bg-[#fee1b7] md:text-4xl" v-model="selectedDate" @change="emitDateChange">
      <option v-for="option in dateOptions" :key="option.timestamp" :value="option.timestamp" class="text-xl">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
