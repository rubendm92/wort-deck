export function getGreeting(date: Date): string {
  const hour = date.getHours()

  if (hour >= 5 && hour < 12) return 'Guten Morgen'
  if (hour >= 12 && hour < 18) return 'Guten Tag'
  if (hour >= 18 && hour < 22) return 'Guten Abend'
  return 'Gute Nacht'
}
