import possibleCombinationSum from '../../helpers/possibleCombinationSum';

describe('Possible combination sum function', () => {
  let arrayOfNumbers;
  let number;
  beforeEach(() => {
    arrayOfNumbers = [];
  });
  it(`should return true when there is still a possible combination of numbers
    in the array to sum up to the number`, () => {
    arrayOfNumbers = [1, 3, 4, 5];
    number = 4;

    expect(possibleCombinationSum(arrayOfNumbers, number)).toBe(true);

    arrayOfNumbers = [2, 3, 6, 8];
    number = 5;

    expect(possibleCombinationSum(arrayOfNumbers, number)).toBe(true);
  });

  it(`should return false when there is no possible combination of numbers in
    the array to sum up to the number`, () => {
    arrayOfNumbers = [3, 4, 5];
    number = 1;

    expect(possibleCombinationSum(arrayOfNumbers, number)).toBe(false);

    arrayOfNumbers = [2, 3, 6, 8];
    number = 7;

    expect(possibleCombinationSum(arrayOfNumbers, number)).toBe(false);
  });
});
