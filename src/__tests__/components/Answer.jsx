import React from 'react';
import TestRenderer from 'react-test-renderer';

import Answer from '../../components/Answer';

describe('Answer component', () => {
  const props = {
    selectedNumbers: [2, 7, 9],
    handleUnselectNumber: jest.fn()
  };

  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<Answer {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it(`should call handle unselect number when a selected number is
    clicked`, () => {
    const renderer = TestRenderer.create(<Answer {...props} />);
    renderer.root.findAllByType('span')[0].props.onClick();
    renderer.root.findAllByType('span')[2].props.onKeyUp({ key: 'Enter' });
    expect(props.handleUnselectNumber).toHaveBeenCalledWith(2);
    expect(props.handleUnselectNumber).toHaveBeenLastCalledWith(9);
  });
});
