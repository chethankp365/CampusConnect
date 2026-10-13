/**
 * Calculates level from XP points matching PostgreSQL calculate_level() function.
 * Formula: floor(sqrt(xp / 50)) + 1
 */
export function calculateLevel(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

/**
 * Calculates XP required to reach a specific level.
 * Inversion of calculateLevel: xp = (level - 1)^2 * 50
 */
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.pow(level - 1, 2) * 50;
}

/**
 * Returns user progress towards next level:
 * { currentLevel, nextLevel, currentXp, currentLevelBaseXp, nextLevelXp, progressPercentage }
 */
export function getLevelProgress(xp: number) {
  const currentLevel = calculateLevel(xp);
  const nextLevel = currentLevel + 1;
  const currentLevelBaseXp = getXpForLevel(currentLevel);
  const nextLevelXp = getXpForLevel(nextLevel);
  const xpInCurrentLevel = Math.max(0, xp - currentLevelBaseXp);
  const totalNeededForNext = nextLevelXp - currentLevelBaseXp;
  const progressPercentage = Math.min(100, Math.round((xpInCurrentLevel / totalNeededForNext) * 100));

  return {
    currentLevel,
    nextLevel,
    currentXp: xp,
    currentLevelBaseXp,
    nextLevelXp,
    progressPercentage,
    xpRemaining: Math.max(0, nextLevelXp - xp),
  };
}
