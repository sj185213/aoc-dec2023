import Day from '../../util/day';

function parseInput(input: string[]) {
  // find which rows are empty (only contains . / no #)
  const emptyRowIndices = [];
  for (let i = 0; i < input.length; i += 1) {
    if (input[i].includes("#") === false) {
      emptyRowIndices.push(i);
    }
  }

  // find which columns are empty (only contains . / no #)
  const emptyColIndices = [];
  for (let i = 0; i < input[0].length; i += 1) {
    let isColEmpty = true;
    for (let j = 0; j < input.length; j += 1) {
      if (input[j].substring(i, i + 1) === "#") {
        isColEmpty = false;
      }
    }
    if (isColEmpty) {
      emptyColIndices.push(i);
    }
  }
  console.log("emptyRowIndices:", emptyRowIndices);
  console.log("emptyColIndices:", emptyColIndices);
  
  // make the new map
  // each empty row/column is expanded an extra
  const map = [];
  for (let rowIndex = 0; rowIndex < input.length; rowIndex += 1) {
    const row: string[] = [];
    for (let colIndex = 0; colIndex < input[0].length; colIndex += 1) {
      row.push(input[rowIndex][colIndex])
      // Push again if colIndex is detected as an empty one
      if (emptyColIndices.includes(colIndex)) {
        row.push('.');
      }
    }
    map.push(row);
    if (emptyRowIndices.includes(rowIndex)) {
      map.push(row); // add the empty row again to double the space
    }
  }

  return {
    original: input,
    spaceMap: map
  };
}

function printMap(spaceMap: string[][]) {
  for (let i = 0; i < spaceMap.length; i += 1) {
    console.log(spaceMap[i].join(''));
  }
}

function numberGalaxies(map: string[][]) {
  let num = 1;
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[0].length; j += 1) {
      if (map[i][j] === "#") {
        map[i][j] = `${num}`;
        num += 1;
      }
    }
  }

  return num;
}

function getGalaxy(map: string[][], galaxy: number) {
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[0].length; j += 1) {
      if (map[i][j] === `${galaxy}`) {
        return [i, j];
      }
    }
  }
}

function calcShortestPath(coordOne: number[], coordTwo: number[]) {
  const [iOne, jOne] = coordOne;
  const  [iTwo, jTwo] = coordTwo;
  return Math.abs(iOne - iTwo) + Math.abs(jOne - jTwo);
}


function solveOne(input: string[]) {
  const { spaceMap } = parseInput(input);
  const numOfGalaxies = numberGalaxies(spaceMap);
  printMap(spaceMap);
  
  getGalaxy(spaceMap, 2);
  const combinations: any = {};
  for (let i = 1; i < numOfGalaxies; i += 1) {
    for (let j = 1; j < numOfGalaxies; j += 1) {
      if (combinations[`from${j}to${i}`] === undefined && i !== j) {
        combinations[`from${i}to${j}`] = calcShortestPath(
          getGalaxy(spaceMap, i)!,
          getGalaxy(spaceMap, j)!
        );
      }
    }
  }
  console.log(combinations, Object.keys(combinations).length);  
  console.log("Sum:", (Object.values(combinations) as number[]).reduce((p, c) => p + c, 0));
}

function solveTwo(input: string[]) {
  const { spaceMap } = parseInput(input);
  const numOfGalaxies = numberGalaxies(spaceMap);
  printMap(spaceMap);
  
  getGalaxy(spaceMap, 2);
  const combinations: any = {};
  for (let i = 1; i < numOfGalaxies; i += 1) {
    for (let j = 1; j < numOfGalaxies; j += 1) {
      if (combinations[`from${j}to${i}`] === undefined && i !== j) {
        combinations[`from${i}to${j}`] = calcShortestPath(
          getGalaxy(spaceMap, i)!,
          getGalaxy(spaceMap, j)!
        );
      }
    }
  }
  console.log(combinations, Object.keys(combinations).length);  
  console.log("Sum:", (Object.values(combinations) as number[]).reduce((p, c) => p + c, 0));
}

export default class Day_11 extends Day {
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
