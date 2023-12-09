import Day from '../../util/day';

const CardRank: { [key: string]: number } = {
  "J": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "T": 10,
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

  // Adding a section to turn the 'J'okers into the highest card in the hand
  const numJokers = counts["J"];
  if (numJokers > 0) {
    let mostCommonCards: string[] = [];
    let max = 0;
    for (const entry of Object.entries(counts)) {
      const card: string = entry[0];
      const count: number = entry[1] as number;
  
      if (card === "J") {
        continue;
      }
  
      // Get the highest of the values
      if (count as number > max) {
        mostCommonCards = [card];
        max = count;
      }
      else if (count as number === max) {
        mostCommonCards.push(card);
      }
    }
  
    if (numJokers === 5) {
      counts["A"] = numJokers;
      delete counts["J"];
    }
    else if (mostCommonCards.length === 1) {
      counts[mostCommonCards[0]] += numJokers;
      delete counts["J"];
    }
    else if (mostCommonCards.length > 1) {
      // Find the highest card
      let highestCard = mostCommonCards[0];
      for (let i = 0; i < mostCommonCards.length; i += 1) {
        const c = compareCard(mostCommonCards[i], highestCard);
  
        if (c === 1) {
          highestCard = mostCommonCards[i];
        }
      }
      
      // Add to the count of the highest card
      counts[highestCard] += numJokers;
      delete counts["J"];
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

export function solveTwo(input: string[]) {
  input = input.map(i => i.trim());

  input = input.map(i => i.trim());
  const handsWithBids = parseInput(input);
  console.log(handsWithBids);

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
}
