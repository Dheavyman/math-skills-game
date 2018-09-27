import React, { Component } from 'react';

import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';

/**
 * Game component
 *
 * @class Game
 * @extends {Component}
 */
class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9)
  };

  /**
   * Handle select number event
   *
   * @param {number} clickedNumber - Number selected
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleSelectNumber = (clickedNumber) => {
    const { selectedNumbers } = this.state;
    if (!selectedNumbers.includes(clickedNumber)) {
      this.setState(prevState => ({
        selectedNumbers: [...prevState.selectedNumbers, clickedNumber]
      }));
    }
  }

  /**
   * Handle unselecting a number event
   *
   * @param {number} clickedNumber - Number selected
   * @returns {object} New state
   *
   * @memberof Game
   */
  handleUnselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => (
        number !== clickedNumber
      ))
    }));
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof Game
   */
  render() {
    const { selectedNumbers, numberOfStars } = this.state;
    return (
      <div className="container">
        <h2 className="label">Play Nine</h2>
        <hr />
        <div className="row mt-5">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer
            selectedNumbers={selectedNumbers}
            handleUnselectNumber={this.handleUnselectNumber}
          />
        </div>
        <br />
        <Numbers
          selectedNumbers={selectedNumbers}
          handleSelectNumber={this.handleSelectNumber}
        />
      </div>
    );
  }
}

export default Game;
