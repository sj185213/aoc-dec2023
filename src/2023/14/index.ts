import Day from '../../util/day';

const EMPTY = ".";
const ROCK = "#";
const ROUND_ROCK = "O";

function parseInput(input: string[]) {
  const map = [];
  for (const row of input) {
    map.push(row.split(""));
  }
  return map;
}

function transpose(matrix: string[][]) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

/** 
 * Tilts the given array and shifts all rounded rocks
 * closer to the beginning of the array
 */
function tilt(arr: string[]) {
  // console.log(arr);
  for (let i = 1; i < arr.length; i += 1) {
    const piece = arr[i];
    if (piece === ROUND_ROCK) {
      // loop backwards until the beginning or a ROCK is found
      for (let j = i - 1; j >= 0; j -= 1) {
        // console.log(i, j, arr[j], arr[i]);
        if ((arr[j] === ROUND_ROCK || arr[j] === ROCK) && j + 1 !== i) {
          arr[j + 1] = arr[i];
          arr[i] = EMPTY;
          // console.log("Moved", i, "to", j + 1);
          // console.log(arr);
          break;
        }
        else if ((arr[j] === ROUND_ROCK || arr[j] === ROCK) && j + 1 === i) {
          // console.log("Can't move", i);
          // console.log(arr);
          break;
        }
        else if (j === 0 && arr[j] === EMPTY) {
          arr[j] = arr[i];
          arr[i] = EMPTY;
          // console.log("Moved", i, "to the front");
          // console.log(arr);
          break;
        }
      }
    }
  }
  // console.log(arr);
  return arr;
}

function solveOne(input: string[]) {
  const dish = parseInput(input);
  
  // Transpose to make it easier to loop through
  const transposedDish = transpose(dish);
  const tiltedTransposedDish = transposedDish.map(section => tilt(section));
  
  // Transpose it back for calculation
  const tiltedDish = transpose(tiltedTransposedDish);
  const stringifiedDish = tiltedDish.map(section => section.join(""));
  let result = 0;
  for (let i = 0; i < stringifiedDish.length; i += 1) {
    const s = stringifiedDish[i]
    const numRoundRocks = (s.match(new RegExp(ROUND_ROCK, "g")) || []).length;
    const modifier = stringifiedDish.length - i;

    // console.log(s, numRoundRocks, modifier, numRoundRocks * modifier);
    result += (numRoundRocks * modifier);
  }
  console.log(result);
}

function flipVertical(input: string[][]) {
  const result = [];
  for (const i of input) {
    result.unshift(i);
  } 
  return result;
}

function flipHorizontal(input: string[][]) {
  return input.map(i => i.reverse());
}

function spinDish(dish: string[][]) {
  // tilt north
  let tiltedNorth = transpose(dish).map(section => tilt(section));
  tiltedNorth = transpose(tiltedNorth); // tilt back for next part

  // tilt west
  let tiltedWest = tiltedNorth.map(section => tilt(section));
  // console.log(tiltedWest);

  // tilt south
  let tiltedSouth = transpose(flipVertical(tiltedWest)).map(section => tilt(section));
  tiltedSouth = flipVertical(transpose(tiltedSouth));

  // tilt east
  let tiltedEast = flipHorizontal(tiltedSouth).map(section => tilt(section));
  tiltedEast = flipHorizontal(tiltedEast);
  
  return tiltedEast; // This is the result of one spin cycle
}

function solveTwo(input: string[]) {
  let dish = parseInput(input);
  
  const numCycles = 1000000000;
  for (let i = 0; i < 1000000000; i += 1) {
    dish = spinDish(dish);
    if (i % 100000 === 0) {
      console.log(i / 1000000000 * 100);
    }
  }
  
  const stringifiedDish = dish.map(section => section.join(""));
  let result = 0;
  for (let i = 0; i < stringifiedDish.length; i += 1) {
    const s = stringifiedDish[i]
    const numRoundRocks = (s.match(new RegExp(ROUND_ROCK, "g")) || []).length;
    const modifier = stringifiedDish.length - i;

    // console.log(s, numRoundRocks, modifier, numRoundRocks * modifier);
    result += (numRoundRocks * modifier);
  }
  print(dish);
  console.log(result);
}

function print(s: string[][]) {
  for (const a of s) {
    console.log(a.join(""));
  }
  console.log("");
}

export default class Day_14 extends Day {
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
