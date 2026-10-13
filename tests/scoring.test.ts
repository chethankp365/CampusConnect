import { describe, it, expect } from 'vitest';
import { calculateSkillMatch, cosineSimilarity } from '../src/lib/scoring/engine';
import { calculateLevel, getLevelProgress, getXpForLevel } from '../src/lib/scoring/levels';

describe('Skill Match Scoring Engine', () => {
  it('correctly calculates cosine similarity of 768d unit vectors', () => {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    const vecC = [0, 1, 0];
    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
    expect(cosineSimilarity(vecA, vecC)).toBeCloseTo(0.0);
  });

  it('calculates 100% skill match when all skills match at advanced level', () => {
    const candidate = {
      id: 'test_1',
      fullName: 'Alice',
      username: 'alice',
      skills: [
        { name: 'React.js', level: 'advanced' as const },
        { name: 'TypeScript', level: 'advanced' as const },
      ],
    };

    const res = calculateSkillMatch(candidate, {
      requiredSkills: ['React.js', 'TypeScript'],
    });

    expect(res.ruleScore).toBe(100);
    expect(res.score).toBe(100);
    expect(res.matchedSkills).toEqual(['React.js', 'TypeScript']);
    expect(res.missingSkills).toEqual([]);
    expect(res.explanation).toContain('Strong match: Has all required skills');
  });

  it('weights skill levels accurately (beginner vs advanced)', () => {
    const candidateBeginner = {
      id: 'test_2',
      fullName: 'Bob',
      username: 'bob',
      skills: [{ name: 'Python', level: 'beginner' as const }],
    };

    const res = calculateSkillMatch(candidateBeginner, {
      requiredSkills: ['Python'],
    });

    // Beginner multiplier is 0.6 -> 60% rule score
    expect(res.ruleScore).toBe(60);
  });
});

describe('Gamification Level & XP Calculator', () => {
  it('mirrors PostgreSQL calculate_level() function', () => {
    // Formula: floor(sqrt(xp / 50)) + 1
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(49)).toBe(1);
    expect(calculateLevel(50)).toBe(2);
    expect(calculateLevel(200)).toBe(3);
    expect(calculateLevel(450)).toBe(4);
  });

  it('calculates XP progress and percentage towards next level', () => {
    // Level 1: 0 to 50 XP
    const progress = getLevelProgress(25);
    expect(progress.currentLevel).toBe(1);
    expect(progress.nextLevel).toBe(2);
    expect(progress.progressPercentage).toBe(50);
    expect(progress.xpRemaining).toBe(25);
  });
});
