export function formatTime(step = 15) {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      times.push(
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'am' : 'pm'}`,
      );
    }
  }
  return times;
}
