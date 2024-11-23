// Get references to DOM elements
const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("reset-btn");
const timerDisplay = document.createElement('p'); // To display the timer

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let totalMatches = 0;
let timerInterval;
let timeLeft = 0;

// Add timer display to the game container
document.querySelector('.game-container').appendChild(timerDisplay);

// Function to create the game cards
function createCards() {
  const values = [
    '1', '1', '2', '2', '3', '3', '4', '4',
    '5', '5', '6', '6', '7', '7', '8', '8'
  ];
  cards = [];
  
  // Shuffle the values array to randomize the cards
  values.sort(() => Math.random() - 0.5);
  
  // Create card elements
  for (let i = 0; i < values.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = values[i];
    card.addEventListener('click', flipCard);
    cards.push(card);
  }
  
  // Add the cards to the game board
  gameBoard.innerHTML = '';
  cards.forEach(card => gameBoard.appendChild(card));
  
  // Reset the timer and score
  resetTimer();
  timeLeft = 0;
  timerDisplay.textContent = `Time: 0s`;
  scoreDisplay.textContent = `Matches: ${totalMatches}`;
}

// Function to handle card flipping
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) {
    return;
  }

  this.classList.add('flipped');
  this.textContent = this.dataset.value;

  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Function to check if the two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    matchedCards += 2;
    totalMatches++;
    scoreDisplay.textContent = `Matches: ${totalMatches}`;
    flippedCards = [];
    
    if (matchedCards === cards.length) {
      clearInterval(timerInterval); // Stop the timer when all matches are made
      setTimeout(() => alert(`You won! Time: ${timeLeft}s`), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

// Function to reset the game
function resetGame() {
  matchedCards = 0;
  totalMatches = 0;
  timeLeft = 0;
  scoreDisplay.textContent = `Matches: ${totalMatches}`;
  resetTimer();
  createCards();
}

// Function to start and update the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft++;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
  }, 1000);
}

// Function to reset the timer
function resetTimer() {
  if (timerInterval) {
    clearInterval(timerInterval); // Clear the current timer
  }
  timeLeft = 0; // Reset time
  timerDisplay.textContent = `Time: 0s`;
  startTimer(); // Start a new timer
}

// Initialize the game
createCards();

// Reset button event listener
resetBtn.addEventListener('click', resetGame);
