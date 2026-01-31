import { getGreeting } from '../domain/greeting'

export function useGreeting(): string {
  return getGreeting(new Date())
}
