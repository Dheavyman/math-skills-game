import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleSelectNumber: PropTypes.func.isRequired
};

const arrayOfNumbers = Array.from({ length: 9 }, (_, index) => index + 1);

/**
 * Numbers component
 *
 * @param {object} props - Properties passed to component
 * @returns {object} React element
 */
const Numbers = (props) => {
  const { selectedNumbers, handleSelectNumber } = props;

  /**
   * Add class name to change the color of each number when selected
   *
   * @param {*} number - Number selected
   * @returns {string} Selected or empty string
   */
  const numberClassName = number => (
    selectedNumbers.includes(number) ? 'selected' : ''
  );
  return (
    <div className="card text-center mt-5">
      <div className="number">
        {arrayOfNumbers.map((number, index) => (
          <span
            role="button"
            tabIndex="0"
            key={index.toString()}
            className={numberClassName(number)}
            onClick={() => handleSelectNumber(number)}
            onKeyUp={() => {}}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

Numbers.propTypes = propTypes;

export default Numbers;
