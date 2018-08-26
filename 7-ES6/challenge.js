/*
TASK:
In a town with 3 parks and 4 streets, produce an end-of-year report to the mayor covering:

1. Tree density of each park in the town (#trees / park area)

2. Average age of each park

3. The name of the park with over 1000 visitors

4. Total and average length of the town's streets

5. Size classification of all streets: tiny/small/normal/big/huge. Default normal
*/

const Utils = (function() {

  // round a number to a given number of decimal places
  function round(num, dp) {
    return Math.round(num * Math.pow(10, dp)) / Math.pow(10, dp);
  }

  // sum contents of an array
  function sumArr(arr) {
    return arr.reduce((prev, cur) => prev + cur, 0);
  }

  // calculate the mean average of an array
  function calcAvg(arr) {
    return round(sumArr(arr) / arr.length, 1);
  }

  return {
    round : round,
    sumArr: sumArr,
    calcAvg : calcAvg
  }
})();

// parent class of park and street
class TownFeature {
  constructor(
    name,
    buildYear
  ) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends TownFeature {
  constructor(
    name,
    buildYear,
    area, // hectacres
    numTrees
  ) {
    super(name, buildYear);
    this.area = area;
    this.numTrees = numTrees;
  }

  // return average num. trees per hectare
  treeDensity() {
    return Math.round(10 * this.numTrees / this.area) / 10;
  }
}

class Street extends TownFeature {
  constructor(
    name,
    buildYear,
    length, // meters
    size = 3
  ) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  // map size category to its meaning
  classify() {
    const classifier = new Map([
      [1, 'tiny'],
      [2, 'small'],
      [3, 'normal'],
      [4, 'big'],
      [5, 'huge']
    ]);
    return (classifier.get(this.size));
  }
}

const Reporter = (function() {

  function getThousandTreePark(arr) {
    return arr.find(park => park.numTrees > 1000).name;
  }

  function averageParkAge(parks) {
    const parkAges = parks.map(park =>
      new Date().getFullYear() - park.buildYear
    );
    return Utils.calcAvg(parkAges);
  }

  function streetLengthStatistics(streets) {
    const streetLengths = streets.map(street =>
      street.length
    );
    return [
      Utils.calcAvg(streetLengths),
      Utils.sumArr(streetLengths)
    ];
  }

  return {
    report : function(parks, streets) {

      const [ streetLengthAvg, streetLengthSum ] = streetLengthStatistics(streets);

      console.log(`---PARKS REPORT---`);
      console.log(`Our ${parks.length} parks have an average age of ${averageParkAge(parks)} years.`);
      for (let park of parks) {
        console.log(`${park.name} has a tree density of ${park.treeDensity()} trees per hectare`);
      }
      console.log(`${getThousandTreePark(parks)} has more than 1000 trees`);

      console.log(`---STREETS REPORT---`);
      console.log(`Our ${streets.length} streets have a total length of ${streetLengthSum} meters,`
          +` with an average of ${streetLengthAvg} meters.`);
      for (let street of streets) {
        console.log(`${street.name}, built in ${street.buildYear}, is a ${street.classify()} street`);
      }
    }
  }
})();


// report scenario:

let parks = [
  new Park('Regent\'s Park', 1835, 166, 1001),
  new Park('Hyde Park', 1536, 142, 800),
  new Park('St James\'s Park', 1603, 23, 100)
];

let streets = [
  new Street('Downing Street', 1680, 217, 1),
  new Street('Oxford Street', 1782, 1900, 5),
  new Street('Bond Street', 1686, 800),
  new Street('Abbey Road', 1669, 1400, 4)
];

Reporter.report(parks,streets);
