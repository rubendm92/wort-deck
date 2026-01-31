import { describe, it, expect } from 'vitest';
import { getGreeting } from './greeting';

describe('getGreeting', () => {
  it.each(['05:00', '08:30', '11:59'])('returns Guten Morgen at %s', (time) => {
    expect(getGreeting(new Date(`2024-01-01T${time}:00`))).toBe('Guten Morgen');
  });

  it.each(['12:00', '14:30', '17:59'])('returns Guten Tag at %s', (time) => {
    expect(getGreeting(new Date(`2024-01-01T${time}:00`))).toBe('Guten Tag');
  });

  it.each(['18:00', '20:00', '21:59'])('returns Guten Abend at %s', (time) => {
    expect(getGreeting(new Date(`2024-01-01T${time}:00`))).toBe('Guten Abend');
  });

  it.each(['22:00', '00:00', '03:00', '04:59'])(
    'returns Gute Nacht at %s',
    (time) => {
      expect(getGreeting(new Date(`2024-01-01T${time}:00`))).toBe('Gute Nacht');
    }
  );
});
