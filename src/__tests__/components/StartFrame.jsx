import React from 'react';
import TestRenderer from 'react-test-renderer';

import StartFrame from '../../components/StartFrame';

describe('Start frame component', () => {
  const props = {
    handleStartGame: jest.fn()
  };

  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<StartFrame {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
