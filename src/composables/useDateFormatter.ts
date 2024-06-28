export function useDateFormatter() {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  return { formatDate }
}
