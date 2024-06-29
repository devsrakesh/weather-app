import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { formatDate } from '@/utils/formatDate'

interface DateOption {
  label: string
  timestamp: number
}

export const useDateOptionsStore = defineStore('dateOptions', () => {
  const timestamps = ref<number[]>([]) // Initialize with empty array or pass your initial timestamps here
  const today = new Date().setHours(0, 0, 0, 0) / 1000
  const selectedDate = ref<number | null>(null)

  const setTimestamps = (newTimestamps: number[]) => {
    timestamps.value = newTimestamps
    selectedDate.value = newTimestamps?.includes(today) ? today : newTimestamps[0] || null
  }

  const dateOptions = computed<DateOption[]>(() => {
    return timestamps.value.map((timestamp) => ({
      label: formatDate(timestamp),
      timestamp
    }))
  })

  return {
    timestamps,
    selectedDate,
    dateOptions,
    setTimestamps
  }
})
