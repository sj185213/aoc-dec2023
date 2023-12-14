import { isatty } from 'tty';
import Day from '../../util/day';

function getDifferences(input: number[]) {
  const result = [];
  for (let i = 0; i < input.length - 1; i += 1) {
    const difference = input[i + 1] - input[i];
    result.push(difference);
  }

  if (result.length !== input.length - 1) {
    throw Error(`getDifferences had an issue differences: ${result} | input: ${input}`);
  }

  return result;
}

function isArrayAllMatching(input: number[]) {
  let sum = 0;
  for (let i = 0; i < input.length; i += 1) {
    sum += input[i];

    if (sum !== 0) {
      return false;
    }
  }

  return true;
}

function parseInput(input: string[]) {
  return input.map(i => i.split(/\s+/).map(i => parseInt(i)));
}

function solveOne(input: string[]) {
  const sequences = parseInput(input);
  
  const predictions = []
  for (const startingSequence of sequences) {
    let sequence = startingSequence;
    const predictors = [startingSequence[startingSequence.length - 1]];
    while (!isArrayAllMatching(sequence)) {
      const diff = getDifferences(sequence);
      predictors.push(diff[diff.length - 1]);
      sequence = diff;
    }
    console.log(predictors);
    const prediction = predictors.reduce((prev, curr) => prev + curr, 0);
    predictions.push(prediction);
  }
  console.log(predictions.reduce((prev, curr) => prev + curr, 0));
  
  
}

function solveTwo(input: string[]) {
  const sequences = parseInput(input);

  const predictions = [];
  for (const startingSequence of sequences) {
    let sequence = startingSequence;
    const predictors = [startingSequence[0]];
    while (!isArrayAllMatching(sequence)) {
      const diff = getDifferences(sequence);
      predictors.push(diff[0]);
      sequence = diff;
    }
    let prediction = 0;
    for (let i = predictors.length - 1; i > -1; i -= 1) {
      prediction = predictors[i] - prediction;
    }
    predictions.push(prediction);
  }
  console.log(predictions.reduce((prev, curr) => prev + curr, 0));
  
}

export default class Day_9 extends Day {
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
