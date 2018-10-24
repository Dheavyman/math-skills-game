import React from 'react';
import TestRenderer from 'react-test-renderer';

import Stars from '../../components/Stars';

describe('Stars component', () => {
  const props = {
    numberOfStars: 4
  };
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<Stars {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
