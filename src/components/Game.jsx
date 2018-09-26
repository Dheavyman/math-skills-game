import React from 'react';

import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';

/**
 * Game component
 *
 * @returns {object} React element
 */
const Game = () => (
  <div className="container">
    <h2 className="label">Play Nine</h2>
    <hr />
    <div className="row mt-5">
      <Stars />
      <Button />
      <Answer />
    </div>
    <br />
    <Numbers />
  </div>
);

export default Game;
