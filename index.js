// start with a random 4 digit number, only requirement they are not all the same number i.e. 1111
// use a function to arrange that number in both ascending and descending order
// then subtract ascending from descending
// terminate on repeated number, likely 6174 but that is what we are testing
const { quickSort } = require('./utils');

// first idea get random numbers to test
// realized 9000 numbers is much easier to go through than testing randomly and is more complete
const newNum = function () {
  let startNum = Math.floor(Math.random() * (9999 - 1000) + 1000);

  if (validNum(startNum)){
    return startNum;
  }
  else {
    return newNum();
  }
};

// convert to array, sort array, then create ascending and descending numbers
const orderNums = function (num) {
  const arrNum = String(num)
    .split('')
    .map(str => Number(str));

  let sorted = quickSort(arrNum);
  if (sorted.length === 3){
    sorted.unshift(0);
  };
  let sortedAsc = Number(sorted.join(''));
  let sortedDesc = Number(sorted.reverse().join(''));

  return [ sortedAsc, sortedDesc ]
};

// check to make sure the number does not fall into one of the 9 known failures, 1111, 2222, etc.
const validNum = function (num) {
  const arrNum = String(num)
    .split('')
    .map(str => Number(str));

  if (arrNum[0] === arrNum[1] && arrNum[0] === arrNum[2] && arrNum[0] === arrNum[3]) {
    return false;
  }
  else {
    return true;
  };
};

// get number, iterate through the while loop until the number repeats, return info
const main = function (num) {
  let previousNum;
  let currentNum = num || newNum();
  let startNum = currentNum;
  // starting i at -1 because it checks 6174 once through the while loop before terminating
  let i = -1;

  while (currentNum !== previousNum){
    let [ asc, desc ] = orderNums(currentNum);
    previousNum = currentNum;
    currentNum = desc - asc;
    i++;
  };

  return [startNum, currentNum, i];
};

// not in use, big test for many passes at the random number, fullTest is the better plan
const bigTest = function () {
  const count = {};
  const iterations = {};

  for (let i = 0; i<10**6; i++){
    let [start, end, i] = main();
    let num = end;
    if(i in iterations){
      iterations[i]++;
    } else {
      iterations[i] = 1;
    };
    if (end !== 6174) {
      num = start;
    };
    if(num in count){
      count[num]++;
    } else {
      count[num] = 1;
    };
  };

  return [count, iterations];
};

// run the program for all valid 4-digit values 
const fullTest = function () {
  const count = {};
  const iterationCount = {};

  for (let i = 1000; i<9999; i++){
    if (!validNum(i)) continue;
    let [start, end, iterations] = main(i);
    let num = end;
    if(iterations in iterationCount){
      iterationCount[iterations]++;
    } else {
      iterationCount[iterations] = 1;
    };
    if (end !== 6174) {
      num = start;
    };
    if(num in count){
      count[num]++;
    } else {
      count[num] = 1;
    };
  };

  return [count, iterationCount];
};

console.log(fullTest());
