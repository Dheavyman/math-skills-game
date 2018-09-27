import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired
};

/**
 * Button component
 *
 * @param {object} props - Properties passed to component
 * @returns {object} React element
 */
const Button = (props) => {
  const { selectedNumbers } = props;
  return (
    <div className="col-2 text-center">
      <button
        type="button"
        className="btn"
        disabled={selectedNumbers.length === 0}
      >
        =
      </button>
    </div>
  );
};

Button.propTypes = propTypes;

export default Button;
