import Day from '../../util/day';

enum Tile {
  "_." = ".",
  "_|" = "|",
  "_-" = "-",
  "_L" = "L",
  "_J" = "J",
  "_7" = "7",
  "_F" = "F",
  "_S" = "S"
}

enum Direction {
  N = "N",
  S = "S",
  E = "E",
  W = "W",
  END = "END",
}

function parseInput(input: string[]) {
  const result = [];
  for (const i of input) {
    result.push(i.split(''));
  }
  return result;
}

function getTile(rawTile: string) {
  if (rawTile === ".") {
    return Tile['_.'];
  }
  if (rawTile === "|") {
    return Tile['_|'];
  }
  if (rawTile === "-") {
    return Tile['_-'];
  }
  if (rawTile === "L") {
    return Tile['_L'];
  }
  if (rawTile === "J") {
    return Tile['_J'];
  }
  if (rawTile === "7") {
    return Tile['_7'];
  }
  if (rawTile === "F") {
    return Tile['_F'];
  }
  if (rawTile === "S") {
    return Tile['_S'];
  }
  throw Error(`Not a valid tile: ${rawTile}`);
}

function getStart(map: string[][]) {
  for (let x = 0; x < map.length; x += 1) {
    for (let y = 0; y < map[x].length; y += 1) {
      if (map[x][y] === "S") {
        return [x, y]
      }
    }
  }
}

function getNextTile(map: string[][], x: number, y: number, incomingDirection: Direction) {
  let newX = x;
  let newY = y;
  if (incomingDirection === Direction.W) {
    newX = x;
    newY = y - 1;
  }
  if (incomingDirection === Direction.E) {
    newX = x;
    newY = y + 1;
  }
  if (incomingDirection === Direction.N) {
    newX = x - 1;
    newY = y;
  }
  if (incomingDirection === Direction.S) {
    newX = x + 1;
    newY = y;
  }
  if (newX === x && newY === y) {
    throw Error();
  }

  return {
    // tile: getTile(map, newX, newY),
    tile: map[newX][newY],
    nextDirection: map[newX][newY] !== "." ? getNextDirection(getTile(map[newX][newY]), incomingDirection)! : null,
    x: newX,
    y: newY,
  }
}

function getNextDirection(tile: Tile, incomingDirection: Direction) {
  if (tile === Tile._S) {
    return Direction.END;
  }
  if (incomingDirection === Direction.W) {
    if (tile === Tile['_-']) {
      return Direction.W;
    } else if (tile === Tile._F) {
      return Direction.S;
    } else if (tile === Tile._L) {
      return Direction.N;
    }
    else {
      console.log(`Not a valid incoming direction: ${tile} ${incomingDirection}`)
      return null;
    }
  }
  if (incomingDirection === Direction.E) {
    if (tile === Tile['_-']) {
      return Direction.E;
    } else if (tile === Tile._7) {
      return Direction.S;
    } else if (tile === Tile._J) {
      return Direction.N;
    }
    else {
      console.log(`Not a valid incoming direction: ${tile} ${incomingDirection}`)
      return null;
    }
  }
  if (incomingDirection === Direction.N) {
    if (tile === Tile._F) {
      return Direction.E;
    } else if (tile === Tile['_|']) {
      return Direction.N;
    } else if (tile === Tile['_7']) {
      return Direction.W;
    }
    else {
      console.log(`Not a valid incoming direction: ${tile} ${incomingDirection}`)
      return null;
    }
  }
  if (incomingDirection === Direction.S) {
    if (tile === Tile['_|']) {
      return Direction.S;
    } else if (tile === Tile._J) {
      return Direction.W;
    } else if (tile === Tile._L) {
      return Direction.E;
    }
    else {
      console.log(`Not a valid incoming direction: ${tile} ${incomingDirection}`)
      return null;
    }
  }
  return null;
}

function solveOne(input: string[]) {
  const map = parseInput(input);
  const [startX, startY] = getStart(map)!;

  const validPaths = [];
  for (const direction of [Direction.N, Direction.S, Direction.W, Direction.E]) {
    const path = [[startX, startY]];
    let tile = getNextTile(map, startX, startY, direction);
    while (tile.nextDirection !== Direction.END) {
      if (tile.nextDirection) {
        const next = (getNextTile(map, tile.x, tile.y, tile.nextDirection));
        path.push([next.x, next.y]);
        tile = next;
      }
      if (tile.nextDirection === null) {
        break;
      }
    }
    if (tile.nextDirection !== null) {
      validPaths.push({ path, direction, steps: path.length, furthestDistance: path.length / 2 });
    }
  }
  console.log(validPaths)
}


export default class Day_10 extends Day {
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
