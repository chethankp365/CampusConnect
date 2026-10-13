export interface AttendanceCalculation {
  percentage: number;
  classesCanBunk: number;
  classesNeeded: number;
  status: 'safe' | 'warning' | 'danger';
  message: string;
}

export function calculateAttendance(
  attended: number,
  total: number,
  minRequired: number = 75
): AttendanceCalculation {
  if (total <= 0) {
    return {
      percentage: 100,
      classesCanBunk: 0,
      classesNeeded: 0,
      status: 'safe',
      message: 'No classes recorded yet. You are all set.',
    };
  }

  const percentage = Math.round((attended / total) * 1000) / 10; // 1 decimal place

  if (percentage >= minRequired) {
    // Formula: floor(100 * attended / min - total)
    const canBunk = Math.max(0, Math.floor((100 * attended) / minRequired - total));
    const status = percentage >= minRequired + 5 ? 'safe' : 'warning';
    const message = canBunk === 0
      ? `On the edge at ${percentage}%. Do not miss any upcoming classes.`
      : canBunk === 1
      ? `You can safely skip 1 more class while maintaining ${minRequired}%.`
      : `You can safely skip ${canBunk} more classes while maintaining ${minRequired}%.`;

    return {
      percentage,
      classesCanBunk: canBunk,
      classesNeeded: 0,
      status,
      message,
    };
  } else {
    // Formula: ceil((min * total - 100 * attended) / (100 - min))
    const needed = Math.max(0, Math.ceil((minRequired * total - 100 * attended) / (100 - minRequired)));
    const message = needed === 1
      ? `Attend the next class to reach ${minRequired}%.`
      : `Attend the next ${needed} consecutive classes to reach ${minRequired}%.`;

    return {
      percentage,
      classesCanBunk: 0,
      classesNeeded: needed,
      status: 'danger',
      message,
    };
  }
}
