'use strict';
//Players
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
//final Score of Players
const scorePlayer0 = document.querySelector("#score--0");
const scorePlayer1 = document.querySelector("#score--1");
//current score of Players
let current0 = document.querySelector("#current--0");
let current1 = document.querySelector("#current--1");
//dice immage
const dice = document.querySelector(".dice");
//button Roll Dice, New and Hold
const rollDiceBtn = document.querySelector(".btn--roll")
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
//Finall score of players on the Top 
let finalScore;
//current Score
let currentScore;
//Active player
let activePlayer;
//Game status
let playing;

//Switch Player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;  
  currentScore = 0;
  //choose active player
  activePlayer = activePlayer === 0 ? 1 : 0;  
  //Checout active player and switch adding player--active class
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");  
}
//function awake when we press new game button
const startReloadGame = function() {
  //add hidden class to score ate the beginning of the game
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  //add hiddens to dice image ate the beginning of the game
  dice.classList.add("hidden");
  finalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");  
  player0.classList.add("player--active");
  player1.classList.remove("player--active");  
};

startReloadGame();

//press dice button
rollDiceBtn.addEventListener("click", function() {
  if (playing) {
    //dice number 
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    //choose dice img according the random number
      dice.setAttribute("src", "images/dice-" + randomNumber + ".png");
    //make dice img visible  
      dice.classList.remove("hidden");
    //if dicenumber isnot 1, we add number to score of active player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      //chose active player
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;    
    } else {
      //if dice = 1, switch player to 0 or 1 depending on current active player, 
      switchPlayer();
    }
  }
});

// press hold button
holdBtn.addEventListener("click", function() {
  if(playing) { 
    //increase the final score of active user by current score 
    finalScore[activePlayer] += currentScore;
    //choose final score of active player
    document.querySelector(`#score--${activePlayer}`).textContent = finalScore[activePlayer];
    //define if the player wins
    if(finalScore[activePlayer] >= 100) {
      //if active player gather 100 points - he wins
      playing = false;
      document.querySelector(`#current--${activePlayer}`).textContent = 0; 
      dice.classList.add("hidden");
      document.querySelector(".player--active").classList.add("player--winner");  
      document.querySelector(".player--active").classList.remove("player--active");       
    } else {
      //if not - the game continues
      switchPlayer();
    }
  };
});

//reload buttom
newBtn.addEventListener("click", startReloadGame); 