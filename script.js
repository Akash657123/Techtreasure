// Quiz questions and answers
const quizQuestions = [
	{
		question: "What is the capital of France?",
		answers: ["Paris", "London", "Berlin", "Rome"],
		correctAnswer: 0
	},
	{
		question: "What is the largest planet in our solar system?",
		answers: ["Earth", "Saturn", "Jupiter", "Uranus"],
		correctAnswer: 2
	}
];

// Game logic
const game = {
	score: 0,
	lives: 3,
	currentQuestion: 0,
	start: function() {
		// Render game UI
		const gameContainer = document.getElementById("game-container");
		gameContainer.innerHTML = `
			<h2>Game</h2>
			<p>Score: ${game.score}</p>
			<p>Lives: ${game.lives}</p>
			<button id="game-btn">Next Question</button>
		`;
		const gameBtn = document.getElementById("game-btn");
		gameBtn.addEventListener("click", game.nextQuestion);
	},
	nextQuestion: function() {
		// Render next question
		const currentQuestion = quizQuestions[game.currentQuestion];
		const questionElement = document.getElementById("question");
		questionElement.innerHTML = `
			<h2>${currentQuestion.question}</h2>
			<ul>
				${currentQuestion.answers.map((answer, index) => `
					<li>
						<input type="radio" name="answer" value="${index}">
						${answer}
					</li>
				`).join("")}
			</ul>
			<button id="submit-btn">Submit</button>
		`;
		const submitBtn = document.getElementById("submit-btn");
		submitBtn.addEventListener("click", game.checkAnswer);
	},
	checkAnswer: function() {
		// Check user's
