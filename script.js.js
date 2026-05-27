// ============================================================
//  QUIZ DATA — Array of question objects
//  Each object has: question, options (array), answer (index)
// ============================================================
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Link",
      "Home Tool Markup Language"
    ],
    answer: 0   // index 0 = first option
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "foreground"],
    answer: 2
  },
  {
    question: "Which keyword declares a variable in modern JavaScript?",
    options: ["var", "let", "const", "Both let and const"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style System",
      "Colorful Style Script"
    ],
    answer: 1
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2
  },
  {
    question: "How do you select an element by ID in JavaScript?",
    options: [
      "document.getClass('id')",
      "document.getElementById('id')",
      "document.selectId('id')",
      "document.query('id')"
    ],
    answer: 1
  },
  {
    question: "Which CSS property controls the space INSIDE an element?",
    options: ["margin", "spacing", "padding", "border"],
    answer: 2
  }
];

// ============================================================
//  STATE VARIABLES — track where we are in the quiz
// ============================================================
let currentIndex = 0;   // which question we're on
let score = 0;          // how many correct
let answered = false;   // did user pick an answer yet?

// Letter labels for options
const letters = ['A', 'B', 'C', 'D'];

// ============================================================
//  SCREEN HELPERS — show/hide the three screens
// ============================================================
function showScreen(id) {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display  = 'none';
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

// ============================================================
//  START QUIZ
// ============================================================
function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen('quiz-screen');
  loadQuestion();
}

// ============================================================
//  LOAD QUESTION — display current question and options
// ============================================================
function loadQuestion() {
  answered = false;

  const q = questions[currentIndex];  // get current question object
  const total = questions.length;

  // Update progress bar width
  const progress = ((currentIndex) / total) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';

  // Update counter and score display
  document.getElementById('q-number').textContent =
    `Question ${currentIndex + 1} of ${total}`;
  document.getElementById('q-score').textContent = `Score: ${score}`;

  // Update question text
  document.getElementById('question-text').textContent = q.question;

  // Clear feedback and hide Next button
  document.getElementById('feedback').textContent = '';
  document.getElementById('next-btn').style.display = 'none';

  // Build option buttons
  const container = document.getElementById('options-container');
  container.innerHTML = ''; // clear old buttons

  q.options.forEach(function(option, index) {
    // Create button element
    const btn = document.createElement('button');
    btn.classList.add('option-btn');

    // Letter badge (A, B, C, D)
    const letter = document.createElement('span');
    letter.classList.add('option-letter');
    letter.textContent = letters[index];

    // Option text
    const text = document.createElement('span');
    text.textContent = option;

    btn.appendChild(letter);
    btn.appendChild(text);

    // When clicked, check the answer
    btn.addEventListener('click', function() {
      checkAnswer(index);
    });

    container.appendChild(btn);
  });
}

// ============================================================
//  CHECK ANSWER — called when user clicks an option
// ============================================================
function checkAnswer(selectedIndex) {
  if (answered) return;  // ignore clicks after first answer
  answered = true;

  const q = questions[currentIndex];
  const buttons = document.querySelectorAll('.option-btn');

  // Disable all buttons so user can't click again
  buttons.forEach(function(btn) {
    btn.disabled = true;
  });

  if (selectedIndex === q.answer) {
    // ✅ Correct
    score++;
    buttons[selectedIndex].classList.add('correct');
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').style.color = '#4ade80';
  } else {
    // ❌ Wrong — highlight wrong pick + show right answer
    buttons[selectedIndex].classList.add('wrong');
    buttons[q.answer].classList.add('correct');
    document.getElementById('feedback').textContent =
      `❌ Wrong! The correct answer was: ${q.options[q.answer]}`;
    document.getElementById('feedback').style.color = '#f87171';
  }

  // Show the Next button
  document.getElementById('next-btn').style.display = 'block';

  // If it's the last question, change button text
  if (currentIndex === questions.length - 1) {
    document.getElementById('next-btn').textContent = 'See Results 🎯';
  } else {
    document.getElementById('next-btn').textContent = 'Next →';
  }
}

// ============================================================
//  NEXT QUESTION — move to next or show results
// ============================================================
function nextQuestion() {
  currentIndex++;

  if (currentIndex >= questions.length) {
    // No more questions — show results
    showResults();
  } else {
    // Load next question
    loadQuestion();
  }
}

// ============================================================
//  SHOW RESULTS
// ============================================================
function showResults() {
  showScreen('result-screen');

  const total = questions.length;
  const wrong = total - score;
  const percent = Math.round((score / total) * 100);

  // Score display
  document.getElementById('result-score').textContent = `${score} / ${total}`;
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent = wrong;

  // Emoji and message based on score
  let emoji, message;

  if (percent === 100) {
    emoji = '🏆'; message = "Perfect score! You're a genius!";
  } else if (percent >= 70) {
    emoji = '🎉'; message = 'Great job! You know your stuff!';
  } else if (percent >= 40) {
    emoji = '🙂'; message = 'Not bad! Keep studying!';
  } else {
    emoji = '📚'; message = "Keep practicing, you'll get there!";
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-message').textContent = message;
}

// ============================================================
//  RESTART — reset and play again
// ============================================================
function restartQuiz() {
  startQuiz();
}

function showStart() {
  showScreen('start-screen');
}
