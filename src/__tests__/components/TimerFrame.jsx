import React from 'react';
import TestRenderer from 'react-test-renderer';

import TimerFrame, { formatTime } from '../../components/TimerFrame';

describe('Timer frame component', () => {
  const props = {
    minutes: 2,
    seconds: 8,
    countdownRunning: false,
    handleChangeTime: jest.fn()
  };

  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<TimerFrame {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

describe('Format time function', () => {
  it(`should add leading zero to number less that 10 and return the string
    equivalent`, () => {
    const formattedTime = formatTime(5);

    expect(formattedTime).toEqual('05');
  });
  it('should return the string equivalent of numbers greater than 10', () => {
    const formattedTime = formatTime(28);

    expect(formattedTime).toEqual('28');
  });
});
