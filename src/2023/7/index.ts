import Day from '../../util/day';
import { solveTwo } from './part2';

// type CardType = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";
const CardRank: { [key: string]: number } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "T": 10,
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14,
}

const HandRank: { [key: string]: number } = {
  "High card": 1,
  "One pair": 2,
  "Two pair": 3,
  "Three of a kind": 4,
  "Full house": 5,
  "Four of a kind": 6,
  "Five of a kind": 7,
}

/**
 * Returns true if the first card is stronger than the second
 * Otherwise false
 */
function compareCard(cardOne: string, cardTwo: string) {
  if (CardRank[cardOne] > CardRank[cardTwo]) {
    return 1;
  }
  else if (CardRank[cardOne] < CardRank[cardTwo]) {
    return -1;
  }
  else {
    return 0;
  }
}

function getHandType(hand: string) {
  const counts: any = {};
  for (const card of hand) {
    if (counts[card] === undefined) {
      counts[card] = 1;
    } else {
      counts[card] += 1;
    }
  }
  
  if (Object.keys(counts).length === 1) {
    return 'Five of a kind';
  }
  else if (Object.keys(counts).length === 2) {
    if (Object.values(counts).includes(4)) {
      return 'Four of a kind';
    }
    return 'Full house';
  }
  else if (Object.keys(counts).length === 3) {
    if (Object.values(counts).includes(3)) {
      return 'Three of a kind';
    }
    return 'Two pair';
  }
  else if (Object.keys(counts).length === 4) {
    return 'One pair';
  }
  return 'High card';
}

function compareHands(handOne: string, handTwo: string) {
  const handOneType = getHandType(handOne);
  const handTwoType = getHandType(handTwo);
  if (HandRank[handOneType] !== HandRank[handTwoType]) {
    return HandRank[handOneType] > HandRank[handTwoType] ? 1 : -1;
  }

  // Loop through each card (5 cards in a hand)
  for (let i = 0; i < 5; i += 1) {
    const c = compareCard(handOne[i], handTwo[i]);
    if (c !== 0) {
      return c;
    }
  }
  return 0;
}

interface HandsWithBids {
  hand: string;
  bid: number;
}

function parseInput(input: string[]) {
  return input.map(i => { 
    const line = i.split(" ");
    return {
      hand: line[0],
      bid: parseInt(line[1])
    };
  });
}

export default class Day_7 extends Day {
  /**
   * The first part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  one = (input: string[]): number => {
    // solve the problem
    input = input.map(i => i.trim());
    const handsWithBids = parseInput(input);

    const priority: any[] = [];
    for (let i = 0; i < handsWithBids.length; i += 1) {
      if (priority.length === 0) {
        priority.push(handsWithBids[i]);
        continue;
      }
      
      const pLength = priority.length;
      for (let j = 0; j < pLength; j += 1) {
        const comparison = (compareHands(handsWithBids[i].hand, priority[j].hand));
        if (comparison === 1 && pLength - 1 === j) {
          priority.push(handsWithBids[i]);
          break;
        }
        else if (comparison === -1) {
          priority.splice(j, 0, handsWithBids[i]);
          break;
        }
      }
    }

    let result = 0;
    for (let i = 0; i < priority.length; i += 1) {
      const factor = i + 1;

      result += priority[i].bid * factor;
    }
    console.log(priority);
    console.log(result);
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
