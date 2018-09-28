import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  usedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleSelectNumber: PropTypes.func.isRequired
};

const arrayOfNumbers = Array.from({ length: 9 }, (_, index) => index + 1);

/**
 * Numbers component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const Numbers = (props) => {
  const { selectedNumbers, usedNumbers, handleSelectNumber } = props;

  /**
   * Add class name to change the color of each number when selected
   *
   * @param {*} number - Number selected
   *
   * @returns {string} Selected or empty string
   */
  const numberClassName = (number) => {
    if (selectedNumbers.includes(number)) {
      return 'selected';
    }
    if (usedNumbers.includes(number)) {
      return 'used';
    }
  };

  /**
   * Handle unselecting a number with enter key
   *
   * @param {object} event - Event object
   * @param {object} number - Number to unselect
   *
   * @returns {object} Unselects the number if enter key is pressed
   */
  const handleKeyUP = (event, number) => {
    if (event.key === 'Enter') {
      handleSelectNumber(number);
    }
  };
  return (
    <div className="card border-primary text-center mt-5">
      <div className="number">
        {arrayOfNumbers.map((number, index) => (
          <span
            role="button"
            tabIndex="0"
            key={index.toString()}
            className={numberClassName(number)}
            onClick={() => handleSelectNumber(number)}
            onKeyUp={event => handleKeyUP(event, number)}
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
