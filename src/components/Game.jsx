import React, { Component } from 'react';

import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';
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
  })

  state = Game.initialState();

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
    }), this.handleUpdateDoneStatus);
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
      }), this.handleUpdateDoneStatus);
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
   * Handle updating the status of the game for win or lose
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleUpdateDoneStatus = () => {
    this.setState((prevState) => {
      if (prevState.usedNumbers.length === 9) {
        return {
          doneStatus: 'Done, Nice!'
        };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return {
          doneStatus: 'Game Over!'
        };
      }
    });
  }

  /**
   * Handle reset application state
   *
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleResetGame = () => this.setState(Game.initialState());


  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof Game
   */
  render() {
    const {
      selectedNumbers,
      usedNumbers,
      redraws,
      isAnswerCorrect,
      numberOfStars,
      doneStatus
    } = this.state;
    return (
      <div className="container">
        <h2 className="label">Play Nine</h2>
        <hr />
        <div className="row mt-5">
          <Stars numberOfStars={numberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            isAnswerCorrect={isAnswerCorrect}
            redraws={redraws}
            handleCheckAnswer={this.handleCheckAnswer}
            handleAcceptAnswer={this.handleAcceptAnswer}
            handleRedraw={this.handleRedraw}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            handleUnselectNumber={this.handleUnselectNumber}
          />
        </div>
        <br />
        {doneStatus
          ? (
            <DoneFrame
              doneStatus={doneStatus}
              handleResetGame={this.handleResetGame}
            />
          )
          : (
            <Numbers
              selectedNumbers={selectedNumbers}
              usedNumbers={usedNumbers}
              handleSelectNumber={this.handleSelectNumber}
            />
          )
        }
      </div>
    );
  }
}

export default Game;
