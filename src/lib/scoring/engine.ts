import type { SkillLevel } from '@/types/database';

export interface UserSkillProfile {
  name: string;
  level: SkillLevel;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
  collegeId?: string;
  collegeName?: string;
  branch?: string;
  semester?: number;
  skills: UserSkillProfile[];
  interests?: string[];
  bio?: string;
  embedding?: number[];
}

export interface MatchOptions {
  requiredSkills: string[];
  seekerCollegeId?: string;
  seekerSemester?: number;
  seekerSkills?: string[];
  mode?: 'teammates' | 'complementary' | 'mentors';
}

export interface MatchResult {
  score: number;
  ruleScore: number;
  semanticScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  complementarySkills: string[];
  explanation: string;
}

const LEVEL_MULTIPLIERS: Record<SkillLevel, number> = {
  beginner: 0.6,
  intermediate: 0.85,
  advanced: 1.0,
};

export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length || a.length === 0) return 0.5;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0.5;
  const sim = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.max(0, Math.min(1, sim));
}

export function calculateSkillMatch(
  candidate: CandidateProfile,
  options: MatchOptions,
  queryEmbedding?: number[]
): MatchResult {
  const { requiredSkills, seekerCollegeId, seekerSemester, seekerSkills = [], mode = 'teammates' } = options;

  if (requiredSkills.length === 0) {
    return {
      score: 50,
      ruleScore: 50,
      semanticScore: 50,
      matchedSkills: [],
      missingSkills: [],
      complementarySkills: [],
      explanation: 'No specific skills required. Showing general profile compatibility.',
    };
  }

  const candidateSkillMap = new Map<string, SkillLevel>();
  candidate.skills.forEach(s => {
    candidateSkillMap.set(s.name.toLowerCase().trim(), s.level);
  });

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  let weightedSkillPoints = 0;

  requiredSkills.forEach(req => {
    const key = req.toLowerCase().trim();
    if (candidateSkillMap.has(key)) {
      const level = candidateSkillMap.get(key)!;
      matchedSkills.push(req);
      weightedSkillPoints += LEVEL_MULTIPLIERS[level] || 0.85;
    } else {
      missingSkills.push(req);
    }
  });

  // Base rule score percentage
  let ruleScore = (weightedSkillPoints / requiredSkills.length) * 100;

  // Cross-college bonus (+5)
  if (seekerCollegeId && candidate.collegeId && candidate.collegeId !== seekerCollegeId) {
    ruleScore = Math.min(100, ruleScore + 5);
  }

  // Same-semester bonus (+3)
  if (seekerSemester && candidate.semester && candidate.semester === seekerSemester) {
    ruleScore = Math.min(100, ruleScore + 3);
  }

  // Find complementary skills (skills candidate has that seeker doesn't have)
  const seekerSkillSet = new Set(seekerSkills.map(s => s.toLowerCase().trim()));
  const complementarySkills = candidate.skills
    .filter(s => !seekerSkillSet.has(s.name.toLowerCase().trim()))
    .map(s => s.name);

  if (mode === 'complementary' && complementarySkills.length > 0) {
    ruleScore = Math.min(100, ruleScore + Math.min(10, complementarySkills.length * 2));
  }

  ruleScore = Math.round(ruleScore);

  // Semantic layer
  let semanticScore = 50;
  if (queryEmbedding && candidate.embedding) {
    semanticScore = Math.round(cosineSimilarity(queryEmbedding, candidate.embedding) * 100);
  } else {
    // Default fallback based on rule overlap
    semanticScore = ruleScore;
  }

  // Final score: 0.6 * rule + 0.4 * semantic
  const finalScore = Math.min(100, Math.round(0.6 * ruleScore + 0.4 * semanticScore));

  let explanation = '';
  if (matchedSkills.length === requiredSkills.length) {
    explanation = `Strong match: Has all required skills (${matchedSkills.join(', ')}).`;
  } else if (matchedSkills.length > 0) {
    explanation = `Covers ${matchedSkills.length}/${requiredSkills.length} skills (has ${matchedSkills.join(', ')}${missingSkills.length > 0 ? `, missing ${missingSkills.join(', ')}` : ''}).`;
  } else {
    explanation = `Missing key required skills (${requiredSkills.join(', ')}).`;
  }

  if (complementarySkills.length > 0) {
    explanation += ` Brings complementary skills: ${complementarySkills.slice(0, 3).join(', ')}.`;
  }

  return {
    score: finalScore,
    ruleScore,
    semanticScore,
    matchedSkills,
    missingSkills,
    complementarySkills,
    explanation,
  };
}
