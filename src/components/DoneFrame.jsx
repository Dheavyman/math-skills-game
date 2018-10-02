import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  doneStatus: PropTypes.string,
  handleResetGame: PropTypes.func.isRequired,
};

const defaultProps = {
  doneStatus: null,
};

/**
 * Done frame component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const DoneFrame = (props) => {
  const { doneStatus, handleResetGame } = props;

  return (
    <div className="text-center">
      <h2>{doneStatus}</h2>
      <br />
      <button
        type="button"
        className="btn btn-info"
        onClick={handleResetGame}
      >
        Play Again
      </button>
    </div>
  );
};

DoneFrame.propTypes = propTypes;
DoneFrame.defaultProps = defaultProps;

export default DoneFrame;
