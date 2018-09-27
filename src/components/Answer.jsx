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
  return (
    <div className="col-5">
      <div className="number">
        {selectedNumbers.map((number, index) => (
          <span
            role="button"
            tabIndex="0"
            key={index.toString()}
            onClick={() => handleUnselectNumber(number)}
            onKeyUp={() => {}}
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
