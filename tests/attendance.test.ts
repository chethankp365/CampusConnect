import { describe, it, expect } from 'vitest';
import { calculateAttendance } from '../src/lib/scoring/attendance';

describe('Attendance Guardian Math Engine', () => {
  it('correctly calculates percentage with 1 decimal precision', () => {
    const res = calculateAttendance(28, 32, 75);
    expect(res.percentage).toBe(87.5);
    expect(res.status).toBe('safe');
  });

  it('correctly computes safe bunk classes when above minimum threshold', () => {
    // 28 attended out of 32 total with 75% required:
    // floor(100 * 28 / 75 - 32) = floor(37.33 - 32) = 5 classes
    const res = calculateAttendance(28, 32, 75);
    expect(res.classesCanBunk).toBe(5);
    expect(res.classesNeeded).toBe(0);
    expect(res.message).toContain('You can safely skip 5 more classes');
  });

  it('correctly calculates needed recovery classes when below minimum threshold', () => {
    // 15 attended out of 25 total (60%) with 75% required:
    // ceil((75 * 25 - 100 * 15) / (100 - 75)) = ceil((1875 - 1500) / 25) = ceil(375 / 25) = 15 classes
    const res = calculateAttendance(15, 25, 75);
    expect(res.percentage).toBe(60);
    expect(res.classesCanBunk).toBe(0);
    expect(res.classesNeeded).toBe(15);
    expect(res.status).toBe('danger');
    expect(res.message).toContain('Attend the next 15 consecutive classes');
  });

  it('handles edge case when classes attended is exactly at threshold', () => {
    // 15 attended out of 20 total (75%)
    const res = calculateAttendance(15, 20, 75);
    expect(res.percentage).toBe(75);
    expect(res.classesCanBunk).toBe(0);
    expect(res.status).toBe('warning');
    expect(res.message).toContain('On the edge at 75%');
  });
});
