import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';

const propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  usedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  redraws: PropTypes.number.isRequired,
  countdownRunning: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool,
  numberOfStars: PropTypes.number.isRequired,
  doneStatus: PropTypes.string,
  handleCheckAnswer: PropTypes.func.isRequired,
  handleAcceptAnswer: PropTypes.func.isRequired,
  handleRedraw: PropTypes.func.isRequired,
  handleUnselectNumber: PropTypes.func.isRequired,
  handleResetGame: PropTypes.func.isRequired,
  handleSelectNumber: PropTypes.func.isRequired,
};

const defaultProps = {
  isAnswerCorrect: null,
  doneStatus: null,
};

/**
 * Game frame component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const GameFrame = (props) => {
  const {
    selectedNumbers,
    usedNumbers,
    redraws,
    countdownRunning,
    isAnswerCorrect,
    numberOfStars,
    doneStatus,
    handleCheckAnswer,
    handleAcceptAnswer,
    handleRedraw,
    handleUnselectNumber,
    handleResetGame,
    handleSelectNumber
  } = props;

  return (
    <Fragment>
      <div className="row mt-5">
        <Stars numberOfStars={numberOfStars} />
        <Button
          selectedNumbers={selectedNumbers}
          isAnswerCorrect={isAnswerCorrect}
          redraws={redraws}
          countdownRunning={countdownRunning}
          handleCheckAnswer={handleCheckAnswer}
          handleAcceptAnswer={handleAcceptAnswer}
          handleRedraw={handleRedraw}
        />
        <Answer
          selectedNumbers={selectedNumbers}
          handleUnselectNumber={handleUnselectNumber}
        />
      </div>
      <br />
      <br />
      {doneStatus
        ? (
          <DoneFrame
            doneStatus={doneStatus}
            handleResetGame={handleResetGame}
          />
        )
        : (
          <Numbers
            selectedNumbers={selectedNumbers}
            usedNumbers={usedNumbers}
            handleSelectNumber={handleSelectNumber}
          />
        )
      }
    </Fragment>
  );
};

GameFrame.propTypes = propTypes;
GameFrame.defaultProps = defaultProps;

export default GameFrame;
