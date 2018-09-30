import React, { Component } from 'react';

import StartFrame from './StartFrame';
import GameFrame from './GameFrame';
import HowToPlay from './HowToPlay';
import TimerFrame from './TimerFrame';
import possibleCombinationSum from '../helpers/possibleCombinationSum';

/**
 * Game component
 *
 * @class Game
 *
 * @extends {Component}
 */
class Game extends Component {
  /**
   * Generate a random number between 1 and 9 inclusive
   *
   * @returns {number} Random number
   *
   * @static
   *
   * @memberof Game
   */
  static randomNumber = () => 1 + Math.floor(Math.random() * 9)

  /**
   * Create initial state of the game
   *
   * @returns {object} Initial state
   *
   * @static
   *
   * @memberof Game
   */
  static initialState = () => ({
    selectedNumbers: [],
    usedNumbers: [],
    numberOfStars: Game.randomNumber(),
    isAnswerCorrect: null,
    redraws: 5,
    doneStatus: null,
    isFirstGame: true,
    timeSpent: 1,
    countdownRunning: false,
    minutes: 1,
    seconds: 0,
    customTime: false,
  })

  state = Game.initialState();

  /**
   * Handle starting the game
   *
   * @returns {undefined} Change state
   *
   * @memberof Game
   */
  handleStartGame = () => {
    this.startCountdown();
    this.setState({
      isFirstGame: false,
      numberOfStars: Game.randomNumber(),
    });
  }

  /**
   * Handle reset application state
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleResetGame = () => this.setState((prevState) => {
    const { customTime } = prevState;

    if (customTime) {
      return {
        ...Game.initialState(),
        isFirstGame: false,
        countdownRunning: true,
        minutes: prevState.minutes,
        seconds: prevState.seconds,
      };
    }
    return {
      ...Game.initialState(),
      isFirstGame: false,
      countdownRunning: true,
    };
  }, this.startCountdown);

  /**
   * Handle select number event
   *
   * @param {number} clickedNumber - Number selected
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleSelectNumber = (clickedNumber) => {
    const { selectedNumbers, usedNumbers } = this.state;
    if (!selectedNumbers.includes(clickedNumber)
        && !usedNumbers.includes(clickedNumber)) {
      this.setState(prevState => ({
        selectedNumbers: [...prevState.selectedNumbers, clickedNumber],
        isAnswerCorrect: null,
      }));
    }
  }

  /**
   * Handle unselecting a number event
   *
   * @param {number} clickedNumber - Number selected
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleUnselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => (
        number !== clickedNumber
      )),
      isAnswerCorrect: null,
    }));
  }

  /**
   * Handle checking answer after selecting numbers
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleCheckAnswer = () => {
    this.setState(prevState => ({
      isAnswerCorrect: prevState.numberOfStars === prevState.selectedNumbers
        .reduce((sum, number) => sum + number, 0)
    }));
  }

  /**
   * Handle accepting user answer after selecting number
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleAcceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: [...prevState.usedNumbers, ...prevState.selectedNumbers],
      selectedNumbers: [],
      isAnswerCorrect: null,
      numberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  }

  /**
   * Handle redraw event
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleRedraw = () => {
    const { redraws } = this.state;
    if (!redraws <= 0) {
      this.setState(prevState => ({
        redraws: prevState.redraws - 1,
        selectedNumbers: [],
        isAnswerCorrect: null,
        numberOfStars: Game.randomNumber(),
        countdownRunning: true,
      }), this.updateDoneStatus);
    }
  }

  /**
   * Checks if possible answer exist
   *
   * @returns {boolean} True or false
   *
   * @memberof Game
   */
  possibleSolutions = ({ usedNumbers, numberOfStars }) => {
    const possibleNumbers = Array.from({ length: 9 }, (_, index) => index + 1)
      .filter(number => !usedNumbers.includes(number));

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  /**
   * Update the status of the game for win or lose
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  updateDoneStatus = () => {
    this.setState((prevState) => {
      if (prevState.usedNumbers.length === 9) {
        return {
          doneStatus: 'Done, Nice!',
          countdownRunning: false,
        };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return {
          doneStatus: 'Game Over!',
          countdownRunning: false,
        };
      }
      if (!prevState.countdownRunning) {
        return {
          doneStatus: 'Time Up!',
        };
      }
    });
  }

  /**
   * Start the countdown timer when game starts
   *
   * @returns {undefined} Start countdown
   *
   * @memberof Game
   */
  startCountdown = () => {
    clearInterval(this.countdown);
    const { minutes, seconds } = this.state;
    const countdownTime = (minutes * 60) + seconds;
    this.countdown = setInterval(() => {
      this.calculateTimeRemaining(countdownTime);
    }, 1000);
  }

  /**
   * Calculate remaining time
   *
   * @param {number} countdownTime - Set time to countdown
   *
   * @returns {undefined} Change state to reflect new time
   *
   * @memberof Game
   */
  calculateTimeRemaining = (countdownTime) => {
    const { timeSpent, doneStatus } = this.state;
    const timeRemaining = countdownTime - timeSpent;

    if (!doneStatus && timeRemaining >= 0) {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining - (minutes * 60);

      this.setState(prevState => ({
        minutes,
        seconds,
        countdownRunning: true,
        timeSpent: prevState.timeSpent + 1,
      }));
    } else {
      this.stopCountdown();
      this.updateDoneStatus();
    }
  };

  /**
   * Stop count down
   *
   * @returns {undefined} Cancel setInterval action
   *
   * @memberof Game
   */
  stopCountdown = () => {
    this.setState({
      countdownRunning: false
    });
    clearInterval(this.countdown);
  }

  /**
   * Handle setting countdown time
   *
   * @param {object} event - Event object
   *
   * @returns {undefined} Change state
   *
   * @memberof Game
   */
  handleChangeTime = (event) => {
    const { currentTarget: { name } } = event;
    const { minutes, seconds } = this.state;
    const time = (minutes * 60) + seconds;
    let newCountdownTime;

    if (name === 'increase') {
      newCountdownTime = time + 1;
    } else if (name === 'decrease') {
      newCountdownTime = time <= 0 ? time : time - 1;
    }

    const newMinutes = Math.floor(newCountdownTime / 60);
    const newSeconds = newCountdownTime - (newMinutes * 60);
    this.setState({
      minutes: newMinutes,
      seconds: newSeconds,
      customTime: true,
    });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof Game
   */
  render() {
    const {
      isFirstGame,
      minutes,
      seconds,
      countdownRunning
    } = this.state;

    return (
      <div className="container">
        <div className="row header">
          <h2 className="col-8 col-md-9 logo">Play Nine</h2>
          <TimerFrame
            minutes={minutes}
            seconds={seconds}
            countdownRunning={countdownRunning}
            handleChangeTime={this.handleChangeTime}
          />
        </div>
        <hr />
        <GameFrame
          handleCheckAnswer={this.handleCheckAnswer}
          handleAcceptAnswer={this.handleAcceptAnswer}
          handleRedraw={this.handleRedraw}
          handleUnselectNumber={this.handleUnselectNumber}
          handleResetGame={this.handleResetGame}
          handleSelectNumber={this.handleSelectNumber}
          {...this.state}
        />
        {isFirstGame && <StartFrame handleStartGame={this.handleStartGame} />}
        <HowToPlay />
      </div>
    );
  }
}

export default Game;
