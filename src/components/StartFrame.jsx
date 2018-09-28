import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleStartGame: PropTypes.func.isRequired,
};

/**
 * Start frame component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const StartFrame = (props) => {
  const { handleStartGame } = props;

  return (
    <div className="row mt-5">
      <div className="col-12 text-center">
        <button
          type="button"
          className="btn btn-lg btn-info"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

StartFrame.propTypes = propTypes;

export default StartFrame;
