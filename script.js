const {
  DIFFICULTY_CONFIG,
  ROUND_TYPES,
  getComboMultiplier,
  getRoundTimeMs,
  calculateScore,
  createTimeoutResult,
  needsSuddenDeath,
  getWinnerIndex,
} = window.GameCore;

const questions = [
  { country: "Brasil", capital: "Brasília", type: "countries", difficulty: "easy" },
  { country: "Argentina", capital: "Buenos Aires", type: "countries", difficulty: "easy" },
  { country: "Chile", capital: "Santiago", type: "countries", difficulty: "easy" },
  { country: "Uruguai", capital: "Montevideu", type: "countries", difficulty: "easy" },
  { country: "Paraguai", capital: "Assunção", type: "countries", difficulty: "medium" },
  { country: "Bolívia", capital: "Sucre", type: "countries", difficulty: "hard" },
  { country: "Peru", capital: "Lima", type: "countries", difficulty: "easy" },
  { country: "Colômbia", capital: "Bogotá", type: "countries", difficulty: "medium" },
  { country: "Venezuela", capital: "Caracas", type: "countries", difficulty: "medium" },
  { country: "Equador", capital: "Quito", type: "countries", difficulty: "medium" },
  { country: "México", capital: "Cidade do México", type: "countries", difficulty: "easy" },
  { country: "Estados Unidos", capital: "Washington, D.C.", type: "countries", difficulty: "easy" },
  { country: "Canadá", capital: "Ottawa", type: "countries", difficulty: "easy" },
  { country: "Portugal", capital: "Lisboa", type: "countries", difficulty: "easy" },
  { country: "Espanha", capital: "Madri", type: "countries", difficulty: "easy" },
  { country: "França", capital: "Paris", type: "countries", difficulty: "easy" },
  { country: "Itália", capital: "Roma", type: "countries", difficulty: "easy" },
  { country: "Alemanha", capital: "Berlim", type: "countries", difficulty: "easy" },
  { country: "Reino Unido", capital: "Londres", type: "countries", difficulty: "easy" },
  { country: "Irlanda", capital: "Dublin", type: "countries", difficulty: "medium" },
  { country: "Noruega", capital: "Oslo", type: "countries", difficulty: "medium" },
  { country: "Suécia", capital: "Estocolmo", type: "countries", difficulty: "medium" },
  { country: "Finlândia", capital: "Helsinque", type: "countries", difficulty: "medium" },
  { country: "Dinamarca", capital: "Copenhague", type: "countries", difficulty: "medium" },
  { country: "Países Baixos", capital: "Amsterdã", type: "countries", difficulty: "medium" },
  { country: "Bélgica", capital: "Bruxelas", type: "countries", difficulty: "medium" },
  { country: "Suíça", capital: "Berna", type: "countries", difficulty: "hard" },
  { country: "Áustria", capital: "Viena", type: "countries", difficulty: "medium" },
  { country: "Grécia", capital: "Atenas", type: "countries", difficulty: "easy" },
  { country: "Turquia", capital: "Ancara", type: "countries", difficulty: "medium" },
  { country: "Rússia", capital: "Moscou", type: "countries", difficulty: "easy" },
  { country: "China", capital: "Pequim", type: "countries", difficulty: "easy" },
  { country: "Japão", capital: "Tóquio", type: "countries", difficulty: "easy" },
  { country: "Coreia do Sul", capital: "Seul", type: "countries", difficulty: "medium" },
  { country: "Índia", capital: "Nova Deli", type: "countries", difficulty: "medium" },
  { country: "Tailândia", capital: "Bangkok", type: "countries", difficulty: "medium" },
  { country: "Vietnã", capital: "Hanói", type: "countries", difficulty: "hard" },
  { country: "Indonésia", capital: "Jacarta", type: "countries", difficulty: "hard" },
  { country: "Filipinas", capital: "Manila", type: "countries", difficulty: "hard" },
  { country: "Austrália", capital: "Camberra", type: "countries", difficulty: "medium" },
  { country: "Nova Zelândia", capital: "Wellington", type: "countries", difficulty: "medium" },
  { country: "Egito", capital: "Cairo", type: "countries", difficulty: "easy" },
  { country: "Marrocos", capital: "Rabat", type: "countries", difficulty: "hard" },
  { country: "África do Sul", capital: "Pretória", type: "countries", difficulty: "hard" },
  { country: "Quênia", capital: "Nairóbi", type: "countries", difficulty: "hard" },
  { country: "Nigéria", capital: "Abuja", type: "countries", difficulty: "hard" },
  { country: "Angola", capital: "Luanda", type: "countries", difficulty: "medium" },
  { country: "Moçambique", capital: "Maputo", type: "countries", difficulty: "hard" },
  { country: "Cabo Verde", capital: "Praia", type: "countries", difficulty: "insane" },
  { country: "Polônia", capital: "Varsóvia", type: "countries", difficulty: "medium" },
  { country: "Arábia Saudita", capital: "Riade", type: "countries", difficulty: "hard" },
  { country: "Emirados Árabes Unidos", capital: "Abu Dhabi", type: "countries", difficulty: "insane" },
  { country: "Acre", capital: "Rio Branco", type: "states", difficulty: "medium" },
  { country: "Alagoas", capital: "Maceió", type: "states", difficulty: "medium" },
  { country: "Amapá", capital: "Macapá", type: "states", difficulty: "hard" },
  { country: "Amazonas", capital: "Manaus", type: "states", difficulty: "easy" },
  { country: "Bahia", capital: "Salvador", type: "states", difficulty: "easy" },
  { country: "Ceará", capital: "Fortaleza", type: "states", difficulty: "easy" },
  { country: "Distrito Federal", capital: "Brasília", type: "states", difficulty: "easy" },
  { country: "Espírito Santo", capital: "Vitória", type: "states", difficulty: "medium" },
  { country: "Goiás", capital: "Goiânia", type: "states", difficulty: "medium" },
  { country: "Maranhão", capital: "São Luís", type: "states", difficulty: "medium" },
  { country: "Mato Grosso", capital: "Cuiabá", type: "states", difficulty: "medium" },
  { country: "Mato Grosso do Sul", capital: "Campo Grande", type: "states", difficulty: "medium" },
  { country: "Minas Gerais", capital: "Belo Horizonte", type: "states", difficulty: "easy" },
  { country: "Pará", capital: "Belém", type: "states", difficulty: "medium" },
  { country: "Paraíba", capital: "João Pessoa", type: "states", difficulty: "medium" },
  { country: "Paraná", capital: "Curitiba", type: "states", difficulty: "easy" },
  { country: "Pernambuco", capital: "Recife", type: "states", difficulty: "easy" },
  { country: "Piauí", capital: "Teresina", type: "states", difficulty: "hard" },
  { country: "Rio de Janeiro", capital: "Rio de Janeiro", type: "states", difficulty: "easy" },
  { country: "Rio Grande do Norte", capital: "Natal", type: "states", difficulty: "medium" },
  { country: "Rio Grande do Sul", capital: "Porto Alegre", type: "states", difficulty: "easy" },
  { country: "Rondônia", capital: "Porto Velho", type: "states", difficulty: "hard" },
  { country: "Roraima", capital: "Boa Vista", type: "states", difficulty: "hard" },
  { country: "Santa Catarina", capital: "Florianópolis", type: "states", difficulty: "medium" },
  { country: "São Paulo", capital: "São Paulo", type: "states", difficulty: "easy" },
  { country: "Sergipe", capital: "Aracaju", type: "states", difficulty: "hard" },
  { country: "Tocantins", capital: "Palmas", type: "states", difficulty: "hard" },
];

const elements = {
  setupScreen: document.querySelector("#setupScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  setupForm: document.querySelector("#setupForm"),
  playerOneName: document.querySelector("#playerOneName"),
  playerTwoName: document.querySelector("#playerTwoName"),
  roundsSelect: document.querySelector("#roundsSelect"),
  categorySelect: document.querySelector("#categorySelect"),
  playerOneNameDisplay: document.querySelector("#playerOneNameDisplay"),
  playerTwoNameDisplay: document.querySelector("#playerTwoNameDisplay"),
  playerOneScore: document.querySelector("#playerOneScore"),
  playerTwoScore: document.querySelector("#playerTwoScore"),
  playerOneMeta: document.querySelector("#playerOneMeta"),
  playerTwoMeta: document.querySelector("#playerTwoMeta"),
  playerOnePanel: document.querySelector("#playerOnePanel"),
  playerTwoPanel: document.querySelector("#playerTwoPanel"),
  roundTracker: document.querySelector("#roundTracker"),
  currentPlayerName: document.querySelector("#currentPlayerName"),
  pressureMessage: document.querySelector("#pressureMessage"),
  timerCard: document.querySelector("#timerCard"),
  timerText: document.querySelector("#timerText"),
  timerFill: document.querySelector("#timerFill"),
  difficultyBadge: document.querySelector("#difficultyBadge strong"),
  roundTypeBadge: document.querySelector("#roundTypeBadge strong"),
  roundTypeBadgeWrap: document.querySelector("#roundTypeBadge"),
  comboBadge: document.querySelector("#comboBadge strong"),
  comboBadgeWrap: document.querySelector("#comboBadge"),
  pointsPreview: document.querySelector("#pointsPreview"),
  countryQuestion: document.querySelector("#countryQuestion"),
  answersGrid: document.querySelector("#answersGrid"),
  feedbackPanel: document.querySelector("#feedbackPanel"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"),
  scoreBreakdown: document.querySelector("#scoreBreakdown"),
  nextButton: document.querySelector("#nextButton"),
  historyList: document.querySelector("#historyList"),
  winnerTitle: document.querySelector("#winnerTitle"),
  finalScoreText: document.querySelector("#finalScoreText"),
  finalStats: document.querySelector("#finalStats"),
  playAgainButton: document.querySelector("#playAgainButton"),
  newPlayersButton: document.querySelector("#newPlayersButton"),
  resetButton: document.querySelector("#resetButton"),
};

const state = {
  players: ["Jogador 1", "Jogador 2"],
  stats: [createPlayerStats(), createPlayerStats()],
  currentPlayer: 0,
  roundsPerPlayer: 10,
  category: "countries",
  activePool: [],
  regularTurns: 20,
  turnNumber: 1,
  suddenDeath: false,
  suddenDeathTurn: 0,
  questions: [],
  activeQuestion: null,
  roundType: "normal",
  answered: false,
  timerId: null,
  turnStartedAt: 0,
  turnEndsAt: 0,
  totalTimeMs: 0,
};

function createPlayerStats() {
  return {
    points: 0,
    correct: 0,
    wrong: 0,
    timeouts: 0,
    combo: 0,
    bestCombo: 0,
    fastestAnswerMs: null,
    biggestScore: 0,
    answered: 0,
  };
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function cleanName(value, fallback) {
  return value.trim().replace(/\s+/g, " ") || fallback;
}

function setScreen(screen) {
  elements.setupScreen.classList.toggle("hidden", screen !== "setup");
  elements.gameScreen.classList.toggle("hidden", screen !== "game");
  elements.resultScreen.classList.toggle("hidden", screen !== "result");
}

function formatPoints(value) {
  return Math.round(value).toLocaleString("pt-BR");
}

function formatSeconds(ms) {
  return `${Math.max(0, ms / 1000).toFixed(1)}s`;
}

function getAccuracy(playerStats) {
  if (playerStats.answered === 0) return 0;
  return Math.round((playerStats.correct / playerStats.answered) * 100);
}

function startGame(event) {
  event?.preventDefault();

  state.players = [
    cleanName(elements.playerOneName.value, "Jogador 1"),
    cleanName(elements.playerTwoName.value, "Jogador 2"),
  ];
  state.roundsPerPlayer = Number(elements.roundsSelect.value);
  state.category = elements.categorySelect.value;
  state.activePool = getQuestionPool();
  resetMatchData();
  updateScoreboard();
  setScreen("game");
  renderQuestion();
}

function resetMatchData() {
  clearTimer();
  state.stats = [createPlayerStats(), createPlayerStats()];
  state.currentPlayer = 0;
  state.turnNumber = 1;
  state.suddenDeath = false;
  state.suddenDeathTurn = 0;
  state.regularTurns = state.roundsPerPlayer * 2;
  state.questions = buildQuestionDeck(state.activePool, state.regularTurns + 12);
  state.activeQuestion = null;
  state.roundType = "normal";
  state.answered = false;
  elements.historyList.innerHTML = "";
  elements.finalStats.innerHTML = "";
}

function getQuestionPool() {
  if (state.category === "states") return questions.filter((item) => item.type === "states");
  if (state.category === "mixed") return questions;
  return questions.filter((item) => item.type === "countries");
}

function buildQuestionDeck(pool, totalTurns) {
  const byDifficulty = {
    easy: shuffle(pool.filter((item) => item.difficulty === "easy")),
    medium: shuffle(pool.filter((item) => item.difficulty === "medium")),
    hard: shuffle(pool.filter((item) => item.difficulty === "hard")),
    insane: shuffle(pool.filter((item) => item.difficulty === "insane")),
  };
  const deck = [];

  for (let index = 0; index < totalTurns; index += 1) {
    const progress = index / Math.max(1, totalTurns - 1);
    const preferred =
      progress < 0.28
        ? ["easy", "medium", "hard", "insane"]
        : progress < 0.7
          ? ["medium", "hard", "easy", "insane"]
          : ["hard", "insane", "medium", "easy"];

    deck.push(takeFromBuckets(byDifficulty, preferred, pool));
  }

  return deck;
}

function takeFromBuckets(buckets, preferred, fallbackPool) {
  for (const difficulty of preferred) {
    if (buckets[difficulty].length > 0) return buckets[difficulty].pop();
  }

  const refreshed = shuffle(fallbackPool);
  return refreshed[0];
}

function getQuestionForCurrentTurn() {
  if (state.suddenDeath) {
    const suddenPool = state.activePool.filter((item) => ["hard", "insane"].includes(item.difficulty));
    return shuffle(suddenPool.length ? suddenPool : state.activePool)[0];
  }

  return state.questions[state.turnNumber - 1] || shuffle(state.activePool)[0];
}

function getRoundTypeForTurn() {
  if (state.suddenDeath) return "suddenDeath";
  if (state.turnNumber % 7 === 0) return "allOrNothing";
  if (state.turnNumber % 5 === 0) return "lightning";
  return "normal";
}

function getRoundLabel() {
  return ROUND_TYPES[state.roundType].shortLabel;
}

function updateScoreboard() {
  const playerOneStats = state.stats[0];
  const playerTwoStats = state.stats[1];

  elements.playerOneNameDisplay.textContent = state.players[0];
  elements.playerTwoNameDisplay.textContent = state.players[1];
  elements.playerOneScore.textContent = formatPoints(playerOneStats.points);
  elements.playerTwoScore.textContent = formatPoints(playerTwoStats.points);
  elements.playerOneMeta.textContent = `Combo ${playerOneStats.combo} · ${getAccuracy(playerOneStats)}%`;
  elements.playerTwoMeta.textContent = `Combo ${playerTwoStats.combo} · ${getAccuracy(playerTwoStats)}%`;
  elements.currentPlayerName.textContent = state.players[state.currentPlayer];
  elements.roundTracker.textContent = state.suddenDeath
    ? `Morte súbita ${Math.ceil(state.suddenDeathTurn / 2)}`
    : `Rodada ${Math.ceil(state.turnNumber / 2)} de ${state.roundsPerPlayer}`;
  elements.playerOnePanel.classList.toggle("active", state.currentPlayer === 0);
  elements.playerTwoPanel.classList.toggle("active", state.currentPlayer === 1);
}

function renderQuestion() {
  clearTimer();

  state.answered = false;
  state.activeQuestion = getQuestionForCurrentTurn();
  state.roundType = getRoundTypeForTurn();
  state.totalTimeMs = getRoundTimeMs(state.activeQuestion.difficulty, state.roundType);
  const options = buildOptions(state.activeQuestion.capital);
  const activeStats = state.stats[state.currentPlayer];
  const preview = calculateScore({
    difficulty: state.activeQuestion.difficulty,
    roundType: state.roundType,
    isCorrect: true,
    timeRemainingMs: state.totalTimeMs,
    totalTimeMs: state.totalTimeMs,
    currentCombo: activeStats.combo,
  });

  elements.countryQuestion.textContent = `${state.activeQuestion.country}?`;
  elements.answersGrid.innerHTML = "";
  elements.feedbackPanel.className = "feedback-panel";
  elements.feedbackTitle.textContent = "Escolha uma resposta";
  elements.feedbackText.textContent = getPromptText();
  elements.scoreBreakdown.textContent = "";
  elements.nextButton.classList.add("hidden");
  elements.difficultyBadge.textContent = DIFFICULTY_CONFIG[state.activeQuestion.difficulty].label;
  elements.roundTypeBadge.textContent = getRoundLabel();
  elements.roundTypeBadgeWrap.dataset.roundType = state.roundType;
  elements.comboBadge.textContent = `x${getComboMultiplier(activeStats.combo).toString().replace(".", ",")}`;
  elements.comboBadgeWrap.classList.toggle("hot", activeStats.combo >= 3);
  elements.pointsPreview.textContent = `${formatPoints(preview.totalPoints)} pts`;
  elements.pressureMessage.textContent = getPressureMessage();

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(option, button));
    elements.answersGrid.append(button);
  });

  updateScoreboard();
  startTimer();
}

function getPromptText() {
  if (state.suddenDeath) return "Empate não sobrevive aqui. Quem abrir vantagem leva.";
  if (state.roundType === "lightning") return "Rodada relâmpago: pouco tempo, muito bônus.";
  if (state.roundType === "allOrNothing") return "Tudo ou Nada: acertar explode o placar, errar alimenta o rival.";
  return "Acerte rápido para somar bônus de velocidade e manter o combo.";
}

function getPressureMessage() {
  if (state.suddenDeath) return "Morte súbita. Sem resposta morna.";
  if (state.roundType === "lightning") return "Relâmpago: decide no reflexo.";
  if (state.roundType === "allOrNothing") return "Tudo ou Nada: coragem vale ponto.";
  return "Respire. Mire. Responda.";
}

function buildOptions(correctCapital) {
  const wrongOptions = shuffle(state.activePool)
    .map((item) => item.capital)
    .filter((capital, index, list) => capital !== correctCapital && list.indexOf(capital) === index)
    .slice(0, 3);

  return shuffle([correctCapital, ...wrongOptions]);
}

function startTimer() {
  state.turnStartedAt = Date.now();
  state.turnEndsAt = state.turnStartedAt + state.totalTimeMs;
  updateTimer();

  state.timerId = window.setInterval(() => {
    updateTimer();
    if (Date.now() >= state.turnEndsAt) {
      handleTimeout();
    }
  }, 100);
}

function clearTimer() {
  if (!state.timerId) return;
  window.clearInterval(state.timerId);
  state.timerId = null;
}

function updateTimer() {
  const remainingMs = Math.max(0, state.turnEndsAt - Date.now());
  const ratio = state.totalTimeMs ? remainingMs / state.totalTimeMs : 0;

  elements.timerText.textContent = formatSeconds(remainingMs);
  elements.timerFill.style.transform = `scaleX(${ratio})`;
  elements.timerCard.classList.toggle("danger", ratio <= 0.3);
}

function answerQuestion(selectedCapital, selectedButton) {
  if (state.answered) return;

  clearTimer();
  const elapsedMs = Date.now() - state.turnStartedAt;
  const timeRemainingMs = Math.max(0, state.turnEndsAt - Date.now());
  const correctCapital = state.activeQuestion.capital;
  const isCorrect = selectedCapital === correctCapital;
  const activeStats = state.stats[state.currentPlayer];
  const result = calculateScore({
    difficulty: state.activeQuestion.difficulty,
    roundType: state.roundType,
    isCorrect,
    timeRemainingMs,
    totalTimeMs: state.totalTimeMs,
    currentCombo: activeStats.combo,
  });

  applyAnswerResult({
    result,
    selectedCapital,
    selectedButton,
    elapsedMs,
  });
}

function handleTimeout() {
  if (state.answered) return;
  clearTimer();

  const activeStats = state.stats[state.currentPlayer];
  const result = createTimeoutResult({
    difficulty: state.activeQuestion.difficulty,
    roundType: state.roundType,
    currentCombo: activeStats.combo,
  });

  applyAnswerResult({
    result,
    selectedCapital: "tempo esgotado",
    selectedButton: null,
    elapsedMs: state.totalTimeMs,
  });
}

function applyAnswerResult({ result, selectedCapital, selectedButton, elapsedMs }) {
  state.answered = true;
  const correctCapital = state.activeQuestion.capital;
  const activeStats = state.stats[state.currentPlayer];
  const opponentIndex = state.currentPlayer === 0 ? 1 : 0;
  const opponentStats = state.stats[opponentIndex];

  activeStats.answered += 1;
  activeStats.points += result.totalPoints;
  activeStats.combo = result.nextCombo;
  activeStats.bestCombo = Math.max(activeStats.bestCombo, activeStats.combo);
  activeStats.biggestScore = Math.max(activeStats.biggestScore, result.totalPoints);

  if (result.isCorrect) {
    activeStats.correct += 1;
    activeStats.fastestAnswerMs =
      activeStats.fastestAnswerMs === null ? elapsedMs : Math.min(activeStats.fastestAnswerMs, elapsedMs);
  } else {
    activeStats.wrong += 1;
  }

  if (result.isTimeout) {
    activeStats.timeouts += 1;
  }

  if (!result.isCorrect && result.opponentBonus > 0) {
    opponentStats.points += result.opponentBonus;
  }

  revealAnswer(correctCapital, selectedButton);
  renderFeedback(result, selectedCapital, correctCapital);
  addHistoryItem(result, selectedCapital, correctCapital);
  updateScoreboard();

  elements.nextButton.textContent = shouldEndMatch() ? "Ver resultado" : "Próxima pergunta";
  elements.nextButton.classList.remove("hidden");
}

function revealAnswer(correctCapital, selectedButton) {
  [...elements.answersGrid.children].forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctCapital) button.classList.add("correct");
  });

  if (selectedButton && selectedButton.textContent !== correctCapital) {
    selectedButton.classList.add("wrong");
  }
}

function renderFeedback(result, selectedCapital, correctCapital) {
  const wasFast = result.isCorrect && result.speedBonus >= result.basePoints * 0.25;

  elements.feedbackPanel.classList.add(result.isCorrect ? "success" : "error");
  elements.feedbackPanel.classList.toggle("perfect", wasFast);
  elements.feedbackTitle.textContent = getFeedbackTitle(result, wasFast);
  elements.feedbackText.textContent = getFeedbackText(result, selectedCapital, correctCapital);
  elements.scoreBreakdown.textContent = result.isCorrect
    ? `+${formatPoints(result.totalPoints)} pts · base ${formatPoints(result.basePoints)} · velocidade +${formatPoints(result.speedBonus)} · combo x${result.comboMultiplier}`
    : result.opponentBonus > 0
      ? `Combo quebrado · rival ganhou ${formatPoints(result.opponentBonus)} pts`
      : "Combo quebrado · sem pontos nesta pergunta";
}

function getFeedbackTitle(result, wasFast) {
  if (result.isTimeout) return "Tempo esgotado";
  if (!result.isCorrect) return "Resposta errada";
  if (wasFast) return "Resposta perfeita";
  return "Resposta certa";
}

function getFeedbackText(result, selectedCapital, correctCapital) {
  if (result.isTimeout) return `O relógio zerou. A capital correta era ${correctCapital}.`;
  if (!result.isCorrect) return `Você marcou ${selectedCapital}. A capital correta era ${correctCapital}.`;
  if (state.stats[state.currentPlayer].combo >= 3) {
    return `${state.players[state.currentPlayer]} manteve o combo vivo.`;
  }
  return `${state.players[state.currentPlayer]} somou pontos e segue no duelo.`;
}

function addHistoryItem(result, selectedCapital, correctCapital) {
  const item = document.createElement("li");
  const title = document.createElement("strong");
  const detail = document.createTextNode(getHistoryText(result, selectedCapital, correctCapital));

  item.className = result.isCorrect ? "win" : "loss";
  title.textContent = `${state.players[state.currentPlayer]} - ${state.activeQuestion.country}`;
  item.append(title, detail);
  elements.historyList.prepend(item);
}

function getHistoryText(result, selectedCapital, correctCapital) {
  if (result.isCorrect) return `+${formatPoints(result.totalPoints)} pts em ${getRoundLabel()}.`;
  if (result.isTimeout) return `Tempo esgotado. Correta: ${correctCapital}.`;
  return `Errou: ${selectedCapital}. Correta: ${correctCapital}.`;
}

function shouldEndMatch() {
  if (state.suddenDeath) {
    return state.suddenDeathTurn % 2 === 0 && !needsSuddenDeath(getScores());
  }

  return state.turnNumber >= state.regularTurns && !needsSuddenDeath(getScores());
}

function nextTurn() {
  if (state.suddenDeath && shouldEndMatch()) {
    showResult();
    return;
  }

  if (!state.suddenDeath && state.turnNumber >= state.regularTurns) {
    if (needsSuddenDeath(getScores())) {
      startSuddenDeath();
      return;
    }

    showResult();
    return;
  }

  if (state.suddenDeath) {
    state.suddenDeathTurn += 1;
  } else {
    state.turnNumber += 1;
  }

  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  renderQuestion();
}

function startSuddenDeath() {
  state.suddenDeath = true;
  state.suddenDeathTurn = 1;
  state.currentPlayer = 0;
  elements.feedbackPanel.className = "feedback-panel sudden";
  elements.feedbackTitle.textContent = "Morte súbita";
  elements.feedbackText.textContent = "Empatou. Agora os dois respondem perguntas pesadas até alguém abrir vantagem.";
  renderQuestion();
}

function getScores() {
  return state.stats.map((playerStats) => playerStats.points);
}

function showResult() {
  clearTimer();
  const winnerIndex = getWinnerIndex(getScores());
  const winner = winnerIndex === null ? "Empate" : `${state.players[winnerIndex]} venceu`;

  elements.winnerTitle.textContent = winner;
  elements.finalScoreText.textContent = `${state.players[0]} ${formatPoints(state.stats[0].points)} x ${formatPoints(
    state.stats[1].points,
  )} ${state.players[1]}`;
  renderFinalStats();
  setScreen("result");
}

function renderFinalStats() {
  elements.finalStats.innerHTML = "";

  state.stats.forEach((playerStats, index) => {
    const card = document.createElement("article");
    const fastest = playerStats.fastestAnswerMs === null ? "sem acerto" : formatSeconds(playerStats.fastestAnswerMs);

    card.className = "final-stat-card";
    card.innerHTML = `
      <strong>${state.players[index]}</strong>
      <span>${formatPoints(playerStats.points)} pts</span>
      <small>Acertos: ${playerStats.correct}/${playerStats.answered} · Precisão: ${getAccuracy(playerStats)}%</small>
      <small>Maior combo: ${playerStats.bestCombo} · Mais rápida: ${fastest}</small>
      <small>Maior golpe: ${formatPoints(playerStats.biggestScore)} pts · Timeouts: ${playerStats.timeouts}</small>
    `;
    elements.finalStats.append(card);
  });
}

function restartWithSamePlayers() {
  resetMatchData();
  updateScoreboard();
  setScreen("game");
  renderQuestion();
}

function backToSetup() {
  clearTimer();
  setScreen("setup");
}

elements.setupForm.addEventListener("submit", startGame);
elements.nextButton.addEventListener("click", nextTurn);
elements.playAgainButton.addEventListener("click", restartWithSamePlayers);
elements.newPlayersButton.addEventListener("click", backToSetup);
elements.resetButton.addEventListener("click", () => {
  if (elements.gameScreen.classList.contains("hidden")) {
    backToSetup();
    return;
  }

  restartWithSamePlayers();
});

updateScoreboard();
