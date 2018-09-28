import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleUnselectNumber: PropTypes.func.isRequired
};

/**
 * Answer component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const Answer = (props) => {
  const { selectedNumbers, handleUnselectNumber } = props;

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
      handleUnselectNumber(number);
    }
  };

  return (
    <div className="col-5">
      <div className="number">
        {selectedNumbers.map((number, index) => (
          <span
            role="button"
            tabIndex="0"
            className="answer"
            key={index.toString()}
            onClick={() => handleUnselectNumber(number)}
            onKeyUp={event => handleKeyUP(event, number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

Answer.propTypes = propTypes;

export default Answer;
