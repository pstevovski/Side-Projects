const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const message = document.querySelector("#message");
const btn = document.querySelector("#btn");
let randomNumber;
let attempts = 3;
let gameWon = false;

// Get a random number to play with
function getRandomNumber() {
    let min = 1;
    let max = 10;
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

// Guess the number
function guessNumber(e) {
    // Hide the message at submition
    message.style.display = "none";

    // If game is won, generate a new random number
    if(gameWon) {
        setTimeout(() => {
            btn.textContent = "Submit";
        }, 500);
        
        message.style.display = "none";
        gameWon = !gameWon;
        getRandomNumber();
    }
    
    const value = parseInt(inputField.value);
    // Display the message.
    message.style.display = "block";

    // If the input field is empty
    if(inputField.value === "") {
        message.classList.remove("messageWin" , "messageWrong");
        message.textContent = "Please enter your number between 1 - 10.";
    } else {
        // If the random number and the player's number match, player wins.
        if(value === randomNumber) {
            message.textContent = "That is the correct number! You win!";
            message.className = "messageWin";
            btn.textContent = "Play again?";
            inputField.value = "";
            gameWon = true;
        } else {
            attempts -= 1;
            message.textContent = `Wrong number! You have ${attempts} left!`;
            message.className = "messageWrong"; 
        }

        // If attempts = 0, game is ended
        if(attempts === 0) {
            message.textContent = "You have lost the game.";
            location.reload();
        }
    }
    e.preventDefault();
}

form.addEventListener("submit", guessNumber);
getRandomNumber();