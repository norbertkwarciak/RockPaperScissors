// Button starting the game 
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

// Setting events on the buttons ('rock', 'paper', 'scissors')
var pickRock = document.getElementById('js-playerPick_rock'),
pickPaper = document.getElementById('js-playerPick_paper'),
pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// initial values
var gameState = 'notStarted',  //started // ended
// 'player' object stores player name and their current score
player = {
    name: '',
    score: 0
},
// 'computer' objects stores score only as the name is permanent
computer = {
    score: 0
};

// variables indicating elements of the game
var newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsElem = document.getElementById('js-resultsTableElement');

// below function indicates what elements are displayed depending on the current state of the game
function setGameElements() {
    switch(gameState) {
      case 'started':
          newGameElem.style.display = 'none';
          pickElem.style.display = 'block';
          resultsElem.style.display = 'block';
        break;
      case 'ended':
          newGameBtn.innerText = 'Play again';
      case 'notStarted':
      default:
          newGameElem.style.display = 'block';
          pickElem.style.display = 'none';
          resultsElem.style.display = 'none';
    }
}
setGameElements(); //calling the above function

// below variables represent the elements analyzed before starting each game
var playerPointsElem = document.getElementById('js-playerPoints'), //player's points
playerNameElem = document.getElementById('js-playerName'), //player's name
computerPointsElem = document.getElementById('js-computerPoints'); //computer's points

// below function is loaded when clicking "new game/play again" button
function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
      player.score = computer.score = 0;
      gameState = 'started';
      setGameElements();
  
      playerNameElem.innerHTML = player.name;
      setGamePoints(); 
    }  
}

// function collecting the player's choice
function playerPick(playerPick) {
    console.log(playerPick);
}

// function randomly drawing the player's choice
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// displaying the player's and computer's choice
var playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);  
    checkWinner();    
}

// giving points (the process at the result of which either the player or the computer receives a point each round)
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  
    var winnerIs = 'player';
  
      if (playerPick == computerPick) {
          winnerIs = 'noone'; // draw
      } else if (
          (computerPick == 'rock' &&  playerPick == 'scissors') ||
          (computerPick == 'scissors' &&  playerPick == 'paper') ||
          (computerPick == 'paper' &&  playerPick == 'rock')) {
  
          winnerIs = 'computer';
      }
  
      if (winnerIs == 'player') {
          playerResultElem.innerHTML = "Win!";
          player.score++;
      } else if (winnerIs == 'computer') {
          computerResultElem.innerHTML = "Win!";
          computer.score++;
      }
    setGamePoints();  
}

//displaying the score
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// game ends when either the player or the computer gets 10 points
function checkWinner () {
    if(player.score === 10) {
        gameState = 'ended';
        alert('Yay! You\'re the winner!');
        setGameElements();
    }

    if(computer.score === 10) {
        gameState = 'ended';
        alert('Boo! You lost.');
        setGameElements();
    }
}
  