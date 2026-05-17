const capitals = [
  { country: "Brasil", capital: "Brasília" },
  { country: "Argentina", capital: "Buenos Aires" },
  { country: "Chile", capital: "Santiago" },
  { country: "Uruguai", capital: "Montevideu" },
  { country: "Paraguai", capital: "Assunção" },
  { country: "Bolívia", capital: "Sucre" },
  { country: "Peru", capital: "Lima" },
  { country: "Colômbia", capital: "Bogotá" },
  { country: "Venezuela", capital: "Caracas" },
  { country: "Equador", capital: "Quito" },
  { country: "México", capital: "Cidade do México" },
  { country: "Estados Unidos", capital: "Washington, D.C." },
  { country: "Canadá", capital: "Ottawa" },
  { country: "Portugal", capital: "Lisboa" },
  { country: "Espanha", capital: "Madri" },
  { country: "França", capital: "Paris" },
  { country: "Itália", capital: "Roma" },
  { country: "Alemanha", capital: "Berlim" },
  { country: "Reino Unido", capital: "Londres" },
  { country: "Irlanda", capital: "Dublin" },
  { country: "Noruega", capital: "Oslo" },
  { country: "Suécia", capital: "Estocolmo" },
  { country: "Finlândia", capital: "Helsinque" },
  { country: "Dinamarca", capital: "Copenhague" },
  { country: "Países Baixos", capital: "Amsterdã" },
  { country: "Bélgica", capital: "Bruxelas" },
  { country: "Suíça", capital: "Berna" },
  { country: "Áustria", capital: "Viena" },
  { country: "Grécia", capital: "Atenas" },
  { country: "Turquia", capital: "Ancara" },
  { country: "Rússia", capital: "Moscou" },
  { country: "China", capital: "Pequim" },
  { country: "Japão", capital: "Tóquio" },
  { country: "Coreia do Sul", capital: "Seul" },
  { country: "Índia", capital: "Nova Deli" },
  { country: "Tailândia", capital: "Bangkok" },
  { country: "Vietnã", capital: "Hanói" },
  { country: "Indonésia", capital: "Jacarta" },
  { country: "Filipinas", capital: "Manila" },
  { country: "Austrália", capital: "Camberra" },
  { country: "Nova Zelândia", capital: "Wellington" },
  { country: "Egito", capital: "Cairo" },
  { country: "Marrocos", capital: "Rabat" },
  { country: "África do Sul", capital: "Pretória" },
  { country: "Quênia", capital: "Nairóbi" },
  { country: "Nigéria", capital: "Abuja" },
  { country: "Angola", capital: "Luanda" },
  { country: "Moçambique", capital: "Maputo" },
  { country: "Cabo Verde", capital: "Praia" },
  { country: "Polônia", capital: "Varsóvia" },
  { country: "Arábia Saudita", capital: "Riade" },
  { country: "Emirados Árabes Unidos", capital: "Abu Dhabi" },
];

const stateCapitals = [
  { country: "Acre", capital: "Rio Branco" },
  { country: "Alagoas", capital: "Maceió" },
  { country: "Amapá", capital: "Macapá" },
  { country: "Amazonas", capital: "Manaus" },
  { country: "Bahia", capital: "Salvador" },
  { country: "Ceará", capital: "Fortaleza" },
  { country: "Distrito Federal", capital: "Brasília" },
  { country: "Espírito Santo", capital: "Vitória" },
  { country: "Goiás", capital: "Goiânia" },
  { country: "Maranhão", capital: "São Luís" },
  { country: "Mato Grosso", capital: "Cuiabá" },
  { country: "Mato Grosso do Sul", capital: "Campo Grande" },
  { country: "Minas Gerais", capital: "Belo Horizonte" },
  { country: "Pará", capital: "Belém" },
  { country: "Paraíba", capital: "João Pessoa" },
  { country: "Paraná", capital: "Curitiba" },
  { country: "Pernambuco", capital: "Recife" },
  { country: "Piauí", capital: "Teresina" },
  { country: "Rio de Janeiro", capital: "Rio de Janeiro" },
  { country: "Rio Grande do Norte", capital: "Natal" },
  { country: "Rio Grande do Sul", capital: "Porto Alegre" },
  { country: "Rondônia", capital: "Porto Velho" },
  { country: "Roraima", capital: "Boa Vista" },
  { country: "Santa Catarina", capital: "Florianópolis" },
  { country: "São Paulo", capital: "São Paulo" },
  { country: "Sergipe", capital: "Aracaju" },
  { country: "Tocantins", capital: "Palmas" },
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
  playerOnePanel: document.querySelector("#playerOnePanel"),
  playerTwoPanel: document.querySelector("#playerTwoPanel"),
  roundTracker: document.querySelector("#roundTracker"),
  currentPlayerName: document.querySelector("#currentPlayerName"),
  countryQuestion: document.querySelector("#countryQuestion"),
  answersGrid: document.querySelector("#answersGrid"),
  feedbackPanel: document.querySelector("#feedbackPanel"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"),
  nextButton: document.querySelector("#nextButton"),
  historyList: document.querySelector("#historyList"),
  winnerTitle: document.querySelector("#winnerTitle"),
  finalScoreText: document.querySelector("#finalScoreText"),
  playAgainButton: document.querySelector("#playAgainButton"),
  newPlayersButton: document.querySelector("#newPlayersButton"),
  resetButton: document.querySelector("#resetButton"),
};

const state = {
  players: ["Jogador 1", "Jogador 2"],
  scores: [0, 0],
  currentPlayer: 0,
  roundsPerPlayer: 10,
  category: "countries",
  activePool: capitals,
  turnNumber: 1,
  totalTurns: 20,
  questions: [],
  activeQuestion: null,
  answered: false,
};

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
  state.scores = [0, 0];
  state.currentPlayer = 0;
  state.turnNumber = 1;
  state.totalTurns = state.roundsPerPlayer * 2;
  state.questions = buildQuestionDeck(state.activePool, state.totalTurns);
  state.activeQuestion = null;
  state.answered = false;
  elements.historyList.innerHTML = "";
}

function updateScoreboard() {
  elements.playerOneNameDisplay.textContent = state.players[0];
  elements.playerTwoNameDisplay.textContent = state.players[1];
  elements.playerOneScore.textContent = state.scores[0];
  elements.playerTwoScore.textContent = state.scores[1];
  elements.currentPlayerName.textContent = state.players[state.currentPlayer];
  elements.roundTracker.textContent = `Rodada ${Math.ceil(state.turnNumber / 2)} de ${state.roundsPerPlayer}`;
  elements.playerOnePanel.classList.toggle("active", state.currentPlayer === 0);
  elements.playerTwoPanel.classList.toggle("active", state.currentPlayer === 1);
}

function renderQuestion() {
  state.answered = false;
  state.activeQuestion = state.questions[state.turnNumber - 1];
  const options = buildOptions(state.activeQuestion.capital);

  elements.countryQuestion.textContent = `${state.activeQuestion.country}?`;
  elements.answersGrid.innerHTML = "";
  elements.feedbackPanel.className = "feedback-panel";
  elements.feedbackTitle.textContent = "Escolha uma resposta";
  elements.feedbackText.textContent = "Cada pergunta tem uma alternativa correta.";
  elements.nextButton.classList.add("hidden");

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(option, button));
    elements.answersGrid.append(button);
  });

  updateScoreboard();
}

function buildOptions(correctCapital) {
  const wrongOptions = shuffle(state.activePool)
    .map((item) => item.capital)
    .filter((capital) => capital !== correctCapital)
    .slice(0, 3);

  return shuffle([correctCapital, ...wrongOptions]);
}

function getQuestionPool() {
  if (state.category === "states") return stateCapitals;
  if (state.category === "mixed") return [...capitals, ...stateCapitals];
  return capitals;
}

function buildQuestionDeck(pool, totalTurns) {
  const deck = [];

  while (deck.length < totalTurns) {
    deck.push(...shuffle(pool));
  }

  return deck.slice(0, totalTurns);
}

function answerQuestion(selectedCapital, selectedButton) {
  if (state.answered) return;

  state.answered = true;
  const correctCapital = state.activeQuestion.capital;
  const isCorrect = selectedCapital === correctCapital;

  if (isCorrect) {
    state.scores[state.currentPlayer] += 1;
  }

  [...elements.answersGrid.children].forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctCapital) button.classList.add("correct");
  });

  if (!isCorrect) {
    selectedButton.classList.add("wrong");
  }

  elements.feedbackPanel.classList.add(isCorrect ? "success" : "error");
  elements.feedbackTitle.textContent = isCorrect ? "Resposta certa" : "Resposta errada";
  elements.feedbackText.textContent = isCorrect
    ? `${state.players[state.currentPlayer]} marcou ponto.`
    : `A capital correta era ${correctCapital}.`;
  elements.nextButton.textContent = state.turnNumber === state.totalTurns ? "Ver resultado" : "Próxima pergunta";
  elements.nextButton.classList.remove("hidden");

  addHistoryItem(isCorrect, selectedCapital, correctCapital);
  updateScoreboard();
}

function addHistoryItem(isCorrect, selectedCapital, correctCapital) {
  const item = document.createElement("li");
  const title = document.createElement("strong");
  const detail = document.createTextNode(
    isCorrect ? "Acertou" : `Errou: ${selectedCapital}. Correta: ${correctCapital}.`,
  );

  item.className = isCorrect ? "win" : "loss";
  title.textContent = `${state.players[state.currentPlayer]} - ${state.activeQuestion.country}`;
  item.append(title, detail);
  elements.historyList.prepend(item);
}

function nextTurn() {
  if (state.turnNumber >= state.totalTurns) {
    showResult();
    return;
  }

  state.turnNumber += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  renderQuestion();
}

function showResult() {
  const [scoreOne, scoreTwo] = state.scores;
  const winner =
    scoreOne === scoreTwo
      ? "Empate"
      : `${scoreOne > scoreTwo ? state.players[0] : state.players[1]} venceu`;

  elements.winnerTitle.textContent = winner;
  elements.finalScoreText.textContent = `${state.players[0]} ${scoreOne} x ${scoreTwo} ${state.players[1]}`;
  setScreen("result");
}

function restartWithSamePlayers() {
  resetMatchData();
  updateScoreboard();
  setScreen("game");
  renderQuestion();
}

function backToSetup() {
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
