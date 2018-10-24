import React from 'react';
import TestRenderer from 'react-test-renderer';

import HowToPlay from '../../components/HowToPlay';

describe('How to play component', () => {
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<HowToPlay />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
