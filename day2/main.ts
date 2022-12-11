// deno proyect

const file = await Deno.readTextFile("input.txt");

const lines = file.split("\n").map((line) => line.trim());

// each lines has 2 letters: A,B or C and X,Y or Z; each one is equivalent to rock, paper or scissors

enum RPS {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum Result {
  X = 0,
  Y = 3,
  Z = 6,
}

const parseLine = (line: string): { p1: RPS, p2: RPS } => {
  const [a, b] = line.split(" ");

  const match: { p1: RPS, p2: RPS } = { p1: RPS.ROCK, p2: RPS.ROCK };

  switch (a) {
    case "A":
      match["p1"] = RPS.ROCK;
      break;
    case "B":
      match["p1"] = RPS.PAPER;
      break;
    case "C":
      match["p1"] = RPS.SCISSORS;
      break;
  }

  switch (b) {
    case "X":
      match["p2"] = RPS.ROCK;
      break;
    case "Y":
      match["p2"] = RPS.PAPER;
      break;
    case "Z":
      match["p2"] = RPS.SCISSORS;
      break;
  }

  return match;
}

const parseLine2 = (line: string): { p1: RPS, p2: Result } => {
  const [a, b] = line.split(" ");

  const match: { p1: RPS, p2: Result } = { p1: RPS.ROCK, p2: Result.X };

  switch (a) {
    case "A":
      match["p1"] = RPS.ROCK;
      break;
    case "B":
      match["p1"] = RPS.PAPER;
      break;
    case "C":
      match["p1"] = RPS.SCISSORS;
      break;
  }

  switch (b) {
    case "X":
      match["p2"] = Result.X;
      break;
    case "Y":
      match["p2"] = Result.Y;
      break;
    case "Z":
      match["p2"] = Result.Z;
      break;
  }

  return match;
}

const input = lines.map((line) => {
  return parseLine(line);
});

const input2 = lines.map((line) => {
  return parseLine2(line);
});

const play = (p1: RPS, p2: RPS): number => {
  let score: number = p2;

  if (p1 === p2) {
    score += 3;
  } else if (p1 === RPS.ROCK && p2 === RPS.PAPER) {
    score += 6;
  } else if (p1 === RPS.PAPER && p2 === RPS.SCISSORS) {
    score += 6;
  } else if (p1 === RPS.SCISSORS && p2 === RPS.ROCK) {
    score += 6;
  }

  return score;
}

const play2 = (p1: RPS, p2: Result): number => {

  console.log(p1, p2);

  let score: number = p2;

  switch (p2) {
    case Result.Z:
      switch (p1) {
        case RPS.ROCK:
          score += RPS.PAPER;
          break;
        case RPS.PAPER:
          score += RPS.SCISSORS;
          break;
        case RPS.SCISSORS:
          score += RPS.ROCK;
          break;
      }
      break;

    case Result.Y:
      score += p1;
      break;

    case Result.X:
      switch (p1) {
        case RPS.ROCK:
          score += RPS.SCISSORS;
          break;
        case RPS.PAPER:
          score += RPS.ROCK;
          break;
        case RPS.SCISSORS:
          score += RPS.PAPER;
          break;
      }
      break;
  }

  return score;
}

const score = input.reduce((acc, { p1, p2 }) => {
  return acc + play(p1, p2);
}, 0);

console.log(score);

const score2 = input2.reduce((acc, { p1, p2 }) => {
  return acc + play2(p1, p2);
}, 0);

console.log(score2);