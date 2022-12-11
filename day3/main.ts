const file = await Deno.readTextFile("input.txt");

const lines = file.split("\n").map((line) => line.trim());

const input = lines.map((line) => {
  const firstHalf = line.substring(0, line.length / 2).split("");
  const secondHalf = line.substring(line.length / 2).split("");

  return { firstHalf, secondHalf };
});

const getCommonLetters = (firstHalf: string[], secondHalf: string[]) => {
  const commonLetters: string[] = [];

  firstHalf.forEach((letter) => {
    if (secondHalf.includes(letter)) {
      commonLetters.push(letter);
    }
  });

  // remove duplicates
  return [...new Set(commonLetters)];
}

const commonLetters = input.map(({ firstHalf, secondHalf }) => getCommonLetters(firstHalf, secondHalf));

const getNumericValue = (letter: string) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
}

// log numeric value of each letter
// console.log(commonLetters.map((letters) => letters.map((letter) => getNumericValue(letter))));

// log sum of numeric values of each letter

console.log(commonLetters.reduce((acc, letters) => {
  const sum = letters.reduce((acc, letter) => acc + getNumericValue(letter), 0);
  return acc + sum;
}, 0));

// part 2

// group lines by 3 rows
const input2: string[][] = [];

for (let i = 0; i < lines.length; i += 3) {
  input2.push([lines[i], lines[i + 1], lines[i + 2]]);
}

// console.log(input2)

const getLineCommonLetter = (lines: string[]) => {
  // get common letter that appears in all 3 lines
  let commonLetter = "";

  lines[0].split("").forEach((letter) => {
    if (lines[1].includes(letter) && lines[2].includes(letter)) {
      commonLetter = letter;
    }
  });

  return commonLetter;
};

const commonLetters2 = input2.map((lines) => getLineCommonLetter(lines));

console.log(commonLetters2.reduce((acc, letter) => getNumericValue(letter) + acc, 0));