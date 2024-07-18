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
  // Get user's answer
  const userAnswer = document.querySelector('input[name="answer"]:checked').value;
  
  // Check if user's answer is correct
  if (userAnswer === quizQuestions[game.currentQuestion].correctAnswer) {
    // Increment score
    game.score++;
    // Update score display
    document.getElementById('score').innerText = `Score: ${game.score}`;
  } else {
    // Decrement lives
    game.lives--;
    // Update lives display
    document.getElementById('lives').innerText = `Lives: ${game.lives}`;
  }
  
  // Move on to next question
  game.currentQuestion++;
  if (game.currentQuestion >= quizQuestions.length) {
    // Game over
    document.getElementById('game-container').innerHTML = `
      <h2>Game Over</h2>
      <p>Final Score: ${game.score}</p>
    `;
  } else {
    // Render next question
    game.nextQuestion();
  }
}
};

// Simulation logic
const sim = {
  // Simulation variables
  x: 0,
  y: 0,
  // Simulation function
  run: function() {
    // Update simulation variables
    sim.x += 1;
    sim.y += 2;
    // Render simulation output
    document.getElementById('sim-container').innerHTML = `
      <h2>Simulation</h2>
      <p>X: ${sim.x}</p>
      <p>Y: ${sim.y}</p>
    `;
  }
};

// Event listeners
document.getElementById('quiz-btn').addEventListener('click', function() {
  // Render quiz questions and answers
  document.getElementById('quiz-container').innerHTML = `
    <h2>Quiz</h2>
    <ul>
      ${quizQuestions.map((question, index) => `
        <li>
          <h3>${question.question}</h3>
          <ul>
            ${question.answers.map((answer, answerIndex) => `
              <li>
                <input type="radio" name="answer-${index}" value="${answerIndex}">
                ${answer}
              </li>
            `).join("")}
          </ul>
        </li>
      `).join("")}
    </ul>
    <button id="submit-quiz-btn">Submit</button>
  `;
  const submitQuizBtn = document.getElementById('submit-quiz-btn');
  submitQuizBtn.addEventListener('click', function() {
    // Check user's answers
    quizQuestions.forEach((question, index) => {
  const userAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
  if (userAnswer) {
    const userAnswerValue = userAnswer.value;
    if (userAnswerValue === question.correctAnswer) {
      // Increment score
      game.score++;
    }
  }
});
    // Render final score
    document.getElementById('quiz-container').innerHTML = `
      <h2>Quiz Results</h2>
      <p>Score: ${game.score}</p>
    `;
  });
});

document.getElementById('game-btn').addEventListener('click', function() {
  // Start game
  game.start();
});

document.getElementById('sim-btn').addEventListener('click', function() {
  // Run simulation
  sim.run();
});
