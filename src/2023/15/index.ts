import Day from '../../util/day';

function parseInput(input: string[]) {
  return input[0].replace("\n", "").split(",");
}

function hashAlgorithm(s: string) {
  let value = 0;
  for (const char of s) {
    value += char.charCodeAt(0);
    value *= 17;
    value = value % 256;
    // console.log(char, value);
  }
  return value;
}

function solveOne(input: string[]) {
  const strings = parseInput(input);
  const sequences = strings.map(s => hashAlgorithm(s));
  const result = sequences.reduce((p, c) => p + c, 0);
  console.log("Result:", result);
}

function solveTwo(input: string[]) {
  const hashmap: { [key: string]: string[] } = {}; // hashmap[box#][lenslabel] = [focallength]
  const strings = parseInput(input);
  // const strings = [
  //   "rn=1",
  //   "rn-"
  // ];
  for (const s of strings) {
    // Find out if its = or -
    if (s.includes("=")) {
      // Get the label
      const temp = s.split("=");
      const lensLabel = temp[0];
      const focalLength = temp[1];
      const boxNumber = hashAlgorithm(lensLabel);
      // console.log(lensLabel, focalLength, boxNumber);
      if (hashmap[boxNumber] === undefined) {
        hashmap[boxNumber] = [];
      }
      const index = hashmap[boxNumber].findIndex((v: string) => v.includes(lensLabel));
      if (index !== -1) {
        hashmap[boxNumber][index] = `${lensLabel} ${focalLength}`
      } else {
        hashmap[boxNumber].push(`${lensLabel} ${focalLength}`);
      }
    } else {
      const lensLabel = s.slice(0, -1);
      const boxNumber = hashAlgorithm(lensLabel);
      if (hashmap[boxNumber]) {
        const index = hashmap[boxNumber].findIndex((v: string) => v.includes(lensLabel));
        if (index !== -1) {
          // console.log("To remove", lensLabel, boxNumber, index);
          hashmap[boxNumber].splice(index, 1);
        }
      }
    }
  }

  console.log(hashmap);
  let result = 0;
  for (const [boxNumber, lenses] of Object.entries(hashmap)) {
    for (let i = 0; i < lenses.length; i += 1) {
      const lens = lenses[i];
      const focalLength = parseInt(lens.split(" ")[1]);
      result += (parseInt(boxNumber) + 1) * (i + 1) * focalLength;
    } 
  }
  console.log("result:", result);
}

export default class Day_15 extends Day {
  /**
   * The first part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  one = (input: string[]): number => {
    // solve the problem
    solveOne(input);
    // return your answer
    return -1;
  };

  /**
   * The second part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  two = (input: string[]): number => {
    // solve the problem
    solveTwo(input);
    // return your answer
    return -1;
  };
}
