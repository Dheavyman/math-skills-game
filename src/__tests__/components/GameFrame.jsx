import React from 'react';
import TestRenderer from 'react-test-renderer';

import GameFrame from '../../components/GameFrame';

describe('Game frame component', () => {
  let props = {
    selectedNumbers: [],
    usedNumbers: [],
    redraws: 5,
    countdownRunning: false,
    isAnswerCorrect: null,
    numberOfStars: 3,
    doneStatus: null,
    handleCheckAnswer: jest.fn(),
    handleAcceptAnswer: jest.fn(),
    handleRedraw: jest.fn(),
    handleUnselectNumber: jest.fn(),
    handleResetGame: jest.fn(),
    handleSelectNumber: jest.fn()
  };
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<GameFrame {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component with doneStatus successfully', () => {
    props = {
      ...props,
      doneStatus: 'Done, Nice!'
    };
    const renderer = TestRenderer.create(<GameFrame {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
