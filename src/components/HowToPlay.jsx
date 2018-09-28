import React from 'react';

/**
 * How to play component
 * Display information on how to play the game
 *
 * @returns {object} React element
 */
const HowToPlay = () => (
  <div className="card border-dark mt-5 how-to-play">
    <h4 className="card-header">How to play</h4>
    <div className="card-body">
      <ol className="text-justify">
        <li className="card-text">
          Select one or more numbers from the numbers frame that will sum up to
          the value of the random stars.
        </li>
        <li className="card-text">
          Click on the
          <mark>  =  </mark>
          button to check your answer. If the answer is wrong, you can
          withdraw your answers by clicking on them or select new numbers from
          the numbers frame. If the answer is correct, the button will display
          a check mark. Click on the check button to accept the answer and go
          to next round.
        </li>
        <li className="card-text">
          If there is no number or possible combinations of numbers that sum up
          to the random number of stars, you can click on the redraw button to
          choose another random number of stars.
          <strong> Note: You have only 5 redraws for each game session</strong>
        </li>
        <li className="card-text">
          Repeat steps 1 to 3 until you have selected all the numbers from the
          numbers frame. You win the game when you successfully use all the
          numbers and you lose the game when you have numbers left unused after
          exhausting the redraws.
        </li>
        <li className="card-text">
          When the game ends, either win or lose, click on the try again button
          to start a new game session.
          <span className="text-info"> Have fun!</span>
        </li>
      </ol>
    </div>
  </div>
);

export default HowToPlay;
