import React from 'react';
import TestRenderer from 'react-test-renderer';

import Numbers from '../../components/Numbers';

describe('Numbers component', () => {
  let props = {
    selectedNumbers: [],
    usedNumbers: [],
    handleSelectNumber: jest.fn()
  };

  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<Numbers {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handle submit function when the numbers are clicked', () => {
    const renderer = TestRenderer.create(<Numbers {...props} />);

    renderer.root.findAllByType('span')[1].props.onClick();
    renderer.root.findAllByType('span')[5].props.onKeyUp({ key: 'Enter' });
    expect(props.handleSelectNumber).toHaveBeenCalledWith(2);
    expect(props.handleSelectNumber).toHaveBeenLastCalledWith(6);
  });

  it('should add class name "selected" to selected numbers', () => {
    props = {
      ...props,
      selectedNumbers: [
        ...props.selectedNumbers, 6
      ]
    };
    const renderer = TestRenderer.create(<Numbers {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should add class name "used" to used numbers', () => {
    props = {
      ...props,
      usedNumbers: [
        ...props.usedNumbers, 9, 4
      ]
    };
    const renderer = TestRenderer.create(<Numbers {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
