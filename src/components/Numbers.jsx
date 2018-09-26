import React from 'react';

const arrayOfNumbers = Array.from({ length: 9 }, (_, index) => index + 1);

/**
 * Numbers component
 *
 * @returns {object} React element
 */
const Numbers = () => (
  <div className="card text-center mt-5">
    <div className="number">
      {arrayOfNumbers.map((number, index) => (
        <span key={index.toString()}>{number}</span>
      ))}
    </div>
  </div>
);

export default Numbers;
