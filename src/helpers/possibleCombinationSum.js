/**
 * Check if the array of numbers has a combination of numbers
 * that sum up to the number argument
 *
 * @param {object} arrayOfNumbers - Array of numbers
 * @param {number} number - Number
 *
 * @returns {boolean} True or false
 */
const possibleCombinationSum = (arrayOfNumbers, number) => {
  if (arrayOfNumbers.indexOf(number) >= 0) { return true; }
  if (arrayOfNumbers[0] > number) { return false; }
  if (arrayOfNumbers[arrayOfNumbers.length - 1] > number) {
    arrayOfNumbers.pop();
    return possibleCombinationSum(arrayOfNumbers, number);
  }

  const listSize = arrayOfNumbers.length;
  const combinationsCount = (1 << listSize);

  for (let i = 1; i < combinationsCount; i += 1) {
    let combinationSum = 0;
    for (let j = 0; j < listSize; j += 1) {
      if (i & (1 << j)) { combinationSum += arrayOfNumbers[j]; }
    }
    if (number === combinationSum) { return true; }
  }
  return false;
};

export default possibleCombinationSum;
