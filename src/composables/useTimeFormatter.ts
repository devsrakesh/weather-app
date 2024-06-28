export function useTimeFormatter() {
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
      //   second: '2-digit'
    }
    return date.toLocaleTimeString(undefined, options)
  }

  return { formatTime }
}
