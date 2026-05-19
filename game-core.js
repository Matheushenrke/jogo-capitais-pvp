const DIFFICULTY_CONFIG = {
  easy: {
    label: "Facil",
    basePoints: 100,
    timeMs: 14000,
  },
  medium: {
    label: "Medio",
    basePoints: 160,
    timeMs: 11000,
  },
  hard: {
    label: "Dificil",
    basePoints: 240,
    timeMs: 8000,
  },
  insane: {
    label: "Insano",
    basePoints: 360,
    timeMs: 6000,
  },
};

const ROUND_TYPES = {
  normal: {
    label: "Rodada normal",
    shortLabel: "Normal",
    timeMultiplier: 1,
    scoreMultiplier: 1,
    speedBonusMultiplier: 1,
    opponentMissBonusRate: 0,
  },
  lightning: {
    label: "Relampago",
    shortLabel: "Relampago",
    timeMultiplier: 0.72,
    scoreMultiplier: 1.2,
    speedBonusMultiplier: 5 / 3,
    opponentMissBonusRate: 0,
  },
  allOrNothing: {
    label: "Tudo ou Nada",
    shortLabel: "Tudo ou Nada",
    timeMultiplier: 0.9,
    scoreMultiplier: 1.5,
    speedBonusMultiplier: 1,
    opponentMissBonusRate: 0.2,
  },
  suddenDeath: {
    label: "Morte Subita",
    shortLabel: "Morte Subita",
    timeMultiplier: 0.68,
    scoreMultiplier: 1.3,
    speedBonusMultiplier: 1.25,
    opponentMissBonusRate: 0,
  },
};

function getComboMultiplier(streak) {
  if (streak >= 5) return 1.5;
  if (streak >= 3) return 1.25;
  return 1;
}

function getDifficultyConfig(difficulty) {
  return DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;
}

function getRoundTypeConfig(roundType) {
  return ROUND_TYPES[roundType] || ROUND_TYPES.normal;
}

function getRoundTimeMs(difficulty, roundType) {
  const difficultyConfig = getDifficultyConfig(difficulty);
  const roundConfig = getRoundTypeConfig(roundType);

  return Math.max(3000, Math.round(difficultyConfig.timeMs * roundConfig.timeMultiplier));
}

function calculateSpeedBonus({ basePoints, timeRemainingMs, totalTimeMs, roundType }) {
  if (totalTimeMs <= 0 || timeRemainingMs <= 0) return 0;

  const roundConfig = getRoundTypeConfig(roundType);
  const remainingRatio = Math.max(0, Math.min(1, timeRemainingMs / totalTimeMs));
  const rawBonus = basePoints * 0.4 * remainingRatio * roundConfig.speedBonusMultiplier;

  return Math.round(rawBonus);
}

function calculateScore({
  difficulty,
  roundType = "normal",
  isCorrect,
  timeRemainingMs,
  totalTimeMs,
  currentCombo,
}) {
  const difficultyConfig = getDifficultyConfig(difficulty);
  const roundConfig = getRoundTypeConfig(roundType);
  const basePoints = difficultyConfig.basePoints;

  if (!isCorrect) {
    return {
      isCorrect: false,
      isTimeout: false,
      basePoints,
      speedBonus: 0,
      comboMultiplier: getComboMultiplier(currentCombo),
      roundMultiplier: roundConfig.scoreMultiplier,
      totalPoints: 0,
      opponentBonus: Math.round(basePoints * roundConfig.opponentMissBonusRate),
      nextCombo: 0,
    };
  }

  const speedBonus = calculateSpeedBonus({
    basePoints,
    timeRemainingMs,
    totalTimeMs,
    roundType,
  });
  const comboMultiplier = getComboMultiplier(currentCombo);
  const totalPoints = Math.round((basePoints + speedBonus) * comboMultiplier * roundConfig.scoreMultiplier);

  return {
    isCorrect: true,
    isTimeout: false,
    basePoints,
    speedBonus,
    comboMultiplier,
    roundMultiplier: roundConfig.scoreMultiplier,
    totalPoints,
    opponentBonus: 0,
    nextCombo: currentCombo + 1,
  };
}

function createTimeoutResult({ difficulty, roundType = "normal", currentCombo }) {
  const result = calculateScore({
    difficulty,
    roundType,
    isCorrect: false,
    timeRemainingMs: 0,
    totalTimeMs: getRoundTimeMs(difficulty, roundType),
    currentCombo,
  });

  return {
    ...result,
    isTimeout: true,
  };
}

function needsSuddenDeath(scores) {
  return scores[0] === scores[1];
}

function getWinnerIndex(scores) {
  if (needsSuddenDeath(scores)) return null;
  return scores[0] > scores[1] ? 0 : 1;
}

const api = {
  DIFFICULTY_CONFIG,
  ROUND_TYPES,
  getComboMultiplier,
  getDifficultyConfig,
  getRoundTypeConfig,
  getRoundTimeMs,
  calculateSpeedBonus,
  calculateScore,
  createTimeoutResult,
  needsSuddenDeath,
  getWinnerIndex,
};

if (typeof module !== "undefined") {
  module.exports = api;
}

if (typeof window !== "undefined") {
  window.GameCore = api;
}
