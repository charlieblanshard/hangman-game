//Imported English words using npm
var words = require("an-array-of-english-words");

function RandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export { RandomWord };
