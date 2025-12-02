const LETTERPOOL = {
  'A':9,'B':2,'C':2,'D':4,
  'E':12,'F':2,'G':3,'H':2,
  'I':9,'J':1,'K':1,'L':4,'M':2,
  'N':6,'O':8,'P':2,'Q':1,
  'R':6,'S':4,'T':6,'U':4,
  'V':2,'W':2,'X':1,
  'Y':2,'Z':1
};

export const createPoolList = () => {
  const poolList = [];
  for (let [letter, numberOfTiles] of Object.entries(LETTERPOOL)) {
    for (let i=0; i < numberOfTiles; i++) {
      poolList.push(letter);
    };
  };
  return poolList;
};

export const drawLetters = () => {
  const poolList = createPoolList();
  let hand = [];
  let letterFreq = {};
  let draw = true;

  while (draw) {
    let letterIndex = Math.floor(Math.random() * poolList.length); //Assigns the index of the letter based on random integer
    let letter = poolList[letterIndex]; //Accesses the letter at index

    if (letter in letterFreq && letterFreq[letter] === LETTERPOOL[letter]) {
      continue;
    } else if (letter in letterFreq && letterFreq[letter] < LETTERPOOL[letter]){
      letterFreq[letter] += 1;
      hand.push(letter);
    } else {
      letterFreq[letter] = 1;
      hand.push(letter);
    };

    //Returns the hand once it has 10 letters
    if (hand.length === 10) {
      draw = false;
      console.log(`Hand:${hand}`);
      return hand;
    };
  };
};


export const usesAvailableLetters = (input, lettersInHand) => {
  let inputAsList = input.toUpperCase().split(''); // Creates a list of all the letters within the word
  let hand = lettersInHand;
  let isValid = true;

  // Creating a dictionary that counts the letters in the word
  let letterFreq = {};
  for (let letter of hand) {
    letterFreq[letter] = (letterFreq[letter] || 0) + 1;
  }

  // Checks if the letters in the word are in the hand
  for (let letter of inputAsList) {
    if (!letterFreq[letter] || letterFreq[letter] === 0) { // If the letter is in the hand
      isValid = false;
      break;
    } else {
      letterFreq[letter] -= 1;
    };
  };
  return isValid;
};

export const scoreWord = (word) => {
  let wordList = word.toUpperCase().split(''); // Creates a list of all the letters within the word
  let score = 0;

  const LETTER_POINTS = {
    'Q': 10, 'Z': 10,
    'J': 8, 'X': 8,
    'K': 5,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'D': 2, 'G': 2,
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1
  };

  for (let letter of wordList) {
    score += LETTER_POINTS[letter];
  };

  // Adds 8 bonus points if the length of the word is 7 points or more

  if (wordList.length >= 7) {
    score += 8;
  }

  return score;

};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
