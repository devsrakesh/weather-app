import { ref } from 'vue'

export function useTemperatureConverter() {
  const fahrenheitToCelsius = (kelvin: number): number => {
    return kelvin - 273.15
  }

  return { fahrenheitToCelsius }
}
