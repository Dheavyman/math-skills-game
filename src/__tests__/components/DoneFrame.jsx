import React from 'react';
import TestRenderer from 'react-test-renderer';

import DoneFrame from '../../components/DoneFrame';

describe('Done frame component', () => {
  const props = {
    doneStatus: 'Game Over',
    handleResetGame: jest.fn()
  };
  it('should render component successfully', async () => {
    const renderer = TestRenderer.create(<DoneFrame {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
