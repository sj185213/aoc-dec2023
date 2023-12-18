import Day from '../../util/day';

const ROCK = "#";
const ASH = ".";

function reverseString(s: string) {
  return s.split("").reverse().join("");
}

/**
 * Rows are the first index
 * Columns are the second index
 */
function parseGrid(input: string[]) {
  const result = [];
  for (const i of input) {
    // const arr = [];
    // for (const j of i) {
    //   arr.push(j);
    // }
    result.push(i.split(""));
  }
  return result;
}

function parseRawGrids(input: string[]) {
  const rawInput = input.join('\n');
  const rawGrids = rawInput.split('\n\n').map(rawGrid => rawGrid.split('\n'));
  return rawGrids;
}

/**
 * Find the valid vertical mirror location for a given grid
 * Returns -1 if there is no valid mirror location
 */
function findValidVerticalMirror(input: string[][]) {
  const validPositions: any = {};
  for (const inp of input) {
    for (let i = 1; i < inp.length; i += 1) {
      // Get the reflection distance (shorter side with columns)
      let reflectionDistance = inp.length - i;
      let mirrorPosition = i;
      if (i < reflectionDistance) {
        reflectionDistance = i;
      }
      
      // Find all valid positions for the mirror
      if (
        inp.slice(mirrorPosition - reflectionDistance, mirrorPosition).join("") ===
        reverseString(inp.slice(mirrorPosition, mirrorPosition + reflectionDistance).join(""))
      ) {
        if (validPositions[mirrorPosition] === undefined) {
          validPositions[mirrorPosition] = 0;
        }
        validPositions[mirrorPosition] += 1;
      }
    }
  }
  
  // Only return the valid position if it matches for all rows in the grid
  for (const [position, count] of Object.entries(validPositions)) {
    if (count === input.length) {
      return parseInt(position);
    }
  }

  return -1;
}

function transpose(matrix: string[][]) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function findValidHorizontalMirror(input: string[][]) {
  // Transpose the grid so that we can use findValidVerticalMirror
  const n = transpose(input);
  return findValidVerticalMirror(n);
}

function solveOne(input: string[]) {
  const rawGrids = parseRawGrids(input);
  const verticalPositions = [];
  const horizontalPositions = [];
  for (const rawGrid of rawGrids) {
    const grid = parseGrid(rawGrid);
    const vertPos = findValidVerticalMirror(grid);
    const horzPos = findValidHorizontalMirror(grid);
    if (vertPos !== -1) {
      verticalPositions.push(vertPos);
    }
    if (horzPos !== -1) {
      horizontalPositions.push(horzPos * 100);
    }
  }

  const sum = verticalPositions.concat(horizontalPositions).reduce((p, c) => p + c, 0);
  console.log(sum);
}

export default class Day_13 extends Day {
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

    // return your answer
    return -1;
  };
}
