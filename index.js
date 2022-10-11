// start with a random 4 digit number, only requirement they are not all the same number i.e. 1111
// use a function to arrange that number in both ascending and descending order
// then subtract ascending from descending
// terminate on repeated number, likely 6174 but that is what we are testing
const { quickSort } = require('./utils');

const newNum = function () {
  let startNum = Math.floor(Math.random() * (9999 - 1000) + 1000);

  if (validNum(startNum)){
    return startNum;
  }
  else {
    return newNum();
  }
};

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

const main = function () {
  let previousNum;
  let currentNum = newNum();
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
      // console.log(start, end);
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

console.log(bigTest());
