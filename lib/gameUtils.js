/**
 * gameUtils.js
 * Central game logic helpers — used by game/page.js
 * Separates business concerns from UI rendering
 */

import { getBalancedBatch as _getBalancedBatch } from "../data/scenarios";

// ─── Scenario Loading ──────────────────────────────────────────────

/**
 * Load a fresh batch of scenarios for the current player's business + level
 * Falls back gracefully if the pool is small
 */
export function loadScenarioBatch(businessId, level, batchSize = 20) {
  if (!businessId) {
    console.warn("loadScenarioBatch: no businessId provided");
    return [];
  }
  return _getBalancedBatch(businessId, level, batchSize);
}

// ─── Scoring ──────────────────────────────────────────────────────

export const POINTS = {
  CORRECT: 10,
  STREAK_5_BONUS: 20,
  STREAK_10_BONUS: 50,
};

/**
 * Calculate points earned for a correct answer at a given streak
 */
export function calculatePoints(streakAfterAnswer) {
  let points = POINTS.CORRECT;
  let label = `+${POINTS.CORRECT}`;

  if (streakAfterAnswer === 10) {
    points += POINTS.STREAK_10_BONUS;
    label = `+${points} 💥 MEGA STREAK!`;
  } else if (streakAfterAnswer === 5) {
    points += POINTS.STREAK_5_BONUS;
    label = `+${points} 🔥 STREAK!`;
  } else if (streakAfterAnswer > 10 && streakAfterAnswer % 5 === 0) {
    // Every 5 after 10 also gets a bonus
    points += POINTS.STREAK_5_BONUS;
    label = `+${points} 🔥 STREAK!`;
  }

  return { points, label };
}

// ─── Level Progression ────────────────────────────────────────────

export const LEVEL_CONFIG = {
  STREAK_THRESHOLD: 8, // correct in a row to level up
  ACCURACY_THRESHOLD: 0.85, // 85% accuracy over sample
  ACCURACY_SAMPLE: 20, // questions in sample window
  MAX_LEVEL: 5,
};

/**
 * Check whether the player should level up
 */
export function shouldLevelUp(
  streak,
  totalAnswered,
  totalCorrect,
  currentLevel,
) {
  if (currentLevel >= LEVEL_CONFIG.MAX_LEVEL) return false;

  // Condition 1: long streak
  if (streak >= LEVEL_CONFIG.STREAK_THRESHOLD) return true;

  // Condition 2: sustained accuracy over sample window
  if (
    totalAnswered >= LEVEL_CONFIG.ACCURACY_SAMPLE &&
    totalCorrect / totalAnswered >= LEVEL_CONFIG.ACCURACY_THRESHOLD
  )
    return true;

  return false;
}

// ─── Accuracy & Grading ───────────────────────────────────────────

export function calcAccuracy(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function calcGrade(accuracy) {
  if (accuracy >= 90)
    return { grade: "S", label: "Legendary", color: "#E8820C" };
  if (accuracy >= 75) return { grade: "A", label: "Expert", color: "#2D9A4E" };
  if (accuracy >= 60) return { grade: "B", label: "Solid", color: "#1D4ED8" };
  if (accuracy >= 45)
    return { grade: "C", label: "Learning", color: "#78716C" };
  return { grade: "F", label: "Try Again", color: "#E03131" };
}

// ─── Session Serialization ────────────────────────────────────────

export function buildSessionPayload({
  userId,
  score,
  accuracy,
  level,
  scamsBlocked,
  safeBlocked,
  totalAnswered,
}) {
  return {
    user_id: userId,
    score,
    accuracy,
    level_reached: level,
    scams_blocked: scamsBlocked,
    safe_blocked: safeBlocked,
    total_answered: totalAnswered,
    timestamp: new Date().toISOString(),
  };
}
