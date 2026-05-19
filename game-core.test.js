const test = require("node:test");
const assert = require("node:assert/strict");

const {
  DIFFICULTY_CONFIG,
  ROUND_TYPES,
  getComboMultiplier,
  calculateScore,
  createTimeoutResult,
  needsSuddenDeath,
  getWinnerIndex,
} = require("./game-core");

test("combo multiplier rewards longer streaks", () => {
  assert.equal(getComboMultiplier(0), 1);
  assert.equal(getComboMultiplier(2), 1);
  assert.equal(getComboMultiplier(3), 1.25);
  assert.equal(getComboMultiplier(5), 1.5);
});

test("fast difficult correct answer earns base, speed, combo, and round bonuses", () => {
  const result = calculateScore({
    difficulty: "hard",
    roundType: "lightning",
    isCorrect: true,
    timeRemainingMs: 4000,
    totalTimeMs: DIFFICULTY_CONFIG.hard.timeMs,
    currentCombo: 3,
  });

  assert.equal(result.basePoints, 240);
  assert.equal(result.speedBonus, 80);
  assert.equal(result.comboMultiplier, 1.25);
  assert.equal(result.roundMultiplier, ROUND_TYPES.lightning.scoreMultiplier);
  assert.equal(result.totalPoints, 480);
  assert.equal(result.nextCombo, 4);
});

test("incorrect answer earns no points and breaks combo", () => {
  const result = calculateScore({
    difficulty: "insane",
    roundType: "allOrNothing",
    isCorrect: false,
    timeRemainingMs: 2000,
    totalTimeMs: DIFFICULTY_CONFIG.insane.timeMs,
    currentCombo: 5,
  });

  assert.equal(result.totalPoints, 0);
  assert.equal(result.nextCombo, 0);
});

test("timeout result is an incorrect zero-point answer", () => {
  const result = createTimeoutResult({
    difficulty: "medium",
    roundType: "normal",
    currentCombo: 4,
  });

  assert.equal(result.isTimeout, true);
  assert.equal(result.isCorrect, false);
  assert.equal(result.totalPoints, 0);
  assert.equal(result.nextCombo, 0);
});

test("tied scores require sudden death", () => {
  assert.equal(needsSuddenDeath([1200, 1200]), true);
  assert.equal(needsSuddenDeath([1200, 1100]), false);
});

test("winner index is returned only when scores are not tied", () => {
  assert.equal(getWinnerIndex([900, 1200]), 1);
  assert.equal(getWinnerIndex([1500, 1200]), 0);
  assert.equal(getWinnerIndex([1500, 1500]), null);
});
