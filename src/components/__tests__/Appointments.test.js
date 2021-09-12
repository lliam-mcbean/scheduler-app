import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Appointment from 'components/Appointment';

afterEach(cleanup);

describe('These are our Appointment tests', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
});
