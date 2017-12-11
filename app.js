var inquirer = require("inquirer");
var fs = require("fs");
var Word = require("./wordContructor.js");



// Word: Used to create an object representing the current word the user is attempting to guess. This should contain word specific logic and data.

// function Word(word){
//     this.wLengh = word.length;
//     this.wArray = word.split("");
//     this.haveGuessed = false

// };

// Word.prototype.printInfo = function() {
    
//   };

// Letter: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.
// function Letter(){
    //letter has been guessed
    //letter is a _

// }
//You must keep track of the user's remaining guesses and prompt the user if they would like to end the game if none remain.

//Each constructor function should be in it's own file and be exported and required wherever needed.


// ask user if they want to play
// if yes, generate _ for a random word
// ask user to guess a letter
// if the user guess is a letter in the word replace the _ with a _

//pull word from word array
// give length of word which will equal the amount of _ to console.log
// generate 2 arrays, 1 of the letters and 1 for _

// Array of Word Options (all lowercase)
var wordsList = ["dog", "cat", "monkey", "snake", "elephant", "sloth",
"dinosour", "zebra", "bison", "elk", "moose", "triceratops"];
// Solution will be held here.
var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;


// function Word(word){
//     this.lettersInChosenWord = word.split("");
//     this.numBlanks = this.lettersInChosenWord.length;

// };



function startGame() {
    // Reset the guesses back to 0.
    numGuesses = 9;
    
    // Solution is chosen randomly from wordList.
    // chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    chosenWord = new Word(wordsList[Math.floor(Math.random() * wordsList.length)]);    
    // var chosenWord = new Word(newWord);
    // The word is broken into individual letters.
    // lettersInChosenWord = chosenWord.split("");
    lettersInChosenWord = chosenWord.lettersInChosenWord;
    
    // We count the number of letters in the word.
    // numBlanks = lettersInChosenWord.length;
    numBlanks = chosenWord.numBlanks;
    
    
    // We print the solution in console (for testing).
    // console.log(chosenWord);
    
    // CRITICAL LINE - Here we *reset* the guess and success array at each round.
    blanksAndSuccesses = [];
    // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
    wrongGuesses = [];
    
    // Fill up the blanksAndSuccesses list with appropriate number of blanks.
    // This is based on number of letters in solution.
    for (var i = 0; i < numBlanks; i++) {
      blanksAndSuccesses.push("_");
    }
    
    // Print the initial blanks in console.
    console.log(blanksAndSuccesses.join(" "));
}


function checkLetters(letter) {
    
    // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
    var letterInWord = false;
    
    // Check if a letter exists inside the array at all.
    for (var i = 0; i < numBlanks; i++) {
      if (chosenWord.lettersInChosenWord[i] === letter) {
        // If the letter exists then toggle this boolean to true. This will be used in the next step.
        letterInWord = true;
      }
    }
    
    // If the letter exists somewhere in the word, then figure out exactly where (which indices).
    if (letterInWord) {
    
      // Loop through the word.
      for (var j = 0; j < numBlanks; j++) {
    
        // Populate the blanksAndSuccesses with every instance of the letter.
        if (chosenWord.lettersInChosenWord[j] === letter) {
          // Here we set the specific space in blanks and letter equal to the letter when there is a match.
          blanksAndSuccesses[j] = letter;
          console.log("Correct!!")
        }
      }
      // Logging for testing.
      console.log(blanksAndSuccesses.join(" "));
    }
    // If the letter doesn't exist at all...
    else {
      // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
      numGuesses--;      
      console.log("WRONG! You have " + numGuesses + " guesses remaining!")
      console.log(blanksAndSuccesses.join(" "));
      
    }
    }

function playAgain(){
        
            inquirer.prompt([
                {
                    type: "list",
                    name: "again",
                    message: "Do you want to play again?",
                    choices: [
                      "Yes",
                      "No"
                     ]
                  }
            
            ]).then(answers => {
                if (answers.again === "Yes"){
                    startGame();                              
                    runGame();                    
                }
        
        
        
        
            });};

    function roundComplete() {
        
        // If we have gotten all the letters to match the solution...
        if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
          // ..add to the win counter & give the user an alert.
          console.log("You win! Next Word!");
          playAgain()
        }
        
        // If we've run out of guesses..
        else if (numGuesses === 0) {
          // Give the user an alert.
          console.log("You lose");
          playAgain()
        }else {
            runGame();
        }
        
        }

function runGame(){
    if( numGuesses > 0 ){
    inquirer.prompt([
        {   type: 'input',
            name: 'guess',
            message: 'Guess a letter!',
          }
    
    ]).then(answers => {
        // console.log("Your Guess was: " + answers.guess);
        checkLetters(answers.guess);
        roundComplete()




    });
}
}
startGame();
runGame();
