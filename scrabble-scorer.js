// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// !!!HERE (only change CODE from HERE to .... )!!!!

// part A function to Change
function initialPrompt() {
   word = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   console.log(oldScrabbleScorer(word));
};

// PART 2 functions to write (make case insensitive = make all lowercase)
// every letter is 1 point. should be easy to write. maybe one line of code
let simpleScorer = function(word) {
   return word.length;
 };
// can use string methods to tell vowels from non-vowels
let vowelBonusScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;
   const vowels = ['a', 'e', 'i', 'o', 'u'];
   for (let i = 0; i < word.length; i++) {
     let letter = word[i];
     if (vowels.indexOf(letter) !== -1) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 };
 

// PART 3 funtion to write
let scrabbleScorer = function(word, scoringObject) {
  let score = 0;
  word = word.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    score += scoringObject[letter];
  }
  return score;
};
// is a Array that will old 3 Objects. the Ojbect will store the 3 scorer functions from lecture
const scoringAlgorithms = [ 
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
    },
    {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
    },
    {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: oldScrabbleScorer // PART 3 change to scrabbleScorer  
    }
];
// PART 2. will Ask the user what Score function to use (scoring algorithm)

function scorerPrompt() {
   let index = input.question(`Which scoring algorithm would you like to use?\n
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n
   Enter 0, 1, or 2: `);
   // console.log(index);
            if (index === "0") {
            selectedScorer = scoringAlgorithms[0]; // Simple Score
            console.log("algorithm name: ", scoringAlgorithms[0].name);
            console.log("scorerFunction result: ", scoringAlgorithms[0].scorerFunction(word));
            console.log(`Score for "${word}" is ${scoringAlgorithms[0].scorerFunction(word)} points`)
            } else if (index === "1") {
            selectedScorer = scoringAlgorithms[1]; // Vowel Bonus Score
            console.log("algorithm name: ", scoringAlgorithms[1].name);
            console.log("scorerFunction result: ", scoringAlgorithms[1].scorerFunction(word));
            console.log(`Score for "${word}" is ${scoringAlgorithms[1].scorerFunction(word)} points`)
            } else if (index === "2") {
            selectedScorer = scoringAlgorithms[2]; // Scrabble Score
            console.log("algorithm name: ", scoringAlgorithms[2].name);
            console.log("scorerFunction result: ", scoringAlgorithms[2].scorerFunction(word));
            console.log(`Score for "${word}" is ${scoringAlgorithms[2].scorerFunction(word)} points`)
            } else {
            console.log("Invalid choice! Using default Scrabble Score function.");
            selectedScorer = scoringAlgorithms[2]; // Default to Scrabble Score
            }
return scoringAlgorithms[index];
//return scoringAlgorithms[index].scorerFunction;
}


// PART 3. Create a new Point structure out of the old Point structure.
function transform(oldPointStructure) {
 let newPointStructure = {};
  // The in operator returns true if the specified property is in the specified object. 
  for (let pointValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
      newPointStructure[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
    }
  }
  return newPointStructure;
}
let newPointStructure = transform(oldPointStructure);

// Runs the Program In Part B will change of initalPrompt to scorerPrompt
function runProgram() {
   initialPrompt();
   scorerPrompt();
}
//!!!! HERE

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
