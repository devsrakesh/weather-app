export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const today = new Date()
  const yesterday = new Date(today)
  const tomorrow = new Date(today)

  yesterday.setDate(today.getDate() - 1)
  tomorrow.setDate(today.getDate() + 1)

  // Reset the time parts to zero for comparison
  today.setHours(0, 0, 0, 0)
  yesterday.setHours(0, 0, 0, 0)
  tomorrow.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  console.log(date.getTime(), yesterday.getTime())

  if (date.getDate() === today.getDate()) {
    return 'Today'
  } else if (date.getDate() === yesterday.getDate()) {
    return 'Yesterday'
  } else if (date.getDate() === tomorrow.getDate()) {
    return 'Tomorrow'
  } else {
    return date.toLocaleDateString()
  }
}
