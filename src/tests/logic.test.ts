import { describe, it, expect } from 'vitest';

// Business Logic Helpers (To be moved to a utils file)
export const calculateReadiness = (milestones: any[]) => {
  if (milestones.length === 0) return 0;
  const completed = milestones.filter(m => m.status === 'complete').length;
  return Math.round((completed / milestones.length) * 100);
};

describe('CivicPath Business Logic', () => {
  it('should calculate readiness score correctly', () => {
    const milestones = [
      { status: 'complete' },
      { status: 'todo' },
      { status: 'todo' },
      { status: 'todo' }
    ];
    expect(calculateReadiness(milestones)).toBe(25);
  });

  it('should handle empty milestones', () => {
    expect(calculateReadiness([])).toBe(0);
  });

  it('should handle all complete milestones', () => {
    const milestones = [{ status: 'complete' }, { status: 'complete' }];
    expect(calculateReadiness(milestones)).toBe(100);
  });
});

export const formatDeadline = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

describe('CivicPath Utility Helpers', () => {
  it('should format dates correctly', () => {
    expect(formatDeadline('2026-11-03')).toBe('Nov 3');
  });

  it('should validate persona strings', () => {
    const validPersonas = ['first-time', 'returning', 'absentee'];
    const testPersona = 'first-time';
    expect(validPersonas.includes(testPersona)).toBe(true);
  });
});
