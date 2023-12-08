import Day from '../../util/day';

interface Race {
  time: number,
  recordDistance: number
}


function parseInput(input: string[]) {
  const times = input[0].split(":")[1].trim().split(/\s+/).map(i => parseInt(i.trim()));
  const distances = input[1].split(":")[1].trim().split(/\s+/).map(i => parseInt(i.trim()));
  const races: Race[] = [];
  for (let i = 0; i < times.length; i += 1) {
    races.push({
      time: times[i],
      recordDistance: distances[i]
    })
  }
  return races;
}

function calculatePossibitiesForRace(race: Race) {
  const possibilites = [];
  // throw out 0 and total time as possibilites
  for (let i = 1; i < race.time; i += 1) {
    const timePressed = i;
    const timeLeft = race.time - timePressed;
    const speed = i;
    if (speed * timeLeft > race.recordDistance) {
      possibilites.push([timePressed, speed * timeLeft]);
    }
  }
  return possibilites;
}

function parseInput2(input: string[]) {
  const time = input[0].split(":")[1].trim().split(/\s+/).map(i => i.trim()).join("");
  const distance = input[1].split(":")[1].trim().split(/\s+/).map(i => i.trim()).join("");
  
  const races: Race[] = [{
    time: parseInt(time),
    recordDistance: parseInt(distance)
  }];
  
  return races;
}


export default class Day_6 extends Day {
  /**
   * The first part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  one = (input: string[]): number => {
    // solve the problem
    input = input.map(i => i.trim());
    const races = parseInput(input);
    const winningPossibilites = races.map(race => {
      return calculatePossibitiesForRace(race).length;
    });

    const result = winningPossibilites.reduce((prev, curr) => prev * curr, 1);
    console.log("Result:", result);
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
    input = input.map(i => i.trim());
    const races = parseInput2(input);
    const possibilites = calculatePossibitiesForRace(races[0]);
    console.log("Possibilites:", possibilites.length);
    // return your answer
    return -1;
  };
}
