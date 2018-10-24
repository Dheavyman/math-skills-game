import React from 'react';
import TestRenderer from 'react-test-renderer';

import Game from '../../components/Game';

jest.useFakeTimers();

describe('Game component', () => {
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<Game />);

    expect(renderer.toJSON()).toBeDefined();
  });

  it(`should start the game with the set time when the start game button is
    clicked`, () => {
    const renderer = TestRenderer.create(<Game />);
    const handleStartGameSpy = jest.spyOn(renderer.getInstance(),
      'handleStartGame');
    const startCountdownSpy = jest.spyOn(renderer.getInstance(),
      'startCountdown');
    renderer.update(<Game />);

    expect(renderer.root.instance.state.isFirstGame).toBe(true);

    renderer.root.findByProps({ children: 'Start Game' }).props.onClick();

    expect(handleStartGameSpy).toHaveBeenCalled();
    expect(startCountdownSpy).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalled();
    expect(renderer.root.instance.state.isFirstGame).toBe(false);
  });

  it('should select a number when the handle select number is called', () => {
    const renderer = TestRenderer.create(<Game />);
    const handleSelectNumberSpy = jest.spyOn(renderer.getInstance(),
      'handleSelectNumber');

    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);

    renderer.root.instance.state.isFirstGame = false;
    renderer.getInstance().handleSelectNumber(5);

    expect(handleSelectNumberSpy).toHaveBeenCalledWith(5);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([5]);
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(null);
  });

  it('should not select a number after it has been already selected', () => {
    const renderer = TestRenderer.create(<Game />);
    const handleSelectNumberSpy = jest.spyOn(renderer.getInstance(),
      'handleSelectNumber');

    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);

    renderer.root.instance.state.isFirstGame = false;
    renderer.getInstance().handleSelectNumber(3);

    expect(handleSelectNumberSpy).toHaveBeenCalledWith(3);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([3]);

    renderer.getInstance().handleSelectNumber(3);

    expect(handleSelectNumberSpy).toHaveBeenCalledWith(3);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([3]);

    renderer.getInstance().handleSelectNumber(1);

    expect(handleSelectNumberSpy).toHaveBeenCalledWith(1);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([3, 1]);
  });

  it('should not select a number in used numbers array', () => {
    const renderer = TestRenderer.create(<Game />);
    const handleSelectNumberSpy = jest.spyOn(renderer.getInstance(),
      'handleSelectNumber');

    renderer.root.instance.state.isFirstGame = false;
    renderer.root.instance.state.usedNumbers = [2, 8, 5];

    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);
    renderer.getInstance().handleSelectNumber(8);

    expect(handleSelectNumberSpy).toHaveBeenCalledWith(8);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);
    expect(renderer.root.instance.state.selectedNumbers).not.toEqual(
      [8]
    );
  });

  it('should unselect a number when handleUnselectNumber is called', () => {
    const renderer = TestRenderer.create(<Game />);
    const handleUnselectNumberSpy = jest.spyOn(renderer.getInstance(),
      'handleUnselectNumber');

    renderer.root.instance.state.isFirstGame = false;
    renderer.root.instance.state.selectedNumbers = [2, 7];
    renderer.getInstance().handleUnselectNumber(7);

    expect(handleUnselectNumberSpy).toHaveBeenCalledWith(7);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([2]);
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(null);
  });

  it(`should check if selected number(s) is/are correct when handle check
    answer is called`, () => {
    const renderer = TestRenderer.create(<Game />);
    const handleCheckAnswerSpy = jest.spyOn(renderer.getInstance(),
      'handleCheckAnswer');

    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(null);

    renderer.root.instance.state.isFirstGame = false;
    renderer.root.instance.state.numberOfStars = 8;
    renderer.root.instance.state.selectedNumbers = [8];
    renderer.getInstance().handleCheckAnswer();

    expect(handleCheckAnswerSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(true);

    renderer.root.instance.state.numberOfStars = 2;
    renderer.root.instance.state.selectedNumbers = [3];
    renderer.getInstance().handleCheckAnswer();

    expect(handleCheckAnswerSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(false);
  });

  it('should accept correct answer after selection', () => {
    const renderer = TestRenderer.create(<Game />);
    const handleAcceptAnswerSpy = jest.spyOn(renderer.getInstance(),
      'handleAcceptAnswer');
    const updateDoneStatusSpy = jest.spyOn(renderer.getInstance(),
      'updateDoneStatus');

    expect(renderer.root.instance.state.usedNumbers).toEqual([]);
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(null);

    renderer.root.instance.state.isFirstGame = false;
    renderer.root.instance.state.numberOfStars = 7;
    renderer.root.instance.state.selectedNumbers = [7];
    renderer.root.instance.state.isAnswerCorrect = true;
    renderer.getInstance().handleAcceptAnswer();

    expect(handleAcceptAnswerSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.usedNumbers).toEqual([7]);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(null);
    expect(updateDoneStatusSpy).toHaveBeenCalled();
  });

  it('should display new random stars when handleRedraw is called', () => {
    const renderer = TestRenderer.create(<Game />);
    const handleRedrawSpy = jest.spyOn(renderer.getInstance(), 'handleRedraw');

    renderer.root.instance.state.isFirstGame = false;
    renderer.root.instance.state.redraws = 5;

    renderer.getInstance().handleRedraw();

    expect(handleRedrawSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.redraws).toEqual(4);
    expect(renderer.root.instance.state.selectedNumbers).toEqual([]);
    expect(renderer.root.instance.state.isAnswerCorrect).toEqual(null);
    expect(renderer.root.instance.state.countdownRunning).toEqual(true);
  });

  it('should increase or decrease the time when handleChangeTime is called',
    () => {
      const renderer = TestRenderer.create(<Game />);
      const handleChangeTimeSpy = jest.spyOn(renderer.getInstance(),
        'handleChangeTime');

      renderer.root.instance.state.isFirstGame = false;
      renderer.root.instance.state.minutes = 1;
      renderer.root.instance.state.seconds = 59;

      expect(renderer.root.instance.state.customTime).toEqual(false);

      renderer.getInstance().handleChangeTime({
        currentTarget: { name: 'increase' }
      });

      expect(handleChangeTimeSpy).toHaveBeenCalled();
      expect(renderer.root.instance.state.minutes).toEqual(2);
      expect(renderer.root.instance.state.seconds).toEqual(0);
      expect(renderer.root.instance.state.customTime).toEqual(true);

      renderer.getInstance().handleChangeTime({
        currentTarget: { name: 'decrease' }
      });

      expect(renderer.root.instance.state.minutes).toEqual(1);
      expect(renderer.root.instance.state.seconds).toEqual(59);
      expect(renderer.root.instance.state.customTime).toEqual(true);

      // The timer setting should not go below 0
      renderer.root.instance.state.minutes = 0;
      renderer.root.instance.state.seconds = 0;

      renderer.getInstance().handleChangeTime({
        currentTarget: { name: 'decrease' }
      });

      expect(renderer.root.instance.state.minutes).toEqual(0);
      expect(renderer.root.instance.state.seconds).toEqual(0);
      expect(renderer.root.instance.state.customTime).toEqual(true);
    });

  it(`should reset the game after each game session when handleReset game is
    called`, () => {
    const renderer = TestRenderer.create(<Game />);
    const handleResetGameSpy = jest.spyOn(renderer.getInstance(),
      'handleResetGame');
    const startCountdownSpy = jest.spyOn(renderer.getInstance(),
      'startCountdown');
    renderer.update(<Game />);

    renderer.root.instance.state.isFirstGame = false;
    renderer.root.instance.state.countdownRunning = false;
    renderer.getInstance().handleResetGame();

    expect(handleResetGameSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.countdownRunning).toEqual(true);
    expect(startCountdownSpy).toHaveBeenCalled();

    // A custom time set should be used to start reset the game
    renderer.root.instance.state.countdownRunning = false;
    renderer.root.instance.state.minutes = 0;
    renderer.root.instance.state.seconds = 30;
    renderer.root.instance.state.customTime = true;
    renderer.getInstance().handleResetGame();

    expect(renderer.root.instance.state.countdownRunning).toEqual(true);
    expect(renderer.root.instance.state.minutes).toEqual(0);
    expect(renderer.root.instance.state.seconds).toEqual(30);
  });

  it(`should update done status state to reflect the state of the game when
    updateDoneStatus is called`, () => {
    const renderer = TestRenderer.create(<Game />);
    const updateDoneStatusSpy = jest.spyOn(renderer.getInstance(),
      'updateDoneStatus');

    renderer.root.instance.state.countdownRunning = false;
    renderer.getInstance().updateDoneStatus();

    expect(updateDoneStatusSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.doneStatus).toEqual('Time Up!');

    renderer.root.instance.state.countdownRunning = true;
    renderer.root.instance.state.usedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    renderer.getInstance().updateDoneStatus();

    expect(renderer.root.instance.state.doneStatus).toEqual('Done, Nice!');
    expect(renderer.root.instance.state.countdownRunning).toEqual(false);
    expect(renderer.root.instance.state.customTime).toEqual(false);

    renderer.root.instance.state.countdownRunning = true;
    renderer.root.instance.state.redraws = 0;
    renderer.root.instance.state.usedNumbers = [1];
    renderer.root.instance.state.numberOfStars = 1;
    renderer.getInstance().updateDoneStatus();

    expect(renderer.root.instance.state.doneStatus).toEqual('Game Over!');
    expect(renderer.root.instance.state.countdownRunning).toEqual(false);
    expect(renderer.root.instance.state.customTime).toEqual(false);
  });

  it('should stop countdown timer when stopCountdown is called', () => {
    const renderer = TestRenderer.create(<Game />);
    const stopCountdownSpy = jest.spyOn(renderer.getInstance(),
      'stopCountdown');

    renderer.root.instance.state.countdownRunning = true;
    renderer.getInstance().stopCountdown();

    expect(stopCountdownSpy).toHaveBeenCalled();
    expect(renderer.root.instance.state.countdownRunning).toEqual(false);
    expect(clearInterval).toBeCalled();
  });

  it('should calculate time remaining when calculateTimeRemaining is called',
    () => {
      const renderer = TestRenderer.create(<Game />);
      const calculateTimeRemainingSpy = jest.spyOn(renderer.getInstance(),
        'calculateTimeRemaining');
      const stopCountdownSpy = jest.spyOn(renderer.getInstance(),
        'stopCountdown');
      const updateDoneStatusSpy = jest.spyOn(renderer.getInstance(),
        'updateDoneStatus');

      renderer.root.instance.state.doneStatus = null;
      renderer.root.instance.state.timeSpent = 5;
      renderer.getInstance().calculateTimeRemaining(68);

      expect(calculateTimeRemainingSpy).toHaveBeenCalled();
      expect(renderer.root.instance.state.countdownRunning).toEqual(true);
      expect(renderer.root.instance.state.minutes).toEqual(1);
      expect(renderer.root.instance.state.seconds).toEqual(3);
      expect(renderer.root.instance.state.timeSpent).toEqual(6);

      renderer.root.instance.state.timeSpent = 41;
      renderer.getInstance().calculateTimeRemaining(40);

      expect(stopCountdownSpy).toBeCalled();
      expect(updateDoneStatusSpy).toBeCalled();
    });
});
