import React from 'react';
import TestRenderer from 'react-test-renderer';

import Button from '../../components/Button';

describe('Button component', () => {
  let props;

  beforeEach(() => {
    props = {
      selectedNumbers: [],
      isAnswerCorrect: null,
      redraws: 5,
      countdownRunning: false,
      handleCheckAnswer: jest.fn(),
      handleAcceptAnswer: jest.fn(),
      handleRedraw: jest.fn()
    };
  });

  it('should render the component with default button successfully', () => {
    const renderer = TestRenderer.create(<Button {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it(`should render the default button when no number has been selected and the
    countdown is running`, () => {
    props = {
      ...props,
      countdownRunning: true
    };
    const renderer = TestRenderer.create(<Button {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render the component with check button when answer is correct',
    () => {
      props = {
        ...props,
        isAnswerCorrect: true,
        countdownRunning: true
      };
      const renderer = TestRenderer.create(<Button {...props} />);

      expect(renderer.toJSON()).toMatchSnapshot();
    });

  it('should render the component with x(fa-times) button when answer is wrong',
    () => {
      props = {
        ...props,
        isAnswerCorrect: false,
        countdownRunning: true
      };
      const renderer = TestRenderer.create(<Button {...props} />);

      expect(renderer.toJSON()).toMatchSnapshot();
    });

  it('should call handleCheckAnswer handler when default button is clicked',
    () => {
      props = {
        ...props,
        isAnswerCorrect: null,
        countdownRunning: true,
        selectedNumbers: [5, 2]
      };
      const renderer = TestRenderer.create(<Button {...props} />);

      renderer.root.findAllByType('button')[0].props.onClick();
      expect(props.handleCheckAnswer).toHaveBeenCalled();
    });

  it('should call handleAcceptAnswer handler when check button is clicked',
    () => {
      props = {
        ...props,
        isAnswerCorrect: true,
        countdownRunning: true,
        selectedNumbers: [5, 2]
      };
      const renderer = TestRenderer.create(<Button {...props} />);

      renderer.root.findAllByType('button')[0].props.onClick();
      expect(props.handleAcceptAnswer).toHaveBeenCalled();
    });

  it('should call handleRedraws handler when redraw button is clicked',
    () => {
      props = {
        ...props,
        countdownRunning: true,
      };
      const renderer = TestRenderer.create(<Button {...props} />);

      renderer.root.findAllByType('button')[1].props.onClick();
      expect(props.handleRedraw).toHaveBeenCalled();
    });
});
