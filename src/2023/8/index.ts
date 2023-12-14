import Day from '../../util/day';

interface RawNode {
  rawNodeValue: string;
  rawLeft: string;
  rawRight: string;
}

class Node {
  value: string = "";
  left: Node | null = null;
  right: Node | null = null;
  constructor(value: string) {
    this.value = value;
  }
}

function parseInput(input: string[]) {
  const directions = input[0].split("");

  const rawLinkedList = input.slice(2)
    .map(raw => {
      const rawNodeValue = raw.split(" = ")[0];
      const rawLeft = raw.split(" = ")[1].replace(/[()\s+]/g, "").split(",")[0];
      const rawRight = raw.split(" = ")[1].replace(/[()\s+]/g, "").split(",")[1];
      return {
        rawNodeValue,
        rawLeft,
        rawRight,
      };
    });

  return { directions, rawLinkedList };
}

function leastCommonMultiple(arr: number[]) {

  function gcd(a: number, b: number): number {
      return !b ? a : gcd(b, a % b);
  }

  function lcm(a: number, b: number) {
      return (a * b) / gcd(a, b);   
  }

  let multiple = arr[0];
  arr.forEach(function(n) {
      multiple = lcm(multiple, n);
  });

  return multiple;
}

function solveOne(input: string[]) {
  const { directions, rawLinkedList } = parseInput(input);
  let current = rawLinkedList.find(e => e.rawNodeValue === "AAA")!;
  let i = 0;
  let steps = 0;
  while (i < directions.length && current.rawNodeValue !== "ZZZ") { 
    console.log(current);
    const direction = directions[i];
    let next = null;
    if (direction === "L") {
      next = rawLinkedList.find((rawNode) => rawNode.rawNodeValue === current.rawLeft);
    }
    if (direction === "R") {
      next = rawLinkedList.find((rawNode) => rawNode.rawNodeValue === current.rawRight);
    }
    
    if (next) {
      current = next;
    }

    if (i === directions.length - 1) {
      i = 0;
    } else {
      i += 1;
    }
    steps += 1;
  }
  console.log("Steps:", steps);
}

function solveTwo(input: string[]) {
  const { directions, rawLinkedList } = parseInput(input);

  const startingNodes = rawLinkedList.filter((node) => node.rawNodeValue.endsWith("A"));

  let steps: number[] = [];

  console.log(`There are ${startingNodes.length} starting nodes.`);

  for (let node of startingNodes) {
    let thisNodeSteps = 0;
    let i = 0;
    while (i < directions.length && !node.rawNodeValue.endsWith("Z")) {
      const direction = directions[i];
      let next = null;
      if (direction === "L") {
        next = rawLinkedList.find((rawNode) => rawNode.rawNodeValue === node.rawLeft);
      }
      if (direction === "R") {
        next = rawLinkedList.find((rawNode) => rawNode.rawNodeValue === node.rawRight);
      }

      if (next) {
        node = next;
      }
  
      if (i === directions.length - 1) {
        i = 0;
      } else {
        i += 1;
      }
      thisNodeSteps += 1;
    }
    steps.push(thisNodeSteps);
  }
  console.log("Steps for each starting node:", steps);
  console.log("LCM:", leastCommonMultiple(steps));
  
}

export default class Day_8 extends Day {
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
