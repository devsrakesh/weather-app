// composables/useDateOptions.ts
import { ref, computed } from 'vue'
import { formatDate } from '@/utils/formatDate'

interface DateOption {
  label: string
  timestamp: number
}

export function useDateOptions(timestamps: number[]) {
  const today = new Date().setHours(0, 0, 0, 0) / 1000
  const selectedDate = ref<number | null>(timestamps.includes(today) ? today : timestamps[0])
  console.log(timestamps)

  const dateOptions = computed<DateOption[]>(() => {
    return timestamps.map((timestamp) => ({
      label: formatDate(timestamp),
      timestamp
    }))
  })

  return {
    selectedDate,
    dateOptions
  }
}
