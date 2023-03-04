const prompt = require("prompt-sync")({ sigint: true });

const lettersByNumber = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h",
  9: "i",
  10: "j",
  11: "k",
  12: "l",
  13: "m",
  14: "n",
  15: "o",
  16: "p",
  17: "q",
  18: "r",
  19: "s",
  20: "t",
  21: "u",
  22: "v",
  23: "w",
  24: "x",
  25: "y",
  26: "z",
};

const numbersByLetter = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

const codeSeparator = ".";
const wordSeparator = " ";

function encode(words, cypherString) {
  let cypher = cypherString.split(codeSeparator);
  let cypherIndex = 0;
  let codes = [];

  for (let word of words.split(wordSeparator)) {
    let code = [];
    for (let letter of word) {
      let originalNumber = numbersByLetter[letter];

      if (cypherIndex >= cypher.length) {
        cypherIndex = 0;
      }

      let offset = parseInt(cypher[cypherIndex++]);
      let newNumber = originalNumber + offset;

      code.push(newNumber);
    }
    codes.push(code.join(codeSeparator));
  }

  return codes.join(wordSeparator);
}

function decode(secrets, cypherString) {
  let cypher = cypherString.split(codeSeparator);
  let cypherIndex = 0;
  let words = [];

  for (let secret of secrets.split(wordSeparator)) {
    let letters = [];
    let numbers = secret.split(codeSeparator);

    for (let secretNumber of numbers) {
      if (cypherIndex >= cypher.length) {
        cypherIndex = 0;
      }
      let offset = parseInt(cypher[cypherIndex++]);
      let number = secretNumber - offset;
      let letter = lettersByNumber[number];
      letters.push(letter);
    }
    words.push(letters.join(""));
  }

  return words.join(wordSeparator);
}

const method = prompt("'encode' or 'decode': ");
const input = prompt("input (word or numbers with dots): ");
const cypher = prompt("cypher (like 1.3.0.2): ");

let output = "";
if (method === "encode") {
  output = encode(input, cypher);
} else if (method === "decode") {
  output = decode(input, cypher);
} else {
  output = " Unknown method! UNACCEPTABLE!!!";
}

console.log(`\n\nYour ${method}d word is '${output}'\n\n`);
