import Day from '../../util/day';

interface SourceToDestinationMap {
    source: number;
    destination: number;
    range: number;
}

/**
 * Returns the corresponding number to the input value based on the given
 * source to destination ranges
 */
function getMapping(value: number, sourceToDestinationRanges: SourceToDestinationMap[]) {
  let found = false;
  let i = 0;
  let modifier = value;
  let mapping = value;
  while (!found && i < sourceToDestinationRanges.length) {
    const { source, destination, range } = sourceToDestinationRanges[i];
    const lower = source;
    const upper = source + range;

    if (value >= lower && value <= upper) {
      found = true;
      modifier = value - source;
      mapping = destination + modifier;
    }
    
    i += 1;
  }
  // console.log(value, "maps to", mapping);
  return mapping;
}

/**
 * Parses all the maps from the input into the structured data format
 */
function parseAllMaps(input: string[]) {

  const rawSeedToSoilMap = parseRawMapByHeader(input, "seed-to-soil map:");
  const rawSoilToFertilizerMap = parseRawMapByHeader(input, "soil-to-fertilizer map:");
  const rawFertilizerToWaterMap = parseRawMapByHeader(input, "fertilizer-to-water map:");
  const rawWaterToLightMap = parseRawMapByHeader(input, "water-to-light map:");
  const rawLightToTemperatureMap = parseRawMapByHeader(input, "light-to-temperature map:");
  const rawTemperatureToHumidityMap = parseRawMapByHeader(input, "temperature-to-humidity map:");
  const rawHumidityToLocationMap = parseRawMapByHeader(input, "humidity-to-location map:");

  const seedToSoilMap = parseRawMap(rawSeedToSoilMap);
  const soilToFertilizerMap = parseRawMap(rawSoilToFertilizerMap);
  const fertilizerToWaterMap = parseRawMap(rawFertilizerToWaterMap);
  const waterToLightMap = parseRawMap(rawWaterToLightMap);
  const lightToTemperatureMap = parseRawMap(rawLightToTemperatureMap);
  const temperatureToHumidityMap = parseRawMap(rawTemperatureToHumidityMap);
  const humidityToLocationMap = parseRawMap(rawHumidityToLocationMap);

  return {
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  }
}

/**
 * Parses an array of raw map values, where each element contains 3 values
 * that correspond to the maps source, destination, and range
 */
function parseRawMap(input: string[]) {
  const map: SourceToDestinationMap[] = input.map(i => {
    const values = i.split(/\s+/).map(v => parseInt(v));
    return {
      source: values[1],
      destination: values[0],
      range: values[2]
    }
  })
  return map;
}

/**
 * Parses the raw input for each map by the header provided
 */
function parseRawMapByHeader(input: string[], mapHeader: string) {
  const headerIndex = input.indexOf(mapHeader);
  let i = headerIndex;
  let endOfMapIndex = input.length;
  let foundEndOfMap = false;
  while (i < input.length && !foundEndOfMap) {
    if (input[i] === '') {
      endOfMapIndex = i;
      foundEndOfMap = true;
    }
    i += 1;
  }
  return input.slice(headerIndex + 1, endOfMapIndex);
}

function solveOne(input: string[]) {
  const seeds = input[0].split(":")[1].trim().split(/\s+/).map(i => parseInt(i.trim()));
  
  const maps = parseAllMaps(input);

  const locations = []; 
  for (const seed of seeds) {
    // Find the mapping of each seed
    const soil = getMapping(seed, maps.seedToSoilMap);
    const fertilizer = getMapping(soil, maps.soilToFertilizerMap);
    const water = getMapping(fertilizer, maps.fertilizerToWaterMap);
    const light = getMapping(water, maps.waterToLightMap);
    const temperature = getMapping(light, maps.lightToTemperatureMap);
    const humidity = getMapping(temperature, maps.temperatureToHumidityMap);
    const location = getMapping(humidity, maps.humidityToLocationMap);
    console.log(seed, soil, fertilizer, water, light, temperature, humidity, location);
    locations.push(location);
  }

  console.log("Seeds:", seeds);
  console.log("Locations:", locations);
  const minimum = locations.reduce((prev, curr) => curr < prev ? curr : prev, locations[0]);
  console.log("Minimum:", minimum)
}

function solveTwo(input: string[]) {
  // Grab the seed input at the top of the input file
  const seedInputs = input[0].split(":")[1].trim().split(/\s+/).map(i => parseInt(i.trim()));
  if (seedInputs.length % 2 !== 0) { 
    console.log("Not an even number of seed inputs");
  }

  // Grab each pair of numbers as the seed and the range for those seeds
  const seedPairs = [];
  for (let i = 0; (i + 1) < seedInputs.length; i += 2) {
    seedPairs.push([seedInputs[i], seedInputs[i + 1]]);
  }

  const maps = parseAllMaps(input);

  // const seeds = [];
  let minLocation = undefined;
  let tracker = 0;
  for (const seedPair of seedPairs) {
    console.log(`${tracker}/${seedPairs.length}`);
    tracker += 1;
    const [seed, range] = seedPair;
    
    for (let i = 0; i < range; i += 1) {
      // Find the mapping of each seed
      const soil = getMapping(seed + i, maps.seedToSoilMap);
      const fertilizer = getMapping(soil, maps.soilToFertilizerMap);
      const water = getMapping(fertilizer, maps.fertilizerToWaterMap);
      const light = getMapping(water, maps.waterToLightMap);
      const temperature = getMapping(light, maps.lightToTemperatureMap);
      const humidity = getMapping(temperature, maps.temperatureToHumidityMap);
      const location = getMapping(humidity, maps.humidityToLocationMap);
      // console.log(seed, soil, fertilizer, water, light, temperature, humidity, location);
      // seeds.push(seed + i);
      if (minLocation === undefined || location < minLocation) {
        minLocation = location;
      }
    }
  }
  console.log("Minimum:", minLocation);

  // console.log("Seeds:", seeds);
  // console.log("Locations:", locations);
  // const minimum = locations.reduce((prev, curr) => curr < prev ? curr : prev, locations[0]);
  // console.log("Minimum:", minimum)
}

export default class Day_5 extends Day {
  /**
   * The first part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  one = (input: string[]): number => {
    // solve the problem
    input = input.map(i => i.trim());
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
    console.time("two");
    input = input.map(i => i.trim());
    solveTwo(input);
    console.timeEnd("two");
    // return your answer
    return -1;
  };
}


