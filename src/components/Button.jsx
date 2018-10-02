import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  isAnswerCorrect: PropTypes.bool,
  redraws: PropTypes.number.isRequired,
  countdownRunning: PropTypes.bool.isRequired,
  handleCheckAnswer: PropTypes.func.isRequired,
  handleAcceptAnswer: PropTypes.func.isRequired,
  handleRedraw: PropTypes.func.isRequired,
};

const defaultProps = {
  isAnswerCorrect: null,
};

/**
 * Button component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const Button = (props) => {
  const {
    selectedNumbers,
    isAnswerCorrect,
    redraws,
    countdownRunning,
    handleCheckAnswer,
    handleAcceptAnswer,
    handleRedraw,
  } = props;
  let button;

  switch (isAnswerCorrect) {
    case true:
      button = (
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={handleAcceptAnswer}
        >
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button
          type="button"
          className="btn btn-danger btn-lg"
        >
          <i className="fa fa-times" />
        </button>
      );
      break;
    default:
      button = (
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={handleCheckAnswer}
          disabled={!countdownRunning || selectedNumbers.length === 0}
        >
        =
        </button>
      );
  }
  return (
    <div className="col-2 check-btn text-center">
      {button}
      <br />
      <br />
      <button
        type="button"
        className="btn btn-warning btn-sm"
        onClick={handleRedraw}
        disabled={!countdownRunning || redraws <= 0}
      >
        <i className={`fa fa-sync-alt ${redraws > 0 && 'fa-spin'}`} />
        {`  ${redraws}`}
      </button>
    </div>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
